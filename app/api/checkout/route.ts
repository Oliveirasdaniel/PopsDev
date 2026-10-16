import { NextResponse } from "next/server";
import { bancoConfigurado, salvarAssinatura, salvarCliente } from "@/lib/db";
import { buscarPlano, nomeNaSyncPay, type Plano } from "@/lib/planos";
import { site } from "@/lib/site";
import {
  assinar,
  consultarTransacao,
  criarPix,
  situacao,
  SyncPayErro,
  syncpayConfigurada,
  tokenDoPlano,
  type Cliente,
} from "@/lib/syncpay";
import { problemaNosDados, soDigitos, type DadosCheckout } from "@/lib/validar";

export const dynamic = "force-dynamic";

/**
 * O checkout tem até duas etapas, as duas por aqui:
 *
 * 1. Sem `adesaoId` e com adesão no plano: gera o Pix único da adesão.
 * 2. Com `adesaoId` (já pago) ou plano sem adesão: matricula o cliente na
 *    assinatura da SyncPay, que devolve o Pix da 1ª mensalidade e cobra
 *    as seguintes sozinha.
 *
 * Os valores saem de lib/planos.ts, nunca do corpo da requisição.
 */
export async function POST(req: Request) {
  if (!syncpayConfigurada()) {
    return NextResponse.json({ erro: "Pagamento online ainda não está disponível." }, { status: 503 });
  }

  const dados = (await req.json().catch(() => null)) as (Partial<DadosCheckout> & { adesaoId?: string }) | null;
  if (!dados) return NextResponse.json({ erro: "Requisição inválida." }, { status: 400 });

  const plano = dados.plano ? buscarPlano(dados.plano) : undefined;
  if (!plano?.preco) return NextResponse.json({ erro: "Plano indisponível para assinatura online." }, { status: 400 });

  const problema = problemaNosDados(dados);
  if (problema) return NextResponse.json({ erro: problema }, { status: 400 });

  const cliente: Cliente = {
    name: dados.nome!.trim(),
    email: dados.email!.trim(),
    cpf: soDigitos(dados.cpf!),
    phone: soDigitos(dados.telefone!),
  };

  try {
    if (plano.preco.adesao > 0 && !dados.adesaoId) return await cobrarAdesao(plano, cliente);

    if (plano.preco.adesao > 0 && !(await adesaoPaga(dados.adesaoId!, plano))) {
      return NextResponse.json({ erro: "A adesão ainda não aparece como paga." }, { status: 409 });
    }
    return await abrirAssinatura(plano, cliente);
  } catch (e) {
    console.error("[checkout] erro na SyncPay", e instanceof SyncPayErro ? { status: e.status, corpo: e.corpo } : e);
    return NextResponse.json({ erro: "Não foi possível gerar o Pix agora. Tente de novo em instantes." }, { status: 502 });
  }
}

function urlDoWebhook() {
  // O token na URL é como a rota do webhook sabe que o aviso é legítimo.
  // Sem ele configurado, não pede webhook.
  const token = process.env.SYNCPAY_WEBHOOK_TOKEN;
  return token ? `${process.env.SITE_URL || site.url}/api/syncpay/webhook?token=${encodeURIComponent(token)}` : undefined;
}

async function cobrarAdesao(plano: Plano, cliente: Cliente) {
  const centavos = plano.preco!.adesao;
  const pix = await criarPix({
    centavos,
    // Volta na consulta da transação: é por aqui que a etapa 2 confere
    // que essa adesão é deste plano.
    descricao: `${site.nome} · ${plano.titulo} (adesão) · plano:${plano.id}`,
    cliente,
    webhookUrl: urlDoWebhook(),
  });
  if (!pix?.pix_code || !pix?.identifier) {
    console.error("[checkout] resposta inesperada no cash-in", pix);
    return NextResponse.json({ erro: "Não foi possível gerar o Pix agora." }, { status: 502 });
  }
  return NextResponse.json({ etapa: "adesao", id: pix.identifier, pixCopiaECola: pix.pix_code, centavos });
}

async function adesaoPaga(id: string, plano: Plano) {
  if (!/^[\w-]{8,64}$/.test(id)) return false;
  const { data } = await consultarTransacao(id);
  return (
    situacao(data?.status) === "pago" &&
    Boolean(data?.description?.endsWith(`plano:${plano.id}`)) &&
    Math.round(Number(data?.amount) * 100) === plano.preco!.adesao
  );
}

async function abrirAssinatura(plano: Plano, cliente: Cliente) {
  const token = await tokenDoPlano({
    nome: nomeNaSyncPay(plano),
    descricao: plano.resumo,
    centavos: plano.preco!.mensal,
  });
  const a = await assinar(token, cliente);

  // `qr_code`: Pix do 1º ciclo. `pix_automatico`: QR que autoriza o débito.
  const codigo = a?.payment?.pix_code || a?.payment?.qr_code_pix || a?.payment?.qr_code;
  if (!a?.subscription_token || !codigo) {
    console.error("[checkout] resposta inesperada no enroll", a);
    return NextResponse.json({ erro: "Não foi possível gerar o Pix agora." }, { status: 502 });
  }
  console.log("[checkout] assinatura criada", { plano: plano.id, assinatura: a.subscription_token, metodo: a.billing_method });

  // Guarda quem assinou, para a área do cliente. Falha aqui não pode
  // derrubar o pagamento: a assinatura já existe na SyncPay.
  if (bancoConfigurado()) {
    try {
      const clienteId = await salvarCliente({ email: cliente.email, nome: cliente.name, telefone: cliente.phone });
      await salvarAssinatura({ token: a.subscription_token, clienteId, plano: plano.id, status: a.status });
    } catch (e) {
      console.error("[checkout] assinatura criada mas não gravada no banco", a.subscription_token, e);
    }
  }

  return NextResponse.json({
    etapa: "mensalidade",
    id: a.subscription_token,
    pixCopiaECola: codigo,
    automatico: a.billing_method === "pix_automatico",
    centavos: plano.preco!.mensal,
  });
}

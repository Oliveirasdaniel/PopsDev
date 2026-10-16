import { NextResponse } from "next/server";
import { buscarPlano, primeiraCobranca } from "@/lib/planos";
import { site } from "@/lib/site";
import { criarPix, SyncPayErro, syncpayConfigurada } from "@/lib/syncpay";
import { problemaNosDados, soDigitos, type DadosCheckout } from "@/lib/validar";

export const dynamic = "force-dynamic";

/**
 * Cria o Pix da primeira cobrança de um plano. O valor sai de
 * lib/planos.ts, nunca do corpo da requisição.
 */
export async function POST(req: Request) {
  if (!syncpayConfigurada()) {
    return NextResponse.json({ erro: "Pagamento online ainda não está disponível." }, { status: 503 });
  }

  const dados = (await req.json().catch(() => null)) as Partial<DadosCheckout> | null;
  if (!dados) return NextResponse.json({ erro: "Requisição inválida." }, { status: 400 });

  const plano = dados.plano ? buscarPlano(dados.plano) : undefined;
  if (!plano?.preco) return NextResponse.json({ erro: "Plano indisponível para assinatura online." }, { status: 400 });

  const problema = problemaNosDados(dados);
  if (problema) return NextResponse.json({ erro: problema }, { status: 400 });

  // O token na URL é como a rota do webhook sabe que o aviso veio de
  // uma cobrança criada aqui. Sem ele configurado, não pede webhook.
  const tokenWebhook = process.env.SYNCPAY_WEBHOOK_TOKEN;
  const webhookUrl = tokenWebhook
    ? `${process.env.SITE_URL || site.url}/api/syncpay/webhook?token=${encodeURIComponent(tokenWebhook)}`
    : undefined;

  const { adesao } = plano.preco;
  const centavos = primeiraCobranca(plano.preco);
  const oQue = adesao > 0 && centavos > adesao ? "adesão + 1ª mensalidade" : adesao > 0 ? "adesão" : "1ª mensalidade";

  try {
    const pix = await criarPix({
      centavos,
      // Aparece no painel da SyncPay e volta na consulta da transação:
      // é por aqui que se sabe qual plano foi pago.
      descricao: `${site.nome} · ${plano.titulo} (${oQue}) · plano:${plano.id}`,
      cliente: {
        name: dados.nome!.trim(),
        email: dados.email!.trim(),
        cpf: soDigitos(dados.cpf!),
        phone: soDigitos(dados.telefone!),
      },
      webhookUrl,
    });

    if (!pix?.pix_code || !pix?.identifier) {
      console.error("[checkout] resposta inesperada da SyncPay", pix);
      return NextResponse.json({ erro: "Não foi possível gerar o Pix agora." }, { status: 502 });
    }

    return NextResponse.json({ id: pix.identifier, pixCopiaECola: pix.pix_code, centavos });
  } catch (e) {
    console.error("[checkout] erro na SyncPay", e instanceof SyncPayErro ? { status: e.status, corpo: e.corpo } : e);
    return NextResponse.json({ erro: "Não foi possível gerar o Pix agora. Tente de novo em instantes." }, { status: 502 });
  }
}

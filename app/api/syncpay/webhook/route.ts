import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { avisarCrm, pagamentoDaAdesao, pagamentosDaAssinatura } from "@/lib/crm";
import { atualizarAssinatura, bancoConfigurado, clienteDaAssinatura } from "@/lib/db";
import { consultarAssinatura, consultarTransacao, situacao } from "@/lib/syncpay";

export const dynamic = "force-dynamic";

function tokenConfere(recebido: string | null) {
  const esperado = process.env.SYNCPAY_WEBHOOK_TOKEN;
  if (!esperado || !recebido) return false;
  const a = Buffer.from(recebido);
  const b = Buffer.from(esperado);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Eventos de assinatura trazem `event` e o token da assinatura. */
function tokenDaAssinatura(corpo: any): string | undefined {
  const v = corpo?.subscription_token ?? corpo?.subscription?.token;
  return typeof v === "string" && v.length > 0 ? v : undefined;
}

/** Avisos de Pix único (cash-in) trazem o ID da transação. */
function idDaTransacao(corpo: any): string | undefined {
  const candidatos = [corpo?.identifier, corpo?.id, corpo?.reference_id, corpo?.data?.identifier, corpo?.data?.id, corpo?.data?.reference_id];
  return candidatos.find((v) => typeof v === "string" && v.length > 0);
}

/**
 * Avisos da SyncPay: Pix da adesão pago e eventos da assinatura
 * (assinatura_ativada, cobranca_paga, assinatura_em_atraso,
 * assinatura_cancelada…).
 *
 * O corpo do aviso não é usado como verdade: a rota pega o ID e
 * confirma consultando a própria API. Assim, um POST forjado não
 * consegue "pagar" nada, mesmo se o token vazar.
 */
export async function POST(req: Request) {
  if (!tokenConfere(new URL(req.url).searchParams.get("token"))) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const corpo = await req.json().catch(() => null);
  const evento = typeof corpo?.event === "string" ? corpo.event : null;

  try {
    const assinatura = tokenDaAssinatura(corpo);
    if (assinatura) {
      const { data } = await consultarAssinatura(assinatura);
      console.log("[syncpay:webhook] assinatura", { evento, assinatura, status: data?.status, plano: data?.plan?.name, proxima: data?.next_charge_at });
      // É daqui que a área do cliente lê o status.
      if (bancoConfigurado() && data?.status) await atualizarAssinatura(assinatura, data.status, data.next_charge_at);
      // Para o financeiro do CRM: a situação e as cobranças já pagas.
      if (data?.status) {
        const cliente = bancoConfigurado() ? await clienteDaAssinatura(assinatura).catch(() => null) : null;
        await avisarCrm({
          cliente: cliente ?? (data.subscriber_name ? { nome: data.subscriber_name, email: data.subscriber_email, telefone: "" } : null),
          assinatura: {
            token: assinatura,
            plano: data.plan?.name ?? "Assinatura",
            valor: data.plan?.amount ?? null,
            status: data.status,
            proxima_cobranca: data.next_charge_at,
          },
          pagamentos: pagamentosDaAssinatura({ ...data, token: data.token ?? assinatura }),
        });
      }
      return NextResponse.json({ ok: true });
    }

    const id = idDaTransacao(corpo);
    if (!id) {
      console.log("[syncpay:webhook] aviso sem id reconhecido", { evento, chaves: corpo ? Object.keys(corpo) : null });
      return NextResponse.json({ ok: true, ignorado: "sem id" });
    }

    const { data } = await consultarTransacao(id);
    console.log("[syncpay:webhook] transação", { id, status: data?.status, situacao: situacao(data?.status), descricao: data?.description });
    // Pix único pago é a adesão. Quem pagou o CRM fica sabendo quando a
    // assinatura abre (o checkout manda o mesmo pagamento com o cliente).
    if (situacao(data?.status) === "pago" && data?.description?.includes("(adesão)")) {
      await avisarCrm({ cliente: null, pagamentos: [pagamentoDaAdesao(data, id)] });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[syncpay:webhook] falha ao confirmar na API", e);
    // 500 faz a SyncPay tentar de novo mais tarde.
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

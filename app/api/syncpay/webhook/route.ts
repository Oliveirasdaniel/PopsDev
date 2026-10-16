import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { consultarTransacao, situacao } from "@/lib/syncpay";

export const dynamic = "force-dynamic";

function tokenConfere(recebido: string | null) {
  const esperado = process.env.SYNCPAY_WEBHOOK_TOKEN;
  if (!esperado || !recebido) return false;
  const a = Buffer.from(recebido);
  const b = Buffer.from(esperado);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Procura o ID da transação nos lugares onde ele costuma vir. */
function idDoAviso(corpo: any): string | undefined {
  const candidatos = [corpo?.identifier, corpo?.id, corpo?.reference_id, corpo?.data?.identifier, corpo?.data?.id, corpo?.data?.reference_id];
  return candidatos.find((v) => typeof v === "string" && v.length > 0);
}

/**
 * Aviso da SyncPay de que uma cobrança mudou de status.
 *
 * O corpo do aviso não é usado como verdade: a rota pega o ID e
 * confirma o status consultando a própria API. Assim, um POST forjado
 * não consegue "pagar" nada, mesmo se o token vazar.
 */
export async function POST(req: Request) {
  if (!tokenConfere(new URL(req.url).searchParams.get("token"))) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const corpo = await req.json().catch(() => null);
  // Enquanto o formato do aviso não estiver documentado aqui, o corpo
  // bruto fica no log (Vercel › Logs) para conferir os campos reais.
  console.log("[syncpay:webhook] recebido", JSON.stringify(corpo));

  const id = idDoAviso(corpo);
  if (!id) return NextResponse.json({ ok: true, ignorado: "sem id" });

  try {
    const { data } = await consultarTransacao(id);
    const s = situacao(data?.status);
    console.log("[syncpay:webhook] transação", { id, status: data?.status, situacao: s, descricao: data?.description });

    if (s === "pago") {
      // TODO: ativar a assinatura. É aqui que entra o que acontece
      // depois do pagamento: gravar o cliente num banco, liberar o
      // acesso, avisar você no WhatsApp/e-mail e agendar a próxima
      // mensalidade. O plano está no final da descrição ("plano:<id>").
    }
  } catch (e) {
    console.error("[syncpay:webhook] falha ao confirmar a transação", id, e);
    // 500 faz a SyncPay tentar de novo mais tarde, se ela reenviar avisos.
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

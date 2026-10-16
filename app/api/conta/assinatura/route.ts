import { NextResponse } from "next/server";
import { atualizarAssinatura, db } from "@/lib/db";
import { clienteLogado, mesmaOrigem } from "@/lib/sessao";
import { cancelarAssinatura, consultarAssinatura, reenviarCobranca, SyncPayErro } from "@/lib/syncpay";

export const dynamic = "force-dynamic";

const voltar = (req: Request, q: string) => NextResponse.redirect(new URL(`/conta?${q}`, req.url), 303);

/** Ações do cliente sobre a própria assinatura: cancelar ou pedir um Pix novo. */
export async function POST(req: Request) {
  if (!mesmaOrigem(req)) return NextResponse.json({ ok: false }, { status: 403 });

  const cliente = await clienteLogado();
  if (!cliente) return NextResponse.redirect(new URL("/entrar", req.url), 303);

  const form = await req.formData().catch(() => null);
  const token = String(form?.get("token") ?? "");
  const acao = String(form?.get("acao") ?? "");

  // A assinatura tem que ser deste cliente: o token vem do formulário,
  // então nunca é aceito sem conferir o dono no banco.
  const sql = await db();
  const [dono] = (await sql`select 1 from assinaturas where token = ${token} and cliente_id = ${cliente.id}`) as unknown[];
  if (!dono) return voltar(req, "erro=assinatura");

  try {
    if (acao === "cancelar") {
      await cancelarAssinatura(token, "Cancelada pelo cliente na área do cliente do site");
    } else if (acao === "reenviar") {
      await reenviarCobranca(token);
    } else {
      return voltar(req, "erro=acao");
    }
    const { data } = await consultarAssinatura(token);
    await atualizarAssinatura(token, data.status, data.next_charge_at);
  } catch (e) {
    console.error("[conta] falha na ação", acao, token, e instanceof SyncPayErro ? { status: e.status, corpo: e.corpo } : e);
    return voltar(req, "erro=syncpay");
  }
  return voltar(req, acao === "cancelar" ? "ok=cancelada" : "ok=reenviado");
}

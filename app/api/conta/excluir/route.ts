import { NextResponse } from "next/server";
import { excluirCliente, tokensDasAssinaturas } from "@/lib/db";
import { clienteLogado, COOKIE, mesmaOrigem } from "@/lib/sessao";
import { cancelarAssinatura, SyncPayErro } from "@/lib/syncpay";

export const dynamic = "force-dynamic";

/**
 * Direito de exclusão (LGPD, art. 18): cancela as assinaturas ainda
 * abertas e apaga o cliente do banco. Se algum cancelamento falhar,
 * não apaga nada: apagar sem cancelar deixaria a cobrança rodando sem
 * o cliente ter como ver ou parar pela área do cliente.
 */
export async function POST(req: Request) {
  if (!mesmaOrigem(req)) return NextResponse.json({ ok: false }, { status: 403 });

  const cliente = await clienteLogado();
  if (!cliente) return NextResponse.redirect(new URL("/entrar", req.url), 303);

  try {
    for (const a of await tokensDasAssinaturas(cliente.id)) {
      if (a.status !== "cancelled") await cancelarAssinatura(a.token, "Cliente excluiu a conta (LGPD)");
    }
    await excluirCliente(cliente.id);
  } catch (e) {
    console.error("[conta] falha ao excluir", cliente.id, e instanceof SyncPayErro ? { status: e.status } : e);
    return NextResponse.redirect(new URL("/conta?erro=syncpay", req.url), 303);
  }

  const res = NextResponse.redirect(new URL("/entrar?excluida=1", req.url), 303);
  res.cookies.delete(COOKIE);
  return res;
}

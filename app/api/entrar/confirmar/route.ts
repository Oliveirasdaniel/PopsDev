import { NextResponse } from "next/server";
import { COOKIE, mesmaOrigem, opcoesDoCookie, usarLinkDeLogin } from "@/lib/sessao";

export const dynamic = "force-dynamic";

/**
 * Troca o link do e-mail por uma sessão. É POST (botão na página
 * /entrar/confirmar) e não o próprio clique no link porque filtros de
 * e-mail abrem os links sozinhos para checar vírus, e isso gastaria o
 * link de uso único antes do cliente.
 */
export async function POST(req: Request) {
  if (!mesmaOrigem(req)) return NextResponse.json({ ok: false }, { status: 403 });

  const segredo = String((await req.formData().catch(() => null))?.get("t") ?? "");
  const sessao = segredo.length >= 32 ? await usarLinkDeLogin(segredo).catch(() => null) : null;
  if (!sessao) return NextResponse.redirect(new URL("/entrar?erro=link", req.url), 303);

  const res = NextResponse.redirect(new URL("/conta", req.url), 303);
  res.cookies.set(COOKIE, sessao, opcoesDoCookie());
  return res;
}

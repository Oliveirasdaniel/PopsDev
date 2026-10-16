import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { COOKIE, encerrarSessao, mesmaOrigem } from "@/lib/sessao";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!mesmaOrigem(req)) return NextResponse.json({ ok: false }, { status: 403 });

  await encerrarSessao(cookies().get(COOKIE)?.value).catch(() => {});
  const res = NextResponse.redirect(new URL("/", req.url), 303);
  res.cookies.delete(COOKIE);
  return res;
}

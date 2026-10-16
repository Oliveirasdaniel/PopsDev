import { NextResponse } from "next/server";
import { enviarLinkDeLogin } from "@/lib/email";
import { criarLinkDeLogin, loginDisponivel, mesmaOrigem } from "@/lib/sessao";
import { site } from "@/lib/site";
import { emailValido } from "@/lib/validar";

export const dynamic = "force-dynamic";

const voltar = (req: Request, q: string) => NextResponse.redirect(new URL(`/entrar?${q}`, req.url), 303);

/**
 * Pede o link de login. A resposta é a mesma tenha o e-mail cadastro
 * ou não, para a tela não servir de consulta de quem é cliente.
 */
export async function POST(req: Request) {
  if (!mesmaOrigem(req)) return NextResponse.json({ ok: false }, { status: 403 });
  if (!loginDisponivel()) return voltar(req, "erro=indisponivel");

  const email = String((await req.formData().catch(() => null))?.get("email") ?? "").trim();
  if (!emailValido(email)) return voltar(req, "erro=email");

  try {
    const segredo = await criarLinkDeLogin(email);
    if (segredo) {
      // Endereço fixo, nunca o Host da requisição: um Host forjado faria
      // o link (com o segredo) apontar para outro site.
      const base = process.env.SITE_URL || site.url;
      await enviarLinkDeLogin(email, `${base}/entrar/confirmar?t=${encodeURIComponent(segredo)}`);
    }
  } catch (e) {
    console.error("[entrar] falha ao gerar ou enviar o link", e);
    return voltar(req, "erro=envio");
  }
  return voltar(req, "enviado=1");
}

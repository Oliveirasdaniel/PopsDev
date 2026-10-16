// ============================================================
//  ENVIO DE E-MAIL (Resend). Só roda no servidor.
//  Usado só para o link de login da área do cliente.
// ============================================================

import { site } from "./site";

export function emailConfigurado() {
  return Boolean(process.env.RESEND_API_KEY);
}

/**
 * O remetente precisa ser de um domínio verificado no Resend
 * (ex.: "Popsdev <contato@popsdev.tech>"). Sem domínio verificado, o
 * Resend só entrega para o e-mail dono da conta: serve para testar.
 */
const remetente = () => process.env.EMAIL_REMETENTE || `${site.nome} <onboarding@resend.dev>`;

export async function enviarLinkDeLogin(para: string, link: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: remetente(),
      to: [para],
      subject: `Seu link de acesso · ${site.nome}`,
      text: `Para entrar na sua área do cliente da ${site.nome}, abra este link:\n\n${link}\n\nEle vale por 15 minutos e só funciona uma vez. Se não foi você que pediu, ignore este e-mail.`,
      html: `<div style="font-family:system-ui,sans-serif;font-size:16px;line-height:1.5;color:#1c2e25;max-width:480px">
        <p>Para entrar na sua área do cliente da ${site.nome}, clique no botão:</p>
        <p><a href="${link}" style="display:inline-block;background:#2f4b3c;color:#f2e9d8;padding:12px 24px;border-radius:999px;text-decoration:none;font-weight:600">Entrar na minha conta</a></p>
        <p style="font-size:14px;color:#55655c">O link vale por 15 minutos e só funciona uma vez. Se não foi você que pediu, ignore este e-mail.</p>
      </div>`,
    }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Resend respondeu ${res.status}: ${await res.text().catch(() => "")}`);
}

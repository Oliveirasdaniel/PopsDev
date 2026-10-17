// ============================================================
//  LOGIN DA ÁREA DO CLIENTE: link por e-mail, sem senha.
//  Só roda no servidor.
//
//  1. O cliente pede o link com o e-mail que usou na assinatura.
//  2. Recebe um link de uso único que vale 15 minutos.
//  3. O link abre uma sessão de 30 dias num cookie httpOnly, que o
//     JavaScript da página não consegue ler.
// ============================================================

import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { bancoConfigurado, db } from "./db";
import { emailConfigurado } from "./email";

export const COOKIE = "popsdev_sessao";
const DIAS_SESSAO = 30;

export function loginDisponivel() {
  return bancoConfigurado() && emailConfigurado();
}

const novoSegredo = () => randomBytes(32).toString("base64url");
const hash = (segredo: string) => createHash("sha256").update(segredo).digest("hex");

/**
 * Gera o link de login, ou `null` se o e-mail não tem cadastro ou já
 * pediu links demais (3 a cada 15 min). Quem chama responde igual nos
 * dois casos, para a tela não revelar quem é cliente.
 */
export async function criarLinkDeLogin(email: string) {
  const sql = await db();
  const [cliente] = (await sql`select id from clientes where email = ${email.trim().toLowerCase()}`) as { id: string }[];
  if (!cliente) return null;

  const [{ recentes }] = (await sql`
    select count(*)::int as recentes from links_login
    where cliente_id = ${cliente.id} and criado_em > now() - interval '15 minutes'`) as { recentes: number }[];
  if (recentes >= 3) return null;

  const segredo = novoSegredo();
  await sql`
    insert into links_login (hash, cliente_id, expira_em)
    values (${hash(segredo)}, ${cliente.id}, now() + interval '15 minutes')`;
  return segredo;
}

/** Troca o link (uma vez só) por uma sessão. Devolve o segredo da sessão, ou `null`. */
export async function usarLinkDeLogin(segredo: string) {
  const sql = await db();
  // O update é atômico: dois cliques no mesmo link não abrem duas sessões.
  const [link] = (await sql`
    update links_login set usado_em = now()
    where hash = ${hash(segredo)} and usado_em is null and expira_em > now()
    returning cliente_id`) as { cliente_id: string }[];
  if (!link) return null;

  const sessao = novoSegredo();
  await sql`
    insert into sessoes (hash, cliente_id, expira_em)
    values (${hash(sessao)}, ${link.cliente_id}, now() + make_interval(days => ${DIAS_SESSAO}))`;
  return sessao;
}

export function opcoesDoCookie() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: DIAS_SESSAO * 24 * 60 * 60,
  };
}

export type ClienteLogado = { id: number; nome: string; email: string };

/** Cliente da sessão do cookie, ou `null`. */
export async function clienteLogado(): Promise<ClienteLogado | null> {
  if (!bancoConfigurado()) return null;
  const segredo = cookies().get(COOKIE)?.value;
  if (!segredo) return null;

  const sql = await db();
  const [c] = (await sql`
    select c.id, c.nome, c.email from sessoes s join clientes c on c.id = s.cliente_id
    where s.hash = ${hash(segredo)} and s.expira_em > now()`) as { id: string; nome: string; email: string }[];
  return c ? { id: Number(c.id), nome: c.nome, email: c.email } : null;
}

export async function encerrarSessao(segredo: string | undefined) {
  if (!segredo || !bancoConfigurado()) return;
  const sql = await db();
  await sql`delete from sessoes where hash = ${hash(segredo)}`;
}

/**
 * Formulário de outro site não pode disparar ação em nome do cliente:
 * todo POST da área do cliente confere que veio deste mesmo domínio.
 */
export function mesmaOrigem(req: Request) {
  // Navegadores atuais dizem direto se o pedido saiu deste mesmo site.
  const site = req.headers.get("sec-fetch-site");
  if (site) return site === "same-origin";

  const origem = req.headers.get("origin");
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
  if (!origem || !host) return false;
  try {
    return new URL(origem).host === host;
  } catch {
    return false;
  }
}

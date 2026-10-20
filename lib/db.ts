// ============================================================
//  BANCO (Postgres na Neon, ligado pela integração da Vercel).
//  Só roda no servidor. Guarda o mínimo: quem assinou, o status
//  de cada assinatura e as sessões de login. CPF não fica aqui:
//  ele vai direto para a SyncPay, que é quem precisa dele.
// ============================================================

import { neon } from "@neondatabase/serverless";

/** A integração da Neon na Vercel cria DATABASE_URL (e POSTGRES_URL). */
const url = () => process.env.DATABASE_URL || process.env.POSTGRES_URL;

export function bancoConfigurado() {
  return Boolean(url());
}

let cliente: ReturnType<typeof neon> | null = null;
let pronto: Promise<void> | null = null;

/**
 * As tabelas nascem sozinhas na primeira consulta de cada instância
 * (`if not exists`), então não há passo de migração para lembrar.
 */
async function criarTabelas(sql: ReturnType<typeof neon>) {
  await sql`create table if not exists clientes (
    id bigserial primary key,
    email text not null unique,
    nome text not null,
    telefone text not null,
    criado_em timestamptz not null default now()
  )`;
  await sql`create table if not exists assinaturas (
    token text primary key,
    cliente_id bigint not null references clientes(id),
    plano text not null,
    status text not null,
    proxima_cobranca timestamptz,
    criado_em timestamptz not null default now(),
    atualizado_em timestamptz not null default now()
  )`;
  await sql`create index if not exists assinaturas_cliente on assinaturas(cliente_id)`;
  // Link de login (uso único, 15 min) e sessão. Só o hash do segredo é
  // guardado: quem ler o banco não consegue entrar como ninguém.
  await sql`create table if not exists links_login (
    hash text primary key,
    cliente_id bigint not null references clientes(id),
    expira_em timestamptz not null,
    usado_em timestamptz,
    criado_em timestamptz not null default now()
  )`;
  await sql`create table if not exists sessoes (
    hash text primary key,
    cliente_id bigint not null references clientes(id),
    expira_em timestamptz not null,
    criado_em timestamptz not null default now()
  )`;
}

/** Tagged template do driver da Neon: os valores viram parâmetros, nunca texto do SQL. */
export async function db() {
  const u = url();
  if (!u) throw new Error("Banco não configurado (DATABASE_URL).");
  cliente ??= neon(u);
  pronto ??= criarTabelas(cliente).catch((e) => {
    pronto = null;
    throw e;
  });
  await pronto;
  return cliente;
}

type Linha = Record<string, any>;

/** Cria ou atualiza o cliente pelo e-mail e devolve o id. */
export async function salvarCliente(c: { email: string; nome: string; telefone: string }) {
  const sql = await db();
  const linhas = (await sql`
    insert into clientes (email, nome, telefone)
    values (${c.email.toLowerCase()}, ${c.nome}, ${c.telefone})
    on conflict (email) do update set nome = excluded.nome, telefone = excluded.telefone
    returning id`) as Linha[];
  return Number(linhas[0].id);
}

export async function salvarAssinatura(a: { token: string; clienteId: number; plano: string; status: string }) {
  const sql = await db();
  await sql`
    insert into assinaturas (token, cliente_id, plano, status)
    values (${a.token}, ${a.clienteId}, ${a.plano}, ${a.status})
    on conflict (token) do nothing`;
}

/** Atualiza o que veio da SyncPay. Assinatura que não é nossa é ignorada. */
export async function atualizarAssinatura(token: string, status: string, proxima: string | null) {
  const sql = await db();
  await sql`
    update assinaturas set status = ${status}, proxima_cobranca = ${proxima}, atualizado_em = now()
    where token = ${token}`;
}

/** Retenção mínima (LGPD): links e sessões vencidos não ficam guardados. */
export async function apagarVencidos() {
  const sql = await db();
  await sql`delete from links_login where expira_em < now() - interval '1 day'`;
  await sql`delete from sessoes where expira_em < now()`;
}

/** Tudo o que o banco tem do cliente, para o direito de acesso e portabilidade. */
export async function dadosDoCliente(clienteId: number) {
  const sql = await db();
  const [cliente] = (await sql`select nome, email, telefone, criado_em from clientes where id = ${clienteId}`) as Linha[];
  const assinaturas = (await sql`
    select plano, status, proxima_cobranca, criado_em, atualizado_em from assinaturas
    where cliente_id = ${clienteId} order by criado_em`) as Linha[];
  const [{ sessoes }] = (await sql`select count(*)::int as sessoes from sessoes where cliente_id = ${clienteId}`) as Linha[];
  return { cliente, assinaturas, sessoes_abertas: sessoes };
}

export async function tokensDasAssinaturas(clienteId: number) {
  const sql = await db();
  return (await sql`select token, status from assinaturas where cliente_id = ${clienteId}`) as { token: string; status: string }[];
}

/** Quem assinou, para o aviso ao CRM. */
export async function clienteDaAssinatura(token: string) {
  const sql = await db();
  const [c] = (await sql`
    select c.nome, c.email, c.telefone from assinaturas a join clientes c on c.id = a.cliente_id
    where a.token = ${token}`) as Linha[];
  return c ? { nome: String(c.nome), email: String(c.email), telefone: String(c.telefone) } : null;
}

/** Direito de exclusão: apaga o cliente e tudo ligado a ele. */
export async function excluirCliente(clienteId: number) {
  const sql = await db();
  await sql`delete from sessoes where cliente_id = ${clienteId}`;
  await sql`delete from links_login where cliente_id = ${clienteId}`;
  await sql`delete from assinaturas where cliente_id = ${clienteId}`;
  await sql`delete from clientes where id = ${clienteId}`;
}

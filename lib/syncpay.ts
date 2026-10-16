// ============================================================
//  CLIENTE DA SYNCPAY. Só roda no servidor (rotas em app/api):
//  usa o client_secret, que nunca pode ir para o navegador.
//
//  Endpoints usados (API "partner" v1, doc: syncpay.apidog.io):
//    POST /auth-token                         -> access_token (Bearer, 1 h)
//    POST /cash-in                            -> Pix único (a adesão)
//    GET  /transaction/{id}                   -> status do Pix único
//    GET  /subscription-plans?search=         -> planos já criados
//    POST /subscription-plans                 -> cria o plano recorrente
//    POST /subscription-plans/{token}/enroll  -> assinante + Pix do 1º ciclo
//    GET  /subscriptions/{token}              -> status da assinatura
// ============================================================

const BASE = process.env.SYNCPAY_BASE_URL || "https://api.syncpayments.com.br";
const V1 = "/api/partner/v1";

/** As credenciais saem do painel: app.syncpayments.com.br › Developer API. */
export function syncpayConfigurada() {
  return Boolean(process.env.SYNCPAY_CLIENT_ID && process.env.SYNCPAY_CLIENT_SECRET);
}

export class SyncPayErro extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly corpo: unknown,
  ) {
    super(message);
  }
}

// O token vale por um tempo; reaproveitado enquanto a instância do
// servidor estiver quente, renovado um minuto antes de vencer.
let token: { valor: string; expira: number } | null = null;

async function obterToken() {
  if (token && token.expira > Date.now()) return token.valor;

  const res = await fetch(`${BASE}${V1}/auth-token`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      client_id: process.env.SYNCPAY_CLIENT_ID,
      client_secret: process.env.SYNCPAY_CLIENT_SECRET,
    }),
    cache: "no-store",
  });
  const corpo = await res.json().catch(() => null);
  if (!res.ok || !corpo?.access_token) {
    throw new SyncPayErro("Falha ao autenticar na SyncPay", res.status, corpo);
  }

  // Se a API informar `expires_in` (segundos), usa; senão assume 1 hora.
  const segundos = Number(corpo.expires_in) > 0 ? Number(corpo.expires_in) : 3600;
  token = { valor: corpo.access_token, expira: Date.now() + (segundos - 60) * 1000 };
  return token.valor;
}

async function chamar<T>(caminho: string, init: { method: "GET" | "POST"; body?: unknown }): Promise<T> {
  const enviar = async () =>
    fetch(`${BASE}${V1}${caminho}`, {
      method: init.method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${await obterToken()}`,
      },
      body: init.body === undefined ? undefined : JSON.stringify(init.body),
      cache: "no-store",
    });

  let res = await enviar();
  // Token revogado ou vencido antes da hora: renova uma vez e tenta de novo.
  if (res.status === 401) {
    token = null;
    res = await enviar();
  }

  const corpo = await res.json().catch(() => null);
  if (!res.ok) throw new SyncPayErro(`SyncPay respondeu ${res.status} em ${caminho}`, res.status, corpo);
  return corpo as T;
}

export type Cliente = {
  name: string;
  email: string;
  /** Só dígitos. */
  cpf: string;
  /** Só dígitos, com DDD. */
  phone: string;
};

export type CobrancaPix = {
  message?: string;
  /** Pix copia e cola. */
  pix_code: string;
  /** ID da transação na SyncPay, usado para consultar o status. */
  identifier: string;
};

/** Cria uma cobrança Pix. `centavos` é convertido para reais, que é o que a API recebe. */
export function criarPix(dados: { centavos: number; descricao: string; cliente: Cliente; webhookUrl?: string }) {
  return chamar<CobrancaPix>("/cash-in", {
    method: "POST",
    body: {
      amount: dados.centavos / 100,
      description: dados.descricao,
      client: dados.cliente,
      webhook_url: dados.webhookUrl,
    },
  });
}

export type Transacao = {
  data: {
    reference_id: string;
    amount: number;
    status: string;
    description: string;
    transaction_date: string;
    pix_code: string | null;
  };
};

export function consultarTransacao(identifier: string) {
  return chamar<Transacao>(`/transaction/${encodeURIComponent(identifier)}`, { method: "GET" });
}

/**
 * A doc mostra `completed` para Pix pago e cita `refunded`; as outras
 * variações ficam por garantia até aparecerem numa transação real.
 */
const PAGO = new Set(["completed", "paid", "approved", "confirmed", "success", "paid_out"]);
const FALHOU = new Set(["failed", "canceled", "cancelled", "expired", "refunded", "chargeback"]);

export function situacao(status: string | undefined): "pago" | "falhou" | "pendente" {
  const s = (status || "").toLowerCase();
  if (PAGO.has(s)) return "pago";
  if (FALHOU.has(s)) return "falhou";
  return "pendente";
}

// ------------------------------------------------------------
//  ASSINATURAS (mensalidade recorrente)
// ------------------------------------------------------------

/**
 * `qr_code`: a SyncPay gera um Pix a cada ciclo e manda por e-mail.
 * `pix_automatico`: débito automático, o cliente autoriza uma vez no
 * banco. Precisa estar habilitado na conta; sem isso a API dá 422.
 */
export type MetodoCobranca = "qr_code" | "pix_automatico";

export function metodoCobranca(): MetodoCobranca {
  return process.env.SYNCPAY_COBRANCA === "pix_automatico" ? "pix_automatico" : "qr_code";
}

type PlanoSyncPay = { token: string; name: string; amount: string; billing_method: MetodoCobranca; status: string };

const planosCache = new Map<string, string>();

/**
 * Devolve o token do plano recorrente na SyncPay, criando na primeira
 * vez. O plano é achado pelo nome e só serve se o valor e o método
 * baterem: mudou o preço em lib/planos.ts, nasce um plano novo (quem já
 * assina continua no antigo, que é como a SyncPay trata troca de valor).
 */
export async function tokenDoPlano(dados: { nome: string; descricao: string; centavos: number }) {
  const valor = (dados.centavos / 100).toFixed(2);
  const metodo = metodoCobranca();
  const chave = `${dados.nome}|${valor}|${metodo}`;
  const emCache = planosCache.get(chave);
  if (emCache) return emCache;

  const lista = await chamar<{ data: PlanoSyncPay[] }>(
    `/subscription-plans?status=active&per_page=100&search=${encodeURIComponent(dados.nome)}`,
    { method: "GET" },
  );
  let plano = lista.data?.find((p) => p.name === dados.nome && Number(p.amount) === Number(valor) && p.billing_method === metodo);

  if (!plano) {
    const criado = await chamar<{ data: PlanoSyncPay }>("/subscription-plans", {
      method: "POST",
      body: {
        name: dados.nome,
        description: dados.descricao,
        amount: valor,
        periodicity_days: 30,
        billing_method: metodo,
        billing_advance_days: 3,
        grace_period_days: 5,
        max_retry_attempts: 3,
      },
    });
    plano = criado.data;
  }

  planosCache.set(chave, plano.token);
  return plano.token;
}

export type Adesao = {
  subscription_token: string;
  status: string;
  billing_method: MetodoCobranca;
  /** `qr_code`: Pix do 1º ciclo. `pix_automatico`: QR de autorização do débito. */
  payment: { pix_code?: string; qr_code?: string | null; identifier?: string; mandate_id?: string; mandate_status?: string };
};

/** Matricula o cliente no plano. A resposta já traz o Pix do primeiro ciclo. */
export function assinar(planoToken: string, cliente: Cliente) {
  return chamar<Adesao>(`/subscription-plans/${encodeURIComponent(planoToken)}/enroll`, {
    method: "POST",
    body: { name: cliente.name, email: cliente.email, document: cliente.cpf, phone: cliente.phone },
  });
}

export type Assinatura = {
  data: {
    token: string;
    status: "pending_first_payment" | "active" | "overdue" | "suspended" | "cancelled";
    subscriber_name: string;
    subscriber_email: string;
    next_charge_at: string | null;
    plan: { token: string; name: string; amount: string };
  };
};

export function consultarAssinatura(token: string) {
  return chamar<Assinatura>(`/subscriptions/${encodeURIComponent(token)}`, { method: "GET" });
}

/** `active` (e `overdue`, que já pagou o 1º ciclo) contam como assinatura em pé. */
export function situacaoAssinatura(status: string | undefined): "pago" | "falhou" | "pendente" {
  if (status === "active" || status === "overdue") return "pago";
  if (status === "cancelled" || status === "suspended") return "falhou";
  return "pendente";
}

// ============================================================
//  CLIENTE DA SYNCPAY. Só roda no servidor (rotas em app/api):
//  usa o client_secret, que nunca pode ir para o navegador.
//
//  Endpoints usados (API "partner" v1):
//    POST /api/partner/v1/auth-token        -> access_token (Bearer)
//    POST /api/partner/v1/cash-in           -> cobrança Pix
//    GET  /api/partner/v1/transaction/{id}  -> status da cobrança
//
//  A SyncPay também anuncia planos de assinatura e Pix Automático na
//  API, mas esses endpoints não estão aqui porque não foram conferidos
//  na documentação. Quando estiverem, entram neste arquivo.
// ============================================================

const BASE = process.env.SYNCPAY_BASE_URL || "https://api.syncpayments.com.br";

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

  const res = await fetch(`${BASE}/api/partner/v1/auth-token`, {
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
    fetch(`${BASE}${caminho}`, {
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
  return chamar<CobrancaPix>("/api/partner/v1/cash-in", {
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
  return chamar<Transacao>(`/api/partner/v1/transaction/${encodeURIComponent(identifier)}`, { method: "GET" });
}

/**
 * Os nomes exatos de status da SyncPay ainda precisam ser confirmados
 * com uma transação real (veja o log do webhook). Até lá, aceita as
 * variações mais comuns de "pago" e trata todo o resto como pendente.
 */
const PAGO = new Set(["completed", "paid", "approved", "confirmed", "success", "paid_out"]);
const FALHOU = new Set(["failed", "canceled", "cancelled", "expired", "refunded", "chargeback"]);

export function situacao(status: string | undefined): "pago" | "falhou" | "pendente" {
  const s = (status || "").toLowerCase();
  if (PAGO.has(s)) return "pago";
  if (FALHOU.has(s)) return "falhou";
  return "pendente";
}

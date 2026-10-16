// Cadastra na SyncPay os webhooks de assinatura apontando para o site.
// Rode uma vez, depois de pôr as variáveis no .env.local:
//
//   node --env-file=.env.local scripts/syncpay-webhooks.mjs
//
// Cada webhook na SyncPay escuta um evento só, então são vários.
// Rodar de novo não duplica: os que já existem com a mesma URL e evento
// são pulados.

const BASE = (process.env.SYNCPAY_BASE_URL || "https://api.syncpayments.com.br") + "/api/partner/v1";
const SITE = process.env.SITE_URL || "https://www.popsdev.tech";
const { SYNCPAY_CLIENT_ID, SYNCPAY_CLIENT_SECRET, SYNCPAY_WEBHOOK_TOKEN } = process.env;

const EVENTOS = [
  "assinatura_ativada",
  "assinatura_renovada",
  "assinatura_em_atraso",
  "assinatura_suspensa",
  "assinatura_cancelada",
  "assinatura_reativada",
  "cobranca_paga",
  "cobranca_falhou",
];

if (!SYNCPAY_CLIENT_ID || !SYNCPAY_CLIENT_SECRET || !SYNCPAY_WEBHOOK_TOKEN) {
  console.error("Faltam SYNCPAY_CLIENT_ID, SYNCPAY_CLIENT_SECRET ou SYNCPAY_WEBHOOK_TOKEN no .env.local.");
  process.exit(1);
}

async function api(caminho, init = {}) {
  const res = await fetch(BASE + caminho, {
    ...init,
    headers: { "Content-Type": "application/json", Accept: "application/json", ...init.headers },
  });
  // A SyncPay limita a criação de webhooks por minuto: espera e repete.
  if (res.status === 429) {
    console.log("limite da SyncPay, esperando 1 minuto…");
    await new Promise((r) => setTimeout(r, 61_000));
    return api(caminho, init);
  }
  const corpo = await res.json().catch(() => null);
  if (!res.ok) throw new Error(`${init.method || "GET"} ${caminho} -> ${res.status} ${JSON.stringify(corpo)}`);
  return corpo;
}

const { access_token } = await api("/auth-token", {
  method: "POST",
  body: JSON.stringify({ client_id: SYNCPAY_CLIENT_ID, client_secret: SYNCPAY_CLIENT_SECRET }),
});
const auth = { Authorization: `Bearer ${access_token}` };

const url = `${SITE}/api/syncpay/webhook?token=${encodeURIComponent(SYNCPAY_WEBHOOK_TOKEN)}`;
const existentes = (await api("/webhooks", { headers: auth }))?.data ?? [];

for (const event of EVENTOS) {
  if (existentes.some((w) => w.url === url && w.event === event)) {
    console.log(`já existe: ${event}`);
    continue;
  }
  await api("/webhooks", {
    method: "POST",
    headers: auth,
    body: JSON.stringify({ title: `Site Popsdev · ${event}`, url, event, trigger_all_products: true }),
  });
  console.log(`criado:    ${event}`);
}

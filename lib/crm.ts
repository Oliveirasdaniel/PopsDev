// ============================================================
//  AVISO PARA O CRM. Só roda no servidor. Cada pagamento que a
//  SyncPay confirma vira receita no financeiro do CRM da Popsdev
//  (POST /api/financeiro/syncpay), com o cliente e a situação da
//  assinatura. O CRM não confia no que chega sem o token, e o
//  mesmo pagamento enviado de novo não conta duas vezes lá.
//
//  CRM_WEBHOOK_URL e CRM_WEBHOOK_TOKEN saem da tela Financeiro ›
//  Categorias e fixas do CRM. Sem elas, nada é enviado.
// ============================================================

import type { Assinatura } from "@/lib/syncpay";

export type AvisoCrm = {
  cliente?: { nome: string; email: string; telefone: string } | null;
  assinatura?: { token: string; plano: string; valor: string | null; status: string; proxima_cobranca: string | null } | null;
  pagamentos: { id: string; tipo: "mensalidade" | "adesao"; valor: string; data: string; descricao: string }[];
};

export const crmConfigurado = () => Boolean(process.env.CRM_WEBHOOK_URL && process.env.CRM_WEBHOOK_TOKEN);

/**
 * Manda o aviso e registra no log se falhar. Nunca derruba quem chamou:
 * o pagamento já aconteceu na SyncPay, e o próximo aviso da mesma
 * assinatura leva de novo as últimas cobranças pagas.
 */
export async function avisarCrm(aviso: AvisoCrm) {
  if (!crmConfigurado()) return;
  try {
    const res = await fetch(process.env.CRM_WEBHOOK_URL!, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.CRM_WEBHOOK_TOKEN}` },
      body: JSON.stringify(aviso),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    if (!res.ok) console.error("[crm] aviso recusado", res.status, (await res.text().catch(() => "")).slice(0, 200));
  } catch (e) {
    console.error("[crm] aviso não chegou", e);
  }
}

/** "2026-10-20T13:00:00-03:00" → "2026-10-20", no dia do Brasil. */
export function diaNoBrasil(quando: string | null | undefined) {
  const d = quando ? new Date(quando) : new Date();
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo" }).format(Number.isNaN(d.getTime()) ? new Date() : d);
}

/** As cobranças pagas da assinatura (a SyncPay devolve as últimas 12), no formato do CRM. */
export function pagamentosDaAssinatura(a: Assinatura["data"]): AvisoCrm["pagamentos"] {
  return (a.charges ?? [])
    .filter((c) => c.paid_at)
    .map((c) => ({
      id: `assinatura:${a.token}:${c.cycle_number}`,
      tipo: "mensalidade" as const,
      valor: Number(c.amount).toFixed(2),
      data: diaNoBrasil(c.paid_at),
      descricao: `Mensalidade ${a.plan?.name ?? ""} (${c.cycle_number}º ciclo)`.replace("  ", " "),
    }));
}

/** O mesmo id no webhook e no checkout: o CRM junta os dois avisos num lançamento só. */
export function pagamentoDaAdesao(t: { reference_id?: string; amount: number; description: string; transaction_date?: string }, id: string) {
  return {
    id: `pix:${t.reference_id || id}`,
    tipo: "adesao" as const,
    valor: Number(t.amount).toFixed(2),
    data: diaNoBrasil(t.transaction_date),
    descricao: t.description.replace(/\s*·\s*plano:.*$/, ""),
  };
}

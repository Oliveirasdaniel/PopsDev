import type { Metadata } from "next";
import { redirect } from "next/navigation";
import BotaoCancelar from "@/components/BotaoCancelar";
import BotaoExcluirConta from "@/components/BotaoExcluirConta";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { atualizarAssinatura, db } from "@/lib/db";
import { buscarPlano, reais } from "@/lib/planos";
import { clienteLogado } from "@/lib/sessao";
import { site, whatsappLink } from "@/lib/site";
import { consultarAssinatura } from "@/lib/syncpay";

export const metadata: Metadata = {
  title: "Minha conta",
  robots: { index: false },
};
export const dynamic = "force-dynamic";

const rotulos: Record<string, string> = {
  pending_first_payment: "Aguardando o 1º pagamento",
  active: "Ativa",
  overdue: "Mensalidade em atraso",
  suspended: "Suspensa",
  cancelled: "Cancelada",
};

const avisos: Record<string, string> = {
  "ok=cancelada": "Assinatura cancelada. Nenhuma nova cobrança será gerada.",
  "ok=reenviado": "Pronto: mandamos um Pix novo para o seu e-mail.",
  "erro=syncpay": "Não deu certo agora. Tente de novo em instantes ou fale com a gente no WhatsApp.",
  "erro=assinatura": "Assinatura não encontrada.",
};

const data = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", timeZone: "America/Sao_Paulo" }) : null;

type Linha = { token: string; plano: string; status: string; proxima_cobranca: string | null };

export default async function Conta({ searchParams }: { searchParams: { ok?: string; erro?: string } }) {
  const cliente = await clienteLogado().catch(() => null);
  if (!cliente) redirect("/entrar");

  const sql = await db();
  const linhas = (await sql`
    select token, plano, status, proxima_cobranca from assinaturas
    where cliente_id = ${cliente.id} order by criado_em desc`) as Linha[];

  // O banco pode estar um aviso atrás: confere cada uma na SyncPay e
  // aproveita para atualizar. Se a SyncPay não responder, mostra o que tem.
  const assinaturas = await Promise.all(
    linhas.map(async (l) => {
      try {
        const { data: a } = await consultarAssinatura(l.token);
        if (a.status !== l.status || a.next_charge_at !== l.proxima_cobranca) {
          await atualizarAssinatura(l.token, a.status, a.next_charge_at).catch(() => {});
        }
        return { ...l, status: a.status, proxima_cobranca: a.next_charge_at };
      } catch {
        return l;
      }
    }),
  );

  const aviso = searchParams.ok ? avisos[`ok=${searchParams.ok}`] : searchParams.erro ? avisos[`erro=${searchParams.erro}`] : null;

  return (
    <>
      <Header claro />
      <main className="min-h-[70vh] bg-creme pb-24 pt-28 text-verde-escuro sm:pb-32 sm:pt-36">
        <div className="wrap">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="titulo-pagina">Olá, {cliente.nome.split(" ")[0]}</h1>
              <p className="mt-3 text-[15px] text-verde-escuro/65">{cliente.email}</p>
            </div>
            <form action="/api/sair" method="post">
              <button className="text-[15px] font-medium text-verde-escuro/75 underline underline-offset-4 hover:text-verde-escuro">
                Sair
              </button>
            </form>
          </div>

          {aviso && (
            <p role="status" className="mt-8 rounded-lg bg-verde-claro px-4 py-3 text-[15px] font-medium">
              {aviso}
            </p>
          )}

          <div className="mt-12 border-b border-verde-escuro/15">
            {assinaturas.length === 0 && (
              <p className="border-t border-verde-escuro/15 py-10 text-verde-escuro/75">Nenhuma assinatura encontrada.</p>
            )}
            {assinaturas.map((a) => {
              const plano = buscarPlano(a.plano);
              const encerrada = a.status === "cancelled";
              const devendo = a.status === "pending_first_payment" || a.status === "overdue";
              return (
                <article
                  key={a.token}
                  className="grid gap-6 border-t border-verde-escuro/15 py-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16"
                >
                  <div>
                    <h2 className="titulo-item">{plano?.titulo ?? a.plano}</h2>
                    <p
                      className={`mt-4 inline-block rounded px-2 py-1 text-[13px] font-semibold ${
                        devendo ? "bg-red-100 text-red-800" : encerrada ? "bg-verde-escuro/10" : "bg-verde-claro"
                      }`}
                    >
                      {rotulos[a.status] ?? a.status}
                    </p>
                  </div>
                  <div className="flex flex-col gap-5">
                    {plano?.preco && (
                      <p className="text-[15px] text-verde-escuro/75">
                        Mensalidade de <strong className="text-verde">{reais(plano.preco.mensal)}</strong>
                        {!encerrada && data(a.proxima_cobranca) && <> · próxima cobrança em {data(a.proxima_cobranca)}</>}
                      </p>
                    )}
                    {!encerrada && (
                      <div className="flex flex-wrap items-center gap-4">
                        {devendo && (
                          <form action="/api/conta/assinatura" method="post">
                            <input type="hidden" name="token" value={a.token} />
                            <input type="hidden" name="acao" value="reenviar" />
                            <button className="inline-flex h-11 items-center rounded-full bg-verde px-6 text-[15px] font-semibold text-creme hover:bg-verde-escuro">
                              Receber Pix por e-mail
                            </button>
                          </form>
                        )}
                        <BotaoCancelar token={a.token} />
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          <p className="mt-10 text-[15px] text-verde-escuro/65">
            Dúvida ou quer trocar de plano?{" "}
            <a className="link-verde" href={whatsappLink(`Olá! Sou cliente da ${site.nome} (${cliente.email}).`)}>
              Fale com a gente no WhatsApp
            </a>
            .
          </p>

          <div className="mt-16 border-t border-verde-escuro/15 pt-8">
            <h2 className="text-[15px] font-semibold">Seus dados</h2>
            <p className="mt-2 max-w-[60ch] text-[15px] text-verde-escuro/65">
              Pela LGPD, você pode baixar uma cópia do que guardamos ou apagar tudo. Detalhes na{" "}
              <a className="link-verde" href="/privacidade">
                política de privacidade
              </a>
              .
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-6">
              <a
                href="/api/conta/dados"
                className="text-[15px] font-medium text-verde-escuro/70 underline underline-offset-4 hover:text-verde-escuro"
              >
                Baixar meus dados
              </a>
              <BotaoExcluirConta />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

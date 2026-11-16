import Checkout from "@/components/Checkout";
import IconeWhatsapp from "@/components/IconeWhatsapp";
import { planos, reais, temCheckoutOnline, type Plano } from "@/lib/planos";
import { site, whatsappLink } from "@/lib/site";
import { syncpayConfigurada } from "@/lib/syncpay";

const botao =
  "inline-flex h-12 items-center justify-center gap-2.5 whitespace-nowrap rounded-full px-7 text-[15px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-verde";

function Preco({ plano }: { plano: Plano }) {
  const { preco, oferta } = plano;
  if (oferta) {
    return (
      <div>
        <p className="text-[15px] text-verde-escuro/75">
          <strong className="font-display text-[2rem] font-semibold tracking-[-0.02em] text-verde">{reais(oferta.unico)}</strong>
          <span className="font-medium text-verde"> pagamento único</span>
        </p>
        <p className="mt-0.5 text-[14px] text-verde-escuro/65">Sem alterações depois de entregue.</p>
        <ul className="mt-3 grid gap-1 text-[14px] text-verde-escuro/75">
          {oferta.adicionais.map((a) => (
            <li key={a.id}>
              Adicional opcional: {a.nome.toLowerCase()}, <strong className="text-verde">{reais(a.mensal)}/mês</strong>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  if (!preco) {
    return <p className="font-display text-[1.6rem] font-semibold tracking-[-0.02em] text-verde">Sob consulta</p>;
  }
  return (
    <div>
      <p className="text-[15px] text-verde-escuro/75">
        <strong className="font-display text-[2rem] font-semibold tracking-[-0.02em] text-verde">{reais(preco.mensal)}</strong>
        <span className="font-medium text-verde">/mês</span>
      </p>
      <p className="mt-0.5 text-[14px] text-verde-escuro/65">
        {preco.adesao > 0 ? `+ ${reais(preco.adesao)} de adesão, uma vez` : "Sem taxa de adesão"}
      </p>
    </div>
  );
}

/**
 * O que a Popsdev oferece e quanto custa, numa seção só. Ficha técnica,
 * não grade de cartões: cada plano é uma linha, com nome, preço e botão
 * à esquerda e o que vem dentro à direita.
 */
export default function Planos() {
  // Sem as credenciais da SyncPay, todo botão vira "Falar no WhatsApp":
  // a seção funciona igual, só sem o pagamento online.
  const checkout = syncpayConfigurada();

  return (
    <section id="planos" className="secao bg-creme">
      <div className="wrap">
        <div className="cabecalho">
          <h2 className="titulo-secao max-w-[12ch]">Planos e preços</h2>
          <p className="lead text-verde-escuro/75">
            Cada plano mostra o que é pagamento único e o que é mensal. Site estático e cardápio são pagamento
            único; alterações ilimitadas e delivery são adicionais opcionais, contratados separadamente.
          </p>
        </div>

        <div className="mt-16 border-b border-verde-escuro/15">
          {planos.map((p) => (
            <article
              key={p.id}
              id={p.id}
              className="grid scroll-mt-24 gap-6 border-t border-verde-escuro/15 py-10 sm:py-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16"
            >
              <div className="flex flex-col gap-5">
                <div>
                  <h3 className="titulo-item max-w-[14ch]">{p.titulo}</h3>
                  {(p.destaque || p.novo) && (
                    <p className="mt-4 inline-block rounded bg-verde-claro px-2 py-1 text-[13px] font-semibold text-verde-escuro">
                      {p.novo ? "Novo" : "Mais procurado"}
                    </p>
                  )}
                </div>
                <Preco plano={p} />
                <div>
                  {checkout && temCheckoutOnline(p) ? (
                    <Checkout
                      plano={{ id: p.id, titulo: p.titulo }}
                      adesao={p.preco.adesao > 0 ? reais(p.preco.adesao) : undefined}
                      mensal={reais(p.preco.mensal)}
                      className={`${botao} bg-verde text-creme hover:bg-verde-escuro`}
                    />
                  ) : (
                    <a
                      href={whatsappLink(`Olá! Vim pelo site da ${site.nome} e ${
                          p.oferta
                            ? `quero contratar o plano ${p.titulo} (${reais(p.oferta.unico)}, pagamento único). Os adicionais são opcionais e não entram nesta contratação: ${p.oferta.adicionais.map((a) => `${a.nome.toLowerCase()} (${reais(a.mensal)}/mês)`).join(" e ")}.`
                            : `quero saber do plano ${p.titulo}.`
                        }`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${botao} border border-verde-escuro/30 text-verde-escuro hover:border-verde-escuro hover:bg-verde-escuro hover:text-creme`}
                    >
                      <IconeWhatsapp className="h-[18px] w-[18px]" />
                      Falar no WhatsApp
                    </a>
                  )}
                </div>
              </div>

              <div>
                <p className="lead max-w-[56ch] text-verde-escuro/75">{p.resumo}</p>
                <ul className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2">
                  {p.inclui.map((item) => (
                    <li key={item} className="flex gap-3 text-[15px] leading-snug">
                      <span className="mt-[0.6em] h-px w-3 shrink-0 bg-verde" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                {p.oferta?.adicionais.map((a) => (
                  <div key={a.id} className="mt-8 border-t border-verde-escuro/15 pt-6">
                    <p className="text-[15px] font-semibold text-verde">
                      Adicional opcional: {a.nome} · {reais(a.mensal)}/mês
                    </p>
                    <ul className="mt-3 grid gap-x-10 gap-y-3 sm:grid-cols-2">
                      {a.inclui.map((item) => (
                        <li key={item} className="flex gap-3 text-[15px] leading-snug">
                          <span className="mt-[0.6em] h-px w-3 shrink-0 bg-verde" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

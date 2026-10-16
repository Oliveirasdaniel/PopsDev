import { servicos } from "@/lib/site";

/**
 * Ficha técnica, não grade de cartões: cada serviço é uma linha, com o
 * nome à esquerda e o que vem dentro à direita. Lê-se de cima a baixo
 * como uma especificação. Preço não aparece aqui: fica na página
 * /planos, para onde o fecho da seção leva.
 */
export default function Servicos() {
  return (
    <section id="servicos" className="secao bg-creme">
      <div className="wrap">
        <div className="cabecalho">
          <h2 className="titulo-secao max-w-[12ch]">O que a Popsdev constrói</h2>
          <p className="lead text-verde-escuro/75">
            Cinco frentes, todas partindo do que trava a venda hoje: cliente perdido nas mensagens, horário
            vago e pedido que some.
          </p>
        </div>

        <div className="mt-16 border-b border-verde-escuro/15">
          {servicos.map((s) => (
            <article
              key={s.titulo}
              className="grid gap-6 border-t border-verde-escuro/15 py-10 sm:py-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16"
            >
              <div>
                <h3 className="titulo-item max-w-[14ch]">{s.titulo}</h3>
                {s.novo && (
                  <p className="mt-4 inline-flex items-center gap-2 rounded bg-verde px-2 py-1 text-[13px] font-semibold text-creme">
                    <span className="relative flex h-2 w-2" aria-hidden="true">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-verde-claro opacity-75 motion-reduce:animate-none" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-verde-claro" />
                    </span>
                    Novo
                  </p>
                )}
                {s.proprio && (
                  <p className="mt-4 inline-block rounded bg-verde-claro px-2 py-1 text-[13px] font-semibold text-verde-escuro">
                    Sistema próprio da Popsdev
                  </p>
                )}
              </div>

              <div>
                <p className="lead max-w-[56ch] text-verde-escuro/75">{s.resumo}</p>
                <ul className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2">
                  {s.itens.map((item) => (
                    <li key={item} className="flex gap-3 text-[15px] leading-snug">
                      <span className="mt-[0.6em] h-px w-3 shrink-0 bg-verde" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="lead max-w-[40ch] text-verde-escuro/75">
            Planos mensais, com suporte enquanto a assinatura estiver ativa.
          </p>
          <a
            href="/planos"
            className="inline-flex h-14 items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-verde px-8 text-[16px] font-semibold text-creme transition-colors hover:bg-verde-escuro focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-verde"
          >
            Ver planos e mensalidades
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

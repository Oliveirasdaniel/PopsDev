import { servicos } from "@/lib/site";

type Icone = (typeof servicos)[number]["icone"];

/** Ícones em fio, no mesmo traço do desenho do topo. */
const icones: Record<Icone, React.ReactNode> = {
  page: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2" />
      <path d="M3 8.5h18M6 6.5h.01M8.5 6.5h.01M7 12.5h6M7 15.5h10" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4M8 13.5h2M14 13.5h2M8 16.5h2" />
    </>
  ),
  cart: (
    <>
      <path d="M5 8h14l-1.2 11a1.5 1.5 0 0 1-1.5 1.3H7.7a1.5 1.5 0 0 1-1.5-1.3Z" />
      <path d="M9 10.5V7a3 3 0 0 1 6 0v3.5" />
    </>
  ),
  tools: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1" />
    </>
  ),
};

/**
 * Ficha técnica, não grade de cartões: cada frente é uma linha, com o
 * nome à esquerda e o que vem dentro à direita. Lê-se de cima a baixo
 * como uma especificação.
 */
export default function Servicos() {
  return (
    <section id="servicos" className="secao bg-pedra">
      <div className="wrap">
        <div className="cabecalho">
          <h2 className="titulo-2 max-w-[14ch]">O que a Popsdev constrói</h2>
          <p className="lead text-andesito-escuro">
            Quatro frentes, todas partindo do que trava a venda hoje: cliente perdido nas mensagens, horário
            vago e pedido que some.
          </p>
        </div>

        <div className="mt-16 border-b border-tinta/15">
          {servicos.map((s) => (
            <article
              key={s.titulo}
              className="grid gap-6 border-t border-tinta/15 py-10 sm:py-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16"
            >
              <div>
                <svg
                  viewBox="0 0 24 24"
                  className="h-8 w-8 text-latao-texto"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {icones[s.icone]}
                </svg>
                <h3 className="titulo-3 mt-5 max-w-[16ch]">{s.titulo}</h3>
                {s.icone === "cart" && (
                  <p className="mt-3 inline-block rounded bg-latao/30 px-2 py-1 text-[13px] font-semibold text-latao-texto">
                    Sistema próprio da Popsdev
                  </p>
                )}
              </div>

              <div>
                <p className="lead max-w-[56ch] text-andesito-escuro">{s.resumo}</p>
                <ul className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2">
                  {s.itens.map((item) => (
                    <li key={item} className="flex gap-3 text-[15px] leading-snug">
                      <span className="mt-[0.6em] h-px w-3 shrink-0 bg-latao-escuro" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

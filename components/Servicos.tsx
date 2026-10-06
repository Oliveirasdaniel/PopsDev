import { servicos } from "@/lib/site";

/**
 * Ficha técnica, não grade de cartões: cada serviço é uma linha, com o
 * nome (e o preço de entrada, quando houver) à esquerda e o que vem
 * dentro à direita. Lê-se de cima a baixo como uma especificação.
 */
export default function Servicos() {
  return (
    <section id="servicos" className="secao bg-creme">
      <div className="wrap">
        <div className="cabecalho">
          <h2 className="titulo-secao max-w-[12ch]">O que a Popsdev constrói</h2>
          <p className="lead text-verde-escuro/75">
            Quatro frentes, todas partindo do que trava a venda hoje: cliente perdido nas mensagens, horário
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
                {s.proprio && (
                  <p className="mt-4 inline-block rounded bg-verde-claro px-2 py-1 text-[13px] font-semibold text-verde-escuro">
                    Sistema próprio da Popsdev
                  </p>
                )}
                {s.preco && (
                  <div className="mt-5">
                    <p className="text-[15px] text-verde-escuro/75">
                      A partir de{" "}
                      <strong className="font-display text-[1.6rem] font-semibold tracking-[-0.02em] text-verde">
                        {s.preco.valor}
                      </strong>
                      {s.preco.periodo && <span className="font-medium text-verde">{s.preco.periodo}</span>}
                    </p>
                    {s.preco.nota && <p className="mt-0.5 text-[14px] text-verde-escuro/65">{s.preco.nota}</p>}
                  </div>
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
      </div>
    </section>
  );
}

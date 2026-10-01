import { processo } from "@/lib/site";
import Engrenagem from "./Engrenagem";

/**
 * As quatro etapas como engrenagens no mesmo eixo de andesito: uma etapa
 * puxa a outra. É sequência de verdade, então aqui o número faz sentido.
 */
export default function Processo() {
  return (
    <section id="processo" className="faixa bg-faixa-latao">
      <div className="wrap">
        <h2 className="display-secao">
          Como
          <br />
          funciona
        </h2>
        <p className="tagline">Você sabe o que vem, quando e por quanto.</p>
        <p className="lead mt-4 max-w-[46ch]">
          Sem tecnês, sem prazo elástico e sem cobrança que aparece no meio do caminho.
        </p>

        <ol className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {/* Eixo: do centro da primeira engrenagem ao centro da última.
              Só na fileira de quatro — em duas colunas ele cortaria o texto. */}
          <span
            className="absolute left-[3.25rem] right-[calc((100%_-_4.5rem)/4_-_3.25rem)] top-[3.25rem] hidden h-4 -translate-y-1/2 rounded-full border-2 border-tinta bg-andesito lg:block"
            aria-hidden="true"
          />

          {processo.map((p) => (
            <li key={p.passo} className="relative">
              <div className="relative h-[6.5rem] w-[6.5rem]">
                <Engrenagem eixo={false} className="h-full w-full" />
                <span className="display absolute inset-0 grid place-items-center text-[1.5rem] text-papel" aria-hidden="true">
                  {Number(p.passo)}
                </span>
              </div>
              <h3 className="mt-6 text-[1.35rem] font-extrabold leading-tight tracking-[-0.015em]">{p.titulo}</h3>
              <p className="lead mt-2 max-w-[34ch] !text-[15px]">{p.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

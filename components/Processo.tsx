import { processo } from "@/lib/site";

/**
 * As quatro etapas numa linha do tempo: um fio de latão de ponta a ponta,
 * com um marco por etapa. É sequência de verdade, então aqui o número
 * faz sentido.
 */
export default function Processo() {
  return (
    <section id="processo" className="secao bg-tinta text-papel">
      <div className="wrap">
        <div className="cabecalho">
          <h2 className="titulo-2">Como funciona</h2>
          <p className="lead text-papel/65">
            Você sabe o que vem, quando e por quanto. Sem tecnês, sem prazo elástico e sem cobrança que
            aparece no meio do caminho.
          </p>
        </div>

        <ol className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {processo.map((p) => (
            <li key={p.passo} className="relative border-t border-latao/40 pt-8 lg:pr-10">
              <span className="absolute -top-[5px] left-0 h-[9px] w-[9px] rounded-full bg-latao" aria-hidden="true" />
              <p className="titulo text-[1.05rem] text-latao" aria-hidden="true">
                {p.passo}
              </p>
              <h3 className="titulo-3 mt-3">{p.titulo}</h3>
              <p className="mt-3 max-w-[34ch] text-[15.5px] leading-relaxed text-papel/65">{p.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

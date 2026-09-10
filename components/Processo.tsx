import { processo } from "@/lib/site";
import Reveal from "./Reveal";

export default function Processo() {
  return (
    <section id="processo" className="pt-28 sm:pt-36">
      <div className="wrap">
        <Reveal className="rule">
          <span className="num">03</span>
          <span className="label-mono">Como funciona</span>
        </Reveal>

        <div className="mt-10 grid gap-12 lg:grid-cols-[22rem_1fr] lg:gap-20">
          <Reveal delay={60}>
            <h2 className="display text-3xl leading-[1.05] sm:text-[2.75rem]">
              Você sabe o que vem, quando e por quanto.
            </h2>
            <p className="lead mt-6">
              Sem tecnês, sem prazo elástico e sem cobrança que aparece no meio do caminho.
            </p>
          </Reveal>

          <Reveal delay={120} as="div">
            <ol className="border-t border-line">
              {processo.map((p) => (
                <li key={p.passo} className="grid gap-3 border-b border-line py-7 sm:grid-cols-[3rem_1fr] sm:gap-8">
                  <span className="label-mono sm:pt-1">{p.passo}</span>
                  <div>
                    <h3 className="text-lg font-medium tracking-tight">{p.titulo}</h3>
                    <p className="lead mt-2 max-w-xl text-sm">{p.texto}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

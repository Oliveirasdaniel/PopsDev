import { processo } from "@/lib/site";
import Reveal from "./Reveal";

export default function Processo() {
  return (
    <section id="processo" className="section">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">Como funciona</span>
          <h2 className="h2 mt-5">Do primeiro “oi” ao site no ar em quatro etapas.</h2>
          <p className="lead mt-5">
            Você sabe exatamente o que vai acontecer, quando e por quanto. Sem tecnês e sem prazo elástico.
          </p>
        </Reveal>

        <ol className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {processo.map((p, i) => (
            <Reveal key={p.passo} as="li" delay={i * 90} className="relative">
              <div className="card h-full">
                <span className="text-sm font-semibold tracking-[0.2em] text-moss-500/70">{p.passo}</span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">{p.titulo}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-sand/55">{p.texto}</p>
              </div>
              {i < processo.length - 1 && (
                <span
                  className="pointer-events-none absolute -right-3 top-1/2 hidden h-px w-6 bg-gradient-to-r from-moss-500/60 to-transparent lg:block"
                  aria-hidden="true"
                />
              )}
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

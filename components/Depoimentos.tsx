import { depoimentos } from "@/lib/site";
import Reveal from "./Reveal";

export default function Depoimentos() {
  return (
    <section className="section" aria-label="Depoimentos de clientes">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">Quem já tem</span>
          <h2 className="h2 mt-5">O que muda depois que o site entra no ar.</h2>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {depoimentos.map((d, i) => (
            <Reveal key={d.autor} as="article" delay={i * 90} className="card flex h-full flex-col">
              <span className="text-4xl leading-none text-moss-500/40" aria-hidden="true">
                &ldquo;
              </span>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-sand/75">{d.texto}</p>
              <footer className="mt-6 border-t border-white/5 pt-4">
                <p className="text-sm font-semibold">{d.autor}</p>
                <p className="text-xs text-sand/40">{d.papel}</p>
              </footer>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

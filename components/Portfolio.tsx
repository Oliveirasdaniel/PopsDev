import { projetos } from "@/lib/site";
import Reveal from "./Reveal";
import Screenshot from "./Screenshot";

export default function Portfolio() {
  return (
    <section id="projetos" className="pt-28 sm:pt-36">
      <div className="wrap">
        <Reveal className="rule">
          <span className="label-mono">02</span>
          <span className="label-mono">Projetos no ar</span>
        </Reveal>

        <Reveal delay={60}>
          <h2 className="display mt-10 max-w-2xl text-3xl leading-[1.05] sm:text-[2.75rem]">
            Três negócios reais. Clique e confira você mesmo.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-x-6 gap-y-14 md:grid-cols-3">
          {projetos.map((p, i) => (
            <Reveal key={p.nome} as="article" delay={i * 70}>
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="group block">
                <div className="aspect-[4/3] overflow-hidden border border-line bg-base-900">
                  <Screenshot src={p.imagem} alt={`Print do site ${p.nome}`} nome={p.nome} />
                </div>

                <p className="label-mono mt-5">{p.segmento}</p>
                <h3 className="mt-2 text-lg font-medium tracking-tight underline-offset-4 group-hover:underline group-hover:decoration-acid">
                  {p.nome}
                </h3>
                <p className="lead mt-2.5 text-sm">{p.descricao}</p>

                <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                  {p.tags.map((t) => (
                    <li key={t} className="before:mr-3 before:text-bone/20 before:content-['·'] first:before:content-none first:before:mr-0">
                      {t}
                    </li>
                  ))}
                </ul>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

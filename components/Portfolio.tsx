import { projetos } from "@/lib/site";
import { IconArrow } from "./Icons";
import Reveal from "./Reveal";
import Screenshot from "./Screenshot";

export default function Portfolio() {
  return (
    <section id="portfolio" className="section border-t border-white/10 bg-ink-900/30">
      <div className="container-page">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow">Projetos no ar</span>
            <h2 className="h2 mt-5">Negócios reais, resultados que dá para clicar e conferir.</h2>
          </div>
          <p className="text-sm text-sand/40 sm:pb-2">Todos publicados e em uso pelos clientes.</p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {projetos.map((p, i) => (
            <Reveal key={p.nome} as="article" delay={i * 100}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-900/70 transition duration-300 hover:border-moss-500/40"
              >
                <div className="aspect-[16/11] overflow-hidden border-b border-white/10">
                  <Screenshot src={p.imagem} alt={`Print do site ${p.nome}`} nome={p.nome} />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs uppercase tracking-[0.16em] text-moss-400">{p.segmento}</p>
                  <h3 className="mt-2.5 text-xl font-semibold tracking-tight">{p.nome}</h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-sand/55">{p.descricao}</p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <li key={t} className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-sand/50">
                        {t}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-moss-400">
                    Visitar o site
                    <IconArrow className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

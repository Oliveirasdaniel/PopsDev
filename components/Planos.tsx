import { planos, site, whatsappLink } from "@/lib/site";
import Reveal from "./Reveal";

export default function Planos() {
  return (
    <section id="planos" className="pt-28 sm:pt-36">
      <div className="wrap">
        <Reveal className="rule">
          <span className="label-mono">04</span>
          <span className="label-mono">Planos de agendamento</span>
        </Reveal>

        <Reveal delay={60}>
          <h2 className="display mt-10 max-w-2xl text-3xl leading-[1.05] sm:text-[2.75rem]">
            Comece pela agenda. Suba de plano quando fizer sentido.
          </h2>
          <p className="lead mt-6 max-w-xl">
            Mensal, sem fidelidade, cancela quando quiser.
          </p>
        </Reveal>

        <div className="mt-16 grid border-t border-line md:grid-cols-3 md:border-l">
          {planos.map((p, i) => {
            const escuro = p.destaque; // coluna invertida: fundo claro, texto escuro
            return (
              <Reveal
                key={p.nome}
                as="article"
                delay={i * 70}
                className={`flex flex-col border-b border-r border-line p-7 sm:p-8 ${
                  escuro ? "bg-bone text-base-950" : ""
                }`}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-lg font-medium tracking-tight">{p.nome}</h3>
                  {escuro && "selo" in p && (
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-base-950/50">
                      {p.selo}
                    </span>
                  )}
                </div>
                <p className={`mt-1 text-sm ${escuro ? "text-base-950/55" : "text-muted"}`}>{p.formato}</p>

                <div className="mt-9 flex items-baseline gap-1.5">
                  <span className="display text-[2.5rem] leading-none">{p.preco}</span>
                  <span className={`text-sm ${escuro ? "text-base-950/50" : "text-muted"}`}>{p.sufixo}</span>
                </div>
                <p
                  className={`mt-2 font-mono text-[11px] uppercase tracking-[0.12em] ${
                    escuro ? "text-base-950/60" : p.notaDestaque ? "text-acid" : "text-muted"
                  }`}
                >
                  {p.nota}
                </p>

                <p className={`mt-6 text-sm leading-relaxed ${escuro ? "text-base-950/70" : "text-muted"}`}>
                  {p.resumo}
                </p>

                <ul className={`mt-7 flex-1 space-y-3 border-t pt-7 ${escuro ? "border-base-950/12" : "border-line"}`}>
                  {p.itens.map((item) => (
                    <li
                      key={item.t}
                      className={`grid grid-cols-[1.25rem_1fr] items-start gap-1 text-sm ${
                        item.ok
                          ? escuro
                            ? "text-base-950/85"
                            : "text-bone/80"
                          : "text-muted/50 line-through decoration-1"
                      }`}
                    >
                      <span className="font-mono text-[13px] leading-5" aria-hidden="true">
                        {item.ok ? "+" : "—"}
                      </span>
                      <span className="leading-5">{item.t}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={whatsappLink(
                    `Olá, Daniel! Vim pelo site da ${site.nome} e tenho interesse no plano ${p.nome} (${p.preco}${p.sufixo}).`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-9 h-11 w-full rounded-sm text-sm font-medium transition-colors inline-flex items-center justify-center ${
                    escuro
                      ? "bg-base-950 text-bone hover:bg-base-800"
                      : "border border-line text-bone hover:border-bone/40 hover:bg-white/[.03]"
                  }`}
                >
                  {p.cta}
                </a>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={120}>
          <p className="mt-8 max-w-2xl text-sm text-muted">
            Fora desses planos — cardápio com delivery, loja online, várias unidades — faço por projeto, com escopo e
            preço fechados antes de começar.{" "}
            <a href="#contato" className="text-bone underline decoration-acid underline-offset-4">
              Me conta o que você precisa
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}

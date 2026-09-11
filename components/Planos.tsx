import { familias, site, sobMedida, whatsappLink } from "@/lib/site";
import Reveal from "./Reveal";

type Plano = (typeof familias)[number]["planos"][number];

export default function Planos() {
  return (
    <section id="planos" className="pt-28 sm:pt-36">
      <div className="wrap">
        <Reveal className="rule">
          <span className="num">04</span>
          <span className="label-mono">Planos</span>
        </Reveal>

        <Reveal delay={60}>
          <h2 className="display mt-10 max-w-2xl text-3xl leading-[1.05] sm:text-[2.75rem]">
            Escolha pelo que trava o seu dia.
          </h2>
          <p className="lead mt-6 max-w-xl">
            O escopo é o mesmo para todo mundo; o valor não. Uma agenda de um profissional e uma rede de
            quatro unidades dão trabalhos diferentes — por isso o preço sai depois de uma conversa de 20
            minutos, fechado por escrito e sem reajuste no meio do caminho.
          </p>
        </Reveal>

        {familias.map((familia, indice) => (
          <div key={familia.id} className={indice === 0 ? "mt-16" : "mt-20"}>
            <Reveal className="flex flex-col gap-1 border-t border-line pt-5 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-lg font-medium tracking-tight">{familia.nome}</h3>
              <p className="label-mono">{familia.publico}</p>
            </Reveal>

            <div className="mt-8 grid border-t border-line md:grid-cols-3 md:border-l">
              {familia.planos.map((p, i) => (
                <CartaoPlano key={p.nome} plano={p} atraso={i * 70} />
              ))}
            </div>
          </div>
        ))}

        {/* Sob medida: não é um quarto card, é a saída para o que não cabe. */}
        <Reveal delay={80} className="mt-20 border-t border-line pt-8">
          <div className="grid gap-8 lg:grid-cols-[22rem_1fr] lg:gap-16">
            <div>
              <h3 className="display text-2xl">{sobMedida.nome}</h3>
              <p className="lead mt-4 text-sm">{sobMedida.resumo}</p>
              <a
                href={whatsappLink(
                  `Olá, Daniel! Vim pelo site da ${site.nome} e tenho um projeto sob medida para conversar.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-solid mt-6"
              >
                {sobMedida.cta}
              </a>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2">
              {sobMedida.itens.map((item) => (
                <li key={item} className="grid grid-cols-[1.25rem_1fr] items-start gap-1 text-sm text-bone/75">
                  <span className="font-mono text-[13px] leading-5 text-acid" aria-hidden="true">
                    +
                  </span>
                  <span className="leading-5">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CartaoPlano({ plano: p, atraso }: { plano: Plano; atraso: number }) {
  const claro = p.destaque; // coluna invertida: fundo claro, texto escuro

  return (
    <Reveal
      as="article"
      delay={atraso}
      className={`flex flex-col border-b border-r border-line p-7 sm:p-8 ${
        claro ? "bg-bone text-base-950" : ""
      }`}
    >
      <div className="flex items-baseline justify-between gap-3">
        <h4 className="text-lg font-medium tracking-tight">{p.nome}</h4>
        {claro && "selo" in p && (
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-base-950/50">
            {p.selo}
          </span>
        )}
      </div>
      <p className={`mt-1 text-sm ${claro ? "text-base-950/55" : "text-muted"}`}>{p.formato}</p>

      <div className="mt-9 flex items-baseline gap-1.5">
        <span className={`display leading-none ${/\d/.test(p.preco) ? "text-[2.5rem]" : "text-[1.75rem]"}`}>
          {p.preco}
        </span>
        {p.sufixo && (
          <span className={`text-sm ${claro ? "text-base-950/50" : "text-muted"}`}>{p.sufixo}</span>
        )}
      </div>
      <p
        className={`mt-2 font-mono text-[11px] uppercase tracking-[0.12em] ${
          claro ? "text-base-950/60" : p.notaDestaque ? "text-acid" : "text-muted"
        }`}
      >
        {p.nota}
      </p>

      <p className={`mt-6 text-sm leading-relaxed ${claro ? "text-base-950/70" : "text-muted"}`}>
        {p.resumo}
      </p>

      <ul className={`mt-7 flex-1 space-y-3 border-t pt-7 ${claro ? "border-base-950/12" : "border-line"}`}>
        {p.itens.map((item) => (
          <li
            key={item.t}
            className={`grid grid-cols-[1.25rem_1fr] items-start gap-1 text-sm ${
              item.ok
                ? claro
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
          `Olá, Daniel! Vim pelo site da ${site.nome} e quero combinar o valor do plano ${p.nome}.`,
        )}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-9 inline-flex h-11 w-full items-center justify-center rounded-sm text-sm font-medium transition-colors ${
          claro
            ? "bg-acid font-semibold text-base-950 hover:brightness-110"
            : "border border-line text-bone hover:border-bone/40 hover:bg-white/[.03]"
        }`}
      >
        {p.cta}
      </a>
    </Reveal>
  );
}

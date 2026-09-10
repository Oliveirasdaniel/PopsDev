import { site, stats, whatsappLink } from "@/lib/site";
import Reveal from "./Reveal";
import Selecao from "./Selecao";
import TextRoll from "./TextRoll";

export default function Hero() {
  return (
    <section id="topo" className="pt-32 sm:pt-40">
      <div className="wrap">
        <Reveal>
          <p className="label-mono">
            {site.nome} <span className="text-bone/25">/</span> {site.cidade}
          </p>
        </Reveal>

        <Reveal delay={60}>
          <h1 className="display mt-8 max-w-[18ch] text-[2.75rem] leading-[0.98] sm:text-[4.25rem] lg:text-[5.5rem]">
            Sites e landing pages que{" "}
            <TextRoll className="text-acid">movem</TextRoll> seu negócio.
          </h1>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            Identidade visual que faz sua marca ser notada e ferramentas que aumentam o seu{" "}
            <Selecao>rendimento</Selecao> — sem depender de esforço manual todo dia.
          </p>
        </Reveal>

        <Reveal delay={180}>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappLink(
                `Olá, Daniel! Vim pelo site da ${site.nome} e quero um orçamento para o meu negócio.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-solid"
            >
              Pedir orçamento
            </a>
            <a href="#projetos" className="btn-line">
              Ver projetos
            </a>
          </div>
        </Reveal>

        {/* Números: linha simples, sem caixas. */}
        <Reveal delay={240}>
          <dl className="mt-20 flex flex-col divide-y divide-line border-y border-line sm:flex-row sm:divide-x sm:divide-y-0">
            {stats.map((s) => (
              <div key={s.label} className="flex-1 py-5 sm:px-6 sm:first:pl-0">
                <dt className="display text-2xl">{s.valor}</dt>
                <dd className="mt-1 text-sm text-bone/80">{s.label}</dd>
                <dd className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">{s.detalhe}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

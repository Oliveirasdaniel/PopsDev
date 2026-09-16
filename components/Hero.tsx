import { site, stats, whatsappLink } from "@/lib/site";
import Reveal from "./Reveal";
import Selecao from "./Selecao";
import TextRoll from "./TextRoll";

export default function Hero() {
  return (
    <section id="topo" className="relative pt-32 sm:pt-40">
      {/* Par de engrenagens da logo, encaixadas. Mesmo tamanho e mesmos
          dentes: giram na mesma velocidade, em sentidos opostos. A da
          direita começa meio dente adiantada (22,5°) para o dente de uma
          cair no vão da outra.

          Eixos a 128px (16 pixels da grade, em 8x). Com 120 os dentes de
          3px batiam no vão de 3px; com 136 elas pareciam soltas. Testado
          quadro a quadro.

          Só na tela larga: no celular disputariam espaço com o título. */}
      <div
        className="pointer-events-none absolute right-[max(2rem,calc((100vw_-_76rem)/2_+_2rem))] top-[30rem] hidden h-[152px] w-[280px] lg:block"
        aria-hidden="true"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo/marca.svg"
          alt=""
          width={152}
          height={152}
          className="engrenagem-gira absolute left-0 top-0 [image-rendering:pixelated]"
          style={{ "--periodo": "20s" } as React.CSSProperties}
        />
        <div className="absolute left-[128px] top-0 rotate-[22.5deg]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo/marca.svg"
            alt=""
            width={152}
            height={152}
            className="engrenagem-gira [image-rendering:pixelated]"
            style={{ "--periodo": "20s", "--direcao": "reverse" } as React.CSSProperties}
          />
        </div>
      </div>

      <div className="wrap relative">
        <Reveal>
          <p className="label-mono">
            {site.nome} <span className="text-bone/25">/</span> {site.cidade}
          </p>
        </Reveal>

        <Reveal delay={60}>
          <h1 className="display mt-8 max-w-[18ch] text-[2.75rem] leading-[0.98] sm:text-[4.25rem] lg:text-[5.5rem]">
            Sites e landing pages que{" "}
            <TextRoll className="text-acento">movem</TextRoll> seu negócio.
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
                <dt className="display text-2xl text-acento">{s.valor}</dt>
                <dd className="mt-1 text-sm text-bone/80">{s.label}</dd>
                <dd className="font-pixel text-[20px] uppercase leading-none tracking-[0.06em] text-muted">{s.detalhe}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

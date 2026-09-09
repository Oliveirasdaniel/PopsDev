import { site, stats, whatsappLink } from "@/lib/site";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section id="topo" className="pt-32 sm:pt-40">
      <div className="wrap">
        <Reveal>
          <p className="label-mono">
            {site.nome} <span className="text-bone/25">/</span> {site.cidade}
          </p>
        </Reveal>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_20rem] lg:items-end lg:gap-16">
          <div>
            <Reveal delay={60}>
              <h1 className="display text-[2.75rem] leading-[0.98] sm:text-[4.25rem] lg:text-[5.25rem]">
                Sites que agendam,
                <br />
                vendem e entregam
                <br />
                <span className="text-muted">pelo WhatsApp.</span>
              </h1>
            </Reveal>

            <Reveal delay={120}>
              <p className="lead mt-8 max-w-lg">
                Sou {site.autor.split(" ")[0]}, desenvolvedor. Faço landing pages, sistemas de agendamento e
                cardápios com delivery para restaurantes, barbearias, salões e clínicas. Assinatura a partir de
                R$ 29 por mês, sem fidelidade.
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
          </div>

          {/* Foto: sem brilho, sem borda arredondada, tratada em preto e branco. */}
          <Reveal delay={140} className="order-first lg:order-none">
            <figure className="max-w-[15rem] lg:max-w-none">
              <img
                src="/daniel.jpeg"
                alt={`${site.autor}, desenvolvedor por trás da ${site.nome}`}
                width={720}
                height={900}
                loading="eager"
                className="w-full grayscale contrast-[1.05]"
              />
              <figcaption className="mt-3 border-t border-line pt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                {site.autor}
              </figcaption>
            </figure>
          </Reveal>
        </div>

        {/* Números: linha simples, sem caixas. */}
        <Reveal delay={220}>
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

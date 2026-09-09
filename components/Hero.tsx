import { site, stats, whatsappLink } from "@/lib/site";
import { IconArrow, IconWhatsApp } from "./Icons";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section id="topo" className="relative overflow-hidden pt-28 sm:pt-36">
      <div className="container-page">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_.85fr] lg:gap-10">
          {/* Texto */}
          <div>
            <Reveal>
              <span className="eyebrow">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-moss-400 opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-moss-400" />
                </span>
                Aceitando 2 projetos este mês
              </span>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-6 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
                Sites que <span className="text-moss-400">agendam</span>,{" "}
                <span className="text-moss-400">vendem</span> e{" "}
                <span className="text-moss-400">entregam</span> pelo WhatsApp.
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="lead mt-6 max-w-xl">
                Sou {site.autor.split(" ")[0]}, desenvolvedor especializado em negócios locais. Crio landing pages,
                sistemas de agendamento e cardápios com delivery para restaurantes, barbearias, salões e clínicas.
                Assinatura a partir de <span className="font-semibold text-sand/90">R$ 29/mês</span>, sem fidelidade.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappLink(
                    `Olá, Daniel! Vim pelo site da ${site.nome} e quero um orçamento para o meu negócio.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <IconWhatsApp className="h-4 w-4" />
                  Pedir orçamento no WhatsApp
                </a>
                <a href="#portfolio" className="btn-ghost">
                  Ver projetos entregues
                  <IconArrow />
                </a>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <p className="mt-6 text-sm text-sand/40">
                Resposta em até 2 horas em horário comercial · Orçamento sem compromisso
              </p>
            </Reveal>
          </div>

          {/* Foto */}
          <Reveal delay={200} className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div className="absolute inset-x-6 bottom-6 top-10 rounded-[2rem] bg-moss-500/20 blur-3xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-ink-800 to-ink-950">
              {/* Substitua public/daniel.jpeg pela sua foto */}
              <img
                src="/daniel.jpeg"
                alt={`${site.autor}, desenvolvedor por trás da ${site.nome}`}
                className="h-full w-full object-cover"
                width={720}
                height={900}
                loading="eager"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 via-ink-950/70 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-base font-semibold">{site.autor}</p>
                <p className="text-sm text-moss-300">{site.cargo}</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Números */}
        <Reveal delay={120}>
          <dl className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:mt-24 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-ink-950 p-6">
                <dt className="text-3xl font-semibold text-moss-400">{s.valor}</dt>
                <dd className="mt-1 text-sm font-medium text-sand/80">{s.label}</dd>
                <dd className="mt-1 text-xs text-sand/40">{s.detalhe}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

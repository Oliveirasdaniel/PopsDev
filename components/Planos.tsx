import { planos, site, whatsappLink } from "@/lib/site";
import { IconCheck, IconX } from "./Icons";
import Reveal from "./Reveal";

export default function Planos() {
  return (
    <section id="planos" className="section border-t border-white/10 bg-ink-900/30">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">Planos de agendamento</span>
          <h2 className="h2 mt-5">Escolha o plano ideal para o seu negócio.</h2>
          <p className="lead mt-5">
            Mensalidade sem fidelidade: você começa pela agenda no WhatsApp e sobe de plano quando quiser site
            próprio e cobrança automática. Cancele quando quiser.
          </p>
        </Reveal>

        <div className="mt-14 grid items-start gap-6 lg:grid-cols-3">
          {planos.map((p, i) => (
            <Reveal
              key={p.nome}
              as="article"
              delay={i * 100}
              className={`relative flex h-full flex-col rounded-2xl border p-7 ${
                p.destaque
                  ? "border-moss-500/50 bg-gradient-to-b from-moss-500/[0.12] to-ink-900/70 shadow-[0_0_60px_-25px_rgba(116,178,71,.7)] lg:-mt-4 lg:pb-9"
                  : "border-white/10 bg-ink-900/60"
              }`}
            >
              {p.destaque && "selo" in p && (
                <span className="absolute -top-3 left-7 rounded-full bg-moss-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink-950">
                  {p.selo}
                </span>
              )}

              <h3 className="text-xl font-semibold tracking-tight">{p.nome}</h3>
              <p className="mt-1 text-sm text-sand/45">{p.formato}</p>

              <div className="mt-6 flex items-baseline gap-1.5">
                <span className="text-4xl font-semibold tracking-tight text-moss-300">{p.preco}</span>
                <span className="text-base text-sand/50">{p.sufixo}</span>
              </div>
              <p className={`mt-1.5 text-sm ${p.notaDestaque ? "font-medium text-moss-400" : "text-sand/40"}`}>
                {p.nota}
              </p>

              <p className="mt-4 text-sm leading-relaxed text-sand/55">{p.resumo}</p>

              <ul className="mt-6 flex-1 space-y-3 border-t border-white/5 pt-6">
                {p.itens.map((item) => (
                  <li
                    key={item.t}
                    className={`flex gap-2.5 text-sm ${item.ok ? "text-sand/70" : "text-sand/30 line-through decoration-sand/25"}`}
                  >
                    {item.ok ? (
                      <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-moss-400" />
                    ) : (
                      <IconX className="mt-0.5 h-4 w-4 shrink-0 text-sand/25" />
                    )}
                    {item.t}
                  </li>
                ))}
              </ul>

              <a
                href={whatsappLink(
                  `Olá, Daniel! Vim pelo site da ${site.nome} e tenho interesse no plano ${p.nome} (${p.preco}${p.sufixo}).`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-8 w-full ${p.destaque ? "btn-primary" : "btn-ghost"}`}
              >
                {p.cta}
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-8 text-center text-sm text-sand/40">
            Precisa de algo fora desses planos — cardápio com delivery, loja online ou várias unidades? Faço por
            projeto, com escopo e preço únicos fechados antes de começar.{" "}
            <a href="#contato" className="text-moss-300 underline-offset-4 hover:underline">
              Me conta o que você precisa
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}

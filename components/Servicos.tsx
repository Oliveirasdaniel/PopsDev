import { servicos } from "@/lib/site";
import { IconCheck, iconMap } from "./Icons";
import Reveal from "./Reveal";

export default function Servicos() {
  return (
    <section id="servicos" className="section">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">O que eu construo</span>
          <h2 className="h2 mt-5">
            Não é só um site bonito. É a ferramenta que o seu negócio usa todo dia.
          </h2>
          <p className="lead mt-5">
            Cada projeto começa pelo gargalo real: agenda cheia de mensagem repetida, pedido perdido no direct,
            cliente que não acha o preço. O site resolve isso.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {servicos.map((s, i) => {
            const Icone = iconMap[s.icone];
            return (
              <Reveal key={s.titulo} as="article" delay={i * 90} className="card group">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-moss-500/25 bg-moss-500/10 text-moss-400 transition group-hover:bg-moss-500 group-hover:text-ink-950">
                  <Icone />
                </span>
                <h3 className="mt-5 text-xl font-semibold tracking-tight">{s.titulo}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-sand/55">{s.resumo}</p>
                <ul className="mt-5 space-y-2.5 border-t border-white/5 pt-5">
                  {s.itens.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm text-sand/70">
                      <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-moss-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

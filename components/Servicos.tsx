import { servicos } from "@/lib/site";
import Reveal from "./Reveal";

export default function Servicos() {
  return (
    <section id="servicos" className="pt-28 sm:pt-36">
      <div className="wrap">
        <Reveal className="rule">
          <span className="num">01</span>
          <span className="label-mono">O que eu construo</span>
        </Reveal>

        <Reveal delay={60}>
          <h2 className="display mt-10 max-w-2xl text-3xl leading-[1.05] sm:text-[2.75rem]">
            Quatro frentes, todas partindo do que trava a venda hoje.
          </h2>
        </Reveal>

        <div className="mt-16">
          {servicos.map((s, i) => (
            <Reveal
              key={s.titulo}
              as="article"
              delay={i * 60}
              className="grid gap-6 border-t border-line py-9 md:grid-cols-[3rem_1fr_1fr] md:gap-10"
            >
              <span className="label-mono md:pt-1.5">{String(i + 1).padStart(2, "0")}</span>

              <div>
                <h3 className="text-xl font-medium tracking-tight">{s.titulo}</h3>
                <p className="lead mt-3 max-w-md">{s.resumo}</p>
              </div>

              <ul className="space-y-2.5 md:pt-1">
                {s.itens.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-bone/70">
                    <span className="mt-2 h-px w-3 shrink-0 bg-bone/25" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
          <div className="border-t border-line" />
        </div>
      </div>
    </section>
  );
}

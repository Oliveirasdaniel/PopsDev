import { faq } from "@/lib/site";
import Reveal from "./Reveal";

export default function Faq() {
  return (
    <section id="faq" className="section border-t border-white/10 bg-ink-900/30">
      <div className="container-page grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
        <Reveal>
          <span className="eyebrow">Dúvidas frequentes</span>
          <h2 className="h2 mt-5">Antes de você perguntar.</h2>
          <p className="lead mt-5">
            Ficou algo de fora? Me chama no WhatsApp que eu respondo direto, sem robô no meio.
          </p>
        </Reveal>

        <Reveal delay={100} className="divide-y divide-white/10 border-y border-white/10">
          {faq.map((f) => (
            <details key={f.p} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-base font-medium text-sand/90 transition hover:text-moss-300">
                {f.p}
                <span className="relative grid h-6 w-6 shrink-0 place-items-center rounded-full border border-white/15 transition group-open:border-moss-500/60 group-open:bg-moss-500/10">
                  <span className="absolute h-px w-3 bg-current" />
                  <span className="absolute h-3 w-px bg-current transition group-open:rotate-90 group-open:opacity-0" />
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-sand/55">{f.r}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

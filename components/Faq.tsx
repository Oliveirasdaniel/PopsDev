import { faq } from "@/lib/site";
import Reveal from "./Reveal";

export default function Faq() {
  return (
    <section id="faq" className="pt-28 sm:pt-36">
      <div className="wrap">
        <Reveal className="rule">
          <span className="label-mono">05</span>
          <span className="label-mono">Dúvidas frequentes</span>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-[22rem_1fr] lg:gap-20">
          <Reveal delay={60}>
            <h2 className="display text-3xl leading-[1.05] sm:text-[2.75rem]">Antes de você perguntar.</h2>
            <p className="lead mt-6">Ficou algo de fora? Me chama no WhatsApp — quem responde sou eu.</p>
          </Reveal>

          <Reveal delay={120} as="div">
            <div className="border-t border-line">
              {faq.map((f) => (
                <details key={f.p} className="group border-b border-line">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-8 py-5 text-[15px] font-medium text-bone/90 transition-colors hover:text-bone">
                    {f.p}
                    <span className="relative mt-2 block h-2.5 w-2.5 shrink-0" aria-hidden="true">
                      <span className="absolute top-1 block h-px w-2.5 bg-muted" />
                      <span className="absolute left-1 block h-2.5 w-px bg-muted transition-transform group-open:rotate-90 group-open:opacity-0" />
                    </span>
                  </summary>
                  <p className="lead max-w-2xl pb-6 text-sm">{f.r}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

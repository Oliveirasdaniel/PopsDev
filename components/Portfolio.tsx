import { projetos } from "@/lib/site";
import GaleriaExpansiva from "./GaleriaExpansiva";
import Reveal from "./Reveal";

export default function Portfolio() {
  return (
    <section id="projetos" className="pt-28 sm:pt-36">
      <div className="wrap">
        <Reveal className="rule">
          <span className="num">02</span>
          <span className="label-mono">Projetos</span>
        </Reveal>

        <Reveal delay={60}>
          <h2 className="display mt-10 max-w-2xl text-3xl leading-[1.05] sm:text-[2.75rem]">
            Três projetos que eu construí. Passe o mouse e veja de perto.
          </h2>
        </Reveal>

        <Reveal delay={120} className="mt-14">
          <GaleriaExpansiva projetos={projetos} />
        </Reveal>
      </div>
    </section>
  );
}

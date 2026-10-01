import { projetos } from "@/lib/site";
import GaleriaExpansiva from "./GaleriaExpansiva";

export default function Portfolio() {
  return (
    <section id="projetos" className="faixa bg-faixa-andesito">
      <div className="wrap">
        {/* A instrução vira adesivo, colado na ponta do título: é a única
            coisa que a pessoa precisa saber antes de mexer na galeria. */}
        <div className="relative w-fit">
          <h2 className="display-secao">Projetos</h2>
          <span
            className="adesivo mt-4 bg-papel text-[15px] font-extrabold sm:absolute sm:-right-10 sm:top-[-1.25rem] sm:mt-0"
            style={{ "--giro": "-6deg" } as React.CSSProperties}
          >
            <span className="hidden lg:inline">passe o mouse e veja de perto</span>
            <span className="lg:hidden">toque e veja de perto</span>
          </span>
        </div>
        <p className="tagline">Quatro projetos que eu construí.</p>

        <div className="mt-14">
          <GaleriaExpansiva projetos={projetos} />
        </div>
      </div>
    </section>
  );
}

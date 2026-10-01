import { site, stats, whatsappLink } from "@/lib/site";
import Engrenagem from "./Engrenagem";

/**
 * Os números da Popsdev viram adesivos colados em volta do letreiro.
 * Cada um tem cor, forma e ângulo próprios; no celular eles saem de cima
 * das letras e fazem uma fileira logo abaixo.
 */
const adesivos = [
  {
    ...stats[0],
    forma: "rounded-[18px] bg-papel",
    giro: "-7deg",
    lugar: "md:left-[3%] md:top-[-14%]",
  },
  {
    ...stats[1],
    forma: "aspect-square w-[6rem] items-center justify-center rounded-full bg-acento text-center sm:w-[9.5rem]",
    giro: "9deg",
    lugar: "md:right-[1%] md:top-[-22%]",
  },
  {
    ...stats[2],
    forma: "rounded-full bg-andesito-claro sm:px-6",
    giro: "-4deg",
    lugar: "md:bottom-[-16%] md:right-[16%]",
  },
];

export default function Hero() {
  return (
    <section id="topo" className="relative overflow-hidden bg-faixa-latao pb-20 pt-[4.75rem] sm:pb-28">
      <div className="wrap relative pt-14 sm:pt-20 lg:pt-24">
        <div className="relative">
          {/* O nome em escultura, com a engrenagem inflada no lugar do O —
              a mesma ideia da logo em pixel art. Decorativo: quem lê a
              página por leitor de tela já ouviu o nome no menu. */}
          <p
            className="letreiro display flex select-none items-center justify-center text-[13.6vw] xl:text-[12.75rem]"
            aria-hidden="true"
          >
            <span>P</span>
            <Engrenagem engatar traco={7} className="mx-[0.01em] h-[1.16em] w-[1.16em] shrink-0" />
            <span>PSDEV</span>
          </p>

          <ul className="mt-7 flex flex-wrap items-center gap-2 sm:gap-4 md:mt-0" aria-label="Números">
            {adesivos.map((a, i) => (
              <li
                key={a.label}
                className={`adesivo animate-colar max-sm:px-3 max-sm:py-2 md:absolute ${a.forma} ${a.lugar}`}
                style={{ "--giro": a.giro, animationDelay: `${450 + i * 140}ms` } as React.CSSProperties}
              >
                <span className="display text-[1.6rem] normal-case sm:text-[2.75rem]">{a.valor}</span>
                <span className="mt-1.5 text-[11px] font-bold tracking-[0.02em] sm:text-[13px]">{a.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 grid gap-8 md:mt-24 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
          <h1 className="max-w-[16ch] text-[2.4rem] font-extrabold leading-[1] tracking-[-0.025em] sm:text-[3.4rem] lg:text-[4rem]">
            Sites e landing pages que movem seu negócio.
          </h1>

          <div>
            <p className="lead max-w-[44ch]">
              Identidade visual que faz sua marca ser notada e ferramentas que aumentam o seu rendimento —
              sem depender de esforço manual todo dia.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
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
          </div>
        </div>
      </div>
    </section>
  );
}

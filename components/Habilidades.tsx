import CarrosselPreguicoso from "./CarrosselPreguicoso";
import Reveal from "./Reveal";

/**
 * Seção "o que eu sei fazer".
 *
 * Isto aqui é componente de servidor de propósito: o título, o texto e
 * a chamada para o briefing vão no HTML, então o Google lê e a primeira
 * pintura já mostra alguma coisa. Só o carrossel — a parte que precisa
 * do Swiper — desce depois, e só quando chega perto da tela.
 */
export default function Habilidades() {
  return (
    <section id="habilidades" className="pt-28 sm:pt-36">
      <div className="wrap">
        <Reveal className="rule">
          <span className="num">04</span>
          <span className="label-mono">O que eu sei fazer</span>
        </Reveal>

        <Reveal delay={60}>
          <h2 className="display mt-10 max-w-3xl text-4xl leading-[0.95] sm:text-6xl lg:text-7xl">
            Arraste e veja.
          </h2>
          <p className="lead mt-6 max-w-xl">
            Cada peça abaixo é uma tela de verdade, funcionando aqui dentro — não o print de um
            portfólio. É mais ou menos assim que o seu projeto começa.
          </p>
        </Reveal>
      </div>

      <div className="mt-14">
        <CarrosselPreguicoso />
      </div>

      <div className="wrap">
        <Reveal delay={80}>
          <div className="mt-10 overflow-hidden rounded-[28px] border border-line bg-base-900/60 p-8 text-center sm:p-12">
            <p className="label-mono">O seu não está aí</p>
            <h3 className="display mx-auto mt-4 max-w-2xl text-3xl leading-[1] sm:text-5xl">
              Me conta o que você precisa.
            </h3>
            <p className="lead mx-auto mt-5 max-w-md text-sm">
              São quatro perguntas rápidas. No fim, o WhatsApp abre com tudo escrito e eu volto com
              uma proposta — escopo e valor fechados antes de qualquer coisa começar.
            </p>

            <a href="#contato" className="btn-solid mt-8 !h-12 !rounded-full !px-8">
              Começar o briefing
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import CarrosselPreguicoso from "./CarrosselPreguicoso";
import Engrenagem from "./Engrenagem";

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
    <section id="habilidades" className="faixa overflow-hidden bg-papel">
      <div className="wrap">
        <h2 className="display-secao">
          Arraste
          <br />e veja
        </h2>
        <p className="tagline">Cada peça abaixo é uma tela de verdade.</p>
        <p className="lead mt-4 max-w-[46ch]">
          Funcionando aqui dentro — não o print de um portfólio. É mais ou menos assim que o seu projeto
          começa.
        </p>
      </div>

      <div className="mt-14">
        <CarrosselPreguicoso />
      </div>

      <div className="wrap">
        <div className="relative mt-10 overflow-hidden rounded-[40px] border-2 border-tinta bg-tinta p-8 text-papel sm:p-12 lg:p-16">
          <div className="relative z-10 max-w-2xl">
            <p className="text-[15px] font-bold text-acento-claro">O seu não está aí?</p>
            <h3 className="display mt-5 text-[clamp(2.5rem,6.4vw,5.6rem)] !leading-[0.9] text-acento">
              Me conta o que você precisa.
            </h3>
            <p className="mt-7 max-w-md text-[16px] leading-relaxed text-papel/75">
              São quatro perguntas rápidas. No fim, o WhatsApp abre com tudo escrito e eu volto com uma
              proposta — escopo e valor fechados antes de qualquer coisa começar.
            </p>

            <a href="#contato" className="btn mt-8 bg-acento text-tinta hover:bg-papel">
              Começar o briefing
            </a>
          </div>

          <Engrenagem className="pointer-events-none absolute -bottom-28 -right-24 hidden h-[26rem] w-[26rem] md:block lg:-bottom-20 lg:right-[-3rem] lg:h-[30rem] lg:w-[30rem]" />
        </div>
      </div>
    </section>
  );
}

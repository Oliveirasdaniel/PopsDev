"use client";

import { memo, useCallback, useRef, useState } from "react";
import type { Swiper as TipoSwiper } from "swiper";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";

import { AMOSTRAS } from "./amostras/Amostras";

/**
 * O carrossel em si. Fica separado da seção porque é a única parte que
 * precisa do Swiper — e o Swiper é o pedaço pesado da página.
 *
 * TRÊS COISAS que este arquivo precisa manter. Cada uma consertou um
 * bug real de arraste; mexer nelas traz o bug de volta.
 *
 * 1. CICLOS = 3. O loop do Swiper funciona clonando slides; quando o
 *    arraste alcança a borda do buffer de clones, ele reposiciona tudo
 *    de uma vez, sem transição. Com 6 amostras e ~5 cabendo numa tela
 *    larga, essa correção caía bem no meio do campo de visão — era o
 *    "teleporte". Com 18 slides a costura acontece fora da tela.
 *
 * 2. As configurações ficam FORA do componente. Objeto criado dentro do
 *    render é um objeto novo a cada render; o Swiper enxerga parâmetro
 *    novo, refaz o loop e a posição salta.
 *
 * 3. O Swiper vive num componente memoizado, separado da legenda. Como
 *    a legenda guarda qual slide está ativo, ela re-renderiza a cada
 *    troca — e, sem o memo, arrastaria o carrossel junto, destruindo e
 *    recriando os clones no meio do movimento.
 *
 * A paginação é nossa, não a do Swiper: com 18 slides ele desenharia 18
 * bolinhas. São 6 habilidades, então são 6 bolinhas.
 */

const CICLOS = 3;

const SLIDES = Array.from({ length: CICLOS }, (_, ciclo) =>
  AMOSTRAS.map((amostra, indice) => ({ ...amostra, chave: `${amostra.id}-${ciclo}`, indice })),
).flat();

// Começa no segundo ciclo: assim já existe pista para os dois lados e o
// primeiro arraste para a esquerda não cai direto na costura.
const INICIAL = AMOSTRAS.length;

const MODULOS = [EffectCoverflow, Autoplay];
const AUTOPLAY = { delay: 4200, disableOnInteraction: true };
const COVERFLOW = { rotate: 34, stretch: 0, depth: 120, modifier: 1, slideShadows: false };

const CSS = `
  .carrossel-habilidades .swiper-slide { width: 272px; height: 340px; }
`;

type Props = {
  aoTrocar: (indice: number) => void;
  aoCriar: (s: TipoSwiper) => void;
};

const Carrossel = memo(function Carrossel({ aoTrocar, aoCriar }: Props) {
  return (
    <>
      <style>{CSS}</style>
      <Swiper
        modules={MODULOS}
        effect="coverflow"
        grabCursor
        centeredSlides
        loop
        loopAdditionalSlides={4}
        initialSlide={INICIAL}
        slidesPerView="auto"
        spaceBetween={16}
        speed={520}
        autoplay={AUTOPLAY}
        coverflowEffect={COVERFLOW}
        onSwiper={aoCriar}
        onSlideChange={(s: TipoSwiper) => {
          // NAO usar realIndex: com loop + slidesPerView "auto" ele
          // reporta errado ao passar pelos clones — era isso que travava
          // a legenda em "6/6". O indice verdadeiro vai gravado no
          // proprio elemento, e o Swiper copia o atributo ao clonar.
          const indice = Number(
            (s.slides?.[s.activeIndex] as HTMLElement | undefined)?.dataset?.indice,
          );
          if (Number.isInteger(indice)) aoTrocar(indice);
        }}
        className="carrossel-habilidades"
      >
        {SLIDES.map(({ chave, indice, Componente, titulo }) => (
          <SwiperSlide key={chave} data-indice={indice}>
            <div className="h-full w-full" role="img" aria-label={titulo}>
              <Componente />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
});

export default function CarrosselHabilidades() {
  const [ativo, setAtivo] = useState(0);
  const swiper = useRef<TipoSwiper | null>(null);

  // Referências estáveis: sem isto o memo acima não serviria de nada.
  const aoTrocar = useCallback((indice: number) => setAtivo(indice), []);
  const aoCriar = useCallback((s: TipoSwiper) => {
    swiper.current = s;
  }, []);

  // Clicar numa bolinha vai para a cópia MAIS PRÓXIMA daquela amostra,
  // não para a primeira da lista — senão o carrossel atravessaria dois
  // ciclos inteiros para chegar num slide que estava do lado.
  const irPara = useCallback((alvo: number) => {
    const s = swiper.current;
    if (!s?.slides) return;

    let melhor = -1;
    s.slides.forEach((el, i) => {
      if (Number((el as HTMLElement).dataset.indice) !== alvo) return;
      if (melhor === -1 || Math.abs(i - s.activeIndex) < Math.abs(melhor - s.activeIndex)) {
        melhor = i;
      }
    });

    if (melhor >= 0) s.slideTo(melhor);
  }, []);

  const amostra = AMOSTRAS[ativo] ?? AMOSTRAS[0];

  return (
    <>
      <Carrossel aoTrocar={aoTrocar} aoCriar={aoCriar} />

      <div className="wrap">
        <div className="mt-8 flex items-center justify-center gap-2">
          {AMOSTRAS.map((a, i) => (
            <button
              key={a.id}
              type="button"
              onClick={() => irPara(i)}
              aria-label={a.titulo}
              aria-current={i === ativo}
              className={`h-2 transition-all duration-300 ${
                i === ativo ? "w-6 bg-acento" : "w-2 bg-bone/25 hover:bg-bone/50"
              }`}
            />
          ))}
        </div>

        {/* Altura mínima fixa: sem ela a página pula quando o texto troca. */}
        <div className="mx-auto mt-6 min-h-[7rem] max-w-md text-center">
          <p className="num">
            {String(ativo + 1).padStart(2, "0")} / {String(AMOSTRAS.length).padStart(2, "0")}
          </p>
          <h3 className="display mt-2 text-2xl sm:text-3xl">{amostra.titulo}</h3>
          <p className="lead mt-2 text-sm">{amostra.texto}</p>
        </div>
      </div>
    </>
  );
}

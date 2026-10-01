/**
 * A engrenagem da logo, inflada: a mesma peça da pixel art (aro, oito
 * dentes e eixo quadrado de andesito), redesenhada em vetor e sombreada
 * como um objeto de borracha cheio de ar.
 *
 * O volume é feito por filtro SVG — sem filtro de iluminação, que o Safari
 * desenha diferente. É só recorte, deslocamento e desfoque: a forma é
 * encolhida, empurrada para o alto à esquerda e borrada, e isso vira a
 * área iluminada. O que sobra embaixo à direita fica escuro.
 *
 * O filtro fica num <g> que NÃO gira; o giro acontece dentro dele. Assim a
 * luz continua vindo do mesmo lado em qualquer ângulo.
 *
 * Os filtros são definidos uma vez só, em <DefsEngrenagem /> (no layout),
 * e cada engrenagem da página aponta para eles.
 */

const DENTES = [0, 45, 90, 135, 180, 225, 270, 315];

/** `contorno`: traço medido em pixel de tela, igual em qualquer tamanho. */
function Forma({ contorno = false }: { contorno?: boolean }) {
  const efeito = contorno ? "non-scaling-stroke" : undefined;

  return (
    <>
      {/* Aro: círculo externo menos o furo, com evenodd. */}
      <path
        fillRule="evenodd"
        vectorEffect={efeito}
        d="M100 36a64 64 0 1 1 0 128a64 64 0 1 1 0-128zM100 66a34 34 0 1 0 0 68a34 34 0 1 0 0-68z"
      />
      {DENTES.map((g) => (
        <rect
          key={g}
          x="83"
          y="9"
          width="34"
          height="46"
          rx="10"
          vectorEffect={efeito}
          transform={`rotate(${g} 100 100)`}
        />
      ))}
    </>
  );
}

type Props = {
  className?: string;
  /** Sem eixo, o furo fica vazio — para pôr um número por cima. */
  eixo?: boolean;
  /** Engata ao carregar e avança um dente no hover do `.letreiro`. */
  engatar?: boolean;
  /** Espessura do contorno, em pixels de tela (a metade de fora aparece). */
  traco?: number;
};

export default function Engrenagem({ className, eixo = true, engatar = false, traco = 5 }: Props) {
  const giro = engatar ? "engrenagem-giro" : undefined;

  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" overflow="visible">
      <g className={engatar ? "origin-center animate-engatar [transform-box:fill-box]" : undefined}>
        {/* Contorno: a mesma forma com traço de tinta, por baixo. A metade
            de dentro do traço some sob o latão; a de fora vira o recorte. */}
        <g className={giro}>
          <g fill="#24170b" stroke="#24170b" strokeWidth={traco} strokeLinejoin="round">
            <Forma contorno />
          </g>
        </g>

        {/* Furo: fundo de tinta, para o eixo parecer encaixado lá dentro. */}
        <circle cx="100" cy="100" r="34.5" fill="#24170b" />

        <g filter="url(#inflar-latao)">
          <g className={giro} fill="#c27e22">
            <Forma />
          </g>
        </g>

        {eixo && (
          <>
            <g className={giro}>
              <rect
                x="81"
                y="81"
                width="38"
                height="38"
                rx="7"
                fill="#24170b"
                stroke="#24170b"
                strokeWidth={traco}
                vectorEffect="non-scaling-stroke"
              />
            </g>
            <g filter="url(#inflar-andesito)">
              <g className={giro}>
                <rect x="81" y="81" width="38" height="38" rx="7" fill="#6f7470" />
              </g>
            </g>
          </>
        )}
      </g>
    </svg>
  );
}

/** Material inflado: base escura, meio-tom, luz e brilho, mais um grão fosco. */
function Inflar({ id, escuro, meio, luz }: { id: string; escuro: string; meio: string; luz: string }) {
  return (
    <filter id={id} x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
      <feFlood floodColor={escuro} result="cEscuro" />
      <feComposite in="cEscuro" in2="SourceAlpha" operator="in" result="base" />

      <feMorphology in="SourceAlpha" operator="erode" radius="3" result="e1" />
      <feOffset in="e1" dx="-3" dy="-4" result="o1" />
      <feGaussianBlur in="o1" stdDeviation="4" result="b1" />
      <feFlood floodColor={meio} result="cMeio" />
      <feComposite in="cMeio" in2="b1" operator="in" result="meio" />

      <feMorphology in="SourceAlpha" operator="erode" radius="8" result="e2" />
      <feOffset in="e2" dx="-6" dy="-8" result="o2" />
      <feGaussianBlur in="o2" stdDeviation="4.5" result="b2" />
      <feFlood floodColor={luz} result="cLuz" />
      <feComposite in="cLuz" in2="b2" operator="in" result="luz" />

      <feMorphology in="SourceAlpha" operator="erode" radius="12" result="e3" />
      <feOffset in="e3" dx="-8" dy="-10" result="o3" />
      <feGaussianBlur in="o3" stdDeviation="2.5" result="b3" />
      <feFlood floodColor="#ffffff" floodOpacity="0.55" result="cBrilho" />
      <feComposite in="cBrilho" in2="b3" operator="in" result="brilho" />

      <feMerge result="pintado">
        <feMergeNode in="base" />
        <feMergeNode in="meio" />
        <feMergeNode in="luz" />
        <feMergeNode in="brilho" />
      </feMerge>

      {/* Grão: pintas escuras e esparsas, como borracha fosca. */}
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" result="ruido" />
      <feColorMatrix
        in="ruido"
        type="matrix"
        values="0 0 0 0 0.14  0 0 0 0 0.09  0 0 0 0 0.04  0.6 0 0 0 -0.33"
        result="grao"
      />
      <feComposite in="grao" in2="pintado" operator="atop" result="granulado" />
      <feComposite in="granulado" in2="SourceAlpha" operator="in" />
    </filter>
  );
}

export function DefsEngrenagem() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
      <defs>
        <Inflar id="inflar-latao" escuro="#c27e22" meio="#f0b73c" luz="#ffe38a" />
        <Inflar id="inflar-andesito" escuro="#474b48" meio="#a3a7a2" luz="#d5d8d3" />
      </defs>
    </svg>
  );
}

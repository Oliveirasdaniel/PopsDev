/**
 * A engrenagem da logo em vetor: a mesma peça da pixel art (aro, oito
 * dentes e eixo quadrado de andesito), em duas versões.
 *
 * - <Marca />: chapada, para o menu e o rodapé.
 * - <DesenhoEngrenagem />: desenho técnico em fio de latão, no topo da
 *   página inicial. Ela engata um dente ao carregar — o único movimento
 *   que a página faz sozinha.
 */

const DENTES = [0, 45, 90, 135, 180, 225, 270, 315];

const LATAO = "#f0b73c";
const TINTA = "#24170b";

function Forma(props: React.SVGProps<SVGGElement>) {
  return (
    <g {...props}>
      {/* Aro: círculo externo menos o furo, com evenodd. */}
      <path
        fillRule="evenodd"
        vectorEffect="non-scaling-stroke"
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
          vectorEffect="non-scaling-stroke"
          transform={`rotate(${g} 100 100)`}
        />
      ))}
    </g>
  );
}

export function Marca({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <Forma fill={LATAO} />
      <rect x="81" y="81" width="38" height="38" rx="7" fill="#a3a7a2" />
    </svg>
  );
}

/** Ponto a `r` do centro (220, 220), no ângulo `graus` (0 = topo, horário). */
function ponto(r: number, graus: number) {
  const rad = ((graus - 90) * Math.PI) / 180;
  return [220 + r * Math.cos(rad), 220 + r * Math.sin(rad)].map((n) => +n.toFixed(2));
}

/**
 * Feito para a faixa de tinta: o corpo da peça é pintado com a cor da
 * faixa (levemente clareada) para esconder a metade de dentro do traço e
 * as emendas entre aro e dentes. O que sobra é só a silhueta.
 */
export function DesenhoEngrenagem({ className }: { className?: string }) {
  const [ax, ay] = ponto(184, 0);
  const [bx, by] = ponto(184, 45);
  const [rx, ry] = ponto(198, 45);
  // No vão entre os dois dentes, por dentro do arco da cota.
  const [tx, ty] = ponto(171, 22.5);

  const fio = { stroke: LATAO, strokeWidth: 1, fill: "none", vectorEffect: "non-scaling-stroke" as const };
  // Traço-ponto: a linha de centro do desenho técnico.
  const centro = { ...fio, strokeOpacity: 0.4, strokeDasharray: "18 5 3 5" };

  return (
    <svg viewBox="0 0 440 440" className={className} aria-hidden="true">
      <defs>
        {/* Hachura do eixo: no desenho técnico, é a peça vista em corte. */}
        <pattern id="hachura" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="5" stroke={LATAO} strokeOpacity="0.5" strokeWidth="1.2" />
        </pattern>
      </defs>

      <circle cx="220" cy="220" r="206" {...fio} strokeOpacity="0.22" strokeDasharray="2 7" />

      {/* O transform da geometria fica num <g> e o giro do CSS em outro:
          transform de CSS no mesmo elemento apagaria o do atributo. */}
      <g className="animate-engatar" style={{ transformOrigin: "220px 220px", transformBox: "view-box" }}>
        <g transform="translate(220 220) scale(1.85) translate(-100 -100)">
          <Forma stroke={LATAO} strokeWidth={2.6} strokeLinejoin="round" fill={LATAO} />
          <Forma fill="#302114" />
          <rect
            x="81"
            y="81"
            width="38"
            height="38"
            rx="7"
            fill="url(#hachura)"
            stroke={LATAO}
            strokeWidth={1.3}
            vectorEffect="non-scaling-stroke"
          />
        </g>
      </g>

      {/* Por cima da peça, como no papel: linhas de centro e o círculo
          primitivo, onde os dentes de duas engrenagens se encontram. */}
      <line x1="6" y1="220" x2="434" y2="220" {...centro} />
      <line x1="220" y1="6" x2="220" y2="434" {...centro} />
      <line x1="220" y1="220" x2={rx} y2={ry} {...centro} />
      <circle cx="220" cy="220" r="140" {...centro} />

      {/* A cota: oito dentes, um a cada 45°. É o passo que ela engata. */}
      <path d={`M${ax} ${ay}A184 184 0 0 1 ${bx} ${by}`} {...fio} strokeOpacity="0.75" />
      <circle cx={ax} cy={ay} r="2.2" fill={LATAO} />
      <circle cx={bx} cy={by} r="2.2" fill={LATAO} />
      <text
        x={tx}
        y={ty}
        fill={LATAO}
        fontSize="13"
        fontWeight="500"
        textAnchor="middle"
        dominantBaseline="middle"
        transform={`rotate(22.5 ${tx} ${ty})`}
        style={{ fontFamily: "var(--font-sans)" }}
      >
        45°
      </text>

      <circle cx="220" cy="220" r="3" fill={TINTA} stroke={LATAO} strokeWidth="1" />
    </svg>
  );
}

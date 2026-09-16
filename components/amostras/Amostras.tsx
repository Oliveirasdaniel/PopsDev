"use client";

/**
 * As amostras do carrossel de habilidades.
 *
 * Cada uma é uma MINI-INTERFACE renderizada de verdade, não a foto de
 * um print. Dois motivos: não depende de eu ter imagem de cliente para
 * cada habilidade, e mostrar a coisa funcionando convence mais que
 * mostrar a fotografia dela.
 *
 * Cada amostra usa a linguagem visual do seu próprio nicho — a de
 * delivery é quente, a de agenda é clara, a de painel é escura, a
 * sticker é pastel. É isso que prova repertório.
 */

const Moldura = ({
  children,
  fundo,
  etiqueta,
  cor,
}: {
  children: React.ReactNode;
  fundo: string;
  etiqueta: string;
  cor: string;
}) => (
  <div className="flex h-full w-full flex-col overflow-hidden rounded-[20px] border border-white/10">
    <div className="flex items-center gap-1.5 border-b border-black/10 px-3 py-2" style={{ background: cor }}>
      <span className="h-2 w-2 rounded-full bg-black/25" />
      <span className="h-2 w-2 rounded-full bg-black/15" />
      <span className="h-2 w-2 rounded-full bg-black/10" />
      <span className="ml-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-black/55">
        {etiqueta}
      </span>
    </div>
    <div className="flex-1 overflow-hidden" style={{ background: fundo }}>
      {children}
    </div>
  </div>
);

/* ---------------------------------------------------------- 1 */
export function AmostraDelivery() {
  const itens = [
    { n: "X-Bacon", d: "cheddar, bacon, cebola", p: "32,00" },
    { n: "Pizza calabresa", p: "a partir de 45,00", d: "muçarela e cebola" },
    { n: "Refrigerante", d: "lata 350ml", p: "6,00" },
  ];

  return (
    <Moldura fundo="#faf9f7" cor="#fb4903" etiqueta="Delivery">
      <div className="flex h-full flex-col p-3">
        <div className="flex gap-1.5">
          {["Lanches", "Pizzas", "Bebidas"].map((c, i) => (
            <span
              key={c}
              className={`rounded-full px-2.5 py-1 text-[9px] font-semibold ${
                i === 0 ? "bg-[#fb4903] text-white" : "border border-black/10 text-black/45"
              }`}
            >
              {c}
            </span>
          ))}
        </div>

        <div className="mt-2.5 flex-1 space-y-1.5">
          {itens.map((i) => (
            <div key={i.n} className="flex items-center gap-2 rounded-xl border border-black/[.07] bg-white p-2">
              <div className="min-w-0 flex-1">
                <p className="truncate text-[10px] font-semibold text-black/85">{i.n}</p>
                <p className="truncate text-[8px] text-black/40">{i.d}</p>
                <p className="mt-0.5 text-[9px] font-bold text-black/75">R$ {i.p}</p>
              </div>
              <div className="h-9 w-9 shrink-0 rounded-lg bg-gradient-to-br from-[#ffd731] to-[#fb4903]" />
            </div>
          ))}
        </div>

        <div className="mt-2 flex items-center justify-between rounded-xl bg-[#fb4903] px-3 py-2 text-white">
          <span className="text-[9px] font-semibold">2 itens</span>
          <span className="text-[9px] font-bold">Ver pedido · R$ 64,00</span>
        </div>
      </div>
    </Moldura>
  );
}

/* ---------------------------------------------------------- 2 */
export function AmostraAgenda() {
  const horas = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00"];
  const ocupados = [1, 4, 5];

  return (
    <Moldura fundo="#ffffff" cor="#55db9c" etiqueta="Agendamento">
      <div className="flex h-full flex-col p-3">
        <p className="text-[10px] font-bold text-black/80">Terça, 14</p>
        <p className="text-[8px] text-black/40">Corte + barba · 45 min</p>

        <div className="mt-2.5 grid flex-1 grid-cols-3 gap-1.5">
          {horas.map((h, i) => (
            <span
              key={h}
              className={`grid place-items-center rounded-lg text-[9px] font-semibold ${
                ocupados.includes(i)
                  ? "bg-black/[.04] text-black/25 line-through"
                  : i === 2
                    ? "bg-[#55db9c] text-black/80"
                    : "border border-black/10 text-black/60"
              }`}
            >
              {h}
            </span>
          ))}
        </div>

        <div className="mt-2 rounded-xl bg-black px-3 py-2 text-center text-[9px] font-bold text-white">
          Confirmar 10:00
        </div>
      </div>
    </Moldura>
  );
}

/* ---------------------------------------------------------- 3 */
export function AmostraPainel() {
  const barras = [42, 68, 55, 88, 74, 96, 61];

  return (
    <Moldura fundo="#141413" cor="#5c4ade" etiqueta="Painel">
      <div className="flex h-full flex-col p-3 text-white">
        <p className="text-[8px] uppercase tracking-[0.16em] text-white/40">Hoje</p>
        <p className="text-[22px] font-semibold leading-none tracking-tight">R$ 1.284</p>
        <p className="text-[8px] text-white/40">em 37 pedidos</p>

        <div className="mt-3 flex flex-1 items-end gap-1.5">
          {barras.map((b, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-[3px]"
              style={{
                height: `${b}%`,
                background: i === 5 ? "#f0b73c" : "rgba(255,255,255,.16)",
              }}
            />
          ))}
        </div>

        <div className="mt-2 grid grid-cols-2 gap-1.5">
          {[
            ["Ticket", "R$ 34"],
            ["Em aberto", "4"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-lg border border-white/10 p-1.5">
              <p className="text-[7px] uppercase tracking-wider text-white/35">{k}</p>
              <p className="text-[11px] font-semibold">{v}</p>
            </div>
          ))}
        </div>
      </div>
    </Moldura>
  );
}

/* ---------------------------------------------------------- 4 */
export function AmostraSticker() {
  return (
    <Moldura fundo="#dceeff" cor="#ffd731" etiqueta="Landing divertida">
      <div className="relative flex h-full flex-col items-center justify-center p-3">
        <span className="absolute left-3 top-4 rotate-[-12deg] rounded-2xl border border-black bg-[#fb4903] px-2 py-1 text-[8px] font-black text-white">
          NOVO
        </span>
        <span className="absolute right-4 top-8 rotate-[10deg] rounded-full border border-black bg-[#ffd731] px-2 py-1 text-[8px] font-black">
          -30%
        </span>
        <span className="absolute bottom-10 left-5 rotate-[6deg] rounded-2xl border border-black bg-[#e9ccff] px-2 py-1 text-[8px] font-black">
          grátis
        </span>

        <p className="text-center text-[34px] font-black uppercase leading-[0.78] tracking-tight text-black">
          peça
          <br />
          agora
        </p>

        <span className="mt-3 rounded-full border border-black bg-black px-3 py-1.5 text-[8px] font-bold text-white">
          Começar
        </span>

        <div className="absolute -bottom-6 left-1/2 h-16 w-24 -translate-x-1/2 rounded-[50%] bg-[#4da2ff]" />
      </div>
    </Moldura>
  );
}

/* ---------------------------------------------------------- 5 */
export function AmostraLoja() {
  return (
    <Moldura fundo="#f7f5f2" cor="#55db9c" etiqueta="Loja e quiz">
      <div className="flex h-full flex-col p-3">
        <div className="rounded-xl border border-black/[.07] bg-white p-2.5">
          <p className="text-[8px] uppercase tracking-[0.14em] text-black/35">Pergunta 2 de 4</p>
          <p className="mt-1 text-[11px] font-semibold leading-tight text-black/85">
            Como está seu cabelo hoje?
          </p>

          <div className="mt-2 space-y-1">
            {["Ressecado nas pontas", "Oleoso na raiz", "Com queda"].map((o, i) => (
              <div
                key={o}
                className={`rounded-lg px-2 py-1.5 text-[9px] ${
                  i === 0 ? "bg-[#2d4a3e] text-white" : "border border-black/10 text-black/55"
                }`}
              >
                {o}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-2 flex-1 rounded-xl border border-black/[.07] bg-white p-2">
          <p className="text-[8px] font-semibold text-black/45">Recomendado para você</p>
          <div className="mt-1.5 flex gap-1.5">
            {["#2d4a3e", "#8fae8b", "#d9c9a8"].map((c) => (
              <div key={c} className="h-10 flex-1 rounded-lg" style={{ background: c }} />
            ))}
          </div>
          <p className="mt-1.5 text-[9px] font-bold text-black/75">Linha Hidratação · R$ 59,90</p>
        </div>
      </div>
    </Moldura>
  );
}

/* ---------------------------------------------------------- 6 */
export function AmostraIdentidade() {
  return (
    <Moldura fundo="#141413" cor="#f0b73c" etiqueta="Identidade visual">
      <div className="flex h-full flex-col p-3 text-[#ece9e2]">
        {/* A própria identidade da Popsdev, como amostra de repertório. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo/letreiro.svg" alt="" width={124} height={42} className="[image-rendering:pixelated]" />
        <p className="mt-2 text-[8px] uppercase tracking-[0.2em] text-[#8b8b85]">Archivo · Jersey 10</p>

        <div className="mt-3 grid grid-cols-5 gap-1">
          {["#141413", "#f0b73c", "#ffe38a", "#a3a7a2", "#474b48"].map((c) => (
            <div key={c} className="aspect-square border border-white/15" style={{ background: c }} />
          ))}
        </div>

        <div className="mt-3 flex flex-1 items-end gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo/marca.svg" alt="" width={38} height={38} className="[image-rendering:pixelated]" />
          <div className="flex-1 space-y-1">
            <div className="h-1.5 w-full bg-white/10" />
            <div className="h-1.5 w-2/3 bg-white/10" />
            <div className="h-1.5 w-1/2 bg-[#f0b73c]" />
          </div>
        </div>
      </div>
    </Moldura>
  );
}

export const AMOSTRAS = [
  {
    id: "delivery",
    titulo: "Cardápio com delivery",
    texto: "Carrinho, adicionais, taxa por bairro e pedido fechando sem aplicativo no meio.",
    Componente: AmostraDelivery,
  },
  {
    id: "agenda",
    titulo: "Agendamento online",
    texto: "O cliente escolhe serviço, profissional e horário sozinho. Sem ping-pong de mensagem.",
    Componente: AmostraAgenda,
  },
  {
    id: "painel",
    titulo: "Painel e relatórios",
    texto: "Faturamento do dia, o que mais vendeu e pedidos em aberto — em tempo real.",
    Componente: AmostraPainel,
  },
  {
    id: "sticker",
    titulo: "Landing de campanha",
    texto: "Quando o negócio pede alegria: tipografia grande, cor viva e um clique só.",
    Componente: AmostraSticker,
  },
  {
    id: "loja",
    titulo: "Loja com diagnóstico",
    texto: "Catálogo, carrinho e um quiz que recomenda o produto certo para cada cliente.",
    Componente: AmostraLoja,
  },
  {
    id: "identidade",
    titulo: "Identidade visual",
    texto: "Cor, tipografia e marca antes do código — para o site não parecer template.",
    Componente: AmostraIdentidade,
  },
];

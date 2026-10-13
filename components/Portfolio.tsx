"use client";

import { useEffect, useRef, useState } from "react";
import { projetos } from "@/lib/site";
import Screenshot from "./Screenshot";

/**
 * Índice de projetos: os nomes grandes, um por linha, separados por fios.
 * Com mouse, o print do site acompanha o cursor enquanto ele está sobre a
 * linha. No toque não há hover, então cada linha já traz a miniatura.
 */
export default function Portfolio() {
  const [ativo, setAtivo] = useState<number | null>(null);
  const previa = useRef<HTMLDivElement>(null);
  const alvo = useRef({ x: 0, y: 0 });
  const atual = useRef({ x: 0, y: 0 });
  const quadro = useRef<number>();

  // A prévia persegue o cursor com um leve atraso. Mexe direto no estilo,
  // sem re-render a cada movimento.
  useEffect(() => {
    if (ativo === null) return;

    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const passo = () => {
      const a = atual.current;
      const t = alvo.current;
      const k = reduzir ? 1 : 0.18;
      a.x += (t.x - a.x) * k;
      a.y += (t.y - a.y) * k;
      if (previa.current) previa.current.style.transform = `translate3d(${a.x}px, ${a.y}px, 0)`;
      quadro.current = requestAnimationFrame(passo);
    };
    quadro.current = requestAnimationFrame(passo);
    return () => {
      if (quadro.current) cancelAnimationFrame(quadro.current);
    };
  }, [ativo]);

  // Centrada na altura do cursor e sempre à direita do nome, para nunca
  // cobrir o que está sendo apontado. Sem espaço, encosta na borda da tela.
  const mover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const nome = e.currentTarget.querySelector("[data-nome]")?.getBoundingClientRect();
    const caixa = previa.current?.firstElementChild?.getBoundingClientRect();
    const largura = caixa?.width ?? 384;
    const altura = caixa?.height ?? 240;
    const x = Math.max(e.clientX + 24, (nome?.right ?? 0) + 32);
    alvo.current = {
      x: Math.min(x, window.innerWidth - largura - 16),
      y: e.clientY - altura / 2,
    };
  };

  const entrar = (i: number, e: React.MouseEvent<HTMLAnchorElement>) => {
    mover(e);
    // Ao entrar vindo de fora, nasce já no lugar, sem atravessar a tela.
    if (ativo === null) atual.current = { ...alvo.current };
    setAtivo(i);
  };

  return (
    <section id="projetos" className="secao bg-verde-claro">
      <div className="wrap">
        <div className="cabecalho">
          <h2 className="titulo-secao">Projetos</h2>
          <p className="lead text-verde-escuro/75">
            Sites construídos do zero, cada um no jeito do seu nicho. Todos abertos para você navegar.
          </p>
        </div>

        <ul className="mt-14 border-t border-verde-escuro/20 lg:mt-20" onMouseLeave={() => setAtivo(null)}>
          {projetos.map((p, i) => (
            <li key={p.nome} className="border-b border-verde-escuro/20">
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={(e) => entrar(i, e)}
                onMouseMove={mover}
                className="group flex items-center gap-5 py-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-verde sm:gap-8 md:py-9"
              >
                {/* Miniatura só no toque, onde não existe a prévia flutuante. */}
                <div className="relative aspect-[16/10] w-28 shrink-0 overflow-hidden rounded-md border border-verde-escuro/15 bg-creme sm:w-40 md:hidden">
                  <Screenshot src={p.imagem} alt="" nome={p.nome} sizes="10rem" />
                </div>

                <div className="min-w-0 flex-1 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,17rem)] md:items-baseline md:gap-10">
                  <div>
                    <h3
                      className={`font-display text-[1.6rem] font-bold leading-[1.02] tracking-[-0.03em] transition-colors duration-200 sm:text-[2.2rem] md:text-[clamp(2.6rem,5vw,4.25rem)] ${
                        ativo !== null && ativo !== i ? "md:text-verde-escuro/35" : ""
                      }`}
                    >
                      <span data-nome>{p.nome}</span>
                    </h3>
                    {/* Ressalva do projeto, quando existe: ninguém deve ler o
                        print como loja faturando. */}
                    {p.contexto && (
                      <p className="mt-2 max-w-[60ch] text-[13.5px] leading-relaxed text-verde-escuro/65">{p.contexto}</p>
                    )}
                  </div>

                  <p className="mt-1.5 text-[14px] text-verde-escuro/70 md:mt-0 md:text-[15px]">{p.segmento}</p>
                </div>

                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6 shrink-0 text-verde-escuro/60 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-verde-escuro md:h-8 md:w-8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  aria-hidden="true"
                >
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
                <span className="sr-only">(abre o site em nova aba)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Prévia flutuante: decorativa, o link já diz para onde vai. Todos os
          prints ficam montados para a troca entre linhas não piscar. */}
      <div
        ref={previa}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block"
      >
        <div
          className={`relative aspect-[16/10] w-[24rem] overflow-hidden rounded-lg border border-verde-escuro/20 bg-creme transition-[opacity,transform] duration-200 ${
            ativo === null ? "scale-95 opacity-0" : "scale-100 opacity-100"
          }`}
        >
          {projetos.map((p, i) => (
            <div
              key={p.nome}
              className={`absolute inset-0 transition-opacity duration-200 ${ativo === i ? "opacity-100" : "opacity-0"}`}
            >
              <Screenshot src={p.imagem} alt="" nome={p.nome} sizes="24rem" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

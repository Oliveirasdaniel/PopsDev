"use client";

import { useState } from "react";
import type { projetos as Projetos } from "@/lib/site";
import Screenshot from "./Screenshot";

type Projeto = (typeof Projetos)[number];

/**
 * Faixa de projetos que expande o ativo e encolhe os outros.
 *
 * Em CSS puro. Antes era Framer Motion animando `flexGrow` — cada
 * quadro passava pelo JavaScript. Transição de CSS roda no compositor
 * do navegador e não disputa a thread principal com o resto da página.
 *
 * Ideia original: HoverExpand do Skiper UI (@gurvinder-singh02).
 */
export default function GaleriaExpansiva({ projetos }: { projetos: Projeto[] }) {
  const [ativo, setAtivo] = useState(0);

  return (
    <div className="flex h-[24rem] w-full gap-2 sm:h-[30rem]">
      {projetos.map((p, i) => {
        const expandido = ativo === i;

        return (
          <div
            key={p.nome}
            onMouseEnter={() => setAtivo(i)}
            onClick={() => setAtivo(i)}
            style={{
              flexGrow: expandido ? 4 : 1,
              transition: "flex-grow .45s cubic-bezier(.22,1,.36,1)",
            }}
            className="group/painel relative min-w-0 cursor-pointer overflow-hidden border border-line bg-base-900"
          >
            <div className="absolute inset-0">
              <Screenshot src={p.imagem} alt={`Print do site ${p.nome}`} nome={p.nome} />
            </div>

            {/* Véu: escurece o encolhido, clareia o expandido. */}
            <div
              className="absolute inset-0 bg-base-950 transition-opacity duration-[450ms]"
              style={{ opacity: expandido ? 0.35 : 0.75 }}
            />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-base-950 via-base-950/70 to-transparent" />

            {/* Nome de pé, quando encolhido. */}
            <span
              className={`absolute bottom-6 left-1/2 origin-bottom-left -translate-x-1/2 rotate-180 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.2em] text-bone/70 transition-opacity duration-300 [writing-mode:vertical-rl] ${
                expandido ? "pointer-events-none opacity-0" : "opacity-100"
              }`}
            >
              {p.nome}
            </span>

            {/* Ficha completa, quando expandido. */}
            <div
              className={`absolute inset-x-0 bottom-0 p-6 transition-all duration-300 sm:p-8 ${
                expandido
                  ? "translate-y-0 opacity-100 delay-100"
                  : "pointer-events-none translate-y-3 opacity-0"
              }`}
            >
              <p className="num">{p.segmento}</p>
              <h3 className="display mt-2 text-2xl sm:text-3xl">{p.nome}</h3>
              <p className="mt-2 hidden max-w-md text-sm leading-relaxed text-bone/70 sm:block">
                {p.descricao}
              </p>

              {/* Ressalva do projeto, quando existe. Fica logo abaixo da
                  descrição para ninguém ler o print como loja faturando. */}
              {p.contexto && (
                <p className="mt-3 hidden max-w-md border-l-2 border-acid/50 pl-3 text-xs leading-relaxed text-bone/55 sm:block">
                  {p.contexto}
                </p>
              )}

              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="btn-solid mt-5 !h-9 !px-5 !text-[13px]"
              >
                Visitar site
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}

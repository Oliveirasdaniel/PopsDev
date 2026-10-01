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
    <div className="flex h-[26rem] w-full gap-2.5 sm:h-[32rem]">
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
            className="group/painel relative min-w-0 basis-0 cursor-pointer overflow-hidden rounded-[28px] border-2 border-tinta bg-papel"
          >
            <div className="absolute inset-0">
              <Screenshot src={p.imagem} alt={`Print do site ${p.nome}`} nome={p.nome} />
            </div>

            {/* Véu de papel: apaga o encolhido, some no expandido. */}
            <div
              className="absolute inset-0 bg-faixa-andesito transition-opacity duration-[450ms]"
              style={{ opacity: expandido ? 0 : 0.72 }}
            />

            {/* Nome de pé, quando encolhido, numa pílula de papel. */}
            <span
              className={`absolute bottom-5 left-1/2 -translate-x-1/2 rotate-180 whitespace-nowrap rounded-full border-2 border-tinta bg-papel px-1.5 py-4 text-[13px] font-bold tracking-[0.03em] transition-opacity duration-300 [writing-mode:vertical-rl] ${
                expandido ? "pointer-events-none opacity-0" : "opacity-100"
              }`}
            >
              {p.nome}
            </span>

            {/* Ficha completa, quando expandido: um cartão colado no print. */}
            <div
              className={`absolute bottom-3 left-3 right-3 max-w-md rounded-[22px] border-2 border-tinta bg-papel p-4 transition-all duration-300 sm:bottom-5 sm:left-5 sm:right-auto sm:p-6 ${
                expandido
                  ? "translate-y-0 opacity-100 delay-100"
                  : "pointer-events-none translate-y-3 opacity-0"
              }`}
            >
              <p className="text-[12px] font-bold tracking-[0.02em] text-tinta/70 sm:text-[13px]">{p.segmento}</p>
              <h3 className="mt-1 text-[1.2rem] font-extrabold leading-[1.05] tracking-[-0.02em] sm:text-[1.6rem]">{p.nome}</h3>
              <p className="mt-2 hidden text-[14px] leading-relaxed text-tinta/80 sm:block">{p.descricao}</p>

              {/* Ressalva do projeto, quando existe. Fica logo abaixo da
                  descrição para ninguém ler o print como loja faturando. */}
              {p.contexto && (
                <p className="mt-3 hidden rounded-xl bg-faixa-latao px-3 py-2 text-[12.5px] leading-relaxed text-tinta/80 sm:block">
                  {p.contexto}
                </p>
              )}

              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="btn-solid mt-4 !h-10 !px-5 !text-[13px]"
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

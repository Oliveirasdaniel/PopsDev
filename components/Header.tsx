"use client";

import { useEffect, useState } from "react";
import { site, whatsappLink } from "@/lib/site";
import Nichos from "./Nichos";

const links = [
  { href: "/#servicos", label: "Serviços" },
  { href: "/#projetos", label: "Projetos" },
  { href: "/#processo", label: "Processo" },
  { href: "/#habilidades", label: "Habilidades" },
  { href: "/#faq", label: "Dúvidas" },
  { href: "/sobre", label: "Sobre" },
];

/**
 * Faixa de nichos no topo e, abaixo dela, o menu em pílulas.
 *
 * O menu não tem barra de fundo: as pílulas são de papel com contorno e
 * se leem sobre qualquer faixa. Ele é `sticky` com margem negativa do
 * próprio tamanho — gruda no topo ao rolar, mas não empurra a abertura
 * para baixo, e a cor da faixa aparece por trás dele.
 */
export default function Header() {
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    document.body.style.overflow = aberto ? "hidden" : "";
    if (!aberto) return;

    const fechar = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", fechar);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", fechar);
    };
  }, [aberto]);

  const mensagem = `Olá, Daniel! Vim pelo site da ${site.nome} e quero falar sobre um projeto.`;

  return (
    <>
      <Nichos />

      <header className="sticky top-0 z-50 -mb-[4.75rem] h-[4.75rem]">
        <div className="wrap flex h-full items-center justify-between gap-3">
          <a
            href="/"
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-tinta bg-papel transition-colors hover:bg-acento focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tinta"
            aria-label={`${site.nome} — início`}
          >
            {/* Pixel art em 2x exato (19 -> 38): em escala quebrada os pixels
                ficam com larguras diferentes. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo/marca.svg" alt="" width={38} height={38} className="[image-rendering:pixelated]" />
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegação principal">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="pilula">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={whatsappLink(mensagem)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-solid !h-10 !px-5 !text-[13px]"
            >
              WhatsApp
            </a>

            <button
              type="button"
              onClick={() => setAberto((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full border-2 border-tinta bg-papel transition-colors hover:bg-acento lg:hidden"
              aria-label={aberto ? "Fechar menu" : "Abrir menu"}
              aria-expanded={aberto}
              aria-controls="menu-mobile"
            >
              {/* Um "+" que vira "×" girando 45°. */}
              <span
                className={`relative block h-3.5 w-3.5 transition-transform duration-200 ${aberto ? "rotate-45" : ""}`}
                aria-hidden="true"
              >
                <span className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 rounded-full bg-tinta" />
                <span className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 rounded-full bg-tinta" />
              </span>
            </button>
          </div>
        </div>

        {aberto && (
          <div className="wrap lg:hidden">
            <nav
              id="menu-mobile"
              className="flex flex-col gap-2 rounded-[28px] border-2 border-tinta bg-papel p-3"
              aria-label="Navegação mobile"
            >
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setAberto(false)}
                  className="pilula !h-12 !text-[15px]"
                >
                  {l.label}
                </a>
              ))}
              <a href={whatsappLink(mensagem)} target="_blank" rel="noopener noreferrer" className="btn-solid mt-1">
                Falar no WhatsApp
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { Marca } from "./Engrenagem";

const links = [
  { href: "/#servicos", label: "Serviços" },
  { href: "/#projetos", label: "Projetos" },
  { href: "/#processo", label: "Processo" },
  { href: "/#faq", label: "Dúvidas" },
  { href: "/sobre", label: "Sobre" },
];

/** O nome com a marca. Também usado no rodapé. */
export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <Marca className="h-7 w-7" />
      <span className="titulo text-[1.2rem] !tracking-[-0.02em] text-papel">{site.nome}</span>
    </span>
  );
}

/**
 * Menu fixo na cor da faixa de topo. Toda página abre numa faixa de
 * tinta, então ele não precisa trocar de cor ao rolar.
 */
export default function Header() {
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    if (!aberto) return;

    const fechar = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", fechar);
    return () => window.removeEventListener("keydown", fechar);
  }, [aberto]);

  return (
    <header className="sticky top-0 z-50 border-b border-papel/10 bg-tinta/95 backdrop-blur">
      <div className="wrap flex h-[4.5rem] items-center justify-between gap-6">
        <a
          href="/"
          className="rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-latao"
          aria-label={`${site.nome} — início`}
        >
          <Logo />
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegação principal">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded text-[15px] text-papel/70 transition-colors hover:text-papel focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-latao"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="/#contato" className="btn-latao !h-10 !px-4 !text-[14px] max-[380px]:hidden">
            Pedir orçamento
          </a>

          <button
            type="button"
            onClick={() => setAberto((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-papel/20 text-papel transition-colors hover:border-latao focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-latao lg:hidden"
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
            aria-expanded={aberto}
            aria-controls="menu-mobile"
          >
            {/* Dois fios que se cruzam em "×". */}
            <span className="relative block h-3 w-4" aria-hidden="true">
              <span
                className={`absolute left-0 h-px w-full bg-current transition-transform duration-200 ${
                  aberto ? "top-1/2 rotate-45" : "top-0.5"
                }`}
              />
              <span
                className={`absolute left-0 h-px w-full bg-current transition-transform duration-200 ${
                  aberto ? "top-1/2 -rotate-45" : "bottom-0.5"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {aberto && (
        <nav id="menu-mobile" className="border-t border-papel/10 lg:hidden" aria-label="Navegação mobile">
          <ul className="wrap py-3">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setAberto(false)}
                  className="block border-b border-papel/10 py-4 text-[17px] text-papel/85 hover:text-latao-claro"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="py-4">
              <a href="/#contato" onClick={() => setAberto(false)} className="btn-latao w-full">
                Pedir orçamento
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

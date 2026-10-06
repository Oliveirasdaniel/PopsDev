"use client";

import { useEffect, useState } from "react";
import { site, whatsappLink } from "@/lib/site";
import IconeWhatsapp from "./IconeWhatsapp";

const whatsapp = whatsappLink(`Olá! Vim pelo site da ${site.nome} e quero falar sobre um projeto.`);

const links = [
  { href: "/#servicos", label: "Serviços" },
  { href: "/#projetos", label: "Projetos" },
  { href: "/sobre", label: "Sobre" },
  { href: "/#contato", label: "Contato" },
];

/** O logo é só o nome, na fonte dos títulos. Também usado no rodapé. */
export function Logo({ className = "text-creme" }: { className?: string }) {
  return <span className={`font-display text-[1.4rem] font-bold tracking-[-0.03em] ${className}`}>{site.nome}</span>;
}

/**
 * Menu fixo. Em cima da foto da capa ele é transparente; ao rolar,
 * ganha o verde escuro para continuar legível sobre o creme.
 *
 * `claro`: a página abre num fundo creme (a Sobre), então o menu começa
 * com texto verde escuro e só fica claro quando ganha o fundo ao rolar.
 */
export default function Header({ claro = false }: { claro?: boolean }) {
  const [aberto, setAberto] = useState(false);
  const [rolou, setRolou] = useState(false);

  useEffect(() => {
    const medir = () => setRolou(window.scrollY > 24);
    medir();
    window.addEventListener("scroll", medir, { passive: true });
    return () => window.removeEventListener("scroll", medir);
  }, []);

  useEffect(() => {
    if (!aberto) return;

    const fechar = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", fechar);
    return () => window.removeEventListener("keydown", fechar);
  }, [aberto]);

  const solido = rolou || aberto;
  // Texto escuro só enquanto o menu está transparente sobre o creme.
  const escuro = claro && !solido;
  const cor = escuro
    ? {
        logo: "text-verde-escuro",
        link: "text-verde-escuro/75 hover:text-verde-escuro focus-visible:outline-verde",
        botao: "border-verde-escuro/30 text-verde-escuro hover:border-verde-escuro hover:bg-verde-escuro hover:text-creme",
      }
    : {
        logo: "text-creme",
        link: "text-creme/75 hover:text-creme focus-visible:outline-verde-claro",
        botao: "border-creme/35 text-creme hover:border-creme hover:bg-creme hover:text-verde-escuro",
      };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        solido ? "bg-verde-escuro" : "bg-transparent"
      }`}
    >
      <div className="wrap flex h-[4.5rem] items-center justify-between gap-6">
        <a
          href="/"
          className="rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-verde-claro"
          aria-label={`${site.nome} — início`}
        >
          <Logo className={cor.logo} />
        </a>

        <div className="flex items-center gap-8">
          <nav className="hidden items-center gap-8 md:flex" aria-label="Navegação principal">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`rounded text-[15px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${cor.link}`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden h-10 items-center gap-2 rounded-full border px-4 text-[14px] font-medium transition-colors sm:inline-flex ${cor.botao}`}
          >
            <IconeWhatsapp className="h-[18px] w-[18px]" />
            WhatsApp
          </a>

          <button
            type="button"
            onClick={() => setAberto((v) => !v)}
            className={`grid h-10 w-10 place-items-center rounded-full border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-verde-claro md:hidden ${cor.botao}`}
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
        <nav id="menu-mobile" className="border-t border-creme/10 md:hidden" aria-label="Navegação mobile">
          <ul className="wrap py-3">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setAberto(false)}
                  className="block border-b border-creme/10 py-4 text-[17px] text-creme/85 hover:text-creme"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="py-4">
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-creme text-[15px] font-semibold text-verde-escuro"
              >
                <IconeWhatsapp />
                Chamar no WhatsApp
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

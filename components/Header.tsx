"use client";

import { useEffect, useState } from "react";
import { site, whatsappLink } from "@/lib/site";

const links = [
  { href: "/#servicos", label: "Serviços" },
  { href: "/#projetos", label: "Projetos" },
  { href: "/#processo", label: "Processo" },
  { href: "/#habilidades", label: "Habilidades" },
  { href: "/#faq", label: "Dúvidas" },
  { href: "/sobre", label: "Sobre" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = aberto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [aberto]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        scrolled ? "border-b border-line bg-base-950/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between">
        <a href="/" className="flex items-center" aria-label={`${site.nome} — início`}>
          {/* Pixel art em 2x exato (62x21 -> 124x42): em escala quebrada os
              pixels ficam com larguras diferentes. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo/letreiro.svg" alt="" width={124} height={42} className="[image-rendering:pixelated]" />
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navegação principal">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-pixel text-[20px] uppercase leading-none tracking-[0.06em] text-muted transition-colors hover:text-bone"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={whatsappLink(`Olá, Daniel! Vim pelo site da ${site.nome} e quero falar sobre um projeto.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-solid hidden !h-9 !px-4 sm:inline-flex"
          >
            WhatsApp
          </a>

          <button
            type="button"
            onClick={() => setAberto((v) => !v)}
            className="grid h-9 w-9 place-items-center border border-line md:hidden"
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
            aria-expanded={aberto}
          >
            <span className="relative block h-3.5 w-4">
              <span className={`absolute left-0 h-px w-4 bg-bone transition-all ${aberto ? "top-1.5 rotate-45" : "top-0.5"}`} />
              <span className={`absolute left-0 h-px w-4 bg-bone transition-all ${aberto ? "top-1.5 -rotate-45" : "top-2.5"}`} />
            </span>
          </button>
        </div>
      </div>

      {aberto && (
        <div className="border-t border-line bg-base-950 md:hidden">
          <nav className="wrap flex flex-col py-2" aria-label="Navegação mobile">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setAberto(false)}
                className="border-b border-line py-4 text-[15px] text-bone/90"
              >
                {l.label}
              </a>
            ))}
            <a
              href={whatsappLink(`Olá, Daniel! Vim pelo site da ${site.nome} e quero falar sobre um projeto.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-solid my-5"
            >
              Falar no WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

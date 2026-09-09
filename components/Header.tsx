"use client";

import { useEffect, useState } from "react";
import { site, whatsappLink } from "@/lib/site";
import { IconWhatsApp } from "./Icons";

const links = [
  { href: "#servicos", label: "Serviços" },
  { href: "#portfolio", label: "Projetos" },
  { href: "#processo", label: "Como funciona" },
  { href: "#planos", label: "Planos" },
  { href: "#faq", label: "Dúvidas" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
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
      className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${
        scrolled ? "border-b border-white/10 bg-ink-950/80 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between sm:h-20">
        <a href="#topo" className="group flex items-center gap-2.5" aria-label={`${site.nome} — início`}>
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-moss-500 text-base font-bold text-ink-950">
            P
          </span>
          <span className="text-lg font-semibold tracking-tight">
            {site.nome.replace("dev", "")}
            <span className="text-moss-400">dev</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Navegação principal">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-sand/60 transition hover:text-moss-300">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={whatsappLink(`Olá, Daniel! Vim pelo site da ${site.nome} e quero falar sobre um projeto.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary hidden !px-5 !py-2.5 sm:inline-flex"
          >
            <IconWhatsApp className="h-4 w-4" />
            Chamar no WhatsApp
          </a>

          <button
            type="button"
            onClick={() => setAberto((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 md:hidden"
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
            aria-expanded={aberto}
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 h-0.5 w-5 bg-sand transition ${aberto ? "top-1.5 rotate-45" : "top-0.5"}`}
              />
              <span
                className={`absolute left-0 h-0.5 w-5 bg-sand transition ${aberto ? "top-1.5 -rotate-45" : "top-3"}`}
              />
            </span>
          </button>
        </div>
      </div>

      {aberto && (
        <div className="border-t border-white/10 bg-ink-950/95 backdrop-blur-xl md:hidden">
          <nav className="container-page flex flex-col py-4" aria-label="Navegação mobile">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setAberto(false)}
                className="border-b border-white/5 py-3.5 text-base text-sand/80"
              >
                {l.label}
              </a>
            ))}
            <a
              href={whatsappLink(`Olá, Daniel! Vim pelo site da ${site.nome} e quero falar sobre um projeto.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-5"
            >
              <IconWhatsApp className="h-4 w-4" />
              Chamar no WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

"use client";

import { useEffect, useState } from "react";
import { site, whatsappLink } from "@/lib/site";

export default function BotaoFlutuante() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisivel(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={whatsappLink(`Olá, Daniel! Vim pelo site da ${site.nome} e quero falar sobre um projeto.`)}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-5 right-5 z-40 inline-flex h-11 items-center rounded-sm bg-bone px-5 font-mono text-[11px] uppercase tracking-[0.16em] text-base-950 transition-all duration-200 hover:bg-acid ${
        visivel ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      WhatsApp
    </a>
  );
}

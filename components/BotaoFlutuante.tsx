"use client";

import { useEffect, useState } from "react";
import { site, whatsappLink } from "@/lib/site";
import IconeWhatsapp from "./IconeWhatsapp";

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
      href={whatsappLink(`Olá! Vim pelo site da ${site.nome} e quero falar sobre um projeto.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      tabIndex={visivel ? 0 : -1}
      className={`fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-verde text-creme shadow-[0_6px_20px_-6px_rgba(28,46,37,.5)] ring-1 ring-creme/25 transition-all duration-200 hover:bg-verde-escuro focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-verde sm:bottom-7 sm:right-7 ${
        visivel ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <IconeWhatsapp className="h-6 w-6" />
    </a>
  );
}

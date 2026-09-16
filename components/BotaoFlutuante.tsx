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
      className={`btn-solid fixed bottom-6 right-6 z-40 !transition-all !duration-200 ${
        visivel ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      WhatsApp
    </a>
  );
}

"use client";

import { useEffect, useState } from "react";
import { site, whatsappLink } from "@/lib/site";
import { IconWhatsApp } from "./Icons";

export default function BotaoFlutuante() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisivel(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={whatsappLink(`Olá, Daniel! Vim pelo site da ${site.nome} e quero falar sobre um projeto.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className={`fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-moss-500 text-ink-950 shadow-[0_10px_40px_-8px_rgba(116,178,71,.8)] transition duration-300 hover:bg-moss-400 ${
        visivel ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <IconWhatsApp className="h-7 w-7" />
    </a>
  );
}

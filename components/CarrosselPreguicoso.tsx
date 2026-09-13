"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

/**
 * O carrossel carrega o Swiper (JS + CSS). Como ele fica no meio da
 * página, não há motivo para baixar isso na abertura: só quando a
 * seção chega perto da tela.
 *
 * O espaço é reservado antes de carregar, senão a página daria um
 * pulo quando o carrossel aparecesse. A conta do placeholder:
 * 340px de slide + 40px das bolinhas + 136px de legenda.
 */
const Carrossel = dynamic(() => import("./CarrosselHabilidades"), { ssr: false });

const ALTURA = 340 + 40 + 136;

export default function CarrosselPreguicoso() {
  const marca = useRef<HTMLDivElement>(null);
  const [perto, setPerto] = useState(false);

  useEffect(() => {
    const el = marca.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setPerto(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setPerto(true);
          obs.disconnect();
        }
      },
      // Começa a baixar uma tela e meia antes de aparecer.
      { rootMargin: "150% 0px" },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={marca}>
      {perto ? <Carrossel /> : <div style={{ height: ALTURA }} aria-hidden="true" />}
    </div>
  );
}

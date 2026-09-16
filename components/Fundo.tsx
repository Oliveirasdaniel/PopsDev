"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

/**
 * Camada de fundo do site.
 *
 * O ClickEffects puxa o GSAP junto (~70 kB). Como ele é enfeite, não
 * entra no carregamento inicial: só é buscado quando o navegador fica
 * ocioso, depois da página já estar utilizável. Quem clicar no primeiro
 * segundo não vê o anel — e isso é melhor que a página inteira demorar.
 */
const ClickEffects = dynamic(() => import("./originkit/ui/clickeffects"), { ssr: false });

export default function Fundo() {
  const [ligar, setLigar] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ocioso =
      (window as any).requestIdleCallback ?? ((fn: () => void) => setTimeout(fn, 1200));
    const id = ocioso(() => setLigar(true));

    return () => (window as any).cancelIdleCallback?.(id);
  }, []);

  if (!ligar) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <ClickEffects
        showLabel={false}
        interactionMode="rings"
        color="#f0b73c"
        strokeWidth={1.5}
        effectSize={160}
        duration={0.6}
      />
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import ClickEffects from "./originkit/ui/clickeffects";

/**
 * Camada de fundo do site. É o único lugar que conhece os efeitos.
 *
 * O Pixel Trail foi removido: ele monta milhares de <div> e um timer por
 * célula, o que travava a página. Sobrou o ClickEffects, que só desenha
 * no momento do clique e não custa nada enquanto está parado.
 */
export default function Fundo() {
  const [animar, setAnimar] = useState(false);

  useEffect(() => {
    // Quem pediu menos movimento no sistema não recebe efeito nenhum.
    setAnimar(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  if (!animar) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <ClickEffects
        showLabel={false}
        interactionMode="rings"
        color="#a3e635"
        strokeWidth={1.5}
        effectSize={160}
        duration={0.6}
      />
    </div>
  );
}

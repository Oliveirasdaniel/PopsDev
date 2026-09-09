"use client";

import { useEffect, useState } from "react";
import ClickEffects from "./originkit/ui/clickeffects";
import TrilhaPixels from "./TrilhaPixels";

/**
 * Camada de fundo do site. É o único lugar que conhece os efeitos —
 * trocar de biblioteca significa mexer só aqui.
 *
 * - TrilhaPixels: rastro do cursor (temporário, até entrar o pixel-trail)
 * - ClickEffects (Originkit): anéis que abrem no ponto do clique
 */
export default function Fundo() {
  const [animar, setAnimar] = useState(false);

  useEffect(() => {
    // Não anima para quem pediu menos movimento no sistema.
    setAnimar(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <TrilhaPixels />
      {animar && (
        <div className="absolute inset-0">
          <ClickEffects
            showLabel={false}
            interactionMode="rings"
            color="#a3e635"
            strokeWidth={1}
            effectSize={150}
            duration={0.55}
          />
        </div>
      )}
    </div>
  );
}

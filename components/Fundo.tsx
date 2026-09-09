"use client";

import { useEffect, useRef, useState } from "react";
import ClickEffects from "./originkit/ui/clickeffects";
import PixelTrail from "./originkit/ui/pixel-trail";

/**
 * Camada de fundo do site. É o único lugar que conhece os efeitos —
 * trocar de biblioteca significa mexer só aqui.
 *
 * - PixelTrail (Originkit): rastro de pixels sob o cursor
 * - ClickEffects (Originkit): anéis que abrem no ponto do clique
 *
 * A camada é `pointer-events-none` para não roubar clique de botão nenhum.
 * Como o PixelTrail escuta pointer no próprio elemento, a ponte abaixo
 * repassa os eventos reais da janela para ele.
 */
export default function Fundo() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [animar, setAnimar] = useState(false);

  useEffect(() => {
    // Quem pediu menos movimento no sistema não recebe efeito nenhum.
    setAnimar(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!animar) return;

    function repassar(e: PointerEvent) {
      // Ignora o que nós mesmos despachamos, senão vira laço infinito.
      if (!e.isTrusted) return;
      const alvo = hostRef.current?.firstElementChild;
      if (!alvo) return;

      alvo.dispatchEvent(
        new PointerEvent(e.type, {
          clientX: e.clientX,
          clientY: e.clientY,
          bubbles: true,
        }),
      );
    }

    window.addEventListener("pointermove", repassar, { passive: true });
    return () => window.removeEventListener("pointermove", repassar);
  }, [animar]);

  if (!animar) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div ref={hostRef} className="absolute inset-0">
        <PixelTrail
          text=""
          background="transparent"
          columns={54}
          pixel={{ color: "#3a3a38", gap: 2, radius: 0 }}
          trail={{ hold: 0.05, fade: 0.6, reach: 1 }}
        />
      </div>

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
    </div>
  );
}

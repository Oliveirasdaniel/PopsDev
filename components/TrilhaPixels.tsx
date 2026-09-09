"use client";

import { useEffect, useRef } from "react";

/**
 * Trilha de pixels que acende sob o cursor e apaga sozinha.
 *
 * TEMPORÁRIO: fica no ar até o componente `pixel-trail` do Originkit ser
 * instalado. Os cliques são tratados pelo clickeffects do Originkit, então
 * este arquivo cuida apenas do rastro do cursor.
 */

const CELULA = 26; // lado do "pixel", em px
const DECAI = 0.94; // quanto cada célula apaga por frame
const RAIO = 2; // alcance do cursor, em células

export default function TrilhaPixels() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let colunas = 0;
    let linhas = 0;
    let grade = new Float32Array(0);
    let raf = 0;

    function dimensionar() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const l = window.innerWidth;
      const a = window.innerHeight;
      canvas!.width = Math.floor(l * dpr);
      canvas!.height = Math.floor(a * dpr);
      canvas!.style.width = `${l}px`;
      canvas!.style.height = `${a}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      colunas = Math.ceil(l / CELULA) + 1;
      linhas = Math.ceil(a / CELULA) + 1;
      grade = new Float32Array(colunas * linhas);
    }

    function acender(x: number, y: number) {
      const cx = Math.floor(x / CELULA);
      const cy = Math.floor(y / CELULA);
      for (let dy = -RAIO; dy <= RAIO; dy++) {
        for (let dx = -RAIO; dx <= RAIO; dx++) {
          const gx = cx + dx;
          const gy = cy + dy;
          if (gx < 0 || gy < 0 || gx >= colunas || gy >= linhas) continue;
          const dist = Math.hypot(dx, dy);
          if (dist > RAIO) continue;
          const valor = 1 - dist / (RAIO + 0.6);
          const i = gy * colunas + gx;
          if (valor > grade[i]) grade[i] = valor;
        }
      }
    }

    function onMove(e: PointerEvent) {
      acender(e.clientX, e.clientY);
      agendar();
    }

    function desenhar() {
      raf = 0;
      ctx!.clearRect(0, 0, window.innerWidth, window.innerHeight);

      let ativo = false;
      for (let gy = 0; gy < linhas; gy++) {
        for (let gx = 0; gx < colunas; gx++) {
          const i = gy * colunas + gx;
          const v = grade[i];
          if (v < 0.02) {
            grade[i] = 0;
            continue;
          }
          ativo = true;
          grade[i] = v * DECAI;
          ctx!.fillStyle = `rgba(236,233,226,${Math.min(v, 1) * 0.07})`;
          ctx!.fillRect(gx * CELULA, gy * CELULA, CELULA - 2, CELULA - 2);
        }
      }

      if (ativo) agendar();
    }

    function agendar() {
      if (!raf) raf = requestAnimationFrame(desenhar);
    }

    dimensionar();
    window.addEventListener("resize", dimensionar);
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      window.removeEventListener("resize", dimensionar);
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="h-full w-full" />;
}

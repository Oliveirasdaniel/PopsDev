"use client";

import { useEffect, useRef } from "react";

/**
 * Fundo reativo: trilha de pixels sob o cursor + onda ao clicar.
 * Tudo em um único canvas, sem dependência externa.
 *
 * Para trocar pelos componentes do Originkit (pixel-trail / clickeffects),
 * basta substituir o conteúdo deste arquivo — ele é montado uma única vez
 * em app/layout.tsx e nada mais depende da implementação.
 */

const CELULA = 26; // lado do "pixel" da trilha, em px
const DECAI = 0.94; // quanto cada célula apaga por frame
const RAIO_CURSOR = 2; // em células
const ONDA_VEL = 9; // px por frame
const ONDA_MAX = 460; // raio final da onda do clique

type Onda = { x: number; y: number; r: number };

export default function FundoReativo() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const semAnimacao = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (semAnimacao) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let colunas = 0;
    let linhas = 0;
    let grade = new Float32Array(0);
    let ondas: Onda[] = [];
    let raf = 0;
    let dpr = 1;

    function dimensionar() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
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

    function acender(x: number, y: number, forca: number) {
      const cx = Math.floor(x / CELULA);
      const cy = Math.floor(y / CELULA);
      for (let dy = -RAIO_CURSOR; dy <= RAIO_CURSOR; dy++) {
        for (let dx = -RAIO_CURSOR; dx <= RAIO_CURSOR; dx++) {
          const gx = cx + dx;
          const gy = cy + dy;
          if (gx < 0 || gy < 0 || gx >= colunas || gy >= linhas) continue;
          const dist = Math.hypot(dx, dy);
          if (dist > RAIO_CURSOR) continue;
          const valor = (1 - dist / (RAIO_CURSOR + 0.6)) * forca;
          const i = gy * colunas + gx;
          if (valor > grade[i]) grade[i] = valor;
        }
      }
    }

    function onMove(e: PointerEvent) {
      acender(e.clientX, e.clientY, 1);
      agendar();
    }

    function onDown(e: PointerEvent) {
      ondas.push({ x: e.clientX, y: e.clientY, r: 0 });
      acender(e.clientX, e.clientY, 1.6);
      agendar();
    }

    function desenhar() {
      raf = 0;
      const l = window.innerWidth;
      const a = window.innerHeight;
      ctx!.clearRect(0, 0, l, a);

      let ativo = false;

      // Trilha de pixels
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
          const alpha = Math.min(v, 1) * 0.07;
          ctx!.fillStyle = `rgba(236,233,226,${alpha})`;
          ctx!.fillRect(gx * CELULA, gy * CELULA, CELULA - 2, CELULA - 2);
        }
      }

      // Ondas do clique
      ondas = ondas.filter((o) => o.r < ONDA_MAX);
      for (const o of ondas) {
        ativo = true;
        o.r += ONDA_VEL;
        const restante = 1 - o.r / ONDA_MAX;
        ctx!.beginPath();
        ctx!.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(163,230,53,${restante * 0.28})`;
        ctx!.lineWidth = 1;
        ctx!.stroke();

        // acende a grade na borda da onda
        const passos = Math.max(12, Math.floor(o.r / 12));
        for (let p = 0; p < passos; p++) {
          const ang = (p / passos) * Math.PI * 2;
          acender(o.x + Math.cos(ang) * o.r, o.y + Math.sin(ang) * o.r, restante * 0.7);
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
    window.addEventListener("pointerdown", onDown, { passive: true });

    return () => {
      window.removeEventListener("resize", dimensionar);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}

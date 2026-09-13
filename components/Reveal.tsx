"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article";
};

/**
 * Revela o conteúdo com um fade-up ao entrar na tela.
 *
 * UM observador para a página inteira, compartilhado. A versão anterior
 * criava um IntersectionObserver por elemento — são dezenas na home, e
 * cada um custa memória e trabalho a cada rolagem.
 */

type Alvo = { elemento: Element; revelar: () => void };

let observador: IntersectionObserver | null = null;
const inscritos = new Map<Element, () => void>();

function observar(alvo: Alvo) {
  if (typeof IntersectionObserver === "undefined") {
    alvo.revelar();
    return () => {};
  }

  if (!observador) {
    observador = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (!e.isIntersecting) continue;
          inscritos.get(e.target)?.();
          inscritos.delete(e.target);
          observador!.unobserve(e.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
  }

  inscritos.set(alvo.elemento, alvo.revelar);
  observador.observe(alvo.elemento);

  return () => {
    inscritos.delete(alvo.elemento);
    observador?.unobserve(alvo.elemento);
  };
}

export default function Reveal({ children, className = "", delay = 0, as = "div" }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return observar({ elemento: el, revelar: () => setVisivel(true) });
  }, []);

  const Tag = as as any;

  return (
    <Tag
      ref={ref}
      style={visivel ? { animationDelay: `${delay}ms` } : undefined}
      className={`${visivel ? "animate-rise" : "opacity-0"} ${className}`}
    >
      {children}
    </Tag>
  );
}

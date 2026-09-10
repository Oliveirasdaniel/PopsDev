"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const STAGGER = 0.03;

/**
 * Letras que rolam para cima ao passar o mouse, com a de baixo entrando no lugar.
 * Usar em POUCAS palavras — a graça é o contraste com o texto parado ao redor.
 *
 * Baseado no TextRoll do Skiper UI (@gurvinder-singh02).
 */
export default function TextRoll({
  children,
  className,
  center = false,
}: {
  children: string;
  className?: string;
  center?: boolean;
}) {
  const atraso = (i: number) =>
    center ? STAGGER * Math.abs(i - (children.length - 1) / 2) : STAGGER * i;

  const letras = children.split("");

  return (
    <motion.span
      initial="parado"
      whileHover="rolando"
      className={cn("relative inline-block overflow-hidden align-bottom", className)}
      style={{ lineHeight: 0.85 }}
    >
      <span aria-hidden="true">
        {letras.map((l, i) => (
          <motion.span
            key={i}
            variants={{ parado: { y: 0 }, rolando: { y: "-100%" } }}
            transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.5, delay: atraso(i) }}
            className="inline-block"
          >
            {l === " " ? " " : l}
          </motion.span>
        ))}
      </span>

      <span className="absolute inset-0" aria-hidden="true">
        {letras.map((l, i) => (
          <motion.span
            key={i}
            variants={{ parado: { y: "100%" }, rolando: { y: 0 } }}
            transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.5, delay: atraso(i) }}
            className="inline-block"
          >
            {l === " " ? " " : l}
          </motion.span>
        ))}
      </span>

      {/* Só esta cópia é lida por leitor de tela e copiada no Ctrl+C. */}
      <span className="sr-only">{children}</span>
    </motion.span>
  );
}

import { cn } from "@/lib/utils";

const PASSO = 30; // ms de atraso entre uma letra e a seguinte

/**
 * Letras que rolam para cima ao passar o mouse.
 *
 * Feito em CSS puro. A versão anterior usava Framer Motion só para
 * isto — uma biblioteca de ~50 kB para animar duas cópias de uma
 * palavra. Transição com atraso escalonado faz o mesmo, sem
 * JavaScript nenhum rodando no hover.
 *
 * Efeito original: TextRoll do Skiper UI (@gurvinder-singh02).
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
  const letras = children.split("");
  const atraso = (i: number) =>
    center ? PASSO * Math.abs(i - (letras.length - 1) / 2) : PASSO * i;

  return (
    <span
      className={cn("group relative inline-block overflow-hidden align-bottom", className)}
      style={{ lineHeight: 0.85 }}
    >
      <span aria-hidden="true">
        {letras.map((l, i) => (
          <span
            key={i}
            className="inline-block transition-transform duration-[520ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-full"
            style={{ transitionDelay: `${atraso(i)}ms` }}
          >
            {l === " " ? " " : l}
          </span>
        ))}
      </span>

      <span className="absolute inset-0" aria-hidden="true">
        {letras.map((l, i) => (
          <span
            key={i}
            className="inline-block translate-y-full transition-transform duration-[520ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0"
            style={{ transitionDelay: `${atraso(i)}ms` }}
          >
            {l === " " ? " " : l}
          </span>
        ))}
      </span>

      {/* Só esta cópia é lida por leitor de tela e copiada no Ctrl+C. */}
      <span className="sr-only">{children}</span>
    </span>
  );
}

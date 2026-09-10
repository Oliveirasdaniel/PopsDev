"use client";

import Image from "next/image";
import { useState } from "react";

type Props = { src: string; alt: string; nome: string };

/**
 * Print do projeto. Passa pelo otimizador do Next (converte para WebP e
 * serve o tamanho certo para cada tela) — os PNGs originais somam megabytes.
 * Se o arquivo não existir, mostra um placeholder discreto.
 */
export default function Screenshot({ src, alt, nome }: Props) {
  const [falhou, setFalhou] = useState(false);

  if (falhou) {
    return (
      <div className="grid h-full w-full place-items-center bg-base-900">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">{nome}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, 60vw"
      onError={() => setFalhou(true)}
      className="object-cover object-top"
    />
  );
}

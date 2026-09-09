"use client";

import { useState } from "react";

type Props = { src: string; alt: string; nome: string };

/** Mostra o print do projeto; se o arquivo ainda não existir, exibe um placeholder discreto. */
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
    <img
      src={src}
      alt={alt}
      onError={() => setFalhou(true)}
      loading="lazy"
      width={1200}
      height={900}
      className="h-full w-full object-cover object-top grayscale transition duration-500 group-hover:grayscale-0"
    />
  );
}

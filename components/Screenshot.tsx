"use client";

import { useState } from "react";

type Props = { src: string; alt: string; nome: string };

/** Mostra o print do projeto; se o arquivo ainda não existir, exibe um placeholder elegante. */
export default function Screenshot({ src, alt, nome }: Props) {
  const [falhou, setFalhou] = useState(false);

  if (falhou) {
    return (
      <div className="grid h-full w-full place-items-center bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950">
        <div className="px-6 text-center">
          <span className="text-2xl font-semibold tracking-tight text-sand/80">{nome}</span>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-sand/30">Adicione o print em public/portfolio</p>
        </div>
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
      height={800}
      className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
    />
  );
}

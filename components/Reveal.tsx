"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article";
};

/** Revela o conteúdo com um fade-up quando ele entra na viewport. */
export default function Reveal({ children, className = "", delay = 0, as = "div" }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisivel(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisivel(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const Tag = as as any;

  return (
    <Tag
      ref={ref}
      style={visivel ? { animationDelay: `${delay}ms` } : undefined}
      className={`${visivel ? "animate-fade-up" : "opacity-0"} ${className}`}
    >
      {children}
    </Tag>
  );
}

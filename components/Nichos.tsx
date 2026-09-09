import { nichos } from "@/lib/site";

export default function Nichos() {
  const lista = [...nichos, ...nichos];

  return (
    <section className="border-y border-white/10 bg-ink-900/40 py-8" aria-label="Segmentos atendidos">
      <div className="mask-fade-x overflow-hidden">
        <ul className="flex w-max animate-marquee items-center gap-3 pr-3">
          {lista.map((n, i) => (
            <li
              key={`${n}-${i}`}
              className="whitespace-nowrap rounded-full border border-white/10 px-5 py-2 text-sm text-sand/60"
              aria-hidden={i >= nichos.length}
            >
              {n}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

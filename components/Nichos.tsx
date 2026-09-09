import { nichos } from "@/lib/site";

export default function Nichos() {
  const lista = [...nichos, ...nichos];

  return (
    <section className="mt-28 border-y border-line py-4 sm:mt-36" aria-label="Segmentos atendidos">
      <div className="mask-fade-x overflow-hidden">
        <ul className="flex w-max animate-marquee items-center">
          {lista.map((n, i) => (
            <li
              key={`${n}-${i}`}
              className="whitespace-nowrap px-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted"
              aria-hidden={i >= nichos.length}
            >
              {n}
              <span className="ml-6 text-bone/15">/</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

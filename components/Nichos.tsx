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
              className="flex items-center whitespace-nowrap px-6 font-pixel text-[20px] uppercase leading-none tracking-[0.06em] text-muted"
              aria-hidden={i >= nichos.length}
            >
              {n}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo/marca.svg" alt="" width={19} height={19} className="ml-6 inline-block [image-rendering:pixelated]" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import { nichos } from "@/lib/site";

/**
 * Faixa de tinta que corre no topo da página, colada na borda. É o único
 * movimento contínuo do site — o resto fica parado, como papel.
 */
export default function Nichos() {
  const lista = [...nichos, ...nichos];

  return (
    <section className="overflow-hidden bg-tinta py-2.5 text-papel" aria-label="Segmentos atendidos">
      <ul className="flex w-max animate-marquee items-center">
        {lista.map((n, i) => (
          <li
            key={`${n}-${i}`}
            className="flex items-center whitespace-nowrap pl-5 font-pixel text-[20px] uppercase leading-none tracking-[0.06em]"
            aria-hidden={i >= nichos.length}
          >
            {n}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo/marca.svg" alt="" width={19} height={19} className="ml-5 inline-block [image-rendering:pixelated]" />
          </li>
        ))}
      </ul>
    </section>
  );
}

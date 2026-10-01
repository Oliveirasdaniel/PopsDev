import { servicos } from "@/lib/site";

type Icone = (typeof servicos)[number]["icone"];

/**
 * Cada frente é um cartão recortado, com cor e tamanho próprios. Em tela
 * larga as linhas se desencontram (2+1, 1+2), e o delivery vem primeiro e
 * maior: é o sistema próprio da Popsdev.
 */
const ordem: Icone[] = ["cart", "page", "calendar", "tools"];

const estilo: Record<Icone, { cartao: string; lista: string }> = {
  cart: { cartao: "bg-acento lg:col-span-2", lista: "sm:grid-cols-2" },
  page: { cartao: "bg-papel", lista: "" },
  calendar: { cartao: "bg-faixa-andesito", lista: "" },
  tools: { cartao: "bg-acento-claro lg:col-span-2", lista: "sm:grid-cols-2" },
};

export default function Servicos() {
  const lista = ordem.map((icone) => servicos.find((s) => s.icone === icone)!);

  return (
    <section id="servicos" className="faixa bg-papel">
      <div className="wrap">
        {/* O adesivo é colado na ponta do título, por cima das letras. */}
        <div className="relative w-fit">
          <h2 className="display-secao">
            Quatro
            <br />
            frentes
          </h2>
          <span
            className="adesivo mt-4 bg-acento-claro text-[15px] font-extrabold sm:absolute sm:-right-8 sm:top-[-0.75rem] sm:mt-0"
            style={{ "--giro": "8deg" } as React.CSSProperties}
          >
            sem template
          </span>
        </div>
        <p className="tagline">Todas partindo do que trava a venda hoje.</p>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {lista.map((s) => (
            <article
              key={s.titulo}
              className={`relative rounded-[32px] border-2 border-tinta p-7 sm:p-9 ${estilo[s.icone].cartao}`}
            >
              {s.icone === "cart" && (
                <span
                  className="adesivo absolute -top-4 right-5 bg-tinta text-[13px] font-bold text-acento-claro sm:right-8"
                  style={{ "--giro": "3deg" } as React.CSSProperties}
                >
                  sistema próprio
                </span>
              )}

              <h3 className="max-w-[18ch] text-[1.65rem] font-extrabold leading-[1.05] tracking-[-0.02em] sm:text-[2.1rem]">
                {s.titulo}
              </h3>
              <p className="lead mt-3 max-w-[46ch] !text-tinta/80">{s.resumo}</p>

              <ul className={`mt-7 grid gap-x-8 gap-y-2.5 ${estilo[s.icone].lista}`}>
                {s.itens.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] font-medium leading-snug">
                    {/* Marcador quadrado: um pixel da logo, ampliado. */}
                    <span className="mt-[0.4em] h-2 w-2 shrink-0 bg-tinta" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

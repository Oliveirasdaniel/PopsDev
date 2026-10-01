import { faq, site, whatsappLink } from "@/lib/site";

export default function Faq() {
  return (
    <section id="faq" className="faixa bg-faixa-andesito">
      <div className="wrap">
        <h2 className="display-secao">Dúvidas</h2>

        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="tagline !mt-0">Antes de você perguntar.</p>
            <p className="lead mt-4 max-w-[36ch]">Ficou algo de fora? Me chama no WhatsApp — quem responde sou eu.</p>
            <a
              href={whatsappLink(`Olá, Daniel! Vim pelo site da ${site.nome} e tenho uma dúvida.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-line mt-7"
            >
              Perguntar no WhatsApp
            </a>
          </div>

          <div className="space-y-2.5">
            {faq.map((f) => (
              <details key={f.p} className="group rounded-[24px] border-2 border-tinta bg-papel">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-5 py-4 text-[16px] font-bold leading-snug sm:px-6 [&::-webkit-details-marker]:hidden">
                  {f.p}
                  {/* O "+" redondo do estilo; aberto, ele gira e vira "×". */}
                  <span
                    className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-tinta bg-papel transition-[transform,background-color] duration-200 group-open:rotate-45 group-open:bg-acento group-hover:bg-faixa-latao group-open:group-hover:bg-acento"
                    aria-hidden="true"
                  >
                    <span className="absolute h-0.5 w-3.5 rounded-full bg-tinta" />
                    <span className="absolute h-3.5 w-0.5 rounded-full bg-tinta" />
                  </span>
                </summary>
                <p className="lead max-w-2xl px-5 pb-6 !text-[15px] sm:px-6">{f.r}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

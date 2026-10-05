import { faq, site, whatsappLink } from "@/lib/site";

export default function Faq() {
  return (
    <section id="faq" className="secao bg-pedra">
      <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-20">
        <div>
          <h2 className="titulo-2">Dúvidas</h2>
          <p className="lead mt-6 max-w-[34ch] text-andesito-escuro">
            Ficou algo de fora? Chame no WhatsApp — quem responde é quem desenvolve o seu projeto.
          </p>
          <a
            href={whatsappLink(`Olá! Vim pelo site da ${site.nome} e tenho uma dúvida.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-contorno mt-8"
          >
            Perguntar no WhatsApp
          </a>
        </div>

        <div className="border-b border-tinta/15">
          {faq.map((f) => (
            <details key={f.p} className="group border-t border-tinta/15">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-8 py-6 text-[17px] font-semibold leading-snug focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tinta [&::-webkit-details-marker]:hidden">
                {f.p}
                {/* "+" em fio; aberto, gira e vira "×". */}
                <span
                  className="relative grid h-5 w-5 shrink-0 place-items-center text-latao-texto transition-transform duration-200 group-open:rotate-45"
                  aria-hidden="true"
                >
                  <span className="absolute h-[1.5px] w-full bg-current" />
                  <span className="absolute h-full w-[1.5px] bg-current" />
                </span>
              </summary>
              <p className="max-w-[64ch] pb-7 pr-12 text-[16px] leading-relaxed text-andesito-escuro">{f.r}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

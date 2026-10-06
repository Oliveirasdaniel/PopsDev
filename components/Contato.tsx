import { site, whatsappLink } from "@/lib/site";
import IconeWhatsapp from "./IconeWhatsapp";

/**
 * Fecho da página: uma ação só, o WhatsApp. Faixa no verde do meio,
 * logo acima do rodapé no verde escuro.
 */
export default function Contato() {
  return (
    <section id="contato" className="bg-verde text-creme">
      <div className="wrap py-24 sm:py-32">
        <h2 className="titulo-secao max-w-[15ch]">Vamos conversar sobre o seu projeto?</h2>
        <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <p className="lead max-w-[46ch] text-creme/75">
            Conte o que você precisa pelo WhatsApp. Quem responde é quem desenvolve o seu projeto, em até 2h
            úteis.
          </p>

          <div className="flex flex-col items-start gap-4">
            <a
              href={whatsappLink(`Olá! Vim pelo site da ${site.nome} e quero um orçamento para o meu negócio.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-creme"
            >
              <IconeWhatsapp />
              Chamar no WhatsApp
            </a>
            <p className="text-[15px] text-creme/65">
              Prefere e-mail?{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-creme/90 underline decoration-creme/40 decoration-[1.5px] underline-offset-[5px] hover:decoration-creme"
              >
                {site.email}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

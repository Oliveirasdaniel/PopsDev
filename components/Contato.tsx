import { site, whatsappLink } from "@/lib/site";
import IconeWhatsapp from "./IconeWhatsapp";

/**
 * Fecho da página: uma ação só, o WhatsApp. Fica na mesma faixa de tinta
 * do rodapé, logo acima dele.
 */
export default function Contato() {
  return (
    <section id="contato" className="bg-tinta text-papel">
      <div className="wrap cabecalho py-24 sm:py-32">
        <div>
          <h2 className="titulo-2 max-w-[16ch]">Vamos conversar sobre o seu projeto?</h2>
          <p className="lead mt-6 max-w-[48ch] text-papel/65">
            Conte o que você precisa pelo WhatsApp. Quem responde é quem desenvolve o seu projeto, em até 2h
            úteis.
          </p>
        </div>

        <div className="flex flex-col items-start gap-4">
          <a
            href={whatsappLink(`Olá! Vim pelo site da ${site.nome} e quero um orçamento para o meu negócio.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-latao !h-14 !px-8 !text-[16px]"
          >
            <IconeWhatsapp />
            Chamar no WhatsApp
          </a>
          <p className="text-[15px] text-papel/60">
            Prefere e-mail?{" "}
            <a href={`mailto:${site.email}`} className="link font-normal text-papel/85">
              {site.email}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

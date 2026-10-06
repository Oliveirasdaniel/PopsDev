import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import IconeWhatsapp from "@/components/IconeWhatsapp";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sobre",
  description: `Quem é ${site.autor}, o fundador da ${site.nome}.`,
};

const percurso = [
  {
    titulo: "Por que negócios locais",
    texto:
      "Restaurante, barbearia e salão vivem do mesmo aperto: cliente chega pelo Instagram, some no meio das mensagens e o horário fica vago. É um problema de ferramenta, não de esforço — e ferramenta é o que a Popsdev sabe fazer.",
  },
  {
    titulo: "Como trabalhamos",
    texto:
      "Escopo por escrito antes de começar, prévia para você acompanhar durante e suporte por perto depois que o site sobe. Sem contrato longo e sem cobrança que aparece no meio do caminho.",
  },
  {
    titulo: "O que não fazemos",
    texto:
      "Não entregamos template com o nome trocado, não prometemos primeiro lugar no Google e não sumimos depois da entrega. Se o seu caso não for para nós, você fica sabendo na primeira conversa.",
  },
];

export default function Sobre() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-tinta text-papel">
          <div className="wrap grid items-end gap-14 pb-20 pt-16 sm:pt-24 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-20 lg:pb-28">
            <div>
              <h1 className="titulo-1 max-w-[14ch]">Quem está por trás da {site.nome}</h1>
              <p className="lead mt-8 max-w-[56ch] text-papel/70">
                Sou {site.autor}, desenvolvedor e fundador da {site.nome}. Comecei atendendo negócios do meu
                círculo, vi o mesmo problema se repetir em cada um deles e resolvi construir do jeito certo, em
                vez de empurrar template pronto. Hoje a {site.nome} faz sites e sistemas para quem vive de
                agendamento e de entrega.
              </p>
            </div>

            <figure className="max-w-[18rem] lg:max-w-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/daniel.jpeg"
                alt={`${site.autor}, fundador da ${site.nome}`}
                width={720}
                height={900}
                className="w-full rounded-xl border border-papel/10"
              />
              <figcaption className="mt-4 text-[14px] text-papel/60">
                <span className="font-semibold text-papel">{site.autor}</span>
                <br />
                {site.cargo}
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="secao bg-pedra">
          <div className="wrap">
            <div className="grid gap-12 lg:grid-cols-3 lg:gap-10">
              {percurso.map((p) => (
                <article key={p.titulo} className="border-t border-latao-escuro pt-7">
                  <h2 className="titulo-3">{p.titulo}</h2>
                  <p className="mt-4 text-[16px] leading-relaxed text-andesito-escuro">{p.texto}</p>
                </article>
              ))}
            </div>

            <div className="mt-16 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappLink(`Olá! Vim pela página Sobre do site da ${site.nome}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-latao"
              >
                <IconeWhatsapp />
                Chamar no WhatsApp
              </a>
              <a href="/#projetos" className="btn-contorno">
                Ver projetos
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

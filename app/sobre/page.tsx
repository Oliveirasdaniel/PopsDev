import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sobre",
  description: `Quem é ${site.autor}, o desenvolvedor por trás da ${site.nome}.`,
};

/** Cada bloco é um cartão recortado, com a cor de uma faixa do site. */
const percurso = [
  {
    titulo: "Por que negócios locais",
    texto:
      "Restaurante, barbearia e salão vivem do mesmo aperto: cliente chega pelo Instagram, some no meio das mensagens e o horário fica vago. É um problema de ferramenta, não de esforço — e ferramenta é o que eu sei fazer.",
    cor: "bg-papel",
  },
  {
    titulo: "Como eu trabalho",
    texto:
      "Escopo por escrito antes de começar, prévia para você acompanhar durante, e eu por perto depois que o site sobe. Sem contrato longo e sem cobrança que aparece no meio do caminho.",
    cor: "bg-faixa-andesito",
  },
  {
    titulo: "O que eu não faço",
    texto:
      "Não entrego template com o nome trocado, não prometo primeiro lugar no Google e não sumo depois da entrega. Se o seu caso não for para mim, eu digo na primeira conversa.",
    cor: "bg-acento-claro",
  },
];

export default function Sobre() {
  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden bg-faixa-latao pb-20 pt-[4.75rem] sm:pb-28">
          <div className="wrap pt-14 sm:pt-20">
            <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
              <div>
                <h1 className="display text-[clamp(3.4rem,11vw,10rem)]">
                  Prazer,
                  <br />
                  {site.autor.split(" ")[0]}.
                </h1>
                <p className="mt-8 max-w-xl text-[1.25rem] font-medium leading-relaxed sm:text-[1.4rem]">
                  Sou desenvolvedor e faço sites e ferramentas para quem vive de agendamento e de entrega.
                  Comecei atendendo negócios do meu círculo, vi o mesmo problema se repetir em cada um deles e
                  resolvi construir do jeito certo, em vez de empurrar template pronto.
                </p>
              </div>

              {/* A foto como adesivo: recortada, colada torta. */}
              <figure className="max-w-[17rem] lg:max-w-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/daniel.jpeg"
                  alt={`${site.autor}, desenvolvedor por trás da ${site.nome}`}
                  width={720}
                  height={900}
                  className="w-full rotate-[3deg] rounded-[32px] border-2 border-tinta bg-papel"
                />
                <figcaption className="adesivo relative -mt-6 ml-6 bg-papel text-[13px] font-bold leading-snug" style={{ "--giro": "-3deg" } as React.CSSProperties}>
                  {site.autor} — {site.cargo}
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="faixa bg-papel">
          <div className="wrap">
            <div className="grid gap-4 lg:grid-cols-3">
              {percurso.map((p) => (
                <article key={p.titulo} className={`rounded-[32px] border-2 border-tinta p-7 sm:p-9 ${p.cor}`}>
                  <h2 className="text-[1.5rem] font-extrabold leading-tight tracking-[-0.02em]">{p.titulo}</h2>
                  <p className="lead mt-3 !text-tinta/80">{p.texto}</p>
                </article>
              ))}
            </div>

            <div className="mt-12 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappLink(`Olá, Daniel! Vim pela página Sobre do site da ${site.nome}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-solid"
              >
                Falar comigo
              </a>
              <a href="/#projetos" className="btn-line">
                Ver os projetos
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

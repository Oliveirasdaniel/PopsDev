import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Reveal from "@/components/Reveal";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sobre",
  description: `Quem é ${site.autor}, o desenvolvedor por trás da ${site.nome}.`,
};

const percurso = [
  {
    titulo: "Por que negócios locais",
    texto:
      "Restaurante, barbearia e salão vivem do mesmo aperto: cliente chega pelo Instagram, some no meio das mensagens e o horário fica vago. É um problema de ferramenta, não de esforço — e ferramenta é o que eu sei fazer.",
  },
  {
    titulo: "Como eu trabalho",
    texto:
      "Escopo por escrito antes de começar, prévia para você acompanhar durante, e eu por perto depois que o site sobe. Sem contrato longo e sem cobrança que aparece no meio do caminho.",
  },
  {
    titulo: "O que eu não faço",
    texto:
      "Não entrego template com o nome trocado, não prometo primeiro lugar no Google e não sumo depois da entrega. Se o seu caso não for para mim, eu digo na primeira conversa.",
  },
];

export default function Sobre() {
  return (
    <>
      <Header />
      <main className="pt-32 sm:pt-40">
        <div className="wrap">
          <Reveal className="rule">
            <span className="num">·</span>
            <span className="label-mono">Sobre</span>
          </Reveal>

          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-20">
            <div>
              <Reveal>
                <h1 className="display text-[2.5rem] leading-[1] sm:text-[3.5rem]">
                  Prazer, {site.autor.split(" ")[0]}.
                </h1>
              </Reveal>

              <Reveal delay={80}>
                <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
                  Sou desenvolvedor e faço sites e ferramentas para quem vive de agendamento e de entrega. Comecei
                  atendendo negócios do meu círculo, vi o mesmo problema se repetir em cada um deles e resolvi
                  construir do jeito certo, em vez de empurrar template pronto.
                </p>
              </Reveal>

              <div className="mt-14 border-t border-line">
                {percurso.map((p, i) => (
                  <Reveal key={p.titulo} delay={i * 70} className="border-b border-line py-7">
                    <h2 className="text-lg font-medium tracking-tight">{p.titulo}</h2>
                    <p className="lead mt-2.5 max-w-xl text-sm">{p.texto}</p>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={160}>
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
              </Reveal>
            </div>

            <Reveal delay={120}>
              <figure className="max-w-[16rem] lg:max-w-none">
                <img
                  src="/daniel.jpeg"
                  alt={`${site.autor}, desenvolvedor por trás da ${site.nome}`}
                  width={720}
                  height={900}
                  className="w-full"
                />
                <figcaption className="mt-3 border-t border-line pt-3 font-pixel text-[20px] uppercase leading-[1.1] tracking-[0.06em] text-muted">
                  {site.autor} — {site.cargo}
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

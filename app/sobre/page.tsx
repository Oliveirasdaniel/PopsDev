import type { Metadata } from "next";
import Image from "next/image";
import BotaoFlutuante from "@/components/BotaoFlutuante";
import Contato from "@/components/Contato";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { site } from "@/lib/site";
import daniel from "@/public/daniel.jpeg";

export const metadata: Metadata = {
  title: "Sobre",
  description: `Quem faz a ${site.nome}: ${site.autor}, desenvolvedor e fundador, e o jeito de trabalhar com negócios locais.`,
};

const percurso = [
  {
    titulo: "Por que negócios locais",
    texto:
      "Restaurante, barbearia e salão vivem do mesmo aperto: o cliente chega pelo Instagram, some no meio das mensagens e o horário fica vago. É um problema de ferramenta, não de esforço — e ferramenta é o que a Popsdev sabe fazer.",
  },
  {
    titulo: "Como trabalhamos",
    texto:
      "Escopo por escrito antes de começar, prévia para você acompanhar durante e suporte por perto depois que o site sobe. Sem contrato longo e sem cobrança que aparece no meio do caminho.",
  },
];

// Cada frase é verdade em outra parte do site: código próprio, delivery
// sem comissão, assinatura mensal sem multa, suporte depois da entrega.
const naoFazemos = [
  "Não entregamos template com o nome trocado.",
  "Não cobramos comissão por pedido.",
  "Não prendemos você em contrato longo.",
  "Não prometemos primeiro lugar no Google.",
  "Não sumimos depois da entrega.",
];

export default function Sobre() {
  return (
    <>
      <Header claro />
      <main>
        {/* O fundo da foto é o próprio creme do site (#f2e9d8, medido): o
            retrato fica em pé direto na página, sem moldura, com a base
            colada na emenda com a faixa verde de baixo. Por isso a imagem
            vai sem recompressão — convertida, a cor do fundo poderia mudar
            um tom e o retângulo apareceria. */}
        <section className="overflow-hidden bg-creme text-verde-escuro">
          <div className="wrap grid gap-12 pt-28 sm:pt-32 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
            <div className="lg:self-center lg:pb-16">
              <h1 className="titulo-pagina max-w-[10ch]">Quem faz a {site.nome}</h1>
              <p className="mt-8 max-w-[34ch] text-[1.2rem] leading-[1.5] text-verde-escuro/85 sm:text-[1.45rem]">
                É o {site.autor}, desenvolvedor e fundador. Ele começou atendendo negócios do próprio círculo, viu o
                mesmo problema se repetir em cada um e resolveu construir do jeito certo, em vez de empurrar template
                pronto. Hoje a {site.nome} faz sites e sistemas para quem vive de agenda e de pedido.
              </p>
            </div>

            <div className="mx-auto w-full max-w-[21rem] self-end sm:max-w-[25rem] lg:mr-0 lg:max-w-[29rem]">
              <Image
                src={daniel}
                alt={`${site.autor}, fundador da ${site.nome}, sorrindo de braços cruzados`}
                priority
                unoptimized
                className="block h-auto w-full"
              />
            </div>
          </div>
        </section>

        <section className="secao bg-verde-claro text-verde-escuro">
          <div className="wrap">
            <div className="border-b border-verde-escuro/15">
              {percurso.map((p) => (
                <article
                  key={p.titulo}
                  className="grid gap-4 border-t border-verde-escuro/15 py-10 sm:py-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16"
                >
                  <h2 className="titulo-item">{p.titulo}</h2>
                  <p className="lead max-w-[56ch] text-verde-escuro/80">{p.texto}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="secao bg-creme text-verde-escuro">
          <div className="wrap">
            <div className="cabecalho">
              <h2 className="titulo-secao max-w-[11ch]">O que não fazemos</h2>
              <p className="lead text-verde-escuro/75">
                Se o seu caso não for para nós, você fica sabendo na primeira conversa.
              </p>
            </div>

            <ul className="mt-14 border-b border-verde-escuro/15">
              {naoFazemos.map((frase) => (
                <li
                  key={frase}
                  className="border-t border-verde-escuro/15 py-6 font-display text-[clamp(1.5rem,3.2vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.025em] sm:py-7"
                >
                  {frase}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Contato />
      </main>
      <Footer />
      <BotaoFlutuante />
    </>
  );
}

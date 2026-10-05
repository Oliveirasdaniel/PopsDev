import { stats } from "@/lib/site";
import { DesenhoEngrenagem } from "./Engrenagem";

export default function Hero() {
  return (
    <section id="topo" className="overflow-hidden bg-tinta text-papel">
      <div className="wrap grid items-center gap-14 pb-20 pt-16 sm:pt-24 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-10 lg:pb-28">
        <div>
          <h1 className="titulo-1 max-w-[15ch]">Sites e sistemas que trabalham pelo seu negócio.</h1>
          <p className="lead mt-7 max-w-[52ch] text-papel/70">
            A Popsdev desenvolve landing pages, agendamento online, delivery próprio e ferramentas sob medida
            para quem vive de agenda e de pedido. Código próprio, sem template e sem comissão por venda.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href="#contato" className="btn-latao">
              Pedir orçamento
            </a>
            <a href="#projetos" className="btn-vazado">
              Ver projetos
            </a>
          </div>
        </div>

        <DesenhoEngrenagem className="mx-auto w-full max-w-[22rem] sm:max-w-[28rem] lg:mr-0 lg:max-w-[32rem]" />
      </div>

      <div className="border-t border-papel/10">
        <dl className="wrap grid divide-y divide-papel/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.map((s) => (
            // O número vem antes na tela, mas o leitor de tela ouve o
            // rótulo primeiro: a ordem do HTML é a do dl.
            <div key={s.label} className="flex flex-col py-7 sm:px-8 sm:py-9 sm:first:pl-0 sm:last:pr-0">
              <dt className="order-2 mt-1 text-[15px] font-semibold">{s.label}</dt>
              <dd className="titulo order-1 text-[2rem] text-latao">{s.valor}</dd>
              <dd className="order-3 mt-0.5 text-[14px] text-papel/55">{s.detalhe}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

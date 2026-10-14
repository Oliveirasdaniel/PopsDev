import { depoimentos } from "@/lib/site";

function dominio(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

/** Clientes atendidos, com o link do site no ar como prova. */
export default function Depoimentos() {
  if (depoimentos.length === 0) return null;

  return (
    <section id="depoimentos" className="secao">
      <div className="wrap">
        <div className="cabecalho">
          <h2 className="titulo-secao">Depoimentos</h2>
          <p className="lead text-verde-escuro/75">Quem já tem site feito pela PopsDev.</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16">
          {depoimentos.map((d) => (
            <figure key={d.cliente} className="rounded-xl border border-verde-escuro/15 bg-creme-escuro/40 p-7">
              {d.texto && (
                <blockquote className="text-[17px] leading-relaxed text-verde-escuro/90">“{d.texto}”</blockquote>
              )}
              <figcaption className={d.texto ? "mt-6" : ""}>
                <p className="font-semibold text-verde-escuro">{d.cliente}</p>
                <p className="text-[14px] text-verde-escuro/70">{d.local}</p>
                <a href={d.url} target="_blank" rel="noopener noreferrer" className="link-verde mt-4 inline-block text-[15px]">
                  {dominio(d.url)}
                </a>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

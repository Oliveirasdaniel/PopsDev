import { projetos } from "@/lib/site";
import Screenshot from "./Screenshot";

/** O endereço que aparece na barra da moldura, sem protocolo nem barra final. */
function dominio(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

/**
 * Um projeto por vez, imagem de um lado e texto do outro, trocando de
 * lado a cada um. Dá espaço para contar o que foi feito em vez de só
 * mostrar o print.
 */
export default function Portfolio() {
  return (
    <section id="projetos" className="secao bg-verde-claro">
      <div className="wrap">
        <div className="cabecalho">
          <h2 className="titulo-secao">Projetos</h2>
          <p className="lead text-verde-escuro/75">
            Sites construídos do zero, cada um no jeito do seu nicho. Todos abertos para você navegar.
          </p>
        </div>

        <div className="mt-16 space-y-20 lg:mt-24 lg:space-y-28">
          {projetos.map((p, i) => (
            // A coluna larga acompanha a imagem quando ela troca de lado.
            <article
              key={p.nome}
              className={`grid items-center gap-8 lg:gap-16 ${
                i % 2 === 1
                  ? "lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
                  : "lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]"
              }`}
            >
              {/* A moldura mostra o endereço de verdade: é o site no ar,
                  não uma imagem de vitrine. */}
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`block overflow-hidden rounded-xl border border-verde-escuro/15 bg-creme transition-colors hover:border-verde-escuro/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-verde ${
                  i % 2 === 1 ? "lg:order-2" : ""
                }`}
                aria-label={`Abrir o site ${p.nome}`}
              >
                <div className="flex h-9 items-center gap-2 border-b border-verde-escuro/10 bg-creme px-3.5 text-[12.5px] text-verde-escuro/65">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="5" y="11" width="14" height="10" rx="2" />
                    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                  </svg>
                  {dominio(p.url)}
                </div>
                <div className="relative aspect-[16/10]">
                  <Screenshot src={p.imagem} alt={`Página inicial do site ${p.nome}`} nome={p.nome} />
                </div>
              </a>

              <div>
                <p className="text-[14px] font-medium text-verde-escuro/70">{p.segmento}</p>
                <h3 className="titulo-item mt-2">{p.nome}</h3>
                <p className="mt-5 max-w-[52ch] text-[16.5px] leading-relaxed text-verde-escuro/85">{p.descricao}</p>

                {/* Ressalva do projeto, quando existe: ninguém deve ler o
                    print como loja faturando. */}
                {p.contexto && (
                  <p className="mt-5 max-w-[52ch] border-l-2 border-verde pl-4 text-[14px] leading-relaxed text-verde-escuro/75">
                    {p.contexto}
                  </p>
                )}

                <p className="mt-5 text-[14px] text-verde-escuro/70">
                  <span className="sr-only">Recursos: </span>
                  {p.tags.join(" · ")}
                </p>

                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-verde mt-7 inline-block text-[15px]"
                >
                  Visitar site
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

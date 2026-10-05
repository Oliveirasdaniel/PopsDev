import { projetos } from "@/lib/site";
import Screenshot from "./Screenshot";

/** O endereço que aparece na barra da moldura, sem protocolo nem barra final. */
function dominio(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export default function Portfolio() {
  return (
    <section id="projetos" className="secao bg-papel">
      <div className="wrap">
        <div className="cabecalho">
          <h2 className="titulo-2">Projetos</h2>
          <p className="lead text-andesito-escuro">
            Quatro sites construídos do zero, cada um no jeito do seu nicho. Todos abertos para você navegar.
          </p>
        </div>

        <div className="mt-16 grid gap-x-10 gap-y-16 md:grid-cols-2">
          {projetos.map((p) => (
            <article key={p.nome}>
              {/* A moldura mostra o endereço de verdade: é o site no ar,
                  não uma imagem de vitrine. */}
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block overflow-hidden rounded-xl border border-tinta/15 bg-white transition-colors hover:border-tinta/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-latao-escuro"
                aria-label={`Abrir o site ${p.nome}`}
              >
                <div className="flex h-9 items-center gap-2 border-b border-tinta/10 bg-pedra px-3.5 text-[12.5px] text-andesito-escuro">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="5" y="11" width="14" height="10" rx="2" />
                    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                  </svg>
                  {dominio(p.url)}
                </div>
                <div className="relative aspect-[16/9]">
                  <Screenshot src={p.imagem} alt={`Página inicial do site ${p.nome}`} nome={p.nome} />
                </div>
              </a>

              <div className="mt-7 flex items-start justify-between gap-6">
                <div>
                  <p className="text-[14px] text-andesito-escuro">{p.segmento}</p>
                  <h3 className="titulo-3 mt-1">{p.nome}</h3>
                </div>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link mt-1 shrink-0 text-[15px]"
                >
                  Visitar site
                </a>
              </div>

              <p className="mt-3 max-w-[58ch] text-[16px] leading-relaxed text-tinta/80">{p.descricao}</p>

              {/* Ressalva do projeto, quando existe: ninguém deve ler o
                  print como loja faturando. */}
              {p.contexto && (
                <p className="mt-4 max-w-[58ch] border-l-2 border-latao pl-4 text-[14px] leading-relaxed text-andesito-escuro">
                  {p.contexto}
                </p>
              )}

              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Recursos">
                {p.tags.map((t) => (
                  <li key={t} className="rounded border border-tinta/15 px-2.5 py-1 text-[13px] text-andesito-escuro">
                    {t}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

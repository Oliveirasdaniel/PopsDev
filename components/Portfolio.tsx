import { projetos } from "@/lib/site";
import Screenshot from "./Screenshot";

/** O endereço que aparece na barra da moldura, sem protocolo nem barra final. */
function dominio(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

/**
 * Carrossel contínuo com as prévias. A lista vai duas vezes na faixa para
 * o loop não ter emenda; a segunda cópia fica fora do leitor de tela e do
 * Tab. Passar o mouse (ou focar um card) pausa a animação — ver .carrossel
 * no globals.css.
 */
export default function Portfolio() {
  return (
    <section id="projetos" className="secao overflow-hidden bg-verde-claro">
      <div className="wrap">
        <div className="cabecalho">
          <h2 className="titulo-secao">Projetos</h2>
          <p className="lead text-verde-escuro/75">
            Sites construídos do zero, cada um no jeito do seu nicho. Todos abertos para você navegar.
          </p>
        </div>
      </div>

      <div className="carrossel mt-14 lg:mt-20">
        <ul className="carrossel-faixa">
          {[...projetos, ...projetos].map((p, i) => {
            const copia = i >= projetos.length;
            return (
              <li key={i} aria-hidden={copia || undefined} className="w-[300px] shrink-0 sm:w-[420px]">
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={copia ? -1 : undefined}
                  className="group block overflow-hidden rounded-xl border border-verde-escuro/15 bg-creme transition-colors hover:border-verde-escuro/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-verde"
                  aria-label={`Abrir o site ${p.nome}`}
                >
                  <div className="flex h-8 items-center gap-2 border-b border-verde-escuro/10 px-3 text-[12px] text-verde-escuro/65">
                    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <rect x="5" y="11" width="14" height="10" rx="2" />
                      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                    </svg>
                    <span className="truncate">{dominio(p.url)}</span>
                  </div>
                  <div className="relative aspect-[16/10]">
                    <Screenshot src={p.imagem} alt={`Página inicial do site ${p.nome}`} nome={p.nome} sizes="420px" />
                  </div>
                  <div className="border-t border-verde-escuro/10 px-4 py-3.5">
                    <p className="text-[12.5px] font-medium text-verde-escuro/65">{p.segmento}</p>
                    <p className="mt-0.5 font-semibold text-verde-escuro">{p.nome}</p>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

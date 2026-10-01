import { site, whatsappLink } from "@/lib/site";

const links = [
  { href: "/#servicos", label: "Serviços" },
  { href: "/#projetos", label: "Projetos" },
  { href: "/#processo", label: "Processo" },
  { href: "/#habilidades", label: "Habilidades" },
  { href: "/#faq", label: "Dúvidas" },
  { href: "/sobre", label: "Sobre" },
  { href: "/#contato", label: "Briefing" },
];

const linkClasse = "text-[15px] text-papel/75 transition-colors hover:text-acento";

/** Faixa de tinta: o fim da página tem a cor do contorno da logo. */
export default function Footer() {
  return (
    <footer className="bg-tinta text-papel">
      <div className="wrap py-16 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto] lg:gap-20">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo/letreiro.svg" alt={site.nome} width={124} height={42} className="[image-rendering:pixelated]" />
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-papel/70">{site.descricao}</p>
            <a
              href={whatsappLink(`Olá, Daniel! Vim pelo site da ${site.nome} e quero um orçamento.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn mt-7 border-acento bg-acento text-tinta hover:border-papel hover:bg-papel focus-visible:outline-acento"
            >
              Falar agora
            </a>
          </div>

          <nav aria-label="Navegação do rodapé">
            <p className="text-[13px] font-bold tracking-[0.03em] text-acento-claro">Navegar</p>
            <ul className="mt-4 space-y-2.5">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className={linkClasse}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-[13px] font-bold tracking-[0.03em] text-acento-claro">Contato</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={whatsappLink(`Olá, Daniel! Vim pelo site da ${site.nome}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClasse}
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className={linkClasse}>
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.instagram} target="_blank" rel="noopener noreferrer" className={linkClasse}>
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t-2 border-papel/15 pt-6 font-pixel text-[20px] uppercase leading-none tracking-[0.06em] text-papel/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.nome} — {site.autor}
          </p>
          <p>{site.cidade}</p>
        </div>
      </div>
    </footer>
  );
}

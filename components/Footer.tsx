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

export default function Footer() {
  return (
    <footer className="mt-28 border-t border-line sm:mt-36">
      <div className="wrap py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto]">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[17px] font-semibold tracking-tightest">popsdev</span>
              <span className="h-1.5 w-1.5 rounded-full bg-acid" aria-hidden="true" />
            </div>
            <p className="lead mt-4 max-w-xs text-sm">{site.descricao}</p>
            <a
              href={whatsappLink(`Olá, Daniel! Vim pelo site da ${site.nome} e quero um orçamento.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-solid mt-7"
            >
              Falar agora
            </a>
          </div>

          <nav aria-label="Navegação do rodapé" className="lg:px-12">
            <p className="label-mono">Navegar</p>
            <ul className="mt-4 space-y-2">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-muted transition-colors hover:text-bone">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="label-mono">Contato</p>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href={whatsappLink(`Olá, Daniel! Vim pelo site da ${site.nome}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-bone"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="text-sm text-muted transition-colors hover:text-bone">
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-bone"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.nome} — {site.autor}
          </p>
          <p>{site.cidade}</p>
        </div>
      </div>
    </footer>
  );
}

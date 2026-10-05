import { site, whatsappLink } from "@/lib/site";
import { Logo } from "./Header";

const links = [
  { href: "/#servicos", label: "Serviços" },
  { href: "/#projetos", label: "Projetos" },
  { href: "/#processo", label: "Processo" },
  { href: "/#faq", label: "Dúvidas" },
  { href: "/sobre", label: "Sobre" },
  { href: "/#contato", label: "Pedir orçamento" },
];

const linkClasse = "text-[15px] text-papel/70 transition-colors hover:text-latao-claro";

export default function Footer() {
  return (
    <footer className="bg-tinta text-papel">
      <div className="wrap py-16 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto] lg:gap-24">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-papel/60">{site.descricao}</p>
          </div>

          <nav aria-labelledby="rodape-navegar">
            <h2 id="rodape-navegar" className="text-[14px] font-semibold text-latao">
              Navegar
            </h2>
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
            <h2 className="text-[14px] font-semibold text-latao">Contato</h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={whatsappLink(`Olá! Vim pelo site da ${site.nome}.`)}
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

        <div className="mt-16 flex flex-col gap-2 border-t border-papel/10 pt-7 text-[14px] text-papel/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.nome}. Fundada por {site.autor}.
          </p>
          <p>{site.cidade}</p>
        </div>
      </div>
    </footer>
  );
}

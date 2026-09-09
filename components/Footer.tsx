import { site, whatsappLink } from "@/lib/site";
import { IconWhatsApp } from "./Icons";

const links = [
  { href: "#servicos", label: "Serviços" },
  { href: "#portfolio", label: "Projetos" },
  { href: "#processo", label: "Como funciona" },
  { href: "#planos", label: "Planos" },
  { href: "#faq", label: "Dúvidas" },
  { href: "#contato", label: "Briefing" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-950">
      <div className="container-page py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-moss-500 text-base font-bold text-ink-950">
                P
              </span>
              <span className="text-lg font-semibold tracking-tight">
                {site.nome.replace("dev", "")}
                <span className="text-moss-400">dev</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-sand/50">{site.descricao}</p>
          </div>

          <nav aria-label="Navegação do rodapé">
            <p className="text-xs uppercase tracking-[0.16em] text-sand/40">Navegar</p>
            <ul className="mt-4 space-y-2.5">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-sand/60 transition hover:text-moss-300">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-sand/40">Contato</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={whatsappLink(`Olá, Daniel! Vim pelo site da ${site.nome}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-sand/60 transition hover:text-moss-300"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="text-sm text-sand/60 transition hover:text-moss-300">
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-sand/60 transition hover:text-moss-300"
                >
                  Instagram
                </a>
              </li>
            </ul>
            <a
              href={whatsappLink(`Olá, Daniel! Vim pelo site da ${site.nome} e quero um orçamento.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-6 !px-5 !py-2.5"
            >
              <IconWhatsApp className="h-4 w-4" />
              Falar agora
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-sand/35 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.nome} · {site.autor}
          </p>
          <p>{site.cidade}</p>
        </div>
      </div>
    </footer>
  );
}

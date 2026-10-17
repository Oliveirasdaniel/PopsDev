import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { clienteLogado, loginDisponivel } from "@/lib/sessao";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Área do cliente",
  robots: { index: false },
};
export const dynamic = "force-dynamic";

const erros: Record<string, string> = {
  email: "Esse e-mail não parece válido.",
  link: "Esse link já foi usado ou venceu. Peça um novo abaixo.",
  envio: "Não conseguimos enviar o e-mail agora. Tente de novo em instantes.",
  indisponivel: "A área do cliente ainda não está disponível.",
};

export default async function Entrar({
  searchParams,
}: {
  searchParams: { enviado?: string; erro?: string; excluida?: string };
}) {
  if (await clienteLogado().catch(() => null)) redirect("/conta");
  const disponivel = loginDisponivel();
  const erro = searchParams.erro ? erros[searchParams.erro] : null;

  return (
    <>
      <Header claro />
      <main className="min-h-[70vh] bg-creme pb-24 pt-28 text-verde-escuro sm:pb-32 sm:pt-36">
        <div className="wrap max-w-xl">
          <h1 className="titulo-pagina">Área do cliente</h1>

          {!disponivel ? (
            <p className="lead mt-6 text-verde-escuro/75">
              A área do cliente está chegando. Enquanto isso, fale com a gente pelo{" "}
              <a className="link-verde" href={whatsappLink(`Olá! Sou cliente da ${site.nome} e queria ver minha assinatura.`)}>
                WhatsApp
              </a>
              .
            </p>
          ) : searchParams.excluida ? (
            <p className="lead mt-6 text-verde-escuro/75" aria-live="polite">
              Conta excluída. As assinaturas foram canceladas e seus dados apagados do nosso banco.
            </p>
          ) : searchParams.enviado ? (
            <div className="mt-6" aria-live="polite">
              <p className="lead text-verde-escuro/75">
                Se esse e-mail tem assinatura com a gente, o link de acesso já está a caminho. Ele vale por 15 minutos.
              </p>
              <p className="mt-4 text-[15px] text-verde-escuro/65">Não chegou? Olhe o spam ou peça de novo em alguns minutos.</p>
            </div>
          ) : (
            <>
              <p className="lead mt-6 text-verde-escuro/75">
                Veja sua assinatura, a próxima cobrança e peça um Pix novo. Digite o e-mail usado na assinatura e mandamos um
                link de acesso, sem senha. Veja como tratamos seus dados na{" "}
                <a className="link-verde" href="/privacidade">
                  política de privacidade
                </a>
                .
              </p>
              <form action="/api/entrar" method="post" className="mt-8 grid gap-3 sm:grid-cols-[1fr_auto]">
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="Seu e-mail"
                  aria-label="E-mail"
                  className="h-12 w-full rounded-lg border border-verde-escuro/20 bg-white/60 px-4 text-[16px] placeholder:text-verde-escuro/40 focus:border-verde focus:outline-none focus:ring-2 focus:ring-verde/20"
                />
                <button className="inline-flex h-12 items-center justify-center rounded-full bg-verde px-7 text-[15px] font-semibold text-creme hover:bg-verde-escuro">
                  Receber link
                </button>
              </form>
              {erro && (
                <p role="alert" className="mt-3 text-[14px] font-medium text-red-700">
                  {erro}
                </p>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Entrar",
  robots: { index: false },
  // O segredo está na URL: não vai junto para sites externos. Não pode
  // ser "no-referrer": com ele o navegador manda `Origin: null` no POST
  // do botão e a checagem de mesma origem recusa o login.
  referrer: "same-origin",
};
export const dynamic = "force-dynamic";

/** Página do link do e-mail. O login só acontece no clique do botão (veja a rota). */
export default function Confirmar({ searchParams }: { searchParams: { t?: string } }) {
  return (
    <>
      <Header claro />
      <main className="min-h-[70vh] bg-creme pb-24 pt-28 text-verde-escuro sm:pb-32 sm:pt-36">
        <div className="wrap max-w-xl">
          <h1 className="titulo-pagina">Entrar</h1>
          <p className="lead mt-6 text-verde-escuro/75">Falta um clique para abrir sua área do cliente.</p>
          <form action="/api/entrar/confirmar" method="post" className="mt-8">
            <input type="hidden" name="t" value={searchParams.t ?? ""} />
            <button className="inline-flex h-12 items-center justify-center rounded-full bg-verde px-8 text-[15px] font-semibold text-creme hover:bg-verde-escuro">
              Entrar na minha conta
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}

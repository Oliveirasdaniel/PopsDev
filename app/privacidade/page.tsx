import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description: `Como a ${site.nome} trata os seus dados pessoais, de acordo com a LGPD (Lei 13.709/2018).`,
};

// Atualize a data sempre que mudar o texto, e o texto sempre que mudar
// o que o site coleta ou com quem compartilha.
const atualizada = "16 de outubro de 2026";

const secoes: { titulo: string; corpo: React.ReactNode }[] = [
  {
    titulo: "Quem cuida dos seus dados",
    corpo: (
      <p>
        O controlador dos dados é {site.autor} de Siqueira, responsável pela {site.nome}. Para qualquer assunto sobre
        privacidade, inclusive exercer os seus direitos, escreva para{" "}
        <a className="link-verde" href={`mailto:${site.email}`}>
          {site.email}
        </a>
        . Respondemos em até 15 dias.
      </p>
    ),
  },
  {
    titulo: "O que coletamos e para quê",
    corpo: (
      <>
        <p>
          <strong>Quem só visita o site:</strong> nada. Não usamos Google Analytics, pixel de anúncio, mapa de calor nem
          cookie de rastreamento.
        </p>
        <p>
          <strong>Quem assina um plano:</strong> nome, e-mail, CPF e WhatsApp, informados no checkout. Servem para emitir
          a cobrança Pix, manter a assinatura, mandar as próximas cobranças e falar com você sobre o serviço contratado. A
          base legal é a execução do contrato (art. 7º, V, da LGPD).
        </p>
        <p>
          <strong>Quem entra na área do cliente:</strong> registramos o pedido do link de acesso e a sessão aberta, para
          manter você conectado com segurança (art. 7º, V).
        </p>
        <p>Não vendemos, alugamos nem usamos seus dados para publicidade.</p>
      </>
    ),
  },
  {
    titulo: "Onde os dados ficam",
    corpo: (
      <>
        <p>
          <strong>No nosso banco de dados:</strong> nome, e-mail, WhatsApp, os planos assinados e o status de cada um. O
          CPF não é guardado por nós: ele vai direto para a processadora de pagamento.
        </p>
        <p>
          Senhas não existem: o acesso é por link no e-mail. Os códigos dos links e das sessões são guardados
          criptografados (hash), e toda a comunicação usa HTTPS.
        </p>
      </>
    ),
  },
  {
    titulo: "Com quem compartilhamos",
    corpo: (
      <>
        <p>Só com os fornecedores necessários para o serviço funcionar, cada um para a sua função:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            <strong>SyncPay</strong> (processamento de pagamento): nome, e-mail, CPF e telefone, para emitir as cobranças
            Pix. Também é obrigada a guardar registros de pagamento por exigência legal e fiscal.
          </li>
          <li>
            <strong>Neon</strong> (banco de dados) e <strong>Vercel</strong> (hospedagem do site), com servidores em São
            Paulo.
          </li>
          <li>
            <strong>Resend</strong> (envio do e-mail com o link de acesso), com servidores em São Paulo: só o seu e-mail.
          </li>
        </ul>
        <p className="mt-3">
          Essas empresas podem ter sede ou suporte fora do Brasil; quando há transferência internacional, ela segue as
          garantias contratuais exigidas pela LGPD (art. 33).
        </p>
      </>
    ),
  },
  {
    titulo: "Cookies",
    corpo: (
      <p>
        Um único cookie, <code>popsdev_sessao</code>, e só depois que você entra na área do cliente. Ele é estritamente
        necessário para manter o login, não pode ser lido por scripts da página e expira em 30 dias ou quando você clica
        em Sair.
      </p>
    ),
  },
  {
    titulo: "Por quanto tempo",
    corpo: (
      <p>
        Os dados da assinatura ficam enquanto ela existir e, depois de encerrada, pelo tempo exigido por lei para
        registros fiscais e de defesa em eventual processo. Links de acesso e sessões vencidas são apagados
        automaticamente. Você pode pedir a exclusão antes disso, a qualquer momento.
      </p>
    ),
  },
  {
    titulo: "Seus direitos",
    corpo: (
      <>
        <p>
          A LGPD (art. 18) garante a você: confirmar se tratamos seus dados, acessá-los, corrigi-los, pedir a exclusão, a
          portabilidade, saber com quem foram compartilhados e revogar consentimentos.
        </p>
        <p>
          Na <a className="link-verde" href="/entrar">área do cliente</a> você baixa uma cópia dos seus dados e exclui a sua
          conta sozinho. Para o resto, escreva para{" "}
          <a className="link-verde" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          . Se não ficar satisfeito, você também pode reclamar na Autoridade Nacional de Proteção de Dados (ANPD).
        </p>
      </>
    ),
  },
];

export default function Privacidade() {
  return (
    <>
      <Header claro />
      <main className="bg-creme pb-24 pt-28 text-verde-escuro sm:pb-32 sm:pt-36">
        <div className="wrap max-w-3xl">
          <h1 className="titulo-pagina">Política de privacidade</h1>
          <p className="mt-4 text-[15px] text-verde-escuro/65">Atualizada em {atualizada}.</p>

          <div className="mt-12 border-b border-verde-escuro/15">
            {secoes.map((s) => (
              <section key={s.titulo} className="border-t border-verde-escuro/15 py-8">
                <h2 className="font-display text-[1.4rem] font-semibold tracking-[-0.02em]">{s.titulo}</h2>
                <div className="mt-4 space-y-3 text-[16px] leading-relaxed text-verde-escuro/80">{s.corpo}</div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

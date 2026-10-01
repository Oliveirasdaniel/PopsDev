import type { Metadata } from "next";
import { Archivo, Jersey_10 } from "next/font/google";
import { DefsEngrenagem } from "@/components/Engrenagem";
import Fundo from "@/components/Fundo";
import { site } from "@/lib/site";
import "./globals.css";

// Com o eixo de largura: os títulos usam o corte mais largo (125) e o
// texto corrido fica no normal (100), tudo no mesmo arquivo de fonte.
const sans = Archivo({
  subsets: ["latin"],
  display: "swap",
  axes: ["wdth"],
  variable: "--font-sans",
});

// Fonte pixel do letreiro que corre no topo: conversa com a logo sem
// sacrificar a leitura do resto, que fica na Archivo.
const pixel = Jersey_10({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  // O Next não tem as métricas desta fonte para calibrar a substituta e
  // avisava no build. Os rótulos são curtos: o ajuste não faz falta.
  adjustFontFallback: false,
  variable: "--font-pixel",
});


export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.nome} — Sites e ferramentas para agendamento e delivery`,
    template: `%s · ${site.nome}`,
  },
  description: site.descricao,
  keywords: [
    "criação de sites",
    "landing page",
    "site para restaurante",
    "site para barbearia",
    "site para salão de beleza",
    "sistema de agendamento",
    "cardápio digital",
    "delivery pelo WhatsApp",
  ],
  authors: [{ name: site.autor }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: site.nome,
    title: `${site.nome} — ${site.tagline}`,
    description: site.descricao,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.nome} — ${site.tagline}`,
    description: site.descricao,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${sans.variable} ${pixel.variable}`}>
      <body>
        <DefsEngrenagem />
        <div className="relative">{children}</div>
        {/* Por cima do conteúdo: as faixas agora são opacas e esconderiam o
            anel do clique. Não captura ponteiro, então não atrapalha nada. */}
        <Fundo />
      </body>
    </html>
  );
}

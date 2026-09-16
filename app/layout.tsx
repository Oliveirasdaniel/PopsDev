import type { Metadata } from "next";
import { Archivo, Jersey_10 } from "next/font/google";
import Fundo from "@/components/Fundo";
import { site } from "@/lib/site";
import "./globals.css";

const sans = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

// Fonte pixel dos rótulos: conversa com a logo sem sacrificar a leitura
// dos títulos, que continuam na Archivo.
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
      <body className="grain">
        <Fundo />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}

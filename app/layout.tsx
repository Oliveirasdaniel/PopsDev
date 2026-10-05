import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

// Com o eixo de largura: os títulos usam o corte largo (112) e o texto
// corrido fica no normal (100), tudo no mesmo arquivo de fonte.
const sans = Archivo({
  subsets: ["latin"],
  display: "swap",
  axes: ["wdth"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.nome} — Sites e sistemas para agendamento e delivery`,
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
    <html lang="pt-BR" className={sans.variable}>
      <body>{children}</body>
    </html>
  );
}

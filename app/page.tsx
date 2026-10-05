import BotaoFlutuante from "@/components/BotaoFlutuante";
import Contato from "@/components/Contato";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Servicos from "@/components/Servicos";
import { faq, site } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      name: site.nome,
      description: site.descricao,
      url: site.url,
      areaServed: "BR",
      founder: { "@type": "Person", name: site.autor },
      email: site.email,
      telephone: `+${site.whatsapp}`,
    },
    {
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.p,
        acceptedAnswer: { "@type": "Answer", text: f.r },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <Hero />
        <Servicos />
        <Portfolio />
        <Faq />
        <Contato />
      </main>
      <Footer />
      <BotaoFlutuante />
    </>
  );
}

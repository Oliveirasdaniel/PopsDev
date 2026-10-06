import BotaoFlutuante from "@/components/BotaoFlutuante";
import Contato from "@/components/Contato";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Servicos from "@/components/Servicos";
import { site } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.nome,
  description: site.descricao,
  url: site.url,
  areaServed: "BR",
  founder: { "@type": "Person", name: site.autor },
  email: site.email,
  telephone: `+${site.whatsapp}`,
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
        <Contato />
      </main>
      <Footer />
      <BotaoFlutuante />
    </>
  );
}

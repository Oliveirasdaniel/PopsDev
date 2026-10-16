// ============================================================
//  EDITE TUDO POR AQUI. O site inteiro lê deste arquivo.
// ============================================================

export const site = {
  nome: "Popsdev",
  autor: "Daniel Oliveira",
  cargo: "Desenvolvedor e fundador",
  tagline: "Sites que agendam, vendem e entregam — sem depender de rede social.",
  descricao:
    "Sites, agendamento online, delivery próprio e ferramentas sob medida para restaurantes, barbearias, salões de beleza e todo negócio que vive de agenda e de pedido.",

  // Formato internacional, só dígitos: 55 + DDD + número
  whatsapp: "5521971552321",
  email: "oliveirasdaniel@outlook.com",
  instagram: "https://instagram.com/popsdev_",
  cidade: "Brasil · atendimento 100% remoto",

  // Domínio final (usado no SEO / Open Graph)
  url: "https://www.popsdev.tech",
};

/**
 * `contexto` é opcional e serve para dizer a verdade sobre o projeto
 * quando ela não é óbvia pelo print — por exemplo, um trabalho que
 * está pronto mas ainda não entrou em operação. Sem isso, a vitrine
 * daria a entender que tudo ali é negócio faturando.
 */
export type Projeto = {
  nome: string;
  segmento: string;
  url: string;
  imagem: string;
  descricao: string;
  tags: string[];
  contexto?: string;
};

export const projetos: Projeto[] = [
  {
    nome: "Pizzaria Don’Ana",
    segmento: "Pizzaria · Delivery",
    url: "https://www.donanapizzariadelivery.com.br",
    imagem: "/portfolio/donana.png",
    descricao:
      "Site de pizzaria em Maricá com cardápio completo, horário de funcionamento ao vivo e pedido direto pelo Anota AI, iFood ou WhatsApp.",
    tags: ["Cardápio", "Delivery", "iFood", "WhatsApp"],
  },
  {
    nome: "Florae Cosméticos",
    segmento: "Cosméticos veganos · E-commerce",
    url: "https://florae-cosmeticos.vercel.app/",
    imagem: "/portfolio/florae.png",
    descricao:
      "Loja completa com catálogo de produtos, carrinho e um quiz de diagnóstico capilar que recomenda a linha certa para cada tipo de cabelo.",
    tags: ["E-commerce", "Carrinho", "Quiz de diagnóstico", "Catálogo"],
    contexto:
      "Projeto desenvolvido no Espro (Jovem Aprendiz). A loja está construída e navegável, mas ainda não entrou em operação por falta de verba.",
  },
  {
    nome: "Kelly Ferreira",
    segmento: "Terapia capilar · Agendamento",
    url: "https://kelly-grace.vercel.app",
    imagem: "/portfolio/kelly.png",
    descricao:
      "Site de autoridade para terapeuta capilar: vitrine de serviços, resultados antes e depois e agendamento de consulta direto pelo WhatsApp.",
    tags: ["Agendamento", "Antes e depois", "WhatsApp", "Serviços"],
  },
  {
    nome: "Mídia Led",
    segmento: "Mídia exterior · Painéis de LED",
    url: "https://midialeds.com.br",
    imagem: "/portfolio/midia-led.png",
    descricao:
      "Site de uma operação de mídia em LED na Baixada Fluminense: o trio de telas sobre veículo e o painel duplo da Via Dutra, com vídeo de fundo, números de circulação e pedido de orçamento em um clique.",
    tags: ["Landing page", "Vídeo de fundo", "Mídia exterior", "Orçamento"],
  },
  {
    nome: "Artesãos do Crepe",
    segmento: "Buffet de eventos · Orçamento",
    url: "https://creperia-sigma.vercel.app",
    imagem: "/portfolio/crepe.png",
    descricao:
      "Landing page de buffet artesanal com portfólio de eventos, tipos de festa atendidos e captação de orçamento em um clique.",
    tags: ["Landing page", "Portfólio", "Orçamento", "Eventos"],
  },
];

/** Monta o link do WhatsApp com a mensagem já preenchida. */
export function whatsappLink(mensagem: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}

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
  url: "https://popsdev.vercel.app",
};

/**
 * `aPartirDe` é o preço de entrada que aparece no serviço, já escrito
 * como deve sair na tela (com R$ e, se for o caso, /mês). Enquanto o
 * campo não existir, o serviço aparece sem preço.
 *
 * `proprio` marca o que é produto da Popsdev, não só trabalho sob encomenda.
 */
export type Servico = {
  titulo: string;
  resumo: string;
  itens: string[];
  aPartirDe?: string;
  proprio?: boolean;
};

export const servicos: Servico[] = [
  {
    titulo: "Landing page de conversão",
    resumo:
      "Uma página, um objetivo: transformar quem chega do Instagram em cliente que chama no WhatsApp.",
    itens: [
      "Copy e estrutura pensadas para o seu nicho",
      "Botão de WhatsApp com mensagem pronta",
      "Galeria de trabalhos e depoimentos",
      "Google Maps, horários e formas de pagamento",
    ],
  },
  {
    titulo: "Sistema de agendamento",
    resumo:
      "Seu cliente escolhe serviço, profissional e horário sozinho. Você recebe tudo organizado, sem ping-pong de mensagem.",
    itens: [
      "Serviços com duração e preço",
      "Agenda por profissional",
      "Confirmação automática no WhatsApp",
      "Painel para ver e gerenciar os horários",
    ],
  },
  {
    titulo: "Cardápio digital e delivery",
    resumo:
      "O pedido é montado no seu site e chega formatado no seu WhatsApp. Nenhuma comissão por venda, nenhum aplicativo no meio.",
    itens: [
      "Cardápio por categorias, com fotos e adicionais",
      "Carrinho com observações do cliente",
      "Taxa de entrega calculada por bairro",
      "Aberto ou fechado conforme o seu horário",
      "Pedido formatado direto no seu WhatsApp",
      "Sem comissão por pedido, nunca",
    ],
    proprio: true,
  },
  {
    titulo: "Sistemas sob medida",
    resumo:
      "Quando o negócio precisa de algo que nenhum template resolve, a Popsdev constrói do zero.",
    itens: [
      "CRM para organizar clientes e vendas",
      "Painéis e relatórios simples",
      "Integrações com planilhas e automações",
      "Manutenção e evolução contínua",
    ],
  },
];

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
    url: "https://midia-led.vercel.app",
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

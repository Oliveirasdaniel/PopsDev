// ============================================================
//  EDITE TUDO POR AQUI. O site inteiro lê deste arquivo.
// ============================================================

export const site = {
  nome: "Popsdev",
  autor: "Daniel Oliveira",
  cargo: "Desenvolvedor de sites e ferramentas para negócios locais",
  tagline: "Sites que agendam, vendem e entregam — sem depender de rede social.",
  descricao:
    "Landing pages e ferramentas sob medida para restaurantes, barbearias, salões de beleza e todo negócio que vive de agendamento e delivery.",

  // Formato internacional, só dígitos: 55 + DDD + número
  whatsapp: "5521971552321",
  email: "oliveirasdaniel@outlook.com",
  instagram: "https://instagram.com/popsdev",
  cidade: "Brasil · atendimento 100% remoto",

  // Domínio final (usado no SEO / Open Graph)
  url: "https://popsdev.vercel.app",
};

export const stats = [
  { valor: "3", label: "sites no ar", detalhe: "beleza, alimentação e serviços" },
  { valor: "7 dias", label: "para entregar", detalhe: "landing page, do briefing ao ar" },
  { valor: "R$ 29", label: "para começar", detalhe: "mensal, sem fidelidade" },
];

export const nichos = [
  "Restaurantes",
  "Barbearias",
  "Salões de beleza",
  "Clínicas e estética",
  "Confeitarias",
  "Buffets e eventos",
  "Petshops",
  "Studios de tatuagem",
  "Personal trainers",
  "Lojas locais",
];

export const servicos = [
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
    icone: "page" as const,
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
    icone: "calendar" as const,
  },
  {
    titulo: "Cardápio digital e delivery",
    resumo:
      "Catálogo online com carrinho que fecha o pedido direto no WhatsApp — sem taxa de aplicativo.",
    itens: [
      "Cardápio por categorias com fotos",
      "Carrinho, observações e adicionais",
      "Cálculo de taxa de entrega por bairro",
      "Pedido formatado direto no seu WhatsApp",
    ],
    icone: "cart" as const,
  },
  {
    titulo: "Ferramentas sob medida",
    resumo:
      "Quando o negócio precisa de algo que nenhum template resolve, eu construo do zero.",
    itens: [
      "Quiz e diagnóstico para recomendar produtos",
      "Painéis e relatórios simples",
      "Integrações com planilhas e automações",
      "Manutenção e evolução contínua",
    ],
    icone: "tools" as const,
  },
];

export const projetos = [
  {
    nome: "Florae Cosméticos",
    segmento: "Cosméticos veganos · E-commerce",
    url: "https://florae-cosmeticos.vercel.app/",
    imagem: "/portfolio/florae.jpg",
    descricao:
      "Loja completa com catálogo de produtos, carrinho e um quiz de diagnóstico capilar que recomenda a linha certa para cada tipo de cabelo.",
    tags: ["E-commerce", "Carrinho", "Quiz de diagnóstico", "Catálogo"],
  },
  {
    nome: "Kelly Ferreira",
    segmento: "Terapia capilar · Agendamento",
    url: "https://kelly-grace.vercel.app",
    imagem: "/portfolio/kelly.jpg",
    descricao:
      "Site de autoridade para terapeuta capilar: vitrine de serviços, resultados antes e depois e agendamento de consulta direto pelo WhatsApp.",
    tags: ["Agendamento", "Antes e depois", "WhatsApp", "Serviços"],
  },
  {
    nome: "Artesãos do Crepe",
    segmento: "Buffet de eventos · Orçamento",
    url: "https://creperia-sigma.vercel.app",
    imagem: "/portfolio/crepe.jpg",
    descricao:
      "Landing page de buffet artesanal com portfólio de eventos, tipos de festa atendidos e captação de orçamento em um clique.",
    tags: ["Landing page", "Portfólio", "Orçamento", "Eventos"],
  },
];

/**
 * Planos de agendamento.
 * itens: `ok: false` aparece riscado, como recurso que o plano NÃO inclui.
 * nota: linha abaixo do preço (setup). `notaDestaque` deixa ela em verde.
 */
export const planos = [
  {
    nome: "Agenda WhatsApp",
    formato: "Só o essencial, sem site",
    preco: "R$ 29",
    sufixo: "/mês",
    nota: "Sem taxa de setup",
    notaDestaque: false,
    resumo:
      "Para quem já tem clientes chegando e só precisa parar de perder horário no meio das mensagens.",
    destaque: false,
    itens: [
      { t: "Agendamento via WhatsApp", ok: true },
      { t: "Confirmação automática", ok: true },
      { t: "Lembrete automático", ok: true },
    ],
    cta: "Quero a Agenda WhatsApp",
  },
  {
    nome: "Agenda + site",
    formato: "Presença online, cobrança manual",
    preco: "R$ 79",
    sufixo: "/mês",
    nota: "+ R$ 100 de setup (taxa única)",
    notaDestaque: false,
    resumo:
      "Sua página própria no ar, com o cliente escolhendo o horário sozinho pelo site.",
    destaque: false,
    itens: [
      { t: "Tudo do plano WhatsApp", ok: true },
      { t: "Landing page própria", ok: true },
      { t: "Agendamento pelo site", ok: true },
      { t: "Cobrança via Pix manual", ok: false },
    ],
    cta: "Quero Agenda + site",
  },
  {
    nome: "Completo automático",
    formato: "Zero trabalho manual pro lojista",
    preco: "R$ 149",
    sufixo: "/mês",
    nota: "Setup grátis",
    notaDestaque: true,
    resumo:
      "O sistema cobra, confirma e reserva sozinho. Você só abre a agenda e atende.",
    destaque: true,
    selo: "Mais completo",
    itens: [
      { t: "Tudo do plano Agenda + site", ok: true },
      { t: "Pix automático (cobrança sozinha)", ok: true },
      { t: "Reserva automática de horário", ok: true },
    ],
    cta: "Quero o Completo automático",
  },
];

export const processo = [
  {
    passo: "01",
    titulo: "Conversa inicial",
    texto:
      "Uma conversa de 20 minutos no WhatsApp para entender o negócio, o público e o que hoje trava as vendas.",
  },
  {
    passo: "02",
    titulo: "Escopo e proposta",
    texto:
      "Você recebe por escrito o que será entregue, o prazo e o valor. Sem surpresa depois e sem cobrança escondida.",
  },
  {
    passo: "03",
    titulo: "Construção",
    texto:
      "Desenvolvo o site e te mando um link de prévia. Você acompanha, comenta e ajustamos antes de publicar.",
  },
  {
    passo: "04",
    titulo: "No ar e evoluindo",
    texto:
      "Publico no seu domínio, te ensino a usar e sigo por perto para ajustes, novas seções e melhorias.",
  },
];

export const faq = [
  {
    p: "Quanto tempo leva para o site ficar pronto?",
    r: "Uma landing page fica pronta em cerca de 7 dias após você me enviar textos e fotos. Sistemas de agendamento e cardápio com delivery levam de 2 a 3 semanas, dependendo do escopo.",
  },
  {
    p: "Preciso ter domínio próprio?",
    r: "Não precisa ter antes. Eu publico o site e, se você quiser um domínio próprio (seunegocio.com.br), eu registro e configuro tudo para você.",
  },
  {
    p: "Qual a diferença entre os três planos?",
    r: "No Agenda WhatsApp (R$ 29/mês) você tem a agenda com confirmação e lembrete automáticos, sem site. No Agenda + site (R$ 79/mês + R$ 100 de setup) entra a sua landing page com agendamento pelo site, e a cobrança do sinal você faz no Pix manualmente. No Completo automático (R$ 149/mês, setup grátis) o Pix é automático e o horário fica reservado sozinho assim que o cliente paga — você não faz nada manual.",
  },
  {
    p: "Tem fidelidade ou multa para cancelar?",
    r: "Não. As assinaturas são mensais e você cancela quando quiser. A única cobrança à parte é a taxa de setup de R$ 100 do plano Agenda + site, paga uma vez na montagem — no Completo automático o setup é grátis.",
  },
  {
    p: "Preciso de site também? Ou só a agenda resolve?",
    r: "Se você já vende bem pelo Instagram e só perde tempo marcando horário na mão, o Agenda WhatsApp resolve. Se você quer aparecer no Google, mostrar preços, fotos e depoimentos sem depender de rede social, vale ter o site junto.",
  },
  {
    p: "O cardápio com delivery cobra taxa por pedido?",
    r: "Não. O pedido é montado no seu site e chega formatado no seu WhatsApp. Nenhuma comissão por venda, diferente dos aplicativos de entrega.",
  },
  {
    p: "Eu consigo alterar textos e fotos sozinho?",
    r: "Sim. Entrego com um painel simples ou um arquivo único de conteúdo e gravo um vídeo curto mostrando como editar. Se preferir não mexer, na assinatura eu faço as alterações para você.",
  },
  {
    p: "Você atende fora da minha cidade?",
    r: "Atendo o Brasil inteiro. Todo o processo é remoto, por WhatsApp e chamada de vídeo quando necessário.",
  },
];

/** Monta o link do WhatsApp com a mensagem já preenchida. */
export function whatsappLink(mensagem: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}

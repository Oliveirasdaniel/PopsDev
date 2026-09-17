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
  instagram: "https://instagram.com/popsdev_",
  cidade: "Brasil · atendimento 100% remoto",

  // Domínio final (usado no SEO / Open Graph)
  url: "https://popsdev.vercel.app",
};

export const stats = [
  { valor: "4", label: "sites no ar", detalhe: "beleza, alimentação, serviços e mídia" },
  { valor: "7 dias", label: "para entregar", detalhe: "landing page, do briefing ao ar" },
  { valor: "24h", label: "para o orçamento", detalhe: "depois da primeira conversa" },
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
      "Sistema próprio da Popsdev: o pedido é montado no seu site e chega formatado no seu WhatsApp. Nenhuma comissão por venda, nenhum aplicativo no meio.",
    itens: [
      "Cardápio por categorias, com fotos e adicionais",
      "Carrinho com observações do cliente",
      "Taxa de entrega calculada por bairro",
      "Aberto ou fechado conforme o seu horário",
      "Pedido formatado direto no seu WhatsApp",
      "Sem comissão por pedido, nunca",
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

/**
 * Planos, agrupados por família. Um negócio de horário marcado e um de
 * entrega compram coisas diferentes — misturar tudo numa lista só faz
 * cada um ler metade do que não interessa.
 *
 * itens: `ok: false` aparece riscado, como recurso que o plano NÃO inclui.
 * nota: linha abaixo do preço. `notaDestaque` deixa ela em verde.
 */
export const familias = [
  {
    id: "agendamento",
    nome: "Para quem vive de horário marcado",
    publico: "Barbearias, salões, clínicas, estética e terapeutas",
    planos: [
      {
        nome: "Agenda WhatsApp",
        formato: "Só o essencial, sem site",
        preco: "Sob consulta",
        sufixo: "",
        nota: "Valor conforme o tamanho da agenda",
        notaDestaque: false,
        resumo:
          "Para quem já tem clientes chegando e só precisa parar de perder horário no meio das mensagens.",
        destaque: false,
        itens: [
          { t: "Agendamento via WhatsApp", ok: true },
          { t: "Confirmação automática", ok: true },
          { t: "Lembrete automático", ok: true },
          { t: "Página própria na internet", ok: false },
        ],
        cta: "Combinar valor",
      },
      {
        nome: "Agenda + site",
        formato: "Presença online, cobrança manual",
        preco: "Sob consulta",
        sufixo: "",
        nota: "Valor conforme o porte do negócio",
        notaDestaque: false,
        resumo: "Sua página própria no ar, com o cliente escolhendo o horário sozinho pelo site.",
        destaque: false,
        itens: [
          { t: "Tudo do plano WhatsApp", ok: true },
          { t: "Landing page própria", ok: true },
          { t: "Agendamento pelo site", ok: true },
          { t: "Cobrança do sinal via Pix manual", ok: false },
        ],
        cta: "Combinar valor",
      },
      {
        nome: "Completo automático",
        formato: "Zero trabalho manual",
        preco: "Sob consulta",
        sufixo: "",
        nota: "Orçamento fechado antes de começar",
        notaDestaque: true,
        resumo: "O sistema cobra, confirma e reserva sozinho. Você só abre a agenda e atende.",
        destaque: true,
        selo: "Mais completo",
        itens: [
          { t: "Tudo do plano Agenda + site", ok: true },
          { t: "Pix automático (cobrança sozinha)", ok: true },
          { t: "Reserva automática de horário", ok: true },
          { t: "Fim do no-show sem sinal pago", ok: true },
        ],
        cta: "Combinar valor",
      },
    ],
  },
  {
    id: "delivery",
    nome: "Para quem vive de pedido",
    publico: "Restaurantes, lanchonetes, pizzarias, docerias e hamburguerias",
    planos: [
      {
        nome: "Cardápio digital",
        formato: "O pedido chega no seu WhatsApp",
        preco: "Sob consulta",
        sufixo: "",
        nota: "Valor conforme o tamanho do cardápio",
        notaDestaque: false,
        resumo:
          "Troca o print do cardápio no story por uma página de verdade, com carrinho e pedido formatado.",
        destaque: false,
        itens: [
          { t: "Cardápio por categorias, com fotos", ok: true },
          { t: "Carrinho com adicionais e observações", ok: true },
          { t: "Taxa de entrega por bairro", ok: true },
          { t: "Pedido formatado no seu WhatsApp", ok: true },
          { t: "Sem comissão por pedido", ok: true },
          { t: "Painel próprio de pedidos", ok: false },
        ],
        cta: "Combinar valor",
      },
      {
        nome: "Delivery próprio",
        formato: "Sistema completo, com painel",
        preco: "Sob consulta",
        sufixo: "",
        nota: "Orçamento fechado antes de começar",
        notaDestaque: true,
        resumo:
          "O pedido deixa de ser mensagem e vira sistema: cai no painel da cozinha, apita e anda por status.",
        destaque: true,
        selo: "Mais vendido",
        itens: [
          { t: "Tudo do Cardápio digital", ok: true },
          { t: "Painel da cozinha em tempo real, com aviso sonoro", ok: true },
          { t: "Status do pedido: recebido, preparo, saiu, entregue", ok: true },
          { t: "Cliente acompanha por link, sem ligar para saber", ok: true },
          { t: "Comanda impressa em impressora térmica", ok: true },
          { t: "Cupons de desconto e relatório de vendas", ok: true },
          { t: "Você mesmo edita cardápio, preços e horários", ok: true },
        ],
        cta: "Combinar valor",
      },
      {
        nome: "Pedido + pagamento",
        formato: "O dinheiro entra antes da moto sair",
        preco: "Sob consulta",
        sufixo: "",
        nota: "Depende do gateway escolhido",
        notaDestaque: false,
        resumo:
          "Para quem cansou de pedido cancelado no portão e de fechar o caixa conferindo comprovante.",
        destaque: false,
        itens: [
          { t: "Tudo do Delivery próprio", ok: true },
          { t: "Pix automático, com baixa sozinha", ok: true },
          { t: "Pedido só entra na cozinha depois de pago", ok: true },
          { t: "Fechamento de caixa conferido pelo sistema", ok: true },
        ],
        cta: "Combinar valor",
      },
    ],
  },
];

/** Mantido para quem importava a lista antiga. */
export const planos = familias[0].planos;

export const sobMedida = {
  nome: "Sob medida",
  resumo:
    "Várias unidades, integração com o sistema que você já usa, catálogo com estoque, área de cliente com histórico — ou qualquer coisa que nenhum plano acima resolve.",
  itens: [
    "Levantamento de requisitos e protótipo antes de codar",
    "Multi-unidade e multi-profissional",
    "Integrações com pagamento, planilhas e automações",
    "Treinamento da sua equipe",
    "Contrato e cronograma definidos",
  ],
  cta: "Falar sobre meu projeto",
};

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
    p: "Qual a diferença entre os planos de agendamento?",
    r: "No Agenda WhatsApp você tem a agenda com confirmação e lembrete automáticos, sem site. No Agenda + site entra a sua landing page com agendamento pelo site, e a cobrança do sinal você faz no Pix manualmente. No Completo automático o Pix é automático e o horário fica reservado sozinho assim que o cliente paga — você não faz nada manual.",
  },
  {
    p: "Por que os preços não estão no site?",
    r: "Porque o mesmo plano custa coisas diferentes dependendo do tamanho da operação. Uma barbearia com um profissional e uma rede com quatro unidades e trinta serviços dão trabalhos muito distintos, e colocar um número único na página só faria eu cobrar caro de quem é pequeno ou barato de quem é grande. Na conversa inicial eu entendo o porte, e você recebe o valor fechado por escrito.",
  },
  {
    p: "Tem fidelidade ou multa para cancelar?",
    r: "Não. As assinaturas são mensais e você cancela quando quiser. Se houver taxa de montagem no seu caso, ela aparece na proposta antes de qualquer coisa começar — nunca depois.",
  },
  {
    p: "Preciso de site também? Ou só a agenda resolve?",
    r: "Se você já vende bem pelo Instagram e só perde tempo marcando horário na mão, o Agenda WhatsApp resolve. Se você quer aparecer no Google, mostrar preços, fotos e depoimentos sem depender de rede social, vale ter o site junto.",
  },
  {
    p: "Qual a diferença entre Cardápio digital e Delivery próprio?",
    r: "No Cardápio digital o cliente monta o pedido no site e ele chega pronto no seu WhatsApp — simples e barato, mas quem organiza é você. No Delivery próprio o pedido vira sistema: cai num painel que apita na cozinha, anda por status (recebido, preparo, saiu, entregue), o cliente acompanha por um link sem te ligar, a comanda sai na impressora e você ainda tem cupons e relatório de vendas. E edita o cardápio sozinho, sem me chamar.",
  },
  {
    p: "O cardápio com delivery cobra taxa por pedido?",
    r: "Não. O sistema de pedidos é próprio da Popsdev, desenvolvido por mim — não é plugin nem intermediário. O pedido é montado no seu site e chega formatado no seu WhatsApp, sem comissão por venda, diferente dos aplicativos de entrega que ficam com 20% a 30% de cada pedido.",
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

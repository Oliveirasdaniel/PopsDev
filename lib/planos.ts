// ============================================================
//  PLANOS DE ASSINATURA. A seção da home e o checkout leem daqui.
//  O servidor recalcula o valor a partir deste arquivo: o preço
//  que o navegador manda nunca é usado na cobrança.
// ============================================================

/**
 * Valores em centavos, para não ter erro de arredondamento.
 *
 * `adesao` é o valor único da criação/implantação (0 quando não há).
 * `mensal` é a mensalidade, que mantém o suporte e o sistema no ar.
 *
 * Sem `preco`, o plano aparece como "sob consulta" e o botão leva ao
 * WhatsApp em vez do checkout.
 */
export type Plano = {
  id: string;
  titulo: string;
  resumo: string;
  inclui: string[];
  preco?: { adesao: number; mensal: number };
  destaque?: boolean;
  novo?: boolean;
};

export const planos: Plano[] = [
  {
    id: "site",
    titulo: "Site + suporte",
    resumo: "A landing page de conversão no ar e alguém cuidando dela enquanto a assinatura estiver ativa.",
    inclui: [
      "Copy e estrutura pensadas para o seu nicho",
      "Botão de WhatsApp com mensagem pronta",
      "Galeria de trabalhos, mapa e horários",
      "Suporte pelo WhatsApp enquanto a assinatura estiver ativa",
    ],
    preco: { adesao: 25000, mensal: 6000 },
    destaque: true,
  },
  {
    id: "agendamento",
    titulo: "Agendamento",
    resumo: "Seu cliente marca sozinho, por serviço, profissional e horário. Você só confere a agenda.",
    inclui: [
      "Serviços com duração e preço",
      "Agenda por profissional",
      "Confirmação automática no WhatsApp",
      "Painel para ver e gerenciar os horários",
    ],
    preco: { adesao: 0, mensal: 6000 },
  },
  {
    id: "delivery",
    titulo: "Cardápio e delivery",
    resumo: "Pedido montado no seu site e entregue formatado no seu WhatsApp, sem comissão por venda.",
    inclui: [
      "Cardápio por categorias, com fotos e adicionais",
      "Taxa de entrega por bairro",
      "Aberto ou fechado conforme o seu horário",
      "Sem comissão por pedido, nunca",
    ],
    // TODO: definir a taxa de setup. A mensalidade é R$ 90; quando a
    // adesão estiver decidida, troque por { adesao: XXXXX, mensal: 9000 }.
  },
  {
    id: "crm",
    titulo: "CRM",
    resumo: "Clientes, conversas e vendas organizados num lugar só, em vez de espalhados no WhatsApp.",
    inclui: [
      "Clientes e vendas organizados",
      "Painéis e relatórios simples",
      "Integrações com planilhas e automações",
      "Manutenção e evolução contínua",
    ],
  },
  {
    id: "agentes-ia",
    titulo: "Agente de IA",
    resumo: "Um atendente que responde no WhatsApp a qualquer hora e passa para você quando precisa de gente.",
    inclui: [
      "Treinado com as informações do seu negócio",
      "Responde preços, horários e serviços",
      "Atende fora do horário comercial",
      "Passa a conversa para você quando necessário",
    ],
    novo: true,
  },
];

/**
 * Como o cliente paga: a adesão (quando há) é um Pix único; depois vem a
 * assinatura na SyncPay, cujo primeiro ciclo já é a 1ª mensalidade e os
 * seguintes ela cobra sozinha a cada 30 dias. No checkout, isso vira
 * até dois Pix em sequência: adesão e, paga ela, a 1ª mensalidade.
 *
 * Nome do plano recorrente na SyncPay (é por ele que o plano é achado lá). */
export function nomeNaSyncPay(p: Plano) {
  return `Popsdev · ${p.titulo}`;
}

export function buscarPlano(id: string) {
  return planos.find((p) => p.id === id);
}

/** 25000 -> "R$ 250"; 9990 -> "R$ 99,90". */
export function reais(centavos: number) {
  const inteiro = centavos % 100 === 0;
  return (centavos / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: inteiro ? 0 : 2,
    maximumFractionDigits: 2,
  });
}

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
 * Sem `preco`, o plano não tem checkout online e o botão leva ao
 * WhatsApp. Se tiver `oferta`, o preço dela é exibido; senão, "sob consulta".
 *
 * `oferta` é pagamento único (`unico`) mais adicionais mensais OPCIONAIS e
 * INDEPENDENTES entre si: nenhum é obrigatório e um não soma o outro. Não
 * cabe no checkout atual (adesão + assinatura obrigatória), então é só
 * exibição: contratação e escolha dos adicionais acontecem pelo WhatsApp.
 * O `inclui` do plano vale só para o pagamento único; o que um adicional
 * entrega fica no `inclui` dele.
 */
export type Adicional = { id: string; nome: string; mensal: number; inclui: string[] };

export type Plano = {
  id: string;
  titulo: string;
  resumo: string;
  inclui: string[];
  preco?: { adesao: number; mensal: number };
  oferta?: { unico: number; adicionais: Adicional[] };
  destaque?: boolean;
  novo?: boolean;
};

const ALTERACOES: Adicional = {
  id: "alteracoes",
  nome: "Alterações ilimitadas",
  mensal: 7000,
  inclui: ["Alterações ilimitadas no que já foi entregue, enquanto o adicional estiver ativo"],
};

export const planos: Plano[] = [
  {
    id: "site",
    titulo: "Site estático",
    resumo: "A landing page de conversão no ar, em pagamento único e sem alterações depois de entregue.",
    inclui: [
      "Copy e estrutura pensadas para o seu nicho",
      "Botão de WhatsApp com mensagem pronta",
      "Galeria de trabalhos, mapa e horários",
    ],
    // Sem `preco` de propósito: nada de assinatura obrigatória. Ver `oferta`.
    oferta: { unico: 30000, adicionais: [ALTERACOES] },
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
    preco: { adesao: 20000, mensal: 12000 },
  },
  {
    id: "delivery",
    titulo: "Cardápio digital",
    resumo: "Seu cardápio no ar, em pagamento único e sem alterações depois de entregue. Delivery é um adicional à parte.",
    inclui: [
      "Cardápio por categorias, com fotos",
      "Complementos e opções por item",
      "Aberto ou fechado conforme o seu horário",
      "Botão de WhatsApp para falar com a loja",
    ],
    // Sem `preco`: o cardápio básico não tem assinatura nem delivery. Ver `oferta`.
    oferta: {
      unico: 30000,
      adicionais: [
        ALTERACOES,
        {
          id: "delivery",
          nome: "Delivery",
          mensal: 12000,
          inclui: [
            "Pedido montado no site e enviado formatado ao seu WhatsApp",
            "Taxa de entrega por bairro",
            "Sem comissão por pedido, nunca",
          ],
        },
      ],
    },
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

/** Só planos com `preco` passam pelo checkout online (Pix + assinatura). */
export function temCheckoutOnline(p: Plano | undefined): p is Plano & { preco: NonNullable<Plano["preco"]> } {
  return Boolean(p?.preco);
}

/** 30000 -> "R$ 300"; 9990 -> "R$ 99,90". */
export function reais(centavos: number) {
  const inteiro = centavos % 100 === 0;
  return (centavos / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: inteiro ? 0 : 2,
    maximumFractionDigits: 2,
  });
}

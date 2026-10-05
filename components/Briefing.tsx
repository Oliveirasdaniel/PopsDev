"use client";

import { useEffect, useRef, useState } from "react";
import { site, whatsappLink } from "@/lib/site";

/**
 * Briefing em passos.
 *
 * Quatro coisas que a primeira versão errava e estão corrigidas aqui:
 *
 * 1. O avanço automático usava setTimeout solto. Clicar rápido, ou sair
 *    da seção antes dele disparar, deixava o temporizador pendurado e a
 *    tela pulava sozinha depois. Agora o temporizador é cancelado.
 *
 * 2. Editar uma resposta no fim jogava a pessoa de volta na fila toda.
 *    Agora, quando ela veio do resumo, responder devolve ao resumo.
 *
 * 3. Não havia como responder o que não estava na lista. Toda pergunta
 *    ganhou "Outro", com campo livre.
 *
 * 4. A barra de progresso contava o passo em que a pessoa está, não o
 *    que ela já respondeu — então voltar parecia perder progresso.
 */

type Chave = "segmento" | "precisa" | "situacao" | "prazo";

type Passo = {
  chave: Chave;
  pergunta: string;
  ajuda?: string;
  opcoes: string[];
};

const PASSOS: Passo[] = [
  {
    chave: "segmento",
    pergunta: "Qual é o seu negócio?",
    opcoes: [
      "Restaurante ou lanchonete",
      "Barbearia",
      "Salão de beleza",
      "Clínica ou estética",
      "Confeitaria",
      "Buffet ou eventos",
      "Petshop",
    ],
  },
  {
    chave: "precisa",
    pergunta: "O que você precisa?",
    ajuda: "Se ainda não souber, tudo bem — tem opção para isso.",
    opcoes: [
      "Site para ser encontrado",
      "Agendamento online",
      "Cardápio com delivery",
      "Loja ou catálogo",
      "Identidade visual",
      "Ainda não sei",
    ],
  },
  {
    chave: "situacao",
    pergunta: "Como está hoje?",
    opcoes: [
      "Só tenho Instagram",
      "Tenho site, mas está velho",
      "Uso um sistema que não gosto",
      "Estou começando agora",
    ],
  },
  {
    chave: "prazo",
    pergunta: "Para quando?",
    opcoes: ["O quanto antes", "Nas próximas semanas", "Estou só pesquisando"],
  },
];

const VAZIAS: Record<Chave, string> = { segmento: "", precisa: "", situacao: "", prazo: "" };

const opcao =
  "rounded-lg border px-4 py-3 text-[15px] transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-latao-escuro";

export default function Briefing() {
  const [passo, setPasso] = useState(0);
  const [respostas, setRespostas] = useState<Record<Chave, string>>(VAZIAS);
  const [outro, setOutro] = useState("");
  const [escrevendoOutro, setEscrevendoOutro] = useState(false);
  const [nome, setNome] = useState("");
  const [negocio, setNegocio] = useState("");
  const [detalhes, setDetalhes] = useState("");
  const [avisoNome, setAvisoNome] = useState(false);

  // Quando a pessoa veio do resumo para corrigir uma resposta, volta
  // para o resumo em vez de refazer a fila inteira.
  const editando = useRef(false);
  const temporizador = useRef<ReturnType<typeof setTimeout> | null>(null);

  const FIM = PASSOS.length;
  const noFim = passo === FIM;
  const respondidas = PASSOS.filter((p) => respostas[p.chave]).length;
  const progresso = noFim ? 100 : (respondidas / (FIM + 1)) * 100;

  // Cancela o avanço pendente se o componente sair de cena.
  useEffect(
    () => () => {
      if (temporizador.current) clearTimeout(temporizador.current);
    },
    [],
  );

  // Ao trocar de pergunta, o campo "Outro" recomeça limpo.
  useEffect(() => {
    setEscrevendoOutro(false);
    setOutro("");
  }, [passo]);

  function responder(chave: Chave, valor: string) {
    if (!valor.trim()) return;
    setRespostas((r) => ({ ...r, [chave]: valor.trim() }));

    if (temporizador.current) clearTimeout(temporizador.current);
    const destino = editando.current ? FIM : Math.min(passo + 1, FIM);
    editando.current = false;

    // Pequena pausa só para a pessoa VER que a escolha registrou.
    temporizador.current = setTimeout(() => setPasso(destino), 200);
  }

  function irPara(indice: number, veioDoResumo = false) {
    if (temporizador.current) clearTimeout(temporizador.current);
    editando.current = veioDoResumo;
    setPasso(indice);
  }

  function montarMensagem() {
    const linhas = [
      `Olá! Vim pelo site da ${site.nome}.`,
      "",
      `*Nome:* ${nome.trim() || "não informado"}`,
      `*Negócio:* ${negocio.trim() || "não informado"}`,
      ...PASSOS.map((p) => `*${rotulo(p.chave)}:* ${respostas[p.chave] || "não respondeu"}`),
    ];
    if (detalhes.trim()) linhas.push("", `*Detalhes:* ${detalhes.trim()}`);
    return linhas.join("\n");
  }

  const atual = PASSOS[Math.min(passo, FIM - 1)];

  return (
    <section id="contato" className="secao bg-papel">
      <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-20">
        <div>
          <h2 className="titulo-2">Conte o seu projeto</h2>
          <p className="lead mt-6 text-andesito-escuro">
            Quatro perguntas, quase todas de um toque. Se a sua resposta não estiver na lista, escreva. No
            fim, o WhatsApp abre com tudo preenchido.
          </p>

          <dl className="mt-10 border-b border-tinta/15 text-[15px]">
            <div className="flex justify-between gap-4 border-t border-tinta/15 py-4">
              <dt className="font-semibold">Resposta</dt>
              <dd className="text-andesito-escuro">em até 2h úteis</dd>
            </div>
            <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 border-t border-tinta/15 py-4">
              <dt className="font-semibold">E-mail</dt>
              <dd className="min-w-0">
                <a href={`mailto:${site.email}`} className="link break-all !font-normal text-andesito-escuro">
                  {site.email}
                </a>
              </dd>
            </div>
            <div className="flex justify-between gap-4 border-t border-tinta/15 py-4">
              <dt className="font-semibold">Atendimento</dt>
              <dd className="text-andesito-escuro">remoto, todo o Brasil</dd>
            </div>
          </dl>
        </div>

        <div className="overflow-hidden rounded-2xl border border-tinta/15 bg-white">
          <div
            className="h-1 bg-pedra"
            role="progressbar"
            aria-label="Progresso do briefing"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progresso)}
          >
            <div className="h-full bg-latao transition-[width] duration-500" style={{ width: `${progresso}%` }} />
          </div>

          <div className="p-6 sm:p-10">
            {!noFim ? (
              <div key={passo} className="animate-troca">
                <p className="text-[14px] text-andesito-escuro">
                  Passo {passo + 1} de {FIM + 1}
                </p>
                <h3 className="titulo mt-2 text-[1.6rem] sm:text-[2rem]">{atual.pergunta}</h3>
                {atual.ajuda && <p className="mt-2 text-[15px] text-andesito-escuro">{atual.ajuda}</p>}

                <div className="mt-8 flex flex-wrap gap-2.5">
                  {atual.opcoes.map((o) => {
                    const escolhida = respostas[atual.chave] === o;
                    return (
                      <button
                        key={o}
                        type="button"
                        onClick={() => responder(atual.chave, o)}
                        aria-pressed={escolhida}
                        className={`${opcao} ${
                          escolhida ? "border-tinta bg-tinta text-papel" : "border-tinta/20 hover:border-tinta"
                        }`}
                      >
                        {o}
                      </button>
                    );
                  })}

                  {/* Resposta livre: nenhuma lista cobre todo mundo. */}
                  {!escrevendoOutro ? (
                    <button
                      type="button"
                      onClick={() => setEscrevendoOutro(true)}
                      className={`${opcao} border-dashed border-tinta/30 text-andesito-escuro hover:border-tinta hover:text-tinta`}
                    >
                      Outro…
                    </button>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        responder(atual.chave, outro);
                      }}
                      className="flex w-full gap-2 sm:w-auto"
                    >
                      <input
                        autoFocus
                        value={outro}
                        onChange={(e) => setOutro(e.target.value)}
                        placeholder="Escreva a sua resposta"
                        aria-label="Sua resposta"
                        className="field min-w-0 flex-1 sm:w-64"
                      />
                      <button type="submit" disabled={!outro.trim()} className="btn-latao shrink-0 !px-5 disabled:opacity-40">
                        Usar
                      </button>
                    </form>
                  )}
                </div>

                <div className="mt-10 flex items-center gap-6 text-[15px]">
                  {passo > 0 && (
                    <button type="button" onClick={() => irPara(passo - 1)} className="link">
                      Voltar
                    </button>
                  )}
                  {/* Sem resposta obrigatória: pular é melhor que abandonar. */}
                  <button
                    type="button"
                    onClick={() => irPara(editando.current ? FIM : passo + 1)}
                    className="link"
                  >
                    Pular
                  </button>
                </div>
              </div>
            ) : (
              <div className="animate-troca">
                <p className="text-[14px] text-andesito-escuro">Último passo</p>
                <h3 className="titulo mt-2 text-[1.6rem] sm:text-[2rem]">Como podemos te chamar?</h3>

                <div className="mt-6 flex flex-wrap gap-2">
                  {PASSOS.map((p, i) => (
                    <button
                      key={p.chave}
                      type="button"
                      onClick={() => irPara(i, true)}
                      className="rounded-lg border border-tinta/15 bg-pedra px-3.5 py-2 text-[14px] transition-colors hover:border-tinta"
                    >
                      {respostas[p.chave] || "não respondeu"}
                      <span className="ml-2 font-semibold text-latao-texto">editar</span>
                    </button>
                  ))}
                </div>

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="label-form" htmlFor="nome">
                      Seu nome
                    </label>
                    <input
                      id="nome"
                      className={`field ${avisoNome ? "!border-latao-texto ring-2 ring-latao/60" : ""}`}
                      value={nome}
                      onChange={(e) => {
                        setNome(e.target.value);
                        if (e.target.value.trim()) setAvisoNome(false);
                      }}
                      placeholder="Seu primeiro nome já basta"
                      aria-describedby={avisoNome ? "aviso-nome" : undefined}
                    />
                    {avisoNome && (
                      <p id="aviso-nome" className="mt-2 text-[14px] font-semibold text-latao-texto">
                        Preencha o seu nome para enviar.
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="label-form" htmlFor="negocio">
                      Nome do negócio
                    </label>
                    <input
                      id="negocio"
                      className="field"
                      value={negocio}
                      onChange={(e) => setNegocio(e.target.value)}
                      placeholder="Ex.: Barbearia Norte"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label-form" htmlFor="detalhes">
                      Quer contar mais? (opcional)
                    </label>
                    <textarea
                      id="detalhes"
                      rows={3}
                      className="field !h-auto resize-none py-3"
                      value={detalhes}
                      onChange={(e) => setDetalhes(e.target.value)}
                      placeholder="O que te trava hoje: agenda cheia de mensagem, pedido perdido, site antigo…"
                    />
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center">
                  <a
                    href={whatsappLink(montarMensagem())}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      if (!nome.trim()) {
                        e.preventDefault();
                        setAvisoNome(true);
                        document.getElementById("nome")?.focus();
                      }
                    }}
                    className="btn-latao !px-8"
                  >
                    Enviar pelo WhatsApp
                  </a>
                  <button type="button" onClick={() => irPara(FIM - 1)} className="link self-start text-[15px] sm:self-auto">
                    Voltar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function rotulo(chave: Chave) {
  return {
    segmento: "Segmento",
    precisa: "Precisa de",
    situacao: "Hoje",
    prazo: "Prazo",
  }[chave];
}

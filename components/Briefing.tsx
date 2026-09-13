"use client";

import { useEffect, useRef, useState } from "react";
import { site, whatsappLink } from "@/lib/site";
import Reveal from "./Reveal";

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
      `Olá, Daniel! Vim pelo site da ${site.nome}.`,
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
    <section id="contato" className="pt-28 sm:pt-36">
      <div className="wrap">
        <Reveal className="rule">
          <span className="num">05</span>
          <span className="label-mono">Briefing</span>
        </Reveal>

        <Reveal delay={60} className="mt-10 grid gap-12 lg:grid-cols-[20rem_1fr] lg:gap-20">
          <div>
            <h2 className="display text-3xl leading-[1] sm:text-5xl">
              Quatro perguntas
              <br />e pronto.
            </h2>
            <p className="lead mt-6 text-sm">
              A maioria é um toque só, e nenhuma tem resposta obrigatória da lista — se a sua não
              estiver lá, escreva. No fim, o WhatsApp abre com tudo escrito.
            </p>

            <dl className="mt-10 border-t border-line font-mono text-[11px] uppercase tracking-[0.14em]">
              <div className="flex justify-between gap-4 border-b border-line py-3">
                <dt className="text-muted">Resposta</dt>
                <dd className="text-bone/80">até 2h úteis</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-line py-3">
                <dt className="text-muted">E-mail</dt>
                <dd className="normal-case tracking-normal">
                  <a
                    href={`mailto:${site.email}`}
                    className="text-bone/80 underline decoration-line underline-offset-4 hover:decoration-acid"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-line py-3">
                <dt className="text-muted">Atendimento</dt>
                <dd className="text-bone/80">remoto, Brasil</dd>
              </div>
            </dl>
          </div>

          <div className="overflow-hidden rounded-[28px] border border-line bg-base-900/60">
            <div className="h-1 w-full bg-white/5">
              <div
                className="h-full bg-acid transition-[width] duration-500"
                style={{ width: `${progresso}%` }}
              />
            </div>

            <div className="p-7 sm:p-10">
              {!noFim ? (
                <div key={passo} className="animate-rise">
                  <p className="num">
                    Passo {passo + 1} de {FIM + 1}
                  </p>
                  <h3 className="display mt-3 text-2xl sm:text-3xl">{atual.pergunta}</h3>
                  {atual.ajuda && <p className="mt-2 text-sm text-muted">{atual.ajuda}</p>}

                  <div className="mt-7 flex flex-wrap gap-2.5">
                    {atual.opcoes.map((o) => {
                      const escolhida = respostas[atual.chave] === o;
                      return (
                        <button
                          key={o}
                          type="button"
                          onClick={() => responder(atual.chave, o)}
                          className={`rounded-full border px-5 py-3 text-sm transition-all duration-150 active:scale-[.97] ${
                            escolhida
                              ? "border-acid bg-acid font-semibold text-base-950"
                              : "border-line text-bone/75 hover:border-bone/40 hover:bg-white/[.04]"
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
                        className="rounded-full border border-dashed border-line px-5 py-3 text-sm text-muted transition hover:border-acid/50 hover:text-bone"
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
                          className="h-12 min-w-0 flex-1 rounded-full border border-acid/50 bg-transparent px-5 text-sm text-bone outline-none placeholder:text-muted/60 sm:w-64"
                        />
                        <button
                          type="submit"
                          disabled={!outro.trim()}
                          className="btn-solid !h-12 shrink-0 !rounded-full !px-5 disabled:opacity-40"
                        >
                          Usar
                        </button>
                      </form>
                    )}
                  </div>

                  <div className="mt-8 flex items-center gap-5">
                    {passo > 0 && (
                      <button
                        type="button"
                        onClick={() => irPara(passo - 1)}
                        className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted hover:text-bone"
                      >
                        ← voltar
                      </button>
                    )}
                    {/* Sem resposta obrigatória: pular é melhor que abandonar. */}
                    <button
                      type="button"
                      onClick={() => irPara(editando.current ? FIM : passo + 1)}
                      className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted hover:text-bone"
                    >
                      pular →
                    </button>
                  </div>
                </div>
              ) : (
                <div className="animate-rise">
                  <p className="num">Último passo</p>
                  <h3 className="display mt-3 text-2xl sm:text-3xl">Como te chamo?</h3>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {PASSOS.map((p, i) => (
                      <button
                        key={p.chave}
                        type="button"
                        onClick={() => irPara(i, true)}
                        className="rounded-full border border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted transition hover:border-acid/50 hover:text-bone"
                      >
                        {respostas[p.chave] || "não respondeu"}
                        <span className="ml-1.5 text-acid">editar</span>
                      </button>
                    ))}
                  </div>

                  <div className="mt-7 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="label-form" htmlFor="nome">
                        Seu nome
                      </label>
                      <input
                        id="nome"
                        className={`field !rounded-xl ${avisoNome ? "!border-acid" : ""}`}
                        value={nome}
                        onChange={(e) => {
                          setNome(e.target.value);
                          if (e.target.value.trim()) setAvisoNome(false);
                        }}
                        placeholder="Como posso te chamar?"
                      />
                      {avisoNome && (
                        <p className="mt-1.5 text-xs text-acid">
                          Só o nome, para eu não começar com &ldquo;olá&rdquo;.
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="label-form" htmlFor="negocio">
                        Nome do negócio
                      </label>
                      <input
                        id="negocio"
                        className="field !rounded-xl"
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
                        className="w-full resize-none rounded-xl border border-line bg-transparent px-4 py-3 text-sm text-bone outline-none transition-colors placeholder:text-muted/60 focus:border-bone/40"
                        value={detalhes}
                        onChange={(e) => setDetalhes(e.target.value)}
                        placeholder="O que te trava hoje: agenda cheia de mensagem, pedido perdido, site antigo…"
                      />
                    </div>
                  </div>

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
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
                      className="btn-solid !h-12 !rounded-full !px-8"
                    >
                      Enviar pelo WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={() => irPara(FIM - 1)}
                      className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted hover:text-bone"
                    >
                      ← voltar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Reveal>
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

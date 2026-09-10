"use client";

import { useState } from "react";
import { site, whatsappLink } from "@/lib/site";
import Reveal from "./Reveal";

const segmentos = [
  "Restaurante / lanchonete",
  "Barbearia",
  "Salão de beleza",
  "Clínica / estética",
  "Confeitaria / doceria",
  "Buffet / eventos",
  "Petshop",
  "Outro",
];

const tipos = [
  "Landing page",
  "Sistema de agendamento",
  "Cardápio com delivery",
  "Loja / catálogo online",
  "Ainda não sei",
];

const modelos = [
  "Agenda WhatsApp · R$ 29/mês",
  "Agenda + site · R$ 79/mês",
  "Completo automático · R$ 149/mês",
  "Projeto sob medida",
  "Quero entender qual vale mais a pena",
];

export default function Briefing() {
  const [form, setForm] = useState({
    nome: "",
    negocio: "",
    segmento: segmentos[0],
    tipo: tipos[0],
    modelo: modelos[4],
    detalhes: "",
  });

  const set =
    (campo: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [campo]: e.target.value }));

  function montarMensagem() {
    const linhas = [
      `Olá, Daniel! Vim pelo site da ${site.nome}.`,
      "",
      `*Nome:* ${form.nome || "não informado"}`,
      `*Negócio:* ${form.negocio || "não informado"}`,
      `*Segmento:* ${form.segmento}`,
      `*Preciso de:* ${form.tipo}`,
      `*Plano de interesse:* ${form.modelo}`,
    ];
    if (form.detalhes.trim()) {
      linhas.push("", `*Detalhes:* ${form.detalhes.trim()}`);
    }
    return linhas.join("\n");
  }

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    window.open(whatsappLink(montarMensagem()), "_blank", "noopener,noreferrer");
  }

  return (
    <section id="contato" className="pt-28 sm:pt-36">
      <div className="wrap">
        <Reveal className="rule">
          <span className="num">06</span>
          <span className="label-mono">Briefing</span>
        </Reveal>

        <div className="mt-10 grid gap-12 lg:grid-cols-[22rem_1fr] lg:gap-20">
          <Reveal delay={60}>
            <h2 className="display text-3xl leading-[1.05] sm:text-[2.75rem]">
              Me conta do seu negócio em 30 segundos.
            </h2>
            <p className="lead mt-6">
              Preencha e o botão abre o WhatsApp com tudo escrito. Você revisa antes de enviar.
            </p>

            <dl className="mt-10 border-t border-line font-mono text-[11px] uppercase tracking-[0.14em]">
              <div className="flex justify-between gap-4 border-b border-line py-3">
                <dt className="text-muted">Resposta</dt>
                <dd className="text-bone/80">até 2h úteis</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-line py-3">
                <dt className="text-muted">E-mail</dt>
                <dd className="normal-case tracking-normal">
                  <a href={`mailto:${site.email}`} className="text-bone/80 underline decoration-line underline-offset-4 hover:decoration-acid">
                    {site.email}
                  </a>
                </dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-line py-3">
                <dt className="text-muted">Atendimento</dt>
                <dd className="text-bone/80">remoto, Brasil</dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={120}>
            <form onSubmit={enviar}>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="label-form" htmlFor="nome">
                    Seu nome
                  </label>
                  <input
                    id="nome"
                    className="field"
                    placeholder="Como posso te chamar?"
                    value={form.nome}
                    onChange={set("nome")}
                    required
                  />
                </div>

                <div>
                  <label className="label-form" htmlFor="negocio">
                    Nome do negócio
                  </label>
                  <input
                    id="negocio"
                    className="field"
                    placeholder="Ex.: Barbearia Norte"
                    value={form.negocio}
                    onChange={set("negocio")}
                    required
                  />
                </div>

                <div>
                  <label className="label-form" htmlFor="segmento">
                    Segmento
                  </label>
                  <select id="segmento" className="field" value={form.segmento} onChange={set("segmento")}>
                    {segmentos.map((s) => (
                      <option key={s} value={s} className="bg-base-900">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label-form" htmlFor="tipo">
                    O que você precisa
                  </label>
                  <select id="tipo" className="field" value={form.tipo} onChange={set("tipo")}>
                    {tipos.map((t) => (
                      <option key={t} value={t} className="bg-base-900">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <fieldset className="sm:col-span-2">
                  <legend className="label-form">Plano de interesse</legend>
                  <div className="grid gap-px bg-line sm:grid-cols-2">
                    {modelos.map((m) => (
                      <label
                        key={m}
                        className={`cursor-pointer px-4 py-3 text-sm transition-colors ${
                          form.modelo === m ? "bg-acid font-medium text-base-950" : "bg-base-950 text-muted hover:text-bone"
                        }`}
                      >
                        <input
                          type="radio"
                          name="modelo"
                          value={m}
                          checked={form.modelo === m}
                          onChange={set("modelo")}
                          className="sr-only"
                        />
                        {m}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="sm:col-span-2">
                  <label className="label-form" htmlFor="detalhes">
                    Detalhes (opcional)
                  </label>
                  <textarea
                    id="detalhes"
                    rows={4}
                    className="w-full resize-none rounded-sm border border-line bg-transparent px-3.5 py-3 text-sm text-bone outline-none transition-colors placeholder:text-muted/60 focus:border-bone/40"
                    placeholder="O que te trava hoje: agenda cheia de mensagem, pedido perdido, site antigo…"
                    value={form.detalhes}
                    onChange={set("detalhes")}
                  />
                </div>
              </div>

              <button type="submit" className="btn-solid mt-8 w-full sm:w-auto sm:px-10">
                Enviar pelo WhatsApp
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

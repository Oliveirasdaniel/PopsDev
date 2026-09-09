"use client";

import { useState } from "react";
import { site, whatsappLink } from "@/lib/site";
import { IconWhatsApp } from "./Icons";
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

  const set = (campo: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
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
    <section id="contato" className="section">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr]">
          <Reveal>
            <span className="eyebrow">Briefing rápido</span>
            <h2 className="h2 mt-5">Me conta do seu negócio em 30 segundos.</h2>
            <p className="lead mt-5">
              Preencha os campos e o botão abre o WhatsApp com tudo já escrito. Eu leio, penso no melhor formato e
              volto com uma proposta.
            </p>

            <ul className="mt-8 space-y-3 text-sm text-sand/55">
              <li>· Resposta em até 2 horas em horário comercial</li>
              <li>· Sem compromisso e sem cobrança pela conversa</li>
              <li>· Se não for o momento, eu digo na hora</li>
            </ul>

            <div className="mt-8 rounded-2xl border border-white/10 bg-ink-900/60 p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-sand/40">Prefere falar direto?</p>
              <a href={`mailto:${site.email}`} className="mt-2 block text-sm text-moss-300 hover:underline">
                {site.email}
              </a>
              <p className="mt-1 text-sm text-sand/50">{site.cidade}</p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <form
              onSubmit={enviar}
              className="rounded-2xl border border-white/10 bg-ink-900/70 p-6 backdrop-blur-sm sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="label" htmlFor="nome">
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
                  <label className="label" htmlFor="negocio">
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
                  <label className="label" htmlFor="segmento">
                    Segmento
                  </label>
                  <select id="segmento" className="field" value={form.segmento} onChange={set("segmento")}>
                    {segmentos.map((s) => (
                      <option key={s} value={s} className="bg-ink-900">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label" htmlFor="tipo">
                    O que você precisa
                  </label>
                  <select id="tipo" className="field" value={form.tipo} onChange={set("tipo")}>
                    {tipos.map((t) => (
                      <option key={t} value={t} className="bg-ink-900">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <span className="label">Plano de interesse</span>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {modelos.map((m) => (
                      <label
                        key={m}
                        className={`cursor-pointer rounded-xl border px-4 py-3 text-sm transition ${
                          form.modelo === m
                            ? "border-moss-500/60 bg-moss-500/10 text-moss-200"
                            : "border-white/10 text-sand/60 hover:border-white/25"
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
                </div>

                <div className="sm:col-span-2">
                  <label className="label" htmlFor="detalhes">
                    Detalhes (opcional)
                  </label>
                  <textarea
                    id="detalhes"
                    rows={4}
                    className="field resize-none"
                    placeholder="Conte o que te trava hoje: agenda cheia de mensagem, pedidos perdidos, site antigo..."
                    value={form.detalhes}
                    onChange={set("detalhes")}
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary mt-7 w-full">
                <IconWhatsApp className="h-4 w-4" />
                Enviar briefing pelo WhatsApp
              </button>

              <p className="mt-3 text-center text-xs text-sand/35">
                O botão abre o WhatsApp com a mensagem já preenchida. Você revisa antes de enviar.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

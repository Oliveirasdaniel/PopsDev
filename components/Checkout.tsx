"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { problemaNosDados } from "@/lib/validar";

type Props = {
  plano: { id: string; titulo: string };
  /** Valores já formatados pela página; `adesao` vazio quando não há. */
  adesao?: string;
  mensal: string;
  className?: string;
};

type Fase = "adesao" | "mensalidade";

type Etapa =
  | { tipo: "dados" }
  | { tipo: "pix"; fase: Fase; id: string; copiaECola: string; qr: string; automatico: boolean }
  | { tipo: "gerando" }
  | { tipo: "pago" }
  | { tipo: "falhou" };

type Dados = { plano: string; nome: string; email: string; cpf: string; telefone: string };

const campo =
  "h-12 w-full rounded-lg border border-verde-escuro/20 bg-white/60 px-4 text-[16px] text-verde-escuro placeholder:text-verde-escuro/40 focus:border-verde focus:outline-none focus:ring-2 focus:ring-verde/20";

/**
 * Botão "Assinar" + modal: dados do cliente -> Pix da adesão (se houver)
 * -> Pix da 1ª mensalidade, que abre a assinatura recorrente -> pronto.
 * A confirmação vem consultando /api/checkout/[id] a cada 5 segundos
 * enquanto houver um Pix na tela.
 */
export default function Checkout({ plano, adesao, mensal, className = "" }: Props) {
  const dialogo = useRef<HTMLDialogElement>(null);
  const [etapa, setEtapa] = useState<Etapa>({ tipo: "dados" });
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [copiado, setCopiado] = useState(false);
  // Os dados ficam só na memória da aba, para a 2ª etapa não pedir tudo de novo.
  const dados = useRef<Dados | null>(null);
  // Adesão já paga: se a 2ª etapa falhar, tentar de novo não cobra outra adesão.
  const adesaoPaga = useRef<string | null>(null);

  // Consulta o status do Pix enquanto ele está na tela.
  useEffect(() => {
    if (etapa.tipo !== "pix") return;
    let ativo = true;
    const consultar = async () => {
      try {
        const tipo = etapa.fase === "mensalidade" ? "?tipo=assinatura" : "";
        const r = await fetch(`/api/checkout/${encodeURIComponent(etapa.id)}${tipo}`, { cache: "no-store" });
        const { situacao } = await r.json();
        if (!ativo) return;
        if (situacao === "falhou") setEtapa({ tipo: "falhou" });
        if (situacao !== "pago") return;
        if (etapa.fase === "mensalidade") setEtapa({ tipo: "pago" });
        // Adesão paga: já emenda o Pix da 1ª mensalidade.
        else if (dados.current) {
          adesaoPaga.current = etapa.id;
          gerarPix({ ...dados.current, adesaoId: etapa.id });
        }
      } catch {
        /* tenta de novo no próximo ciclo */
      }
    };
    const timer = window.setInterval(consultar, 5000);
    return () => {
      ativo = false;
      window.clearInterval(timer);
    };
  }, [etapa]);

  function abrir() {
    setErro(null);
    // Reabrir depois de pago ou de falha começa do zero; um Pix pendente
    // continua na tela para o cliente não gerar uma segunda cobrança.
    if (etapa.tipo === "pago" || etapa.tipo === "falhou") setEtapa({ tipo: "dados" });
    dialogo.current?.showModal();
  }

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const d: Dados = { plano: plano.id, nome: form.nome, email: form.email, cpf: form.cpf, telefone: form.telefone };

    const problema = problemaNosDados(d);
    if (problema) return setErro(problema);

    dados.current = d;
    setErro(null);
    setEnviando(true);
    await gerarPix(adesaoPaga.current ? { ...d, adesaoId: adesaoPaga.current } : d);
    setEnviando(false);
  }

  async function gerarPix(pedido: Dados & { adesaoId?: string }) {
    if (pedido.adesaoId) setEtapa({ tipo: "gerando" });
    try {
      const r = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedido),
      });
      const corpo = await r.json();
      if (!r.ok) throw new Error(corpo?.erro || "Não foi possível gerar o Pix agora.");

      const qr = await QRCode.toDataURL(corpo.pixCopiaECola, { margin: 1, width: 240, color: { dark: "#1c2e25", light: "#ffffff" } });
      setEtapa({
        tipo: "pix",
        fase: corpo.etapa,
        id: corpo.id,
        copiaECola: corpo.pixCopiaECola,
        qr,
        automatico: Boolean(corpo.automatico),
      });
    } catch (falha) {
      setErro(falha instanceof Error ? falha.message : "Não foi possível gerar o Pix agora.");
      setEtapa({ tipo: "dados" });
    }
  }

  async function copiar(texto: string) {
    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(true);
      window.setTimeout(() => setCopiado(false), 2500);
    } catch {
      /* sem permissão de área de transferência: o texto continua selecionável */
    }
  }

  return (
    <>
      <button type="button" onClick={abrir} className={className}>
        Assinar
      </button>

      <dialog
        ref={dialogo}
        aria-labelledby={`checkout-${plano.id}`}
        className="w-[min(100%-2rem,28rem)] rounded-2xl bg-creme p-0 text-verde-escuro backdrop:bg-verde-escuro/70"
        onClick={(e) => e.target === dialogo.current && dialogo.current?.close()}
      >
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id={`checkout-${plano.id}`} className="font-display text-[1.6rem] font-semibold leading-tight tracking-[-0.02em]">
                {plano.titulo}
              </h2>
              <p className="mt-1 text-[15px] text-verde-escuro/70">
                {adesao ? (
                  <>
                    Adesão <strong className="text-verde">{adesao}</strong> · {mensal}/mês
                  </>
                ) : (
                  <>
                    <strong className="text-verde">{mensal}</strong>/mês, sem adesão
                  </>
                )}
              </p>
            </div>
            <button
              type="button"
              onClick={() => dialogo.current?.close()}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-verde-escuro/20 text-[20px] leading-none hover:border-verde-escuro"
              aria-label="Fechar"
            >
              ×
            </button>
          </div>

          {etapa.tipo === "dados" && (
            <form onSubmit={enviar} className="mt-7 grid gap-3" noValidate>
              <input name="nome" autoComplete="name" placeholder="Nome completo" className={campo} required />
              <input name="email" type="email" autoComplete="email" placeholder="E-mail" className={campo} required />
              <div className="grid gap-3 sm:grid-cols-2">
                <input name="cpf" inputMode="numeric" placeholder="CPF" className={campo} required />
                <input name="telefone" type="tel" inputMode="tel" autoComplete="tel" placeholder="WhatsApp com DDD" className={campo} required />
              </div>
              {erro && (
                <p role="alert" className="text-[14px] font-medium text-red-700">
                  {erro}
                </p>
              )}
              <button
                type="submit"
                disabled={enviando}
                className="mt-2 inline-flex h-12 items-center justify-center rounded-full bg-verde px-6 text-[16px] font-semibold text-creme transition-colors hover:bg-verde-escuro disabled:opacity-60"
              >
                {enviando ? "Gerando Pix…" : `Gerar Pix de ${adesao || mensal}`}
              </button>
              <p className="text-[13px] leading-snug text-verde-escuro/60">
                {adesao
                  ? "São dois Pix: primeiro a adesão, depois a 1ª mensalidade. As próximas chegam no seu e-mail a cada 30 dias. "
                  : "As próximas mensalidades chegam no seu e-mail a cada 30 dias. "}
                Pagamento processado pela SyncPay.
              </p>
            </form>
          )}

          {etapa.tipo === "gerando" && (
            <p className="mt-7 text-[15px] text-verde-escuro/75" aria-live="polite">
              Adesão confirmada. Gerando o Pix da 1ª mensalidade…
            </p>
          )}

          {etapa.tipo === "pix" && (
            <div className="mt-7 grid justify-items-center gap-5 text-center">
              {adesao && (
                <p className="text-[14px] font-semibold text-verde">
                  {etapa.fase === "adesao" ? `Etapa 1 de 2 · adesão de ${adesao}` : `Etapa 2 de 2 · 1ª mensalidade de ${mensal}`}
                </p>
              )}
              {etapa.automatico && (
                <p className="text-[14px] leading-snug text-verde-escuro/75">
                  Escaneie no app do banco para autorizar o Pix Automático: as mensalidades passam a ser debitadas sozinhas.
                </p>
              )}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={etapa.qr} alt="QR Code do Pix" width={240} height={240} className="rounded-lg bg-white p-2" />
              <div className="w-full">
                <p className="text-[14px] text-verde-escuro/70">Ou use o Pix copia e cola:</p>
                <p className="mt-2 max-h-20 overflow-y-auto break-all rounded-lg border border-verde-escuro/15 bg-white/60 p-3 text-left font-mono text-[12px]">
                  {etapa.copiaECola}
                </p>
                <button
                  type="button"
                  onClick={() => copiar(etapa.copiaECola)}
                  className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-full bg-verde text-[15px] font-semibold text-creme hover:bg-verde-escuro"
                >
                  {copiado ? "Copiado!" : "Copiar código"}
                </button>
              </div>
              <p className="flex items-center gap-2 text-[14px] text-verde-escuro/70" aria-live="polite">
                <span className="h-2 w-2 animate-pulse rounded-full bg-verde motion-reduce:animate-none" aria-hidden="true" />
                Aguardando o pagamento…
              </p>
            </div>
          )}

          {etapa.tipo === "pago" && (
            <div className="mt-7" aria-live="polite">
              <p className="font-display text-[1.4rem] font-semibold">Assinatura ativa.</p>
              <p className="mt-2 text-[15px] leading-relaxed text-verde-escuro/75">
                Entramos em contato pelo WhatsApp informado para começar. As próximas mensalidades chegam no seu e-mail, e
                você acompanha tudo na <a href="/entrar" className="link-verde">área do cliente</a>.
              </p>
            </div>
          )}

          {etapa.tipo === "falhou" && (
            <div className="mt-7" aria-live="polite">
              <p className="font-display text-[1.4rem] font-semibold">Esse Pix não foi concluído.</p>
              <p className="mt-2 text-[15px] leading-relaxed text-verde-escuro/75">Ele expirou ou foi cancelado.</p>
              <button
                type="button"
                onClick={() => setEtapa({ tipo: "dados" })}
                className="mt-5 inline-flex h-11 items-center rounded-full bg-verde px-6 text-[15px] font-semibold text-creme hover:bg-verde-escuro"
              >
                Gerar outro
              </button>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}

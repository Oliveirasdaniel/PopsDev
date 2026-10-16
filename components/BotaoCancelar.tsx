"use client";

/** Cancelar é irreversível na SyncPay: pede confirmação antes de enviar. */
export default function BotaoCancelar({ token }: { token: string }) {
  return (
    <form
      action="/api/conta/assinatura"
      method="post"
      onSubmit={(e) => {
        if (!window.confirm("Cancelar a assinatura? Isso não pode ser desfeito: nenhuma nova mensalidade será cobrada.")) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="token" value={token} />
      <input type="hidden" name="acao" value="cancelar" />
      <button className="text-[15px] font-medium text-verde-escuro/70 underline underline-offset-4 hover:text-red-700">
        Cancelar assinatura
      </button>
    </form>
  );
}

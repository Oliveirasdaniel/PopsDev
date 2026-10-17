"use client";

/** Excluir a conta também cancela as assinaturas: pede confirmação antes. */
export default function BotaoExcluirConta() {
  return (
    <form
      action="/api/conta/excluir"
      method="post"
      onSubmit={(e) => {
        if (
          !window.confirm(
            "Excluir sua conta? As assinaturas abertas serão canceladas e seus dados apagados do nosso banco. Isso não pode ser desfeito.",
          )
        ) {
          e.preventDefault();
        }
      }}
    >
      <button className="text-[15px] font-medium text-verde-escuro/70 underline underline-offset-4 hover:text-red-700">
        Excluir minha conta e meus dados
      </button>
    </form>
  );
}

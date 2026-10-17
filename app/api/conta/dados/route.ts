import { NextResponse } from "next/server";
import { dadosDoCliente } from "@/lib/db";
import { clienteLogado } from "@/lib/sessao";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

/** Direito de acesso e portabilidade (LGPD, art. 18): baixa tudo o que temos do cliente. */
export async function GET(req: Request) {
  const cliente = await clienteLogado();
  if (!cliente) return NextResponse.redirect(new URL("/entrar", req.url), 303);

  const dados = {
    gerado_em: new Date().toISOString(),
    controlador: { nome: site.nome, contato: site.email },
    ...(await dadosDoCliente(cliente.id)),
    observacao:
      "O CPF e o histórico de pagamentos ficam com a SyncPay, processadora dos pagamentos. Para recebê-los, escreva para o contato acima.",
  };

  return new NextResponse(JSON.stringify(dados, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": 'attachment; filename="meus-dados-popsdev.json"',
    },
  });
}

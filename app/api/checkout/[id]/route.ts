import { NextResponse } from "next/server";
import { atualizarAssinatura, bancoConfigurado } from "@/lib/db";
import {
  consultarAssinatura,
  consultarTransacao,
  situacao,
  situacaoAssinatura,
  syncpayConfigurada,
} from "@/lib/syncpay";

export const dynamic = "force-dynamic";

/**
 * O checkout pergunta aqui, de tempos em tempos, se o Pix já caiu.
 * `?tipo=assinatura` consulta a assinatura (1ª mensalidade); sem ele,
 * o Pix único (adesão). Devolve só a situação, nada dos dados do pagador.
 */
export async function GET(req: Request, { params }: { params: { id: string } }) {
  if (!syncpayConfigurada()) return NextResponse.json({ erro: "Indisponível." }, { status: 503 });
  if (!/^[\w-]{8,64}$/.test(params.id)) return NextResponse.json({ erro: "ID inválido." }, { status: 400 });

  try {
    if (new URL(req.url).searchParams.get("tipo") === "assinatura") {
      const a = await consultarAssinatura(params.id);
      if (bancoConfigurado() && a?.data?.status) {
        await atualizarAssinatura(params.id, a.data.status, a.data.next_charge_at).catch(() => {});
      }
      return NextResponse.json({ situacao: situacaoAssinatura(a?.data?.status) });
    }
    const t = await consultarTransacao(params.id);
    return NextResponse.json({ situacao: situacao(t?.data?.status) });
  } catch {
    // Falha momentânea na consulta não é falha no pagamento.
    return NextResponse.json({ situacao: "pendente" });
  }
}

import { NextResponse } from "next/server";
import { consultarTransacao, situacao, syncpayConfigurada } from "@/lib/syncpay";

export const dynamic = "force-dynamic";

/**
 * O checkout pergunta aqui, de tempos em tempos, se o Pix já caiu.
 * Devolve só a situação, nada dos dados do pagador.
 */
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  if (!syncpayConfigurada()) return NextResponse.json({ erro: "Indisponível." }, { status: 503 });
  if (!/^[\w-]{8,64}$/.test(params.id)) return NextResponse.json({ erro: "ID inválido." }, { status: 400 });

  try {
    const t = await consultarTransacao(params.id);
    return NextResponse.json({ situacao: situacao(t?.data?.status) });
  } catch {
    // Falha momentânea na consulta não é falha no pagamento.
    return NextResponse.json({ situacao: "pendente" });
  }
}

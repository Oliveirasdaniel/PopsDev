// Testes das ofertas "site estático" e "cardápio" e do isolamento do checkout dos demais planos.
// Rodar: npm test  (transpila lib/planos.ts com o typescript do projeto; sem cobranças, sem rede).
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";

const fonte = readFileSync(new URL("../lib/planos.ts", import.meta.url), "utf8");
const js = ts.transpileModule(fonte, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } }).outputText;
const { buscarPlano, temCheckoutOnline, reais } = await import(`data:text/javascript;base64,${Buffer.from(js).toString("base64")}`);

const nbsp = (s) => s.replace(/\s/g, " "); // toLocaleString usa espaço inseparável após "R$".
const adicional = (plano, id) => buscarPlano(plano).oferta.adicionais.find((a) => a.id === id);
const texto = (itens) => itens.join(" ").toLowerCase();

test("site estático: R$ 300 único + alterações ilimitadas R$ 70/mês opcional", () => {
  const { oferta } = buscarPlano("site");
  assert.equal(oferta.unico, 30000);
  assert.deepEqual(oferta.adicionais.map((a) => [a.id, a.mensal]), [["alteracoes", 7000]]);
  assert.equal(nbsp(reais(oferta.unico)), "R$ 300");
  assert.equal(nbsp(reais(adicional("site", "alteracoes").mensal)), "R$ 70");
});

test("cardápio: R$ 300 único, alterações R$ 70/mês e delivery +R$ 120/mês, ambos opcionais", () => {
  const { oferta } = buscarPlano("delivery");
  assert.equal(oferta.unico, 30000);
  assert.deepEqual(oferta.adicionais.map((a) => [a.id, a.mensal]), [["alteracoes", 7000], ["delivery", 12000]]);
  assert.equal(nbsp(reais(adicional("delivery", "delivery").mensal)), "R$ 120");
});

test("adicionais são independentes: R$ 70 não é obrigatório nem somado ao delivery", () => {
  const { oferta } = buscarPlano("delivery");
  // O delivery custa exatamente R$ 120, não 70 + 120.
  assert.equal(adicional("delivery", "delivery").mensal, 12000);
  // Nenhuma das ofertas tem adesão ou mensalidade obrigatória.
  for (const id of ["site", "delivery"]) assert.equal(buscarPlano(id).preco, undefined);
  // Adicionais não declaram requisito nem soma com outro.
  for (const a of oferta.adicionais) assert.deepEqual(Object.keys(a).sort(), ["id", "inclui", "mensal", "nome"]);
});

test("recursos de delivery não aparecem como inclusos no cardápio básico", () => {
  const basico = buscarPlano("delivery");
  const incluso = texto([basico.resumo.replace(/delivery é um adicional à parte\./i, ""), ...basico.inclui]);
  for (const termo of ["delivery", "taxa de entrega", "bairro", "comissão", "entrega", "pedido"]) {
    assert.ok(!incluso.includes(termo), `"${termo}" não deve estar no cardápio básico`);
  }
  // Esses recursos pertencem ao adicional de delivery.
  const doAdicional = texto(adicional("delivery", "delivery").inclui);
  assert.ok(doAdicional.includes("taxa de entrega por bairro"));
  assert.ok(doAdicional.includes("sem comissão"));
});

test("textos do site estático não prometem assinatura, suporte antigo nem preço antigo", () => {
  const site = buscarPlano("site");
  const t = texto([site.titulo, site.resumo, ...site.inclui]);
  assert.ok(!t.includes("assinatura"));
  assert.ok(!t.includes("suporte"));
  assert.ok(!t.includes("manutenção"));
  assert.ok(!t.includes("r$ 80"));
  assert.ok(!t.includes("alterações ilimitadas"), "alterações são adicional, não inclusas");
});

test("título do site estático é só 'Site estático', sem suporte", () => {
  assert.equal(buscarPlano("site").titulo, "Site estático");
});

test("o básico do cardápio e do site não inclui manutenção nem suporte", () => {
  for (const id of ["site", "delivery"]) {
    const p = buscarPlano(id);
    const t = texto([p.titulo, p.resumo, ...p.inclui]);
    assert.ok(!t.includes("manutenção"), `${id}: manutenção não é do básico`);
    assert.ok(!t.includes("suporte"), `${id}: suporte não é do básico`);
  }
});

test("mensagem do WhatsApp não presume contratação dos adicionais", () => {
  const vitrine = readFileSync(new URL("../components/Planos.tsx", import.meta.url), "utf8");
  assert.match(vitrine, /Os adicionais são opcionais e não entram nesta contratação/);
  assert.ok(!vitrine.includes("que escolho à parte"), "texto antigo removido");
});

test("site e cardápio não têm checkout online; agendamento mantém", () => {
  assert.equal(temCheckoutOnline(buscarPlano("site")), false);
  assert.equal(temCheckoutOnline(buscarPlano("delivery")), false);
  assert.equal(temCheckoutOnline(buscarPlano("inexistente")), false);
  assert.deepEqual(buscarPlano("agendamento").preco, { adesao: 20000, mensal: 12000 });
  assert.equal(temCheckoutOnline(buscarPlano("agendamento")), true);
});

test("a rota de checkout recusa site e cardápio antes de qualquer cobrança", () => {
  const rota = readFileSync(new URL("../app/api/checkout/route.ts", import.meta.url), "utf8");
  const guarda = rota.indexOf("if (!temCheckoutOnline(plano))");
  assert.ok(guarda > 0);
  assert.ok(guarda < rota.indexOf("cobrarAdesao(plano"), "a recusa vem antes de gerar Pix");
  assert.ok(guarda < rota.indexOf("abrirAssinatura(plano"), "a recusa vem antes da assinatura");
});

test("a vitrine só usa o Checkout em planos com checkout online", () => {
  const vitrine = readFileSync(new URL("../components/Planos.tsx", import.meta.url), "utf8");
  assert.match(vitrine, /checkout && temCheckoutOnline\(p\)/);
});

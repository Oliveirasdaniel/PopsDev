// Núcleo de pixel art da logo: grade, engrenagem, contorno, extrusão e SVG.

export const grade = (largura, altura, valor = 0) =>
  Array.from({ length: altura }, () => Array(largura).fill(valor));

export const deTexto = (linhas) => linhas.map((l) => [...l].map((ch) => (ch === "#" ? 1 : 0)));

export const ascii = (g) => g.map((l) => l.map((v) => (v ? "#" : ".")).join("")).join("\n");

/**
 * Engrenagem em aro, 17x17: corpo redondo com furo grande, 4 dentes 3x2 nos
 * eixos e 4 dentes diagonais em bloco, ligados ao aro por um pixel.
 *
 * Por que aro e não disco: em 17px a engrenagem maciça lia como sol. O furo
 * grande é o que faz ler "engrenagem" até em 16px de favicon — e é nele que
 * entra o eixo quadrado de andesito, a assinatura do Create.
 */
export function engrenagem() {
  const n = 17;
  const c = 8;
  const g = grade(n, n);
  const pix = (dx, dy) => {
    const x = c + dx;
    const y = c + dy;
    if (x >= 0 && x < n && y >= 0 && y < n) g[y][x] = 1;
  };
  for (let dy = -c; dy <= c; dy++)
    for (let dx = -c; dx <= c; dx++) {
      const d = Math.hypot(dx, dy);
      if (d <= 6.3 && d >= 3.6) pix(dx, dy);
    }
  for (let t = -1; t <= 1; t++)
    for (const r of [7, 8]) {
      pix(t, -r);
      pix(t, r);
      pix(-r, t);
      pix(r, t);
    }
  for (const sx of [-1, 1])
    for (const sy of [-1, 1])
      for (const [dx, dy] of [[5, 5], [6, 5], [5, 6], [6, 6], [5, 4]]) pix(sx * dx, sy * dy);
  return g;
}

const VIZINHOS_8 = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];

/** Contorno de 1px (vizinhança 8) em volta de tudo que tem cor. */
export function contornar(cores, cor) {
  const saida = cores.map((linha) => [...linha]);
  for (let y = 0; y < cores.length; y++)
    for (let x = 0; x < cores[0].length; x++) {
      if (cores[y][x]) continue;
      if (VIZINHOS_8.some(([dx, dy]) => cores[y + dy]?.[x + dx])) saida[y][x] = cor;
    }
  return saida;
}

/** Extrusão para baixo. Vem ANTES do contorno — depois dele, a sombra fica
 *  separada da letra por uma linha escura e parece flutuar. */
export function extrudar(cores, passos, cor) {
  const saida = cores.map((linha) => [...linha]);
  for (let p = 1; p <= passos; p++)
    for (let y = cores.length - 1; y >= 0; y--)
      for (let x = 0; x < cores[0].length; x++)
        if (cores[y][x] && y + p < cores.length && !saida[y + p][x]) saida[y + p][x] = cor;
  return saida;
}

/** SVG com um trecho por sequência horizontal da mesma cor. `crispEdges`
 *  impede o navegador de suavizar os pixels ao escalar. */
export function svg(cores) {
  const altura = cores.length;
  const largura = cores[0].length;
  const porCor = new Map();
  for (let y = 0; y < altura; y++) {
    let x = 0;
    while (x < largura) {
      const cor = cores[y][x];
      if (!cor) {
        x++;
        continue;
      }
      let fim = x;
      while (fim + 1 < largura && cores[y][fim + 1] === cor) fim++;
      if (!porCor.has(cor)) porCor.set(cor, []);
      porCor.get(cor).push(`M${x} ${y}h${fim - x + 1}v1h${-(fim - x + 1)}z`);
      x = fim + 1;
    }
  }
  const caminhos = [...porCor].map(([cor, ds]) => `<path fill="${cor}" d="${ds.join("")}"/>`).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${largura} ${altura}" width="${largura}" height="${altura}" shape-rendering="crispEdges">${caminhos}</svg>\n`;
}

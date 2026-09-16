// Gera a logo da Popsdev em pixel art.
//
//   node scripts/logo/gerar.mjs
//
// Saída: public/logo/letreiro.svg, public/logo/marca.svg e app/icon.svg.
// Desenho original inspirado no Create (Minecraft): engrenagem de latão
// com eixo quadrado de andesito no lugar do O. Nada copiado do mod.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { contornar, deTexto, engrenagem, extrudar, grade, svg } from "./pixel.mjs";

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

// As mesmas cores estão no tailwind.config.ts (acento, andesito, contorno).
export const LATAO = { luz: "#ffe38a", meio: "#f0b73c", escuro: "#c27e22", fundo: "#8a5317" };
export const ANDESITO = { luz: "#d5d8d3", meio: "#a3a7a2", escuro: "#6f7470", fundo: "#474b48" };
export const CONTORNO = "#24170b";

// Letras 9 de altura, traço de 2px. O V tem 7 de largura: com 6 ele só
// afinava nas últimas linhas e, no tamanho do cabeçalho, lia como U.
const LETRAS = {
  P: ["#####.", "######", "##..##", "######", "#####.", "##....", "##....", "##....", "##...."],
  S: [".#####", "######", "##....", "#####.", ".#####", "....##", "....##", "######", "#####."],
  D: ["#####.", "######", "##..##", "##..##", "##..##", "##..##", "##..##", "######", "#####."],
  E: ["######", "######", "##....", "#####.", "#####.", "##....", "##....", "######", "######"],
  V: ["##...##", "##...##", "##...##", ".##.##.", ".##.##.", ".##.##.", "..###..", "..###..", "...#..."],
};

/** Pinta a engrenagem com luz de cima-esquerda e o eixo de andesito. */
function pintarEngrenagem() {
  const m = engrenagem();
  const n = m.length;
  const c = (n - 1) / 2;
  const cores = grade(n, n, null);
  const vazio = (x, y) => !m[y]?.[x];

  for (let y = 0; y < n; y++)
    for (let x = 0; x < n; x++) {
      if (!m[y][x]) continue;
      // Soma das direções que dão para fora: negativa = face iluminada.
      const lado = (vazio(x - 1, y) ? -1 : 0) + (vazio(x + 1, y) ? 1 : 0) + (vazio(x, y - 1) ? -1 : 0) + (vazio(x, y + 1) ? 1 : 0);
      cores[y][x] = lado < 0 ? LATAO.luz : lado > 0 ? LATAO.escuro : LATAO.meio;
    }

  // Eixo quadrado 5x5: moldura escura e miolo 3x3 sombreado.
  for (let y = c - 2; y <= c + 2; y++) for (let x = c - 2; x <= c + 2; x++) cores[y][x] = ANDESITO.fundo;
  const miolo = [
    [ANDESITO.luz, ANDESITO.luz, ANDESITO.meio],
    [ANDESITO.luz, ANDESITO.meio, ANDESITO.escuro],
    [ANDESITO.meio, ANDESITO.escuro, ANDESITO.escuro],
  ];
  miolo.forEach((linha, dy) => linha.forEach((cor, dx) => (cores[c - 1 + dy][c - 1 + dx] = cor)));
  return cores;
}

function letreiro() {
  const gear = pintarEngrenagem();
  const N = gear.length;
  const ordem = ["P", "O", "P", "S", "D", "E", "V"];
  const larguras = ordem.map((ch) => (ch === "O" ? N : LETRAS[ch][0].length));
  const margem = 1;
  const extrusao = 2;
  const largura = larguras.reduce((s, w) => s + w, 0) + (ordem.length - 1) + margem * 2;
  const altura = margem + N + margem + extrusao;
  // Letras têm 9 linhas; a engrenagem, 17. Centralizada, sobra 4 em cima e 4 embaixo.
  const topoLetra = margem + 4;
  // Faixas horizontais: topo claro, base escura — luz de cima.
  const faixa = [LATAO.luz, LATAO.luz, LATAO.meio, LATAO.meio, LATAO.meio, LATAO.meio, LATAO.escuro, LATAO.escuro, LATAO.fundo];

  let cores = grade(largura, altura, null);
  let x = margem;
  ordem.forEach((ch, i) => {
    if (ch === "O") {
      gear.forEach((linha, dy) => linha.forEach((cor, dx) => cor && (cores[margem + dy][x + dx] = cor)));
    } else {
      deTexto(LETRAS[ch]).forEach((linha, dy) =>
        linha.forEach((on, dx) => on && (cores[topoLetra + dy][x + dx] = faixa[dy])),
      );
    }
    x += larguras[i] + 1;
  });

  cores = extrudar(cores, extrusao, LATAO.fundo);
  return contornar(cores, CONTORNO);
}

function marca() {
  const gear = pintarEngrenagem();
  const cores = grade(gear.length + 2, gear.length + 2, null);
  gear.forEach((linha, dy) => linha.forEach((cor, dx) => cor && (cores[1 + dy][1 + dx] = cor)));
  return contornar(cores, CONTORNO);
}

const saidas = {
  "public/logo/letreiro.svg": letreiro(),
  "public/logo/marca.svg": marca(),
  "app/icon.svg": marca(),
};

for (const [caminho, cores] of Object.entries(saidas)) {
  const destino = join(RAIZ, caminho);
  mkdirSync(dirname(destino), { recursive: true });
  writeFileSync(destino, svg(cores));
  console.log(`${caminho}  ${cores[0].length}x${cores.length}`);
}

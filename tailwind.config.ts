import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Paleta nova: dois verdes e um creme puxado pro caramelo. Sem
        // gradiente e sem cor saturada; o contraste vem do verde escuro.
        verde: {
          // Verde meio escuro: faixas, botões, texto de destaque.
          DEFAULT: "#2f4b3c",
          // Texto sobre creme e o véu por cima das fotos.
          escuro: "#1c2e25",
          // Verde clarinho: fundos suaves e destaque sobre verde.
          claro: "#c9dcb5",
        },
        creme: {
          // Off-white acaramelado: o fundo do site.
          DEFAULT: "#f2e9d8",
          // Um tom abaixo, para linhas e superfícies sobre o creme.
          escuro: "#e3d5bb",
        },

        // As cores continuam saindo da logo em pixel art
        // (scripts/logo/gerar.mjs) — mudou lá, muda aqui. O que mudou foi
        // o uso: o latão virou acento fino sobre tinta e pedra, em vez de
        // pintar faixas inteiras.

        // O contorno da logo. Faixas escuras (topo, processo, rodapé) e
        // todo o texto sobre fundo claro.
        tinta: {
          DEFAULT: "#24170b",
          // Superfície levantada sobre a faixa escura.
          2: "#302114",
        },
        latao: {
          DEFAULT: "#f0b73c",
          claro: "#ffe38a",
          escuro: "#c27e22",
          // Latão para TEXTO sobre fundo claro: o DEFAULT não passa de
          // 2:1 sobre pedra, este passa de 5:1.
          texto: "#8a5317",
        },
        // Andesito clareado: o fundo das seções claras.
        pedra: {
          DEFAULT: "#eceeea",
          linha: "#d5d8d3",
        },
        andesito: {
          DEFAULT: "#a3a7a2",
          // Texto secundário sobre pedra e papel (5,4:1 sobre pedra).
          escuro: "#5c615d",
        },
        papel: "#fbfbf9",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
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
      },
      keyframes: {
        // Troca de pergunta no briefing: mostra que a resposta registrou.
        troca: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // A engrenagem do desenho engata: avança um dente (45°) e para.
        engatar: {
          "0%": { transform: "rotate(-45deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
      animation: {
        troca: "troca .3s cubic-bezier(.22,1,.36,1) both",
        engatar: "engatar 1.6s cubic-bezier(.2,1.1,.3,1) .2s both",
      },
    },
  },
  plugins: [],
};

export default config;

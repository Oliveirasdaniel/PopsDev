import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Cinzas neutros, sem tingimento verde.
        // Preto levemente aquecido, para casar com o bone do texto.
        // Nao e preto puro: #0a0a0a fechava demais e achatava os fios.
        base: {
          950: "#141413",
          900: "#1b1b19",
          850: "#222220",
          800: "#2a2926",
        },
        line: "rgba(255,255,255,.11)",
        bone: "#ece9e2",
        muted: "#8b8b85",

        // Identidade Popsdev x Create. As cores saem da logo em pixel art
        // (scripts/logo/gerar.mjs) — mudou lá, muda aqui.
        //
        // `acento` tem nome de FUNÇÃO, não de cor: trocar a paleta não
        // obriga a renomear classe em nenhum componente.
        acento: {
          DEFAULT: "#f0b73c", // latão
          claro: "#ffe38a",
          escuro: "#c27e22",
          fundo: "#8a5317",
        },
        andesito: {
          claro: "#d5d8d3",
          DEFAULT: "#a3a7a2",
          escuro: "#6f7470",
          fundo: "#474b48",
        },
        contorno: "#24170b",

        // Paleta "sticker": usada SÓ nas amostras de habilidade e em
        // detalhes decorativos. O site continua com um acento só — estas
        // existem para provar repertório, não para virar tema.
        sticker: {
          azul: "#4da2ff",
          menta: "#55db9c",
          lavanda: "#e9ccff",
          brasa: "#fb4903",
          sol: "#ffd731",
          violeta: "#5c4ade",
          papel: "#f4f1ea",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        // Rótulos, menu e números. Desenhada numa grade de 10px: fica nítida
        // em 20px (2x). Em tamanho quebrado, os pixels borram.
        pixel: ["var(--font-pixel)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        rise: "rise .55s cubic-bezier(.22,1,.36,1) both",
        marquee: "marquee 42s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;

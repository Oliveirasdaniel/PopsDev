import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Estilo "álbum de adesivos": papel claro, faixas pastel e tudo
        // recortado com o contorno da logo. As cores continuam saindo da
        // logo em pixel art (scripts/logo/gerar.mjs) — mudou lá, muda aqui.

        // Texto, contorno de tudo e botão principal. É o contorno da logo:
        // o mesmo fio que recorta a engrenagem recorta cada adesivo.
        tinta: "#24170b",
        papel: "#ffffff",

        // Faixas de seção, alternadas ao longo da rolagem.
        faixa: {
          latao: "#ffefb8",
          andesito: "#d5d8d3",
        },

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
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        // Letreiro do marquee e números miúdos. Desenhada numa grade de
        // 10px: fica nítida em 20px (2x). Em tamanho quebrado, os pixels borram.
        pixel: ["var(--font-pixel)", "ui-monospace", "monospace"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        // Adesivo sendo colado: chega maior e torto, assenta no lugar.
        colar: {
          "0%": { opacity: "0", transform: "rotate(calc(var(--giro, 0deg) + 14deg)) scale(1.35)" },
          "70%": { opacity: "1", transform: "rotate(calc(var(--giro, 0deg) - 2deg)) scale(.96)" },
          "100%": { opacity: "1", transform: "rotate(var(--giro, 0deg)) scale(1)" },
        },
        // Troca de pergunta no briefing: mostra que a resposta registrou.
        troca: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // A engrenagem do letreiro engata: um dente (45°) e para.
        engatar: {
          "0%": { transform: "rotate(-45deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
      animation: {
        marquee: "marquee 42s linear infinite",
        colar: "colar .5s cubic-bezier(.3,1.3,.5,1) both",
        troca: "troca .3s cubic-bezier(.22,1,.36,1) both",
        engatar: "engatar 1.1s cubic-bezier(.2,1.25,.4,1) .15s both",
      },
    },
  },
  plugins: [],
};

export default config;

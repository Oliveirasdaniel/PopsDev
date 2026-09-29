import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Identidade laranja + marinho + amarelo, tirada das artes da
        // Popsdev para redes sociais (cores medidas em pixel, não no olho).
        // Lá o marinho é texto e faixa; aqui vira o fundo do site, e o
        // laranja fica como acento — laranja chapado em página inteira
        // cansaria a leitura.
        base: {
          950: "#0b1b4d", // o marinho exato da arte
          900: "#0f2258",
          850: "#142863",
          800: "#192f6f",
        },
        line: "rgba(230,233,242,.13)",
        bone: "#eef0f7",
        muted: "#8b93b2",

        // As cores também saem na logo em pixel art (scripts/logo/gerar.mjs)
        // — mudou lá, muda aqui.
        //
        // `acento`, `destaque` e `neutro` têm nome de FUNÇÃO, não de cor:
        // trocar a paleta não obriga a renomear classe em nenhum componente.
        acento: {
          DEFAULT: "#ff4f12", // laranja: a cor da marca
          claro: "#ff916b",
          escuro: "#d13d0a",
          fundo: "#8f2a06",
        },
        // Amarelo: na arte é o botão e a seta do "conclua o formulário".
        // Aqui faz o mesmo papel — ação principal e grifo.
        destaque: {
          DEFAULT: "#ffd60a",
          claro: "#ffe566",
          escuro: "#d9b000",
          fundo: "#8f7400",
        },
        // Cinzas azulados das janelas da arte, mais um marinho médio para
        // bordas e fundos de peça.
        neutro: {
          claro: "#e6e9f2",
          DEFAULT: "#b9bfd3",
          escuro: "#8b93b2",
          fundo: "#2e3d78",
        },
        contorno: "#050e2e",

        // Paleta "sticker": usada SÓ nas amostras de habilidade e em
        // detalhes decorativos. Existem para provar repertório, não para
        // virar tema.
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

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
        acid: "#a3e635",

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

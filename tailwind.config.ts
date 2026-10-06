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

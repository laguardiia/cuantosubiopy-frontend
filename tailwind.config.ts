import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Paleta "super simple": blanco de fondo, rojo de precio/oferta,
        // negro/gris para texto, verde solo como contraste funcional
        // para "bajó" (el rojo queda reservado para marca + "subió").
        rojo: "#E4032E",
        rojoOscuro: "#B0021F",
        tinta: "#1A1A1A",
        gris: "#6B7280",
        grisClaro: "#F3F4F6",
        bajo: "#1E8E4F",
      },
      fontFamily: {
        display: ["'Archivo Black'", "sans-serif"],
        cuerpo: ["'Inter'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

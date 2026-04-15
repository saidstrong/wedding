import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#f8f3ec",
        ivory: "#fcfaf6",
        gold: "#b89a5e",
        sand: "#dccdb7",
        charcoal: "#2e2a26",
        taupe: "#6f675e",
      },
      fontFamily: {
        display: [
          "Iowan Old Style",
          "Palatino Linotype",
          "Book Antiqua",
          "Georgia",
          "serif",
        ],
        sans: [
          "Segoe UI",
          "Inter",
          "Arial",
          "system-ui",
          "sans-serif",
        ],
      },
      boxShadow: {
        invitation: "0 24px 60px rgba(61, 47, 26, 0.08)",
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(circle at top, rgba(255,255,255,0.95), rgba(255,255,255,0) 40%)",
      },
    },
  },
  plugins: [],
};

export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-serif)", "serif"], // Connects to the font we added in layout.tsx
        sans: ["var(--font-sans)", "sans-serif"], 
      },
      colors: {
        'luxury-black': '#050505', // The Rolex dark background
        'luxury-gray': '#1a1a1a',  
      }
    },
  },
  plugins: [],
};
export default config;
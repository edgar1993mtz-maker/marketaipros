/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blackSoft: "#0A0A0A",
        blackDeep: "#050505",
        gold: "#D4AF37",
        goldLight: "#F5E6B3",
      },
      boxShadow: {
        gold: "0 0 20px rgba(212, 175, 55, 0.15)",
      },
    },
  },
  plugins: [],
}

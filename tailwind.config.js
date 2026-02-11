module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        gold: "#D4AF37",
        goldLight: "#f5d98c",
        goldDark: "#8c6f1d",
        blackDeep: "#000000",
        blackSoft: "#0a0a0a",
        graySoft: "#1a1a1a",

        // ⭐ THIS LINE FIXES YOUR ENTIRE BACKGROUND ISSUE
        dark: "#000000",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"]
      },
      boxShadow: {
        gold: "0 0 20px rgba(212, 175, 55, 0.4)"
      }
    }
  },
  plugins: []
}

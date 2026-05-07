/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#C9A227",
        "background-light": "#F8F5F0",
        "background-dark": "#0f172a",
        accent: "#1e293b",
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        serif: ["Cinzel", "serif"],
        garamond: ["Cormorant Garamond", "serif"],
        sans: ["Inter", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      animation: {
        "slow-pan": "pan 20s ease-in-out infinite alternate",
        float: "float 6s ease-in-out infinite",
        "fade-in-up": "fadeInUp 1s ease-out forwards",
      },
      keyframes: {
        pan: {
          "0%": { transform: "scale(1.0) translate(0, 0)" },
          "100%": { transform: "scale(1.05) translate(-1%, -1%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
}

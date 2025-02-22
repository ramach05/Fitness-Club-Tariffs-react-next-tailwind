/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#0f0f0f",
        "dark-card": "#1a1a1a",
        accent: "#f97316",
        "accent-green": "#22c55e",
        "header-green": "#166534",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        pulseBtn: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.03)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        blink: "blink 1s ease-in-out infinite",
        "pulse-btn": "pulseBtn 1.5s ease-in-out infinite",
        "fade-in": "fadeIn 0.3s ease-out forwards",
      },
    },
  },
  plugins: [],
};

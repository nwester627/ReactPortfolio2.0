/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      lavender: "#7c3aed",
      "lavender-light": "#9747FF",
      space: "#051622",
      "light-gray": "#d1d5db",
      white: "#FFFFFF",
      black: "#000000",
      "blackish-blue": "#191e28",
      gray: "#373b3c",
      // Light theme colors (all meet WCAG 2.1 AA standards)
      "light-bg": "#EDF1F8",
      "light-surface": "#F2F6FC",
      "light-primary": "#7C3AED",
      "light-text": "#334155",
      "light-secondary": "#64748B",
      "light-accent": "#E6EAF5",
      "light-container": "#F8FAFD",
    },
    fontFamily: {
      // Primary rounded sans stack (Nunito + fallback Poppins)
      sans: ["var(--font-rounded)", "Poppins", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1800px",
      "4xl": "1801px",
    },
    extend: {
      colors: {
        icon: {
          js: "#F7DF1E",
          ts: "#3178C6",
          react: "#61DAFB",
          php: "#777BB4",
          laravel: "#FF2D20",
          html: "#E34F26",
          css: "#1572B6",
          python: "#3776AB",
          mysql: "#00618A",
          tailwind: "#38BDF8",
        },
      },
      transitionDuration: {
        800: "800ms",
        900: "900ms",
        1000: "1000ms",
        1200: "1200ms",
        1500: "1500ms",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
        "extra-smooth": "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      animation: {
        typewriter: "typewriter 1s steps(10) infinite",
        gradient: "gradient 5s ease infinite",
      },
      keyframes: {
        typewriter: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};

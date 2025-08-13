/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      lavender: "#7c3aed", // original accent
      "lavender-light": "#9747FF",
      // Added a darker variant for improved contrast in dark mode text contexts
      "lavender-dark": "#5b2bb0",
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
          node: "#339933",
          aws: "#FF9900",
          docker: "#2496ED",
          github: "#181717",
          jest: "#C21325",
          redux: "#764ABC",
          nextjs: "#000000",
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
        fadeIn: "fadeIn 0.6s ease forwards",
        fadeInUp: "fadeInUp 0.55s cubic-bezier(.25,1,.4,1) forwards",
        fadeOut: "fadeOut 0.45s ease forwards",
        materialize: "materialize 0.8s cubic-bezier(.33,1,.68,1) forwards",
        loaderPulse: "loaderPulse 1.4s ease-in-out infinite",
        pageIn: "pageIn 0.65s cubic-bezier(.33,1,.68,1) forwards",
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
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(12px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(10px) scale(.985)" },
          "60%": { opacity: 1 },
          "100%": { opacity: 1, transform: "translateY(0) scale(1)" },
        },
        fadeOut: {
          "0%": { opacity: 0.7, transform: "translateY(0)" },
          "100%": { opacity: 0, transform: "translateY(-4px)" },
        },
        materialize: {
          "0%": {
            opacity: 0,
            transform: "scale(.92) translateY(8px)",
            filter: "blur(6px)",
          },
          "55%": { opacity: 0.85, filter: "blur(1.5px)" },
          "100%": {
            opacity: 1,
            transform: "scale(1) translateY(0)",
            filter: "blur(0)",
          },
        },
        loaderPulse: {
          "0%, 100%": { opacity: 0.2, transform: "scale(.9)" },
          "50%": { opacity: 0.9, transform: "scale(1)" },
        },
        pageIn: {
          "0%": {
            opacity: 0,
            transform: "translateY(14px) scale(.985)",
            filter: "blur(6px)",
          },
          "60%": { opacity: 0.85, filter: "blur(1.5px)" },
          "100%": {
            opacity: 1,
            transform: "translateY(0) scale(1)",
            filter: "blur(0)",
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};

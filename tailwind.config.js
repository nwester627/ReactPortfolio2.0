/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      lavender: "#7c3aed",
      space: "#051622",
      "light-gray": "#d1d5db",
      white: "#FFFFFF",
      black: "#000000",
      "blackish-blue": "#191e28",
      gray: "#373b3c",
    },
    fontFamily: {
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
  },
  plugins: [require("tailwindcss-animated")],
};

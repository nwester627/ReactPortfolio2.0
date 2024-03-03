/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      teal: "#1ba098",
      space: "#051622",
      rose: "#deb992",
      white: "#FFFFFF",
      black: "#000000",
      "blackish-blue": "#191e28",
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
    extend: {},
  },
  plugins: [require("tailwindcss-animated")],
};

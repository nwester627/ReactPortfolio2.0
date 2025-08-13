import "@/styles/globals.css";
import { Nunito } from "next/font/google";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import ThemeToggle from "@/components/common/ThemeToggle";
import { useState, useEffect } from "react";

const rounded = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-rounded",
  display: "swap",
});

function AppContent({ Component, pageProps }) {
  const { isDarkMode } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Attach font variable class to body so portal-rendered content inherits Nunito.
  useEffect(() => {
    document.body.classList.add(rounded.variable);
    return () => document.body.classList.remove(rounded.variable);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={`min-h-screen transition-all duration-1200 ease-extra-smooth font-sans ${
        isDarkMode
          ? "bg-gradient-to-b from-blackish-blue via-space to-blackish-blue text-light-gray"
          : "bg-gradient-to-b from-light-bg via-light-accent to-light-container text-light-text"
      }`}
    >
      <ThemeToggle />
      <Component {...pageProps} />
    </div>
  );
}

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <AppContent Component={Component} pageProps={pageProps} />
    </ThemeProvider>
  );
}

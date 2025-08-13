import "@/styles/globals.css";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import ThemeToggle from "@/components/common/ThemeToggle";
import { useState, useEffect } from "react";

function AppContent({ Component, pageProps }) {
  const { isDarkMode } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={`min-h-screen transition-all duration-1200 ease-extra-smooth ${
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

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isToggling, setIsToggling] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return setIsDarkMode(savedTheme === "dark");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDarkMode(prefersDark);
  }, []);

  // Keep the HTML `dark` class in sync for Tailwind's `dark:` utilities
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", isDarkMode);
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsToggling(true);
    // Temporarily disable CSS transitions across the page to avoid
    // rendering artifacts (blurry/doubled text) that can occur when many
    // properties change during the theme swap. The class is removed shortly
    // after toggling.
    // if (typeof document !== "undefined") {
    //   document.documentElement.classList.add("disable-transitions");
    //   document.body.classList.add("disable-transitions");
    // }

    setIsDarkMode((prev) => {
      const next = !prev;
      if (typeof window !== "undefined" && window.localStorage) {
        try {
          localStorage.setItem("theme", next ? "dark" : "light");
        } catch (e) {
          void e;
        }
      }
      return next;
    });

    // Remove the disable class after the brief period (match or slightly
    // exceed CSS animation duration used site-wide).
    setTimeout(() => {
      // if (typeof document !== "undefined") {
      //   document.documentElement.classList.remove("disable-transitions");
      //   document.body.classList.remove("disable-transitions");
      // }
      setIsToggling(false);
    }, 200);
  };

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleTheme,
        isToggling,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

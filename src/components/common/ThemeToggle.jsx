import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";
import { Motion, spring } from "react-motion";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme, isToggling } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 300); // Delay entrance by 300ms
    return () => clearTimeout(timer);
  }, []);

  return (
    <button
      onClick={toggleTheme}
      className={`group relative w-28 h-11 rounded-full text-[0.85rem] sm:text-sm font-semibold tracking-tight transition-all duration-700 ease-extra-smooth motion-reduce:transition-none ${
        mounted ? "opacity-100 scale-100" : "opacity-30 scale-90"
      } transition-opacity transition-transform duration-500 ${
        isDarkMode
          ? "bg-lavender hover:bg-lavender-light"
          : "bg-light-primary hover:bg-lavender"
      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lavender`}
      aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
      aria-pressed={isDarkMode}
    >
      <Motion
        defaultStyle={{ x: isDarkMode ? 68 : 0 }}
        style={{
          x: spring(isDarkMode ? 68 : 0, { stiffness: 200, damping: 20 }),
        }}
      >
        {(style) => (
          <div
            className={`absolute top-1 left-1 h-9 w-9 rounded-full bg-white shadow-md flex items-center justify-center will-change-transform transform-gpu motion-reduce:transform-none ${
              isToggling ? "transition-none" : ""
            } group-active:scale-95`}
            style={{ transform: `translateX(${style.x}px)` }}
          >
            {isDarkMode ? (
              <FaMoon className="w-4 h-4 text-lavender transition-colors duration-500" />
            ) : (
              <FaSun className="w-4 h-4 text-light-primary transition-colors duration-500" />
            )}
          </div>
        )}
      </Motion>
      <div className="absolute inset-0 select-none pointer-events-none">
        <span
          aria-hidden={!isDarkMode}
          className={`absolute top-1/2 -translate-y-1/2 left-3 text-xs sm:text-sm font-extrabold tracking-tight text-white/90 transition-opacity transition-transform duration-500 ease-extra-smooth will-change-opacity will-change-transform ${
            isToggling ? "transition-none" : ""
          } ${
            isDarkMode
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-2"
          }`}
          style={{ transitionDelay: isDarkMode ? "180ms" : "0ms" }}
        >
          Dark
        </span>
        <span
          aria-hidden={isDarkMode}
          className={`absolute top-1/2 -translate-y-1/2 right-3 text-xs sm:text-sm font-extrabold tracking-tight text-white/90 text-right transition-opacity transition-transform duration-500 ease-extra-smooth will-change-opacity will-change-transform ${
            isToggling ? "transition-none" : ""
          } ${
            !isDarkMode
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-2"
          }`}
          style={{ transitionDelay: !isDarkMode ? "180ms" : "0ms" }}
        >
          Light
        </span>
      </div>
    </button>
  );
}

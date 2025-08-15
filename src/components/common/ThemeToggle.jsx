import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className={`group relative w-28 h-11 rounded-full text-[0.85rem] sm:text-sm font-semibold tracking-tight transition-colors duration-700 ease-extra-smooth motion-reduce:transition-none backdrop-blur-sm ${
        isDarkMode
          ? "bg-lavender hover:bg-lavender-light"
          : "bg-light-primary hover:bg-lavender"
      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lavender`}
      aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
      aria-pressed={isDarkMode}
    >
      <div
        className={`absolute top-1 left-1 h-9 w-9 rounded-full bg-white shadow-md flex items-center justify-center will-change-transform transform-gpu transition-transform motion-safe:duration-900 motion-safe:ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none motion-reduce:transform-none ${
          isDarkMode ? "translate-x-[68px]" : "translate-x-0"
        } group-active:scale-95`}
      >
        {isDarkMode ? (
          <FaMoon className="w-4 h-4 text-lavender transition-colors duration-500" />
        ) : (
          <FaSun className="w-4 h-4 text-light-primary transition-colors duration-500" />
        )}
      </div>
      <div className="absolute inset-0 select-none pointer-events-none">
        <span
          aria-hidden={!isDarkMode}
          className={`absolute top-1/2 -translate-y-1/2 left-3 text-xs sm:text-sm font-extrabold tracking-tight text-white/90 transition-opacity transition-transform duration-500 ease-extra-smooth will-change-opacity will-change-transform ${
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

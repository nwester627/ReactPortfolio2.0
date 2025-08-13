import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={toggleTheme}
        className={`group relative w-24 h-10 rounded-full transition-all duration-1000 ease-extra-smooth
          ${
            isDarkMode
              ? "bg-lavender hover:bg-lavender-light"
              : "bg-light-primary hover:bg-lavender"
          }
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lavender`}
        aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
      >
        <div
          className={`absolute top-1 bottom-1 w-8 h-8 my-auto rounded-full
            transform transition-all duration-700 ease-extra-smooth
            ${isDarkMode ? "translate-x-[3.75rem]" : "translate-x-1"}
            bg-white
            shadow-sm
            flex items-center justify-center
            group-active:scale-95`}
        >
          <div className="relative flex items-center justify-center w-full h-full transition-transform duration-300">
            {isDarkMode ? (
              <FaMoon className="w-4 h-4 text-lavender transition-colors duration-500" />
            ) : (
              <FaSun className="w-4 h-4 text-light-primary transition-colors duration-500" />
            )}
          </div>
        </div>

        <div className="absolute inset-0 w-full h-full select-none pointer-events-none overflow-hidden">
          <div
            className={`absolute inset-y-0 left-0 flex items-center
              transition-all duration-700 ease-extra-smooth transform
              ${
                isDarkMode
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-6 opacity-0"
              }`}
          >
            <span className="text-sm font-medium text-white/90 ml-3 whitespace-nowrap transition-transform duration-700">
              Light
            </span>
          </div>
          <div
            className={`absolute inset-y-0 right-0 flex items-center
              transition-all duration-700 ease-extra-smooth transform
              ${
                isDarkMode
                  ? "translate-x-6 opacity-0"
                  : "translate-x-0 opacity-100"
              }`}
          >
            <span className="text-sm font-medium text-white/90 mr-3 whitespace-nowrap transition-transform duration-700">
              Dark
            </span>
          </div>
        </div>
      </button>
    </div>
  );
}

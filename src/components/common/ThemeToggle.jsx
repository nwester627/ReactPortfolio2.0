import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";

/*
  ThemeToggle (refined animation)
  - Smooth knob slide using transform translate instead of switching left/right properties (prevents layout jump)
  - Fades target mode text (shows the mode you will switch TO, like before)
  - Adds motion-safe guards & reduced-motion respect for users with preferences
  - Removes duplicate component file to avoid ambiguity
*/

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  // Distance knob travels: track (w-28=112px) - horizontal padding (2*4px) - knob width (36px) = 68px
  // Tailwind arbitrary value used: translate-x-[68px]
  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={toggleTheme}
        className={`group relative w-28 h-11 rounded-full text-[0.85rem] sm:text-sm font-semibold tracking-tight
          transition-colors duration-500 ease-out
          ${
            isDarkMode
              ? "bg-lavender hover:bg-lavender-light"
              : "bg-light-primary hover:bg-lavender"
          }
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lavender`}
        aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
      >
        {/* Sliding knob */}
        <div
          className={`absolute top-1 left-1 h-9 w-9 rounded-full bg-white shadow-sm flex items-center justify-center
            will-change-transform
            transition-transform motion-safe:duration-700 motion-safe:ease-[cubic-bezier(.65,.05,.36,1)]
            ${isDarkMode ? "translate-x-[68px]" : "translate-x-0"}
            group-active:scale-95`}
        >
          {isDarkMode ? (
            <FaMoon className="w-4 h-4 text-lavender transition-colors duration-500" />
          ) : (
            <FaSun className="w-4 h-4 text-light-primary transition-colors duration-500" />
          )}
        </div>

        {/* Labels layer (target mode indication) */}
        <div className="absolute inset-0 select-none pointer-events-none overflow-hidden">
          {/* Light label (visible when currently dark) */}
          <span
            aria-hidden={!isDarkMode}
            className={`absolute left-3 top-1/2 -translate-y-1/2 text-xs sm:text-sm font-bold tracking-tight text-white/90
                transition-all motion-safe:duration-500 ease-out
                ${
                  isDarkMode
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-2"
                }`}
          >
            Light
          </span>
          {/* Dark label (visible when currently light) */}
          <span
            aria-hidden={isDarkMode}
            className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs sm:text-sm font-bold tracking-tight text-white/90 text-right
                transition-all motion-safe:duration-500 ease-out
                ${
                  isDarkMode
                    ? "opacity-0 translate-x-2"
                    : "opacity-100 translate-x-0"
                }`}
          >
            Dark
          </span>
        </div>
      </button>
    </div>
  );
}

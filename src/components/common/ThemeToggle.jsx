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
          transition-colors duration-500 ease-out motion-reduce:transition-none
          ${
            isDarkMode
              ? "bg-lavender hover:bg-lavender-light"
              : "bg-light-primary hover:bg-lavender"
          }
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lavender`}
        aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
        aria-pressed={isDarkMode}
      >
        {/* Sliding knob */}
        <div
          className={`absolute top-1 left-1 h-9 w-9 rounded-full bg-white shadow-sm flex items-center justify-center
            will-change-transform
            transition-transform motion-safe:duration-800 motion-safe:ease-[cubic-bezier(.65,.05,.36,1)] motion-reduce:transition-none motion-reduce:transform-none
            ${isDarkMode ? "translate-x-[68px]" : "translate-x-0"}
            group-active:scale-95`}
        >
          {isDarkMode ? (
            <FaMoon className="w-4 h-4 text-lavender transition-colors duration-500" />
          ) : (
            <FaSun className="w-4 h-4 text-light-primary transition-colors duration-500" />
          )}
        </div>

        {/* Single dynamic label (shows target mode) to avoid overlap/ghost flicker */}
        <div className="absolute inset-0 select-none pointer-events-none">
          {/* Left label: shows DARK when dark mode active (knob on right) */}
          <span
            aria-hidden={!isDarkMode}
            className={`absolute top-1/2 -translate-y-1/2 left-3 text-xs sm:text-sm font-extrabold tracking-tight text-white/90
              transition-all ease-out will-change-opacity
               ${
                 isDarkMode
                   ? "opacity-100 translate-x-0"
                   : "opacity-0 -translate-x-2"
               }
            `}
            style={{ transitionDelay: isDarkMode ? "600ms" : "0ms" }}
          >
            Dark
          </span>
          {/* Right label: shows LIGHT when light mode active (knob on left) */}
          <span
            aria-hidden={isDarkMode}
            className={`absolute top-1/2 -translate-y-1/2 right-3 text-xs sm:text-sm font-extrabold tracking-tight text-white/90 text-right
                transition-all ease-out will-change-opacity
                 ${
                   !isDarkMode
                     ? "opacity-100 translate-x-0"
                     : "opacity-0 translate-x-2"
                 }
              `}
            style={{ transitionDelay: !isDarkMode ? "600ms" : "0ms" }}
          >
            Light
          </span>
        </div>
      </button>
    </div>
  );
}

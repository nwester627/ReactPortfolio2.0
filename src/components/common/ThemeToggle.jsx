import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

/**
 * Animated theme toggle switch with sliding knob and smooth label transitions.
 * Features accessibility support, reduced motion handling, modal-aware visibility,
 * and entrance animation that triggers after the welcome modal is dismissed.
 */
export default function ThemeToggle() {
  const { isDarkMode, toggleTheme, isModalActive, hasModalBeenDismissed } =
    useTheme();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReduced(mq.matches);
    update();
    mq.addEventListener
      ? mq.addEventListener("change", update)
      : mq.addListener(update);
    return () => {
      mq.removeEventListener
        ? mq.removeEventListener("change", update)
        : mq.removeListener(update);
    };
  }, []);

  // Trigger entrance animation when modal is dismissed
  useEffect(() => {
    if (hasModalBeenDismissed && !isModalActive) {
      // Delay to allow modal to finish hiding
      const timer = setTimeout(
        () => {
          setIsVisible(true);
        },
        prefersReduced ? 0 : 200
      );
      return () => clearTimeout(timer);
    }
  }, [hasModalBeenDismissed, isModalActive, prefersReduced]);

  // Animate on route changes as well
  useEffect(() => {
    if (!hasModalBeenDismissed) return; // only after initial modal flow
    const start = () => setIsVisible(false);
    const done = () => {
      const t = setTimeout(() => setIsVisible(true), prefersReduced ? 0 : 120);
      return () => clearTimeout(t);
    };
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", done);
    router.events.on("routeChangeError", done);
    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", done);
      router.events.off("routeChangeError", done);
    };
  }, [router, hasModalBeenDismissed, prefersReduced]);

  // Hide if modal is active
  if (isModalActive) {
    return null;
  }

  // Don't render until modal has been dismissed (for entrance animation)
  if (!hasModalBeenDismissed) {
    return null;
  }

  return (
    <div
      className={`fixed top-4 right-4 sm:right-[140px] z-50 transition-all duration-700 ease-extra-smooth transform-gpu ${
        isVisible
          ? "transform translate-x-0 opacity-100"
          : "transform translate-x-full opacity-0"
      }`}
      style={{
        transitionDelay: isVisible ? "0ms" : "0ms",
        willChange: "transform, opacity",
      }}
    >
      <button
        onClick={toggleTheme}
        className={`group relative w-28 h-11 rounded-full text-[0.85rem] sm:text-sm font-semibold tracking-tight
          transition-colors duration-700 ease-extra-smooth motion-reduce:transition-none backdrop-blur-sm
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
          className={`absolute top-1 left-1 h-9 w-9 rounded-full bg-white shadow-md flex items-center justify-center
            will-change-transform transform-gpu
            transition-transform motion-safe:duration-900 motion-safe:ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none motion-reduce:transform-none
            ${isDarkMode ? "translate-x-[68px]" : "translate-x-0"}
            group-active:scale-95`}
        >
          {isDarkMode ? (
            <FaMoon className="w-4 h-4 text-lavender transition-colors duration-500" />
          ) : (
            <FaSun className="w-4 h-4 text-light-primary transition-colors duration-500" />
          )}
        </div>

        {/* Dynamic labels */}
        <div className="absolute inset-0 select-none pointer-events-none">
          <span
            aria-hidden={!isDarkMode}
            className={`absolute top-1/2 -translate-y-1/2 left-3 text-xs sm:text-sm font-extrabold tracking-tight text-white/90
              transition-opacity transition-transform duration-500 ease-extra-smooth will-change-opacity will-change-transform
               ${
                 isDarkMode
                   ? "opacity-100 translate-x-0"
                   : "opacity-0 -translate-x-2"
               }
            `}
            style={{ transitionDelay: isDarkMode ? "180ms" : "0ms" }}
          >
            Dark
          </span>
          <span
            aria-hidden={isDarkMode}
            className={`absolute top-1/2 -translate-y-1/2 right-3 text-xs sm:text-sm font-extrabold tracking-tight text-white/90 text-right
                transition-opacity transition-transform duration-500 ease-extra-smooth will-change-opacity will-change-transform
                 ${
                   !isDarkMode
                     ? "opacity-100 translate-x-0"
                     : "opacity-0 translate-x-2"
                 }
              `}
            style={{ transitionDelay: !isDarkMode ? "180ms" : "0ms" }}
          >
            Light
          </span>
        </div>
      </button>
    </div>
  );
}

import { useTheme } from "@/context/ThemeContext";
import { useEffect, useState } from "react";
import { Motion, spring } from "react-motion";

export default function FrostedSection({
  children,
  className = "",
  variant,
  delay = 200,
}) {
  const { isDarkMode, isToggling } = useTheme();
  const base = isDarkMode
    ? "border-white/10 bg-white/5 shadow-black/10"
    : "border-light-primary/10 bg-white/60 shadow-light-primary/5";
  const variantClass = variant === "contact" ? "mb-16 sm:mb-24" : "";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  const containerClass =
    `w-[90vw] max-w-[90vw] mx-auto px-3 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12 mt-2 sm:mt-6 rounded-2xl backdrop-blur-sm transition-all duration-300 relative z-10 border shadow-md ${base} ${variantClass} ${className}`
      .replace(/\s+/g, " ")
      .trim();

  // Respect reduced motion by not animating on mount if user prefers reduced motion
  let prefersReduced = false;
  if (typeof window !== "undefined" && window.matchMedia) {
    prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }

  if (prefersReduced) {
    return (
      <section
        className={containerClass}
        style={{ boxSizing: "border-box", overflowWrap: "break-word" }}
      >
        {children}
      </section>
    );
  }

  return (
    <Motion
      defaultStyle={{ t: 0 }}
      style={{ t: spring(mounted ? 1 : 0, { stiffness: 120, damping: 16 }) }}
    >
      {(style) => {
        const t = style.t;
        const opacity = 0.85 + 0.15 * t;
        return (
          <section
            className={containerClass}
            style={{
              boxSizing: "border-box",
              overflowWrap: "break-word",
              opacity,
              willChange: "opacity",
              filter: isToggling ? "blur(1px)" : "none",
              transition: "filter 0.2s ease",
            }}
          >
            {children}
          </section>
        );
      }}
    </Motion>
  );
}

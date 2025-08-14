import { useTheme } from "@/context/ThemeContext";

export default function FrostedSection({ children, className = "", variant }) {
  const { isDarkMode } = useTheme();
  const base = isDarkMode
    ? "border-white/10 bg-white/5 shadow-black/10"
    : "border-light-primary/10 bg-white/60 shadow-light-primary/5";
  return (
    <section
      className={`w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12 mt-6 sm:mt-8 rounded-2xl backdrop-blur-sm transition-all duration-300 relative z-10 border shadow-md ${base} ${
        variant === "contact" ? "mb-16 sm:mb-24" : ""
      } ${className}`}
    >
      {children}
    </section>
  );
}

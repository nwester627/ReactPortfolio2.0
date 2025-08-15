import { useTheme } from "@/context/ThemeContext";

export default function FrostedSection({ children, className = "", variant }) {
  const { isDarkMode } = useTheme();
  const base = isDarkMode
    ? "border-white/10 bg-white/5 shadow-black/10"
    : "border-light-primary/10 bg-white/60 shadow-light-primary/5";
  const variantClass = variant === "contact" ? "mb-16 sm:mb-24" : "";
  return (
    <section
      className={`w-full max-w-full sm:max-w-3xl md:max-w-6xl mx-auto px-2 sm:px-4 md:px-8 py-5 sm:py-8 md:py-12 mt-4 sm:mt-8 rounded-2xl backdrop-blur-sm transition-all duration-300 relative z-10 border shadow-md ${base} ${variantClass} ${className}`
        .replace(/\s+/g, " ")
        .trim()}
      style={{ boxSizing: "border-box", overflowWrap: "break-word" }}
    >
      {children}
    </section>
  );
}

import { useTheme } from "@/context/ThemeContext";

export default function FrostedSection({ children, className = "", variant }) {
  const { isDarkMode } = useTheme();
  const base = isDarkMode
    ? "border-white/10 bg-white/5 shadow-black/10"
    : "border-light-primary/10 bg-white/60 shadow-light-primary/5";
  return (
    <section
      className={`w-11/12 sm:w-9/12 mx-auto px-4 py-8 mt-8 rounded-2xl backdrop-blur-sm transition-all duration-300 relative z-10 border shadow-md ${base} ${
        variant === "contact" ? "mb-16 sm:mb-24" : ""
      } ${className}`}
    >
      {children}
    </section>
  );
}

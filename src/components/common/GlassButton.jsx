import { useTheme } from "@/context/ThemeContext";

export default function GlassButton({
  href,
  children,
  icon = null,
  className = "",
  loading = false,
  disabled = false,
  onClick,
  type = "button",
  variant = "primary", // primary | outline | subtle
  size = "md", // sm | md | lg
}) {
  const { isDarkMode } = useTheme();
  const sizeMap = {
    sm: "px-3 py-1.5 text-xs sm:text-sm",
    md: "px-5 py-2.5 text-sm sm:text-base",
    lg: "px-6 py-3 text-base sm:text-lg",
  };

  const sizeClasses = sizeMap[size] || sizeMap.md;

  const palette = {
    primary: isDarkMode
      ? "bg-white/10 text-light-gray hover:bg-lavender hover:text-space border-white/10"
      : "bg-light-primary/10 text-light-text hover:bg-lavender hover:text-white border-light-primary/20",
    outline: isDarkMode
      ? "bg-blackish-blue/30 text-light-gray border-gray-600/40 hover:border-lavender hover:text-white"
      : "bg-white/40 text-light-text border-light-primary/30 hover:border-light-primary hover:text-light-primary",
    subtle: isDarkMode
      ? "bg-white/5 text-light-gray border-transparent hover:bg-white/10"
      : "bg-white/60 text-light-text border-transparent hover:bg-white/70",
  };

  const ringGradient = isDarkMode
    ? "before:from-lavender/60 before:via-white/10 before:to-lavender/20"
    : "before:from-light-primary/70 before:via-light-accent/40 before:to-light-primary/30";

  const baseClasses = `relative group overflow-hidden inline-flex items-center justify-center gap-2 rounded-lg font-bold tracking-tight
    ${sizeClasses}
    ${palette[variant] || palette.primary}
    backdrop-blur-sm border shadow-md hover:shadow-lg
    transition-all duration-300 ease-out active:scale-[0.96]
    focus:outline-none focus:ring-2 ${
      isDarkMode ? "focus:ring-white/20" : "focus:ring-light-primary/25"
    } focus:ring-offset-2 focus:ring-offset-transparent
    before:absolute before:inset-[-1px] before:rounded-[inherit] before:bg-gradient-to-r ${ringGradient} before:opacity-0 before:transition-opacity before:duration-500 group-hover:before:opacity-100
    after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:bg-gradient-to-br after:from-white/0 after:via-white/0 after:to-white/30 dark:after:to-white/5 after:opacity-0 group-hover:after:opacity-100 after:transition-opacity after:duration-500`;

  const disabledClasses =
    loading || disabled
      ? "opacity-50 cursor-not-allowed hover:bg-white/10"
      : "cursor-pointer";

  const combinedClasses = `${baseClasses} ${disabledClasses} ${className}`;

  const isExternal = href?.startsWith("http");

  const content = (
    <>
      {loading ? (
        <svg
          className={`animate-spin h-5 w-5 ${
            isDarkMode ? "text-light-gray" : "text-light-text"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      ) : (
        <>
          {icon && (
            <span className="flex justify-center text-lg transition-transform duration-300 group-hover:scale-110">
              {icon}
            </span>
          )}
          <span className="relative z-10 flex items-center text-shadow-subtle dark:text-shadow-subtle">
            {children}
          </span>
        </>
      )}
    </>
  );

  if (href) {
    if (isExternal) {
      return (
        <a
          href={href}
          className={combinedClasses}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={loading || disabled}
          onClick={loading || disabled ? (e) => e.preventDefault() : onClick}
        >
          {content}
        </a>
      );
    }

    return (
      <a
        href={href}
        className={combinedClasses}
        aria-disabled={loading || disabled}
        onClick={loading || disabled ? (e) => e.preventDefault() : onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={combinedClasses}
      disabled={loading || disabled}
      onClick={onClick}
    >
      {content}
    </button>
  );
}

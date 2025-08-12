import { FaArrowRight } from "react-icons/fa";

export default function GlassButton({
  href,
  children,
  icon = null,
  className = "",
  loading = false,
  disabled = false,
  onClick,
}) {
  console.log("GlassButton loading prop:", loading); // Debugging log

  const baseClasses = `
    inline-flex items-center justify-center gap-2
    px-4 py-2 rounded-lg
    bg-white/10 hover:bg-white/20
    text-light-gray font-medium
    border border-white/10
    backdrop-blur-sm
    shadow-md hover:shadow-lg
    transition duration-150 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-white/20
  `;

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
          className="animate-spin h-5 w-5 text-light-gray"
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
          {children}
          {icon && <span className="flex justify-center text-lg">{icon}</span>}
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
      type="button"
      className={combinedClasses}
      disabled={loading || disabled}
      onClick={onClick}
    >
      {content}
    </button>
  );
}

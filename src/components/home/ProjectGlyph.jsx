import { useTheme } from "@/context/ThemeContext";

// Deterministic pseudo-random gradient based on title.
function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function gradientFromTitle(title, isDark) {
  const h = hashString(title);
  const h1 = h % 360;
  const h2 = (h * 3) % 360;
  const s = isDark ? 55 : 65;
  const l1 = isDark ? 55 : 50;
  const l2 = isDark ? 45 : 55;
  return `linear-gradient(135deg, hsl(${h1} ${s}% ${l1}%) 0%, hsl(${h2} ${s}% ${l2}%) 100%)`;
}

export default function ProjectGlyph({ title, size = 56, className = "" }) {
  const { isDarkMode } = useTheme();
  const initials = title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
  const bg = gradientFromTitle(title, isDarkMode);

  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center font-bold rounded-xl shadow-sm ring-1 select-none ${
        isDarkMode
          ? "ring-white/15 text-light-gray"
          : "ring-light-primary/20 text-light-text/95"
      } ${className}`}
      style={{
        width: size,
        height: size,
        background: bg,
        fontSize: size * 0.36,
        letterSpacing: "0.05em",
      }}
    >
      {initials}
    </div>
  );
}

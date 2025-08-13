import { useTheme } from "@/context/ThemeContext";

// Simple deterministic hash
function hash(str) {
  let h = 2166136261 >>> 0; // FNV-1a basis
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rng(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x9e3779b9) >>> 0;
    let t = state;
    t ^= t >>> 15;
    t *= 0x2c1b3c6d;
    t ^= t >>> 12;
    t *= 0x297a2d39;
    t ^= t >>> 15;
    return (t >>> 0) / 4294967295;
  };
}

/* Generate 5x5 boolean grid with radial symmetry; central emphasis */
function generatePattern(title) {
  const r = rng(hash(title));
  const size = 5;
  const grid = Array.from({ length: size }, () => Array(size).fill(false));
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < Math.ceil(size / 2); x++) {
      const distance = Math.hypot(x - 2, y - 2);
      const threshold = 0.55 + distance * 0.18; // fewer bits toward edge
      const val = r() > threshold;
      grid[y][x] = val;
      grid[y][size - 1 - x] = val; // mirror horizontally
    }
  }
  return grid;
}

export default function AbstractPatternAvatar({
  title,
  size = 56,
  className = "",
}) {
  const { isDarkMode } = useTheme();
  const grid = generatePattern(title);
  const cells = 5;
  const gap = 1; // px
  const inner = size - 10; // padding container
  const cellSize = Math.floor((inner - gap * (cells - 1)) / cells);
  const offset = (size - (cellSize * cells + gap * (cells - 1))) / 2;
  const fg = isDarkMode ? "rgba(255,255,255,0.75)" : "rgba(30,30,40,0.75)";
  const bgPanel = isDarkMode
    ? "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))"
    : "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.55))";
  const accentHue = hash(title) % 360;
  const accent = `hsla(${accentHue} 70% ${isDarkMode ? 60 : 45}% / 0.55)`;

  return (
    <div
      aria-hidden="true"
      className={`relative rounded-xl ring-1 shadow-sm overflow-hidden select-none ${
        isDarkMode ? "ring-white/10" : "ring-light-primary/25"
      } ${className}`}
      style={{
        width: size,
        height: size,
        background: bgPanel,
        backdropFilter: "blur(6px)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 70% 30%, ${accent} 0%, transparent 70%)`,
          mixBlendMode: isDarkMode ? "screen" : "multiply",
          opacity: 0.65,
          pointerEvents: "none",
        }}
      />
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="presentation"
      >
        {grid.map((row, y) =>
          row.map((on, x) =>
            on ? (
              <rect
                key={`${x}-${y}`}
                x={offset + x * (cellSize + gap)}
                y={offset + y * (cellSize + gap)}
                width={cellSize}
                height={cellSize}
                rx={Math.min(3, cellSize * 0.25)}
                fill={fg}
                style={{
                  opacity: 0.9 - Math.hypot(x - 2, y - 2) * 0.12,
                  mixBlendMode: isDarkMode ? "screen" : "normal",
                }}
              />
            ) : null
          )
        )}
      </svg>
    </div>
  );
}

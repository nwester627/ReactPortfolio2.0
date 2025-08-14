import { useTheme } from "@/context/ThemeContext";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { FaPython, FaJava, FaReact, FaDatabase } from "react-icons/fa";
import {
  SiDiscord,
  SiSqlite,
  SiJavascript,
  SiTailwindcss,
  SiLeaflet,
  SiSupabase,
  SiVercel,
  SiNextdotjs,
} from "react-icons/si";

// Mapping includes icon and brand color (fallback neutral if theme overrides)
const techMeta = {
  python: { Icon: FaPython, color: "#3776AB" },
  discord: { Icon: SiDiscord, color: "#5865F2" },
  sqlite: { Icon: SiSqlite, color: "#044A64" },
  java: { Icon: FaJava, color: "#ED8B00" },
  javafx: { Icon: FaJava, color: "#ED8B00" },
  sql: { Icon: FaDatabase, color: "#6B7280" },
  react: { Icon: FaReact, color: "#61DAFB" },
  javascript: { Icon: SiJavascript, color: "#F7DF1E" },
  tailwind: { Icon: SiTailwindcss, color: "#06B6D4" },
  leaflet: { Icon: SiLeaflet, color: "#199900" },
  supabase: { Icon: SiSupabase, color: "#3ECF8E" },
  vercel: { Icon: SiVercel, color: "#000000" },
  next: { Icon: SiNextdotjs, color: "#000000" },
};

function pickIcons(technologies = [], max = 3) {
  const chosen = [];
  for (const tech of technologies) {
    const key = tech.toLowerCase();
    const matchedKey = Object.keys(techMeta).find((k) => key.includes(k));
    if (matchedKey) {
      if (!chosen.find((c) => c.key === matchedKey)) {
        chosen.push({ key: matchedKey, ...techMeta[matchedKey] });
      }
    }
    if (chosen.length >= max) break;
  }
  return chosen;
}

function hash(str) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export default function StackClusterAvatar({
  technologies = [],
  size = 56,
  className = "",
  max = 4,
}) {
  const { isDarkMode } = useTheme();
  const icons = useMemo(
    () => pickIcons(technologies, max),
    [technologies, max]
  );
  const dim = size;
  const label = useMemo(
    () =>
      technologies.length
        ? `Tech stack: ${technologies.join(", ")}`
        : "Tech stack",
    [technologies]
  );

  // Deterministic accent hue from tech list for panel tint
  const h = hash(technologies.join("|")) % 360;
  const panelBg = isDarkMode
    ? `linear-gradient(135deg, hsla(${h} 40% 22% / 0.35), hsla(${h} 50% 10% / 0.15))`
    : `linear-gradient(135deg, hsla(${h} 70% 92% / 0.85), hsla(${h} 60% 88% / 0.55))`;
  const ringClass = isDarkMode ? "ring-white/12" : "ring-light-primary/25";

  // Layout positions for up to 4 icons (diamond for 4)
  const positions = useMemo(() => {
    if (!icons.length) return [];
    const center = dim / 2;
    if (icons.length === 1) {
      const box = Math.round(dim * 0.5);
      return [{ x: center - box / 2, y: center - box / 2, size: box }];
    }
    if (icons.length === 2) {
      const s = Math.round(dim * 0.44);
      return [
        { x: dim * 0.09, y: center - s / 2, size: s },
        { x: dim - s - dim * 0.09, y: center - s / 2, size: s },
      ];
    }
    if (icons.length === 3) {
      const s = Math.round(dim * 0.4);
      return [
        { x: center - s / 2, y: dim * 0.05, size: s },
        { x: dim * 0.07, y: dim - s - dim * 0.08, size: s },
        { x: dim - s - dim * 0.07, y: dim - s - dim * 0.08, size: s },
      ];
    }
    // 4 icons diamond layout
    const s = Math.round(dim * 0.36);
    return [
      { x: center - s / 2, y: dim * 0.02, size: s }, // top
      { x: dim - s - dim * 0.02, y: center - s / 2, size: s }, // right
      { x: center - s / 2, y: dim - s - dim * 0.02, size: s }, // bottom
      { x: dim * 0.02, y: center - s / 2, size: s }, // left
    ];
  }, [icons, dim]);

  const overflow = technologies.length - icons.length;
  const hiddenTechs = useMemo(
    () => (overflow > 0 ? technologies.slice(icons.length) : []),
    [overflow, technologies, icons.length]
  );

  // Popover state for overflow listing
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const popRef = useRef(null);
  // Track prefers-reduced-motion for disabling animation flair
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(!!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback((e) => {
    e.stopPropagation();
    setOpen((o) => !o);
  }, []);

  // (Removed legacy hold-to-open logic to reduce accidental activation)

  // Close on outside click / Escape
  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") close();
    }
    function onClick(e) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target)) close();
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [open, close]);

  return (
    <div
      ref={rootRef}
      role="img"
      aria-label={label}
      title={label}
      className={`group relative rounded-xl ring-1 shadow-sm backdrop-blur-md overflow-visible select-none ${ringClass} ${className}`}
      style={{ width: dim, height: dim, background: panelBg }}
    >
      {/* subtle inner overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDarkMode
            ? "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.18), transparent 65%)"
            : "radial-gradient(circle at 70% 35%, rgba(255,255,255,0.7), transparent 60%)",
          mixBlendMode: isDarkMode ? "screen" : "multiply",
          opacity: 0.7,
        }}
      />
      {/* Primary icons */}
      {/* Icons */}
      {icons.length === 0 && (
        <span
          className={`absolute inset-0 flex items-center justify-center text-[0.55rem] tracking-wide uppercase font-semibold ${
            isDarkMode ? "text-light-gray/70" : "text-light-text/65"
          }`}
        >
          Stack
        </span>
      )}
      {icons.map((ic, i) => {
        const pos = positions[i];
        if (!pos) return null;
        const { x, y, size: s } = pos;
        const fg = ic.color;
        return (
          <div
            key={ic.key}
            className={`absolute flex items-center justify-center rounded-full ring-1 shadow-sm ${
              isDarkMode ? "ring-white/15" : "ring-light-primary/30"
            }`}
            style={{
              left: x,
              top: y,
              width: s,
              height: s,
              background: isDarkMode
                ? `linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))`
                : `linear-gradient(145deg, rgba(255,255,255,0.95), rgba(255,255,255,0.6))`,
              backdropFilter: "blur(4px)",
            }}
          >
            <ic.Icon
              size={Math.round(s * 0.62)}
              style={{
                color: isDarkMode ? fg : fg,
                filter: isDarkMode
                  ? "drop-shadow(0 1px 2px rgba(0,0,0,0.65))"
                  : "drop-shadow(0 1px 1px rgba(0,0,0,0.25))",
              }}
              role="img"
              aria-label={ic.key}
            />
          </div>
        );
      })}
      {/* Overflow button (placed outside so it never overlaps icons) */}
      {overflow > 0 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggle(e);
          }}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-label={`Show ${overflow} more technologies: ${hiddenTechs.join(
            ", "
          )}`}
          className={`absolute -top-2 -right-2 h-7 w-7 rounded-full flex items-center justify-center ring-1 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-lavender/60 backdrop-blur-md shadow-lg border overflow-hidden text-[0.85rem] font-bold tracking-tight select-none active:scale-[0.92] ${
            isDarkMode
              ? "bg-gradient-to-br from-black/60 via-black/50 to-black/35 ring-white/25 border-white/10 text-light-gray hover:from-black/65 hover:to-black/40"
              : "bg-gradient-to-br from-white/95 via-white/80 to-white/65 ring-light-primary/30 border-light-primary/20 text-light-text hover:from-white/100 hover:to-white/75"
          } ${open ? "scale-105" : "scale-100"}`}
          style={{
            boxShadow: isDarkMode
              ? "0 2px 4px -1px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)"
              : "0 2px 4px -1px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.05)",
          }}
        >
          <span
            className="translate-y-px drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
            aria-hidden="true"
          >
            …
          </span>
        </button>
      )}

      {/* Popover listing */}
      {open && overflow > 0 && (
        <div
          ref={popRef}
          role="dialog"
          aria-label="Additional technologies"
          className={`absolute z-20 top-full right-0 mt-2 min-w-[140px] max-w-[200px] rounded-xl ring-1 p-3 text-[0.65rem] font-medium flex flex-col gap-2 backdrop-blur-md shadow-xl ${
            reducedMotion
              ? "opacity-100"
              : "animate-[materialize_0.55s_cubic-bezier(.33,1,.68,1)_forwards]"
          } ${
            isDarkMode
              ? "bg-black/70 ring-white/15 text-light-gray/85"
              : "bg-white/85 ring-light-primary/25 text-light-text/80"
          }`}
        >
          <ul className="space-y-1">
            {hiddenTechs.map((t) => {
              const key = t.toLowerCase();
              const matchedKey = Object.keys(techMeta).find((k) =>
                key.includes(k)
              );
              const MetaIcon = matchedKey ? techMeta[matchedKey].Icon : null;
              const color = matchedKey
                ? techMeta[matchedKey].color
                : isDarkMode
                ? "#bbb"
                : "#555";
              return (
                <li key={t} className="flex items-center gap-2 leading-tight">
                  {MetaIcon && (
                    <MetaIcon
                      size={12}
                      style={{
                        color,
                        filter: isDarkMode
                          ? "drop-shadow(0 1px 1px rgba(0,0,0,0.7))"
                          : "drop-shadow(0 1px 1px rgba(0,0,0,0.25))",
                      }}
                      aria-hidden="true"
                    />
                  )}
                  <span>{t}</span>
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            onClick={close}
            className={`self-end mt-1 px-2 py-1 rounded-md text-[0.55rem] font-semibold tracking-wide ring-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender/60 ${
              isDarkMode
                ? "bg-white/10 ring-white/15 hover:bg-white/20"
                : "bg-light-primary/15 ring-light-primary/30 hover:bg-light-primary/25"
            }`}
          >
            Close
          </button>
        </div>
      )}
      <span className="sr-only">{label}</span>
    </div>
  );
}

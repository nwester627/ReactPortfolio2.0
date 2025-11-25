import { useTheme } from "@/context/ThemeContext";
import { useEffect, useRef, useState, useCallback } from "react";
import { testimonials } from "@/lib/testimonials";
import { Motion, spring } from "react-motion";

// Simple rotating ledger testimonials component
export default function TestimonialCards() {
  const { isDarkMode } = useTheme();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);
  const progressRef = useRef(null);
  const prefersReducedMotion = useRef(false);
  const DURATION = 12000; // ms per testimonial (slowed down from 6s to 12s)

  // Generate role-based avatar data
  const getRoleAvatarData = useCallback(
    (name, title) => {
      // Determine role type from title
      const titleLower = title.toLowerCase();
      let roleType = "manager"; // default
      let icon = "user"; // default

      if (titleLower.includes("director")) {
        roleType = "director";
        icon = "shield";
      } else if (titleLower.includes("software engineering manager")) {
        roleType = "tech-manager";
        icon = "settings";
      } else if (
        titleLower.includes("manager") ||
        titleLower.includes("engineering manager")
      ) {
        roleType = "manager";
        icon = "users";
      } else if (titleLower.includes("engineer")) {
        roleType = "engineer";
        icon = "code";
      } else if (titleLower.includes("lead")) {
        roleType = "lead";
        icon = "star";
      }

      // Role-based color schemes
      const roleColors = {
        director: {
          hue: 280, // Purple tones for leadership
          saturation: 70,
          lightness: isDarkMode ? 60 : 50,
        },
        manager: {
          hue: 210, // Blue tones for management
          saturation: 65,
          lightness: isDarkMode ? 65 : 45,
        },
        "tech-manager": {
          hue: 170, // Teal tones for technical management
          saturation: 70,
          lightness: isDarkMode ? 65 : 45,
        },
        engineer: {
          hue: 140, // Green tones for technical
          saturation: 60,
          lightness: isDarkMode ? 65 : 45,
        },
        lead: {
          hue: 35, // Orange tones for leadership
          saturation: 70,
          lightness: isDarkMode ? 65 : 50,
        },
      };

      const colors = roleColors[roleType];

      return {
        roleType,
        icon,
        bgColor: `hsl(${colors.hue}, ${colors.saturation}%, ${colors.lightness}%)`,
        textColor: isDarkMode ? "#1a1a1a" : "#ffffff",
      };
    },
    [isDarkMode]
  );

  // Role-based avatar icons
  const RoleAvatar = ({ person }) => {
    const data = getRoleAvatarData(person.name, person.title);

    // Icon SVG paths
    const iconPaths = {
      shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
      users:
        "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z",
      settings:
        "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z",
      code: "M16 18l6-6-6-6M8 6l-6 6 6 6",
      star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
      user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
    };

    return (
      <div
        className="relative h-[70px] w-[70px] lg:h-[80px] lg:w-[80px] rounded-full shadow-lg ring-2 ring-white/20 dark:ring-white/10 shrink-0 flex items-center justify-center transition-all duration-300 hover:scale-105"
        style={{
          backgroundColor: data.bgColor,
          boxShadow: `0 4px 20px ${data.bgColor}40`,
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke={data.textColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d={iconPaths[data.icon]} />
        </svg>
      </div>
    );
  };

  // Check for reduced motion preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      prefersReducedMotion.current = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
    }
  }, []);

  // advance logic
  const advance = useCallback(() => {
    setIndex((i) => (i + 1) % testimonials.length);
  }, []);

  // timer setup
  useEffect(() => {
    if (prefersReducedMotion.current || paused) return;
    intervalRef.current = setTimeout(advance, DURATION);
    return () => clearTimeout(intervalRef.current);
  }, [index, paused, advance]);

  // keyboard shortcuts (space to pause/play, left/right to scrub)
  const onKey = (e) => {
    if (["ArrowRight", "ArrowLeft", " ", "Spacebar"].includes(e.key)) {
      e.preventDefault();
      if (e.key === "ArrowRight") {
        setIndex((i) => (i + 1) % testimonials.length);
      } else if (e.key === "ArrowLeft") {
        setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
      } else {
        setPaused((p) => !p);
      }
    }
  };

  // progress animation using inline style width animation reset by key change
  useEffect(() => {
    if (!progressRef.current) return;
    const el = progressRef.current;
    el.style.transition = "none";
    el.style.width = "0%";
    // force reflow
    void el.offsetWidth;
    if (!paused && !prefersReducedMotion.current) {
      el.style.transition = `width ${DURATION}ms linear`;
      el.style.width = "100%";
    }
  }, [index, paused]);

  const t = testimonials[index];

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="flex flex-col px-4 pt-4 sm:pt-6 lg:pt-8 pb-10 sm:pb-12 lg:pb-16"
    >
      <Motion
        defaultStyle={{ t: 0 }}
        style={{ t: spring(1, { stiffness: 120, damping: 16 }) }}
      >
        {(style) => {
          const t = style.t;
          const opacity = 0.8 + 0.2 * t;
          const translateY = (1 - t) * 10;
          return (
            <div
              className="text-left mb-8 sm:mb-10 lg:mb-12"
              style={{
                opacity,
                transform: `translateY(${translateY}px)`,
              }}
            >
              <div className="flex flex-col items-start">
                <h3
                  id="testimonials-heading"
                  className={`text-[clamp(2.25rem,5vw,3.5rem)] font-bold tracking-tight leading-tight mb-2 text-shadow-soft ${
                    isDarkMode
                      ? "text-light-gray"
                      : "text-light-text accent-shadow"
                  }`}
                >
                  Testimonials
                </h3>
                <div className="h-[3px] w-32 rounded-full bg-gradient-to-r from-rose via-lavender to-lavender/60" />
              </div>
            </div>
          );
        }}
      </Motion>

      <div
        className="w-full max-w-5xl mx-auto flex flex-col gap-3 sm:gap-4 lg:gap-5 px-2 sm:px-4"
        aria-label="Rotating testimonial ledger"
        tabIndex={0}
        onKeyDown={onKey}
      >
        <div
          className={`relative overflow-hidden rounded-2xl ring-1 backdrop-blur-sm p-5 sm:p-8 lg:p-10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender/60 ${
            isDarkMode
              ? "bg-white/[0.055] ring-white/10"
              : "bg-light-primary/5 ring-light-primary/15"
          }`}
        >
          <div className="flex items-start gap-4 sm:gap-5 lg:gap-6 mb-3 sm:mb-4 lg:mb-5">
            <RoleAvatar person={t} />
            <div className="flex-1 min-w-0">
              <h4
                className={`font-semibold tracking-tight text-base sm:text-lg mb-2 ${
                  isDarkMode ? "text-light-gray" : "text-light-text"
                }`}
              >
                {t.name}
              </h4>
              <div
                className={`text-sm font-medium mb-3 ${
                  isDarkMode ? "text-light-gray/70" : "text-light-text/70"
                }`}
              >
                {t.title}
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 lg:px-5 lg:py-2.5 rounded-lg text-[11px] sm:text-xs font-semibold ring-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender/60 ${
                  isDarkMode
                    ? "bg-white/8 text-light-gray/90 ring-white/15 hover:bg-white/12 hover:text-white"
                    : "bg-light-primary/15 text-light-text/90 ring-light-primary/25 hover:bg-light-primary/20 hover:text-light-text"
                }`}
                aria-pressed={paused}
              >
                {paused ? "Play" : "Pause"}
              </button>
            </div>
          </div>
          <blockquote
            className={`relative text-[15px] sm:text-base leading-relaxed transition-[opacity,transform] duration-700 will-change-transform ${
              prefersReducedMotion.current ? "opacity-100" : "opacity-100"
            } ${isDarkMode ? "text-light-gray/85" : "text-light-text/85"}`}
            key={t.id}
          >
            "{t.full}"
          </blockquote>
          <div className="mt-5 sm:mt-6 lg:mt-7 flex items-center gap-2 sm:gap-3 lg:gap-4">
            <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-white/10 dark:bg-white/10 relative">
              <div
                ref={progressRef}
                className="h-full bg-gradient-to-r from-rose via-lavender to-lavender/60"
              />
            </div>
            <div className="flex items-center gap-1">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender/60 ${
                    i === index
                      ? isDarkMode
                        ? "bg-lavender/80"
                        : "bg-lavender/80"
                      : isDarkMode
                      ? "bg-white/20 hover:bg-white/35"
                      : "bg-light-primary/25 hover:bg-light-primary/40"
                  }`}
                  aria-label={`Show testimonial ${i + 1}`}
                  aria-pressed={i === index}
                />
              ))}
            </div>
          </div>
          <div className="sr-only mt-2 text-[0.55rem]" aria-live="polite">
            Showing testimonial {index + 1} of {testimonials.length}: {t.name}.
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4 text-[13px] sm:text-sm font-medium">
          {testimonials.map((ti, i) => (
            <button
              key={ti.id}
              onClick={() => setIndex(i)}
              className={`px-4 py-2 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3 rounded-full ring-1 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender/60 font-semibold ${
                i === index
                  ? isDarkMode
                    ? "bg-lavender/25 text-white ring-lavender/50 shadow-lg shadow-lavender/25"
                    : "bg-lavender/35 text-white ring-lavender/60 shadow-lg shadow-lavender/30"
                  : isDarkMode
                  ? "bg-white/10 text-light-gray/90 ring-white/20 hover:bg-white/15 hover:text-white hover:ring-white/30"
                  : "bg-light-primary/20 text-light-text/90 ring-light-primary/30 hover:bg-light-primary/25 hover:text-light-text hover:ring-light-primary/40"
              }`}
              aria-current={i === index}
            >
              {ti.name.split(" ")[0]}
            </button>
          ))}
        </div>
        <p
          className={`text-sm sm:text-base leading-relaxed text-center mt-4 sm:mt-5 lg:mt-6 px-4 ${
            isDarkMode ? "text-light-gray/80" : "text-light-text/80"
          }`}
        >
          Read what former coworkers say about me. Use space to pause, arrow
          keys to navigate.
        </p>
      </div>
    </section>
  );
}

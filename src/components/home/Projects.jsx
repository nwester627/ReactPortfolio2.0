import { useState, useRef, useEffect, useCallback } from "react";
import { FaGithub, FaExternalLinkAlt, FaChevronDown } from "react-icons/fa";
import { SiOpenai } from "react-icons/si";
import { projectsData } from "@/lib/projects";
import { useTheme } from "@/context/ThemeContext";
import StackClusterAvatar from "./StackClusterAvatar";
import { Motion, spring } from "react-motion";
function usePrefersReducedMotion() {
  const [prefers, setPrefers] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefers(mq.matches);
    update();

    mq.addEventListener
      ? mq.addEventListener("change", update)
      : mq.addListener(update);

    return () => {
      mq.removeEventListener
        ? mq.removeEventListener("change", update)
        : mq.removeListener(update);
    };
  }, []);
  return prefers;
}

function CaseItem({ project, open, onToggle, registerHeaderRef, impact }) {
  const { isDarkMode } = useTheme();

  // Common className constants to reduce duplication
  const cardClass = `rounded-2xl border backdrop-blur-sm transition-all duration-300 focus-within:ring-2 focus-within:ring-lavender/60 ${
    project.featured
      ? `ring-2 ring-lavender/50 shadow-lg shadow-lavender/25 ${
          isDarkMode
            ? "border-lavender/30 bg-white/5 hover:bg-white/[0.08] hover:shadow-xl hover:shadow-lavender/30"
            : "border-lavender/25 bg-light-primary/5 hover:bg-light-primary/10 hover:shadow-xl hover:shadow-lavender/20"
        }`
      : isDarkMode
      ? "border-white/10 bg-white/5 hover:bg-white/[0.08] hover:border-white/20 hover:shadow-lg hover:shadow-white/10"
      : "border-light-primary/15 bg-light-primary/5 hover:bg-light-primary/10 hover:border-light-primary/25 hover:shadow-lg hover:shadow-light-primary/10"
  }`;
  const sectionHeaderClass =
    "text-xs font-semibold tracking-wider uppercase mb-1 opacity-70 text-shadow-subtle";
  const paraClass = `text-sm leading-relaxed ${
    isDarkMode ? "text-light-gray/90" : "text-light-text/90"
  }`;
  const secondaryTextClass = isDarkMode
    ? "text-light-gray/85"
    : "text-light-text/85";
  const linkClass = `inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border backdrop-blur-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender/60 text-shadow-subtle ${
    isDarkMode
      ? "bg-white/10 border-white/10 hover:bg-lavender/30 text-light-gray"
      : "bg-light-primary/10 border-light-primary/20 hover:bg-lavender/30 text-light-text"
  }`;

  const contentRef = useRef(null);
  const headerRef = useRef(null);
  const [height, setHeight] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();
  useEffect(() => {
    if (prefersReducedMotion) return; // skip measuring + animation
    if (open) {
      const el = contentRef.current;
      if (!el) return;
      setHeight(el.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [open, project.id, prefersReducedMotion]);

  // expose header ref upward for keyboard navigation / scrolling
  useEffect(() => {
    registerHeaderRef(project.id, headerRef);
  }, [project.id, registerHeaderRef]);

  return (
    <article id={project.slug} className={cardClass}>
      <button
        onClick={onToggle}
        aria-expanded={open}
        ref={headerRef}
        className="case-header w-full text-left px-4 sm:px-5 lg:px-6 py-4 sm:py-5 lg:py-6 flex items-start gap-3 sm:gap-4 lg:gap-5 focus:outline-none"
      >
        <StackClusterAvatar technologies={project.technologies} size={56} />
        <div className="flex-1 min-w-0 space-y-1.5 sm:space-y-2">
          <div className="flex items-center gap-3 flex-wrap">
            <h3
              className={`text-xl font-bold tracking-tight text-shadow-subtle ${
                isDarkMode ? "text-light-gray" : "text-light-text"
              }`}
            >
              {project.title}
            </h3>
            {(() => {
              const isFeatured = project.featured;
              const isHired = project.slug === "hired-io";
              const baseSize = isHired
                ? "text-[10px] font-semibold px-2 py-0.5 rounded-full tracking-wide"
                : "text-xs font-semibold px-2.5 py-1 rounded-full tracking-wide";
              const statusText = isFeatured
                ? "Current Project in progress"
                : project.status;
              return (
                <span
                  className={`${baseSize} ${
                    isFeatured
                      ? isDarkMode
                        ? "bg-lavender/20 text-lavender border border-lavender/40 shadow-lg shadow-lavender/20"
                        : "bg-lavender/15 text-lavender border border-lavender/30 shadow-lg shadow-lavender/15"
                      : isDarkMode
                      ? "bg-white/12 text-light-gray/90"
                      : "bg-light-primary/20 text-light-text/90"
                  }`}
                >
                  {statusText}
                </span>
              );
            })()}
            {project.aiEnhanced?.enabled && (
              <span
                className={`text-[0.6rem] font-semibold pl-2.5 pr-3 py-1 rounded-full tracking-wide relative overflow-hidden inline-flex items-center gap-1.5 ${
                  isDarkMode
                    ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-200 border border-purple-400/30"
                    : "bg-gradient-to-r from-purple-500/15 to-blue-500/15 text-purple-700 border border-purple-500/40"
                }`}
                style={{
                  boxShadow: isDarkMode
                    ? "0 0 10px rgba(147, 51, 234, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                    : "0 0 8px rgba(147, 51, 234, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.35)",
                }}
                title={project.aiEnhanced.description}
              >
                <SiOpenai className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span className="relative z-10 whitespace-nowrap">
                  {`Enabled with ${project.aiEnhanced?.tools?.[0] || "AI"}`}
                </span>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-full overflow-hidden"
                >
                  <span
                    className={`absolute top-0 -left-1/3 h-full w-1/3 blur-sm opacity-60 ${
                      isDarkMode
                        ? "bg-gradient-to-r from-transparent via-white/50 to-transparent"
                        : "bg-gradient-to-r from-transparent via-white/70 to-transparent"
                    } motion-reduce:opacity-0`}
                    style={{
                      animation: "badgeSweep 2.6s linear infinite alternate",
                    }}
                  />
                </span>
              </span>
            )}
            {impact && (
              <span
                className={`text-[0.6rem] font-semibold px-2 py-1 rounded-full tracking-wide ring-1 ${
                  isDarkMode
                    ? "ring-white/20 bg-white/12 text-light-gray/85"
                    : "ring-light-primary/25 bg-light-primary/15 text-light-text/85"
                }`}
              >
                {impact}
              </span>
            )}
          </div>
          <p
            className={`text-sm leading-relaxed line-clamp-2 ${
              isDarkMode ? "text-light-gray/75" : "text-light-text/75"
            }`}
          >
            {project.problem}
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {project.constraints?.slice(0, 4).map((c, i) => (
              <span
                key={i}
                className={`px-2 py-1 rounded-md text-[0.60rem] font-medium tracking-wide uppercase ring-1 ${
                  isDarkMode
                    ? "bg-white/5 text-light-gray/70 ring-white/10"
                    : "bg-light-primary/10 text-light-text/70 ring-light-primary/20"
                }`}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
        <FaChevronDown
          className={`mt-1 shrink-0 transition-transform duration-300 ease-out ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`px-4 sm:px-5 lg:px-6 ${
          prefersReducedMotion
            ? ""
            : "overflow-hidden transition-[height] duration-600 ease-extra-smooth"
        }`}
        style={
          prefersReducedMotion
            ? {
                height: open ? "auto" : 0,
                overflow: open ? "visible" : "hidden",
              }
            : { height: height }
        }
        aria-hidden={!open}
      >
        <div
          ref={contentRef}
          className="pt-0 pb-4 sm:pb-5 lg:pb-6 space-y-4 sm:space-y-5 lg:space-y-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 pt-2">
            <div className="lg:col-span-1 space-y-3 sm:space-y-4">
              <section>
                <h4 className={sectionHeaderClass}>Problem</h4>
                <p className={paraClass}>{project.problem}</p>
              </section>
              <section>
                <h4 className={sectionHeaderClass}>Approach</h4>
                <p className={paraClass}>{project.approach}</p>
              </section>
              <section>
                <h4 className={sectionHeaderClass}>Result</h4>
                <p className={paraClass}>{project.outcome}</p>
              </section>
            </div>
            <div className="lg:col-span-2 space-y-4 sm:space-y-5 lg:space-y-6">
              {project.features?.length > 0 && (
                <section className="space-y-2">
                  <h4 className={sectionHeaderClass}>Key Features</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    {project.features.map((f, i) => (
                      <li key={i} className={secondaryTextClass}>
                        {f}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              {project.patterns?.length > 0 && (
                <section>
                  <h4 className={sectionHeaderClass}>Patterns & Techniques</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.patterns.map((p, i) => (
                      <span
                        key={i}
                        className={`px-2 py-1 sm:px-2.5 sm:py-1 rounded-full text-[0.6rem] font-semibold tracking-wide ring-1 ${
                          isDarkMode
                            ? "bg-white/8 text-light-gray/85 ring-white/15"
                            : "bg-light-primary/12 text-light-text/85 ring-light-primary/25"
                        }`}
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </section>
              )}
              {project.challenges && (
                <section>
                  <h4 className={sectionHeaderClass}>Challenge Note</h4>
                  <p className={`text-sm ${secondaryTextClass}`}>
                    {project.challenges}
                  </p>
                </section>
              )}
              {project.aiEnhanced?.enabled && (
                <section>
                  <h4 className={sectionHeaderClass}>
                    AI-Enhanced Development
                  </h4>
                  <p className={`text-sm mb-2 ${secondaryTextClass}`}>
                    {project.aiEnhanced.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.aiEnhanced.tools.map((tool, i) => (
                      <span
                        key={i}
                        className={`px-2 py-1 rounded-md text-[0.6rem] font-semibold tracking-wide ${
                          isDarkMode
                            ? "bg-purple-500/15 text-purple-200 border border-purple-400/30"
                            : "bg-purple-500/10 text-purple-700 border border-purple-500/30"
                        }`}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </section>
              )}
              <section className="flex flex-wrap gap-2 sm:gap-3 pt-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    {" "}
                    <FaGithub className="w-4 h-4" /> Code{" "}
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    {" "}
                    <FaExternalLinkAlt className="w-4 h-4" /> Live{" "}
                  </a>
                )}
              </section>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
export default function Projects() {
  const [openIds, setOpenIds] = useState(() => {
    const featured = projectsData.find((p) => p.featured);
    return featured ? [featured.id] : [];
  });
  const headerRefs = useRef({});
  const prefersReducedMotion = usePrefersReducedMotion();
  const { isDarkMode } = useTheme();

  const registerHeaderRef = useCallback((id, ref) => {
    if (ref && ref.current) headerRefs.current[id] = ref;
  }, []);

  const toggleId = useCallback(
    (id) => {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));

      // Update URL hash for deep linking
      const proj = projectsData.find((p) => p.id === id);
      if (proj && typeof window !== "undefined" && history.replaceState) {
        if (!openIds.includes(id)) {
          history.replaceState(null, "", `#${proj.slug}`);
        } else {
          history.replaceState(null, "", window.location.pathname);
        }
      }

      // Auto-scroll to opened project after animation frame
      requestAnimationFrame(() => {
        const proj = projectsData.find((p) => p.id === id);
        if (!proj) return;

        const el = document.getElementById(proj.slug);
        if (el) {
          const rect = el.getBoundingClientRect();
          const needsScroll = rect.top < 0 || rect.bottom > window.innerHeight;

          if (needsScroll) {
            el.scrollIntoView({
              block: "nearest",
              behavior: prefersReducedMotion ? "auto" : "smooth",
            });
          }

          // Adjust scroll position after height expansion completes
          setTimeout(
            () => {
              const r2 = el.getBoundingClientRect();
              if (r2.top < 8) {
                window.scrollBy({
                  top: r2.top - 16,
                  left: 0,
                  behavior: prefersReducedMotion ? "auto" : "smooth",
                });
              }
            },
            prefersReducedMotion ? 0 : 620
          );
        }
      });
    },
    [openIds, prefersReducedMotion]
  );

  // Handle URL hash on initial load for deep linking
  useEffect(() => {
    if (typeof window === "undefined") return;

    const hash = window.location.hash.replace("#", "");
    if (!hash) return;

    const proj = projectsData.find((p) => p.slug === hash);
    if (proj) {
      setOpenIds([proj.id]);
      setTimeout(() => {
        const el = document.getElementById(hash);
        el?.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "start",
        });
      }, 30);
    }
  }, [prefersReducedMotion]);

  // Keyboard navigation: arrow up/down across headers, Enter/Space toggle, Home/End jump
  useEffect(() => {
    function onKey(e) {
      const headers = Array.from(document.querySelectorAll(".case-header"));
      if (!headers.length) return;
      const active = document.activeElement;
      const idx = headers.indexOf(active);
      switch (e.key) {
        case "ArrowDown":
          if (idx > -1) {
            e.preventDefault();
            headers[(idx + 1) % headers.length].focus();
          }
          break;
        case "ArrowUp":
          if (idx > -1) {
            e.preventDefault();
            headers[(idx - 1 + headers.length) % headers.length].focus();
          }
          break;
        case "Home":
          if (idx > -1) {
            e.preventDefault();
            headers[0].focus();
          }
          break;
        case "End":
          if (idx > -1) {
            e.preventDefault();
            headers[headers.length - 1].focus();
          }
          break;
        case "Enter":
        case " ": // Space
          if (idx > -1) {
            e.preventDefault();
            const proj = projectsData[idx];
            toggleId(proj.id);
          }
          break;
        default:
          break;
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggleId]);

  const collapseAll = () => setOpenIds([]);

  return (
    <section aria-label="Projects" className="space-y-4 relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-lavender/5 via-transparent to-rose/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.03),transparent_50%)]" />
      </div>
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
              className="flex flex-col items-center gap-4"
              style={{
                opacity,
                transform: `translateY(${translateY}px)`,
              }}
            >
              <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
                <div className="flex flex-col items-start">
                  <h2
                    className={`text-[clamp(2rem,6vw,3.5rem)] sm:text-[clamp(2.25rem,5vw,3.5rem)] font-bold tracking-tight leading-tight text-shadow-soft ${
                      isDarkMode
                        ? "text-light-gray"
                        : "text-light-text accent-shadow"
                    }`}
                  >
                    Projects
                  </h2>
                  <div className="h-[3px] w-24 sm:w-32 rounded-full bg-gradient-to-r from-rose via-lavender to-lavender/60" />
                </div>
                <button
                  onClick={collapseAll}
                  disabled={!openIds.length}
                  className="px-3 py-1.5 rounded-lg border backdrop-blur-sm text-xs font-medium disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender/60 border-white/10 dark:border-white/10 bg-white/10 dark:bg-white/5 hover:enabled:bg-lavender/30 transition-all duration-200 text-shadow-subtle flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <FaChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${
                      openIds.length ? "rotate-180" : ""
                    }`}
                  />
                  Collapse All
                </button>
              </div>
            </div>
          );
        }}
      </Motion>
      <div className="space-y-4 sm:space-y-5 lg:space-y-6">
        {projectsData.map((p, index) => (
          <Motion
            key={p.id}
            defaultStyle={{ opacity: 0, translateY: 20 }}
            style={{
              opacity: spring(1, { stiffness: 100, damping: 15 }),
              translateY: spring(0, {
                stiffness: 100,
                damping: 15,
                delay: index * 50,
              }),
            }}
          >
            {(style) => (
              <div
                style={{
                  opacity: style.opacity,
                  transform: `translateY(${style.translateY}px)`,
                }}
              >
                <CaseItem
                  project={p}
                  open={openIds.includes(p.id)}
                  onToggle={() => toggleId(p.id)}
                  registerHeaderRef={registerHeaderRef}
                  impact={p.impact}
                />
              </div>
            )}
          </Motion>
        ))}
      </div>
    </section>
  );
}

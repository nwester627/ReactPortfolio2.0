import {
  FaReact,
  FaPhp,
  FaLaravel,
  FaHtml5,
  FaCss3,
  FaPython,
  FaGitAlt,
  FaGithub,
  FaAws,
  FaDocker,
  FaNodeJs,
} from "react-icons/fa";
import {
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiNextdotjs,
  SiRedux,
  SiJest,
  SiGithubactions,
  SiJira,
  SiSupabase,
  SiLeaflet,
  SiPostgresql,
  SiVercel,
} from "react-icons/si";
import { GrMysql } from "react-icons/gr";
import { TbApi } from "react-icons/tb";
import { useTheme } from "@/context/ThemeContext";
import { useMemo, useState, useRef, useEffect } from "react";

export default function Skills() {
  const { isDarkMode } = useTheme();
  const [activeCategory, setActiveCategory] = useState("frontend");
  const [cycle, setCycle] = useState(0);
  const containerRef = useRef(null);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      prefersReducedMotion.current = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
    }
  }, []);

  const handleCategoryChange = (cat) => {
    if (cat === activeCategory) return;
    const el = containerRef.current;
    if (!el) {
      setActiveCategory(cat);
      setCycle((c) => c + 1);
      return;
    }

    el.style.transition = "";
    el.style.overflow = "";
    const start = el.getBoundingClientRect().height;
    el.style.height = start + "px";
    el.style.overflow = "hidden";
    el.style.willChange = "height";
    void el.offsetHeight;

    setActiveCategory(cat);
    setCycle((c) => c + 1);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const el2 = containerRef.current;
        if (!el2) return;
        const target = el2.scrollHeight;
        if (target === 0) return;
        el2.style.transition = "height 900ms cubic-bezier(.33,1,.68,1)";
        el2.style.height = target + "px";
      });
    });
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onEnd = (e) => {
      if (e.propertyName === "height") {
        const finalHeight = el.getBoundingClientRect().height;
        el.style.transition = "none";
        el.style.height = finalHeight + "px";
        setTimeout(() => {
          el.style.height = "";
          el.style.overflow = "";
          el.style.willChange = "";
        }, 40);
      }
    };
    el.addEventListener("transitionend", onEnd);
    return () => el.removeEventListener("transitionend", onEnd);
  }, []);

  const categoryLabels = {
    frontend: "Frontend & UI",
    backend: "Backend & APIs",
    data: "Database & Storage",
    tools: "DevOps & Tools",
    frameworks: "Frameworks",
    languages: "Languages",
  };

  const iconsMap = {
    SiJavascript,
    SiTypescript,
    SiPostgresql,
    FaPhp,
    FaPython,
    FaReact,
    SiNextdotjs,
    SiSupabase,
    SiLeaflet,
    SiVercel,
    FaLaravel,
    FaHtml5,
    FaCss3,
    SiTailwindcss,
    SiRedux,
    FaNodeJs,
    TbApi,
    GrMysql,
    FaGitAlt,
    FaGithub,
    SiGithubactions,
    SiJest,
    SiJira,
    FaAws,
    FaDocker,
  };

  const skills = useMemo(
    () => [
      {
        name: "JavaScript",
        iconKey: "SiJavascript",
        color: "text-icon-js",
        category: "languages",
        usage: "daily",
        tier: "core",
        since: 2021,
        usedFor: "app logic, debugging",
      },
      {
        name: "TypeScript",
        iconKey: "SiTypescript",
        color: "text-icon-ts",
        category: "languages",
        usage: "daily",
        tier: "core",
        since: 2022,
        usedFor: "types & refactors",
      },
      {
        name: "PHP",
        iconKey: "FaPhp",
        color: "text-icon-php",
        category: "languages",
        usage: "weekly",
        tier: "regular",
        since: 2022,
        usedFor: "feature work",
      },
      {
        name: "Python",
        iconKey: "FaPython",
        color: "text-icon-python",
        category: "languages",
        usage: "monthly",
        tier: "light",
        since: 2023,
        usedFor: "scripts & automation",
      },
      {
        name: "React",
        iconKey: "FaReact",
        color: "text-icon-react",
        category: "frameworks",
        usage: "daily",
        tier: "core",
        since: 2022,
        usedFor: "components & hooks",
      },
      {
        name: "Next.js",
        iconKey: "SiNextdotjs",
        color: "text-icon-nextjs",
        category: "frameworks",
        usage: "daily",
        tier: "core",
        since: 2023,
        usedFor: "SSR & routing",
      },
      {
        name: "Supabase",
        iconKey: "SiSupabase",
        color: "text-emerald-500",
        category: "data",
        usage: "weekly",
        tier: "regular",
        since: 2024,
        usedFor: "Auth & Postgres",
      },
      {
        name: "PostgreSQL",
        iconKey: "SiPostgresql",
        color: "text-sky-700 dark:text-sky-400",
        category: "data",
        usage: "weekly",
        tier: "regular",
        since: 2024,
        usedFor: "Relational data",
      },
      {
        name: "Leaflet.js",
        iconKey: "SiLeaflet",
        color: "text-green-600",
        category: "frontend",
        usage: "weekly",
        tier: "regular",
        since: 2024,
        usedFor: "Maps & markers",
      },
      {
        name: "Vercel",
        iconKey: "SiVercel",
        color: "text-black dark:text-white",
        category: "tools",
        usage: "weekly",
        tier: "regular",
        since: 2024,
        usedFor: "Serverless deploy",
      },
      {
        name: "Laravel",
        iconKey: "FaLaravel",
        color: "text-icon-laravel",
        category: "frameworks",
        usage: "weekly",
        tier: "regular",
        since: 2022,
        usedFor: "APIs & auth",
      },
      {
        name: "HTML5",
        iconKey: "FaHtml5",
        color: "text-icon-html",
        category: "frontend",
        usage: "daily",
        tier: "core",
        since: 2020,
        usedFor: "semantic markup",
      },
      {
        name: "CSS3",
        iconKey: "FaCss3",
        color: "text-icon-css",
        category: "frontend",
        usage: "daily",
        tier: "core",
        since: 2020,
        usedFor: "layout & theming",
      },
      {
        name: "TailwindCSS",
        iconKey: "SiTailwindcss",
        color: "text-icon-tailwind",
        category: "frontend",
        usage: "daily",
        tier: "core",
        since: 2023,
        usedFor: "utility styling",
      },
      {
        name: "Redux",
        iconKey: "SiRedux",
        color: "text-icon-redux",
        category: "frontend",
        usage: "weekly",
        tier: "regular",
        since: 2023,
        usedFor: "state management",
      },
      {
        name: "Node.js",
        iconKey: "FaNodeJs",
        color: "text-icon-node",
        category: "backend",
        usage: "weekly",
        tier: "regular",
        since: 2022,
        usedFor: "server-side JS",
      },
      {
        name: "REST APIs",
        iconKey: "TbApi",
        color: "text-gray-600 dark:text-gray-300",
        category: "backend",
        usage: "daily",
        tier: "core",
        since: 2022,
        usedFor: "endpoint design",
      },
      {
        name: "MySQL",
        iconKey: "GrMysql",
        color: "text-icon-mysql",
        category: "data",
        usage: "weekly",
        tier: "regular",
        since: 2022,
        usedFor: "queries & schema",
      },
      {
        name: "Git",
        iconKey: "FaGitAlt",
        color: "text-orange-600",
        category: "tools",
        usage: "daily",
        tier: "core",
        since: 2021,
        usedFor: "version control",
      },
      {
        name: "GitHub",
        iconKey: "FaGithub",
        color: "text-icon-github",
        category: "tools",
        usage: "daily",
        tier: "core",
        since: 2021,
        usedFor: "collaboration",
      },
      {
        name: "GitHub Actions",
        iconKey: "SiGithubactions",
        color: "text-blue-500",
        category: "tools",
        usage: "weekly",
        tier: "regular",
        since: 2023,
        usedFor: "CI/CD pipelines",
      },
      {
        name: "Jest",
        iconKey: "SiJest",
        color: "text-icon-jest",
        category: "tools",
        usage: "weekly",
        tier: "regular",
        since: 2023,
        usedFor: "unit testing",
      },
      {
        name: "Jira",
        iconKey: "SiJira",
        color: "text-blue-600",
        category: "tools",
        usage: "daily",
        tier: "regular",
        since: 2022,
        usedFor: "project tracking",
      },
      {
        name: "AWS",
        iconKey: "FaAws",
        color: "text-icon-aws",
        category: "tools",
        usage: "monthly",
        tier: "light",
        since: 2023,
        usedFor: "cloud services",
      },
      {
        name: "Docker",
        iconKey: "FaDocker",
        color: "text-icon-docker",
        category: "tools",
        usage: "monthly",
        tier: "light",
        since: 2023,
        usedFor: "containerization",
      },
    ],
    []
  );

  const tierLabel = {
    core: "Core",
    regular: "Regular",
    light: "Light",
    learning: "Learning",
  };
  const usageLabel = {
    daily: "Daily",
    weekly: "Weekly",
    monthly: "Monthly",
    learning: "Learning",
  };

  function Badge({ kind, type }) {
    const label = kind === "usage" ? usageLabel[type] : tierLabel[type];
    const tone =
      kind === "usage"
        ? isDarkMode
          ? "bg-white/5 text-light-gray/70 ring-1 ring-white/10"
          : "bg-light-primary/10 text-light-text/70 ring-1 ring-light-primary/20"
        : isDarkMode
        ? type === "core"
          ? "bg-lavender/25 text-lavender ring-1 ring-lavender/40 lavender-emphasis"
          : "bg-white/7 text-light-gray/70 ring-1 ring-white/10"
        : type === "core"
        ? "bg-light-primary/15 text-light-primary ring-1 ring-light-primary/25 text-shadow-subtle"
        : "bg-light-primary/10 text-light-text/70 ring-1 ring-light-primary/20";
    return (
      <span
        className={`inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-semibold tracking-wide uppercase select-none ${tone}`}
      >
        {label}
      </span>
    );
  }

  const grouped = useMemo(
    () =>
      skills.reduce((acc, s) => {
        acc[s.category] = acc[s.category] || [];
        acc[s.category].push(s);
        return acc;
      }, {}),
    [skills]
  );

  const categoryOrder = [
    "frontend",
    "frameworks",
    "languages",
    "backend",
    "data",
    "tools",
  ].filter((c) => grouped[c]);

  return (
    <section aria-labelledby="skills-heading" className="relative">
      <div className="text-center mb-8 sm:mb-10">
        <h2
          id="skills-heading"
          className={`text-[clamp(2.25rem,5vw,3.5rem)] font-bold tracking-tight leading-tight mb-4 text-shadow-soft ${
            isDarkMode ? "text-light-gray" : "text-light-text accent-shadow"
          }`}
        >
          Technical Skills
        </h2>
        <p
          className={`mx-auto max-w-3xl text-sm sm:text-base 2xl:text-xl px-3 sm:px-4 leading-relaxed ${
            isDarkMode ? "text-light-gray" : "text-light-text/85"
          }`}
        >
          Tools I reach for daily: React + TypeScript for the front end, PHP /
          Laravel and Python when it fits, MySQL for the reliable bits, and
          Tailwind so I can move fast without trashing accessibility or
          performance.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {categoryOrder.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium leading-none tracking-tight transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-lavender/60 dark:focus-visible:ring-lavender/70 focus-visible:ring-offset-transparent select-none ${
                activeCategory === cat
                  ? isDarkMode
                    ? "bg-lavender/30 text-lavender lavender-emphasis font-semibold ring-1 ring-lavender/50 shadow-[0_0_0_1px_rgba(124,58,237,0.15)]"
                    : "bg-light-primary/20 text-light-primary font-semibold ring-1 ring-light-primary/30 shadow-[0_0_0_1px_rgba(124,58,237,0.15)]"
                  : isDarkMode
                  ? "text-light-gray/85 ring-1 ring-white/8 hover:ring-white/15 hover:bg-white/6 hover:text-light-gray/95 focus-visible:ring-lavender/60"
                  : "text-light-text/85 ring-1 ring-light-primary/15 hover:ring-light-primary/30 hover:bg-light-primary/12 hover:text-light-text/95 focus-visible:ring-light-primary/50"
              }`}
              aria-pressed={activeCategory === cat}
              aria-controls="skills-grid"
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>

        {/* Skills Container (responsive height) */}
        <div
          ref={containerRef}
          key={activeCategory + "-container"}
          aria-live="polite"
          id="skills-grid"
          className="flex flex-wrap justify-center gap-4 sm:gap-6 pt-1 px-1 transition-[height]"
        >
          {grouped[activeCategory]?.map((skill, idx) => {
            const Icon = iconsMap[skill.iconKey];
            if (!Icon) {
              return (
                <div
                  key={skill.name}
                  className="w-[260px] p-4 text-xs text-red-500 border border-red-500/40 rounded shadow-sm bg-red-50/10"
                >
                  Missing icon: {skill.name}
                </div>
              );
            }
            const years = new Date().getFullYear() - skill.since;
            const reduce = prefersReducedMotion.current;
            const baseDelay = reduce ? 0 : 80 + idx * 90; // slower staggered materialization
            const animateClass = reduce
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2 animate-[materialize_0.85s_cubic-bezier(.33,1,.68,1)_forwards]";
            return (
              <div
                key={skill.name + cycle}
                className={`group relative w-[260px] flex flex-col items-center justify-start rounded-xl border backdrop-blur-sm overflow-hidden p-4 will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender/60 dark:focus-visible:ring-lavender/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
                  isDarkMode
                    ? "border-white/5 bg-white/[0.04] hover:bg-white/[0.07]"
                    : "border-light-primary/15 bg-light-primary/5 hover:bg-light-primary/10"
                } shadow-sm hover:shadow-md transition-all duration-500 ${animateClass}`}
                style={
                  reduce ? undefined : { animationDelay: `${baseDelay}ms` }
                }
                tabIndex={0}
              >
                <div className="absolute inset-px rounded-[inherit] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-white/20 via-transparent to-white/5 dark:from-lavender/20 dark:to-white/5" />
                <div
                  className={`relative size-16 flex items-center justify-center rounded-full mb-3 transition-all duration-700 group-hover:scale-105 ring-1 shadow-[0_4px_10px_-2px_rgba(0,0,0,0.25)] ${
                    isDarkMode
                      ? "bg-[radial-gradient(circle_at_40%_35%,rgba(255,255,255,0.12),rgba(255,255,255,0.04))] ring-white/15"
                      : "bg-[radial-gradient(circle_at_40%_35%,rgba(0,0,0,0.05),rgba(0,0,0,0.10))] ring-light-primary/20"
                  }`}
                >
                  <Icon
                    aria-hidden="true"
                    className={`size-9 drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)] ${skill.color}`}
                  />
                </div>
                <h4
                  className={`text-sm font-medium mb-2 ${
                    isDarkMode ? "text-light-gray" : "text-light-text"
                  }`}
                >
                  {skill.name}
                </h4>
                <div className="flex gap-1 flex-wrap justify-center">
                  <Badge kind="usage" type={skill.usage} />
                  <Badge kind="tier" type={skill.tier} />
                </div>
                {skill.usedFor && (
                  <p
                    className={`mt-3 text-[11px] leading-snug text-center ${
                      isDarkMode ? "text-light-gray/60" : "text-light-text/60"
                    }`}
                    title={skill.usedFor}
                  >
                    {skill.usedFor}
                  </p>
                )}
                <span className="sr-only">
                  {skill.name} – {skill.tier} skill – {skill.usage} use – since{" "}
                  {skill.since} ({years} year{years !== 1 ? "s" : ""}) –{" "}
                  {skill.usedFor}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Experience blurb */}
      <div
        className={`mt-10 text-center text-sm sm:text-base leading-7 2xl:text-lg px-6 max-w-5xl mx-auto ${
          isDarkMode ? "text-light-gray" : "text-light-text/85"
        }`}
      >
        <p>
          Shipped profile customization, subscription & trial flows, newsletter
          revamps and more at MediaNews Group. Earlier, owned a real‑estate lead
          gen product used by thousands at Inside Real Estate. I move between UI
          polish, accessibility passes, and the API/data layer glue.
        </p>
      </div>
    </section>
  );
}

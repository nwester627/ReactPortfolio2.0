import {
  FaReact,
  FaPhp,
  FaLaravel,
  FaHtml5,
  FaCss3,
  FaPython,
} from "react-icons/fa";
import { SiTypescript, SiJavascript, SiTailwindcss } from "react-icons/si";
import { GrMysql } from "react-icons/gr";
import { useTheme } from "@/context/ThemeContext";
import { useMemo } from "react";

export default function Skills() {
  const { isDarkMode } = useTheme();

  // Central skill definitions for consistency & easier future edits
  const skills = useMemo(
    () => [
      { name: "JavaScript", icon: SiJavascript, color: "text-icon-js" },
      { name: "TypeScript", icon: SiTypescript, color: "text-icon-ts" },
      { name: "React", icon: FaReact, color: "text-icon-react" },
      { name: "PHP", icon: FaPhp, color: "text-icon-php" },
      { name: "Laravel", icon: FaLaravel, color: "text-icon-laravel" },
      { name: "HTML5", icon: FaHtml5, color: "text-icon-html" },
      { name: "CSS3", icon: FaCss3, color: "text-icon-css" },
      { name: "Python", icon: FaPython, color: "text-icon-python" },
      { name: "MySQL", icon: GrMysql, color: "text-icon-mysql" },
      { name: "TailwindCSS", icon: SiTailwindcss, color: "text-icon-tailwind" },
    ],
    []
  );

  return (
    <section aria-labelledby="skills-heading" className="relative">
      <div className="text-center mb-10">
        <h2
          id="skills-heading"
          className={`text-[clamp(2.25rem,5vw,3.5rem)] font-bold tracking-tight leading-tight mb-4 ${
            isDarkMode ? "text-light-gray" : "text-light-text"
          }`}
        >
          Technical Skills
        </h2>
        <p
          className={`mx-auto max-w-3xl text-base sm:text-lg 2xl:text-xl px-4 leading-relaxed ${
            isDarkMode ? "text-light-gray" : "text-light-text"
          }`}
        >
          Tools I reach for daily: React + TypeScript for the front end, PHP /
          Laravel and Python when it fits, MySQL for the reliable bits, and
          Tailwind so I can move fast without trashing accessibility or
          performance.
        </p>
      </div>

      {/* Icon Grid */}
      <ul
        role="list"
        className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5 lg:gap-6 max-w-5xl mx-auto px-4"
      >
        {skills.map((skill, idx) => {
          const Icon = skill.icon;
          return (
            <li key={skill.name} className="flex">
              <div
                className={`skill-fade motion-safe:skill-fade group relative flex-1 flex flex-col items-center justify-center rounded-xl border backdrop-blur-sm overflow-hidden ${
                  isDarkMode
                    ? "border-white/5 bg-white/[0.04] hover:bg-white/[0.07]"
                    : "border-light-primary/15 bg-light-primary/5 hover:bg-light-primary/10"
                } shadow-sm hover:shadow-md transition-all duration-300 focus-within:ring-2 focus-within:ring-lavender/50`}
                style={{ animationDelay: `${idx * 55}ms` }}
              >
                <div
                  className="absolute inset-px rounded-[inherit] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/20 via-transparent to-white/5 dark:from-lavender/20 dark:to-white/5"
                  aria-hidden="true"
                />
                <div className="mt-4 mb-2 relative">
                  <div
                    className={`relative size-16 sm:size-20 flex items-center justify-center rounded-full transition-all duration-500 group-hover:scale-105 group-active:scale-95 ring-1 shadow-[0_4px_10px_-2px_rgba(0,0,0,0.25)] ${
                      isDarkMode
                        ? "bg-[radial-gradient(circle_at_40%_35%,rgba(255,255,255,0.12),rgba(255,255,255,0.04))] bg-space/70 ring-white/15"
                        : "bg-[radial-gradient(circle_at_40%_35%,rgba(0,0,0,0.10),rgba(0,0,0,0.18))] bg-white/95 ring-light-primary/25"
                    }`}
                  >
                    <Icon
                      aria-hidden="true"
                      className={`size-9 sm:size-11 drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)] ${skill.color}`}
                    />
                  </div>
                </div>
                <p
                  className={`pb-3 text-xs sm:text-sm font-medium tracking-wide ${
                    isDarkMode ? "text-light-gray/90" : "text-light-text/90"
                  }`}
                >
                  {skill.name}
                </p>
                <span className="sr-only">{skill.name} skill</span>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Experience blurb */}
      <div
        className={`mt-10 text-center text-sm sm:text-base leading-7 2xl:text-lg px-6 max-w-5xl mx-auto ${
          isDarkMode ? "text-light-gray" : "text-light-text"
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

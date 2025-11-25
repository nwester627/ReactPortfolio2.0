import { useTheme } from "@/context/ThemeContext";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaPhp,
  FaLaravel,
  FaAws,
  FaDocker,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaCss3,
} from "react-icons/fa";
import {
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiPostgresql,
  SiSupabase,
  SiRedux,
  SiJest,
  SiFastapi,
  SiVercel,
  SiJira,
  SiGithubactions,
  SiLeaflet,
} from "react-icons/si";
import { GrMysql } from "react-icons/gr";
import { TbApi } from "react-icons/tb";

// Map technology names to icon components
const techToIcon = {
  React: FaReact,
  "Next.js": SiNextdotjs,
  Tailwind: SiTailwindcss,
  "Tailwind CSS": SiTailwindcss,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  "Node.js": FaNodeJs,
  Python: FaPython,
  PHP: FaPhp,
  Laravel: FaLaravel,
  MySQL: GrMysql,
  PostgreSQL: SiPostgresql,
  Supabase: SiSupabase,
  AWS: FaAws,
  Docker: FaDocker,
  Git: FaGitAlt,
  GitHub: FaGithub,
  HTML5: FaHtml5,
  CSS3: FaCss3,
  Redux: SiRedux,
  Jest: SiJest,
  FastAPI: SiFastapi,
  "REST APIs": TbApi,
  Vercel: SiVercel,
  Jira: SiJira,
  "GitHub Actions": SiGithubactions,
  Leaflet: SiLeaflet,
};

export default function StackClusterAvatar({ technologies, size = 56 }) {
  const { isDarkMode } = useTheme();

  // Take only the first 3 technologies to avoid overcrowding
  const displayTechs = technologies.slice(0, 3);
  const remainingCount = technologies.length - displayTechs.length;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* Background circle */}
      <div
        className={`absolute inset-0 rounded-full border-2 ${
          isDarkMode
            ? "border-white/10 bg-white/[0.02]"
            : "border-light-primary/20 bg-light-primary/5"
        }`}
      />

      {/* Technology icons in cluster */}
      <div className="relative flex items-center justify-center">
        {displayTechs.map((tech, index) => {
          const IconComponent = techToIcon[tech];
          if (!IconComponent) return null;

          // Position icons in a cluster pattern
          const positions = [
            { x: 0, y: 0 }, // center
            { x: -8, y: -8 }, // top-left
            { x: 8, y: -8 }, // top-right
          ];

          const pos = positions[index] || { x: 0, y: 0 };
          const iconSize = size * 0.35; // Icon size relative to container

          return (
            <div
              key={tech}
              className={`absolute rounded-full flex items-center justify-center ${
                isDarkMode
                  ? "bg-white/15 border border-white/30"
                  : "bg-light-primary/20 border border-light-primary/40"
              }`}
              style={{
                width: iconSize,
                height: iconSize,
                left: `calc(50% + ${pos.x}px - ${iconSize / 2}px)`,
                top: `calc(50% + ${pos.y}px - ${iconSize / 2}px)`,
                zIndex: 10 - index, // Higher index for earlier items
              }}
            >
              <IconComponent
                className={`w-3/4 h-3/4 ${
                  isDarkMode ? "text-light-gray" : "text-light-text"
                }`}
                aria-hidden="true"
              />
            </div>
          );
        })}
      </div>

      {/* Remaining count indicator */}
      {remainingCount > 0 && (
        <div
          className={`absolute bottom-0 right-0 rounded-full flex items-center justify-center text-xs font-semibold ${
            isDarkMode
              ? "bg-lavender/20 text-lavender border border-lavender/40"
              : "bg-light-primary/20 text-light-primary border border-light-primary/40"
          }`}
          style={{
            width: size * 0.25,
            height: size * 0.25,
          }}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
}

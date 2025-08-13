import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FaArrowRight, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";
import ProjectModal from "./ProjectModal";
import discordBot from "../../assets/images/discordBot.png";
import inventoryManagement from "../../assets/images/inventorymanagementproject.png";
import videoGames from "../../assets/images/videogames.jpeg";
import webDeveloper from "../../assets/images/webdeveloper.jpg";

const projectsData = [
  {
    id: 1,
    title: "Discord Bot",
    description:
      "Python bot handling moderation, media queue playback, announcements and a few hidden jokes.",
    image: discordBot,
    technologies: ["Python", "Discord.py", "SQLite", "APIs"],
    features: [
      "Moderation tools",
      "Media queue playback",
      "Announcements",
      "Custom commands",
      "Hidden easter eggs",
    ],
    challenges:
      "Keeping audio responsive while juggling commands—fixed with async tasks and a lightweight queue.",
    githubUrl: "https://github.com/nwester627/discordBot",
    liveUrl: null,
  },
  {
    id: 2,
    title: "Inventory Tracker",
    description:
      "Java / JavaFX app for managing parts and products with search, persistence and simple tracking.",
    image: inventoryManagement,
    technologies: ["Java", "JavaFX", "SQL", "Scene Builder"],
    features: [
      "Parts & products CRUD",
      "Search",
      "Stock tracking",
      "Persistent storage",
      "Clean desktop UI",
    ],
    challenges:
      "Balancing UI clarity with relational data—solved by a small model layer instead of fat controllers.",
    githubUrl: "https://github.com/nwester627/schoolProject",
    liveUrl: null,
  },
  {
    id: 3,
    title: "Video Game Royale",
    description:
      "In‑progress hub for tournaments and stats; early groundwork on data model and bracket logic.",
    image: videoGames,
    technologies: ["React", "JavaScript", "CSS", "APIs"],
    features: [
      "Brackets",
      "Live scoring (planned)",
      "Player profiles",
      "Real‑time updates (planned)",
      "Game stats",
    ],
    challenges:
      "Upcoming focus: consistent real‑time updates without stale client state.",
    githubUrl: null,
    liveUrl: null,
  },
  {
    id: 4,
    title: "Portfolio Website",
    description:
      "This site: Next.js + Tailwind, dark/light theme, project modals, contact form, and some glass UI polish.",
    image: webDeveloper,
    technologies: ["React", "Next.js", "Tailwind CSS", "JavaScript"],
    features: [
      "Responsive layout",
      "Theme toggle",
      "Project modals",
      "Contact form",
      "Subtle animations",
    ],
    challenges:
      "Avoiding theme flash and keeping contrast tight—handled with context + careful palette choices.",
    githubUrl: "https://github.com/nwester627/ReactPortfolio2.0",
    liveUrl: "https://www.nicolaswester.com",
  },
];

export default function Projects() {
  const { isDarkMode } = useTheme();
  const [selectedProject, setSelectedProject] = useState(null);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      prefersReducedMotion.current = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
    }
  }, []);

  return (
    <section aria-labelledby="projects-heading" className="px-4 py-12">
      <div className="text-center mb-12">
        <h3
          id="projects-heading"
          className={`text-[clamp(2.25rem,5vw,3.5rem)] font-bold tracking-tight leading-tight mb-4 ${
            isDarkMode ? "text-light-gray" : "text-light-text accent-shadow"
          }`}
        >
          Projects I've Worked On
        </h3>
        <p
          className={`mx-auto max-w-3xl text-base sm:text-lg leading-relaxed px-4 ${
            isDarkMode ? "text-light-gray/85" : "text-light-text/85"
          }`}
        >
          A few shipped pieces and works‑in‑progress. Click a card for a quick
          dive into context, choices and constraints.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 px-2 sm:px-4 max-w-7xl mx-auto">
        {projectsData.map((project, idx) => {
          const reduce = prefersReducedMotion.current;
          const delay = reduce ? 0 : 80 + idx * 110;
          return (
            <article
              key={project.id}
              onClick={() => setSelectedProject(project)}
              tabIndex={0}
              aria-label={`Open details for ${project.title}`}
              className={`group relative flex flex-col rounded-xl overflow-hidden h-[460px] w-full max-w-sm mx-auto cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-lavender/60 focus-visible:ring-offset-transparent border backdrop-blur-sm will-change-transform transition-all duration-700 ${
                isDarkMode
                  ? "border-white/8 bg-white/[0.04] hover:bg-white/[0.07] shadow-[0_4px_18px_-5px_rgba(0,0,0,0.45)]"
                  : "border-light-primary/15 bg-light-primary/5 hover:bg-light-primary/10 shadow-[0_4px_18px_-6px_rgba(0,0,0,0.25)]"
              } ${
                reduce
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-3 animate-[materialize_0.9s_cubic-bezier(.33,1,.68,1)_forwards]"
              }`}
              style={reduce ? undefined : { animationDelay: `${delay}ms` }}
            >
              <div className="absolute inset-px rounded-[inherit] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-white/25 via-transparent to-white/5 dark:from-lavender/25 dark:to-white/5" />
              <div className="relative w-full h-48 overflow-hidden">
                <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-black/0 via-black/40 to-black/70">
                  <div className="flex gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-full bg-white/15 backdrop-blur-sm hover:bg-white/25 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                        aria-label={`${project.title} source code`}
                      >
                        <FaGithub className="w-5 h-5 text-white" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-full bg-white/15 backdrop-blur-sm hover:bg-white/25 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                        aria-label={`${project.title} live demo`}
                      >
                        <FaExternalLinkAlt className="w-5 h-5 text-white" />
                      </a>
                    )}
                  </div>
                </div>
                <Image
                  src={project.image.src}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-[1400ms] group-hover:scale-110 group-hover:brightness-90"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="flex flex-col justify-between flex-grow p-5">
                <div>
                  <h5
                    className={`mb-2 text-2xl font-bold tracking-tight ${
                      isDarkMode
                        ? "text-light-gray"
                        : "text-light-text bg-gradient-to-r from-light-primary/90 to-light-primary bg-clip-text text-transparent"
                    }`}
                  >
                    {project.title}
                  </h5>
                  <p
                    className={`mb-3 font-normal line-clamp-3 ${
                      isDarkMode ? "text-light-gray/85" : "text-light-text/80"
                    }`}
                  >
                    {project.description}
                  </p>
                </div>
                <div className="mt-auto space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span
                        key={index}
                        className={`px-2.5 py-1.5 text-[0.65rem] sm:text-[0.70rem] font-semibold tracking-wide rounded-md uppercase ring-1 shadow-sm select-none ${
                          isDarkMode
                            ? "bg-white/5 text-light-gray/70 ring-white/10"
                            : "bg-light-primary/10 text-light-text/70 ring-light-primary/20"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span
                        className={`px-2.5 py-1.5 text-[0.65rem] sm:text-[0.70rem] font-semibold tracking-wide rounded-md uppercase ring-1 shadow-sm select-none ${
                          isDarkMode
                            ? "bg-white/5 text-light-gray/70 ring-white/10"
                            : "bg-light-primary/10 text-light-text/70 ring-light-primary/20"
                        }`}
                      >
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(project);
                    }}
                    className={`w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm sm:text-base tracking-tight border backdrop-blur-sm shadow-sm hover:shadow-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-lavender/60 focus-visible:ring-offset-transparent ${
                      isDarkMode
                        ? "bg-white/10 hover:bg-lavender/30 text-light-gray border-white/10"
                        : "bg-light-primary/10 hover:bg-lavender/30 text-light-text border-light-primary/20"
                    }`}
                    aria-label={`View details for ${project.title}`}
                  >
                    View Details
                    <FaArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}

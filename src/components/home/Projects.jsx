import { useState } from "react";
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

  return (
    <div className="px-4 py-8">
      <h3
        className={`text-5xl py-4 text-center 2xl:text-6xl mb-8 ${
          isDarkMode ? "text-light-gray" : "text-light-text"
        }`}
      >
        Projects I've Worked On
      </h3>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 px-4 sm:px-8">
        {projectsData.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className={`flex flex-col rounded-lg shadow-lg overflow-hidden h-[440px] w-full max-w-sm mx-auto transition-all duration-500 ease-in-out hover:scale-[1.02] hover:shadow-xl cursor-pointer ${
              isDarkMode
                ? "bg-space border border-gray-700 shadow-black/30"
                : "bg-gradient-to-b from-white via-light-surface to-light-accent/30 border border-light-primary/10 shadow-light-primary/10"
            }`}
          >
            <div className="relative w-full h-48 group overflow-hidden">
              {/* Overlay with quick actions */}
              <div
                className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/60 z-10
                group-hover:from-black/50 group-hover:via-black/40 group-hover:to-black/70 
                transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100"
              >
                <div className="flex gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
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
                      className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
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
                className="rounded-t-lg object-cover transition-all duration-700 
                  group-hover:scale-110 group-hover:filter group-hover:brightness-90"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div
              className={`flex flex-col justify-between flex-grow p-5 transition-colors duration-500
              ${
                isDarkMode
                  ? "bg-blackish-blue"
                  : "bg-gradient-to-b from-light-surface via-light-container to-white backdrop-blur-sm"
              }`}
            >
              <div>
                <h5
                  className={`mb-2 text-2xl font-bold tracking-tight transition-colors duration-500 ${
                    isDarkMode
                      ? "text-white"
                      : "text-light-text bg-gradient-to-r from-light-primary/90 to-light-primary bg-clip-text text-transparent"
                  }`}
                >
                  {project.title}
                </h5>
                <p
                  className={`mb-3 font-normal line-clamp-3 transition-colors duration-500 ${
                    isDarkMode ? "text-light-gray" : "text-light-secondary"
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
                      className={`px-2.5 py-1.5 text-[0.70rem] sm:text-xs font-medium rounded-full ${
                        isDarkMode
                          ? "bg-blackish-blue text-lavender border border-lavender/20"
                          : "bg-light-surface text-light-primary border border-light-primary/20"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span
                      className={`px-2.5 py-1.5 text-[0.70rem] sm:text-xs font-medium rounded-full ${
                        isDarkMode
                          ? "bg-blackish-blue text-lavender border border-lavender/20"
                          : "bg-light-surface text-light-primary border border-light-primary/20"
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
                  className={`w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm sm:text-base tracking-tight transition-colors border backdrop-blur-sm shadow-md hover:shadow-lg ${
                    isDarkMode
                      ? "bg-white/10 hover:bg-lavender text-light-gray border-white/10"
                      : "bg-light-primary/10 hover:bg-lavender text-light-text border-light-primary/20"
                  }`}
                  aria-label={`View details for ${project.title}`}
                >
                  View Details
                  <FaArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}

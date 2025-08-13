import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FaTimes, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";
import Portal from "@/components/common/Portal";

const LoadingSpinner = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-gray-900/20 backdrop-blur-sm">
    <div className="w-10 h-10 border-4 border-light-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

function ImagePreview({ project, onClose, isLoading, setIsLoading }) {
  return (
    <div className="fixed inset-0 z-[100]">
      <div
        className="fixed inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close image preview"
      />
      <div className="fixed inset-0 flex items-center justify-center p-3 sm:p-6">
        <div
          className="relative w-full h-full max-w-[92vw] max-h-[92vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {isLoading && <LoadingSpinner />}
          <Image
            src={project.image.src}
            alt={project.title}
            fill
            className="object-contain"
            sizes="(max-width:768px) 92vw, 80vw"
            priority
            quality={95}
            onLoadingComplete={() => setIsLoading(false)}
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-light-primary/70 transition-colors"
            aria-label="Close preview"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProjectModal({ project, onClose }) {
  const { isDarkMode } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);
  const dialogRef = useRef(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") isZoomed ? setIsZoomed(false) : onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose, isZoomed]);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  if (!project) return null;

  const chipClass = isDarkMode
    ? "bg-blackish-blue text-lavender border border-lavender/20"
    : "bg-light-surface text-light-primary border border-light-primary/20";

  const actionBase = isDarkMode
    ? "bg-blackish-blue text-white hover:bg-lavender hover:text-space"
    : "bg-light-surface text-light-primary hover:bg-light-primary hover:text-white";

  return (
    <>
      {isZoomed && (
        <Portal>
          <ImagePreview
            project={project}
            onClose={() => setIsZoomed(false)}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </Portal>
      )}
      <Portal>
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 md:p-8"
          aria-live="polite"
        >
          <div
            className="fixed inset-0 bg-black/50"
            onClick={onClose}
            aria-label="Close project modal"
          />
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            tabIndex={-1}
            className={`relative z-[65] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl focus:outline-none ${
              isDarkMode
                ? "bg-space border border-gray-700 text-light-gray"
                : "bg-gradient-to-b from-white via-light-surface to-light-accent/30 border border-light-primary/10 text-light-text"
            }`}
          >
            <button
              onClick={onClose}
              className={`absolute top-4 right-4 z-10 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-light-primary/60 transition-colors ${
                isDarkMode
                  ? "bg-blackish-blue/60 text-light-gray hover:text-white hover:bg-blackish-blue/70"
                  : "bg-white/60 text-light-secondary hover:text-light-primary hover:bg-white/80"
              }`}
              aria-label="Close project modal"
            >
              <FaTimes className="w-5 h-5" />
            </button>
            <div className="p-5 sm:p-6 md:p-8">
              <div
                className="relative w-full h-56 sm:h-64 md:h-80 mb-6 rounded-lg overflow-hidden group cursor-pointer"
                onClick={() => setIsZoomed(true)}
                aria-label="Open full-size image preview"
              >
                {isLoading && <LoadingSpinner />}
                <Image
                  src={project.image.src}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  onLoadingComplete={() => setIsLoading(false)}
                />
              </div>
              <div className="space-y-6">
                <h3
                  id="project-modal-title"
                  className="text-2xl sm:text-3xl font-bold tracking-tight"
                >
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 rounded-full text-xs sm:text-sm ${chipClass}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="space-y-4 text-sm sm:text-base leading-relaxed">
                  <p>{project.description}</p>
                  {project.features?.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-lg font-semibold">Key Features</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {project.features.map((f, i) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {project.challenges && (
                    <div className="space-y-2">
                      <h4 className="text-lg font-semibold">
                        Challenges & Solutions
                      </h4>
                      <p>{project.challenges}</p>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-4 pt-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${actionBase}`}
                      aria-label="View source code on GitHub"
                    >
                      <FaGithub className="w-5 h-5" />
                      <span>View Code</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${actionBase}`}
                      aria-label="Open live demo"
                    >
                      <FaExternalLinkAlt className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Portal>
    </>
  );
}

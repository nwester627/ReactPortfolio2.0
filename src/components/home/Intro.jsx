import { FaLinkedin, FaGithubSquare, FaCloudDownloadAlt } from "react-icons/fa";
import GlassButton from "../common/GlassButton";
import { useTheme } from "../../context/ThemeContext";

export default function Intro() {
  const { isDarkMode } = useTheme();

  return (
    <div className="relative">
      <div
        className="hero-bg-accent rounded-2xl absolute inset-0"
        aria-hidden="true"
      />

      <div className="px-2 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-10 lg:py-14">
        <div className="h-1 sm:h-2 lg:h-3" />

        <h4
          className={`text-xl sm:text-2xl lg:text-3xl xl:text-4xl pt-1 sm:pt-2 pb-4 sm:pb-6 font-medium text-center md:text-left text-shadow-subtle leading-relaxed max-w-4xl ${
            isDarkMode ? "text-light-gray" : "text-light-text"
          }`}
        >
          Full Stack Developer
        </h4>

        <div className="max-w-2xl">
          <p
            className={`text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed mb-3 ${
              isDarkMode ? "text-light-gray/90" : "text-light-secondary/90"
            }`}
          >
            Specializing in modern web technologies with{" "}
            <span
              className={`font-semibold ${
                isDarkMode ? "text-lavender" : "text-light-primary"
              }`}
            >
              3+ years
            </span>{" "}
            of production experience building scalable applications.
          </p>
          <p
            className={`text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed mb-3 ${
              isDarkMode ? "text-light-gray/90" : "text-light-secondary/90"
            }`}
          >
            Building with{" "}
            <code
              className={`px-2 py-1 rounded text-xs sm:text-sm font-mono ${
                isDarkMode
                  ? "bg-lavender/20 text-lavender code-text-shadow-dark"
                  : "bg-light-primary/20 text-light-primary"
              }`}
            >
              React/Next.js
            </code>
            ,{" "}
            <code
              className={`px-2 py-1 rounded text-xs sm:text-sm font-mono ${
                isDarkMode
                  ? "bg-lavender/20 text-lavender code-text-shadow-dark"
                  : "bg-light-primary/20 text-light-primary"
              }`}
            >
              PHP/Laravel
            </code>
            , and cloud-native architectures.
          </p>
          <p
            className={`text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed mb-4 ${
              isDarkMode ? "text-light-gray/80" : "text-light-secondary/80"
            }`}
          >
            Passionate about clean code, performance optimization, and
            delivering exceptional user experiences.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 lg:gap-6 items-stretch lg:items-center justify-start mt-4 max-w-xl">
          <GlassButton
            href="https://www.linkedin.com/in/nicolaswester/"
            icon={<FaLinkedin className="inline-flex text-lg sm:text-xl" />}
            variant="outline"
            size="lg"
            aria-label="LinkedIn"
            className="w-full sm:w-auto"
          >
            LinkedIn
          </GlassButton>

          <GlassButton
            href="https://github.com/nwester627"
            icon={<FaGithubSquare className="inline-flex text-lg sm:text-xl" />}
            variant="outline"
            size="lg"
            aria-label="GitHub"
            className="w-full sm:w-auto"
          >
            GitHub
          </GlassButton>

          <GlassButton
            href="https://drive.google.com/file/d/1_DePivPW1flvdJNDMHOFUk9TU8NDpQxq/view?usp=sharing"
            icon={
              <FaCloudDownloadAlt className="inline-flex text-lg sm:text-xl" />
            }
            variant="primary"
            size="lg"
            className="w-full sm:w-auto"
          >
            Resume
          </GlassButton>
        </div>
      </div>
    </div>
  );
}

import { Typewriter } from "react-simple-typewriter";
import { FaLinkedin, FaGithubSquare, FaCloudDownloadAlt } from "react-icons/fa";
import GlassButton from "../common/GlassButton";
import { useState, useCallback } from "react";
import { useTheme } from "../../context/ThemeContext";
import WebDevDark from "./svgs/WebDevDark";
import WebDevLight from "./svgs/WebDevLight";

// HeroIllustration (formerly Headshot): themed SVG hero art with subtle effects
function HeroIllustration({
  isDarkMode,
  onActivate,
  showSecret,
  variant = "card",
}) {
  const containerBase = "relative group outline-none";
  // Align width with other containers by letting the wrapper be full-width within its parent;
  // cap the actual illustration with a responsive max width and keep a square aspect.
  const sizeClasses = "w-full aspect-square max-w-[28rem] md:max-w-[32rem]";
  const rounded = variant === "circle" ? "rounded-full" : "rounded-[2rem]";
  const frame = isDarkMode
    ? "border border-white/10 bg-gradient-to-b from-space via-space to-blackish-blue backdrop-blur-xl"
    : "border border-light-primary/20 bg-gradient-to-b from-white via-light-surface to-light-container backdrop-blur-xl";
  const overlayShade = isDarkMode ? "bg-white/5" : "bg-black/5"; // subtle tint for contrast without dulling colors
  const edgeGradient = isDarkMode
    ? "from-lavender/40 via-blue-500/30 to-purple-600/40"
    : "from-light-primary/50 via-lavender/40 to-light-text/20";

  return (
    <div className={`${containerBase} ${sizeClasses} ${rounded} mx-auto`}>
      <div
        className={`absolute inset-0 ${rounded} pointer-events-none blur-3xl opacity-20 -z-10 bg-gradient-to-tr ${edgeGradient}`}
        aria-hidden="true"
      />
      <div
        className={`${rounded} p-[1px] bg-gradient-to-tr ${edgeGradient} shadow-xl md:shadow-2xl`}
      >
        <button
          type="button"
          onClick={onActivate}
          onKeyDown={(e) =>
            (e.key === "Enter" || e.key === " ") && onActivate()
          }
          aria-label="Decorative web design layout illustration – activate for a fun secret after several clicks"
          className={`relative block w-full h-full ${rounded} overflow-hidden transition-colors duration-300 ${frame} before:absolute before:inset-0 before:rounded-[inherit] before:pointer-events-none before:ring-1 before:ring-white/20 before:dark:ring-white/10 before:mix-blend-overlay after:absolute after:inset-0 after:rounded-[inherit] after:pointer-events-none after:bg-gradient-to-tr after:from-white/0 after:via-white/10 after:to-white/0 after:opacity-0 group-hover:after:opacity-100 after:transition-opacity after:duration-500 motion-reduce:group-hover:after:opacity-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent`}
        >
          <span
            className={`relative w-full h-full block transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:group-hover:scale-100 ${
              showSecret ? "scale-105" : "scale-100"
            }`}
          >
            {/* subtle overlay behind illustration for depth */}
            <span
              className={`absolute inset-0 z-0 ${overlayShade} ${rounded}`}
            />
            <div className="w-full h-full flex items-center justify-center p-4 md:p-6 relative z-10 select-none">
              {isDarkMode ? (
                <WebDevDark className="w-full h-full" />
              ) : (
                <WebDevLight className="w-full h-full" />
              )}
            </div>
          </span>
        </button>
      </div>
    </div>
  );
}

export default function Intro() {
  const [clickCount, setClickCount] = useState(0);
  const [showSecretMessage, setShowSecretMessage] = useState(false);
  const { isDarkMode } = useTheme();

  const handlePortraitClick = useCallback(() => {
    const newCount = clickCount + 1;
    if (newCount === 7) {
      setShowSecretMessage(true);
      setTimeout(() => setShowSecretMessage(false), 3000);
    }
    setClickCount(newCount === 7 ? 0 : newCount);
  }, [clickCount]);

  return (
    <div>
      <div className="text-center px-4 sm:px-6 pt-10 sm:pt-12 pb-6 sm:pb-8 sm:p-10 drop-shadow-2xl">
        <h1
          className={`hero-fade text-[clamp(2.75rem,6vw,4.25rem)] py-2 font-bold tracking-tight leading-tight bg-gradient-to-r text-shadow-soft ${
            isDarkMode
              ? "from-lavender via-light-gray to-white/80"
              : "from-light-primary via-lavender to-light-text accent-shadow"
          } bg-clip-text text-transparent`}
        >
          Nicolas Wester
        </h1>
        <h2
          className={`hero-fade-delay text-2xl py-2 font-medium 2xl:text-3xl min-h-[2.5rem] 2xl:min-h-[3.25rem] text-shadow-subtle ${
            isDarkMode
              ? "text-lavender lavender-emphasis"
              : "text-light-primary accent-shadow"
          }`}
        >
          <Typewriter
            words={[
              "Full Stack Developer",
              "React Enthusiast",
              "WGU Alumni",
              ...(Math.random() < 0.1
                ? ["Secret Message: I love cats! 🐱"]
                : []), // 10% chance of showing secret message
            ]}
            loop={false}
            cursor={true}
            deleteSpeed={100}
            typeSpeed={100}
            delaySpeed={500}
            cursorBlinking={false}
          />
        </h2>
      </div>
      <div className="my-8 sm:my-12 flex justify-center">
        <div className="w-11/12 sm:w-10/12 md:w-9/12 mx-auto">
          <HeroIllustration
            isDarkMode={isDarkMode}
            onActivate={handlePortraitClick}
            showSecret={showSecretMessage}
          />
        </div>
      </div>
      {/* Attribution removed per new request to use downloaded SVGs */}
      <div className="flex flex-wrap justify-center rounded-md pt-8 gap-3 sm:gap-4">
        <GlassButton
          href="https://www.linkedin.com/in/nicolaswester/"
          icon={<FaLinkedin className="inline-flex text-xl" />}
          variant="primary"
          size="lg"
          className="min-w-[150px] w-full sm:w-auto"
        >
          LinkedIn
        </GlassButton>
        <GlassButton
          href="https://github.com/nwester627"
          icon={<FaGithubSquare className="inline-flex text-xl" />}
          variant="primary"
          size="lg"
          className="min-w-[150px] w-full sm:w-auto"
        >
          Github
        </GlassButton>
        <GlassButton
          href="https://drive.google.com/file/d/1b3jnUc-d9EwklABf-nZEC3sDf8QXty_v/view?usp=sharing"
          icon={<FaCloudDownloadAlt className="inline-flex text-xl" />}
          variant="primary"
          size="lg"
          className="min-w-[150px] w-full sm:w-auto"
        >
          Resume
        </GlassButton>
      </div>
      <h4
        className={`text-xl pt-8 pb-4 font-medium text-center 2xl:text-3xl text-shadow-subtle ${
          isDarkMode ? "text-light-gray" : "text-light-text"
        }`}
      >
        A Little Bit About Me
      </h4>
      <p
        className={`w-11/12 sm:w-10/12 md:w-9/12 mx-auto text-[15px] sm:text-md px-4 text-center text-pretty 2xl:text-xl ${
          isDarkMode ? "text-light-gray" : "text-light-secondary"
        }`}
      >
        Full stack dev with about three years shipping production work (plus a
        few more years poking at side projects). I like untangling vague or
        messy problems, tightening interfaces, and leaving code a little clearer
        than I found it. Off screen: games, anime, and three cats who think they
        run QA.
      </p>
      {showSecretMessage && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          aria-live="polite"
        >
          <div className="text-4xl animate-ping text-lavender">
            🌟 You found a secret! 🌟
          </div>
        </div>
      )}
      {/* Hidden live region for screen readers to announce secret without visual duplication */}
      <div className="sr-only" aria-live="polite" role="status">
        {showSecretMessage ? "You found a secret." : ""}
      </div>
    </div>
  );
}

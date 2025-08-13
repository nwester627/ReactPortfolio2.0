import { Typewriter } from "react-simple-typewriter";
import Image from "next/image";
import { FaLinkedin, FaGithubSquare, FaCloudDownloadAlt } from "react-icons/fa";
import GlassButton from "../common/GlassButton";
import { useState, useCallback } from "react";
import { useTheme } from "../../context/ThemeContext";
import portraitImg from "../../assets/images/portrait.png";

// Headshot component extracted for clarity & accessibility improvements
function Headshot({ isDarkMode, onActivate, showSecret }) {
  const containerBase =
    "relative group outline-none focus-visible:ring-2 focus-visible:ring-lavender/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-full";
  const sizeClasses = "w-72 h-72 md:w-96 md:h-96";
  const outerGlow =
    "absolute inset-0 rounded-full bg-gradient-to-tr from-teal-400 via-blue-500 to-purple-600 opacity-10 blur-3xl -z-10";
  const frame = isDarkMode
    ? "border border-white/5 bg-gradient-to-b from-space via-space to-blackish-blue"
    : "border border-light-primary/10 bg-gradient-to-b from-light-bg via-light-surface to-light-container";
  const overlayShade = isDarkMode ? "bg-black/20" : "bg-black/10"; // slightly stronger in light mode for contrast

  return (
    <div className={`${containerBase} ${sizeClasses}`}>
      <div className={outerGlow} aria-hidden="true" />
      <button
        type="button"
        onClick={onActivate}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onActivate()}
        aria-label="Personal headshot – activate for a fun secret after several clicks"
        className={`relative block w-full h-full rounded-full overflow-hidden transition-colors duration-300 ${frame} before:absolute before:inset-0 before:rounded-full before:pointer-events-none before:ring-1 before:ring-white/30 before:dark:ring-white/10 before:mix-blend-overlay`}
      >
        <span
          className={`relative w-full h-full block transition-transform duration-500 group-hover:scale-105 motion-reduce:group-hover:scale-100 ${
            showSecret ? "scale-105" : "scale-100"
          }`}
        >
          <span className={`absolute inset-0 z-10 ${overlayShade}`} />
          <Image
            src={portraitImg.src}
            alt="Nicolas Wester – full-color circular headshot"
            fill
            priority
            sizes="(max-width: 640px) 18rem, (max-width: 1024px) 24rem, 28rem"
            className="rounded-full object-cover select-none"
            draggable={false}
          />
        </span>
      </button>
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
      <div className="text-center px-6 pt-12 pb-8 sm:p-10 drop-shadow-2xl">
        <h1
          className={`hero-fade text-[clamp(2.75rem,6vw,4.25rem)] py-2 font-bold tracking-tight leading-tight bg-gradient-to-r ${
            isDarkMode
              ? "from-lavender via-light-gray to-white/80"
              : "from-light-primary via-lavender to-light-text"
          } bg-clip-text text-transparent`}
        >
          Nicolas Wester
        </h1>
        <h2
          className={`hero-fade-delay text-2xl py-2 font-medium 2xl:text-3xl min-h-[2.5rem] 2xl:min-h-[3.25rem] ${
            isDarkMode ? "text-lavender" : "text-light-primary"
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
      <div className="my-12 flex justify-center">
        <Headshot
          isDarkMode={isDarkMode}
          onActivate={handlePortraitClick}
          showSecret={showSecretMessage}
        />
      </div>
      <div className="flex flex-wrap justify-center rounded-md pt-8 gap-4 sm:gap-8">
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
        className={`text-xl pt-8 pb-4 font-medium text-center 2xl:text-3xl ${
          isDarkMode ? "text-light-gray" : "text-light-text"
        }`}
      >
        A Little Bit About Me
      </h4>
      <p
        className={`w-11/12 sm:w-9/12 mx-auto text-md px-4 text-center text-balance 2xl:text-xl ${
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

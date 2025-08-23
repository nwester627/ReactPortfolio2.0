import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function LoaderOverlay({
  minDuration = 1000,
  fadeDuration = 600,
  done,
}) {
  const { isDarkMode } = useTheme();
  const [visible, setVisible] = useState(true);
  const [hiding, setHiding] = useState(false);
  const [start] = useState(() => Date.now());
  const [prefersReduced, setPrefersReduced] = useState(false);
  const [skipped, setSkipped] = useState(false);

  // Detect reduced motion & prior visit (session skip)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReduced(mq.matches);
    update();
    mq.addEventListener
      ? mq.addEventListener("change", update)
      : mq.addListener(update);
    const visited = sessionStorage.getItem("visited");
    if (visited) {
      // Skip loader entirely on subsequent visits.
      setSkipped(true);
      setVisible(false);
    }
    return () => {
      mq.removeEventListener
        ? mq.removeEventListener("change", update)
        : mq.removeListener(update);
    };
  }, []);

  useEffect(() => {
    if (skipped) return; // no animation if skipped
    if (!done) return;
    const effectiveMin = prefersReduced ? 0 : minDuration;
    const effectiveFade = prefersReduced ? 0 : fadeDuration;
    const remaining = Math.max(0, effectiveMin - (Date.now() - start));
    const t = setTimeout(() => {
      setHiding(true);
      const ft = setTimeout(() => setVisible(false), effectiveFade);
      return () => clearTimeout(ft);
    }, remaining);
    return () => clearTimeout(t);
  }, [done, minDuration, fadeDuration, prefersReduced, skipped, start]);

  // Mark session visited when we finish hiding
  useEffect(() => {
    if (!hiding || skipped) return;
    if (typeof window !== "undefined") {
      sessionStorage.setItem("visited", "1");
    }
  }, [hiding, skipped]);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[999] flex items-center justify-center pointer-events-none select-none"
    >
      <div
        className={`absolute inset-0 transition-opacity duration-500 ease-extra-smooth ${
          hiding ? "opacity-0" : "opacity-100"
        } ${
          isDarkMode
            ? "bg-black/40 backdrop-blur-[2px]"
            : "bg-white/50 backdrop-blur"
        } `}
      />
      <div
        className={`relative flex flex-col items-center gap-5 px-8 py-10 rounded-2xl shadow-xl border border-white/10 pointer-events-auto animate-materialize transition-all ${
          hiding ? "opacity-0 scale-95" : "opacity-100 scale-100"
        } ${
          isDarkMode
            ? "bg-white/5 text-light-gray"
            : "bg-white/70 text-light-text"
        }`}
        style={{
          transitionDuration: prefersReduced ? "0ms" : fadeDuration + "ms",
        }}
      >
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-lavender animate-loaderPulse [animation-delay:-0.3s]" />
          <div className="h-3 w-3 rounded-full bg-lavender-light animate-loaderPulse [animation-delay:-0.15s]" />
          <div className="h-3 w-3 rounded-full bg-lavender animate-loaderPulse" />
        </div>
        <p className="text-sm font-medium tracking-wide opacity-90">
          Preparing experience…
        </p>
      </div>
    </div>
  );
}

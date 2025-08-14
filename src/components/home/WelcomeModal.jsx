import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/router";
import { useTheme } from "@/context/ThemeContext";

/**
 * Welcome modal that segments users between portfolio and services.
 * Displays once per session with smooth animations and accessibility features.
 */
export default function WelcomeModal() {
  const {
    isDarkMode,
    setIsModalActive,
    setHasModalBeenDismissed,
    hasModalBeenDismissed,
  } = useTheme();
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [shouldShowBackdrop, setShouldShowBackdrop] = useState(false);
  const [hiding, setHiding] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const firstActionRef = useRef(null);

  // No cross-reload persistence: suppress only within current SPA session via context

  // Initialize modal display logic and motion preferences
  useEffect(() => {
    if (typeof window === "undefined") return;

    // If dismissed during this SPA session, don't show again until refresh.
    if (hasModalBeenDismissed) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReduced(mq.matches);
    update();
    mq.addEventListener
      ? mq.addEventListener("change", update)
      : mq.addListener(update);

    setShouldShowBackdrop(true);
    setIsModalActive(true);

    const timer = setTimeout(() => setVisible(true), 500);
    return () => {
      clearTimeout(timer);
      mq.removeEventListener
        ? mq.removeEventListener("change", update)
        : mq.removeListener(update);
    };
  }, [hasModalBeenDismissed, setIsModalActive, setHasModalBeenDismissed]); // Trigger entrance animation and focus management
  useEffect(() => {
    if (!visible) return;
    setRevealed(false);
    const id = requestAnimationFrame(() => {
      setRevealed(true);
      if (firstActionRef.current) {
        try {
          firstActionRef.current.focus();
        } catch (_e) {
          // no-op
        }
      }
    });
    return () => cancelAnimationFrame(id);
  }, [visible]);

  // Prevent body scroll while modal is active, preserving scroll position
  useEffect(() => {
    if (typeof document === "undefined" || !shouldShowBackdrop) return;

    const scrollY = window.scrollY;
    const prevStyles = {
      htmlOverflow: document.documentElement.style.overflow,
      bodyOverflow: document.body.style.overflow,
      bodyPosition: document.body.style.position,
      bodyTop: document.body.style.top,
    };

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      Object.assign(document.body.style, {
        position: prevStyles.bodyPosition || "",
        top: prevStyles.bodyTop || "",
        width: "",
      });
      Object.assign(document.documentElement.style, {
        overflow: prevStyles.htmlOverflow || "",
      });
      document.body.style.overflow = prevStyles.bodyOverflow || "";
      window.scrollTo(0, scrollY);
    };
  }, [shouldShowBackdrop]);

  const close = useCallback(() => {
    // Close without setting cookie - allows modal to reappear on refresh
    setIsModalActive(false);
    setHasModalBeenDismissed(true);
    if (prefersReduced) {
      setVisible(false);
      setShouldShowBackdrop(false);
    } else {
      setHiding(true);
      setTimeout(() => {
        setVisible(false);
        setShouldShowBackdrop(false);
      }, 300);
    }
  }, [prefersReduced, setIsModalActive, setHasModalBeenDismissed]);

  const goServices = useCallback(() => {
    setIsModalActive(false);
    setHasModalBeenDismissed(true);
    setShouldShowBackdrop(false);
    router.push("/services");
  }, [router, setIsModalActive, setHasModalBeenDismissed]);

  const selectPortfolio = useCallback(() => {
    setIsModalActive(false);
    setHasModalBeenDismissed(true);
    if (prefersReduced) {
      setVisible(false);
      setShouldShowBackdrop(false);
    } else {
      setHiding(true);
      setTimeout(() => {
        setVisible(false);
        setShouldShowBackdrop(false);
      }, 300);
    }
  }, [prefersReduced, setIsModalActive, setHasModalBeenDismissed]);

  if (!shouldShowBackdrop) return null;

  return (
    <div className="fixed inset-0 z-[10000] pointer-events-none select-none">
      {/* Backdrop - shows immediately with enhanced blur */}
      <div
        className={`modal-backdrop absolute inset-0 transition-opacity ${
          prefersReduced ? "duration-0" : "duration-300"
        } ${hiding ? "opacity-0" : "opacity-100"} ${
          isDarkMode
            ? "bg-black/70 backdrop-blur-xl"
            : "bg-black/50 backdrop-blur-xl"
        }`}
      />
      {/* Modal Card - shows after delay */}
      {visible && (
        <div
          className={`welcome-modal fixed pointer-events-auto rounded-2xl shadow-2xl border px-6 sm:px-8 py-7 sm:py-9 transition-all backdrop-blur-md left-1/2 -translate-x-1/2 top-[3%] sm:top-[10%] w-[min(600px,92vw)] max-w-[92vw] ${
            prefersReduced ? "duration-0" : "duration-300"
          } ${
            hiding
              ? "opacity-0 scale-95 blur-[1px]"
              : revealed
              ? "opacity-100 scale-100 blur-0"
              : "opacity-0 scale-95 blur-[1px]"
          } ${
            isDarkMode
              ? "bg-white/35 text-light-gray border-white/40"
              : "bg-white/98 text-light-text border-white/70"
          }`}
          style={{
            transitionTimingFunction: "cubic-bezier(.33,1,.68,1)",
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="welcome-modal-heading"
        >
          {/* Close */}
          <button
            onClick={close}
            aria-label="Close"
            className={`absolute top-3.5 right-3.5 p-2 rounded-full ring-1 transition-colors ${
              isDarkMode
                ? "bg-white/10 ring-white/15 hover:bg-white/15"
                : "bg-light-primary/10 ring-light-primary/20 hover:bg-light-primary/15"
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Content */}
          <div className="space-y-6">
            <div className="text-center">
              <h2
                id="welcome-modal-heading"
                className={`text-[clamp(1.75rem,3.5vw,2.25rem)] font-bold tracking-tight bg-gradient-to-r ${
                  isDarkMode
                    ? "from-lavender via-light-gray to-white/85"
                    : "from-light-primary via-lavender to-light-text accent-shadow"
                } bg-clip-text text-transparent`}
              >
                Building Great Things
              </h2>
              <p
                className={`mt-3 text-sm sm:text-base ${
                  isDarkMode ? "text-light-gray/85" : "text-light-text/85"
                }`}
              >
                I'm passionate about my craft. I'm currently seeking a full-time
                role to solve complex challenges, and I also dedicate my
                personal time to helping small businesses succeed online.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                className={`rounded-xl ring-1 p-4 flex flex-col h-full shadow-sm ${
                  isDarkMode
                    ? "ring-white/35 bg-gray-800 backdrop-blur-sm"
                    : "ring-light-primary/40 bg-gray-100 backdrop-blur-sm"
                }`}
              >
                <h3 className="font-semibold mb-2">
                  For My Professional Career
                </h3>
                <p
                  className={`text-sm mb-4 flex-grow ${
                    isDarkMode ? "text-light-gray/85" : "text-light-text/85"
                  }`}
                >
                  I'm ready for my next full-time challenge. Explore my resume
                  and key projects.
                </p>
                <button
                  onClick={selectPortfolio}
                  className={`w-full px-4 py-2 rounded-lg font-semibold ring-1 transition-colors backdrop-blur-sm ${
                    isDarkMode
                      ? "bg-lavender/60 text-white ring-lavender/80 hover:bg-lavender/70"
                      : "bg-lavender/70 text-white ring-lavender/90 hover:bg-lavender/80"
                  }`}
                >
                  View Portfolio & Resume
                </button>
              </div>

              <div
                className={`rounded-xl ring-1 p-4 flex flex-col h-full shadow-sm ${
                  isDarkMode
                    ? "ring-white/35 bg-gray-800 backdrop-blur-sm"
                    : "ring-light-primary/40 bg-gray-100 backdrop-blur-sm"
                }`}
              >
                <h3 className="font-semibold mb-2">
                  For Side Projects & Collaborations
                </h3>
                <p
                  className={`text-sm mb-4 flex-grow ${
                    isDarkMode ? "text-light-gray/85" : "text-light-text/85"
                  }`}
                >
                  In my spare time, I partner with businesses to build
                  beautiful, effective websites.
                </p>
                <button
                  onClick={goServices}
                  ref={firstActionRef}
                  className={`w-full px-4 py-2 rounded-lg font-semibold ring-1 transition-colors backdrop-blur-sm ${
                    isDarkMode
                      ? "bg-lavender/60 text-white ring-lavender/80 hover:bg-lavender/70"
                      : "bg-lavender/70 text-white ring-lavender/90 hover:bg-lavender/80"
                  }`}
                >
                  Learn About My Process
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

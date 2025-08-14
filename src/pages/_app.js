import "@/styles/globals.css";
import Head from "next/head";
import { Nunito } from "next/font/google";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import ThemeToggle from "@/components/common/ThemeToggle";
import LoaderOverlay from "@/components/common/LoaderOverlay";
import PageTransition from "@/components/common/PageTransition";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const rounded = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-rounded",
  display: "swap",
});

function AppContent({ Component, pageProps }) {
  const { isDarkMode } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Attach font variable class to body so portal-rendered content inherits Nunito.
  useEffect(() => {
    document.body.classList.add(rounded.variable);
    return () => document.body.classList.remove(rounded.variable);
  }, []);

  useEffect(() => {
    if (mounted) {
      // small timeout to allow fonts & initial layout paint before revealing
      const t = setTimeout(() => setReady(true), 120);
      return () => clearTimeout(t);
    }
  }, [mounted]);

  // Route progress bar logic
  useEffect(() => {
    let timer;
    const start = () => {
      setProgress(10);
      clearInterval(timer);
      timer = setInterval(() => {
        setProgress((p) => (p < 90 ? p + Math.random() * 8 : p));
      }, 180);
    };
    const done = () => {
      clearInterval(timer);
      setProgress(100);
      setTimeout(() => setProgress(0), 350);
    };
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", done);
    router.events.on("routeChangeError", done);
    return () => {
      clearInterval(timer);
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", done);
      router.events.off("routeChangeError", done);
    };
  }, [router]);

  // Render base structure early (for background color) but overlay loader until ready

  return (
    <div
      className={`min-h-screen transition-all duration-1200 ease-extra-smooth font-sans ${
        isDarkMode
          ? "bg-gradient-to-b from-blackish-blue via-space to-blackish-blue text-light-gray"
          : "bg-gradient-to-b from-light-bg via-light-accent to-light-container text-light-text"
      }`}
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ThemeToggle />
      {mounted && (
        <PageTransition>
          <Component {...pageProps} />
        </PageTransition>
      )}
      {/* Top route change progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[998] h-0.5 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-lavender via-lavender-light to-lavender transition-all duration-200 ease-extra-smooth"
          style={{
            width: progress + "%",
            opacity: progress === 0 ? 0 : 1,
            transform: "translateZ(0)",
          }}
        />
      </div>
      <LoaderOverlay done={ready} minDuration={500} fadeDuration={450} />
    </div>
  );
}

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <AppContent Component={Component} pageProps={pageProps} />
    </ThemeProvider>
  );
}

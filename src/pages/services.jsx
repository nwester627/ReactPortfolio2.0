import Head from "next/head";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { useEffect } from "react";
import ContactForm from "@/components/home/Contact";
import FrostedSection from "@/components/common/FrostedSection";

export default function Services() {
  const { isDarkMode, setHasModalBeenDismissed } = useTheme();

  // If user arrives here via nav, keep modal dismissed; also read cookie
  useEffect(() => {
    try {
      const seen = document.cookie
        .split(";")
        .map((c) => c.trim())
        .find((c) => c.startsWith("modalSeen="));
      if (seen?.split("=")[1] === "true") setHasModalBeenDismissed(true);
    } catch (_e) {
      // ignore cookie read errors
    }
  }, [setHasModalBeenDismissed]);

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Services - Nicolas Wester</title>
        <meta
          name="description"
          content="Services page coming soon - Nicolas Wester's professional portfolio."
        />
      </Head>

      <main
        className={`flex-1 font-sans pb-1 pt-14 sm:pt-0 relative z-0 ${
          isDarkMode ? "text-light-gray" : "text-light-text"
        }`}
      >
        {/* Navigation to Portfolio - positioned next to theme toggle */}
        <div className="fixed top-4 left-4 sm:left-[140px] z-40 max-w-[70%] sm:max-w-none">
          <Link
            href="/"
            className={`inline-flex items-center px-4 py-2.5 rounded-full text-sm font-semibold transition-colors backdrop-blur-sm ${
              isDarkMode
                ? "bg-white/10 text-light-gray ring-1 ring-white/20 hover:bg-white/15"
                : "bg-white/80 text-light-text ring-1 ring-light-primary/30 hover:bg-white/90"
            }`}
          >
            Return to portfolio
          </Link>
        </div>

        {/* Intro container to match Home's FrostedSection rhythm */}
        <FrostedSection>
          <div className="text-center">
            <h1
              className={`text-[clamp(2.5rem,6vw,4rem)] font-bold tracking-tight bg-gradient-to-r ${
                isDarkMode
                  ? "from-lavender via-light-gray to-white/85"
                  : "from-light-primary via-lavender to-light-text"
              } bg-clip-text text-transparent mb-4`}
            >
              Coming Soon
            </h1>
            <p
              className={`${
                isDarkMode ? "text-light-gray/85" : "text-light-text/85"
              } text-base sm:text-lg max-w-3xl mx-auto`}
            >
              I am in the process of fleshing out my services page. In the
              meantime, send me a message with your contact info and what you
              are looking to have done, and I will give you a call.
            </p>
          </div>
        </FrostedSection>

        {/* Contact container aligned identically to Home */}
        <FrostedSection variant="contact">
          <ContactForm />
        </FrostedSection>
      </main>
    </div>
  );
}

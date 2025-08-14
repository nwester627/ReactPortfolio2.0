import Head from "next/head";
import Link from "next/link";
import ContactForm from "@/components/home/Contact";
// Use direct import for debugging invalid element type instead of dynamic()
import Testimonials from "@/components/home/Testimonials";
import ProjectsCompare from "@/components/home/ProjectsCompare";
import Skills from "@/components/home/Skills";
import Intro from "@/components/home/Intro";
import FrostedSection from "@/components/common/FrostedSection";
import { useTheme } from "@/context/ThemeContext";
import WelcomeModal from "@/components/home/WelcomeModal";

export default function Home() {
  const { isDarkMode } = useTheme();

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Nicolas Wester's Portfolio</title>
      </Head>

      <main
        className={`flex-1 font-sans pb-1 pt-14 sm:pt-0 relative z-0 ${
          isDarkMode ? "text-light-gray" : "text-light-text"
        }`}
      >
        <WelcomeModal />

        {/* Navigation to Services - opposite the theme toggle (top-left) */}
        <div className="fixed top-4 left-4 sm:left-[140px] z-40 max-w-[70%] sm:max-w-none">
          <Link
            href="/services"
            className={`inline-flex items-center px-4 py-2.5 rounded-full text-sm font-semibold transition-colors backdrop-blur-sm ${
              isDarkMode
                ? "bg-white/10 text-light-gray ring-1 ring-white/20 hover:bg-white/15"
                : "bg-white/80 text-light-text ring-1 ring-light-primary/30 hover:bg-white/90"
            }`}
          >
            Freelance services
          </Link>
        </div>

        <section>
          <Intro />
        </section>
        <FrostedSection>
          <Skills />
        </FrostedSection>
        <FrostedSection>
          <ProjectsCompare />
        </FrostedSection>
        <FrostedSection>
          <Testimonials />
        </FrostedSection>
        <FrostedSection variant="contact">
          <ContactForm />
        </FrostedSection>
      </main>
    </div>
  );
}

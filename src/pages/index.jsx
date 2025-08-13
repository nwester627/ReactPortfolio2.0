import Head from "next/head";
import ContactForm from "@/components/home/Contact";
import dynamic from "next/dynamic";
const Testimonials = dynamic(() => import("@/components/home/Testimonials"), {
  loading: () => (
    <div className="flex flex-col gap-4 animate-pulse" aria-hidden>
      <div className="h-6 w-40 rounded bg-white/30 dark:bg-white/10" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-40 rounded-2xl bg-white/30 dark:bg-white/5 backdrop-blur-xl border border-white/10"
          />
        ))}
      </div>
    </div>
  ),
});
import ProjectsCompare from "@/components/home/ProjectsCompare";
import Skills from "@/components/home/Skills";
import Intro from "@/components/home/Intro";
import FrostedSection from "@/components/common/FrostedSection";
import { useTheme } from "@/context/ThemeContext";

export default function Home() {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-space to-blackish-blue"
          : "bg-gradient-to-br from-light-bg to-light-accent"
      }`}
    >
      <Head>
        <title>Nicolas Wester's Portfolio</title>
      </Head>

      <main
        className={`flex-1 font-sans pb-1 relative z-0 ${
          isDarkMode ? "text-light-gray" : "text-light-text"
        }`}
      >
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

import Head from "next/head";
import ContactForm from "@/components/home/Contact";
// Use direct import for debugging invalid element type instead of dynamic()
import Testimonials from "@/components/home/Testimonials";
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

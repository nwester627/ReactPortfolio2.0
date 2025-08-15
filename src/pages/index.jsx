import Head from "next/head";
import SiteHeader from "@/components/common/SiteHeader";
import LogoNW from "@/components/home/LogoNW";
import ProjectsCaseStudies from "@/components/home/ProjectsCaseStudies";
import Intro from "@/components/home/Intro";
import Skills from "@/components/home/Skills";
import Testimonials from "@/components/home/Testimonials";
import Contact from "@/components/home/Contact";
import FrostedSection from "@/components/common/FrostedSection";
import { useTheme } from "@/context/ThemeContext";

export default function Home() {
  const { isDarkMode } = useTheme();

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Nicolas Wester's Portfolio</title>
      </Head>
      <SiteHeader />
      <main
        className={`flex-1 font-sans pb-1 pt-14 sm:pt-0 relative z-0 ${
          isDarkMode ? "text-light-gray" : "text-light-text"
        }`}
      >
        <div className="w-full flex flex-col items-center">
          <LogoNW className="mt-8 mb-2" />
          <Intro />
        </div>
        <FrostedSection>
          <Skills />
        </FrostedSection>
        <FrostedSection>
          <ProjectsCaseStudies />
        </FrostedSection>
        <FrostedSection>
          <Testimonials />
        </FrostedSection>
        <FrostedSection variant="contact">
          <Contact />
        </FrostedSection>
      </main>
    </div>
  );
}

import Head from "next/head";
import SiteHeader from "@/components/common/SiteHeader";
import LogoNW from "@/components/home/LogoNW";
import Projects from "@/components/home/Projects";
import Intro from "@/components/home/Intro";
import Skills from "@/components/home/Skills";
import Testimonials from "@/components/home/Testimonials";
import Contact from "@/components/home/Contact";
import FrostedSection from "@/components/common/FrostedSection";
import SiteFooter from "@/components/common/SiteFooter";
import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";
import signature from "@/assets/signature.png";

export default function Home() {
  const { isDarkMode } = useTheme();

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Nicolas Wester's Portfolio</title>
      </Head>
      <SiteHeader />
      <main
        className={`flex-1 font-sans pb-1 pt-16 sm:pt-20 relative z-0 ${
          isDarkMode ? "text-light-gray" : "text-light-text"
        }`}
      >
        <FrostedSection delay={0}>
          <div className="w-full mx-auto px-2 sm:px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="flex flex-col items-center justify-center md:justify-start space-y-2">
                <LogoNW className="w-full max-w-[320px]" />
                <div className="flex justify-center">
                  <Image
                    src={signature}
                    alt="Nicolas Wester signature"
                    width={200}
                    height={60}
                    className={`w-auto h-auto max-w-[200px] transition-all duration-300 ${
                      isDarkMode
                        ? "filter brightness-0 invert opacity-80"
                        : "filter brightness-0 opacity-60"
                    }`}
                    style={{ width: "auto", height: "auto" }}
                  />
                </div>
              </div>

              <div className="w-full">
                <Intro />
              </div>
            </div>
          </div>
        </FrostedSection>
        <FrostedSection delay={150}>
          <Skills />
        </FrostedSection>
        <FrostedSection delay={300}>
          <Projects />
        </FrostedSection>
        <FrostedSection delay={450}>
          <Testimonials />
        </FrostedSection>
        <FrostedSection variant="contact" delay={600}>
          <Contact />
        </FrostedSection>
      </main>
      <SiteFooter />
    </div>
  );
}

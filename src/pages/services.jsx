import Head from "next/head";
import { useTheme } from "@/context/ThemeContext";
import SiteHeader from "@/components/common/SiteHeader";
import FrostedSection from "@/components/common/FrostedSection";

export default function Services() {
  const { isDarkMode } = useTheme();

  return (
    <div className="min-h-screen flex flex-col w-full max-w-full">
      <Head>
        <title>Services - Nicolas Wester</title>
        <meta
          name="description"
          content="Services page coming soon - Nicolas Wester's professional portfolio."
        />
      </Head>

      <SiteHeader />
      <main
        className={`flex-1 font-sans py-16 relative z-0 w-full max-w-full ${
          isDarkMode ? "text-light-gray" : "text-light-text"
        }`}
      >
        {/* Intro container to match Home's FrostedSection rhythm */}
        <div className="flex items-center justify-center min-h-[60vh] w-full">
          <FrostedSection>
            <div className="flex flex-col items-center justify-center min-h-[340px] min-w-[340px] w-full max-w-2xl py-16 px-6 sm:px-12 text-center mx-auto">
              <h1
                className={`text-[clamp(3rem,7vw,5rem)] font-bold tracking-tight bg-gradient-to-r ${
                  isDarkMode
                    ? "from-lavender via-light-gray to-white/85"
                    : "from-light-primary via-lavender to-light-text"
                } bg-clip-text text-transparent mb-6`}
              >
                Coming Soon
              </h1>
              <p
                className={`$${
                  isDarkMode ? "text-light-gray/85" : "text-light-text/85"
                } text-lg sm:text-xl max-w-2xl mx-auto`}
              >
                I am in the process of fleshing out my services page. In the
                meantime, send me a message with your contact info and what you
                are looking to have done, and I will give you a call.
              </p>
            </div>
          </FrostedSection>
        </div>

        {/* Contact container aligned identically to Home */}
        {/* <FrostedSection variant="contact">
          <ContactForm mode="services" />
        </FrostedSection> */}
      </main>
    </div>
  );
}

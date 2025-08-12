import Head from "next/head";
import React from "react";
import ContactForm from "@/components/Contact";
import Testimonials from "@/components/Testimonials";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Intro from "@/components/Intro";
import FrostedSection from "@/components/FrostedSection";

export default function Home() {
  const GATag = `
  window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-YF4XMJ3SB2');`;

  return (
    <div>
      <Head>
        <title>Nicolas Wester Portfolio</title>

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-YF4XMJ3SB2"
        ></script>

        <script dangerouslySetInnerHTML={{ __html: GATag }} />
      </Head>

      <main className="bg-gradient-to-br from-space to to-black text-light-gray font-poppins">
        <section>
          <Intro />
        </section>
        <FrostedSection>
          <Skills />
        </FrostedSection>
        <FrostedSection>
          <Projects />
        </FrostedSection>
        <FrostedSection>
          <Testimonials />
        </FrostedSection>
        <FrostedSection>
          <ContactForm />
        </FrostedSection>
      </main>
    </div>
  );
}

import Head from "next/head";
import { React } from "react";
import ContactForm from "@/components/Contact";
import Testimonials from "@/components/Testimonials";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Intro from "@/components/Intro";
import FrostedSection from "@/components/FrostedSection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-space to to-black">
      <Head>
        <title>Nicolas Wester's Portfolio</title>
      </Head>

      <main className="flex-1 text-light-gray font-poppins pb-1">
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
        <FrostedSection variant="contact">
          <ContactForm />
        </FrostedSection>
      </main>
    </div>
  );
}

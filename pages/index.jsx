import Head from "next/head";
import { React } from "react";
import ContactForm from "@/components/Contact";
import Testimonials from "@/components/Testimonials";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Intro from "@/components/Intro";
import Nav from "@/components/Nav";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Nicolas Wester's Portfolio</title>
      </Head>

      <main className="bg-gradient-to-br from-space to to-black text-rose font-poppins">
        <section className="min-h-screen">
          <Nav />
          <Intro />
        </section>
        <section className="rounded bg-space w-9/12 m-auto mt-8 py-8">
          <Skills />
        </section>
        <section className="rounded bg-space w-9/12 m-auto mt-8 py-8">
          <Projects />
        </section>
        <section className="rounded bg-space w-9/12 m-auto mt-8 py-8">
          <Testimonials />
        </section>
        <section className="rounded bg-space w-9/12 m-auto mt-8 py-8">
          <ContactForm />
        </section>
      </main>
    </div>
  );
}

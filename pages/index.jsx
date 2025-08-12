import Head from "next/head";
import Script from "next/script";
import ContactForm from "@/components/Contact";
import Testimonials from "@/components/Testimonials";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Intro from "@/components/Intro";
import FrostedSection from "@/components/FrostedSection";

export default function Home() {
  const gtmScript = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-5H8RZFQT');
  `;

  return (
    <div>
      {/* This is the correct noscript block, using dangerouslySetInnerHTML */}
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5H8RZFQT"
        height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
        }}
      />

      <Head>
        <title>Nicolas Wester Portfolio</title>

        {/* The Google Tag Manager script for the head */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: gtmScript }}
        />
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

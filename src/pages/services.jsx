import Head from "next/head";
import { useTheme } from "@/context/ThemeContext";
import SiteHeader from "@/components/common/SiteHeader";
import FrostedSection from "@/components/common/FrostedSection";
import GlassButton from "@/components/common/GlassButton";
import Image from "next/image";
import website1 from "@/assets/website1.png";
import website2 from "@/assets/website2.png";
import website3 from "@/assets/website3.png";

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
        <div className="flex flex-col items-center justify-start min-h-[60vh] w-full gap-16">
          <FrostedSection>
            <div className="flex flex-col items-center justify-center min-h-[340px] min-w-[344px] w-full max-w-3xl py-16 px-6 sm:px-12 text-center mx-auto">
              <h1
                className={`text-[clamp(3rem,7vw,5rem)] font-bold tracking-tight bg-gradient-to-r ${
                  isDarkMode
                    ? "from-lavender via-light-gray to-white/85"
                    : "from-light-primary via-lavender to-light-text"
                } bg-clip-text text-transparent mb-6`}
              >
                Services
              </h1>
              <p
                className={`${
                  isDarkMode ? "text-light-gray/85" : "text-light-text/85"
                } text-lg sm:text-xl max-w-2xl mx-auto`}
              >
                I help small businesses, organizations, and individuals build
                fast, secure, accessible websites and custom web applications.
              </p>
            </div>
          </FrostedSection>
          <section
            aria-label="Example work"
            className="w-full max-w-7xl mx-auto px-5 sm:px-8"
          >
            <h2
              className={`text-3xl sm:text-4xl font-bold tracking-tight mb-8 bg-gradient-to-r ${
                isDarkMode
                  ? "from-lavender via-light-gray to-white/85"
                  : "from-light-primary via-lavender to-light-text"
              } bg-clip-text text-transparent`}
            >
              Example Work
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "BES Plumbing",
                  slug: "bes-plumbing",
                  url: "https://www.besplumbing.com",
                  image: website1,
                  alt: "Screenshot of BES Plumbing website",
                  description:
                    "Local plumbing business site featuring service breakdowns, contact funnels, and mobile-first layout for quick customer access.",
                  stack: ["Next.js", "Tailwind", "SEO"],
                },
                {
                  title: "From Tribulation to Restoration",
                  slug: "from-tribulation",
                  url: "https://www.fromtribulationtorestoration.org",
                  image: website2,
                  alt: "Screenshot of From Tribulation to Restoration website",
                  description:
                    "Non-profit ministry platform with structured content sections, donation CTAs, and responsive typography for long-form reading.",
                  stack: ["Next.js", "Accessibility", "Content Architecture"],
                },
                {
                  title: "Local Tobacco Retailer",
                  slug: "local-tobacco-retailer",
                  url: "https://www.greenshedfl.com",
                  image: website3,
                  alt: "Screenshot of a local tobacco retailer website",
                  description:
                    "Neighborhood retail shop website with store information, hours, and contact options — designed with accessibility and age-appropriate compliance notices.",
                  stack: ["Next.js", "Accessibility", "Compliance"],
                },
              ].map((ex) => (
                <div
                  key={ex.slug}
                  className={`group relative rounded-2xl border backdrop-blur-sm overflow-hidden flex flex-col h-full transition-colors shadow-sm ${
                    isDarkMode
                      ? "border-white/10 bg-white/5 hover:bg-white/10"
                      : "border-light-primary/15 bg-light-primary/5 hover:bg-light-primary/10"
                  }`}
                >
                  <div className="aspect-video w-full overflow-hidden relative">
                    <Image
                      src={ex.image}
                      alt={ex.alt}
                      fill
                      priority={false}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-col p-5 sm:p-6 gap-3 flex-1">
                    <h3
                      className={`text-xl font-semibold tracking-tight ${
                        isDarkMode ? "text-light-gray" : "text-light-text"
                      }`}
                    >
                      {ex.title}
                    </h3>
                    <p
                      className={`text-sm leading-relaxed flex-1 ${
                        isDarkMode ? "text-light-gray/80" : "text-light-text/80"
                      }`}
                    >
                      {ex.description}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {ex.stack.map((tag) => (
                        <span
                          key={tag}
                          className={`px-2 py-1 rounded-md text-[0.60rem] font-medium tracking-wide uppercase ring-1 ${
                            isDarkMode
                              ? "bg-white/5 text-light-gray/70 ring-white/10"
                              : "bg-light-primary/10 text-light-text/70 ring-light-primary/20"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="pt-2">
                      {ex.url ? (
                        <GlassButton
                          href={ex.url}
                          variant="primary"
                          size="md"
                          className="w-full justify-center"
                        >
                          Live Demo
                        </GlassButton>
                      ) : (
                        <GlassButton
                          variant="outline"
                          size="md"
                          className="w-full justify-center cursor-default"
                          disabled
                        >
                          Preview unavailable
                        </GlassButton>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p
              className={`mt-10 text-center text-sm ${
                isDarkMode ? "text-light-gray/70" : "text-light-text/70"
              }`}
            >
              Want something similar? Reach out via the contact form on the home
              page.
            </p>
          </section>
        </div>

        {/* Contact container aligned identically to Home */}
      </main>
    </div>
  );
}

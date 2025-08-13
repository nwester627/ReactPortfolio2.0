import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import { useEffect, useRef } from "react";
import JaredSmithImg from "../../assets/images/JaredSmith.png";
import TylerSorensonImg from "../../assets/images/TylerSorenson.png";
import KennyRichmondImg from "../../assets/images/KennyRichmond.png";

const testimonialsData = [
  {
    id: 1,
    name: "Jared Smith",
    title: "Director of Engineering - BoomTown",
    img: JaredSmithImg.src,

    desc: '"From the beginning, Nick has always been someone who enjoys digging in and learning new things. I remember when he reached out to me about a possible BoomTown internship and gave him some feedback that he took, internalized, and exceeded. When the time came and that internship was open, it was an easy sell to bring him on board, and he validated my faith in him time and time again."',
  },
  {
    id: 2,
    name: "Tyler Sorenson",
    title: "Engineering Manager - IRE",
    img: TylerSorensonImg.src,
    desc: '"Nick was an excellent member of our team. In the short time I had to work with him I was beyond impressed with his willingness to learn new things, jump into new code bases, and take on challenging tasks and bugs. I feel like even in the short time I had to work with him he made great strides. He has a great attitude and is great to work with. He would be an excellent engineer for any team he joins."',
  },
  {
    id: 3,
    name: "Kenny Richmond",
    title: "Software Engineering Manager - IRE",
    img: KennyRichmondImg.src,
    desc: '"Nick is always willing to jump on any task needed, and has been extremely valuable to our team, especially when troubleshooting bugs. He takes a systematic approach to debugging, in order to isolate and solve issues as quickly as possible. Nick is an excellent engineer and will be a valuable asset to any team!"',
  },
];

export default function TestimonialCards() {
  const { isDarkMode } = useTheme();
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      prefersReducedMotion.current = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
    }
  }, []);

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="flex flex-col items-center px-4 py-12"
    >
      <div className="text-center mb-10">
        <h3
          id="testimonials-heading"
          className={`text-[clamp(2.25rem,5vw,3.5rem)] font-bold tracking-tight leading-tight mb-4 ${
            isDarkMode ? "text-light-gray" : "text-light-text accent-shadow"
          }`}
        >
          Testimonials
        </h3>
        <p
          className={`max-w-2xl mx-auto text-base sm:text-lg leading-relaxed px-4 ${
            isDarkMode ? "text-light-gray/80" : "text-light-text/80"
          }`}
        >
          What teammates and engineering managers have said about working with
          me.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 w-full mx-auto px-2 sm:px-4 max-w-7xl">
        {testimonialsData.map((d, idx) => {
          const reduce = prefersReducedMotion.current;
          const delay = reduce ? 0 : 80 + idx * 130;
          return (
            <figure
              key={d.id}
              className={`relative flex flex-col items-center justify-start h-full rounded-xl border p-7 sm:p-8 text-center backdrop-blur-sm will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-lavender/60 focus-visible:ring-offset-transparent transition-all duration-700 shadow-sm hover:shadow-md ${
                isDarkMode
                  ? "border-white/8 bg-white/[0.04] hover:bg-white/[0.07]"
                  : "border-light-primary/15 bg-light-primary/5 hover:bg-light-primary/10"
              } ${
                reduce
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-3 animate-[materialize_0.9s_cubic-bezier(.33,1,.68,1)_forwards]"
              }`}
              style={reduce ? undefined : { animationDelay: `${delay}ms` }}
              tabIndex={0}
            >
              <div className="absolute inset-px rounded-[inherit] pointer-events-none opacity-0 transition-opacity duration-700 group-hover:opacity-100 bg-gradient-to-br from-white/25 via-transparent to-white/5 dark:from-lavender/25 dark:to-white/5" />
              <div className="relative h-[70px] w-[70px] rounded-full bg-gradient-to-br from-rose to-lavender p-1 mb-5 shadow-md ring-1 ring-white/30 dark:ring-white/10">
                <Image
                  className="rounded-full object-cover"
                  src={d.img}
                  alt={`${d.name}'s Picture`}
                  fill
                  sizes="70px"
                />
              </div>
              <blockquote
                className={`mb-6 text-sm sm:text-base leading-relaxed ${
                  isDarkMode ? "text-light-gray/85" : "text-light-text/85"
                }`}
              >
                {d.desc}
              </blockquote>
              <figcaption className="space-y-1">
                <div
                  className={`text-base font-semibold tracking-tight ${
                    isDarkMode ? "text-light-gray" : "text-light-text"
                  }`}
                >
                  {d.name}
                </div>
                <div
                  className={`text-xs sm:text-sm tracking-wide ${
                    isDarkMode ? "text-light-gray/60" : "text-light-text/60"
                  }`}
                >
                  {d.title}
                </div>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}

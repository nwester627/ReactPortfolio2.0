import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { Typewriter } from "react-simple-typewriter";
import GlassButton from "../common/GlassButton";
import { useTheme } from "@/context/ThemeContext";

export default function Contact() {
  const [message, setMessage] = useState(false);
  const form = useRef();
  const { isDarkMode } = useTheme();
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      prefersReducedMotion.current = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
    }
  }, []);

  const inputClasses = `peer w-full text-base sm:text-lg rounded-xl py-3 px-4 border backdrop-blur-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent
    ${
      isDarkMode
        ? "text-light-gray bg-white/[0.05] border-white/10 hover:border-white/20 focus:ring-lavender/60"
        : "text-light-text bg-white/80 supports-[backdrop-filter]:bg-white/60 border-light-primary/25 hover:border-light-primary/50 focus:ring-light-primary/50"
    }`;

  function sendEmail(e) {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_dj3jp0v",
        "template_f6yvspc",
        form.current,
        "qY8OSrRdpQ5DTHQ_X"
      )
      .then(() => {
        setMessage(true);
        setTimeout(() => setMessage(false), 5000);
      })
      .catch((err) => console.error("Error sending email:", err));
    e.target.reset();
  }

  return (
    <section
      aria-labelledby="contact-heading"
      className="w-full flex items-center justify-center py-16"
    >
      <form
        className={`w-11/12 sm:w-5/6 md:w-3/4 lg:w-[52%] rounded-2xl p-8 sm:p-10 border backdrop-blur-md will-change-transform opacity-0 translate-y-4 scale-[0.985] animate-[materialize_0.85s_cubic-bezier(.33,1,.68,1)_forwards] shadow-sm focus-within:shadow-md transition-shadow duration-500 ${
          isDarkMode
            ? "border-white/8 bg-white/[0.05]"
            : "border-light-primary/15 bg-white/80 supports-[backdrop-filter]:bg-white/65"
        }`}
        ref={form}
        onSubmit={sendEmail}
      >
        <h2
          id="contact-heading"
          className={`text-[clamp(2.25rem,5vw,3.25rem)] font-bold tracking-tight leading-tight text-center mb-8 bg-gradient-to-r ${
            isDarkMode
              ? "from-lavender via-light-gray to-white/85"
              : "from-light-primary via-lavender to-light-text accent-shadow"
          } bg-clip-text text-transparent`}
        >
          <span className="block min-h-[2.4rem]">
            <Typewriter
              words={["Contact Me", "Let's Connect"]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2500}
            />
          </span>
        </h2>
        <div className="flex flex-col mb-6">
          <div className="relative">
            <input
              name="email"
              type="email"
              className={`${inputClasses} h-16`}
              required
              aria-label="Email"
            />
            <label className="absolute left-4 top-4 text-light-gray text-sm sm:text-base font-medium transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray peer-focus:top-[-20px] peer-focus:text-sm peer-focus:text-lavender">
              Email
            </label>
          </div>
        </div>

        <div className="flex flex-col mb-6">
          <div className="relative">
            <textarea
              name="message"
              className={`${inputClasses} h-64 resize-none caret-lavender`}
              required
              aria-label="Message"
            />
            <label className="absolute left-4 top-4 text-light-gray text-sm sm:text-base font-medium transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray peer-focus:top-[-20px] peer-focus:text-sm peer-focus:text-lavender">
              Message
            </label>
          </div>
        </div>

        <div className="w-full flex justify-center pt-2">
          <GlassButton type="submit" size="lg" variant="primary">
            Send Message
          </GlassButton>
        </div>

        {message && (
          <p className="text-center mt-4 text-sm font-medium text-lavender dark:text-lavender drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
            Message sent — thank you.
          </p>
        )}
      </form>
    </section>
  );
}

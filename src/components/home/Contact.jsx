import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { Typewriter } from "react-simple-typewriter";
import GlassButton from "../common/GlassButton";
import { useTheme } from "@/context/ThemeContext";

export default function Contact() {
  const [message, setMessage] = useState(false);
  const form = useRef();
  const { isDarkMode } = useTheme();

  const inputClasses = `peer w-full text-base sm:text-lg rounded-lg py-2 px-3 sm:px-4 border backdrop-blur-sm
    ${
      isDarkMode
        ? "text-light-gray bg-blackish-blue/70 border-white/10 hover:border-white/20 focus:ring-white/20"
        : "text-light-text bg-white/80 supports-[backdrop-filter]:bg-white/60 border-light-primary/30 hover:border-light-primary/50 focus:ring-light-primary/30"
    }
    focus:outline-none focus:ring-2 transition-colors duration-300`;

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
    <div className="w-full flex items-center justify-center py-12 sm:py-16">
      <form
        className={`w-11/12 sm:w-5/6 md:w-3/4 lg:w-[52%] rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 border backdrop-blur-sm
          ${
            isDarkMode
              ? "border-white/10 bg-blackish-blue/80"
              : "border-light-primary/15 bg-white/85 supports-[backdrop-filter]:bg-white/65"
          }`}
        ref={form}
        onSubmit={sendEmail}
      >
        <h2
          className={`hero-fade text-[clamp(2rem,5vw,3.25rem)] font-bold tracking-tight leading-tight text-center mb-6 bg-gradient-to-r ${
            isDarkMode
              ? "from-lavender via-light-gray to-white/80"
              : "from-light-primary via-lavender to-light-text"
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
              className={`${inputClasses} h-14`}
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
          <p className="text-center mt-4 text-sm font-medium text-lavender dark:text-lavender">
            Message sent — thank you.
          </p>
        )}
      </form>
    </div>
  );
}

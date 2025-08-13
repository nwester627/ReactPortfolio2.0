import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { Typewriter } from "react-simple-typewriter";
import GlassButton from "../common/GlassButton";
import { useTheme } from "@/context/ThemeContext";

export default function Contact() {
  const [message, setMessage] = useState(false);
  const form = useRef();
  const { isDarkMode } = useTheme();

  const inputClasses = `peer w-full text-base sm:text-lg rounded-lg py-2 px-3 sm:px-4 
    ${
      isDarkMode
        ? "text-white bg-blackish-blue border-white/10 hover:border-white/20"
        : "text-light-text bg-light-surface border-light-primary/20 hover:border-light-primary/40"
    } 
    border focus:outline-none focus:ring-2 focus:ring-lavender transition-colors duration-300`;

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
    <div className="w-full flex items-center justify-center py-6 md:py-10">
      <form
        className={`w-11/12 sm:w-5/6 md:w-3/4 lg:w-1/2 rounded-lg shadow-lg p-6 sm:p-8 md:p-10 border
          ${isDarkMode ? "border-gray-700" : "border-light-primary/20"}
          ${
            isDarkMode
              ? "bg-blackish-blue/50"
              : "bg-gradient-to-b from-white via-light-surface to-light-container"
          }
          backdrop-blur-sm
        `}
        ref={form}
        onSubmit={sendEmail}
      >
        <h3
          className={`text-3xl sm:text-4xl md:text-5xl text-center mb-6 ${
            isDarkMode ? "text-light-gray" : "text-light-text"
          }`}
        >
          <Typewriter
            words={["Contact Me!", "Let's Connect!"]}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={3000}
          />
        </h3>
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

        <div className="w-full flex justify-center">
          <GlassButton type="submit">Submit</GlassButton>
        </div>

        {message && (
          <p className="text-center text-lavender mt-4">
            Thank you! Your message has been sent.
          </p>
        )}
      </form>
    </div>
  );
}

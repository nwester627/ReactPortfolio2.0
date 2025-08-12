import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { Typewriter } from "react-simple-typewriter";

export default function Contact() {
  const [message, setMessage] = useState(false);
  const form = useRef();

  const inputClasses =
    "peer w-full text-lg rounded-lg py-2 px-4 text-white bg-blackish-blue border border-white/10 hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-lavender transition-colors duration-300";

  const labelClasses =
    "absolute left-4 top-4 text-light-gray text-sm transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray peer-focus:top-[-20px] peer-focus:text-sm peer-focus:text-lavender";

  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_dj3jp0v",
        "template_f6yvspc",
        form.current,
        "qY8OSrRdpQ5DTHQ_X"
      )
      .then(
        (result) => {
          console.log("Email sent successfully:", result.text);
          setMessage(true);
          setTimeout(() => setMessage(false), 5000);
        },
        (error) => {
          console.error("Error sending email:", error.text);
        }
      );

    e.target.reset();
  }

  return (
    <div className="w-full flex items-center justify-center py-10 mb-24">
      <form
        className="w-5/6 md:w-3/4 lg:w-1/2 rounded-lg shadow-lg p-10 border border-gray-700 mb-12"
        ref={form}
        onSubmit={sendEmail}
      >
        <h3 className="text-4xl sm:text-5xl text-center text-light-gray mb-6">
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
            <input name="email" className={`${inputClasses} h-14`} required />
            <label className="absolute left-4 top-4 text-light-gray text-sm transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray peer-focus:top-[-20px] peer-focus:text-sm peer-focus:text-lavender">
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
            />
            <label className="absolute left-4 top-4 text-light-gray text-sm transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray peer-focus:top-[-20px] peer-focus:text-sm peer-focus:text-lavender">
              Message
            </label>
          </div>
        </div>

        <div className="w-full flex justify-center">
          <button
            type="submit"
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-white/10 hover:bg-lavender text-light-gray font-medium border border-white/10 backdrop-blur-sm shadow-md hover:shadow-lg transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            Submit
          </button>
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

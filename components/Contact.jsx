import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import GlassButton from "./GlassButton";
import { Typewriter } from "react-simple-typewriter";

const thankYouMessages = [
  "Thank you! I'll get back to you soon. 😊",
  "Message sent! 🚀",
  "Thanks for reaching out! 🎉",
  "Your message is on its way! 📬",
];

const randomThankYouMessage =
  thankYouMessages[Math.floor(Math.random() * thankYouMessages.length)];

export default function ContactForm() {
  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailFilled, setEmailFilled] = useState(false); // Tracks if the email field is filled
  const [messageFilled, setMessageFilled] = useState(false); // Tracks if the message field is filled
  const [messageLength, setMessageLength] = useState(0);
  const form = useRef();

  function sendEmail(e) {
    e.preventDefault();
    if (!emailFilled || !messageFilled) {
      alert("Please fill out all fields before submitting!");
      return;
    }

    setLoading(true);

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
          setEmailFilled(false); // Reset email label
          setMessageFilled(false); // Reset message placeholder
          setTimeout(() => setMessage(false), 5000); // Hide message after 5 seconds
        },
        (error) => {
          console.error("Error sending email:", error.text);
        }
      )
      .finally(() => {
        setLoading(false);
      });

    e.target.reset(); // Clear the form fields
  }

  function handleKeyDown(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter" && !loading) {
      form.current.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true })
      );
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [loading]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center py-10 mb-24">
      <form
        className="w-5/6 md:w-3/4 lg:w-1/2 rounded-lg shadow-lg p-10 border border-gray-700" // Removed the background class
        ref={form}
        onSubmit={sendEmail}
      >
        <h3 className="text-4xl sm:text-5xl text-center text-light-gray mb-6">
          <Typewriter
            words={["Contact Me!", "Let's Connect!"]}
            loop={false}
            cursor={true}
            cursorStyle="|"
            typeSpeed={100}
            deleteSpeed={100}
            delaySpeed={500}
          />
        </h3>
        <div className="w-24 h-1 bg-teal m-auto mb-6"></div>

        {/* Email Input */}
        <div className="flex flex-col mb-6">
          <div className="relative">
            <input
              name="email"
              className="peer w-full h-14 text-lg rounded-lg py-2 px-4 text-white bg-gray border border-light-gray focus:outline-none focus:ring-2 focus:ring-teal"
              onInput={(e) => setEmailFilled(e.target.value !== "")}
              autoFocus
              required
            />
            <label
              className={`absolute left-4 ${
                emailFilled || message
                  ? "top-[-20px] text-sm text-teal-400"
                  : "top-4"
              } text-light-gray text-sm transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-400 peer-focus:top-[-20px] peer-focus:text-sm peer-focus:text-teal-400`}
            >
              Email
            </label>
          </div>
        </div>

        {/* Message Input */}
        <div className="flex flex-col mb-6">
          <div className="relative">
            <textarea
              name="message"
              className="peer w-full h-64 text-lg rounded-lg py-2 px-4 text-white bg-gray border border-light-gray focus:outline-none focus:ring-2 focus:ring-teal resize-none caret-teal"
              onInput={(e) => {
                setMessageFilled(e.target.value !== "");
                setMessageLength(e.target.value.length);
              }}
              maxLength={500} // Optional: Limit the number of characters
              required
            />
            <label
              className={`absolute left-4 ${
                messageFilled || message ? "opacity-0" : "opacity-100"
              } top-4 text-light-gray text-sm transition-all duration-300 peer-placeholder-shown:opacity-100 peer-focus:opacity-0`}
            >
              Message
            </label>
          </div>
        </div>
        <p className="text-right text-sm text-gray-400">
          {messageLength}/500 characters
        </p>

        {/* Submit Button */}
        <div className="w-full flex justify-center">
          <GlassButton
            loading={loading}
            disabled={loading}
            className="w-40 h-12 rounded-lg border-light-gray bg-teal text-white font-bold hover:bg-teal-dark hover:shadow-lg hover:shadow-teal transition-all duration-300"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                Sending...
              </div>
            ) : message ? (
              randomThankYouMessage
            ) : (
              "Submit"
            )}
          </GlassButton>
        </div>

        {message && (
          <p className="text-center text-teal-400 mt-4">
            Thank you! Your message has been sent.
          </p>
        )}
      </form>
    </div>
  );
}

import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import GlassButton from "./GlassButton";

export default function ContactForm() {
  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useRef();

  function sendEmail(e) {
    e.preventDefault();
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
          console.log(result.text);
          setMessage(true);
        },
        (error) => {
          console.log(error.text);
        }
      )
      .finally(() => {
        setLoading(false);
      });

    e.target.reset();
  }

  return (
    <div className="rounded w-full m-auto py-4">
      {" "}
      {/* Adjusted width for desktop */}
      <h3 className="text-5xl sm:text-6xl text-center text-light-gray flex justify-center">
        <span className="whitespace-nowrap">Contact Me!</span>
      </h3>
      <form
        className="w-84 md:w-3/4 h-auto m-auto mt-8 bg-blackish-blue rounded border border-light-gray p-4"
        ref={form}
        onSubmit={sendEmail}
      >
        <div className="rounded w-full py-4 text-light-gray">
          {" "}
          <div className="flex flex-col px-4">
            {" "}
            <label className="text-light-gray text-3xl font-bold">Email</label>
            <input
              name="email"
              className="w-full sm:w-auto h-auto text-lg rounded py-2 px-4 mt-2 text-white bg-gray"
              placeholder="name@company.com"
              required
            />
          </div>
          <div className="flex flex-col pt-4 pb-8 px-4">
            {" "}
            <label className="text-light-gray text-2xl font-bold">
              Message
            </label>
            <textarea
              name="message"
              className="w-full sm:w-auto h-36 sm:h-72 text-lg rounded pt-2 px-4 mt-2 resize-none text-white bg-gray"
              placeholder="Type your message here..."
              required
            />
          </div>
          <div className="w-full flex justify-center">
            {" "}
            <GlassButton
              loading={loading}
              disabled={loading}
              className="min-w-[150px] h-10 rounded-md border-light-gray hover:bg-teal"
            >
              {loading ? "Sending..." : message ? "Success!" : "Submit!"}
            </GlassButton>
          </div>
        </div>
      </form>
    </div>
  );
}

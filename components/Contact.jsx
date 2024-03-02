import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(false); // State to manage loading animation
  const form = useRef();

  function sendEmail(e) {
    e.preventDefault();
    setLoading(true); // Set loading to true when sending email

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
          setMessage(true); // Set message to true only on successful submission
        },
        (error) => {
          console.log(error.text);
          // Handle error, if any
        }
      )
      .finally(() => {
        setLoading(false); // Reset loading after email sent (success or failure)
      });

    e.target.reset();
  }

  return (
    <div className="rounded bg-space w-1/2 m-auto py-4">
      <h3 className="text-5xl text-center text-rose">Contact Me!</h3>
      <form
        className="w-9/12 h-9/12 flex flex-col justify-center"
        ref={form}
        onSubmit={sendEmail}
      >
        <div className="rounded w-1/2 m-auto py-4 flex flex-col text-rose">
          <div className="py-8">
            <label className="text-rose text-2xl font-bold">Email</label>
            <input
              name="email"
              className="w-[300px] h-[40px] text-lg rounded py-4 mt-2 pl-2 text-black"
              placeholder="name@company.com"
              required
            />
          </div>
          <div className="pt-4 pb-8">
            <label className="text-rose text-2xl font-bold">Message</label>
            <textarea
              name="message"
              className="w-[300px] h-[200px] text-lg rounded pt-2 mt-2 pl-2 resize-none text-black"
              placeholder="Type your message here..."
              required
            />
          </div>
          <button
            className={`flex items-center justify-center w-[150px] h-[30px] border border-rose rounded mt-8 ml-20 hover:bg-teal ${
              message ? "bg-teal" : "bg-black"
            } ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
            disabled={loading}
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 mr-3 text-rose"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path className="opacity-75" fill="currentColor"></path>
              </svg>
            )}
            {loading ? "Sending..." : message ? "Success!" : "Submit!"}
          </button>
        </div>
      </form>
    </div>
  );
}

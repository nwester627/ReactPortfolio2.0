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
    <div className="rounded bg-space w-full md:w-1/2 m-auto py-4">
      <h3 className="text-5xl sm:text-6xl text-center text-rose flex justify-center">
        <span className="whitespace-nowrap">Contact Me!</span>
      </h3>

      <form
        className="w-full sm:w-96 h-auto m-auto mt-8 bg-blackish-blue rounded border border-rose p-4" // Added padding here
        ref={form}
        onSubmit={sendEmail}
      >
        <div className="rounded w-full py-4 text-rose">
          {" "}
          <div className="flex flex-col px-4">
            {" "}
            <label className="text-rose text-3xl font-bold">Email</label>
            <input
              name="email"
              className="w-full sm:w-auto h-auto text-lg rounded py-2 px-4 mt-2 text-black" // Adjusted padding here
              placeholder="name@company.com"
              required
            />
          </div>
          <div className="flex flex-col pt-4 pb-8 px-4">
            {" "}
            {/* Added padding and changed to flex flex-col */}
            <label className="text-rose text-2xl font-bold">Message</label>
            <textarea
              name="message"
              className="w-full sm:w-auto h-36 sm:h-72 text-lg rounded pt-2 px-4 mt-2 resize-none text-black" // Adjusted padding here
              placeholder="Type your message here..."
              required
            />
          </div>
          <div className="w-full flex justify-center">
            {" "}
            {/* Added flex justify-center for button alignment */}
            <button
              className={`items-center w-48 sm:w-[150px] h-[30px] border border-rose rounded hover:bg-teal ${
                message ? "bg-teal" : "bg-black"
              } ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
              disabled={loading}
              style={{ padding: "0 4px" }}
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
        </div>
        <span className="text-center block mt-4">
          If you would like to save my email for future reference, I can be
          reached at{" "}
          <a className="text-teal" href="nwester627@yahoo.com">
            nwester627@yahoo.com
          </a>
        </span>
      </form>
    </div>
  );
}

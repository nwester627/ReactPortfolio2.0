import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import {
  SERVICE_ID,
  TEMPLATE_ID_EMPLOYER,
  TEMPLATE_ID_WEBSITE,
  PUBLIC_KEY,
} from "@/lib/emailConfig";
import GlassButton from "../common/GlassButton";
import { useTheme } from "@/context/ThemeContext";
import { Motion, spring } from "react-motion";

export default function Contact() {
  // --- Common Hooks ---
  const { isDarkMode } = useTheme();
  const [userType, setUserType] = useState(null); // 'employer', 'website', or null
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(""); // 'success' or 'error'

  // --- Refs for Forms ---
  const employerFormRef = useRef();
  const websiteFormRef = useRef();

  // --- Employer Form State & Logic ---
  const [employerFormData, setEmployerFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    jobLink: "",
    message: "",
  });

  const handleEmployerInputChange = (e) => {
    const { name, value } = e.target;
    setEmployerFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendEmployerInquiry = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    emailjs
      .sendForm(
        SERVICE_ID,
        TEMPLATE_ID_EMPLOYER,
        employerFormRef.current,
        PUBLIC_KEY
      )
      .then(
        () => {
          setMessage("success");
          setEmployerFormData({
            name: "",
            company: "",
            email: "",
            phone: "",
            jobLink: "",
            message: "",
          });
        },
        () => setMessage("error")
      )
      .finally(() => setIsSubmitting(false));
  };

  // --- Website Inquiry Form State & Logic ---
  const [websiteFormData, setWebsiteFormData] = useState({
    name: "",
    email: "",
    phone: "",
    details: "",
  });

  const handleWebsiteInputChange = (e) => {
    const { name, value } = e.target;
    setWebsiteFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendWebsiteInquiry = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    emailjs
      .sendForm(
        SERVICE_ID,
        TEMPLATE_ID_WEBSITE,
        websiteFormRef.current,
        PUBLIC_KEY
      )
      .then(
        () => {
          setMessage("success");
          setWebsiteFormData({ name: "", email: "", phone: "", details: "" });
        },
        () => setMessage("error")
      )
      .finally(() => setIsSubmitting(false));
  };

  // --- Reusable Helper Function for Input Styling ---
  const getInputClasses = () => {
    let base =
      "peer w-full rounded-xl border px-4 pt-5 pb-2 text-sm sm:text-base lg:text-lg font-medium outline-none transition-all duration-300 focus:ring-2 focus:ring-lavender/60 focus:border-lavender/60 bg-transparent";
    if (isDarkMode) {
      base += " border-white/15 text-white placeholder:text-white bg-black/80";
    } else {
      base +=
        " border-light-primary/20 text-light-text/90 placeholder:text-light-text/60 bg-white/95";
    }
    base += " sm:px-5 sm:pt-6 sm:pb-3 lg:px-6 lg:pt-7 lg:pb-4";
    return base;
  };
  const renderSuccessMessage = () => (
    <div className="mt-6 sm:mt-7 lg:mt-8 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
      <p className="font-semibold text-green-400">
        Message sent successfully!
        <br />
        <span className="font-normal text-green-200">
          Thank you for reaching out. I'll get back to you soon.
        </span>
      </p>
    </div>
  );

  const renderErrorMessage = () => (
    <div className="mt-6 sm:mt-7 lg:mt-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
      <p className="font-semibold text-red-400">Failed to send message.</p>
      <p className="text-sm text-red-300/80 mt-1">
        Something went wrong. Please try again later.
      </p>
    </div>
  );

  // --- Render Logic ---
  return (
    <section
      aria-labelledby="contact-heading"
      className="px-4 pt-4 sm:pt-6 lg:pt-8 pb-10 sm:pb-12 lg:pb-16"
    >
      <Motion
        defaultStyle={{ t: 0 }}
        style={{ t: spring(1, { stiffness: 120, damping: 16 }) }}
      >
        {(style) => {
          const t = style.t;
          const opacity = 0.8 + 0.2 * t;
          const translateY = (1 - t) * 10;
          return (
            <div
              className="flex flex-col items-start mb-8 sm:mb-10 lg:mb-12"
              style={{
                opacity,
                transform: `translateY(${translateY}px)`,
              }}
            >
              <h2
                id="contact-heading"
                className={`text-[clamp(2.25rem,5vw,3.5rem)] font-bold tracking-tight leading-tight text-left mb-2 bg-gradient-to-r ${
                  isDarkMode
                    ? "from-lavender via-light-gray to-white/85"
                    : "from-light-primary via-lavender to-light-text accent-shadow"
                } bg-clip-text text-transparent`}
              >
                Contact
              </h2>
              <div className="h-[3px] w-32 rounded-full bg-gradient-to-r from-rose via-lavender to-lavender/60" />
            </div>
          );
        }}
      </Motion>
      {/* ==================================================================== */}
      {/* VIEW 1: Initial Selection Screen                                     */}
      {/* ==================================================================== */}
      {userType === null && (
        <div
          className={`w-11/12 sm:w-5/6 md:w-4/5 lg:w-3/4 xl:w-2/3 mx-auto mt-8 rounded-2xl p-6 sm:p-8 lg:p-10 xl:p-12 border backdrop-blur-md shadow-sm transition-shadow duration-500 ${
            isDarkMode
              ? "border-white/8 bg-white/[0.05]"
              : "border-light-primary/15 bg-white/80 supports-[backdrop-filter]:bg-white/65"
          } flex flex-col items-center animate-[materialize_0.85s_cubic-bezier(.33,1,.68,1)_forwards]`}
        >
          <p className={isDarkMode ? "text-light-gray" : "text-light-text"}>
            How can I help you today?
          </p>
          <div className="mt-4 flex flex-col sm:flex-row gap-6 w-full justify-center">
            <button
              type="button"
              className={`flex-1 flex items-center justify-center px-5 py-3 sm:px-6 sm:py-4 lg:px-7 lg:py-5 rounded-xl font-semibold text-sm sm:text-base lg:text-lg shadow-md transition-all duration-200 border focus:outline-none focus-visible:ring-2 focus-visible:ring-lavender/60 ${
                isDarkMode
                  ? "bg-white/10 border-white/20 text-white hover:bg-lavender/10 hover:text-lavender"
                  : "bg-white/80 border-light-primary/20 text-light-text hover:bg-lavender/10 hover:text-lavender"
              }`}
              onClick={() => {
                setUserType("employer");
                setMessage("");
              }}
            >
              <span className="block w-full text-center">I'm an employer</span>
            </button>
            <button
              type="button"
              className={`flex-1 flex items-center justify-center px-5 py-3 sm:px-6 sm:py-4 lg:px-7 lg:py-5 rounded-xl font-semibold text-sm sm:text-base lg:text-lg shadow-md transition-all duration-200 border focus:outline-none focus-visible:ring-2 focus-visible:ring-lavender/60 ${
                isDarkMode
                  ? "bg-white/10 border-white/20 text-white hover:bg-lavender/10 hover:text-lavender"
                  : "bg-white/80 border-light-primary/20 text-light-text hover:bg-lavender/10 hover:text-lavender"
              }`}
              onClick={() => {
                setUserType("website");
                setMessage("");
              }}
            >
              <span className="block w-full text-center">
                Help me build a website
              </span>
            </button>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* VIEW 2: Employer Form (New Single-Page Version)                      */}
      {/* ==================================================================== */}
      {userType === "employer" && (
        <form
          ref={employerFormRef}
          onSubmit={sendEmployerInquiry}
          className={`w-11/12 sm:w-5/6 md:w-4/5 lg:w-3/4 xl:w-2/3 mx-auto mt-8 rounded-2xl p-6 sm:p-8 lg:p-10 xl:p-12 border backdrop-blur-md will-change-transform opacity-0 translate-y-4 scale-[0.985] animate-[materialize_0.85s_cubic-bezier(.33,1,.68,1)_forwards] shadow-sm focus-within:shadow-md transition-shadow duration-500 ${
            isDarkMode
              ? "border-white/8 bg-white/[0.05]"
              : "border-light-primary/15 bg-white/80 supports-[backdrop-filter]:bg-white/65"
          }`}
          data-theme={isDarkMode ? "dark" : "light"}
        >
          <button
            type="button"
            className="mb-4 sm:mb-5 lg:mb-6 text-lavender hover:underline font-medium text-base"
            onClick={() => setUserType(null)}
          >
            ← Back
          </button>
          <h2
            className={`text-[clamp(2.25rem,5vw,3.25rem)] font-bold tracking-tight leading-tight text-left mb-2 bg-gradient-to-r ${
              isDarkMode
                ? "from-lavender via-light-gray to-white/85"
                : "from-light-primary via-lavender to-light-text accent-shadow"
            } bg-clip-text text-transparent`}
          >
            Employer Inquiry
            <div className="mt-1 h-[3px] w-24 rounded-full bg-gradient-to-r from-rose via-lavender to-lavender/60" />
          </h2>
          <div className="space-y-6 sm:space-y-7 lg:space-y-8 mt-8">
            <div className="relative">
              <input
                name="name"
                type="text"
                value={employerFormData.name}
                onChange={handleEmployerInputChange}
                className={`${getInputClasses()} h-14 sm:h-16 lg:h-18`}
                placeholder=" "
                required
              />
              <label
                className={`absolute left-4 top-4 sm:left-5 sm:top-5 lg:left-6 lg:top-6 text-sm sm:text-base font-medium transition-all duration-300 pointer-events-none ${
                  employerFormData.name
                    ? "top-[-26px] sm:top-[-28px] lg:top-[-30px] text-sm text-lavender"
                    : "peer-placeholder-shown:top-4 peer-placeholder-shown:sm:top-5 peer-placeholder-shown:lg:top-6 peer-placeholder-shown:text-lg peer-focus:top-[-26px] peer-focus:sm:top-[-28px] peer-focus:lg:top-[-30px] peer-focus:text-sm peer-focus:text-lavender"
                }`}
              >
                Name *
              </label>
            </div>
            <div className="relative">
              <input
                name="company"
                type="text"
                value={employerFormData.company}
                onChange={handleEmployerInputChange}
                className={`${getInputClasses()} h-14 sm:h-16 lg:h-18`}
                placeholder=" "
                required
              />
              <label
                className={`absolute left-4 top-4 sm:left-5 sm:top-5 lg:left-6 lg:top-6 text-sm sm:text-base font-medium transition-all duration-300 pointer-events-none ${
                  employerFormData.company
                    ? "top-[-26px] sm:top-[-28px] lg:top-[-30px] text-sm text-lavender"
                    : "peer-placeholder-shown:top-4 peer-placeholder-shown:sm:top-5 peer-placeholder-shown:lg:top-6 peer-placeholder-shown:text-lg peer-focus:top-[-26px] peer-focus:sm:top-[-28px] peer-focus:lg:top-[-30px] peer-focus:text-sm peer-focus:text-lavender"
                }`}
              >
                Company *
              </label>
            </div>
            <div className="relative">
              <input
                name="email"
                type="email"
                value={employerFormData.email}
                onChange={handleEmployerInputChange}
                className={`${getInputClasses()} h-14 sm:h-16 lg:h-18`}
                placeholder=" "
                required
              />
              <label
                className={`absolute left-4 top-4 sm:left-5 sm:top-5 lg:left-6 lg:top-6 text-sm sm:text-base font-medium transition-all duration-300 pointer-events-none ${
                  employerFormData.email
                    ? "top-[-26px] sm:top-[-28px] lg:top-[-30px] text-sm text-lavender"
                    : "peer-placeholder-shown:top-4 peer-placeholder-shown:sm:top-5 peer-placeholder-shown:lg:top-6 peer-placeholder-shown:text-lg peer-focus:top-[-26px] peer-focus:sm:top-[-28px] peer-focus:lg:top-[-30px] peer-focus:text-sm peer-focus:text-lavender"
                }`}
              >
                Email *
              </label>
            </div>
            <div className="relative">
              <input
                name="phone"
                type="tel"
                value={employerFormData.phone}
                onChange={handleEmployerInputChange}
                className={`${getInputClasses()} h-14 sm:h-16 lg:h-18`}
                placeholder=" "
              />
              <label
                className={`absolute left-4 top-4 sm:left-5 sm:top-5 lg:left-6 lg:top-6 text-sm sm:text-base font-medium transition-all duration-300 pointer-events-none ${
                  employerFormData.phone
                    ? "top-[-26px] sm:top-[-28px] lg:top-[-30px] text-sm text-lavender"
                    : "peer-placeholder-shown:top-4 peer-placeholder-shown:sm:top-5 peer-placeholder-shown:lg:top-6 peer-placeholder-shown:text-lg peer-focus:top-[-26px] peer-focus:sm:top-[-28px] peer-focus:lg:top-[-30px] peer-focus:text-sm peer-focus:text-lavender"
                }`}
              >
                Phone Number
              </label>
            </div>
            <div className="relative">
              <input
                name="jobLink"
                type="url"
                value={employerFormData.jobLink}
                onChange={handleEmployerInputChange}
                className={`${getInputClasses()} h-14 sm:h-16 lg:h-18`}
                placeholder=" "
              />
              <label
                className={`absolute left-4 top-4 sm:left-5 sm:top-5 lg:left-6 lg:top-6 text-sm sm:text-base font-medium transition-all duration-300 pointer-events-none ${
                  employerFormData.jobLink
                    ? "top-[-26px] sm:top-[-28px] lg:top-[-30px] text-sm text-lavender"
                    : "peer-placeholder-shown:top-4 peer-placeholder-shown:sm:top-5 peer-placeholder-shown:lg:top-6 peer-placeholder-shown:text-lg peer-focus:top-[-26px] peer-focus:sm:top-[-28px] peer-focus:lg:top-[-30px] peer-focus:text-sm peer-focus:text-lavender"
                }`}
              >
                Link to Job Description
              </label>
            </div>
            <div className="relative">
              <textarea
                name="message"
                value={employerFormData.message}
                onChange={handleEmployerInputChange}
                className={`${getInputClasses()} h-28 sm:h-32 lg:h-36 resize-none`}
                placeholder=" "
                required
              ></textarea>
              <label
                className={`absolute left-4 top-4 sm:left-5 sm:top-5 lg:left-6 lg:top-6 text-sm sm:text-base font-medium transition-all duration-300 pointer-events-none ${
                  employerFormData.message
                    ? "top-[-26px] sm:top-[-28px] lg:top-[-30px] text-sm text-lavender"
                    : "peer-placeholder-shown:top-4 peer-placeholder-shown:sm:top-5 peer-placeholder-shown:lg:top-6 peer-placeholder-shown:text-lg peer-focus:top-[-26px] peer-focus:sm:top-[-28px] peer-focus:lg:top-[-30px] peer-focus:text-sm peer-focus:text-lavender"
                }`}
              >
                Message *
              </label>
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <GlassButton
              type="submit"
              size="lg"
              variant="primary"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Inquiry"}
            </GlassButton>
          </div>
          {message === "success" && renderSuccessMessage()}
          {message === "error" && renderErrorMessage()}
        </form>
      )}

      {/* ==================================================================== */}
      {/* VIEW 3: Website Inquiry Form                                         */}
      {/* ==================================================================== */}
      {userType === "website" && (
        <form
          ref={websiteFormRef}
          onSubmit={sendWebsiteInquiry}
          className={`w-11/12 sm:w-5/6 md:w-4/5 lg:w-3/4 xl:w-2/3 mx-auto mt-8 rounded-2xl p-6 sm:p-8 lg:p-10 xl:p-12 border backdrop-blur-md will-change-transform opacity-0 translate-y-4 scale-[0.985] animate-[materialize_0.85s_cubic-bezier(.33,1,.68,1)_forwards] shadow-sm focus-within:shadow-md transition-shadow duration-500 ${
            isDarkMode
              ? "border-white/8 bg-white/[0.05]"
              : "border-light-primary/15 bg-white/80 supports-[backdrop-filter]:bg-white/65"
          }`}
          data-theme={isDarkMode ? "dark" : "light"}
        >
          <button
            type="button"
            className="mb-4 sm:mb-5 lg:mb-6 text-lavender hover:underline font-medium text-base"
            onClick={() => setUserType(null)}
          >
            ← Back
          </button>
          <h2
            className={`text-[clamp(2.25rem,5vw,3.25rem)] font-bold tracking-tight leading-tight text-left mb-2 bg-gradient-to-r ${
              isDarkMode
                ? "from-lavender via-light-gray to-white/85"
                : "from-light-primary via-lavender to-light-text accent-shadow"
            } bg-clip-text text-transparent`}
          >
            Project Inquiry
            <div className="mt-1 h-[3px] w-24 rounded-full bg-gradient-to-r from-rose via-lavender to-lavender/60" />
          </h2>
          <div className="space-y-6 sm:space-y-7 lg:space-y-8 mt-8">
            <div className="relative">
              <input
                name="name"
                type="text"
                value={websiteFormData.name}
                onChange={handleWebsiteInputChange}
                className={`${getInputClasses()} h-14 sm:h-16 lg:h-18`}
                placeholder=" "
                required
              />
              <label
                className={`absolute left-4 top-4 sm:left-5 sm:top-5 lg:left-6 lg:top-6 text-sm sm:text-base font-medium transition-all duration-300 pointer-events-none ${
                  websiteFormData.name
                    ? "top-[-26px] sm:top-[-28px] lg:top-[-30px] text-sm text-lavender"
                    : "peer-placeholder-shown:top-4 peer-placeholder-shown:sm:top-5 peer-placeholder-shown:lg:top-6 peer-placeholder-shown:text-lg peer-focus:top-[-26px] peer-focus:sm:top-[-28px] peer-focus:lg:top-[-30px] peer-focus:text-sm peer-focus:text-lavender"
                }`}
              >
                Name *
              </label>
            </div>
            <div className="relative">
              <input
                name="email"
                type="email"
                value={websiteFormData.email}
                onChange={handleWebsiteInputChange}
                className={`${getInputClasses()} h-14 sm:h-16 lg:h-18`}
                placeholder=" "
                required
              />
              <label
                className={`absolute left-4 top-4 sm:left-5 sm:top-5 lg:left-6 lg:top-6 text-sm sm:text-base font-medium transition-all duration-300 pointer-events-none ${
                  websiteFormData.email
                    ? "top-[-26px] sm:top-[-28px] lg:top-[-30px] text-sm text-lavender"
                    : "peer-placeholder-shown:top-4 peer-placeholder-shown:sm:top-5 peer-placeholder-shown:lg:top-6 peer-placeholder-shown:text-lg peer-focus:top-[-26px] peer-focus:sm:top-[-28px] peer-focus:lg:top-[-30px] peer-focus:text-sm peer-focus:text-lavender"
                }`}
              >
                Email *
              </label>
            </div>
            <div className="relative">
              <input
                name="phone"
                type="tel"
                value={websiteFormData.phone}
                onChange={handleWebsiteInputChange}
                className={`${getInputClasses()} h-14 sm:h-16 lg:h-18`}
                placeholder=" "
              />
              <label
                className={`absolute left-4 top-4 sm:left-5 sm:top-5 lg:left-6 lg:top-6 text-sm sm:text-base font-medium transition-all duration-300 pointer-events-none ${
                  websiteFormData.phone
                    ? "top-[-26px] sm:top-[-28px] lg:top-[-30px] text-sm text-lavender"
                    : "peer-placeholder-shown:top-4 peer-placeholder-shown:sm:top-5 peer-placeholder-shown:lg:top-6 peer-placeholder-shown:text-lg peer-focus:top-[-26px] peer-focus:sm:top-[-28px] peer-focus:lg:top-[-30px] peer-focus:text-sm peer-focus:text-lavender"
                }`}
              >
                Phone Number
              </label>
            </div>
            <div className="relative">
              <textarea
                name="details"
                value={websiteFormData.details}
                onChange={handleWebsiteInputChange}
                className={`${getInputClasses()} h-32 sm:h-36 lg:h-40 resize-none`}
                placeholder=" "
                required
              ></textarea>
              <label
                className={`absolute left-4 top-4 sm:left-5 sm:top-5 lg:left-6 lg:top-6 text-sm sm:text-base font-medium transition-all duration-300 pointer-events-none ${
                  websiteFormData.details
                    ? "top-[-26px] sm:top-[-28px] lg:top-[-30px] text-sm text-lavender"
                    : "peer-placeholder-shown:top-4 peer-placeholder-shown:sm:top-5 peer-placeholder-shown:lg:top-6 peer-placeholder-shown:text-lg peer-focus:top-[-26px] peer-focus:sm:top-[-28px] peer-focus:lg:top-[-30px] peer-focus:text-sm peer-focus:text-lavender"
                }`}
              >
                How can I help? *
              </label>
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <GlassButton
              type="submit"
              size="lg"
              variant="primary"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Inquiry"}
            </GlassButton>
          </div>
          {message === "success" && renderSuccessMessage()}
          {message === "error" && renderErrorMessage()}
        </form>
      )}
    </section>
  );
}

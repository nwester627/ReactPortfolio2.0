import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import emailjs from "@emailjs/browser";
import { Typewriter } from "react-simple-typewriter";
import GlassButton from "../common/GlassButton";
import { useTheme } from "@/context/ThemeContext";

export default function Contact() {
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageLength, setMessageLength] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    company: "",
    timeline: "",
    budget: "",
    attachments: [],
  });
  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const form = useRef();
  const { isDarkMode } = useTheme();
  const prefersReducedMotion = useRef(false);

  const MAX_MESSAGE_LENGTH = 2000;
  const TOTAL_STEPS = 3;

  const subjectOptions = [
    { value: "", label: "Select a topic..." },
    { value: "web-development", label: "Web Development Project" },
    { value: "consultation", label: "Technical Consultation" },
    { value: "collaboration", label: "Collaboration Opportunity" },
    { value: "employment", label: "Employment Inquiry" },
    { value: "other", label: "Other" },
  ];

  const timelineOptions = [
    { value: "", label: "Select timeline..." },
    { value: "asap", label: "ASAP (Rush job)" },
    { value: "1-2weeks", label: "1-2 weeks" },
    { value: "1month", label: "1 month" },
    { value: "2-3months", label: "2-3 months" },
    { value: "6months+", label: "6+ months" },
    { value: "flexible", label: "Flexible" },
  ];

  const budgetOptions = [
    { value: "", label: "Select budget range..." },
    { value: "under-5k", label: "Under $5,000" },
    { value: "5k-15k", label: "$5,000 - $15,000" },
    { value: "15k-50k", label: "$15,000 - $50,000" },
    { value: "50k+", label: "$50,000+" },
    { value: "discuss", label: "Let's discuss" },
  ];

  const steps = [
    { id: 1, title: "Basic Info", description: "Name, email & topic" },
    {
      id: 2,
      title: "Project Details",
      description: "Timeline, budget & company",
    },
    { id: 3, title: "Message & Files", description: "Details & attachments" },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      prefersReducedMotion.current = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // Load saved draft
      const savedDraft = localStorage.getItem("contact-form-draft");
      if (savedDraft) {
        try {
          const parsedDraft = JSON.parse(savedDraft);
          setFormData(parsedDraft);
          setMessageLength(parsedDraft.message?.length || 0);
          setIsDraftSaved(true);
        } catch (e) {
          console.error("Error loading draft:", e);
        }
      }
    }
  }, []);

  // Auto-save draft
  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        Object.values(formData).some((value) =>
          Array.isArray(value) ? value.length > 0 : value.trim()
        )
      ) {
        localStorage.setItem("contact-form-draft", JSON.stringify(formData));
        setIsDraftSaved(true);
        // Don't set it back to false here to avoid infinite loop
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [formData]);

  // Reset draft saved indicator
  useEffect(() => {
    if (isDraftSaved) {
      const timer = setTimeout(() => setIsDraftSaved(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isDraftSaved]);

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Pure validation helper that DOES NOT mutate state (safe to call during render logic)
  const getFieldError = useCallback(
    (name, value) => {
      switch (name) {
        case "name":
          if (!value.trim()) return "Name is required";
          if (value.trim().length < 2)
            return "Name must be at least 2 characters";
          return null;
        case "email":
          if (!value.trim()) return "Email is required";
          if (!validateEmail(value))
            return "Please enter a valid email address";
          return null;
        case "subject":
          if (!value) return "Please select a topic";
          return null;
        case "message":
          if (!value.trim()) return "Message is required";
          if (value.trim().length < 10)
            return "Message must be at least 10 characters";
          if (value.length > MAX_MESSAGE_LENGTH)
            return `Message must be under ${MAX_MESSAGE_LENGTH} characters`;
          return null;
        default:
          return null;
      }
    },
    [MAX_MESSAGE_LENGTH]
  );

  // Imperative validator that UPDATES state (only call in handlers, never in render)
  const validateField = useCallback(
    (name, value) => {
      const errorMsg = getFieldError(name, value);
      setErrors((prev) => {
        const next = { ...prev };
        if (errorMsg) next[name] = errorMsg;
        else delete next[name];
        return next;
      });
      return !errorMsg;
    },
    [getFieldError]
  );

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      if (name === "message") {
        setMessageLength(value.length);
      }

      // Clear error when user starts typing
      if (errors[name]) {
        validateField(name, value);
      }
    },
    [errors]
  );

  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    validateField(name, value);
  }, []);

  const handleFileUpload = useCallback((e) => {
    const files = Array.from(e.target.files);
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/gif",
      "text/plain",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const validFiles = files.filter((file) => {
      if (file.size > maxSize) {
        alert(`File ${file.name} is too large. Maximum size is 10MB.`);
        return false;
      }
      if (!allowedTypes.includes(file.type)) {
        alert(`File ${file.name} is not supported.`);
        return false;
      }
      return true;
    });

    setFormData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...validFiles],
    }));
  }, []);

  const removeFile = useCallback((index) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  }, []);

  // Pure step validity (no state mutation)
  const isCurrentStepValid = useMemo(() => {
    switch (currentStep) {
      case 1:
        return [
          getFieldError("name", formData.name),
          getFieldError("email", formData.email),
          getFieldError("subject", formData.subject),
        ].every((err) => !err);
      case 2:
        return true; // All optional
      case 3:
        return !getFieldError("message", formData.message);
      default:
        return false;
    }
  }, [currentStep, formData, getFieldError]);

  const nextStep = useCallback(() => {
    // Run validation only for required fields of this step (updates error state once)
    if (currentStep === 1) {
      const a = validateField("name", formData.name);
      const b = validateField("email", formData.email);
      const c = validateField("subject", formData.subject);
      if (!(a && b && c)) return;
    }
    if (currentStep === 3) {
      if (!validateField("message", formData.message)) return;
    }
    if (currentStep < TOTAL_STEPS && isCurrentStepValid) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep, formData, isCurrentStepValid, validateField]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const clearDraft = useCallback(() => {
    localStorage.removeItem("contact-form-draft");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
      company: "",
      timeline: "",
      budget: "",
      attachments: [],
    });
    setMessageLength(0);
    setCurrentStep(1);
  }, []);

  const getInputClasses = (fieldName) => {
    const hasError = errors[fieldName];
    const baseClasses = `peer w-full text-base sm:text-lg rounded-xl py-3 px-4 border backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent`;

    if (hasError) {
      return `${baseClasses} ${
        isDarkMode
          ? "text-light-gray bg-white/[0.05] border-red-400/60 hover:border-red-400/80 focus:ring-red-400/60"
          : "text-light-text bg-white/80 supports-[backdrop-filter]:bg-white/60 border-red-400/60 hover:border-red-400/80 focus:ring-red-400/50"
      }`;
    }

    return `${baseClasses} ${
      isDarkMode
        ? "text-light-gray bg-white/[0.05] border-white/10 hover:border-white/20 focus:ring-lavender/60"
        : "text-light-text bg-white/80 supports-[backdrop-filter]:bg-white/60 border-light-primary/25 hover:border-light-primary/50 focus:ring-light-primary/50"
    }`;
  };

  function sendEmail(e) {
    e.preventDefault();

    // Final validation
    const isNameValid = validateField("name", formData.name);
    const isEmailValid = validateField("email", formData.email);
    const isSubjectValid = validateField("subject", formData.subject);
    const isMessageValid = validateField("message", formData.message);

    if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    // Create form data for EmailJS
    const emailData = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      company: formData.company || "Not specified",
      timeline: formData.timeline || "Not specified",
      budget: formData.budget || "Not specified",
      attachments_count: formData.attachments.length,
    };

    // For now, we'll send without file attachments via EmailJS
    // In a real implementation, you'd need a backend to handle file uploads
    emailjs
      .send(
        "service_dj3jp0v",
        "template_f6yvspc",
        emailData,
        "qY8OSrRdpQ5DTHQ_X"
      )
      .then(() => {
        setMessage("success");
        setErrors({});
        clearDraft();
        setTimeout(() => setMessage(""), 5000);
      })
      .catch((err) => {
        console.error("Error sending email:", err);
        setMessage("error");
        setTimeout(() => setMessage(""), 5000);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  const getProgressPercentage = () => {
    return ((currentStep - 1) / (TOTAL_STEPS - 1)) * 100;
  };

  const ProgressIndicator = () => (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                step.id <= currentStep
                  ? isDarkMode
                    ? "bg-lavender/30 text-lavender ring-2 ring-lavender/50"
                    : "bg-lavender/40 text-white ring-2 ring-lavender/60"
                  : isDarkMode
                  ? "bg-white/10 text-light-gray/60 ring-2 ring-white/20"
                  : "bg-light-primary/10 text-light-text/60 ring-2 ring-light-primary/20"
              }`}
            >
              {step.id < currentStep ? (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                step.id
              )}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-4 transition-colors duration-300 ${
                  step.id < currentStep
                    ? "bg-lavender/60"
                    : isDarkMode
                    ? "bg-white/20"
                    : "bg-light-primary/20"
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="text-center">
        <h3
          className={`text-lg font-semibold ${
            isDarkMode ? "text-light-gray" : "text-light-text"
          }`}
        >
          {steps[currentStep - 1].title}
        </h3>
        <p
          className={`text-sm ${
            isDarkMode ? "text-light-gray/70" : "text-light-text/70"
          }`}
        >
          {steps[currentStep - 1].description}
        </p>
      </div>
    </div>
  );

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
        {/* Progress Indicator */}
        <ProgressIndicator />
        {/* Auto-save indicator */}
        {isDraftSaved && (
          <div className="mb-4 text-center">
            <span
              className={`inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full ${
                isDarkMode
                  ? "bg-green-500/10 text-green-400"
                  : "bg-green-500/15 text-green-600"
              }`}
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Draft saved
            </span>
          </div>
        )}
        {/* Step 1: Basic Info */}
        {currentStep === 1 && (
          <div className="space-y-6">
            {/* Name Field */}
            <div className="relative">
              <input
                name="name"
                type="text"
                value={formData.name}
                className={`${getInputClasses("name")} h-16`}
                required
                aria-label="Name"
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
              <label
                className={`absolute left-4 top-4 text-sm sm:text-base font-medium transition-all duration-300 pointer-events-none ${
                  formData.name
                    ? "top-[-20px] text-sm text-lavender"
                    : "peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray peer-focus:top-[-20px] peer-focus:text-sm"
                } ${
                  errors.name
                    ? "text-red-400"
                    : "peer-focus:text-lavender text-light-gray"
                }`}
              >
                Name *
              </label>
              {errors.name && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="relative">
              <input
                name="email"
                type="email"
                value={formData.email}
                className={`${getInputClasses("email")} h-16`}
                required
                aria-label="Email"
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
              <label
                className={`absolute left-4 top-4 text-sm sm:text-base font-medium transition-all duration-300 pointer-events-none ${
                  formData.email
                    ? "top-[-20px] text-sm text-lavender"
                    : "peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray peer-focus:top-[-20px] peer-focus:text-sm"
                } ${
                  errors.email
                    ? "text-red-400"
                    : "peer-focus:text-lavender text-light-gray"
                }`}
              >
                Email *
              </label>
              {errors.email && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Subject Dropdown */}
            <div className="relative">
              <select
                name="subject"
                value={formData.subject}
                className={`${getInputClasses("subject")} h-16 cursor-pointer`}
                required
                aria-label="Subject"
                onChange={handleInputChange}
                onBlur={handleBlur}
              >
                {subjectOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <label
                className={`absolute left-4 top-[-20px] text-sm font-medium transition-all duration-300 pointer-events-none ${
                  errors.subject ? "text-red-400" : "text-lavender"
                }`}
              >
                Subject *
              </label>
              {errors.subject && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.subject}
                </p>
              )}
            </div>
          </div>
        )}
        {/* Step 2: Project Details */}
        {currentStep === 2 && (
          <div className="space-y-6">
            {/* Company Field */}
            <div className="relative">
              <input
                name="company"
                type="text"
                value={formData.company}
                className={`${getInputClasses("company")} h-16`}
                aria-label="Company"
                onChange={handleInputChange}
              />
              <label
                className={`absolute left-4 top-4 text-sm sm:text-base font-medium transition-all duration-300 pointer-events-none ${
                  formData.company
                    ? "top-[-20px] text-sm text-lavender"
                    : "peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray peer-focus:top-[-20px] peer-focus:text-sm peer-focus:text-lavender text-light-gray"
                }`}
              >
                Company (Optional)
              </label>
            </div>

            {/* Timeline Dropdown */}
            <div className="relative">
              <select
                name="timeline"
                value={formData.timeline}
                className={`${getInputClasses("timeline")} h-16 cursor-pointer`}
                aria-label="Timeline"
                onChange={handleInputChange}
              >
                {timelineOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <label className="absolute left-4 top-[-20px] text-sm font-medium text-lavender pointer-events-none">
                Timeline (Optional)
              </label>
            </div>

            {/* Budget Dropdown */}
            <div className="relative">
              <select
                name="budget"
                value={formData.budget}
                className={`${getInputClasses("budget")} h-16 cursor-pointer`}
                aria-label="Budget"
                onChange={handleInputChange}
              >
                {budgetOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <label className="absolute left-4 top-[-20px] text-sm font-medium text-lavender pointer-events-none">
                Budget Range (Optional)
              </label>
            </div>

            {/* Calendar Integration Placeholder */}
            <div
              className={`p-4 rounded-xl border-2 border-dashed transition-colors ${
                isDarkMode
                  ? "border-white/20 bg-white/5"
                  : "border-light-primary/30 bg-light-primary/5"
              }`}
            >
              <div className="text-center">
                <svg
                  className={`w-8 h-8 mx-auto mb-2 ${
                    isDarkMode ? "text-light-gray/60" : "text-light-text/60"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p
                  className={`text-sm font-medium ${
                    isDarkMode ? "text-light-gray/80" : "text-light-text/80"
                  }`}
                >
                  Want to schedule a call?
                </p>
                <p
                  className={`text-xs ${
                    isDarkMode ? "text-light-gray/60" : "text-light-text/60"
                  }`}
                >
                  Calendar integration coming soon
                </p>
              </div>
            </div>
          </div>
        )}
        {/* Step 3: Message & Files */}
        {currentStep === 3 && (
          <div className="space-y-6">
            {/* Message Field with Character Counter */}
            <div className="relative">
              <textarea
                name="message"
                value={formData.message}
                className={`${getInputClasses(
                  "message"
                )} h-64 resize-none caret-lavender`}
                required
                aria-label="Message"
                maxLength={MAX_MESSAGE_LENGTH}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
              <label
                className={`absolute left-4 top-4 text-sm sm:text-base font-medium transition-all duration-300 pointer-events-none ${
                  formData.message
                    ? "top-[-20px] text-sm text-lavender"
                    : "peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray peer-focus:top-[-20px] peer-focus:text-sm"
                } ${
                  errors.message
                    ? "text-red-400"
                    : "peer-focus:text-lavender text-light-gray"
                }`}
              >
                Message *
              </label>
              <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                {messageLength}/{MAX_MESSAGE_LENGTH}
              </div>
              {errors.message && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.message}
                </p>
              )}
            </div>

            {/* File Upload */}
            <div
              className={`p-6 rounded-xl border-2 border-dashed transition-colors ${
                isDarkMode
                  ? "border-white/20 bg-white/5 hover:border-white/30"
                  : "border-light-primary/30 bg-light-primary/5 hover:border-light-primary/40"
              }`}
            >
              <div className="text-center">
                <svg
                  className={`w-8 h-8 mx-auto mb-2 ${
                    isDarkMode ? "text-light-gray/60" : "text-light-text/60"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <input
                  type="file"
                  multiple
                  className="hidden"
                  id="file-upload"
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
                />
                <label
                  htmlFor="file-upload"
                  className={`cursor-pointer text-sm font-medium ${
                    isDarkMode
                      ? "text-light-gray/80 hover:text-light-gray"
                      : "text-light-text/80 hover:text-light-text"
                  } transition-colors`}
                >
                  Click to upload files or drag and drop
                </label>
                <p
                  className={`text-xs mt-1 ${
                    isDarkMode ? "text-light-gray/60" : "text-light-text/60"
                  }`}
                >
                  PDF, DOC, TXT, Images (Max 10MB each)
                </p>
              </div>
            </div>

            {/* Uploaded Files */}
            {formData.attachments.length > 0 && (
              <div className="space-y-2">
                <h4
                  className={`text-sm font-medium ${
                    isDarkMode ? "text-light-gray" : "text-light-text"
                  }`}
                >
                  Attached Files ({formData.attachments.length})
                </h4>
                {formData.attachments.map((file, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      isDarkMode ? "bg-white/5" : "bg-light-primary/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <svg
                        className={`w-5 h-5 ${
                          isDarkMode
                            ? "text-light-gray/60"
                            : "text-light-text/60"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div>
                        <p
                          className={`text-sm font-medium ${
                            isDarkMode ? "text-light-gray" : "text-light-text"
                          }`}
                        >
                          {file.name}
                        </p>
                        <p
                          className={`text-xs ${
                            isDarkMode
                              ? "text-light-gray/60"
                              : "text-light-text/60"
                          }`}
                        >
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className={`p-1 rounded-full transition-colors ${
                        isDarkMode
                          ? "hover:bg-red-500/20 text-red-400"
                          : "hover:bg-red-500/20 text-red-500"
                      }`}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-8">
          <div>
            {currentStep > 1 && (
              <GlassButton
                type="button"
                size="md"
                variant="outline"
                onClick={prevStep}
              >
                ← Previous
              </GlassButton>
            )}
          </div>

          <div className="flex gap-3">
            {currentStep < TOTAL_STEPS ? (
              <GlassButton
                type="button"
                size="md"
                variant="primary"
                onClick={nextStep}
                disabled={!isCurrentStepValid}
              >
                Next →
              </GlassButton>
            ) : (
              <GlassButton
                type="submit"
                size="lg"
                variant="primary"
                loading={isSubmitting}
                disabled={isSubmitting || !isCurrentStepValid}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </GlassButton>
            )}
          </div>
        </div>{" "}
        {/* Enhanced Success/Error Messages */}
        {message === "success" && (
          <div className="mt-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <svg
                className="w-6 h-6 text-green-400 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="font-semibold text-green-400">
                  Message sent successfully!
                </p>
                <p className="text-sm text-green-300/80 mt-1">
                  Thank you for reaching out. I'll get back to you soon.
                </p>
              </div>
            </div>
          </div>
        )}
        {message === "error" && (
          <div className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <svg
                className="w-6 h-6 text-red-400 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="font-semibold text-red-400">
                  Failed to send message
                </p>
                <p className="text-sm text-red-300/80 mt-1">
                  Something went wrong. Please try again or contact me directly.
                </p>
              </div>
            </div>
          </div>
        )}
      </form>
    </section>
  );
}

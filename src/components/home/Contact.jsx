import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import emailjs from "@emailjs/browser";
import GlassButton from "../common/GlassButton";
import { useTheme } from "@/context/ThemeContext";
import { initialState } from "@/lib/constants";

export default function Contact({ layout = "default", mode = "default" }) {
  const form = useRef();
  const { isDarkMode } = useTheme();
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageLength, setMessageLength] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialState);
  const [isDraftSaved, setIsDraftSaved] = useState(false);

  const steps = [
    { id: 1, title: "Basic Info", description: "Your name & work email" },
    {
      id: 2,
      title: "Role Details",
      description: "Company, title, location & logistics",
    },
    { id: 3, title: "Message & Files", description: "Notes & job description" },
  ];

  // Helper function to validate fields
  const validateField = (field, value) => {
    if (mode === "services") {
      if (["name", "email", "projectGoals"].includes(field)) {
        return value && value.trim().length > 0;
      }
    } else {
      if (["name", "email", "subject", "message"].includes(field)) {
        return value && value.trim().length > 0;
      }
    }
    return true;
  };

  // Replace the entire isCurrentStepValid IIFE with this useMemo hook
  const isCurrentStepValid = useMemo(() => {
    switch (currentStep) {
      case 1:
        return (
          validateField("name", formData.name) &&
          validateField("email", formData.email) &&
          (mode === "services" || validateField("subject", formData.subject))
        );
      case 2:
        // For services mode, validate projectGoals before allowing the user to proceed.
        // For default mode, Step 2 fields are optional, so we return true.
        if (mode === "services") {
          return validateField("projectGoals", formData.projectGoals);
        }
        return true;
      case 3:
        return (
          mode === "services" || validateField("message", formData.message)
        );
      default:
        return false; // Should not happen
    }
  }, [currentStep, formData, mode]);

  const TOTAL_STEPS = 3;
  const MAX_MESSAGE_LENGTH = 1000;

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS && isCurrentStepValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleKeyDown = (e) => {
    // Check if the pressed key is 'Enter' and Shift is not held
    if (e.key === "Enter" && !e.shiftKey) {
      // Prevent the default form submission if not on the last step
      if (currentStep < TOTAL_STEPS) {
        e.preventDefault();
        // If the current step is valid, trigger the nextStep function
        if (isCurrentStepValid) {
          nextStep();
        }
      }
      // On the final step, this allows 'Enter' to trigger the submit button
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked
          ? [...(prev[name] || []), value]
          : (prev[name] || []).filter((v) => v !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    if (name === "message") {
      setMessageLength(value.length);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (!validateField(name, value)) {
      setErrors((prev) => ({ ...prev, [name]: "This field is required." }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const clearDraft = useCallback(() => {
    localStorage.removeItem("contact-form-draft");
    setFormData(initialState);
    setMessageLength(0);
    setCurrentStep(1);
    setIsDraftSaved(false);
  }, []);

  function sendEmail(e) {
    e.preventDefault();

    const formFieldsToValidate =
      mode === "services"
        ? ["name", "email", "projectGoals"]
        : ["name", "email", "subject", "message"];
    let formIsValid = true;
    const newErrors = {};

    formFieldsToValidate.forEach((field) => {
      if (!validateField(field, formData[field])) {
        newErrors[field] = "This field is required.";
        formIsValid = false;
      }
    });

    setErrors(newErrors);

    if (!formIsValid) {
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    const emailData = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject || "Not specified",
      message: formData.message || "Not specified",
      company: formData.company || "Not specified",
      hiring_timeline: formData.timeline || "Not specified",
      compensation_range: formData.budget || "Not specified",
      position: formData.position || "Not specified",
      work_arrangement: formData.workArrangement || "Not specified",
      location: formData.location || "Not specified",
      attachments_count: formData.attachments.length,
    };

    if (mode === "services") {
      emailData.business_name = formData.businessName || "Not specified";
      emailData.industry = formData.industry || "Not specified";
      emailData.website = formData.website || "Not specified";
      emailData.project_goals = formData.projectGoals || "Not specified";
      emailData.features = formData.features.join(", ") || "Not specified";
      emailData.budget = formData.budget || "Not specified";
      emailData.timeline = formData.timeline || "Not specified";
      emailData.notes = formData.notes || "Not specified";
    }

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
        console.error("EmailJS Error:", err);
        setMessage("error");
        setTimeout(() => setMessage(""), 5000);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedDraft = localStorage.getItem("contact-form-draft");
      if (savedDraft) {
        try {
          const parsedDraft = JSON.parse(savedDraft);
          setFormData({ ...initialState, ...parsedDraft });
          setMessageLength(parsedDraft.message?.length || 0);
          setIsDraftSaved(true);
        } catch (e) {
          console.error("Error loading draft:", e);
        }
      }
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const hasAnyValue = Object.values(formData).some((value) => {
          if (Array.isArray(value)) return value.length > 0;
          return typeof value === "string" ? value.trim().length > 0 : !!value;
        });

        if (hasAnyValue) {
          localStorage.setItem("contact-form-draft", JSON.stringify(formData));
          setIsDraftSaved(true);
        }
      } catch (e) {
        console.error("Error saving draft:", e);
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [formData]);

  const ProgressIndicator = () => (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center text-base sm:text-lg font-semibold transition-all duration-300 shadow-sm ${
                step.id <= currentStep
                  ? isDarkMode
                    ? "bg-lavender/70 text-white ring-2 ring-lavender/60"
                    : "bg-lavender text-white ring-2 ring-lavender/60"
                  : isDarkMode
                  ? "bg-white/10 text-light-gray/80 ring-2 ring-white/25"
                  : "bg-light-primary/10 text-light-text/80 ring-2 ring-light-primary/25"
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

  const getInputClasses = (field) => {
    let base =
      "peer w-full rounded-xl border px-4 pt-6 pb-2 text-base sm:text-lg font-medium outline-none transition-all duration-300 focus:ring-2 focus:ring-lavender/60 focus:border-lavender/60 bg-transparent placeholder:!text-center placeholder:!align-middle placeholder:!opacity-90";
    if (errors[field]) base += " border-red-400 focus:ring-red-400";
    else if (isDarkMode) {
      base += " border-white/15 text-white placeholder:text-white bg-black/80";
    } else {
      base +=
        " border-light-primary/20 text-light-text/90 placeholder:text-light-text/60 bg-white/95";
    }
    base += " sm:px-5 sm:pt-7 sm:pb-3";
    return base;
  };

  const industryOptions = [
    { value: "", label: "Select industry..." },
    { value: "tech", label: "Technology" },
    { value: "finance", label: "Finance" },
    { value: "health", label: "Healthcare" },
    { value: "education", label: "Education" },
    { value: "other", label: "Other" },
  ];
  const subjectOptions = [
    { value: "", label: "Select employment type..." },
    { value: "fulltime", label: "Full-time" },
    { value: "contract", label: "Contract" },
    { value: "freelance", label: "Freelance" },
    { value: "other", label: "Other" },
  ];
  const featuresOptions = [
    { value: "blog", label: "Blog" },
    { value: "ecommerce", label: "E-commerce" },
    { value: "portfolio", label: "Portfolio" },
    { value: "booking", label: "Booking" },
    { value: "other", label: "Other" },
  ];
  const budgetOptions = [
    { value: "", label: "Select budget..." },
    { value: "1k-5k", label: "$1k - $5k" },
    { value: "5k-10k", label: "$5k - $10k" },
    { value: "10k+", label: "$10k+" },
    { value: "discuss", label: "Let's discuss" },
  ];
  const timelineOptions = [
    { value: "", label: "Select timeline..." },
    { value: "1month", label: "1 month" },
    { value: "3months", label: "3 months" },
    { value: "6months", label: "6 months" },
    { value: "flexible", label: "Flexible" },
  ];
  const compensationOptions = [
    { value: "", label: "Select compensation range..." },
    { value: "50k-80k", label: "$50k - $80k" },
    { value: "80k-120k", label: "$80k - $120k" },
    { value: "120k-160k", label: "$120k - $160k" },
    { value: "160k+", label: "$160k+" },
    { value: "discuss", label: "Let's discuss" },
  ];
  const workArrangementOptions = [
    { value: "", label: "Select work arrangement..." },
    { value: "remote", label: "Remote" },
    { value: "hybrid", label: "Hybrid" },
    { value: "onsite", label: "Onsite" },
  ];

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    setFormData((prev) => ({ ...prev, attachments: files }));
  };
  const removeFile = (index) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  return (
    <section
      aria-labelledby="contact-heading"
      className="w-full flex items-center justify-center py-16"
    >
      <form
        className={`${
          layout === "embedded"
            ? "w-full"
            : "w-11/12 sm:w-5/6 md:w-3/4 lg:w-[52%]"
        } rounded-2xl ${
          layout === "embedded" ? "p-6 sm:p-8" : "p-8 sm:p-10"
        } border backdrop-blur-md will-change-transform opacity-0 translate-y-4 scale-[0.985] animate-[materialize_0.85s_cubic-bezier(.33,1,.68,1)_forwards] shadow-sm focus-within:shadow-md transition-shadow duration-500 ${
          isDarkMode
            ? "border-white/8 bg-white/[0.05]"
            : "border-light-primary/15 bg-white/80 supports-[backdrop-filter]:bg-white/65"
        }`}
        ref={form}
        onSubmit={sendEmail}
        data-theme={isDarkMode ? "dark" : "light"}
      >
        <h2
          id="contact-heading"
          className={`text-[clamp(2.25rem,5vw,3.25rem)] font-bold tracking-tight leading-tight text-center mb-8 bg-gradient-to-r ${
            isDarkMode
              ? "from-lavender via-light-gray to-white/85"
              : "from-light-primary via-lavender to-light-text accent-shadow"
          } bg-clip-text text-transparent`}
        >
          Contact
          <div className="mx-auto mt-3 h-[3px] w-16 rounded-full bg-gradient-to-r from-rose via-lavender to-lavender/60" />
        </h2>
        <ProgressIndicator />
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
        {currentStep === 1 && (
          <div className="space-y-7 md:space-y-8">
            {mode === "services" && (
              <>
                <div className="relative">
                  <input
                    name="name"
                    type="text"
                    value={formData.name}
                    className={`${getInputClasses("name")} h-16`}
                    required
                    aria-label="Your Name"
                    placeholder=" "
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                  />
                  <label
                    className={`absolute left-4 top-4 text-sm sm:text-base font-medium transition-all duration-300 pointer-events-none ${
                      formData.name
                        ? `${
                            isDarkMode
                              ? "top-[-26px] text-sm text-lavender"
                              : "top-[-26px] text-sm text-light-primary font-bold"
                          }`
                        : `peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray peer-focus:top-[-26px] peer-focus:text-sm ${
                            isDarkMode
                              ? "peer-focus:text-lavender"
                              : "peer-focus:text-light-primary peer-focus:font-bold"
                          }`
                    }`}
                  >
                    Your Name *
                  </label>
                </div>
                <div className="relative">
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    className={`${getInputClasses("email")} h-16`}
                    required
                    aria-label="Email"
                    placeholder=" "
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                  />
                  <label
                    className={`absolute left-4 top-4 text-sm sm:text-base font-medium transition-all duration-300 pointer-events-none ${
                      formData.email
                        ? `${
                            isDarkMode
                              ? "top-[-26px] text-sm text-lavender"
                              : "top-[-26px] text-sm text-light-primary font-bold"
                          }`
                        : `peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray peer-focus:top-[-26px] peer-focus:text-sm ${
                            isDarkMode
                              ? "peer-focus:text-lavender"
                              : "peer-focus:text-light-primary peer-focus:font-bold"
                          }`
                    }`}
                  >
                    Email *
                  </label>
                </div>
                <div className="relative">
                  <input
                    name="businessName"
                    type="text"
                    value={formData.businessName}
                    className={`${getInputClasses("businessName")} h-16`}
                    aria-label="Business Name"
                    placeholder=" "
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                  />
                  <label
                    className={`absolute left-4 top-4 text-sm sm:text-base font-medium transition-all duration-300 pointer-events-none ${
                      formData.businessName
                        ? `${
                            isDarkMode
                              ? "top-[-26px] text-sm text-lavender"
                              : "top-[-26px] text-sm text-light-primary font-bold"
                          }`
                        : `peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray peer-focus:top-[-26px] peer-focus:text-sm ${
                            isDarkMode
                              ? "peer-focus:text-lavender"
                              : "peer-focus:text-light-primary peer-focus:font-bold"
                          }`
                    }`}
                  >
                    Business Name
                  </label>
                </div>
                <div className="relative">
                  <div className="relative flex items-center h-16">
                    <select
                      name="industry"
                      value={formData.industry}
                      className={`${getInputClasses(
                        "industry"
                      )} h-full cursor-pointer appearance-none pr-12 bg-transparent flex-1 !flex items-center !py-0`}
                      aria-label="Industry"
                      onChange={handleInputChange}
                      style={{ paddingRight: "2.5rem" }}
                    >
                      {industryOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 flex items-center h-5">
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <label className="absolute left-4 top-[-26px] text-sm font-medium text-lavender pointer-events-none">
                    Industry
                  </label>
                </div>
                <div className="relative">
                  <input
                    name="website"
                    type="url"
                    value={formData.website}
                    className={`${getInputClasses("website")} h-16`}
                    aria-label="Current Website"
                    placeholder=" "
                    onChange={handleInputChange}
                  />
                  <label
                    className={`absolute left-4 top-4 text-sm sm:text-base font-medium transition-all duration-300 pointer-events-none ${
                      formData.website
                        ? `${
                            isDarkMode
                              ? "top-[-26px] text-sm text-lavender"
                              : "top-[-26px] text-sm text-light-primary font-bold"
                          }`
                        : `peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray peer-focus:top-[-26px] peer-focus:text-sm ${
                            isDarkMode
                              ? "peer-focus:text-lavender"
                              : "peer-focus:text-light-primary peer-focus:font-bold"
                          }`
                    }`}
                  >
                    Current Website (if any)
                  </label>
                </div>
              </>
            )}
            {mode !== "services" && (
              <>
                <div className="relative">
                  <input
                    name="name"
                    type="text"
                    value={formData.name}
                    className={`${getInputClasses("name")} h-16`}
                    required
                    aria-label="Name"
                    placeholder=" "
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                  />
                  <label
                    className={`absolute left-4 top-4 text-sm sm:text-base font-medium transition-all duration-300 pointer-events-none ${
                      formData.name
                        ? "top-[-26px] text-sm text-lavender"
                        : "peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray peer-focus:top-[-26px] peer-focus:text-sm"
                    } ${
                      errors.name
                        ? "text-red-400"
                        : isDarkMode
                        ? "peer-focus:text-lavender text-white/90"
                        : "peer-focus:text-lavender text-light-text/80"
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
                <div className="relative">
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    className={`${getInputClasses("email")} h-16`}
                    required
                    aria-label="Work Email"
                    placeholder=" "
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                  />
                  <label
                    className={`absolute left-4 top-4 text-sm sm:text-base font-medium transition-all duration-300 pointer-events-none ${
                      formData.email
                        ? "top-[-26px] text-sm text-lavender"
                        : "peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray peer-focus:top-[-26px] peer-focus:text-sm"
                    } ${
                      errors.email
                        ? "text-red-400"
                        : isDarkMode
                        ? "peer-focus:text-lavender text-white/90"
                        : "peer-focus:text-lavender text-light-text/80"
                    }`}
                  >
                    Work Email *
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
                <div className="relative">
                  <div className="relative flex items-center h-16">
                    <select
                      name="subject"
                      value={formData.subject}
                      className={`${getInputClasses(
                        "subject"
                      )} h-full cursor-pointer appearance-none pr-12 bg-transparent flex-1 !flex items-center !py-0`}
                      required
                      aria-label="Employment Type"
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      style={{
                        paddingRight: "2.5rem",
                        display: "flex",
                        alignItems: "center",
                        height: "100%",
                      }}
                    >
                      {subjectOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 flex items-center h-5">
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <label
                    className={`absolute left-4 top-[-26px] text-sm font-medium transition-all duration-300 pointer-events-none ${
                      errors.subject ? "text-red-400" : "text-lavender"
                    }`}
                  >
                    Employment Type *
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
              </>
            )}
          </div>
        )}
        {currentStep === 2 && (
          <div className="space-y-7 md:space-y-8">
            {mode === "services" && (
              <>
                <div className="relative">
                  <textarea
                    name="projectGoals"
                    value={formData.projectGoals}
                    className={`${getInputClasses(
                      "projectGoals"
                    )} h-32 resize-none caret-lavender`}
                    aria-label="Project Goals"
                    placeholder=" "
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                  />
                  <label
                    className={`absolute left-4 top-4 text-sm sm:text-base font-medium transition-all duration-300 pointer-events-none ${
                      formData.projectGoals
                        ? `${
                            isDarkMode
                              ? "top-[-26px] text-sm text-lavender"
                              : "top-[-26px] text-sm text-light-primary font-bold"
                          }`
                        : `peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray peer-focus:top-[-26px] peer-focus:text-sm ${
                            isDarkMode
                              ? "peer-focus:text-lavender"
                              : "peer-focus:text-light-primary peer-focus:font-bold"
                          }`
                    }`}
                  >
                    Project Goals
                  </label>
                </div>
                <div className="relative">
                  <label className="block mb-2 text-sm font-semibold text-lavender tracking-wide">
                    Desired Features
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {featuresOptions.map((option) => {
                      const selected = formData.features.includes(option.value);
                      return (
                        <button
                          key={option.value}
                          type="button"
                          aria-pressed={selected}
                          tabIndex={0}
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              features: selected
                                ? prev.features.filter(
                                    (v) => v !== option.value
                                  )
                                : [...prev.features, option.value],
                            }));
                          }}
                          className={`inline-flex items-center justify-center px-5 py-2 rounded-full border transition-all duration-200 shadow-sm backdrop-blur-md focus:outline-none focus-visible:ring-2 focus-visible:ring-lavender/60
                            ${
                              selected
                                ? isDarkMode
                                  ? "bg-lavender/20 border-lavender/60 text-lavender font-semibold"
                                  : "bg-lavender/10 border-lavender/50 text-lavender font-semibold"
                                : isDarkMode
                                ? "bg-white/5 border-white/15 text-white/80 hover:bg-lavender/10 hover:border-lavender/40"
                                : "bg-white/60 border-light-primary/20 text-light-text/80 hover:bg-lavender/10 hover:border-lavender/40"
                            }
                          `}
                          style={{ minWidth: 120 }}
                        >
                          <span className="select-none text-sm font-medium">
                            {option.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="relative">
                  <div className="relative flex items-center h-16">
                    <select
                      name="budget"
                      value={formData.budget}
                      className={`${getInputClasses(
                        "budget"
                      )} h-full cursor-pointer appearance-none pr-12 bg-transparent flex-1`}
                      aria-label="Budget"
                      onChange={handleInputChange}
                      style={{ paddingRight: "2.5rem" }}
                    >
                      {budgetOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 flex items-center h-5">
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <label className="absolute left-4 top-[-26px] text-sm font-medium text-lavender pointer-events-none">
                    Budget
                  </label>
                </div>
                <div className="relative">
                  <div className="relative flex items-center h-16">
                    <select
                      name="timeline"
                      value={formData.timeline}
                      className={`${getInputClasses(
                        "timeline"
                      )} h-full cursor-pointer appearance-none pr-12 bg-transparent flex-1`}
                      aria-label="Timeline"
                      onChange={handleInputChange}
                      style={{ paddingRight: "2.5rem" }}
                    >
                      {timelineOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 flex items-center h-5">
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <label className="absolute left-4 top-[-26px] text-sm font-medium text-lavender pointer-events-none">
                    Timeline
                  </label>
                </div>
              </>
            )}
            {mode !== "services" && (
              <>
                <div className="relative">
                  <input
                    name="company"
                    type="text"
                    value={formData.company}
                    className={`${getInputClasses("company")} h-16`}
                    aria-label="Company"
                    placeholder=" "
                    onChange={handleInputChange}
                  />
                  <label
                    className={`absolute left-4 top-4 text-sm sm:text-base font-medium transition-all duration-300 pointer-events-none ${
                      formData.company
                        ? "top-[-26px] text-sm text-lavender"
                        : `peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray peer-focus:top-[-26px] peer-focus:text-sm peer-focus:text-lavender ${
                            isDarkMode ? "text-white/90" : "text-light-text/80"
                          }`
                    }`}
                  >
                    Company (Optional)
                  </label>
                </div>
                <div className="relative">
                  <input
                    name="position"
                    type="text"
                    value={formData.position}
                    className={`${getInputClasses("position")} h-16`}
                    aria-label="Position Title"
                    placeholder=" "
                    onChange={handleInputChange}
                  />
                  <label
                    className={`absolute left-4 top-4 text-sm sm:text-base font-medium transition-all duration-300 pointer-events-none ${
                      formData.position
                        ? "top-[-26px] text-sm text-lavender"
                        : `peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray peer-focus:top-[-26px] peer-focus:text-sm peer-focus:text-lavender ${
                            isDarkMode ? "text-white/90" : "text-light-text/80"
                          }`
                    }`}
                  >
                    Position Title (Optional)
                  </label>
                </div>
                <div className="relative">
                  <select
                    name="timeline"
                    value={formData.timeline}
                    className={`${getInputClasses(
                      "timeline"
                    )} h-16 cursor-pointer appearance-none pr-12 bg-transparent`}
                    aria-label="Hiring Timeline"
                    onChange={handleInputChange}
                  >
                    {timelineOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-light-gray/70">
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <label className="absolute left-4 top-[-26px] text-sm font-medium text-lavender pointer-events-none">
                    Hiring Timeline (Optional)
                  </label>
                </div>
                <div className="relative">
                  <select
                    name="budget"
                    value={formData.budget}
                    className={`${getInputClasses(
                      "budget"
                    )} h-16 cursor-pointer appearance-none pr-12 bg-transparent`}
                    aria-label="Compensation Range"
                    onChange={handleInputChange}
                  >
                    {compensationOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-light-gray/70">
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <label className="absolute left-4 top-[-26px] text-sm font-medium text-lavender pointer-events-none">
                    Compensation Range (Optional)
                  </label>
                </div>
                <div className="relative">
                  <select
                    name="workArrangement"
                    value={formData.workArrangement}
                    className={`${getInputClasses(
                      "workArrangement"
                    )} h-16 cursor-pointer appearance-none pr-12 bg-transparent`}
                    aria-label="Work Arrangement"
                    onChange={handleInputChange}
                  >
                    {workArrangementOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-light-gray/70">
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <label className="absolute left-4 top-[-26px] text-sm font-medium text-lavender pointer-events-none">
                    Work Arrangement (Optional)
                  </label>
                </div>
                <div className="relative">
                  <input
                    name="location"
                    type="text"
                    value={formData.location}
                    className={`${getInputClasses("location")} h-16`}
                    aria-label="Location"
                    onChange={handleInputChange}
                    placeholder=" "
                  />
                  <label
                    className={`absolute left-4 top-4 text-sm sm:text-base font-medium transition-all duration-300 pointer-events-none ${
                      formData.location
                        ? "top-[-26px] text-sm text-lavender"
                        : `peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray peer-focus:top-[-26px] peer-focus:text-sm peer-focus:text-lavender ${
                            isDarkMode ? "text-white/90" : "text-light-text/80"
                          }`
                    }`}
                  >
                    Location (Optional)
                  </label>
                  <p
                    className={`mt-2 text-xs ${
                      isDarkMode ? "text-light-gray/60" : "text-light-text/60"
                    }`}
                  >
                    City & State or your preferred timezone (e.g., "Austin, TX"
                    or "ET").
                  </p>
                </div>
              </>
            )}
          </div>
        )}
        {currentStep === 3 && (
          <div className="space-y-7 md:space-y-8">
            {mode === "services" && (
              <div className="relative">
                <textarea
                  name="notes"
                  value={formData.notes}
                  className={`${getInputClasses(
                    "notes"
                  )} h-32 resize-none caret-lavender`}
                  aria-label="Additional Notes"
                  placeholder="Anything else you'd like to share?"
                  onChange={handleInputChange}
                />
                <label className="absolute left-4 top-4 text-sm sm:text-base font-medium transition-all duration-300 pointer-events-none">
                  Additional Notes
                </label>
              </div>
            )}
            {mode !== "services" && (
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
                  placeholder=" "
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                />
                <label
                  className={`absolute left-4 top-4 text-sm sm:text-base font-medium transition-all duration-300 pointer-events-none ${
                    formData.message
                      ? "top-[-26px] text-sm text-lavender"
                      : "peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray peer-focus:top-[-26px] peer-focus:text-sm"
                  } ${
                    errors.message
                      ? "text-red-400"
                      : isDarkMode
                      ? "peer-focus:text-lavender text-white/90"
                      : "peer-focus:text-lavender text-light-text/80"
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
            )}
            <label
              htmlFor="file-upload"
              className={`block p-6 rounded-xl border-2 border-dashed transition-colors cursor-pointer ${
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
                <div
                  className={`text-sm font-medium ${
                    isDarkMode
                      ? "text-light-gray/80 hover:text-light-gray"
                      : "text-light-text/80 hover:text-light-text"
                  } transition-colors`}
                >
                  Click to upload files or drag and drop
                </div>
                <p
                  className={`text-xs mt-1 ${
                    isDarkMode ? "text-light-gray/60" : "text-light-text/60"
                  }`}
                >
                  PDF, DOC, TXT, Images (Max 10MB each)
                </p>
              </div>
            </label>
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
        </div>
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
      <style jsx>{`
        :global(form input::placeholder),
        :global(form textarea::placeholder),
        :global(form select::placeholder) {
          text-align: center !important;
          vertical-align: middle !important;
          opacity: 0.9 !important;
          font-weight: 500;
          letter-spacing: 0.01em;
        }
        :global(form input),
        :global(form textarea),
        :global(form select) {
          text-align: left;
        }
        :global(form[data-theme="dark"] input),
        :global(form[data-theme="dark"] textarea),
        :global(form[data-theme="dark"] select) {
          color: #fff !important;
          background: rgba(24, 26, 38, 0.92) !important;
          border-radius: 0.75rem !important;
        }
        :global(form[data-theme="dark"] input::placeholder),
        :global(form[data-theme="dark"] textarea::placeholder),
        :global(form[data-theme="dark"] select::placeholder) {
          color: #fff !important;
          opacity: 0.85 !important;
        }
        :global(form[data-theme="light"] input),
        :global(form[data-theme="light"] textarea),
        :global(form[data-theme="light"] select) {
          color: #222 !important;
          background: rgba(255, 255, 255, 0.92) !important;
          border-radius: 0.75rem !important;
        }
        :global(form[data-theme="light"] input::placeholder),
        :global(form[data-theme="light"] textarea::placeholder),
        :global(form[data-theme="light"] select::placeholder) {
          color: #222 !important;
          opacity: 0.8 !important;
        }
        :global(form input),
        :global(form textarea),
        :global(form select) {
          font-family: inherit !important;
          font-size: 1rem !important;
          min-height: 3.5rem !important;
        }
      `}</style>
    </section>
  );
}

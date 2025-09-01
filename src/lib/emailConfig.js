// Centralized EmailJS config sourced from environment variables.
// Use NEXT_PUBLIC_ vars so they are available in the client bundle.
export const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
export const TEMPLATE_ID_EMPLOYER =
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_EMPLOYER || "";
export const TEMPLATE_ID_WEBSITE =
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_WEBSITE || "";
export const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

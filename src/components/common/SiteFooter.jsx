import Link from "next/link";
import { FaLinkedin, FaGithubSquare, FaEnvelope, FaCode } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";

export default function SiteFooter() {
  const { isDarkMode } = useTheme();

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/nicolaswester/",
      icon: <FaLinkedin className="text-xl" />,
      ariaLabel: "Visit my LinkedIn profile",
    },
    {
      name: "GitHub",
      href: "https://github.com/nwester627",
      icon: <FaGithubSquare className="text-xl" />,
      ariaLabel: "Visit my GitHub profile",
    },
    {
      name: "Email",
      href: "mailto:nicolaswester@nicolaswester.com",
      icon: <FaEnvelope className="text-xl" />,
      ariaLabel: "Send me an email",
    },
  ];

  return (
    <footer
      className={`w-full py-8 sm:py-10 lg:py-12 mt-16 border-t ${
        isDarkMode
          ? "border-white/10 bg-gradient-to-t from-black/20 to-transparent"
          : "border-light-primary/20 bg-gradient-to-t from-white/20 to-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-center">
          {/* Brand/Name Section */}
          <div className="text-center md:text-left">
            <h3
              className={`text-xl sm:text-2xl font-bold mb-2 ${
                isDarkMode ? "text-light-gray" : "text-light-text"
              }`}
            >
              Nicolas Wester
            </h3>
            <p
              className={`text-sm sm:text-base ${
                isDarkMode ? "text-light-gray/70" : "text-light-secondary/70"
              }`}
            >
              Full Stack Developer
            </p>
          </div>

          {/* Navigation Links */}
          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <Link
                href="/services"
                className={`text-sm sm:text-base font-medium transition-colors hover:text-lavender ${
                  isDarkMode ? "text-light-gray/80" : "text-light-secondary/80"
                }`}
              >
                Services
              </Link>
              <Link
                href="#contact"
                className={`text-sm sm:text-base font-medium transition-colors hover:text-lavender ${
                  isDarkMode ? "text-light-gray/80" : "text-light-secondary/80"
                }`}
              >
                Contact
              </Link>
              <Link
                href="/"
                className={`text-sm sm:text-base font-medium transition-colors hover:text-lavender ${
                  isDarkMode ? "text-light-gray/80" : "text-light-secondary/80"
                }`}
              >
                Portfolio
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center md:text-right">
            <div className="flex justify-center md:justify-end gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg ${
                    isDarkMode
                      ? "bg-white/10 text-light-gray hover:bg-lavender/20 hover:text-lavender border border-white/20"
                      : "bg-white/80 text-light-text hover:bg-lavender/10 hover:text-lavender border border-light-primary/30"
                  }`}
                  aria-label={link.ariaLabel}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t border-current/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p
              className={`text-xs sm:text-sm ${
                isDarkMode ? "text-light-gray/60" : "text-light-secondary/60"
              }`}
            >
              © {new Date().getFullYear()} Nicolas Wester. All rights reserved.
            </p>
            <div className="flex items-center gap-1 text-xs sm:text-sm">
              <FaCode className="text-lavender" />
              <span
                className={`${
                  isDarkMode ? "text-light-gray/60" : "text-light-secondary/60"
                }`}
              >
                Built with Next.js & Tailwind CSS
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

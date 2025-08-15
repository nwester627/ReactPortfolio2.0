import { FaLinkedin, FaGithubSquare, FaCloudDownloadAlt } from "react-icons/fa";
import GlassButton from "../common/GlassButton";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

const resumePdfUrl = "/utilities/resume.pdf";

export default function Intro() {
  const { isDarkMode } = useTheme();
  const [showResumePreview, setShowResumePreview] = useState(false);
  // Only Google Drive iframe is used for preview now
  const googleDriveEmbedUrl =
    "https://drive.google.com/file/d/1b3jnUc-d9EwklABf-nZEC3sDf8QXty_v/preview";

  return (
    <div className="flex flex-col min-h-[20vh] items-center justify-start w-full max-w-full px-2 sm:px-0">
      <div className="w-full flex justify-center">
        <div className="flex flex-col sm:flex-row gap-2 items-center mb-6 w-full max-w-[480px] justify-center">
          <GlassButton
            href="https://www.linkedin.com/in/nicolaswester/"
            icon={<FaLinkedin className="inline-flex text-2xl" />}
            variant="outline"
            size="lg"
            aria-label="LinkedIn"
            className="min-w-[150px] w-full sm:w-auto"
          >
            LinkedIn
          </GlassButton>
          <GlassButton
            href="https://github.com/nwester627"
            icon={<FaGithubSquare className="inline-flex text-2xl" />}
            variant="outline"
            size="lg"
            aria-label="GitHub"
            className="min-w-[150px] w-full sm:w-auto"
          >
            GitHub
          </GlassButton>
          <div className="relative inline-block w-full sm:w-auto">
            <GlassButton
              icon={<FaCloudDownloadAlt className="inline-flex text-2xl" />}
              variant="primary"
              size="lg"
              className="min-w-[150px] w-full sm:w-auto"
              onClick={() => setShowResumePreview((v) => !v)}
            >
              Resume
            </GlassButton>

            <div
              className={`absolute z-50 mt-4 w-[95vw] max-w-2xl min-w-[280px] sm:min-w-[344px] rounded-3xl shadow-2xl border flex flex-col h-[75vh] min-h-[420px] max-h-[90vh] overflow-hidden transition-all duration-300 ease-in-out
                ${
                  isDarkMode
                    ? "border-lavender/60 bg-[#23213a]"
                    : "border-light-primary/30 bg-white"
                }
                ${
                  showResumePreview
                    ? "scale-100 opacity-100 pointer-events-auto"
                    : "scale-95 opacity-0 pointer-events-none"
                }
              `}
              style={{
                boxSizing: "border-box",
                left: "-265%",
                boxShadow: isDarkMode
                  ? "0 6px 32px 0 rgba(124,58,237,0.10), 0 2px 12px 0 rgba(0,0,0,0.18) inset"
                  : "0 6px 32px 0 rgba(124,58,237,0.13), 0 2px 12px 0 rgba(0,0,0,0.13) inset",
              }}
            >
              <div
                className={`flex items-center justify-between px-4 sm:px-6 py-3 ${
                  isDarkMode ? "bg-[#23213a]" : "bg-white"
                } rounded-t-3xl`}
              >
                <span className="font-bold text-lg sm:text-xl text-lavender tracking-tight drop-shadow-sm">
                  Resume Preview
                </span>
                <button
                  className={`ml-2 flex items-center justify-center w-9 h-9 rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-lavender/60
                    ${
                      isDarkMode
                        ? "bg-[#23213a] border-lavender/30 text-lavender hover:bg-lavender/20 hover:text-white"
                        : "bg-white border-light-primary/30 text-lavender hover:bg-lavender/10 hover:text-lavender"
                    }
                  `}
                  style={{ fontSize: 22, fontWeight: 700, lineHeight: 1 }}
                  onClick={() => setShowResumePreview(false)}
                  aria-label="Close preview"
                >
                  <span className="pb-0.5">×</span>
                </button>
              </div>

              <div
                className={`flex-1 flex items-center justify-center w-full ${
                  isDarkMode ? "bg-[#23213a]" : "bg-white"
                } p-2 sm:p-4`}
              >
                <div className="w-full h-full flex items-center justify-center rounded-2xl overflow-hidden min-h-[240px] min-w-[200px] shadow-inner">
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <iframe
                      src={googleDriveEmbedUrl}
                      width="100%"
                      height="100%"
                      className="rounded-xl shadow-lg"
                      style={{
                        minHeight:
                          typeof window !== "undefined" &&
                          window.innerWidth < 600
                            ? 320
                            : 500,
                        border: 0,
                        borderRadius: "12px",
                        background: "transparent",
                        boxShadow: isDarkMode
                          ? "0 4px 32px 0 rgba(124,58,237,0.10), 0 1.5px 8px 0 rgba(0,0,0,0.18)"
                          : "0 4px 32px 0 rgba(124,58,237,0.13), 0 2px 12px 0 rgba(0,0,0,0.13)",
                        width: "100%",
                        maxWidth: 800,
                        margin: "0 auto",
                        display: "block",
                      }}
                      allow="autoplay"
                      title="Resume PDF Preview (Google Drive)"
                    />
                    <div style={{ height: 32 }} />
                    <span className="mt-2 text-sm text-lavender text-center font-semibold">
                      If the preview does not load,{" "}
                      <a
                        href={resumePdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-rose transition-colors"
                      >
                        download the PDF
                      </a>
                      .
                    </span>
                  </div>
                </div>
              </div>
              <div
                className={`flex justify-end gap-2 px-4 sm:px-6 py-3 ${
                  isDarkMode ? "bg-[#23213a]" : "bg-white"
                } rounded-b-3xl`}
              >
                <a
                  href={resumePdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-bold shadow-lg transition border 
                    ${
                      isDarkMode
                        ? "bg-lavender text-white hover:bg-lavender/90 border-white/80 dark:border-[#23213a]/80"
                        : "bg-lavender/90 text-white hover:bg-lavender border-light-primary/40"
                    }`}
                >
                  <FaCloudDownloadAlt /> Download PDF
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes sway-left-btn {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .animate-bounce-erratic {
          animation: sway-left-btn 2s ease-in-out infinite alternate;
        }
      `}</style>
      <h4
        className={`text-lg sm:text-xl pt-6 pb-3 font-medium text-center 2xl:text-3xl text-shadow-subtle ${
          isDarkMode ? "text-light-gray" : "text-light-text"
        }`}
      >
        A Little Bit About Me
      </h4>
      <p
        className={`w-full max-w-[95vw] sm:max-w-2xl mx-auto text-[15px] sm:text-md px-2 sm:px-4 text-center text-pretty 2xl:text-xl break-words mb-2 ${
          isDarkMode ? "text-light-gray" : "text-light-secondary"
        }`}
      >
        Full stack dev with about three years shipping production work (plus a
        few more years poking at side projects). I like untangling vague or
        messy problems, tightening interfaces, and leaving code a little clearer
        than I found it. Off screen: games, anime, and three cats who think they
        run QA.
      </p>
    </div>
  );
}

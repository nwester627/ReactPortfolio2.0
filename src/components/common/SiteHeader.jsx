import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import ThemeToggle from "@/components/common/ThemeToggle";
import { useRouter } from "next/router";

export default function SiteHeader() {
  const { isDarkMode } = useTheme();
  const router = useRouter();
  const onServices = router.pathname === "/services";
  return (
    <header className="fixed top-0 left-0 w-full z-[1100] backdrop-blur-sm bg-white/10 dark:bg-black/10 shadow-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-2">
        <div className="flex items-center gap-2 sm:gap-3 w-full justify-between">
          <Link
            href={onServices ? "/" : "/services"}
            className={`inline-flex items-center px-4 sm:px-5 py-2.5 rounded-full text-base font-semibold transition-colors backdrop-blur-sm shadow-md whitespace-nowrap ${
              isDarkMode
                ? "bg-white/10 text-light-gray ring-1 ring-white/20 hover:bg-white/15"
                : "bg-white/80 text-light-text ring-1 ring-light-primary/30 hover:bg-white/90"
            }`}
          >
            {onServices ? "Return to home" : "Freelance services"}
          </Link>
          <ThemeToggle noAnimation noRightPad />
        </div>
      </div>
    </header>
  );
}

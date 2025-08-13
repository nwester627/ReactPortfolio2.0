import Link from "next/link";
import GlassButton from "@/components/common/GlassButton";
import { FaHome, FaSync } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function Custom404() {
  const [isOnline, setIsOnline] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkOnlineStatus = () => {
      if (typeof window !== "undefined") {
        setIsOnline(navigator.onLine);
      }
    };

    // Check initial status
    checkOnlineStatus();

    const handleOnline = () => {
      // Device is online
      setIsOnline(true);
    };

    const handleOffline = () => {
      // Device is offline
      setIsOnline(false);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);
      // Also listen for network changes
      window.addEventListener("load", checkOnlineStatus);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
        window.removeEventListener("load", checkOnlineStatus);
      }
    };
  }, []);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-blackish-blue via-space to-darkblue">
      <div className="text-center space-y-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 opacity-10 blur-3xl -z-10"></div>
          <h1 className="text-6xl md:text-8xl font-bold text-lavender mb-4">
            404
          </h1>
        </div>
        <h2 className="text-3xl md:text-4xl text-light-gray mb-4">
          {mounted && (isOnline ? "Oops! Page Not Found" : "Connection Error")}
        </h2>
        <p className="text-gray text-lg md:text-xl max-w-md mx-auto mb-8">
          {mounted &&
            (isOnline
              ? "The page you're looking for seems to have wandered off into the digital void."
              : "Looks like you're offline. Please check your internet connection and try again.")}
        </p>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 opacity-10 blur-3xl -z-10"></div>
          {mounted &&
            (isOnline ? (
              <Link href="/" passHref>
                <GlassButton icon={<FaHome />}>Return Home</GlassButton>
              </Link>
            ) : (
              <GlassButton
                icon={<FaSync className="animate-spin" />}
                onClick={() => window.location.reload()}
              >
                Try Again
              </GlassButton>
            ))}
        </div>
      </div>
    </div>
  );
}

import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

export default function PageTransition({ children }) {
  const router = useRouter();
  const [renderKey, setRenderKey] = useState(() => router.asPath);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef();

  useEffect(() => {
    const handleStart = (url) => {
      if (url === router.asPath) return;
      setIsTransitioning(true);
    };

    const handleDone = () => {
      // Small delay to allow exit animation, then trigger enter animation
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setRenderKey(router.asPath + Date.now());
        setIsTransitioning(false);
      }, 50);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleDone);
    router.events.on("routeChangeError", handleDone);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleDone);
      router.events.off("routeChangeError", handleDone);
      clearTimeout(timeoutRef.current);
    };
  }, [router]);

  return (
    <div
      key={renderKey}
      className={`will-change-transform transition-transform duration-300 ${
        isTransitioning ? "translate-y-1" : "animate-pageIn"
      }`}
    >
      {children}
    </div>
  );
}

import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

/**
 * Cross-fade / materialize style transition between route changes using a simple opacity + transform + blur animation.
 * Wraps page component. Adds ephemeral key to trigger re-animation.
 */
export default function PageTransition({ children }) {
  const router = useRouter();
  const [renderKey, setRenderKey] = useState(() => router.asPath);
  const timeoutRef = useRef();

  useEffect(() => {
    const handleStart = (url) => {
      if (url === router.asPath) return;
      // pre-trigger can add class for exit if desired in future
    };
    const handleDone = () => {
      // change key to retrigger animation
      setRenderKey(router.asPath + Date.now());
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
    <div key={renderKey} className="will-change-transform animate-pageIn">
      {children}
    </div>
  );
}

import { useEffect, useRef, useState } from "react";

export default function PageTransition({ children }) {
  const lastChildrenRef = useRef(children);
  const [prevChildren, setPrevChildren] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prefersReducedMotionRef = useRef(false);
  const ANIM_MS = 320; // match CSS timing for smoothness

  useEffect(() => {
    if (typeof window !== "undefined") {
      prefersReducedMotionRef.current = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
    }
  }, []);

  // When children change (i.e., route changed), keep a snapshot of the
  // previous children so we can animate it out while animating the incoming
  // children in. This avoids unmount flicker and layout shifts.
  useEffect(() => {
    if (lastChildrenRef.current === children) return; // no change
    if (prefersReducedMotionRef.current) {
      // If reduced motion is requested, skip animations and just swap.
      lastChildrenRef.current = children;
      setPrevChildren(null);
      setIsTransitioning(false);
      return;
    }

    setPrevChildren(lastChildrenRef.current);
    setIsTransitioning(true);
    const t = setTimeout(() => {
      setPrevChildren(null);
      setIsTransitioning(false);
      lastChildrenRef.current = children;
    }, ANIM_MS + 40);
    return () => clearTimeout(t);
  }, [children]);

  // Container keeps layout stable; inner panes are stacked absolutely and
  // animated using only transform + opacity so they remain on compositor.
  return (
    <div className="relative w-full">
      {/* Previous content (exiting) */}
      {prevChildren && (
        <div
          aria-hidden
          className={`absolute inset-0 pointer-events-none will-change-transform transition-transform duration-300 ease-[cubic-bezier(.33,1,.68,1)] transform origin-top-left ${
            isTransitioning
              ? "-translate-y-2 opacity-0"
              : "translate-y-0 opacity-100"
          }`}
        >
          {prevChildren}
        </div>
      )}

      {/* Incoming / current content */}
      <div
        className={`relative will-change-transform transition-transform duration-300 ease-[cubic-bezier(.33,1,.68,1)] transform ${
          isTransitioning
            ? "translate-y-1 opacity-90"
            : "translate-y-0 opacity-100"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

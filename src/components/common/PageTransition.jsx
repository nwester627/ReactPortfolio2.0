import { useEffect, useRef, useState } from "react";
import { Motion, spring } from "react-motion";

export default function PageTransition({ children }) {
  const lastChildrenRef = useRef(children);
  const [prevChildren, setPrevChildren] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotionRef = useRef(false);
  const ANIM_MS = 320; // match CSS timing for smoothness

  useEffect(() => {
    if (typeof window !== "undefined") {
      prefersReducedMotionRef.current = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 200);
    return () => clearTimeout(t);
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
        <Motion
          defaultStyle={{ t: 0 }}
          style={{
            t: spring(isTransitioning ? 1 : 0, { stiffness: 160, damping: 18 }),
          }}
        >
          {(style) => {
            const t = style.t;
            const opacity = 1 - t;
            const translateY = -8 * t; // px
            return (
              <div
                aria-hidden
                style={{
                  transform: `translateY(${translateY}px)`,
                  opacity,
                }}
                className="absolute inset-0 pointer-events-none will-change-transform transform origin-top-left"
              >
                {prevChildren}
              </div>
            );
          }}
        </Motion>
      )}

      {/* Incoming / current content */}
      {mounted && (
        <Motion
          defaultStyle={{ t: isTransitioning ? 0.9 : 0 }}
          style={{
            t: spring(isTransitioning ? 0.9 : 1, {
              stiffness: 160,
              damping: 20,
            }),
          }}
        >
          {(s) => {
            const t = s.t;
            const opacity = t;
            const translateY = (1 - t) * 6; // px
            return (
              <div
                style={{ transform: `translateY(${translateY}px)`, opacity }}
                className="relative will-change-transform transform"
              >
                {children}
              </div>
            );
          }}
        </Motion>
      )}
      {!mounted && <div className="relative opacity-0">{children}</div>}
    </div>
  );
}

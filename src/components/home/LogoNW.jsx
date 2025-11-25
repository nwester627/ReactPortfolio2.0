import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import lightLogo from "@/assets/light_mode_logo.png";
import darkLogo from "@/assets/dark_mode_logo.png";
import { Motion, spring } from "react-motion";

export default function LogoNW({ size = 160, className = "" }) {
  const { isDarkMode } = useTheme();
  const src = isDarkMode ? darkLogo : lightLogo;
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <Motion
      defaultStyle={{ t: 0 }}
      style={{ t: spring(mounted ? 1 : 0, { stiffness: 120, damping: 14 }) }}
    >
      {(style) => {
        const t = style.t;
        const opacity = 0.4 + 0.6 * t;
        return (
          <div
            className={`flex items-center justify-center mx-auto my-0 py-1 cursor-pointer transition-all duration-300 hover:scale-105 ${className}`}
            style={{
              maxWidth: size * 2,
              opacity,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Motion
              defaultStyle={{ glow: 0, scale: 1 }}
              style={{
                glow: spring(isHovered ? 1 : 0, {
                  stiffness: 200,
                  damping: 20,
                }),
                scale: spring(isHovered ? 1.05 : 1, {
                  stiffness: 200,
                  damping: 20,
                }),
              }}
            >
              {(hoverStyle) => (
                <div
                  style={{
                    transform: `scale(${hoverStyle.scale})`,
                    filter: `drop-shadow(0 0 ${hoverStyle.glow * 20}px ${
                      isDarkMode
                        ? "rgba(124,58,237,0.6)"
                        : "rgba(124,58,237,0.4)"
                    })`,
                  }}
                >
                  <Image
                    src={src}
                    alt="Nicolas Wester logo"
                    width={size}
                    height={Math.round(size * 0.5)}
                    priority={false}
                    style={{ width: "auto", height: "auto" }}
                  />
                </div>
              )}
            </Motion>
          </div>
        );
      }}
    </Motion>
  );
}

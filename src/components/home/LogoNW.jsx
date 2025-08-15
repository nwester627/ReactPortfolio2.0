import React, { useState, useEffect } from "react";

// Inline React logo SVG as a component with highlight
function ReactLogo({ color, highlight = false }) {
  const highlightColor = "#61dafb";
  const transition =
    "opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), filter 0.6s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.6s cubic-bezier(0.4, 0, 0.2, 1), fill 0.6s cubic-bezier(0.4, 0, 0.2, 1)";

  return (
    <svg viewBox="0 0 32 32" width="32" height="32" fill="none">
      <defs>
        {/* Define a filter for the glow effect */}
        <filter id="glow">
          <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#61dafb" />
        </filter>
      </defs>

      {/* Three animated ellipses for the logo */}
      <ellipse
        cx="16"
        cy="16"
        rx="14"
        ry="5.5"
        stroke={highlight ? highlightColor : color}
        strokeWidth="2"
        style={{
          filter: highlight ? "url(#glow)" : "none",
          opacity: highlight ? 1 : 0.5,
          transition,
        }}
      />
      <ellipse
        cx="16"
        cy="16"
        rx="14"
        ry="5.5"
        stroke={highlight ? highlightColor : color}
        strokeWidth="2"
        transform="rotate(60 16 16)"
        style={{
          filter: highlight ? "url(#glow)" : "none",
          opacity: highlight ? 1 : 0.5,
          transition,
        }}
      />
      <ellipse
        cx="16"
        cy="16"
        rx="14"
        ry="5.5"
        stroke={highlight ? highlightColor : color}
        strokeWidth="2"
        transform="rotate(120 16 16)"
        style={{
          filter: highlight ? "url(#glow)" : "none",
          opacity: highlight ? 1 : 0.5,
          transition,
        }}
      />

      {/* Center circle */}
      <circle
        cx="16"
        cy="16"
        r="2.5"
        fill={highlight ? highlightColor : color}
        style={{
          opacity: highlight ? 1 : 0.5,
          transition,
        }}
      />
    </svg>
  );
}

export default function LogoNW({
  size = 200,
  colorMode = "light",
  className = "",
}) {
  const fillColor = colorMode === "dark" ? "#b4aaff" : "#5b2bb0";
  const [highlightIdx, setHighlightIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightIdx((idx) => (idx + 1) % 3);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`w-full flex items-center justify-center mx-auto my-0 py-2 sm:py-4 md:py-6 ${className}`}
      style={{ maxWidth: size * 2, minHeight: size * 1.5 }}
    >
      <svg
        width="100%"
        height="auto"
        viewBox="0 0 370 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          display: "block",
          maxWidth: "100%",
          height: "auto",
          overflow: "visible",
        }}
      >
        <text
          x="55"
          y="112"
          fontSize="58"
          fontFamily="monospace"
          fill={fillColor}
          textAnchor="middle"
          fontWeight="bold"
        >
          {"{"}
        </text>
        {/* Three animated React logos as the spread operator, lighting up in sequence */}
        <g transform="translate(99,98) scale(0.56)">
          <ReactLogo color={fillColor} highlight={highlightIdx === 0} />
        </g>
        <g transform="translate(146,98) scale(0.56)">
          <ReactLogo color={fillColor} highlight={highlightIdx === 1} />
        </g>
        <g transform="translate(193,98) scale(0.56)">
          <ReactLogo color={fillColor} highlight={highlightIdx === 2} />
        </g>
        <text
          x="249"
          y="120"
          fontSize="58"
          fontFamily="monospace"
          fill={fillColor}
          textAnchor="middle"
          fontWeight="bold"
        >
          {"N"}
        </text>
        <text
          x="308"
          y="120"
          fontSize="58"
          fontFamily="monospace"
          fill={fillColor}
          textAnchor="middle"
          fontWeight="bold"
        >
          {"W"}
        </text>
        <text
          x="362"
          y="112"
          fontSize="58"
          fontFamily="monospace"
          fill={fillColor}
          textAnchor="middle"
          fontWeight="bold"
        >
          {"}"}
        </text>
      </svg>
    </div>
  );
}

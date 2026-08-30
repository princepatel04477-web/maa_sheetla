"use client";

import React from "react";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
}

export default function GradientText({
  children,
  className = "",
  colors = ["#F3EBE0", "#E8CAA0", "#C88432", "#B84A12", "#E8CAA0", "#F3EBE0"],
  animationSpeed = 6,
  showBorder = false,
}: GradientTextProps) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
    backgroundSize: "300% 100%",
    animationDuration: `${animationSpeed}s`,
  };

  return (
    <span
      className={`relative inline-block ${
        showBorder ? "py-1 px-3 border border-hairline/60 rounded-xs" : ""
      }`}
    >
      <span
        className={`inline-block bg-clip-text text-transparent animate-shimmer ${className}`}
        style={gradientStyle}
      >
        {children}
      </span>
    </span>
  );
}

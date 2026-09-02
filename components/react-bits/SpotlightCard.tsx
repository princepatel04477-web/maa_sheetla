"use client";

import React, { useRef, useEffect, useState } from "react";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  spotlightColor?: string;
  className?: string;
  children: React.ReactNode;
}

export default function SpotlightCard({
  spotlightColor = "rgba(242, 160, 61, 0.14)",
  className = "",
  children,
  ...props
}: SpotlightCardProps) {
  const [canHover, setCanHover] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(hover: hover)");
      setCanHover(mq.matches);
      const handler = (e: MediaQueryListEvent) => setCanHover(e.matches);
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canHover || !divRef.current || !spotlightRef.current) return;
    const clientX = e.clientX;
    const clientY = e.clientY;

    if (rafId.current !== null) return;

    rafId.current = requestAnimationFrame(() => {
      if (divRef.current && spotlightRef.current) {
        const rect = divRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        spotlightRef.current.style.background = `radial-gradient(450px circle at ${x}px ${y}px, ${spotlightColor}, transparent 80%)`;
      }
      rafId.current = null;
    });
  };

  const handleMouseEnter = () => {
    if (canHover && spotlightRef.current) {
      spotlightRef.current.style.opacity = "1";
    }
  };

  const handleMouseLeave = () => {
    if (spotlightRef.current) {
      spotlightRef.current.style.opacity = "0";
    }
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return (
    <div
      ref={divRef}
      onMouseMove={canHover ? handleMouseMove : undefined}
      onMouseEnter={canHover ? handleMouseEnter : undefined}
      onMouseLeave={canHover ? handleMouseLeave : undefined}
      className={`relative overflow-hidden rounded-sm border border-hairline bg-selvedge transition-all duration-300 ${className}`}
      style={{ contain: "paint", ...props.style }}
      {...props}
    >
      {canHover && (
        <div
          ref={spotlightRef}
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-0"
          style={{
            background: `radial-gradient(450px circle at 0px 0px, ${spotlightColor}, transparent 80%)`,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

"use client";

import React, { useRef, useEffect, useState } from "react";

interface TiltedCardProps {
  children: React.ReactNode;
  className?: string;
  maxAngle?: number;
}

export default function TiltedCard({
  children,
  className = "",
  maxAngle = 8,
}: TiltedCardProps) {
  const [canHover, setCanHover] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
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
    if (!canHover || !cardRef.current) return;
    if (!cardRef.current) return;
    const clientX = e.clientX;
    const clientY = e.clientY;

    if (rafId.current !== null) return;

    rafId.current = requestAnimationFrame(() => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rX = ((y - centerY) / centerY) * -maxAngle;
        const rY = ((x - centerX) / centerX) * maxAngle;

        cardRef.current.style.transform = `rotateX(${rX.toFixed(2)}deg) rotateY(${rY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;

        if (glareRef.current) {
          const gx = (x / rect.width) * 100;
          const gy = (y / rect.height) * 100;
          glareRef.current.style.background = `radial-gradient(circle at ${gx.toFixed(1)}% ${gy.toFixed(1)}%, rgba(255,217,160,0.45) 0%, transparent 65%)`;
        }
      }
      rafId.current = null;
    });
  };

  const handleMouseEnter = () => {
    if (cardRef.current) {
      cardRef.current.style.transition = "transform 0.1s ease-out";
    }
    if (glareRef.current) {
      glareRef.current.style.opacity = "0.4";
    }
  };

  const handleMouseLeave = () => {
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
    if (cardRef.current) {
      cardRef.current.style.transition = "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
      cardRef.current.style.transform = "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    }
    if (glareRef.current) {
      glareRef.current.style.opacity = "0";
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
    <div style={canHover ? { perspective: "1000px" } : undefined} className="inline-block w-full h-full">
      <div
        ref={cardRef}
        onMouseMove={canHover ? handleMouseMove : undefined}
        onMouseEnter={canHover ? handleMouseEnter : undefined}
        onMouseLeave={canHover ? handleMouseLeave : undefined}
        style={
          canHover
            ? {
                transform: "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
                transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                transformStyle: "preserve-3d",
                willChange: "transform",
              }
            : undefined
        }
        className={`relative overflow-hidden ${className}`}
      >
        {children}
        {canHover && (
          <div
            ref={glareRef}
            className="pointer-events-none absolute inset-0 mix-blend-overlay transition-opacity duration-300 opacity-0"
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(255,217,160,0.45) 0%, transparent 65%)",
            }}
          />
        )}
      </div>
    </div>
  );
}

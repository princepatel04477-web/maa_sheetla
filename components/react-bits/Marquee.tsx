"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useVelocity } from "framer-motion";
import { useReducedMotion } from "../../lib/motion";

interface MarqueeProps {
  items: string[];
  reverse?: boolean;
  className?: string;
}

export default function Marquee({
  items,
  reverse = false,
  className = "",
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [isInView, setIsInView] = useState(false);

  const BASE_DURATION = 35;
  const [duration, setDuration] = useState(BASE_DURATION);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  // Viewport intersection observer for pausing off-screen
  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.05, rootMargin: "100px 0px 100px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Scroll velocity → animation speed modulation
  useEffect(() => {
    if (prefersReduced) return;

    let targetDuration = BASE_DURATION;
    let currentDuration = BASE_DURATION;
    let animationFrameId: number;

    const unsubscribe = scrollVelocity.on("change", (latestVelocity) => {
      const v = Math.abs(latestVelocity);
      // Speed up by up to 2.5× during fast scroll, then ease back
      const speedMultiplier = Math.min(2.5, Math.max(1.0, 1 + v / 800));
      targetDuration = BASE_DURATION / speedMultiplier;
    });

    const smoothStep = () => {
      // Dampen toward target with expo-like easing (~400ms decay)
      currentDuration += (targetDuration - currentDuration) * 0.12;
      targetDuration += (BASE_DURATION - targetDuration) * 0.08;
      setDuration(Math.round(currentDuration * 10) / 10);
      animationFrameId = requestAnimationFrame(smoothStep);
    };

    animationFrameId = requestAnimationFrame(smoothStep);

    return () => {
      unsubscribe();
      cancelAnimationFrame(animationFrameId);
    };
  }, [scrollVelocity, prefersReduced]);

  const isPaused = prefersReduced || !isInView;

  return (
    <div
      ref={containerRef}
      className={`w-full overflow-hidden whitespace-nowrap flex border-y border-hairline py-3 bg-selvedge/30 font-mono text-[11px] tracking-[0.22em] text-ash uppercase select-none group ${className}`}
      style={{ contain: "content" }}
    >
      <div
        className={`marquee-track items-center gap-8 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        } group-hover:[animation-play-state:paused]`}
        style={{
          animationDuration: `${duration}s`,
          animationPlayState: isPaused ? "paused" : undefined,
          willChange: isInView && !isPaused ? "transform" : "auto",
        }}
      >
        {items.concat(items).map((item, idx) => (
          <div key={idx} className="flex items-center gap-8">
            <span className="hover:text-haldi transition-colors">{item}</span>
            <span className="text-marigold/50 text-xs">◆</span>
          </div>
        ))}
      </div>
      <div
        className={`marquee-track items-center gap-8 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        } group-hover:[animation-play-state:paused]`}
        style={{
          animationDuration: `${duration}s`,
          animationPlayState: isPaused ? "paused" : undefined,
          willChange: isInView && !isPaused ? "transform" : "auto",
        }}
        aria-hidden="true"
      >
        {items.concat(items).map((item, idx) => (
          <div key={`dup-${idx}`} className="flex items-center gap-8">
            <span className="hover:text-haldi transition-colors">{item}</span>
            <span className="text-marigold/50 text-xs">◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}

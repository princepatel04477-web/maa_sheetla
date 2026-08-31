"use client";

import { useEffect, useRef } from "react";

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  separator?: string;
  suffix?: string;
  className?: string;
}

export default function CountUp({
  to,
  from = 0,
  duration = 1.6,
  separator = ",",
  suffix = "",
  className = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  const formatNumber = (num: number) => {
    return separator
      ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator)
      : num.toString();
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Initialize content
    el.textContent = `${formatNumber(from)}${suffix}`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const durationMs = duration * 1000;

          const update = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / durationMs, 1);
            // Cubic ease-out
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.floor(from + (to - from) * easeOut);

            if (el) {
              el.textContent = `${formatNumber(currentVal)}${suffix}`;
            }

            if (progress < 1) {
              requestAnimationFrame(update);
            } else if (el) {
              el.textContent = `${formatNumber(to)}${suffix}`;
            }
          };

          requestAnimationFrame(update);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [to, from, duration, separator, suffix]);

  return (
    <span ref={ref} className={className}>
      {formatNumber(from)}{suffix}
    </span>
  );
}

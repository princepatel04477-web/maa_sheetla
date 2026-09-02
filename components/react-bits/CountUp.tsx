"use client";

import { useEffect, useRef, useState } from "react";

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);
  return reduced;
}

interface CountUpProps {
  to?: number;
  value?: number;
  from?: number;
  duration?: number;
  separator?: string;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export default function CountUp({
  to,
  value,
  from = 0,
  duration = 1.4,
  separator = ",",
  prefix = "",
  suffix = "",
  className = "",
}: CountUpProps) {
  const target = to !== undefined ? to : (value !== undefined ? value : 0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const prefersReduced = useReducedMotion();

  const formatNumber = (num: number) => {
    const formatted = separator
      ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator)
      : num.toString();
    return `${prefix}${formatted}${suffix}`;
  };

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          // Set to start value right as animation begins
          el.textContent = formatNumber(from);

          const startTime = performance.now();
          const durationMs = duration * 1000;

          // Mathematical easeOutExpo: fast launch, graceful landing
          const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

          const update = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / durationMs, 1);
            const eased = easeOutExpo(progress);
            const currentVal = Math.round(from + (target - from) * eased);

            if (el) {
              el.textContent = formatNumber(currentVal);
            }

            if (progress < 1) {
              requestAnimationFrame(update);
            } else if (el) {
              el.textContent = formatNumber(target);
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
  }, [target, from, duration, separator, prefix, suffix, prefersReduced]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {formatNumber(target)}
    </span>
  );
}

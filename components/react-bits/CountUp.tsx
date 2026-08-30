"use client";

import { useEffect, useRef, useState } from "react";

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
  const [count, setCount] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const durationMs = duration * 1000;

          const update = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / durationMs, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.floor(from + (to - from) * easeOut);
            setCount(currentVal);

            if (progress < 1) {
              requestAnimationFrame(update);
            } else {
              setCount(to);
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
  }, [to, from, duration]);

  const formatted = separator
    ? count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator)
    : count.toString();

  return (
    <span ref={ref} className={className}>
      {formatted}{suffix}
    </span>
  );
}

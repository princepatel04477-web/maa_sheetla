"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
}

export default function BlurText({
  text = "",
  delay = 0.03,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.15,
  rootMargin = "0px",
}: BlurTextProps) {
  const [mounted, setMounted] = useState(false);
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom =
    direction === "top"
      ? { opacity: 0, y: -16 }
      : { opacity: 0, y: 16 };

  const defaultTo = {
    opacity: 1,
    y: 0,
  };

  if (!mounted) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {elements.map((element, index) => (
        <motion.span
          key={index}
          initial={defaultFrom}
          animate={inView ? defaultTo : defaultFrom}
          transition={{
            duration: 0.5,
            delay: index * delay,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block whitespace-pre mr-[0.28em]"
          style={{ transform: "translateZ(0)" }}
        >
          {element === " " ? "\u00A0" : element}
        </motion.span>
      ))}
    </span>
  );
}

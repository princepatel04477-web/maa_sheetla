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
  delay = 0.04,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.15,
  rootMargin = "0px",
}: BlurTextProps) {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current!);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom =
    direction === "top"
      ? { filter: "blur(8px)", opacity: 0, transform: "translate3d(0,-20px,0)" }
      : { filter: "blur(8px)", opacity: 0, transform: "translate3d(0,20px,0)" };

  const defaultTo = {
    filter: "blur(0px)",
    opacity: 1,
    transform: "translate3d(0,0,0)",
  };

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {elements.map((element, index) => (
        <motion.span
          key={index}
          initial={defaultFrom}
          animate={inView ? defaultTo : defaultFrom}
          transition={{
            duration: 0.6,
            delay: index * delay,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="inline-block whitespace-pre mr-[0.28em] will-change-transform will-change-filter"
        >
          {element === " " ? "\u00A0" : element}
        </motion.span>
      ))}
    </span>
  );
}

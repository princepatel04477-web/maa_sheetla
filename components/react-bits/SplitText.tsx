"use client";

import { motion } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  tag?: "h1" | "h2" | "h3" | "p" | "span" | "div";
}

export default function SplitText({
  text,
  className = "",
  delay = 0.025,
  duration = 0.45,
  tag = "div",
}: SplitTextProps) {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: delay, delayChildren: i * 0.04 },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    hidden: {
      opacity: 0,
      y: 14,
    },
  };

  const Tag = motion[tag] as any;

  return (
    <Tag
      className={`inline-block flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-[0.26em] whitespace-nowrap"
          style={{ transform: "translateZ(0)" }}
          variants={child}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}

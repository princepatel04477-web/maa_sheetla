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
  delay = 0.03,
  duration = 0.5,
  tag = "div",
}: SplitTextProps) {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: delay, delayChildren: i * 0.06 },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 18,
        stiffness: 140,
        duration: duration,
      },
    },
    hidden: {
      opacity: 0,
      y: 18,
      rotateX: 15,
      filter: "blur(3px)",
    },
  };

  const Tag = motion[tag] as any;

  return (
    <Tag
      className={`inline-block flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-[0.26em] whitespace-nowrap will-change-transform"
          variants={child}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}

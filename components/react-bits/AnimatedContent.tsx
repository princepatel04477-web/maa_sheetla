"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnimatedContentProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  className?: string;
}

export default function AnimatedContent({
  children,
  delay = 0,
  direction = "up",
  distance = 24,
  duration = 0.6,
  className = "",
}: AnimatedContentProps) {
  const getInitial = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: distance, filter: "blur(4px)" };
      case "down":
        return { opacity: 0, y: -distance, filter: "blur(4px)" };
      case "left":
        return { opacity: 0, x: distance, filter: "blur(4px)" };
      case "right":
        return { opacity: 0, x: -distance, filter: "blur(4px)" };
      case "none":
      default:
        return { opacity: 0, filter: "blur(4px)" };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

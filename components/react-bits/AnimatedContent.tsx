"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MOTION, useReducedMotion } from "../../lib/motion";

interface RevealGroupContextValue {
  inGroup: boolean;
  baseDelay: number;
}

const RevealGroupContext = createContext<RevealGroupContextValue>({
  inGroup: false,
  baseDelay: 0,
});

export interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "none";
  once?: boolean;
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  className?: string;
  style?: React.CSSProperties;
}

export function Reveal({
  children,
  delay,
  direction = "up",
  once = true,
  as: Component = "div",
  className = "",
  style,
}: RevealProps) {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const groupCtx = useContext(RevealGroupContext);

  useEffect(() => {
    setMounted(true);
  }, []);

  const computedDelay = delay !== undefined ? delay : groupCtx.baseDelay;

  useEffect(() => {
    if (!mounted || reduced) return;

    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsInView(false);
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -80px 0px",
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [mounted, reduced, once]);

  // CRITICAL: Visible at rest in server HTML and before client JS mounts.
  // With JavaScript disabled or during SSR, render the final resting element
  // completely visible without any opacity: 0 or transform styles.
  if (!mounted || reduced) {
    const Tag = Component as any;
    return (
      <Tag className={className} style={style}>
        {children}
      </Tag>
    );
  }

  const MotionComponent = motion(Component as any);

  const initialY = direction === "up" ? MOTION.rise : 0;

  return (
    <MotionComponent
      ref={ref}
      initial={{ opacity: 0.001, y: initialY }}
      animate={
        isInView
          ? { opacity: 1, y: 0 }
          : { opacity: 0.001, y: initialY }
      }
      transition={{
        duration: MOTION.dur.slow,
        ease: MOTION.ease.outExpo,
        delay: computedDelay,
      }}
      className={className}
      style={style}
    >
      {children}
    </MotionComponent>
  );
}

export interface RevealGroupProps {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  className?: string;
  stagger?: number;
  maxStagger?: number;
}

export function RevealGroup({
  children,
  as: Component = "div",
  className = "",
  stagger = MOTION.stagger,
  maxStagger = MOTION.staggerCap,
}: RevealGroupProps) {
  const Tag = Component as any;
  const childArray = React.Children.toArray(children);

  return (
    <Tag className={className}>
      {childArray.map((child, idx) => {
        const childDelay = Math.min(idx * stagger, maxStagger);
        return (
          <RevealGroupContext.Provider
            key={idx}
            value={{ inGroup: true, baseDelay: childDelay }}
          >
            {child}
          </RevealGroupContext.Provider>
        );
      })}
    </Tag>
  );
}

// Backward-compatible alias for existing imports
export default Reveal;

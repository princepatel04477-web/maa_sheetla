"use client";

import { useEffect, useState, RefObject } from "react";
import type { Variants } from "framer-motion";

export const MOTION = {
  dur: {
    fast: 0.18,
    base: 0.32,
    slow: 0.52,
    cinema: 0.82,
  },
  durMs: {
    fast: 180,
    base: 320,
    slow: 520,
    cinema: 820,
  },
  ease: {
    outExpo: [0.16, 1, 0.3, 1] as const,
    outQuart: [0.25, 1, 0.5, 1] as const,
    soft: [0.65, 0, 0.35, 1] as const,
  },
  stagger: 0.06,
  staggerMs: 60,
  staggerCap: 0.4,
  rise: 20,
} as const;

/**
 * SSR-safe reduced-motion hook.
 * Must return false on the server and on the first client render to prevent hydration mismatches,
 * updating only inside useEffect.
 */
export function useReducedMotion(): boolean {
  const [shouldReduce, setShouldReduce] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setShouldReduce(mediaQuery.matches);

    const onChange = (e: MediaQueryListEvent) => {
      setShouldReduce(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", onChange);
      return () => mediaQuery.removeEventListener("change", onChange);
    } else {
      // Legacy fallback
      mediaQuery.addListener(onChange);
      return () => mediaQuery.removeListener(onChange);
    }
  }, []);

  return shouldReduce;
}

/**
 * SSR-safe hover-capable hook.
 * Returns false on server and on first client render so touch devices never flash a hover state.
 */
export function useHoverCapable(): boolean {
  const [isHover, setIsHover] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsHover(mediaQuery.matches);

    const onChange = (e: MediaQueryListEvent) => {
      setIsHover(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", onChange);
      return () => mediaQuery.removeEventListener("change", onChange);
    } else {
      mediaQuery.addListener(onChange);
      return () => mediaQuery.removeListener(onChange);
    }
  }, []);

  return isHover;
}

export interface UseInViewOptions {
  threshold?: number | number[];
  rootMargin?: string;
  once?: boolean;
}

/**
 * SSR-safe lightweight IntersectionObserver hook.
 * Returns true immediately if prefers-reduced-motion is active.
 * Disconnects observer once triggered when once is true.
 */
export function useInView(
  ref: RefObject<Element | null>,
  options: UseInViewOptions = {}
): boolean {
  const { threshold = 0.12, rootMargin = "0px 0px -80px 0px", once = true } = options;
  const reduced = useReducedMotion();
  const [inView, setInView] = useState<boolean>(false);

  useEffect(() => {
    if (reduced) {
      setInView(true);
      return;
    }

    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold, rootMargin, once, reduced]);

  return reduced ? true : inView;
}

/**
 * Variant factories respecting reduced motion.
 * Hidden state stays visible/untransformed when reduced is true.
 */
export function fadeRise(delay = 0, reduced = false): Variants {
  if (reduced) {
    return {
      hidden: { opacity: 1, y: 0 },
      visible: { opacity: 1, y: 0, transition: { duration: 0 } },
    };
  }
  return {
    hidden: { opacity: 0.001, y: MOTION.rise },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: MOTION.dur.slow,
        ease: MOTION.ease.outExpo,
        delay,
      },
    },
  };
}

export function staggerParent(childDelay = MOTION.stagger, reduced = false): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : Math.min(childDelay, MOTION.staggerCap),
      },
    },
  };
}

export function scaleIn(delay = 0, reduced = false): Variants {
  if (reduced) {
    return {
      hidden: { opacity: 1, scale: 1 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0 } },
    };
  }
  return {
    hidden: { opacity: 0.001, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: MOTION.dur.base,
        ease: MOTION.ease.outExpo,
        delay,
      },
    },
  };
}

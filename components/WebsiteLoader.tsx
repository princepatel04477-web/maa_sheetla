"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

interface WebsiteLoaderProps {
  /** If true, force show the loader even if already shown in the session (useful for preview/testing) */
  forceShow?: boolean;
  /** Minimum display duration in milliseconds (default: 1800ms) */
  minDuration?: number;
}

const MESSAGES = [
  "Opening Surat Trading Floor...",
  "Syncing 700+ Weaving Mills & Counters...",
  "Curated Bridal Silks & Volume Desks...",
  "Maa Sheetla Agency & Sunrise Fab Tex Adat",
];

export default function WebsiteLoader({
  forceShow = false,
  minDuration = 500,
}: WebsiteLoaderProps) {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [messageIndex, setMessageIndex] = useState<number>(0);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Check session storage to avoid annoying the user on internal navigation
  useEffect(() => {
    setIsMounted(true);

    if (typeof window !== "undefined") {
      // Respect prefers-reduced-motion
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setIsVisible(false);
        return;
      }

      const hasShown = sessionStorage.getItem("msa_loader_shown_v1");
      if (hasShown && !forceShow) {
        setIsVisible(false);
        return;
      }
    }
  }, [forceShow]);

  const handleDismiss = useCallback(() => {
    setIsVisible(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("msa_loader_shown_v1", "true");
    }
  }, []);

  // Keyboard shortcut (Escape or Space to skip)
  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        handleDismiss();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isVisible, handleDismiss]);

  // Smooth progress calculation & message ticker
  useEffect(() => {
    if (!isVisible || !isMounted) return;

    const startTime = performance.now();

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(elapsed / minDuration, 1);

      // Ease-out cubic curve for natural deceleration towards 100%
      const eased = 1 - Math.pow(1 - rawProgress, 2.2);
      const currentVal = Math.floor(eased * 100);
      setProgress(currentVal);

      // Cycle status message at milestones
      if (currentVal >= 80) {
        setMessageIndex(3);
      } else if (currentVal >= 55) {
        setMessageIndex(2);
      } else if (currentVal >= 25) {
        setMessageIndex(1);
      } else {
        setMessageIndex(0);
      }

      if (rawProgress < 1) {
        requestAnimationFrame(frame);
      } else {
        setProgress(100);
        const timer = setTimeout(() => {
          handleDismiss();
        }, 320);
        return () => clearTimeout(timer);
      }
    };

    const animId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animId);
  }, [isVisible, isMounted, minDuration, handleDismiss]);

  // Prevent scroll while loader is active
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  if (!isMounted) return null;

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="site-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.02,
            filter: "blur(4px)",
            transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FCFBF7] text-[#1C1917] select-none overflow-hidden cursor-pointer"
          onClick={handleDismiss}
          role="status"
          aria-live="polite"
          aria-label="Loading Maa Sheetla Agency and Sunrise Fab Tex Adat"
        >
          {/* Subtle Loom Grid & Gold Glow Atmosphere */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              backgroundImage: `
                radial-gradient(circle at 50% 50%, rgba(166, 124, 38, 0.12) 0%, transparent 60%),
                linear-gradient(to right, rgba(28, 25, 23, 0.03) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(28, 25, 23, 0.03) 1px, transparent 1px)
              `,
              backgroundSize: "100% 100%, 32px 32px, 32px 32px",
            }}
          />

          {/* Traditional Zari Corner Filigree Accents */}
          <div className="absolute top-4 left-4 sm:top-8 sm:left-8 pointer-events-none opacity-70">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-marigold/60">
              <path d="M1 39V1H39" stroke="currentColor" strokeWidth="1.5" />
              <path d="M6 34V6H34" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" />
              <circle cx="6" cy="6" r="2.5" fill="currentColor" />
            </svg>
          </div>
          <div className="absolute top-4 right-4 sm:top-8 sm:right-8 pointer-events-none opacity-70">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-marigold/60">
              <path d="M39 39V1H1" stroke="currentColor" strokeWidth="1.5" />
              <path d="M34 34V6H6" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" />
              <circle cx="34" cy="6" r="2.5" fill="currentColor" />
            </svg>
          </div>
          <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 pointer-events-none opacity-70">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-marigold/60">
              <path d="M1 1V39H39" stroke="currentColor" strokeWidth="1.5" />
              <path d="M6 6V34H34" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" />
              <circle cx="6" cy="34" r="2.5" fill="currentColor" />
            </svg>
          </div>
          <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 pointer-events-none opacity-70">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-marigold/60">
              <path d="M39 1V39H1" stroke="currentColor" strokeWidth="1.5" />
              <path d="M34 6V34H6" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" />
              <circle cx="34" cy="34" r="2.5" fill="currentColor" />
            </svg>
          </div>

          {/* Centerpiece Content Box */}
          <div className="relative z-10 w-full max-w-4xl px-5 sm:px-8 py-8 flex flex-col items-center">
            {/* Top Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-6 sm:mb-8 flex items-center gap-2 px-3 py-1 bg-selvedge/90 border border-marigold/30 rounded-xs shadow-2xs backdrop-blur-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-marigold animate-pulse" />
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.22em] text-marigold uppercase font-medium">
                SURAT TRADING FLOOR · EST. 2008
              </span>
            </motion.div>

            {/* DUAL LOGOS LOCKUP */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="w-full bg-selvedge/80 border border-hairline-strong/60 rounded-xs p-5 sm:p-8 lg:p-10 shadow-selvedge-card backdrop-blur-md relative overflow-hidden"
            >
              {/* Subtle card top sheen */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-marigold/50 to-transparent" />

              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-12">
                {/* LOGO 1: Maa Sheetla Agency */}
                <div className="flex-1 flex flex-col items-center text-center group">
                  <div className="h-16 xs:h-20 sm:h-24 md:h-28 w-auto flex items-center justify-center relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/logos/maa_sheetla_maroon-640.png"
                      srcSet="/logos/maa_sheetla_maroon-320.png 320w, /logos/maa_sheetla_maroon-640.png 640w"
                      sizes="(max-width: 640px) 180px, 260px"
                      width={640}
                      height={494}
                      alt="Maa Sheetla Agency"
                      className="h-full w-auto object-contain filter drop-shadow-xs transition-transform duration-500 hover:scale-105"
                      fetchPriority="high"
                    />
                  </div>
                  <div className="mt-3 space-y-0.5">
                    <span className="inline-block font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-kumkum font-semibold bg-kumkum/5 px-2 py-0.5 rounded-xs border border-kumkum/20">
                      The Designer Desk
                    </span>
                    <p className="text-[11px] sm:text-xs text-ash font-light">
                      Bridal Lehengas &amp; Pure Silks
                    </p>
                  </div>
                </div>

                {/* CENTER DIVIDER: Loom Thread Shuttle & Two Desks Seal */}
                <div className="flex sm:flex-col items-center justify-center shrink-0 gap-2 sm:gap-3 py-1">
                  <div className="h-[1px] w-8 sm:w-[1px] sm:h-10 bg-gradient-to-r sm:bg-gradient-to-b from-transparent via-marigold/60 to-transparent" />
                  
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-marigold/50 bg-[#FAF8F5] flex items-center justify-center shadow-2xs">
                    <span className="font-display italic text-marigold text-xs sm:text-sm font-semibold">
                      &amp;
                    </span>
                  </div>

                  <div className="h-[1px] w-8 sm:w-[1px] sm:h-10 bg-gradient-to-r sm:bg-gradient-to-b from-transparent via-marigold/60 to-transparent" />
                </div>

                {/* LOGO 2: Sunrise Fab Tex */}
                <div className="flex-1 flex flex-col items-center text-center group">
                  <div className="h-16 xs:h-20 sm:h-24 md:h-28 w-auto flex items-center justify-center relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/logos/sunrise_fab_tex_colored-640.png"
                      srcSet="/logos/sunrise_fab_tex_colored-320.png 320w, /logos/sunrise_fab_tex_colored-640.png 640w"
                      sizes="(max-width: 640px) 180px, 260px"
                      width={640}
                      height={342}
                      alt="Sunrise Fab Tex Adat"
                      className="h-full w-auto object-contain filter drop-shadow-xs transition-transform duration-500 hover:scale-105"
                      fetchPriority="high"
                    />
                  </div>
                  <div className="mt-3 space-y-0.5">
                    <span className="inline-block font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-marigold font-semibold bg-marigold/10 px-2 py-0.5 rounded-xs border border-marigold/20">
                      The Volume Desk
                    </span>
                    <p className="text-[11px] sm:text-xs text-ash font-light">
                      Prints &amp; Commercial Wholesale
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* PROGRESS BAR & STATUS */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full max-w-md mt-6 sm:mt-8 space-y-3"
            >
              {/* Status Text & Percentage */}
              <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono">
                <span className="text-khadi/80 font-normal truncate max-w-[280px]">
                  {MESSAGES[messageIndex]}
                </span>
                <span className="text-marigold font-semibold tracking-wider tabular-nums">
                  {progress}%
                </span>
              </div>

              {/* Elegant Zari Progress Track */}
              <div
                className="w-full h-1 sm:h-1.5 bg-[#E8E2D5] rounded-full overflow-hidden p-[1px] relative"
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-kumkum via-marigold to-kumkum rounded-full transition-all duration-150 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Bottom Subtle Note */}
              <div className="flex items-center justify-between text-[9.5px] sm:text-[10px] font-mono text-ash/80 pt-1">
                <span>TWO DESKS · ONE FLOOR</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDismiss();
                  }}
                  className="hover:text-khadi underline decoration-dotted underline-offset-2 transition-colors cursor-pointer"
                >
                  Enter Site [Esc]
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

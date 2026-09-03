"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion, MOTION } from "../lib/motion";
import { Reveal, RevealGroup } from "./react-bits/AnimatedContent";
import { CheckCircle2, History } from "lucide-react";

interface Chapter {
  year: string;
  tagline: string;
  title: string;
  subtitle: string;
  desc: string;
  highlights: string[];
  badge: string;
}

interface TimelineSectionProps {
  chapters: Chapter[];
}

export default function TimelineSection({ chapters }: TimelineSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 60%"],
  });

  // Rule draws from top to bottom as user scrolls through the timeline
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className="space-y-8">
      <div className="space-y-2 border-b border-hairline pb-4">
        <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-marigold">
          <History className="w-4 h-4" />
          <span>THE FIVE DEFINING MILESTONES (2008 – 2026)</span>
        </div>
        <h2 className="font-display text-2xl sm:text-4xl text-khadi font-light tracking-tight">
          Chronicles of an 18-Year Textile Journey
        </h2>
      </div>

      {/* Timeline with animated vertical rule */}
      <div className="relative">
        {/* Vertical rule on left — draws down via scaleY */}
        <div className="absolute left-[15px] top-0 bottom-0 w-[1.5px] bg-hairline origin-top overflow-hidden hidden sm:block">
          {!prefersReduced && (
            <motion.div
              className="w-full bg-marigold/50"
              style={{
                height: "100%",
                scaleY: lineScaleY,
                originY: 0,
              }}
            />
          )}
        </div>

        <div className="space-y-8 sm:pl-12">
          <RevealGroup stagger={0.1}>
            {chapters.map((chap, idx) => (
              <div key={chap.year} className="relative">
                {/* Timeline bullet */}
                <div className="absolute -left-[2.35rem] top-6 w-3.5 h-3.5 rounded-full bg-selvedge border-2 border-marigold hidden sm:flex items-center justify-center shadow-xs" />

                {/* Chapter card */}
                <div className="p-6 sm:p-8 lg:p-10 bg-selvedge border border-hairline hover:border-marigold/50 rounded-sm space-y-4 shadow-2xs relative transition-colors duration-200">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-hairline/70 pb-4">
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="font-mono text-sm sm:text-base text-marigold font-semibold bg-warp px-3 py-1 border border-marigold/30 rounded-2xs">
                          {chap.year}
                        </span>
                        <span className="text-xs font-mono text-kumkum uppercase tracking-wider font-medium px-2 py-0.5 bg-kumkum/10 border border-kumkum/30 rounded-2xs">
                          {chap.tagline}
                        </span>
                        <span className="text-[10px] font-mono text-ash/70 px-2 py-0.5 border border-hairline rounded-2xs hidden sm:inline-block">
                          {chap.badge}
                        </span>
                      </div>
                      <h3 className="font-display text-xl sm:text-3xl text-khadi font-light pt-1">
                        {chap.title}
                      </h3>
                      <p className="font-mono text-xs text-ash italic">
                        {chap.subtitle}
                      </p>
                    </div>
                    <span className="font-display text-4xl sm:text-5xl text-ash/20 font-light shrink-0">
                      0{idx + 1}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-ash font-light leading-relaxed">
                    {chap.desc}
                  </p>

                  <div className="pt-2">
                    <ul className="space-y-2">
                      {chap.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-ash font-light">
                          <CheckCircle2 className="w-3.5 h-3.5 text-marigold shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </RevealGroup>
        </div>
      </div>
    </div>
  );
}

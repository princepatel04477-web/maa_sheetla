"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface TrueFocusProps {
  items: string[];
  activeIndex?: number;
  onSelect?: (index: number) => void;
  className?: string;
}

export default function TrueFocus({
  items,
  activeIndex = 0,
  onSelect,
  className = "",
}: TrueFocusProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const current = hoveredIndex !== null ? hoveredIndex : activeIndex;

  return (
    <div className={`inline-flex items-center gap-1.5 p-1 bg-selvedge border border-hairline rounded-sm ${className}`}>
      {items.map((item, idx) => {
        const isFocused = current === idx;
        return (
          <button
            key={item}
            onClick={() => onSelect?.(idx)}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative px-3.5 py-1.5 font-mono text-xs tracking-wider uppercase transition-colors z-10 text-ash hover:text-khadi"
          >
            {isFocused && (
              <motion.div
                layoutId="true-focus-indicator"
                className="absolute inset-0 bg-warp border border-marigold/60 rounded-xs shadow-sm"
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
              />
            )}
            <span className={`relative z-10 ${isFocused ? "text-haldi font-medium" : "text-ash"}`}>
              {item}
            </span>
          </button>
        );
      })}
    </div>
  );
}

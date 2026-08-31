"use client";

import React from "react";

interface MarqueeProps {
  items: string[];
  reverse?: boolean;
  className?: string;
}

export default function Marquee({
  items,
  reverse = false,
  className = "",
}: MarqueeProps) {
  return (
    <div
      className={`w-full overflow-hidden whitespace-nowrap flex border-y border-hairline py-3 bg-selvedge/30 font-mono text-[11px] tracking-[0.22em] text-ash uppercase select-none ${className}`}
      style={{ contain: "content" }}
    >
      <div
        className={`marquee-track items-center gap-8 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {items.concat(items).map((item, idx) => (
          <div key={idx} className="flex items-center gap-8">
            <span className="hover:text-haldi transition-colors">{item}</span>
            <span className="text-marigold/50 text-xs">◆</span>
          </div>
        ))}
      </div>
      <div
        className={`marquee-track items-center gap-8 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
        aria-hidden="true"
      >
        {items.concat(items).map((item, idx) => (
          <div key={`dup-${idx}`} className="flex items-center gap-8">
            <span className="hover:text-haldi transition-colors">{item}</span>
            <span className="text-marigold/50 text-xs">◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}

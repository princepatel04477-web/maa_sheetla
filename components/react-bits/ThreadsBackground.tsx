"use client";

import React from "react";

export default function ThreadsBackground({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden opacity-[0.05] ${className}`}>
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="warp-weft-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="40" y2="0" stroke="#FFD9A0" strokeWidth="0.5" strokeDasharray="2 3" />
            <line x1="0" y1="0" x2="0" y2="40" stroke="#E4611A" strokeWidth="0.5" strokeDasharray="2 3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#warp-weft-grid)" />
      </svg>
    </div>
  );
}

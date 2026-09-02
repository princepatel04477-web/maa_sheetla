import React from "react";
import { Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-[9990] flex flex-col items-center justify-center bg-[#FCFBF7] text-[#1C1917] select-none"
      role="status"
      aria-live="polite"
      aria-label="Loading page..."
    >
      {/* Background radial warmth */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(166, 124, 38, 0.1) 0%, transparent 60%),
            linear-gradient(to right, rgba(28, 25, 23, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(28, 25, 23, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 24px 24px, 24px 24px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
        {/* Dual Logos Card */}
        <div className="bg-selvedge/90 border border-hairline-strong/60 rounded-xs p-5 shadow-selvedge-card backdrop-blur-sm flex items-center justify-center gap-4">
          <div className="h-10 w-auto flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logos/maa_sheetla_maroon-320.png"
              width={160}
              height={123}
              alt="Maa Sheetla Agency"
              className="h-full w-auto object-contain drop-shadow-2xs animate-pulse-subtle"
            />
          </div>

          <div className="h-6 w-[1px] bg-marigold/40" />

          <div className="h-8 w-auto flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logos/sunrise_fab_tex_colored-320.png"
              width={160}
              height={85}
              alt="Sunrise Fab Tex Adat"
              className="h-full w-auto object-contain drop-shadow-2xs animate-pulse-subtle"
            />
          </div>
        </div>

        {/* Pulse Indicator */}
        <div className="mt-5 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-marigold animate-spin" style={{ animationDuration: "3s" }} />
          <span className="font-mono text-[10px] tracking-[0.24em] text-marigold uppercase font-medium">
            Loading Surat Desk...
          </span>
        </div>

        {/* Zari loading line */}
        <div className="w-36 h-0.5 bg-hairline rounded-full overflow-hidden mt-2.5">
          <div className="w-full h-full bg-gradient-to-r from-kumkum via-marigold to-kumkum animate-shimmer" />
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { createWhatsAppLink } from "../lib/whatsapp";

export default function SplitHero() {
  const [hoveredPanel, setHoveredPanel] = useState<"maa" | "sunrise" | null>(null);

  const maaWaUrl = createWhatsAppLink("connecting with the Maa Sheetla counter in Surat");
  const sunriseWaUrl = createWhatsAppLink("connecting with the Sunrise Tex Fab counter in Surat");

  return (
    <section id="firms" className="relative w-full min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)] mt-16 sm:mt-20 flex flex-col md:flex-row border-b border-hairline overflow-hidden">
      {/* LEFT PANEL: Maa Sheetla (The Named Counter) */}
      <div
        onMouseEnter={() => setHoveredPanel("maa")}
        onMouseLeave={() => setHoveredPanel(null)}
        className={`relative flex-1 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col justify-between p-6 sm:p-10 lg:p-16 border-b md:border-b-0 md:border-r border-hairline group overflow-hidden bg-selvedge ${
          hoveredPanel === "maa"
            ? "md:flex-[1.25] shadow-md z-10"
            : hoveredPanel === "sunrise"
            ? "md:flex-[0.8] opacity-90"
            : ""
        }`}
      >
        {/* Atmosphere Background */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out group-hover:scale-105 opacity-50 group-hover:opacity-70"
          style={{
            backgroundImage:
              'url("/img/firms/desk-maa-sheetla-1400.jpg")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-warp/95 via-warp/65 to-warp/20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-warp/80 via-transparent to-transparent pointer-events-none" />

        {/* Panel Header Eyebrow */}
        <div className="relative z-10 space-y-1.5 pt-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] sm:text-[9.5px] tracking-[0.24em] text-kumkum uppercase bg-selvedge/95 px-2.5 py-1 border border-kumkum/30 rounded-xs shadow-2xs font-medium backdrop-blur-xs">
              THE NAMED COUNTER · EST. 2010
            </span>
          </div>
          <div className="font-mono text-[10px] sm:text-[10.5px] text-khadi tracking-widest uppercase pl-0.5 font-medium">
            FIRM 01 · SURAT TEXTILE MARKET
          </div>
        </div>

        {/* Panel Core Content */}
        <div className="relative z-10 my-auto py-6 sm:py-10 space-y-3.5 sm:space-y-5">
          <div className="h-14 sm:h-20 w-auto flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logos/maa_sheetla_black.png"
              alt="Maa Sheetla Agency Official Logo"
              className="h-full w-auto object-contain filter drop-shadow-xs"
            />
          </div>

          <div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-khadi tracking-tight leading-[0.94] drop-shadow-2xs">
              Maa Sheetla
            </h2>
            <p className="font-display text-lg sm:text-2xl text-marigold font-light italic mt-1">
              For boutiques that sell by label.
            </p>
          </div>
          <p className="text-xs sm:text-sm text-khadi/90 font-normal max-w-lg leading-relaxed bg-selvedge/60 backdrop-blur-2xs p-3 rounded-xs border border-hairline/40">
            Curated sourcing of high-craft bridal lehengas, pure tissue Kanjivarams, and hand-embroidered
            silks. Structured for premium multi-designer counters demanding strict territorial exclusivity.
          </p>

          <div className="pt-1 flex flex-wrap gap-1.5 sm:gap-2 text-[9.5px] sm:text-[10.5px] font-mono text-khadi">
            <span className="bg-selvedge/95 px-2.5 py-1 border border-hairline rounded-xs shadow-2xs font-medium backdrop-blur-xs">MOQ: 2–6 pcs/set</span>
            <span className="bg-selvedge/95 px-2.5 py-1 border border-hairline rounded-xs shadow-2xs font-medium backdrop-blur-xs">Territorial Lock</span>
            <span className="bg-selvedge/95 px-2.5 py-1 border border-hairline rounded-xs shadow-2xs font-medium backdrop-blur-xs">Pure Silk Jacquards</span>
          </div>
        </div>

        {/* Panel Footer Actions */}
        <div className="relative z-10 pt-5 border-t border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 bg-selvedge/80 backdrop-blur-xs -mx-2 px-2 py-2 rounded-xs">
          <Link
            href="/firms/maa-sheetla"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.18em] uppercase text-khadi group-hover:text-marigold transition-colors py-1 font-medium"
          >
            <span>Explore Maa Sheetla Desk</span>
            <ArrowUpRight className="w-4 h-4 text-marigold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
          <a
            href={maaWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-kumkum hover:text-kumkum-deep tracking-wider uppercase transition-colors py-1 font-medium"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Direct WhatsApp Desk →</span>
          </a>
        </div>
      </div>

      {/* RIGHT PANEL: Sunrise Tex Fab (The Volume Counter) */}
      <div
        onMouseEnter={() => setHoveredPanel("sunrise")}
        onMouseLeave={() => setHoveredPanel(null)}
        className={`relative flex-1 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col justify-between p-6 sm:p-10 lg:p-16 group overflow-hidden bg-selvedge ${
          hoveredPanel === "sunrise"
            ? "md:flex-[1.25] shadow-md z-10"
            : hoveredPanel === "maa"
            ? "md:flex-[0.8] opacity-90"
            : ""
        }`}
      >
        {/* Atmosphere Background */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out group-hover:scale-105 opacity-50 group-hover:opacity-70"
          style={{
            backgroundImage:
              'url("/img/firms/desk-sunrise-fab-tex-1400.jpg")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-warp/95 via-warp/65 to-warp/20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-warp/80 via-transparent to-transparent pointer-events-none" />

        {/* Panel Header Eyebrow */}
        <div className="relative z-10 space-y-1.5 pt-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] sm:text-[9.5px] tracking-[0.24em] text-marigold uppercase bg-selvedge/95 px-2.5 py-1 border border-marigold/30 rounded-xs shadow-2xs font-medium backdrop-blur-xs">
              THE VOLUME COUNTER · EST. 2010
            </span>
          </div>
          <div className="font-mono text-[10px] sm:text-[10.5px] text-khadi tracking-widest uppercase pl-0.5 font-medium">
            FIRM 02 · SURAT TEXTILE MARKET
          </div>
        </div>

        {/* Panel Core Content */}
        <div className="relative z-10 my-auto py-6 sm:py-10 space-y-3.5 sm:space-y-5">
          <div className="h-14 sm:h-20 w-auto flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logos/sunrise_fab_tex_colored.png"
              alt="Sunrise Fab Tex Pvt Ltd Official Logo"
              className="h-full w-auto object-contain filter drop-shadow-xs"
            />
          </div>

          <div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-khadi tracking-tight leading-[0.94] drop-shadow-2xs">
              Sunrise Fab Tex
            </h2>
            <p className="font-display text-lg sm:text-2xl text-marigold font-light italic mt-1">
              Priced and packed for the retail floor.
            </p>
          </div>
          <p className="text-xs sm:text-sm text-khadi/90 font-normal max-w-lg leading-relaxed bg-selvedge/60 backdrop-blur-2xs p-3 rounded-xs border border-hairline/40">
            High-velocity wholesale brokerage for commercial retail showrooms. Dependable carton lots,
            mill-consistent dye lots, and rapid re-order turnarounds built for high weekly volume turns.
          </p>

          <div className="pt-1 flex flex-wrap gap-1.5 sm:gap-2 text-[9.5px] sm:text-[10.5px] font-mono text-khadi">
            <span className="bg-selvedge/95 px-2.5 py-1 border border-hairline rounded-xs shadow-2xs font-medium backdrop-blur-xs">MOQ: 8–12 pcs carton</span>
            <span className="bg-selvedge/95 px-2.5 py-1 border border-hairline rounded-xs shadow-2xs font-medium backdrop-blur-xs">Immediate Mill Dispatch</span>
            <span className="bg-selvedge/95 px-2.5 py-1 border border-hairline rounded-xs shadow-2xs font-medium backdrop-blur-xs">Commercial Margins</span>
          </div>
        </div>

        {/* Panel Footer Actions */}
        <div className="relative z-10 pt-5 border-t border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 bg-selvedge/80 backdrop-blur-xs -mx-2 px-2 py-2 rounded-xs">
          <Link
            href="/firms/sunrise-tex-fab"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.18em] uppercase text-khadi group-hover:text-marigold transition-colors py-1 font-medium"
          >
            <span>Explore Sunrise Desk</span>
            <ArrowUpRight className="w-4 h-4 text-marigold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
          <a
            href={sunriseWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-marigold hover:text-haldi tracking-wider uppercase transition-colors py-1 font-medium"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Direct WhatsApp Desk →</span>
          </a>
        </div>
      </div>
    </section>
  );
}

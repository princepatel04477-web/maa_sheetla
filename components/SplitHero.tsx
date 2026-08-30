"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { createWhatsAppLink } from "../lib/whatsapp";

export default function SplitHero() {
  const [hoveredPanel, setHoveredPanel] = useState<"maa" | "sunrise" | null>(null);

  const maaWaUrl = createWhatsAppLink("connecting with the Maa Sheetla counter in Surat");
  const sunriseWaUrl = createWhatsAppLink("connecting with the Sunrise Tex Fab counter in Surat");

  return (
    <section id="firms" className="relative w-full min-h-[calc(100vh-5rem)] mt-20 flex flex-col md:flex-row border-b border-hairline overflow-hidden">
      {/* LEFT PANEL: Maa Sheetla (The Named Counter) */}
      <div
        onMouseEnter={() => setHoveredPanel("maa")}
        onMouseLeave={() => setHoveredPanel(null)}
        className={`relative flex-1 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col justify-between p-8 sm:p-12 lg:p-16 border-b md:border-b-0 md:border-r border-hairline group overflow-hidden ${
          hoveredPanel === "maa"
            ? "md:flex-[1.25] bg-selvedge/95"
            : hoveredPanel === "sunrise"
            ? "md:flex-[0.8] opacity-75"
            : "bg-selvedge/60"
        }`}
      >
        {/* Rich Background Atmosphere with Warm Scrim */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105 opacity-20"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=85")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-warp via-warp/85 to-transparent" />
        <div className="absolute inset-0 bg-kumkum/10 mix-blend-color-dodge pointer-events-none opacity-30 group-hover:opacity-50 transition-opacity" />

        {/* Panel Header Eyebrow */}
        <div className="relative z-10 space-y-2 pt-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9.5px] tracking-[0.26em] text-marigold uppercase bg-warp/90 px-3 py-1 border border-kumkum/40 rounded-xs">
              THE NAMED COUNTER · EST. 2010
            </span>
          </div>
          <div className="font-mono text-[10.5px] text-ash tracking-widest uppercase pl-0.5">
            FIRM 01 · SURAT TEXTILE MARKET
          </div>
        </div>

        {/* Panel Core Content */}
        <div className="relative z-10 my-auto py-8 sm:py-12 space-y-5">
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-light text-khadi tracking-tight leading-[0.92]">
            Maa Sheetla
          </h2>
          <p className="font-display text-xl sm:text-2xl text-haldi font-light italic">
            For boutiques that sell by label.
          </p>
          <p className="text-xs sm:text-sm text-ash font-light max-w-lg leading-relaxed">
            Curated sourcing of high-craft bridal lehengas, pure tissue Kanjivarams, and hand-embroidered
            silks. Structured for premium multi-designer counters demanding strict territorial exclusivity.
          </p>

          <div className="pt-2 flex flex-wrap gap-2 text-[10.5px] font-mono text-ash">
            <span className="bg-warp/90 px-2.5 py-1 border border-hairline rounded-xs">MOQ: 2–6 pcs/set</span>
            <span className="bg-warp/90 px-2.5 py-1 border border-hairline rounded-xs">Territorial Lock</span>
            <span className="bg-warp/90 px-2.5 py-1 border border-hairline rounded-xs">Pure Silk Jacquards</span>
          </div>
        </div>

        {/* Panel Footer Actions */}
        <div className="relative z-10 pt-6 border-t border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link
            href="/firms/maa-sheetla"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase text-khadi group-hover:text-haldi transition-colors"
          >
            <span>Explore Maa Sheetla Desk</span>
            <ArrowUpRight className="w-4 h-4 text-marigold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
          <a
            href={maaWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-marigold hover:text-haldi tracking-wider uppercase transition-colors"
          >
            Direct WhatsApp Desk →
          </a>
        </div>
      </div>

      {/* RIGHT PANEL: Sunrise Tex Fab (The Volume Counter) */}
      <div
        onMouseEnter={() => setHoveredPanel("sunrise")}
        onMouseLeave={() => setHoveredPanel(null)}
        className={`relative flex-1 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col justify-between p-8 sm:p-12 lg:p-16 group overflow-hidden ${
          hoveredPanel === "sunrise"
            ? "md:flex-[1.25] bg-selvedge/95"
            : hoveredPanel === "maa"
            ? "md:flex-[0.8] opacity-75"
            : "bg-selvedge/60"
        }`}
      >
        {/* Rich Background Atmosphere with Dawn Amber Scrim */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105 opacity-20"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1600&q=85")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-warp via-warp/85 to-transparent" />
        <div className="absolute inset-0 bg-marigold/10 mix-blend-color-dodge pointer-events-none opacity-30 group-hover:opacity-50 transition-opacity" />

        {/* Panel Header Eyebrow */}
        <div className="relative z-10 space-y-2 pt-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9.5px] tracking-[0.26em] text-marigold uppercase bg-warp/90 px-3 py-1 border border-marigold/40 rounded-xs">
              THE VOLUME COUNTER · EST. 2010
            </span>
          </div>
          <div className="font-mono text-[10.5px] text-ash tracking-widest uppercase pl-0.5">
            FIRM 02 · SURAT TEXTILE MARKET
          </div>
        </div>

        {/* Panel Core Content */}
        <div className="relative z-10 my-auto py-8 sm:py-12 space-y-5">
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-light text-khadi tracking-tight leading-[0.92]">
            Sunrise Tex Fab
          </h2>
          <p className="font-display text-xl sm:text-2xl text-haldi font-light italic">
            Priced and packed for the retail floor.
          </p>
          <p className="text-xs sm:text-sm text-ash font-light max-w-lg leading-relaxed">
            High-velocity wholesale brokerage for commercial retail showrooms. Dependable carton lots,
            mill-consistent dye lots, and rapid re-order turnarounds built for high weekly volume turns.
          </p>

          <div className="pt-2 flex flex-wrap gap-2 text-[10.5px] font-mono text-ash">
            <span className="bg-warp/90 px-2.5 py-1 border border-hairline rounded-xs">MOQ: 8–12 pcs carton</span>
            <span className="bg-warp/90 px-2.5 py-1 border border-hairline rounded-xs">Immediate Mill Dispatch</span>
            <span className="bg-warp/90 px-2.5 py-1 border border-hairline rounded-xs">Commercial Margins</span>
          </div>
        </div>

        {/* Panel Footer Actions */}
        <div className="relative z-10 pt-6 border-t border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link
            href="/firms/sunrise-tex-fab"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase text-khadi group-hover:text-haldi transition-colors"
          >
            <span>Explore Sunrise Desk</span>
            <ArrowUpRight className="w-4 h-4 text-marigold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
          <a
            href={sunriseWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-marigold hover:text-haldi tracking-wider uppercase transition-colors"
          >
            Direct WhatsApp Desk →
          </a>
        </div>
      </div>
    </section>
  );
}

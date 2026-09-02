"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, MapPin, Sparkles, MessageCircle, CheckCircle2 } from "lucide-react";
import { createWhatsAppLink, OFFICE_NUMBERS } from "../lib/whatsapp";
import ShinyText from "./react-bits/ShinyText";

export default function AhmedabadCountdown() {
  const waUrl = createWhatsAppLink(
    "new Ahmedabad Office & Trade Floor registration / wholesale enquiry",
    { targetNumber: OFFICE_NUMBERS.ahmedabad }
  );

  return (
    <div
      className="w-full bg-gradient-to-r from-warp via-selvedge to-warp border-b border-hairline relative overflow-hidden py-7 px-4 sm:px-8 lg:px-12"
      style={{ contain: "content" }}
    >
      <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 max-w-full h-48 bg-marigold/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
        {/* Left Info */}
        <div className="space-y-2.5 text-center lg:text-left max-w-xl">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 font-mono text-[9px] sm:text-[9.5px] tracking-[0.22em] text-marigold uppercase bg-warp/90 px-2.5 py-1 border border-marigold/30 rounded-xs">
            <Sparkles className="w-3 h-3 text-marigold animate-pulse shrink-0" />
            <span>NEW REGIONAL EXPANSION</span>
            <span>·</span>
            <ShinyText text="AHMEDABAD TRADE FLOOR" />
          </div>
          <h3 className="font-display text-2xl sm:text-3xl text-khadi font-light tracking-tight leading-tight">
            Opening Our New <i className="italic text-haldi">Ahmedabad Office</i> &amp; Trade Floor
          </h3>
          <p className="text-xs sm:text-sm text-ash font-light leading-relaxed">
            Ahmedabad readymade garment manufacturing, designer kurti collections, cotton suits,
            exclusive sample preview halls, and direct regional wholesale trade.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1 text-[11px] font-mono text-khadi/80">
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-marigold" /> Readymade Garment Hub
            </span>
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-marigold" /> Designer Kurtis &amp; Sets
            </span>
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-marigold" /> Cotton Manufacturing
            </span>
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-marigold" /> Sample Inspection Floor
            </span>
          </div>
        </div>

        {/* Right Action & Address Card */}
        <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col items-center lg:items-end justify-center gap-3.5 sm:gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
            <Link
              href="/partner"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-kumkum hover:bg-kumkum-deep text-white font-mono text-xs tracking-wider uppercase rounded-xs transition-all shadow-agency-card w-full sm:w-auto text-center min-h-[44px] font-medium"
            >
              <span className="leading-tight">Register Now<span className="hidden xs:inline"> — Open Trade Query</span></span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-3.5 bg-selvedge-light hover:bg-selvedge border border-hairline hover:border-marigold text-khadi font-mono text-xs tracking-wider uppercase rounded-xs transition-all w-full sm:w-auto text-center min-h-[44px]"
            >
              <MessageCircle className="w-3.5 h-3.5 text-marigold" />
              <span>Ahmedabad Desk</span>
            </a>
          </div>

          <div className="flex items-center justify-center lg:justify-end gap-1.5 text-[10px] sm:text-[10.5px] font-mono text-ash">
            <MapPin className="w-3.5 h-3.5 text-marigold shrink-0" />
            <span>300, 1st Floor, New Cloth Market, Sarangpur, Ahmedabad</span>
          </div>
        </div>
      </div>
    </div>
  );
}

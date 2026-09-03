"use client";

import React from "react";
import Link from "next/link";
import ThreadsBackground from "../../components/react-bits/ThreadsBackground";
import BlurText from "../../components/react-bits/BlurText";
import ShinyText from "../../components/react-bits/ShinyText";
import IndiaReachMap from "../../components/IndiaReachMap";
import CountUp from "../../components/react-bits/CountUp";
import { Reveal, RevealGroup } from "../../components/react-bits/AnimatedContent";
import { ArrowUpRight, MessageCircle, MapPin, Building2, Network, Package } from "lucide-react";
import { createWhatsAppLink } from "../../lib/whatsapp";
import { Picture } from "../../components/Picture";

const STATS = [
  { value: 70, suffix: "+", label: "Trade Cities", icon: MapPin },
  { value: 500, suffix: "+", label: "Verified Showrooms", icon: Building2 },
  { value: 700, suffix: "+", label: "Verified Mills", icon: Network },
  { value: 48, suffix: "Hr", label: "Express Dispatch", icon: Package },
];

export default function ReachPage() {
  const waUrl = createWhatsAppLink("dispatch timing and agency representation inquiry for our city");

  return (
    <div className="min-h-screen pt-28 sm:pt-36 pb-20 px-4 sm:px-8 lg:px-12 bg-warp relative">
      <ThreadsBackground />

      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 relative z-10">
        {/* Header with Hero-Reach Atmosphere */}
        <Reveal>
          <div className="relative overflow-hidden rounded-sm border border-hairline p-6 sm:p-12 lg:p-16 space-y-5 bg-selvedge">
            <div className="absolute inset-0 opacity-40 pointer-events-none">
              <Picture
                imageKey="HERO-REACH"
                priority={true}
                sizes="100vw"
                className="w-full h-full"
                imgClassName="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-selvedge via-selvedge/60 to-transparent" />
            </div>

            <div className="relative z-10 space-y-3.5 max-w-3xl">
              <div className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px] tracking-[0.22em] text-marigold uppercase">
                <span>DISPATCH LOGISTICS &amp; TRANSIT TIMES</span>
                <span>·</span>
                <ShinyText text="10 STATES · 70+ TRADE CITIES" />
              </div>
              <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl text-khadi font-light tracking-tight leading-[0.95]">
                <BlurText text="The 70+ City Wholesale Trade Network." />
              </h1>
              <p className="text-xs sm:text-base text-ash font-light leading-relaxed">
                Consolidated 24-to-48 hour dispatches connecting 700+ suppliers around India with over
                500+ verified buyers and showroom counters across North, Central, and Eastern India.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Stat Row — CountUp on scroll-in */}
        <RevealGroup stagger={0.08}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
            {STATS.map(({ value, suffix, label, icon: Icon }) => (
              <div
                key={label}
                className="p-5 sm:p-6 bg-selvedge border border-hairline rounded-sm text-center space-y-1.5 shadow-2xs"
              >
                <Icon className="w-4 h-4 text-marigold mx-auto mb-2" />
                <div className="font-display text-3xl sm:text-4xl text-khadi font-light tabular-nums">
                  <CountUp to={value} suffix={suffix} duration={1.4} />
                </div>
                <div className="font-mono text-[10px] text-ash uppercase tracking-widest">{label}</div>
              </div>
            ))}
          </div>
        </RevealGroup>

        {/* Map View with Live Highlight */}
        <Reveal>
          <div className="p-4 sm:p-8 bg-selvedge border border-hairline rounded-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-hairline pb-4">
              <h2 className="font-display text-xl sm:text-2xl text-khadi font-light flex items-center gap-2">
                <MapPin className="w-4 h-4 text-marigold" /> Interactive Trade Corridors (70+ Cities)
              </h2>
              <span className="font-mono text-xs text-ash">Hover or click any node to view details</span>
            </div>
            <div className="w-full max-w-3xl mx-auto py-2">
              <IndiaReachMap />
            </div>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal>
          <div className="p-6 sm:p-10 bg-selvedge border border-hairline rounded-sm flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xs">
            <div className="space-y-2 text-center sm:text-left">
              <h3 className="font-display text-2xl text-khadi font-light">Ready to source in your city?</h3>
              <p className="text-xs sm:text-sm text-ash font-light">
                Connect directly with our Surat dispatch desk to lock exclusive territorial slots for your city counter.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-kumkum hover:bg-kumkum-deep text-white font-mono text-xs tracking-widest uppercase rounded-xs transition-all shadow-xs min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4" /> Message Dispatch Desk
              </a>
              <Link
                href="/partner"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-selvedge-light hover:bg-selvedge border border-hairline text-khadi hover:text-marigold font-mono text-xs tracking-widest uppercase rounded-xs min-h-[44px] shadow-2xs font-medium"
              >
                Submit Trade Query <ArrowUpRight className="w-4 h-4 text-marigold" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import ThreadsBackground from "../../components/react-bits/ThreadsBackground";
import BlurText from "../../components/react-bits/BlurText";
import ShinyText from "../../components/react-bits/ShinyText";
import SpotlightCard from "../../components/react-bits/SpotlightCard";
import AhmedabadCountdown from "../../components/AhmedabadCountdown";
import { MapPin, Phone, MessageCircle, Clock, Building2, ArrowUpRight } from "lucide-react";
import { createWhatsAppLink } from "../../lib/whatsapp";

export default function ContactPage() {
  const suratWa = createWhatsAppLink("inquiring with Surat Head Office desk");
  const ahmedabadWa = createWhatsAppLink("pre-registering for Ahmedabad showroom opening preview");

  return (
    <div className="min-h-screen pt-28 sm:pt-36 pb-20 px-4 sm:px-8 lg:px-12 bg-warp relative">
      <ThreadsBackground />

      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 relative z-10">
        {/* Header */}
        <div className="space-y-3.5 max-w-3xl">
          <div className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px] tracking-[0.22em] text-marigold uppercase">
            <span>OFFICE &amp; TRADING FLOOR DIRECTORY</span>
            <span>·</span>
            <ShinyText text="SURAT HQ &amp; AHMEDABAD EXPANSION" />
          </div>
          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl text-khadi font-light tracking-tight leading-[0.95]">
            <BlurText text="Connect with our wholesale desks." />
          </h1>
          <p className="text-xs sm:text-base text-ash font-light leading-relaxed">
            Visit our active trading floor in Surat or connect with our specialized agency representatives
            for wholesale mill allocations, quality inspections, and freight schedules.
          </p>
        </div>

        {/* 30-Day Ahmedabad Countdown */}
        <AhmedabadCountdown />

        {/* 2 Office Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Surat Head Office */}
          <SpotlightCard className="p-6 sm:p-8 bg-selvedge border-hairline rounded-sm space-y-6">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-marigold font-display text-2xl font-light">HQ</span>
              <span className="text-haldi text-[10px] border border-marigold/40 px-2.5 py-0.5 bg-warp uppercase">
                Active Trading Floor
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="font-display text-2xl sm:text-3xl text-khadi font-light">
                Surat Head Office &amp; QC Floor
              </h3>
              <p className="text-xs text-ash font-light leading-relaxed">
                Central brokerage desk, fabric inspection hall, master mill coordination office,
                and consolidated regional freight dock.
              </p>
            </div>

            <div className="space-y-3 text-xs font-mono text-khadi/90 pt-2 border-t border-hairline">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-marigold shrink-0 mt-0.5" />
                <span>1st Floor, Surat Textile Market, Ring Road, Surat, Gujarat 395002</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-marigold shrink-0" />
                <span>Monday – Saturday: 10:00 AM – 8:30 PM IST</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-marigold shrink-0" />
                <a href="tel:+919825144001" className="hover:text-haldi underline">
                  +91 98251 44001 / +91 98251 44002
                </a>
              </div>
            </div>

            <div className="pt-3 flex flex-col sm:flex-row gap-3">
              <a
                href={suratWa}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3.5 bg-kumkum hover:bg-kumkum-deep text-white font-mono text-xs tracking-widest uppercase rounded-xs transition-all shadow-agency-card min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4" /> Message Surat Desk
              </a>
              <a
                href="tel:+919825144001"
                className="px-5 py-3.5 bg-warp border border-hairline text-khadi font-mono text-xs tracking-widest uppercase rounded-xs text-center min-h-[44px] flex items-center justify-center"
              >
                Call Direct
              </a>
            </div>
          </SpotlightCard>

          {/* Ahmedabad Regional Expansion */}
          <SpotlightCard className="p-6 sm:p-8 bg-selvedge border-hairline rounded-sm space-y-6">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-marigold font-display text-2xl font-light">EXP</span>
              <span className="text-marigold text-[10px] border border-marigold/40 px-2.5 py-0.5 bg-warp uppercase">
                Opening in 30 Days
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="font-display text-2xl sm:text-3xl text-khadi font-light">
                Ahmedabad Regional Office
              </h3>
              <p className="text-xs text-ash font-light leading-relaxed">
                Dedicated regional showroom, bridal lehenga sample gallery, and fast local spot-order
                booking desk for North &amp; Central Gujarat buyers.
              </p>
            </div>

            <div className="space-y-3 text-xs font-mono text-khadi/90 pt-2 border-t border-hairline">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-marigold shrink-0 mt-0.5" />
                <span>Sindhu Bhavan Road / Relief Road Market Corridor, Ahmedabad, Gujarat</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-marigold shrink-0" />
                <span>Launch Date: October 2026</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Building2 className="w-4 h-4 text-marigold shrink-0" />
                <span>Pre-registration Desk Active</span>
              </div>
            </div>

            <div className="pt-3 flex flex-col sm:flex-row gap-3">
              <a
                href={ahmedabadWa}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3.5 bg-kumkum hover:bg-kumkum-deep text-white font-mono text-xs tracking-widest uppercase rounded-xs transition-all shadow-agency-card min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4" /> Pre-Register Desk
              </a>
              <Link
                href="/partner"
                className="px-5 py-3.5 bg-warp border border-hairline text-khadi hover:text-haldi font-mono text-xs tracking-widest uppercase rounded-xs text-center min-h-[44px] flex items-center justify-center gap-1.5"
              >
                Query Form <ArrowUpRight className="w-3.5 h-3.5 text-marigold" />
              </Link>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
}

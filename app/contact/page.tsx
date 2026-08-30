"use client";

import React from "react";
import ThreadsBackground from "../../components/react-bits/ThreadsBackground";
import BlurText from "../../components/react-bits/BlurText";
import ShinyText from "../../components/react-bits/ShinyText";
import AhmedabadCountdown from "../../components/AhmedabadCountdown";
import { Phone, Mail, MapPin, Clock, ArrowUpRight, MessageCircle } from "lucide-react";
import { createWhatsAppLink } from "../../lib/whatsapp";

export default function ContactPage() {
  const waUrl = createWhatsAppLink("reaching out to Surat head trading floor");
  const ahmedabadWaUrl = createWhatsAppLink("pre-booking for Ahmedabad office opening");

  return (
    <div className="min-h-screen pt-36 pb-28 px-6 sm:px-12 bg-warp relative">
      <ThreadsBackground />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.24em] text-marigold uppercase">
            <span>OFFICE &amp; TRADING FLOOR DIRECTORY</span>
            <span>·</span>
            <ShinyText text="SURAT HQ &amp; AHMEDABAD EXPANSION" />
          </div>
          <h1 className="font-display text-4xl sm:text-6xl text-khadi font-light tracking-tight leading-[0.95]">
            <BlurText text="Visit our trading floors." />
          </h1>
          <p className="text-sm sm:text-base text-ash font-light leading-relaxed">
            Direct access to Surat’s primary wholesale textile hub and our upcoming Ahmedabad branch.
            Schedule an in-person desk appointment or connect with our trading desk officers on WhatsApp.
          </p>
        </div>

        {/* 30-Day Ahmedabad Countdown Banner */}
        <AhmedabadCountdown />

        {/* Office Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Surat Headquarters */}
          <div className="p-8 sm:p-10 bg-selvedge border border-hairline rounded-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-[10px] text-marigold tracking-widest uppercase border border-kumkum/40 bg-warp px-2.5 py-1 rounded-xs">
                  HEADQUARTERS &amp; LOOM QC FLOOR
                </span>
                <span className="text-ash">EST. 2010</span>
              </div>
              <h2 className="font-display text-3xl text-khadi font-light">Surat Office &amp; Trading Floor</h2>
              <p className="text-xs text-ash font-light leading-relaxed">
                Operating directly from the historic Surat Textile Market on Ring Road. Handling loom allocation,
                fabric batch inspection, mill price negotiations, and 13-city consolidated cargo dispatch.
              </p>

              <div className="space-y-3 font-mono text-xs text-ash pt-2">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-marigold shrink-0 mt-0.5" />
                  <span>1st Floor, Surat Textile Market, Ring Road, Surat, Gujarat 395002</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-marigold shrink-0" />
                  <span>Mon – Sat: 10:00 AM – 8:30 PM (IST)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-marigold shrink-0" />
                  <a href="tel:+919825144001" className="text-khadi hover:text-haldi">+91 98251 44001 / +91 98251 44002</a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-marigold shrink-0" />
                  <a href="mailto:desk@maasheetla.com" className="text-khadi hover:text-haldi">desk@maasheetla.com</a>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-hairline flex items-center justify-between">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs tracking-wider uppercase text-marigold hover:text-haldi transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Message Surat Desk</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Card 2: Ahmedabad Expansion */}
          <div className="p-8 sm:p-10 bg-selvedge border border-marigold/40 rounded-sm space-y-6 flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-[10px] text-haldi tracking-widest uppercase border border-marigold/60 bg-warp px-2.5 py-1 rounded-xs">
                  NEW BRANCH · LAUNCHING IN 30 DAYS
                </span>
                <span className="text-marigold font-mono text-[10.5px]">OCT 2026</span>
              </div>
              <h2 className="font-display text-3xl text-khadi font-light">Ahmedabad Trade Office</h2>
              <p className="text-xs text-ash font-light leading-relaxed">
                Dedicated regional wholesale counter for North Gujarat, Saurashtra, and Rajasthan buyers.
                Equipped with live seasonal sample swatches, designer lookbooks, and express booking lines.
              </p>

              <div className="space-y-3 font-mono text-xs text-ash pt-2">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-marigold shrink-0 mt-0.5" />
                  <span>Commercial Complex, Sindhu Bhavan Road / Relief Road, Ahmedabad, Gujarat 380001</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-marigold shrink-0" />
                  <span>Inauguration: 30-Day Countdown Active</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-marigold shrink-0" />
                  <a href="tel:+919825144001" className="text-khadi hover:text-haldi">+91 98251 44001 (Surat Line)</a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-marigold shrink-0" />
                  <a href="mailto:ahmedabad@maasheetla.com" className="text-khadi hover:text-haldi">ahmedabad@maasheetla.com</a>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-hairline flex items-center justify-between">
              <a
                href={ahmedabadWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs tracking-wider uppercase text-haldi hover:text-khadi transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-marigold" />
                <span>Pre-Book Ahmedabad Meeting</span>
                <ArrowUpRight className="w-4 h-4 text-marigold" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

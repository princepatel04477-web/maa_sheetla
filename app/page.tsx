"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Factory, ShieldCheck, Truck, Scale } from "lucide-react";
import SplitHero from "../components/SplitHero";
import AhmedabadCountdown from "../components/AhmedabadCountdown";
import LedgerBand from "../components/LedgerBand";
import ReachSection from "../components/ReachSection";
import SpotlightCard from "../components/react-bits/SpotlightCard";
import ThreadsBackground from "../components/react-bits/ThreadsBackground";
import BlurText from "../components/react-bits/BlurText";
import SplitText from "../components/react-bits/SplitText";
import Marquee from "../components/react-bits/Marquee";
import AnimatedContent from "../components/react-bits/AnimatedContent";
import { Picture } from "../components/Picture";
import { createWhatsAppLink } from "../lib/whatsapp";

const AGENCY_SERVICES = [
  {
    icon: Factory,
    title: "1. Loom Sourcing & Mill Allocation",
    tagline: "120+ Verified Surat Mills",
    desc: "We match your showroom's target aesthetic directly with specialized Surat jacquard looms, powerloom units, and master dyehouses, securing authentic mill-floor cost structures.",
  },
  {
    icon: Scale,
    title: "2. Bulk Price & Commission Brokerage",
    tagline: "Zero Multi-Tier Markup",
    desc: "As your authorized trade proxy, we negotiate volume discounts and credit brokerage directly with weavers, eliminating multiple layers of commission middlemen.",
  },
  {
    icon: ShieldCheck,
    title: "3. Piece-by-Piece Floor Inspection",
    tagline: "Rigorous Flaw Screening",
    desc: "Every carton passing through our Surat trading floor undergoes warp tension testing, colorfastness rub audits, and embroidery needlework inspection before shipment.",
  },
  {
    icon: Truck,
    title: "4. Consolidated 48hr Freight Dispatch",
    tagline: "13 Regional Hub Corridors",
    desc: "We consolidate assorted boutique lots into moisture-shielded cartons, scheduling direct 48-hour express rail and road cargo to all primary North and Central India hubs.",
  },
];

const SOURCING_SPECIALTIES = [
  {
    imageKey: "CAT-01",
    title: "Bridal & Heritage Silks",
    focus: "Kanjivaram Tissue · Banarasi Khaddi · Pure Mulberry Silk",
    desk: "Maa Sheetla (Label Desk)",
    desc: "Exclusive seasonal runs and high-margin bridal designs with strict territorial protection for multi-brand boutique counters.",
  },
  {
    imageKey: "CAT-02",
    title: "High-Volume Festive Sarees",
    focus: "Dola Silk · Blooming Georgette · Organza Prints",
    desk: "Sunrise Tex Fab (Volume Desk)",
    desc: "Carton-packed wholesale assortments structured for fast weekend inventory turns and aggressive commercial retail markups.",
  },
  {
    imageKey: "CAT-03",
    title: "Embroidered Suits & Kurtis",
    focus: "Pure Chanderi · 60/60 Cambric · Kashmiri Tilla",
    desk: "Both Agency Desks",
    desc: "Daily-wear and festive unstitched & semi-stitched sets with mill-guaranteed colorfastness and batch repeat consistency.",
  },
  {
    imageKey: "CAT-04",
    title: "Ready-to-Wear Indo-Western",
    focus: "Sharara Sets · Designer Co-ords · Festive Gowns",
    desk: "Both Agency Desks",
    desc: "Ready garment assortments with designer finishing, graded boutique sizing, and direct showroom-ready packaging.",
  },
];

const TICKER_ITEMS = [
  "Direct Surat Mill Rates",
  "13 Major Trade Hubs",
  "Piece-by-Piece Floor Inspection",
  "570+ Verified Boutique Counters",
  "Exclusive Territorial Protections",
  "48-Hour Freight Dispatch",
  "Two Specialist Desks Under One Roof",
];

export default function HomePage() {
  const partnerWaUrl = createWhatsAppLink("opening a wholesale retail counter agency account");

  return (
    <div className="w-full relative bg-warp text-khadi overflow-hidden">
      <ThreadsBackground />

      {/* 1. Split Hero (Signature Two-Firm Entrance) */}
      <SplitHero />

      {/* 30-Day Ahmedabad Office Launch Countdown */}
      <AhmedabadCountdown />

      {/* Infinite Running Trade Ticker */}
      <Marquee items={TICKER_ITEMS} />

      {/* 2. The Ledger Band */}
      <LedgerBand />

      {/* 3. The Reach Map (Signature Map Section) */}
      <ReachSection />

      {/* 4. The 4-Step Agency Workflow */}
      <section id="operations" className="w-full py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-12 bg-selvedge/70 border-t border-hairline relative">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
          <div className="max-w-3xl space-y-3">
            <p className="eyebrow">03 — THE AGENCY OPERATIONS</p>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl text-khadi font-light tracking-tight leading-[0.95]">
              <SplitText text="How we bridge Surat's looms to your showroom floor." />
            </h2>
            <p className="text-xs sm:text-base text-ash font-light leading-relaxed">
              Buying directly from fragmented textile mills is complex and risky. As your on-ground Surat wholesale agency,
              we manage end-to-end procurement, inspection, and logistics with total transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {AGENCY_SERVICES.map((srv, idx) => (
              <AnimatedContent key={srv.title} delay={idx * 0.1} direction="up">
                <div className="p-5 sm:p-7 bg-warp border border-hairline hover:border-marigold/60 transition-all rounded-sm h-full space-y-3.5 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <srv.icon className="w-5 h-5 sm:w-6 sm:h-6 text-marigold" />
                    <span className="font-mono text-[9.5px] sm:text-[10px] text-haldi tracking-widest uppercase block">
                      {srv.tagline}
                    </span>
                    <h3 className="font-display text-lg sm:text-xl text-khadi font-light">{srv.title}</h3>
                    <p className="text-xs text-ash font-light leading-relaxed">{srv.desc}</p>
                  </div>
                </div>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Agency Sourcing Specialties */}
      <section className="w-full py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-12 bg-warp border-t border-hairline relative">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
            <div className="space-y-2.5 max-w-2xl">
              <p className="eyebrow">04 — TEXTILE SOURCING DISCIPLINES</p>
              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl text-khadi font-light tracking-tight leading-[0.95]">
                Surat categories managed by <i className="italic text-haldi">our trading floor.</i>
              </h2>
            </div>
            <Link
              href="/partner"
              className="inline-flex items-center gap-1.5 font-mono text-xs tracking-widest uppercase text-marigold hover:text-haldi transition-colors py-1"
            >
              Request Trade Sourcing Rates <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {SOURCING_SPECIALTIES.map((spec, idx) => (
              <SpotlightCard key={spec.title} className="p-6 sm:p-8 border-hairline hover:border-marigold/60 rounded-sm bg-selvedge space-y-4 flex flex-col justify-between">
                <div className="space-y-3.5">
                  <div className="card-media card-media--category w-full rounded-xs overflow-hidden mb-3">
                    <Picture
                      imageKey={spec.imageKey}
                      sizes="(max-width: 768px) 92vw, 45vw"
                      className="w-full h-full"
                      imgClassName="hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-marigold font-display text-2xl font-light">0{idx + 1}</span>
                    <span className="text-haldi text-[9.5px] sm:text-[10px] border border-hairline px-2.5 py-0.5 bg-warp uppercase">
                      {spec.desk}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl text-khadi font-light">{spec.title}</h3>
                    <p className="font-mono text-[10.5px] sm:text-[11px] text-ash mt-1">{spec.focus}</p>
                  </div>
                  <p className="text-xs text-ash font-light leading-relaxed">{spec.desc}</p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Partner Conversion Banner */}
      <section className="w-full py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-12 bg-gradient-to-b from-selvedge to-warp border-t border-hairline relative">
        <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8">
          <p className="eyebrow text-marigold">05 — WHOLESALE TRADE QUERY</p>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-7xl text-khadi font-light tracking-tight leading-[0.94]">
            <BlurText text="Open a direct agency account with our Surat floor." />
          </h2>
          <p className="text-xs sm:text-base text-ash font-light max-w-2xl mx-auto leading-relaxed">
            Gain immediate access to verified Surat powerloom rate cards, priority wedding season dispatches,
            and exclusive territorial design protections.
          </p>

          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5">
            <a
              href={partnerWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-kumkum hover:bg-kumkum-deep text-white font-mono text-xs tracking-[0.18em] uppercase rounded-xs transition-all shadow-agency-card min-h-[44px]"
            >
              WhatsApp Agency Desk <ArrowUpRight className="w-4 h-4" />
            </a>
            <Link
              href="/partner"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-warp hover:bg-selvedge border border-hairline text-khadi hover:text-haldi font-mono text-xs tracking-[0.18em] uppercase rounded-xs transition-all min-h-[44px]"
            >
              Trade Query Form →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

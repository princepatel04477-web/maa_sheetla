"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Factory, ShieldCheck, Truck, Scale, History, Handshake, CheckCircle2, Award, MapPin, ChevronRight, ChevronLeft, Sparkles, Building2 } from "lucide-react";
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
    title: "4. Consolidated 48hr Direct Dispatch",
    tagline: "70+ Connected City Corridors",
    desc: "We consolidate assorted buyer lots into moisture-shielded cartons, scheduling direct 48-hour express rail and road cargo across 70+ cities in North and Central India.",
  },
];

const SOURCING_SPECIALTIES = [
  {
    imageKey: "CAT-01",
    title: "Bridal & Heritage Silks",
    focus: "Kanjivaram Tissue · Banarasi Khaddi · Pure Mulberry Silk",
    desk: "Maa Sheetla (Label Desk)",
    desc: "Exclusive seasonal runs and high-margin bridal designs with strict territorial protection for multi-brand retail showrooms.",
  },
  {
    imageKey: "CAT-02",
    title: "High-Volume Festive Sarees",
    focus: "Dola Silk · Blooming Georgette · Organza Prints",
    desk: "Sunrise Fab Tex Adat (Volume Desk)",
    desc: "Carton-packed wholesale assortments structured for fast weekend inventory turns and aggressive commercial retail markups.",
  },
  {
    imageKey: "CAT-03",
    title: "Embroidered Suits & Dress Materials",
    focus: "Pure Chanderi · 60/60 Cambric · Kashmiri Tilla",
    desk: "Both Agency Desks",
    desc: "Daily-wear and festive unstitched & semi-stitched sets with mill-guaranteed colorfastness and batch repeat consistency.",
  },
  {
    imageKey: "ST-3305",
    title: "Ahmedabad Readymade Garments & Kurtis",
    focus: "Pure Cotton 60/60 · Designer Kurti Sets · 2-pc & 3-pc Co-ords",
    desk: "Ahmedabad Trade Floor",
    desc: "Direct-from-manufacturing Ahmedabad readymade garments, designer cotton kurtis, daily tunics, and coordinated festive sets.",
  },
  {
    imageKey: "MS-9904",
    title: "Bridal & Sangeet Lehengas",
    focus: "Micro 9000 Velvet · Raw Silk · Dabka & Mirror Work",
    desk: "Maa Sheetla (Label Desk)",
    desc: "Showroom-defining bridal couture, heavy cancan 16-kali flares, and bridesmaid collections for multi-designer counters.",
  },
  {
    imageKey: "CAT-04",
    title: "Ready-to-Wear Indo-Western & Fusion",
    focus: "Sharara Sets · Designer Capes · Festive Gowns",
    desk: "Both Agency Desks",
    desc: "Contemporary silhouettes with artisanal hand-needlework and showroom-ready hanger packaging for cocktail & sangeet racks.",
  },
  {
    imageKey: "ST-4420",
    title: "Daily & Workwear Printed Sarees",
    focus: "Bandhani · Leheriya · Digital Georgette · Weightless Silk",
    desk: "Sunrise Fab Tex Adat (Volume Desk)",
    desc: "High-frequency retail turnover prints and daily-wear collections with guaranteed mill lots and rapid weekly restocking.",
  },
  {
    imageKey: "MS-8815",
    title: "Handcrafted Dupattas & Stoles",
    focus: "Banarasi Katan · Tissue Organza · Handloom Phulkari",
    desk: "Both Agency Desks",
    desc: "Value-add heritage dupattas and statement stoles in artisan weaves designed to elevate boutique counter margins.",
  },
];

const JOURNEY_MILESTONES = [
  {
    year: "2008",
    hindiStage: "Agency Founded",
    era: "The Inception",
    tagline: "First Brokerage Ledger Opened",
    location: "Brokerage Desk · Regional Markets",
    title: "Agency Foundation & Trade Inception",
    desc: "Founded by Manish Kanodia with a dedicated mission: transparent commission brokerage, ethical mill mediation, and dependable zero-bad-debt guarantees for wholesale cloth merchants.",
    impact: "Established direct transparent agency representation with zero hidden markups.",
    focus: "Saree Brokerage & Wholesale Mediation",
  },
  {
    year: "2009",
    hindiStage: "Kanpur Office",
    era: "The Regional Anchor",
    tagline: "Brick-and-Mortar Office Acquired",
    location: "50/274 Shiv Market, Naughara, Kanpur",
    title: "Acquiring Kanpur Regional Office",
    desc: "Acquired our permanent regional foothold at 50/274 Shiv Market, Naughara in Kanpur — establishing a dedicated physical liaison desk in Uttar Pradesh's historic textile bazaar.",
    impact: "Physical trade liaison offering daily sample inspections and counter mediation.",
    focus: "North India Wholesale Network & Sample Approvals",
  },
  {
    year: "2010",
    hindiStage: "Surat Expansion",
    era: "The Textile Epicenter",
    tagline: "Boots on Surat Weaving Floors",
    location: "Textile Market Belt, Ring Road, Surat",
    title: "Entering India's Textile Capital, Surat",
    desc: "Stepped onto the powerhouse trading floor of Surat, Gujarat — connecting regional buyers directly to master weavers, powerloom complexes, and specialized dyehouses.",
    impact: "Direct access to 300+ primary weaving looms with immediate mill dispatch access.",
    focus: "On-Loom Sourcing & Powerloom Rate Cards",
  },
  {
    year: "2016",
    hindiStage: "Surat Headquarters",
    era: "The Citadel",
    tagline: "H-32 India Market Flagship Acquired",
    location: "H-32 India Market, Salabatpura, Surat",
    title: "Permanent Surat Headquarters Acquired",
    desc: "Acquired our permanent flagship headquarters at H-32 India Market, Salabatpura, Ring Road — establishing our centralized trading floor, illuminated QC inspection desks, and direct dispatch facility.",
    impact: "Full in-house piece-by-piece QC inspection floor with 48-hour freight dispatch.",
    focus: "Centralized Quality Audits & Volume Carton Warehousing",
  },
  {
    year: "2026",
    hindiStage: "Ahmedabad Hub",
    era: "The Tri-City Expansion",
    tagline: "New Cloth Market Floor Launch",
    location: "New Cloth Market, Sarangpur, Ahmedabad",
    title: "Expanding to India's Garment Capital",
    desc: "Inaugurating our 3rd major trading center at New Cloth Market, Sarangpur, Ahmedabad — bringing direct mill pricing in readymade garments, pure cotton fabrics, and designer kurti sets.",
    impact: "Seamless unified sourcing linking Surat weaves with Ahmedabad readymade garments.",
    focus: "Pure 60/60 Cotton Kurtis & Stitched Festive Apparel",
  },
];

const PARTNER_PILLARS = [
  {
    number: "700+",
    label: "Partner Weaving Mills & Processing Units",
    subtext: "Surat · Ahmedabad · Varanasi · Jaipur · Delhi",
  },
  {
    number: "500+",
    label: "Verified Retail Showrooms & Boutiques",
    subtext: "Tier-1 & Tier-2 Multi-Designer Counters",
  },
  {
    number: "18+",
    label: "Years of Continuous Wholesale Standing",
    subtext: "Established 2008 with Transparent Brokerage",
  },
  {
    number: "70+",
    label: "Connected Rail & Road Freight Hubs",
    subtext: "Express 48-Hr Consolidated Dispatches",
  },
];

const TICKER_ITEMS = [
  "Direct Surat Mill Rates",
  "700+ Suppliers Around India",
  "500+ Verified Buyers",
  "70+ Trade Cities Across India",
  "Piece-by-Piece Floor Inspection",
  "Exclusive Territorial Protections",
  "48-Hour Direct Dispatch",
  "Two Specialist Desks Under One Roof",
];

export default function HomePage() {
  const [activeMilestone, setActiveMilestone] = useState(0);
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
      <section id="operations" className="w-full py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-12 bg-selvedge-light border-t border-hairline relative content-auto">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
          <div className="max-w-3xl space-y-3">
            <p className="eyebrow text-kumkum">03 — THE AGENCY OPERATIONS</p>
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
                <div className="p-5 sm:p-7 bg-selvedge border border-hairline hover:border-marigold/60 transition-all rounded-sm h-full space-y-3.5 flex flex-col justify-between shadow-2xs hover:shadow-xs">
                  <div className="space-y-2.5">
                    <srv.icon className="w-5 h-5 sm:w-6 sm:h-6 text-marigold" />
                    <span className="font-mono text-[9.5px] sm:text-[10px] text-marigold tracking-widest uppercase block font-medium">
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
      <section className="w-full py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-12 bg-warp border-t border-hairline relative content-auto">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
            <div className="space-y-2.5 max-w-2xl">
              <p className="eyebrow text-kumkum">04 — TEXTILE SOURCING DISCIPLINES</p>
              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl text-khadi font-light tracking-tight leading-[0.95]">
                Categories managed by <i className="italic text-marigold">our trading floor.</i>
              </h2>
            </div>
            <Link
              href="/partner"
              className="inline-flex items-center gap-1.5 font-mono text-xs tracking-widest uppercase text-marigold hover:text-kumkum transition-colors py-1 font-medium"
            >
              Request Trade Sourcing Rates <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {SOURCING_SPECIALTIES.map((spec, idx) => (
              <SpotlightCard key={spec.title} className="p-6 sm:p-8 border-hairline hover:border-marigold/60 rounded-sm bg-selvedge space-y-4 flex flex-col justify-between shadow-2xs hover:shadow-xs">
                <div className="space-y-3.5">
                  <div className="card-media card-media--category w-full rounded-xs overflow-hidden mb-3">
                    <Picture
                      imageKey={spec.imageKey}
                      sizes="(max-width: 768px) 92vw, 45vw"
                      className="w-full h-full"
                      imgClassName="hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                  <div className="flex items-center font-mono text-xs">
                    <span className="text-marigold font-display text-2xl font-light">0{idx + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl text-khadi font-light">{spec.title}</h3>
                    <p className="font-mono text-[10.5px] sm:text-[11px] text-ash mt-1 font-medium">{spec.focus}</p>
                  </div>
                  <p className="text-xs text-ash font-light leading-relaxed">{spec.desc}</p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Our Story & Wholesale Partner Network (About Section) */}
      <section id="about" className="scroll-mt-20 w-full py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-12 bg-selvedge-light border-t border-hairline relative content-auto">
        <div id="journey" className="relative -top-24" />
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
            <div className="space-y-2.5 max-w-2xl">
              <p className="eyebrow text-kumkum">05 — ABOUT OUR STORY &amp; HERITAGE</p>
              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl text-khadi font-light tracking-tight leading-[0.95]">
                Eighteen years of <i className="italic text-marigold">textile trust.</i>
              </h2>
              <p className="text-xs sm:text-base text-ash font-light leading-relaxed">
                From starting our agency operations in 2008 to physical trading floors across Kanpur, Surat, and Ahmedabad — here is how 18 years of wholesale integrity built India&apos;s most trusted trade proxy.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 font-mono text-xs tracking-widest uppercase text-marigold hover:text-kumkum transition-colors py-1 font-medium border-b border-marigold/30 hover:border-kumkum"
              >
                <span>Read Full Story Page (2008–2026)</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* INNOVATIVE FEATURE: Interactive Chronological Loom Nav */}
          <div className="space-y-4">
            <div className="flex items-center justify-between font-mono text-[10.5px] uppercase tracking-widest text-ash pb-2 border-b border-hairline">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-marigold" />
                <span>Interactive Timeline Loom · Select an Era</span>
              </div>
              <span className="text-marigold font-medium">
                Chapter 0{activeMilestone + 1} of 05
              </span>
            </div>

            {/* Stepper Rail with Golden Connecting Thread */}
            <div className="relative">
              {/* Background Connecting Line */}
              <div className="hidden lg:block absolute top-1/2 left-6 right-6 h-[1px] bg-gradient-to-r from-marigold/20 via-marigold/60 to-kumkum/40 -translate-y-1/2 z-0" />

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 relative z-10">
                {JOURNEY_MILESTONES.map((m, idx) => {
                  const isActive = activeMilestone === idx;
                  return (
                    <button
                      type="button"
                      key={m.year}
                      onClick={() => setActiveMilestone(idx)}
                      className={`text-left p-3.5 sm:p-4 rounded-xs border transition-all duration-300 relative group min-h-[72px] flex flex-col justify-between ${
                        isActive
                          ? "bg-selvedge border-marigold shadow-md scale-[1.02] ring-1 ring-marigold/50"
                          : "bg-warp/70 border-hairline/80 hover:border-marigold/40 hover:bg-selvedge/50 text-ash"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span
                          className={`font-mono text-xs font-bold tracking-wider px-2 py-0.5 rounded-2xs border ${
                            isActive
                              ? "text-marigold border-marigold/40 bg-warp"
                              : "text-ash border-hairline/60 bg-warp/50"
                          }`}
                        >
                          {m.year}
                        </span>
                        <span
                          className={`w-2 h-2 rounded-full transition-all ${
                            isActive
                              ? "bg-kumkum ring-4 ring-kumkum/20 scale-125 animate-pulse"
                              : "bg-hairline group-hover:bg-marigold/50"
                          }`}
                        />
                      </div>
                      <div className="mt-2 space-y-0.5">
                        <span
                          className={`font-display text-sm sm:text-[15px] block leading-tight transition-colors ${
                            isActive ? "text-khadi font-medium" : "text-ash group-hover:text-khadi"
                          }`}
                        >
                          {m.hindiStage}
                        </span>
                        <span className="text-[10px] font-mono text-ash/80 block line-clamp-1">
                          {m.era}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ACTIVE STAGE SPOTLIGHT CONSOLE */}
          {(() => {
            const cur = JOURNEY_MILESTONES[activeMilestone];
            return (
              <div className="p-6 sm:p-10 lg:p-12 bg-gradient-to-br from-selvedge via-selvedge/95 to-warp border border-marigold/40 rounded-sm shadow-agency-card relative overflow-hidden transition-all duration-500">
                <div className="absolute top-0 right-0 w-96 h-96 bg-marigold/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-kumkum/10 rounded-full blur-3xl pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10 items-center">
                  {/* Left: Big Year & Story Details */}
                  <div className="lg:col-span-8 space-y-5">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <span className="font-display text-4xl sm:text-6xl lg:text-7xl font-light text-marigold tracking-tight leading-none drop-shadow-2xs">
                        {cur.year}
                      </span>
                      <div className="h-8 sm:h-12 w-[1px] bg-hairline/80 mx-1 hidden sm:block" />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[9.5px] uppercase tracking-widest text-kumkum bg-kumkum/10 px-2 py-0.5 border border-kumkum/20 rounded-2xs font-semibold">
                            {cur.hindiStage}
                          </span>
                          <span className="text-[10px] font-mono text-ash">· {cur.era}</span>
                        </div>
                        <div className="flex items-center gap-1.5 font-mono text-[11px] text-khadi/80">
                          <MapPin className="w-3.5 h-3.5 text-marigold shrink-0" />
                          <span>{cur.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-khadi font-light leading-tight">
                        {cur.title}
                      </h3>
                      <p className="text-sm sm:text-base text-ash font-light leading-relaxed max-w-3xl">
                        {cur.desc}
                      </p>
                    </div>

                    {/* Trade Breakthrough & Focus Specs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono text-xs">
                      <div className="p-3 bg-warp/80 border border-hairline rounded-xs space-y-1">
                        <span className="text-[10px] text-marigold uppercase tracking-wider block font-semibold">
                          ✦ Wholesale Breakthrough
                        </span>
                        <p className="text-khadi text-[11.5px] leading-relaxed">
                          {cur.impact}
                        </p>
                      </div>
                      <div className="p-3 bg-warp/80 border border-hairline rounded-xs space-y-1">
                        <span className="text-[10px] text-kumkum uppercase tracking-wider block font-semibold">
                          ✦ Counter Focus
                        </span>
                        <p className="text-khadi text-[11.5px] leading-relaxed">
                          {cur.focus}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right: Stage Controls & Navigation */}
                  <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-6 p-5 sm:p-6 bg-warp/90 border border-hairline rounded-xs">
                    <div className="space-y-3">
                      <span className="font-mono text-[10px] tracking-widest uppercase text-ash block">
                        Milestone Navigation
                      </span>
                      <p className="font-display text-lg text-khadi font-light italic">
                        &ldquo;{cur.tagline}&rdquo;
                      </p>
                      <p className="text-xs text-ash/90 leading-relaxed font-light">
                        Every chapter since 2008 has been built on honoring commitments between regional retail buyers and primary weaving mills.
                      </p>
                    </div>

                    <div className="space-y-3 pt-2 border-t border-hairline">
                      <div className="flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => setActiveMilestone((prev) => (prev > 0 ? prev - 1 : JOURNEY_MILESTONES.length - 1))}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-selvedge hover:bg-selvedge-light border border-hairline text-khadi hover:text-marigold font-mono text-xs tracking-wider uppercase rounded-xs transition-colors min-h-[40px]"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                          <span>Previous Era</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveMilestone((prev) => (prev < JOURNEY_MILESTONES.length - 1 ? prev + 1 : 0))}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-kumkum hover:bg-kumkum-deep text-white font-mono text-xs tracking-wider uppercase rounded-xs transition-colors min-h-[40px]"
                        >
                          <span>Next Era</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <Link
                        href="/about"
                        className="w-full inline-flex items-center justify-center gap-2 py-2 text-center text-xs font-mono text-marigold hover:underline tracking-wider uppercase"
                      >
                        <span>Explore Full Timeline Story →</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* THE FOUNDER'S CHAPTER CARD (2008–2026 Tri-City Network) */}
          <div className="p-6 sm:p-8 lg:p-10 bg-selvedge border border-hairline rounded-sm space-y-6 shadow-2xs relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-marigold/5 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-3 relative z-10">
              <div className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px] text-marigold uppercase tracking-widest font-semibold">
                <History className="w-3.5 h-3.5" />
                <span>The Founder&apos;s Chapter · 2008 to 2026</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-khadi font-light leading-tight">
                From Agency Inception in 2008 to a Tri-City Textile Network
              </h3>
              <p className="text-xs sm:text-sm text-ash font-light leading-relaxed max-w-4xl">
                Founded by <strong className="text-khadi font-medium">Manish Kanodia</strong>, our agency was born from a fundamental principle: transparent commission brokerage that protects both the weaving loom and the showroom merchant. In <strong className="text-khadi font-medium">2008</strong>, we took our first steps in agency brokerage. By <strong className="text-khadi font-medium">2009</strong>, we acquired our first dedicated regional office in Kanpur&apos;s historic Shiv Market. In <strong className="text-khadi font-medium">2010</strong>, we moved our boots onto Surat&apos;s weaving floors, and by <strong className="text-khadi font-medium">2016</strong>, established our permanent headquarters at H-32 India Market. Now in <strong className="text-khadi font-medium">2026</strong>, we open our third trade floor at New Cloth Market, Ahmedabad.
              </p>
            </div>

            {/* Quick Flow Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-2 border-t border-hairline/80 relative z-10">
              <button
                type="button"
                onClick={() => setActiveMilestone(0)}
                className={`p-3 text-left border rounded-2xs space-y-1 transition-all ${
                  activeMilestone === 0
                    ? "bg-selvedge border-marigold shadow-xs"
                    : "bg-warp/80 border-hairline/60 hover:border-marigold/40"
                }`}
              >
                <span className="font-mono text-[10px] text-marigold font-semibold block">2008</span>
                <span className="font-display text-sm text-khadi block leading-snug">Agency Founded</span>
                <span className="text-[10px] text-ash block">Brokerage Inception</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveMilestone(1)}
                className={`p-3 text-left border rounded-2xs space-y-1 transition-all ${
                  activeMilestone === 1
                    ? "bg-selvedge border-marigold shadow-xs"
                    : "bg-warp/80 border-hairline/60 hover:border-marigold/40"
                }`}
              >
                <span className="font-mono text-[10px] text-marigold font-semibold block">2009</span>
                <span className="font-display text-sm text-khadi block leading-snug">Kanpur Office</span>
                <span className="text-[10px] text-ash block">Shiv Market Acquired</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveMilestone(2)}
                className={`p-3 text-left border rounded-2xs space-y-1 transition-all ${
                  activeMilestone === 2
                    ? "bg-selvedge border-marigold shadow-xs"
                    : "bg-warp/80 border-hairline/60 hover:border-marigold/40"
                }`}
              >
                <span className="font-mono text-[10px] text-marigold font-semibold block">2010</span>
                <span className="font-display text-sm text-khadi block leading-snug">Surat Expansion</span>
                <span className="text-[10px] text-ash block">Entered Textile Capital</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveMilestone(3)}
                className={`p-3 text-left border rounded-2xs space-y-1 transition-all ${
                  activeMilestone === 3
                    ? "bg-selvedge border-marigold shadow-xs"
                    : "bg-warp/80 border-hairline/60 hover:border-marigold/40"
                }`}
              >
                <span className="font-mono text-[10px] text-marigold font-semibold block">2016</span>
                <span className="font-display text-sm text-khadi block leading-snug">Surat Headquarters</span>
                <span className="text-[10px] text-ash block">H-32 India Market HQ</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveMilestone(4)}
                className={`p-3 text-left border rounded-2xs space-y-1 col-span-2 sm:col-span-1 transition-all ${
                  activeMilestone === 4
                    ? "bg-selvedge border-kumkum shadow-xs"
                    : "bg-warp/80 border-hairline/60 hover:border-kumkum/40"
                }`}
              >
                <span className="font-mono text-[10px] text-kumkum font-semibold block">2026</span>
                <span className="font-display text-sm text-khadi block leading-snug">Ahmedabad Hub</span>
                <span className="text-[10px] text-ash block">New Cloth Market Floor</span>
              </button>
            </div>
          </div>

          {/* 4 Partner Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {PARTNER_PILLARS.map((p) => (
              <div
                key={p.label}
                className="p-5 sm:p-6 bg-selvedge border border-hairline hover:border-marigold/50 rounded-sm space-y-2 transition-all shadow-2xs"
              >
                <span className="font-display text-3xl sm:text-4xl lg:text-5xl text-haldi font-light block">
                  {p.number}
                </span>
                <h4 className="font-mono text-xs sm:text-[13px] text-khadi font-medium leading-snug">
                  {p.label}
                </h4>
                <p className="font-mono text-[10px] sm:text-[11px] text-ash">
                  {p.subtext}
                </p>
              </div>
            ))}
          </div>

          {/* Detailed Five Milestones Grid */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between pb-2 border-b border-hairline">
              <div className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-widest text-ash">
                <History className="w-4 h-4 text-marigold" />
                <span>Five Historic Milestones (2008 – 2026)</span>
              </div>
              <span className="font-mono text-[10px] text-marigold uppercase tracking-wider hidden sm:inline-block font-medium">
                18-Year Legacy · Kanpur · Surat · Ahmedabad
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {JOURNEY_MILESTONES.map((m, idx) => {
                const isSelected = activeMilestone === idx;
                return (
                  <button
                    type="button"
                    key={m.year}
                    onClick={() => setActiveMilestone(idx)}
                    className={`p-5 text-left border rounded-xs space-y-3 flex flex-col justify-between relative group transition-all duration-300 ${
                      isSelected
                        ? "bg-selvedge border-marigold shadow-agency-card ring-1 ring-marigold/40 scale-[1.01]"
                        : "bg-selvedge/80 border-hairline hover:border-marigold/40 hover:bg-selvedge shadow-2xs"
                    }`}
                  >
                    <div className="space-y-2.5 w-full">
                      <div className="flex items-center justify-between">
                        <span
                          className={`font-mono text-xs font-semibold tracking-wider px-2.5 py-0.5 border rounded-2xs ${
                            isSelected
                              ? "text-marigold bg-warp border-marigold/50"
                              : "text-ash bg-warp border-hairline/60 group-hover:text-marigold"
                          }`}
                        >
                          {m.year}
                        </span>
                        <span className="text-[10px] font-mono text-ash/60">0{idx + 1}</span>
                      </div>
                      <span className="inline-block text-[10px] font-mono text-kumkum font-semibold tracking-wide uppercase">
                        {m.hindiStage}
                      </span>
                      <h4 className="font-display text-base sm:text-lg text-khadi font-light leading-snug">
                        {m.title}
                      </h4>
                      <p className="text-xs text-ash font-light leading-relaxed line-clamp-3">
                        {m.desc}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-hairline/60 w-full flex items-center justify-between font-mono text-[9.5px]">
                      <span className="text-ash/70">{m.era}</span>
                      <span className={`font-medium ${isSelected ? "text-marigold" : "text-ash/50 group-hover:text-marigold"}`}>
                        {isSelected ? "Active View" : "Click to View →"}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Partner Conversion Banner */}
      <section className="w-full py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-12 bg-gradient-to-b from-selvedge to-selvedge-light border-t border-hairline relative content-auto">
        <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8">
          <p className="eyebrow text-kumkum">06 — WHOLESALE TRADE QUERY</p>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-7xl text-khadi font-light tracking-tight leading-[0.94]">
            <BlurText text="Open a direct agency account with our Surat floor." />
          </h2>
          <p className="text-xs sm:text-base text-ash font-light max-w-2xl mx-auto leading-relaxed">
            Gain immediate access to verified Surat powerloom rate cards, priority wedding season dispatches,
            and exclusive territorial design protections.
          </p>

          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5">
            <Link
              href="/partner"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-kumkum hover:bg-kumkum-deep text-white font-mono text-xs tracking-[0.18em] uppercase rounded-xs transition-all shadow-xs min-h-[44px]"
            >
              Trade Query Form →
            </Link>
            <a
              href={partnerWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-selvedge hover:bg-selvedge-light border border-hairline text-khadi hover:text-marigold font-mono text-xs tracking-[0.18em] uppercase rounded-xs transition-all min-h-[44px] shadow-2xs"
            >
              WhatsApp Agency Desk <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

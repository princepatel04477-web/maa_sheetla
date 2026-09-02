"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowUpRight, 
  Sparkles, 
  MessageCircle, 
  CheckCircle2, 
  ShieldCheck, 
  Factory, 
  Truck, 
  Scale, 
  MapPin, 
  Clock, 
  Phone, 
  History, 
  Building2,
  TrendingUp,
  Package,
  Layers
} from "lucide-react";
import ThreadsBackground from "../../components/react-bits/ThreadsBackground";
import BlurText from "../../components/react-bits/BlurText";
import ShinyText from "../../components/react-bits/ShinyText";
import SpotlightCard from "../../components/react-bits/SpotlightCard";
import Marquee from "../../components/react-bits/Marquee";
import ProductCard from "../../components/ProductCard";
import { Picture } from "../../components/Picture";
import { getProductsByFirm } from "../../lib/products";
import { createWhatsAppLink, OFFICE_NUMBERS } from "../../lib/whatsapp";

const SUNRISE_CATEGORIES = [
  {
    imageKey: "CAT-02",
    title: "High-Volume Festive Sarees",
    focus: "Dola Silk · Blooming Georgette · Organza Foil Prints",
    desc: "Vibrant festive prints with woven contrast zari borders, engineered specifically for high weekly turnover on retail counters.",
  },
  {
    imageKey: "ST-3305",
    title: "Ahmedabad Readymade Garments & Kurtis",
    focus: "Pure Cotton 60/60 · Designer Kurti Sets · 2-pc & 3-pc Co-ords",
    desc: "Direct regional manufacturing from Ahmedabad featuring breathable cotton fabrics, fine hand-block motifs, and ready-to-wear sizing.",
  },
  {
    imageKey: "ST-4420",
    title: "Daily & Festive Printed Sarees",
    focus: "Bandhani · Leheriya · Digital Georgette · Weightless Silk",
    desc: "Aggressively priced volume saree lots with zero color-bleeding guarantees and high retail markups.",
  },
  {
    imageKey: "ST-5510",
    title: "Cambric Cotton & Daily Suits",
    focus: "60/60 Pure Cambric · Lucknowi Chikankari · Malmal Dupattas",
    desc: "Fast-selling unstitched summer cotton dress materials packaged in assorted carton assortments.",
  },
  {
    imageKey: "CAT-04",
    title: "Fast-Fashion Co-ord Sets & Fusion",
    focus: "Viscose Silk Blends · Graded Colorways · Pre-Stitched",
    desc: "High-demand casual and festive sets designed for youthful boutique footfalls and quick online store reorders.",
  },
];

const SUNRISE_OPERATIONS = [
  {
    icon: Factory,
    title: "1. High-Speed Loom Allocation",
    tagline: "Rotary & Powerloom Mills",
    desc: "We connect your retail chain directly with Surat high-output rotary printing mills and waterjet weaving units for bulk volume pricing.",
  },
  {
    icon: Scale,
    title: "2. Bulk Commercial Brokerage",
    tagline: "Aggressive Quantity Discounts",
    desc: "Transparent mill-floor pricing with maximum volume discounts passed directly to your counters. Zero layered middleman markups.",
  },
  {
    icon: ShieldCheck,
    title: "3. Fast Batch Flaw Audit",
    tagline: "Consistent Dye Lot Testing",
    desc: "Every carton batch is audited for colorfastness, print alignment, and uniform fabric weight before seal packing.",
  },
  {
    icon: Truck,
    title: "4. Rapid 24–48 Hr Dispatches",
    tagline: "Heavy-Duty Carton Cargo",
    desc: "Carton lots (8–12 pcs per design box) are dispatched via priority express cargo lines to UP, Bihar, MP, Punjab, and NCR.",
  },
];

const SUNRISE_MILESTONES = [
  {
    year: "2008",
    title: "Agency Brokerage Inception",
    desc: "Established by Manish Kanodia as an independent textile commission agency founded on transparent pricing and mill integrity.",
  },
  {
    year: "2009",
    title: "Kanpur Distribution Desk",
    desc: "Acquired regional office at 50/274 Shiv Market, Naughara, Kanpur to expedite regional buyer transit and direct sample review.",
  },
  {
    year: "2010",
    title: "Surat Trading Floor Arrival",
    desc: "Stepped directly onto Surat's rotary print and weaving floors to secure bulk manufacturer volume discounts.",
  },
  {
    year: "2016",
    title: "Surat Head Office Acquired",
    desc: "Acquired permanent flagship floor at H-32 India Market, Salabatpura with high-speed carton packing and 48-hr cargo.",
  },
  {
    year: "2026",
    title: "Ahmedabad Readymade Hub",
    desc: "Opened dedicated Ahmedabad trade floor at New Cloth Market focused on pure cotton garments, kurtis, and co-ords.",
  },
];

const SUNRISE_TICKER = [
  "Sunrise Fab Tex Pvt Ltd · High-Velocity Wholesale",
  "Dola Silk Festive Sarees",
  "Ahmedabad 60/60 Cotton Kurtis & Sets",
  "Blooming Georgette Floral Prints",
  "8–12 Pcs Carton Lot Packaging",
  "Surat HQ · Kanpur Hub · Ahmedabad Floor",
  "Aggressive Commercial Retail Markups",
];

export default function SunriseFabTexPage() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const products = getProductsByFirm("Sunrise Fab Tex");

  const filteredProducts = activeTab === "all"
    ? products
    : products.filter((p) => p.type === activeTab);

  const waUrl = createWhatsAppLink("enquiring about Sunrise Fab Tex commercial volume rate cards and carton lots", {
    firm: "Sunrise Fab Tex",
    targetNumber: OFFICE_NUMBERS.surat,
  });

  return (
    <div className="w-full relative bg-warp text-khadi overflow-hidden min-h-screen">
      <ThreadsBackground />

      {/* Sibling Firm Context Banner */}
      <div className="pt-20 sm:pt-24 w-full bg-selvedge border-b border-hairline relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono">
          <div className="flex items-center gap-2 text-ash">
            <span className="w-2 h-2 rounded-full bg-marigold shrink-0" />
            <span className="text-khadi font-medium">Sunrise Fab Tex</span>
            <span>— Commercial Volume &amp; Fast-Turnover Desk</span>
          </div>
          <Link
            href="/maa-sheetla"
            className="inline-flex items-center gap-1.5 text-marigold hover:text-haldi transition-colors font-medium"
          >
            <span>Looking for Marquee Bridal Lehengas &amp; Silks? Visit Maa Sheetla Agency</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative w-full py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-12 border-b border-hairline overflow-hidden bg-gradient-to-b from-warp via-selvedge/50 to-warp">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 font-mono text-[9.5px] sm:text-[10px] tracking-[0.24em] text-marigold uppercase bg-selvedge/90 px-3 py-1.5 border border-marigold/40 rounded-xs">
              <TrendingUp className="w-3.5 h-3.5 text-marigold shrink-0" />
              <span>SUNRISE FAB TEX PVT LTD · VOLUME DESK · SURAT</span>
            </div>

            <div className="h-16 sm:h-22 w-auto flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/sunrise_fab_tex_colored.png"
                alt="Sunrise Fab Tex Official Logo"
                className="h-full w-auto object-contain filter drop-shadow-xs"
              />
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-light text-khadi tracking-tight leading-[0.93]">
              High-velocity commercial sarees, daily suits &amp; <i className="italic text-marigold">Ahmedabad readymade.</i>
            </h1>

            <p className="text-sm sm:text-base text-ash font-light leading-relaxed max-w-2xl">
              Sunrise Fab Tex is the commercial wholesale brokerage engine engineered for high-footfall retail counters,
              regional wholesalers, and multi-state retail chains. We deliver rapid counter turnaround, unbeatable powerloom
              cost efficiencies, and consistent repeat batch delivery.
            </p>

            {/* Key Operating Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 font-mono text-[11px]">
              <div className="p-3 bg-selvedge border border-hairline rounded-xs space-y-1">
                <span className="text-marigold uppercase tracking-wider block text-[9.5px] font-semibold">Packaging Unit</span>
                <p className="text-khadi">Carton Lots (8–12 pcs/box)</p>
                <span className="text-ash text-[10px]">Assorted color assortments</span>
              </div>
              <div className="p-3 bg-selvedge border border-hairline rounded-xs space-y-1">
                <span className="text-marigold uppercase tracking-wider block text-[9.5px] font-semibold">Dispatch Speed</span>
                <p className="text-khadi">24–48 Hr Express</p>
                <span className="text-ash text-[10px]">Immediate mill dispatch</span>
              </div>
              <div className="p-3 bg-selvedge border border-hairline rounded-xs space-y-1">
                <span className="text-marigold uppercase tracking-wider block text-[9.5px] font-semibold">Retail Advantage</span>
                <p className="text-khadi">Aggressive Markups</p>
                <span className="text-ash text-[10px]">High weekly turn ratios</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-kumkum hover:bg-kumkum-deep text-white font-mono text-xs tracking-wider uppercase rounded-xs transition-all shadow-xs font-medium min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Sunrise Fab Tex Desk</span>
              </a>
              <Link
                href="/partner"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-selvedge hover:bg-selvedge-light border border-hairline text-khadi hover:text-marigold font-mono text-xs tracking-wider uppercase rounded-xs transition-all min-h-[44px] shadow-2xs font-medium"
              >
                <span>Open Commercial Account</span>
                <ArrowUpRight className="w-4 h-4 text-marigold" />
              </Link>
            </div>
          </div>

          {/* Right Featured Visual */}
          <div className="lg:col-span-4">
            <div className="card-media card-media--catalogue rounded-sm border border-hairline overflow-hidden bg-selvedge p-2 shadow-agency-card">
              <Picture
                imageKey="ST-4420"
                priority={true}
                sizes="(max-width: 1024px) 90vw, 30vw"
                className="w-full h-full rounded-xs overflow-hidden"
              />
              <div className="p-3.5 space-y-1 font-mono text-xs border-t border-hairline mt-2">
                <div className="flex items-center justify-between text-marigold">
                  <span className="text-xs font-semibold">DESIGN ST-4420</span>
                  <span className="text-[10px] uppercase bg-warp px-2 py-0.5 border border-hairline">Dola Silk</span>
                </div>
                <p className="text-khadi text-sm font-display font-light">Royal Indigo Festive Dola Silk Saree</p>
                <p className="text-ash text-[11px]">Gold Zari Weave Borders · Fast Retail Counter Turnover</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Ticker */}
      <Marquee items={SUNRISE_TICKER} />

      {/* Sourcing Categories */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-8 lg:px-12 bg-selvedge-light border-b border-hairline relative">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2.5 max-w-2xl">
              <p className="eyebrow text-marigold">SUNRISE FAB TEX · VOLUME LINES</p>
              <h2 className="font-display text-3xl sm:text-5xl text-khadi font-light tracking-tight">
                Priced and packed for <i className="italic text-marigold">high-turnover retail.</i>
              </h2>
              <p className="text-xs sm:text-sm text-ash font-light">
                Direct mill-run production lots from Surat powerlooms and Ahmedabad readymade garment factories.
              </p>
            </div>
            <Link
              href="/partner"
              className="inline-flex items-center gap-1.5 font-mono text-xs tracking-widest uppercase text-marigold hover:text-kumkum transition-colors py-1 font-medium"
            >
              Request Rate Cards <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SUNRISE_CATEGORIES.map((cat, idx) => (
              <SpotlightCard
                key={cat.title}
                className="p-6 bg-selvedge border-hairline hover:border-marigold/60 rounded-sm space-y-4 flex flex-col justify-between shadow-2xs"
              >
                <div className="space-y-3">
                  <div className="card-media card-media--category w-full rounded-xs overflow-hidden">
                    <Picture
                      imageKey={cat.imageKey}
                      sizes="(max-width: 768px) 90vw, 30vw"
                      className="w-full h-full"
                      imgClassName="hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                  <div className="flex items-center font-mono text-xs">
                    <span className="text-marigold font-display text-2xl font-light">0{idx + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-khadi font-light">{cat.title}</h3>
                    <p className="font-mono text-[11px] text-marigold mt-1 font-medium">{cat.focus}</p>
                  </div>
                  <p className="text-xs text-ash font-light leading-relaxed">{cat.desc}</p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* Catalogue Showcase */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-8 lg:px-12 bg-warp border-b border-hairline relative">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-hairline pb-6">
            <div className="space-y-2">
              <p className="eyebrow text-marigold">COMMERCIAL INVENTORY</p>
              <h2 className="font-display text-3xl sm:text-5xl text-khadi font-light tracking-tight">
                Sunrise Fab Tex <i className="italic text-haldi">Collection</i>
              </h2>
              <p className="text-xs sm:text-sm text-ash font-light">
                Proven fast-turnover designs with guaranteed repeat dye lots and box packaging.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2 font-mono text-xs">
              {(["all", "sarees", "lehengas", "suits", "garments"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3.5 py-2 border rounded-xs transition-all uppercase tracking-wider text-[11px] ${
                    activeTab === tab
                      ? "bg-selvedge text-marigold border-marigold font-medium shadow-xs"
                      : "bg-selvedge/40 text-ash border-hairline hover:text-khadi"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((p, idx) => (
              <ProductCard key={p.id} product={p} priority={idx < 2} />
            ))}
          </div>
        </div>
      </section>

      {/* 4-Step Commercial Procurement Architecture */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-8 lg:px-12 bg-selvedge-light border-b border-hairline relative">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-3xl space-y-3">
            <p className="eyebrow text-marigold">VOLUME DISPATCH ENGINE</p>
            <h2 className="font-display text-3xl sm:text-5xl text-khadi font-light tracking-tight">
              Direct mill lines built for <i className="italic text-marigold">scale &amp; velocity.</i>
            </h2>
            <p className="text-xs sm:text-base text-ash font-light leading-relaxed">
              How Sunrise Fab Tex ensures high weekly volume, flawless batch packaging, and the fastest freight turnaround in Surat.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SUNRISE_OPERATIONS.map((op) => (
              <div
                key={op.title}
                className="p-6 bg-selvedge border border-hairline hover:border-marigold/50 rounded-sm space-y-3 flex flex-col justify-between shadow-2xs"
              >
                <div className="space-y-2.5">
                  <op.icon className="w-6 h-6 text-marigold" />
                  <span className="font-mono text-[10px] text-marigold tracking-widest uppercase block font-medium">
                    {op.tagline}
                  </span>
                  <h3 className="font-display text-lg text-khadi font-light">{op.title}</h3>
                  <p className="text-xs text-ash font-light leading-relaxed">{op.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 18-Year Heritage Milestones */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-8 lg:px-12 bg-warp border-b border-hairline relative">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ash pb-3 border-b border-hairline">
            <History className="w-4 h-4 text-marigold" />
            <span>Sunrise Fab Tex Growth &amp; Logistics Milestones (2008 – 2026)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {SUNRISE_MILESTONES.map((m, idx) => (
              <div
                key={m.year}
                className="p-5 bg-selvedge border border-hairline rounded-xs space-y-2 flex flex-col justify-between shadow-2xs"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-marigold font-semibold tracking-wider bg-warp px-2 py-0.5 border border-marigold/30 rounded-2xs">
                      {m.year}
                    </span>
                    <span className="text-[10px] font-mono text-ash/60">0{idx + 1}</span>
                  </div>
                  <h4 className="font-display text-base text-khadi font-light">{m.title}</h4>
                  <p className="text-xs text-ash font-light leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Direct Trading Desks & Contact */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-8 lg:px-12 bg-selvedge border-b border-hairline relative">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <p className="eyebrow text-marigold">OFFICES &amp; LOGISTICS DESKS</p>
            <h2 className="font-display text-3xl sm:text-5xl text-khadi font-light tracking-tight">
              Connect with <i className="italic text-haldi">Sunrise Fab Tex</i>
            </h2>
            <p className="text-xs sm:text-sm text-ash font-light">
              Visit our trading floor in Surat or coordinate dispatches with our Kanpur hub and Ahmedabad manufacturing floor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Surat HQ */}
            <div className="p-6 bg-warp border border-hairline rounded-sm space-y-3.5 shadow-2xs">
              <span className="font-mono text-[10px] text-marigold tracking-widest uppercase block font-semibold">Surat Commercial Desk</span>
              <h3 className="font-display text-xl text-khadi font-light">Trading Floor &amp; Carton Dispatch</h3>
              <div className="space-y-2 font-mono text-xs text-ash">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-marigold shrink-0 mt-0.5" />
                  <span>H-32 India Market, Salabatpura, Ring Road, Surat, Gujarat</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-marigold shrink-0" />
                  <span>Mon – Sat: 10:00 AM – 10:00 PM IST</span>
                </div>
                <div className="flex items-center gap-2 text-khadi font-medium">
                  <Phone className="w-4 h-4 text-marigold shrink-0" />
                  <span>+91 91510 03198 / +91 91510 60271</span>
                </div>
              </div>
            </div>

            {/* Kanpur Desk */}
            <div className="p-6 bg-warp border border-hairline rounded-sm space-y-3.5 shadow-2xs">
              <span className="font-mono text-[10px] text-marigold tracking-widest uppercase block font-semibold">Kanpur Logistics Hub</span>
              <h3 className="font-display text-xl text-khadi font-light">Shiv Market Regional Desk</h3>
              <div className="space-y-2 font-mono text-xs text-ash">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-marigold shrink-0 mt-0.5" />
                  <span>Shop No. 12, Shiv Market, General Ganj, Kanpur, UP</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-marigold shrink-0" />
                  <span>Mon – Sat: 10:00 AM – 10:00 PM IST</span>
                </div>
                <div className="flex items-center gap-2 text-khadi font-medium">
                  <Phone className="w-4 h-4 text-marigold shrink-0" />
                  <span>+91 91510 60273</span>
                </div>
              </div>
            </div>

            {/* Ahmedabad Desk */}
            <div className="p-6 bg-warp border border-hairline rounded-sm space-y-3.5 shadow-2xs">
              <span className="font-mono text-[10px] text-marigold tracking-widest uppercase block font-semibold">Ahmedabad Readymade Hub</span>
              <h3 className="font-display text-xl text-khadi font-light">New Cloth Market Trade Floor</h3>
              <div className="space-y-2 font-mono text-xs text-ash">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-marigold shrink-0 mt-0.5" />
                  <span>300, 1st Floor, New Cloth Market, Sarangpur, Ahmedabad</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-marigold shrink-0" />
                  <span>Mon – Sat: 10:00 AM – 10:00 PM IST</span>
                </div>
                <div className="flex items-center gap-2 text-khadi font-medium">
                  <Phone className="w-4 h-4 text-marigold shrink-0" />
                  <span>+91 95596 50752</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Onboarding Banner */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-8 lg:px-12 bg-gradient-to-b from-selvedge to-warp border-t border-hairline relative">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <p className="eyebrow text-marigold">ONBOARD YOUR RETAIL COUNTERS</p>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl text-khadi font-light tracking-tight leading-[0.94]">
            Secure volume rate cards with <i className="italic text-marigold">Sunrise Fab Tex.</i>
          </h2>
          <p className="text-xs sm:text-base text-ash font-light max-w-2xl mx-auto leading-relaxed">
            Gain immediate direct-loom pricing on carton lots, fast seasonal dispatch priority,
            and dedicated regional account management across North &amp; Central India.
          </p>
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/partner"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-kumkum hover:bg-kumkum-deep text-white font-mono text-xs tracking-widest uppercase rounded-xs transition-all shadow-xs font-medium min-h-[44px]"
            >
              <span>Submit Volume Inquiry →</span>
            </Link>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-selvedge hover:bg-selvedge-light border border-hairline text-khadi hover:text-marigold font-mono text-xs tracking-widest uppercase rounded-xs transition-all min-h-[44px] shadow-2xs font-medium"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Commercial Desk</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

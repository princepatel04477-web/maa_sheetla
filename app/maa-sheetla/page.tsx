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
  Layers,
  Award
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

const MAA_SHEETLA_CATEGORIES = [
  {
    imageKey: "CAT-01",
    title: "Bridal & Heritage Silks",
    focus: "Kanjivaram Tissue · Banarasi Khaddi · Pure Mulberry Silk",
    desc: "Curated jacquard brocades, kadwa weave borders, and antique gold zari pallus engineered for premier bridal showrooms.",
  },
  {
    imageKey: "MS-9904",
    title: "Handcrafted Bridal Lehengas",
    focus: "Micro 9000 Velvet · Raw Silk · Dabka, Zardozi & Moti",
    desc: "Grand 16-kali couture silhouettes with heavy cancan flares and double dupatta styling for multi-designer counters.",
  },
  {
    imageKey: "CAT-03",
    title: "Embroidered Luxury Suits",
    focus: "Handwoven Chanderi · Royal Velvet · Kashmiri Tilla",
    desc: "Intricately embellished unstitched & semi-stitched sets with pure silk dupattas and artisanal necklines.",
  },
  {
    imageKey: "CAT-04",
    title: "Contemporary Indo-Western & Capes",
    focus: "Silk Crepe · Organza Capes · Cutdana Beadwork",
    desc: "Showroom-ready fusion silhouettes and cocktail wear with designer cuts and exquisite hand-needlework.",
  },
  {
    imageKey: "MS-8815",
    title: "Handcrafted Dupattas & Stoles",
    focus: "Banarasi Katan · Tissue Organza · Handloom Phulkari",
    desc: "Heritage statement dupattas designed to elevate boutique ticket sizes and counter margins.",
  },
];

const MAA_OPERATIONS = [
  {
    icon: Factory,
    title: "1. Master Loom Allocation",
    tagline: "Exclusive Weaving Units",
    desc: "We pair your showroom directly with specialized Surat and Varanasi master weavers, securing exclusive seasonal designs that mass-market traders cannot replicate.",
  },
  {
    icon: Scale,
    title: "2. Transparent Agency Brokerage",
    tagline: "True Mill-Floor Rates",
    desc: "Direct-from-loom procurement at authentic manufacturing cost structures. Zero hidden markups or multi-tier middleman inflation.",
  },
  {
    icon: ShieldCheck,
    title: "3. Piece-by-Piece Flaw Audit",
    tagline: "Illuminated Table Inspection",
    desc: "Every bridal lehenga, saree, and suit undergoes warp-tension checks, zari consistency rub tests, and embroidery audits before boxing.",
  },
  {
    icon: Truck,
    title: "4. Secure Moisture-Shield Dispatch",
    tagline: "48-Hr Express Cargo",
    desc: "Assorted boutique lots are packed in heavy-duty moisture barrier cartons and dispatched via priority rail and road lines across India.",
  },
];

const MAA_MILESTONES = [
  {
    year: "2008",
    title: "Agency Brokerage Inception",
    desc: "Founded by Manish Kanodia as an independent textile commission agency rooted in transparent pricing and buyer trust.",
  },
  {
    year: "2009",
    title: "Kanpur Office Acquired",
    desc: "Acquired regional office at 50/274 Shiv Market, Naughara, Kanpur for direct North Indian showroom liaison and sampling.",
  },
  {
    year: "2010",
    title: "Surat Loom Floor Arrival",
    desc: "Moved directly to Surat, Gujarat — connecting regional buyers with 100+ verified jacquard powerlooms and master dyehouses.",
  },
  {
    year: "2016",
    title: "Surat Head Office Acquired",
    desc: "Acquired permanent flagship floor at H-32 India Market, Salabatpura with illuminated QC inspection and express dispatch.",
  },
  {
    year: "2026",
    title: "Ahmedabad Regional Hub",
    desc: "Inaugurated New Cloth Market trade floor in Ahmedabad expanding western regional showroom accessibility.",
  },
];

const MAA_TICKER = [
  "Maa Sheetla Agency · Established 2008",
  "Pure Mulberry Tissue Silk",
  "Micro 9000 Velvet Bridal Lehengas",
  "Banarasi Khaddi Georgette",
  "Strict Territorial Showroom Protection",
  "Flexible Order Minimums (2–6 pcs)",
  "Surat HQ · Kanpur · Ahmedabad",
];

export default function MaaSheetlaPage() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const products = getProductsByFirm("Maa Sheetla");

  const filteredProducts = activeTab === "all"
    ? products
    : products.filter((p) => p.type === activeTab);

  const waUrl = createWhatsAppLink("enquiring about Maa Sheetla Agency bridal & silk collection agency account", {
    firm: "Maa Sheetla",
    targetNumber: OFFICE_NUMBERS.surat,
  });

  return (
    <div className="w-full relative bg-warp text-khadi overflow-hidden min-h-screen">
      <ThreadsBackground />

      {/* Sibling Firm Context Banner */}
      <div className="pt-20 sm:pt-24 w-full bg-selvedge border-b border-hairline relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono">
          <div className="flex items-center gap-2 text-ash">
            <span className="w-2 h-2 rounded-full bg-kumkum shrink-0" />
            <span className="text-khadi font-medium">Maa Sheetla Agency</span>
            <span>— The Bridal, Silk &amp; Boutique Desk</span>
          </div>
          <Link
            href="/sunrise-fab-tex"
            className="inline-flex items-center gap-1.5 text-marigold hover:text-haldi transition-colors font-medium"
          >
            <span>Looking for Commercial Volume &amp; Prints? Visit Sunrise Fab Tex Adat</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative w-full py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-12 border-b border-hairline overflow-hidden bg-gradient-to-b from-warp via-selvedge/50 to-warp">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 font-mono text-[9.5px] sm:text-[10px] tracking-[0.24em] text-kumkum uppercase bg-selvedge/90 px-3 py-1.5 border border-kumkum/40 rounded-xs">
              <Sparkles className="w-3.5 h-3.5 text-kumkum shrink-0" />
              <span>MAA SHEETLA AGENCY · ESTABLISHED 2008 · SURAT</span>
            </div>

            <div className="h-16 sm:h-22 w-auto flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/maa_sheetla_maroon.png"
                alt="Maa Sheetla Agency Official Logo"
                className="h-full w-auto object-contain filter drop-shadow-xs"
              />
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-light text-khadi tracking-tight leading-[0.93]">
              Curated bridal lehengas, pure silks &amp; <i className="italic text-haldi">exclusive boutique craft.</i>
            </h1>

            <p className="text-sm sm:text-base text-ash font-light leading-relaxed max-w-2xl">
              Maa Sheetla Agency is the dedicated wholesale brokerage floor for premium multi-designer counters,
              luxury bridal boutiques, and showroom owners across India. We deliver authentic mill-floor cost structures
              with strict territorial protection and piece-by-piece illuminated flaw audits.
            </p>

            {/* Key Operating Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 font-mono text-[11px]">
              <div className="p-3 bg-selvedge border border-hairline rounded-xs space-y-1">
                <span className="text-marigold uppercase tracking-wider block text-[9.5px] font-semibold">Minimum Orders</span>
                <p className="text-khadi">2 to 6 pcs per design</p>
                <span className="text-ash text-[10px]">Complete colorways</span>
              </div>
              <div className="p-3 bg-selvedge border border-hairline rounded-xs space-y-1">
                <span className="text-marigold uppercase tracking-wider block text-[9.5px] font-semibold">Quality Standard</span>
                <p className="text-khadi">100% Table Inspected</p>
                <span className="text-ash text-[10px]">Zari &amp; needlework audit</span>
              </div>
              <div className="p-3 bg-selvedge border border-hairline rounded-xs space-y-1">
                <span className="text-marigold uppercase tracking-wider block text-[9.5px] font-semibold">Showroom Shield</span>
                <p className="text-khadi">Territorial Exclusivity</p>
                <span className="text-ash text-[10px]">No local counter clash</span>
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
                <span>WhatsApp Maa Sheetla Desk</span>
              </a>
              <Link
                href="/partner"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-selvedge hover:bg-selvedge-light border border-hairline text-khadi hover:text-marigold font-mono text-xs tracking-wider uppercase rounded-xs transition-all min-h-[44px] shadow-2xs font-medium"
              >
                <span>Open Wholesale Account</span>
                <ArrowUpRight className="w-4 h-4 text-marigold" />
              </Link>
            </div>
          </div>

          {/* Right Featured Visual */}
          <div className="lg:col-span-4">
            <div className="card-media card-media--catalogue rounded-sm border border-hairline overflow-hidden bg-selvedge p-2 shadow-agency-card">
              <Picture
                imageKey="MS-9904"
                priority={true}
                sizes="(max-width: 1024px) 90vw, 30vw"
                className="w-full h-full rounded-xs overflow-hidden"
              />
              <div className="p-3.5 space-y-1 font-mono text-xs border-t border-hairline mt-2">
                <div className="flex items-center justify-between text-marigold">
                  <span className="text-xs font-semibold">DESIGN MS-9904</span>
                  <span className="text-[10px] uppercase bg-warp px-2 py-0.5 border border-hairline">Bridal Velvet</span>
                </div>
                <p className="text-khadi text-sm font-display font-light">Heritage Crimson Bridal Velvet Lehenga</p>
                <p className="text-ash text-[11px]">16-Kali Flare · Dabka, Zardozi &amp; Moti Embellishment</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Ticker */}
      <Marquee items={MAA_TICKER} />

      {/* Sourcing Categories */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-8 lg:px-12 bg-selvedge-light border-b border-hairline relative">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2.5 max-w-2xl">
              <p className="eyebrow text-kumkum">MAA SHEETLA · SOURCING DISCIPLINES</p>
              <h2 className="font-display text-3xl sm:text-5xl text-khadi font-light tracking-tight">
                Curated categories for <i className="italic text-marigold">marquee counters.</i>
              </h2>
              <p className="text-xs sm:text-sm text-ash font-light">
                Every silhouette is hand-selected from vetted Surat powerloom and handloom master clusters.
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
            {MAA_SHEETLA_CATEGORIES.map((cat, idx) => (
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
              <p className="eyebrow text-kumkum">FLOOR ARCHIVE</p>
              <h2 className="font-display text-3xl sm:text-5xl text-khadi font-light tracking-tight">
                Maa Sheetla Agency <i className="italic text-haldi">Collection</i>
              </h2>
              <p className="text-xs sm:text-sm text-ash font-light">
                Verified high-margin designs with complete colorway sets ready for order booking.
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

      {/* 4-Step Agency Procurement Architecture */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-8 lg:px-12 bg-selvedge-light border-b border-hairline relative">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-3xl space-y-3">
            <p className="eyebrow text-kumkum">PROCUREMENT ARCHITECTURE</p>
            <h2 className="font-display text-3xl sm:text-5xl text-khadi font-light tracking-tight">
              How Maa Sheetla operates as your <i className="italic text-marigold">Surat buying desk.</i>
            </h2>
            <p className="text-xs sm:text-base text-ash font-light leading-relaxed">
              We act as your authorized on-ground eyes and ears in Surat, eliminating broker layers and safeguarding your quality standards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {MAA_OPERATIONS.map((op) => (
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
            <span>Maa Sheetla Journey &amp; Milestones (2008 – 2026)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {MAA_MILESTONES.map((m, idx) => (
              <div
                key={m.year}
                className="p-5 bg-selvedge border border-hairline rounded-xs space-y-2 flex flex-col justify-between shadow-2xs"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-kumkum font-semibold tracking-wider bg-warp px-2 py-0.5 border border-kumkum/30 rounded-2xs">
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
            <p className="eyebrow text-kumkum">OFFICES &amp; TRADING DESKS</p>
            <h2 className="font-display text-3xl sm:text-5xl text-khadi font-light tracking-tight">
              Connect with <i className="italic text-haldi">Maa Sheetla Agency</i>
            </h2>
            <p className="text-xs sm:text-sm text-ash font-light">
              Visit our trading floor in Surat or contact our regional desks in Kanpur and Ahmedabad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Surat HQ */}
            <div className="p-6 bg-warp border border-hairline rounded-sm space-y-3.5 shadow-2xs">
              <span className="font-mono text-[10px] text-marigold tracking-widest uppercase block font-semibold">Surat Head Office</span>
              <h3 className="font-display text-xl text-khadi font-light">Trading Floor &amp; Inspection HQ</h3>
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
              <span className="font-mono text-[10px] text-marigold tracking-widest uppercase block font-semibold">Kanpur Liaison Desk</span>
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
              <span className="font-mono text-[10px] text-marigold tracking-widest uppercase block font-semibold">Ahmedabad Showroom</span>
              <h3 className="font-display text-xl text-khadi font-light">New Cloth Market Regional Floor</h3>
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
          <p className="eyebrow text-kumkum">ONBOARD YOUR SHOWROOM</p>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl text-khadi font-light tracking-tight leading-[0.94]">
            Open a dedicated agency account with <i className="italic text-marigold">Maa Sheetla.</i>
          </h2>
          <p className="text-xs sm:text-base text-ash font-light max-w-2xl mx-auto leading-relaxed">
            Gain immediate access to verified Surat bridal rate cards, exclusive showroom territorial protection,
            and priority wedding season dispatches.
          </p>
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/partner"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-kumkum hover:bg-kumkum-deep text-white font-mono text-xs tracking-widest uppercase rounded-xs transition-all shadow-xs font-medium min-h-[44px]"
            >
              <span>Submit Trade Query Form →</span>
            </Link>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-selvedge hover:bg-selvedge-light border border-hairline text-khadi hover:text-marigold font-mono text-xs tracking-widest uppercase rounded-xs transition-all min-h-[44px] shadow-2xs font-medium"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Agency Desk</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

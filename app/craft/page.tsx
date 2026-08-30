import React from "react";
import Link from "next/link";
import ThreadsBackground from "../../components/react-bits/ThreadsBackground";
import BlurText from "../../components/react-bits/BlurText";
import SplitText from "../../components/react-bits/SplitText";
import ShinyText from "../../components/react-bits/ShinyText";
import { CheckCircle, ShieldCheck, Factory, Layers, ArrowUpRight, Scale } from "lucide-react";
import { createWhatsAppLink } from "../../lib/whatsapp";

export const metadata = {
  title: "Loom Quality Audits & Mill Sourcing Process",
  description: "How Maa Sheetla Agency inspects, verifies, and consolidates wholesale textile batches across Surat powerlooms and dyehouses.",
};

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Yarn & Spinnery Audit",
    category: "SOURCING LEVEL",
    desc: "We verify raw filament denier, mulberry silk weight, and 60/60 combed cotton yarn lots directly at the spinneries before warping begins.",
  },
  {
    step: "02",
    title: "Jacquard Loom Supervision",
    category: "WEAVING LEVEL",
    desc: "Our on-ground supervisors inspect high-speed electronic jacquards to verify kadwa cutwork precision, warp tension, and zari border density.",
  },
  {
    step: "03",
    title: "Vat-Dyeing & Hand Needlework",
    category: "PROCESSING LEVEL",
    desc: "Batches undergo lab-certified rub tests for colorfastness. Hand-embroidery artisans execute zardozi, cutdana, and pearl handwork.",
  },
  {
    step: "04",
    title: "Moisture-Proof Boutique Packing",
    category: "DISPATCH LEVEL",
    desc: "Each carton is packed in heavy-gauge moisture barrier film, assorted by design ratios, and tagged with barcoded showroom inventory codes.",
  },
];

export default function CraftPage() {
  const waUrl = createWhatsAppLink("learning more about your mill quality control process and commission terms");

  return (
    <div className="min-h-screen pt-36 pb-28 px-6 sm:px-12 bg-warp relative">
      <ThreadsBackground />

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        {/* Page Hero */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.24em] text-marigold uppercase">
            <span>THE AGENCY QUALITY FLOOR</span>
            <span>·</span>
            <ShinyText text="SURAT TEXTILE HUB" />
          </div>
          <h1 className="font-display text-4xl sm:text-6xl text-khadi font-light tracking-tight leading-[0.95]">
            <BlurText text="How we safeguard your boutique floor from mill flaws." />
          </h1>
          <p className="text-sm sm:text-base text-ash font-light leading-relaxed">
            The biggest hazard in wholesale textiles is batch inconsistency. As your proxy on the Surat trading floor,
            Maa Sheetla Agency conducts multi-point quality audits on every meter before dispatch.
          </p>
        </div>

        {/* 4-Stage Process */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((p) => (
            <div key={p.step} className="p-6 bg-selvedge border border-hairline hover:border-marigold/60 transition-all rounded-sm space-y-4">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-marigold font-display text-2xl font-light">{p.step}</span>
                <span className="text-ash tracking-widest text-[9.5px] uppercase">{p.category}</span>
              </div>
              <h3 className="font-display text-xl text-khadi font-light">{p.title}</h3>
              <p className="text-xs text-ash font-light leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Quality Assurance Guarantees */}
        <div className="p-8 sm:p-12 bg-selvedge/80 border border-hairline rounded-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <h2 className="font-display text-3xl sm:text-4xl text-khadi font-light">
              Our Replacement Guarantee to Every Stockist Counter
            </h2>
            <p className="text-sm text-ash font-light leading-relaxed">
              If any piece in an agency carton possesses a weaving, printing, or dye defect, our Surat floor
              issues an immediate replacement piece or direct credit note without complex paperwork.
            </p>
            <div className="pt-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-warp hover:bg-selvedge border border-marigold text-haldi font-mono text-xs tracking-widest uppercase rounded-xs transition-all"
              >
                Discuss Mill Commission &amp; Sourcing <ArrowUpRight className="w-4 h-4 text-marigold" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4 text-center font-mono text-xs">
            <div className="p-4 bg-warp border border-hairline">
              <div className="font-display text-3xl text-haldi mb-1">100%</div>
              <span className="text-ash text-[10px]">Pre-Dispatch Audit</span>
            </div>
            <div className="p-4 bg-warp border border-hairline">
              <div className="font-display text-3xl text-haldi mb-1">&lt; 0.2%</div>
              <span className="text-ash text-[10px]">Defect Ratio</span>
            </div>
            <div className="p-4 bg-warp border border-hairline">
              <div className="font-display text-3xl text-haldi mb-1">570+</div>
              <span className="text-ash text-[10px]">Active Counters</span>
            </div>
            <div className="p-4 bg-warp border border-hairline">
              <div className="font-display text-3xl text-haldi mb-1">15 Yrs</div>
              <span className="text-ash text-[10px]">Surat Trust</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

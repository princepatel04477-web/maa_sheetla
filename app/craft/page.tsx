import React from "react";
import Link from "next/link";
import ThreadsBackground from "../../components/react-bits/ThreadsBackground";
import BlurText from "../../components/react-bits/BlurText";
import ShinyText from "../../components/react-bits/ShinyText";
import SpotlightCard from "../../components/react-bits/SpotlightCard";
import { ArrowUpRight, ShieldCheck, Factory, CheckCircle2, MessageCircle } from "lucide-react";
import { createWhatsAppLink } from "../../lib/whatsapp";
import { Picture } from "../../components/Picture";

export const metadata = {
  title: "Mill & Quality Inspection Floor · Maa Sheetla Agency",
  description: "Surat powerloom allocation and piece-by-piece fabric screening standards.",
};

const QC_STEPS = [
  {
    step: "01",
    imageKey: "QC-01",
    title: "Raw Warp & Weft Density Audit",
    desc: "Every loom lot is checked for authentic picks-per-inch (PPI) and reed count to guarantee pure handloom touch and long-lasting fabric drape.",
  },
  {
    step: "02",
    imageKey: "QC-02",
    title: "Dye Lot & Rub Colorfastness Test",
    desc: "Batch sample swatches undergo dry and wet crock testing to ensure zero bleed, true Pantone matching, and repeatable seasonal dye lots.",
  },
  {
    step: "03",
    imageKey: "QC-03",
    title: "Piece-by-Piece Flaw Screening",
    desc: "Every saree, suit, and lehenga panel is screened on backlit tables for needle skips, weaving slubs, and zari tarnish before carton boxing.",
  },
  {
    step: "04",
    imageKey: "QC-04",
    title: "Moisture-Shield Carton Packing",
    desc: "Assorted boutique sets are packed in heavy-duty corrugated cartons with moisture-barrier film for zero damage during monsoon and rail transit.",
  },
];

export default function CraftPage() {
  const waUrl = createWhatsAppLink("inquiring on mill quality standards and loom allocation terms");

  return (
    <div className="min-h-screen pt-28 sm:pt-36 pb-20 px-4 sm:px-8 lg:px-12 bg-warp relative">
      <ThreadsBackground />

      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 relative z-10">
        {/* Header with Hero-Craft Atmosphere */}
        <div className="relative overflow-hidden rounded-sm border border-hairline p-6 sm:p-12 lg:p-16 space-y-5 bg-selvedge">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <Picture
              imageKey="HERO-CRAFT"
              priority={true}
              sizes="100vw"
              className="w-full h-full"
              imgClassName="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-selvedge via-selvedge/80 to-transparent" />
          </div>

          <div className="relative z-10 space-y-3.5 max-w-3xl">
            <div className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px] tracking-[0.22em] text-marigold uppercase">
              <span>QUALITY CONTROL &amp; WEAVING DISCIPLINE</span>
              <span>·</span>
              <ShinyText text="SURAT TRADING FLOOR" />
            </div>
            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl text-khadi font-light tracking-tight leading-[0.95]">
              <BlurText text="The Surat Mill &amp; QC Floor." />
            </h1>
            <p className="text-xs sm:text-base text-ash font-light leading-relaxed">
              Direct access to Surat powerlooms and master dyehouses is backed by our rigorous 4-step
              inspection protocol before a single carton is dispatched.
            </p>
          </div>
        </div>

        {/* 4 QC Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {QC_STEPS.map((step) => (
            <SpotlightCard key={step.step} className="p-6 sm:p-8 bg-selvedge border-hairline rounded-sm space-y-4 flex flex-col justify-between shadow-2xs hover:shadow-xs">
              <div className="space-y-3.5">
                <div className="card-media card-media--qc w-full rounded-xs overflow-hidden mb-3">
                  <Picture
                    imageKey={step.imageKey}
                    sizes="(max-width: 640px) 92vw, 45vw"
                    className="w-full h-full"
                    imgClassName="hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-marigold font-display text-3xl font-light">0{step.step}</span>
                  <span className="text-marigold text-[9.5px] border border-hairline px-2.5 py-0.5 bg-selvedge-light uppercase font-medium">
                    Verified Inspection
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl text-khadi font-light">{step.title}</h3>
                <p className="text-xs sm:text-sm text-ash font-light leading-relaxed">{step.desc}</p>
              </div>
            </SpotlightCard>
          ))}
        </div>

        {/* CTA */}
        <div className="p-6 sm:p-10 bg-selvedge border border-hairline rounded-sm flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xs">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="font-display text-2xl text-khadi font-light">Inspect our sample lots</h3>
            <p className="text-xs sm:text-sm text-ash font-light">
              Visit our Surat trading floor or request certified loom swatches through WhatsApp.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-kumkum hover:bg-kumkum-deep text-white font-mono text-xs tracking-widest uppercase rounded-xs transition-all shadow-xs min-h-[44px]"
            >
              <MessageCircle className="w-4 h-4" /> Message QC Desk
            </a>
            <Link
              href="/partner"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-selvedge-light hover:bg-selvedge border border-hairline text-khadi hover:text-marigold font-mono text-xs tracking-widest uppercase rounded-xs min-h-[44px] shadow-2xs font-medium"
            >
              Submit Query Form <ArrowUpRight className="w-4 h-4 text-marigold" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

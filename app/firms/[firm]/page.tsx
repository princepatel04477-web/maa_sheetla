import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductsByFirm } from "../../../lib/products";
import ProductCard from "../../../components/ProductCard";
import ThreadsBackground from "../../../components/react-bits/ThreadsBackground";
import BlurText from "../../../components/react-bits/BlurText";
import ShinyText from "../../../components/react-bits/ShinyText";
import { ArrowUpRight } from "lucide-react";
import { createWhatsAppLink } from "../../../lib/whatsapp";

const FIRM_CONFIGS: Record<string, {
  name: "Maa Sheetla" | "Sunrise Tex Fab";
  eyebrow: string;
  tagline: string;
  description: string;
  roleDescription: string;
  moqRule: string;
  targetBoutique: string;
}> = {
  "maa-sheetla": {
    name: "Maa Sheetla",
    eyebrow: "AGENCY DESK 01 · CURATED DESIGNER BOUTIQUES",
    tagline: "For boutique counters that sell by craft & exclusivity.",
    description: "Curated wholesale brokerage of high-craft bridal lehengas, tissue silk sarees, and hand-embroidered suits for premium multi-designer counters.",
    roleDescription: "Maa Sheetla operates as the dedicated agency desk for discerning boutique owners who demand distinctive silhouettes, intricate hand needlework, and strict territorial exclusivity.",
    moqRule: "Flexible boutique minimums (2 to 6 pcs per design) with complete colorway sets.",
    targetBoutique: "Designer boutiques & heritage bridal showrooms in Hazratganj, South Delhi, Johari Bazaar & Civil Lines.",
  },
  "sunrise-tex-fab": {
    name: "Sunrise Tex Fab",
    eyebrow: "AGENCY DESK 02 · HIGH-VELOCITY COMMERCIAL WHOLESALE",
    tagline: "Priced and packed for daily retail turnover.",
    description: "High-velocity wholesale brokerage of the identical four catalogues, streamlined for rapid inventory turns and competitive commercial retail margins.",
    roleDescription: "Sunrise Tex Fab is designed for volume retail counters that require dependable weekly supply, mill-consistent dye lots, and attractive retail markup margins.",
    moqRule: "Volume carton packaging (8 to 12 pcs per box) with immediate mill dispatch guarantees.",
    targetBoutique: "High-footfall textile counters & commercial retail showrooms across UP, MP, Bihar, Punjab & NCR.",
  }
};

export async function generateStaticParams() {
  return [{ firm: "maa-sheetla" }, { firm: "sunrise-tex-fab" }];
}

export async function generateMetadata({ params }: { params: { firm: string } }) {
  const cfg = FIRM_CONFIGS[params.firm];
  if (!cfg) return { title: "Agency Desk Profile" };
  return {
    title: `${cfg.name} Agency Desk · Surat Wholesale Textiles`,
    description: cfg.description,
  };
}

export default function FirmProfilePage({ params }: { params: { firm: string } }) {
  const config = FIRM_CONFIGS[params.firm];
  if (!config) notFound();

  const products = getProductsByFirm(config.name);
  const waUrl = createWhatsAppLink(`visiting the ${config.name} agency desk in Surat`);

  return (
    <div className="min-h-screen pt-36 pb-28 px-6 sm:px-12 bg-warp relative">
      <ThreadsBackground />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Header Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-hairline pb-12">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.24em] text-marigold uppercase">
              <span>{config.eyebrow}</span>
              <span>·</span>
              <ShinyText text="SURAT HQ" />
            </div>
            <h1 className="font-display text-4xl sm:text-6xl text-khadi font-light tracking-tight leading-[0.95]">
              <BlurText text={`${config.name} — ${config.tagline}`} />
            </h1>
            <p className="text-base text-khadi/80 font-light leading-relaxed max-w-2xl">
              {config.roleDescription}
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end space-y-3">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-kumkum/15 hover:bg-kumkum/25 text-haldi border border-kumkum font-mono text-xs tracking-[0.18em] uppercase rounded-xs transition-all"
            >
              Connect with {config.name} Desk <ArrowUpRight className="w-4 h-4 text-marigold" />
            </a>
          </div>
        </div>

        {/* Operating Terms Spec Box */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 bg-selvedge border border-hairline rounded-sm text-xs font-mono">
          <div className="space-y-1.5">
            <span className="text-ash tracking-widest uppercase text-[10px]">MOQ &amp; Packing Structure:</span>
            <p className="text-khadi font-light">{config.moqRule}</p>
          </div>
          <div className="space-y-1.5">
            <span className="text-ash tracking-widest uppercase text-[10px]">Ideal Showroom Profile:</span>
            <p className="text-khadi font-light">{config.targetBoutique}</p>
          </div>
        </div>

        {/* Firm Catalogue Slice */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-hairline pb-4">
            <h2 className="font-display text-2xl sm:text-3xl text-khadi font-light">
              Current Agency Selection ({products.length} Designs)
            </h2>
            <span className="font-mono text-xs text-ash tracking-wider uppercase">
              Sarees · Lehengas · Suits · Garments
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

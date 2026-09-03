"use client";

import React, { useState } from "react";
import { Product } from "../lib/products";
import { createWhatsAppLink } from "../lib/whatsapp";
import { ArrowUpRight, Check } from "lucide-react";
import DecryptedText from "./react-bits/DecryptedText";
import { Picture } from "./Picture";
import { motion } from "framer-motion";
import { useHoverCapable, MOTION } from "../lib/motion";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const [copied, setCopied] = useState(false);
  const isHoverCapable = useHoverCapable();

  const waUrl = createWhatsAppLink(`booking wholesale rate card & batch samples for design code ${product.designCode}`, {
    designCode: product.designCode,
    category: product.type,
    firm: product.firm,
  });

  const handleCopyCode = () => {
    navigator.clipboard.writeText(product.designCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <motion.div
      className="group bg-selvedge border border-hairline rounded-sm overflow-hidden flex flex-col justify-between"
      // Touch press state — scale slightly on touchstart, release on touchend
      whileTap={!isHoverCapable ? { scale: 0.985 } : undefined}
      // Desktop hover lift and border to marigold — CSS handles border, motion for lift
      whileHover={isHoverCapable ? { y: -4 } : undefined}
      transition={{ duration: MOTION.dur.fast, ease: MOTION.ease.outQuart }}
      style={{ willChange: "transform" }}
    >
      {/* Image Frame */}
      <div className="card-media card-media--catalogue relative overflow-hidden bg-warp">
        <Picture
          imageKey={product.designCode}
          priority={priority}
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
          className="w-full h-full"
          imgClassName={`transition-all duration-700 ease-out scale-[1.06] group-hover:scale-100 ${
            isHoverCapable ? "group-hover:scale-105" : ""
          }`}
          customAlt={product.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-85 pointer-events-none" />

        {/* Firm Tag Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span
            className={`font-mono text-[9.5px] px-2 py-0.5 uppercase tracking-wider border shadow-2xs font-medium ${
              product.firm === "Maa Sheetla"
                ? "bg-selvedge/95 text-kumkum border-kumkum/40"
                : "bg-selvedge/95 text-marigold border-marigold/40"
            }`}
          >
            {product.firm}
          </span>
        </div>

        {/* Code Badge */}
        <button
          onClick={handleCopyCode}
          title="Click to copy Design Code"
          className="absolute top-3 right-3 bg-selvedge/95 px-2 py-0.5 border border-hairline font-mono text-[10px] text-ash hover:text-marigold flex items-center gap-1 transition-colors shadow-2xs"
        >
          {copied ? <Check className="w-3 h-3 text-marigold" /> : <span>CODE:</span>}
          <DecryptedText text={product.designCode} speed={40} className="text-khadi font-medium" />
        </button>

        {/* Bottom Image Overlay Title */}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="font-display text-xl text-white group-hover:text-amber-200 transition-colors font-light line-clamp-1 drop-shadow-xs">
            {product.title}
          </h3>
          <p className="font-mono text-[10px] text-amber-300 tracking-wider mt-0.5 uppercase drop-shadow-xs">
            {product.fabric}
          </p>
        </div>
      </div>

      {/* Spec Info Box */}
      <div className="p-4 space-y-3 bg-selvedge">
        <p className="text-xs text-ash font-light line-clamp-2">
          {product.work}
        </p>

        <div className="pt-2 border-t border-hairline flex items-center justify-between text-[11px] font-mono">
          <span className="text-ash">
            Assortment: <strong className="text-khadi font-medium">{product.moq}</strong>
          </span>
          <span className="text-marigold uppercase tracking-wider text-[10px] font-medium">
            {product.type}
          </span>
        </div>

        {/* Action Link — always visible at rest */}
        <div className="pt-2">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-3 bg-warp hover:bg-selvedge-light border border-hairline hover:border-marigold text-khadi hover:text-marigold font-mono text-[11px] tracking-wider uppercase rounded-xs transition-all flex items-center justify-center gap-1.5 font-medium shadow-2xs"
          >
            <span>Book Wholesale Lot</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-marigold" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

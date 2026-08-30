"use client";

import React, { useState } from "react";
import { Product } from "../lib/products";
import { createWhatsAppLink } from "../lib/whatsapp";
import { ArrowUpRight, Check, Eye } from "lucide-react";
import DecryptedText from "./react-bits/DecryptedText";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [copied, setCopied] = useState(false);

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
    <div className="group bg-selvedge border border-hairline hover:border-marigold/60 transition-all duration-300 rounded-sm overflow-hidden flex flex-col justify-between">
      {/* Image Frame */}
      <div className="relative aspect-[3/4] overflow-hidden bg-warp">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-selvedge via-transparent to-transparent opacity-80" />

        {/* Firm Tag Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span
            className={`font-mono text-[9.5px] px-2 py-0.5 uppercase tracking-wider border ${
              product.firm === "Maa Sheetla"
                ? "bg-warp/90 text-haldi border-kumkum/70"
                : "bg-warp/90 text-haldi border-marigold/70"
            }`}
          >
            {product.firm}
          </span>
        </div>

        {/* Code Badge */}
        <button
          onClick={handleCopyCode}
          title="Click to copy Design Code"
          className="absolute top-3 right-3 bg-warp/90 px-2 py-0.5 border border-hairline font-mono text-[10px] text-ash hover:text-haldi flex items-center gap-1 transition-colors"
        >
          {copied ? <Check className="w-3 h-3 text-marigold" /> : <span>CODE:</span>}
          <DecryptedText text={product.designCode} speed={40} className="text-khadi font-medium" />
        </button>

        {/* Bottom Image Overlay Title */}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="font-display text-xl text-khadi group-hover:text-haldi transition-colors font-light line-clamp-1">
            {product.title}
          </h3>
          <p className="font-mono text-[10px] text-marigold tracking-wider mt-0.5 uppercase">
            {product.fabric}
          </p>
        </div>
      </div>

      {/* Spec Info Box */}
      <div className="p-4 space-y-3 bg-selvedge">
        <p className="text-xs text-ash font-light line-clamp-2">
          {product.work}
        </p>

        <div className="pt-2 border-t border-hairline/60 flex items-center justify-between text-[11px] font-mono">
          <span className="text-ash">
            Agency MOQ: <strong className="text-khadi font-normal">{product.moq}</strong>
          </span>
          <span className="text-haldi uppercase tracking-wider text-[10px]">
            {product.type}
          </span>
        </div>

        {/* Action Link */}
        <div className="pt-2">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-3 bg-warp hover:bg-selvedge-light border border-hairline hover:border-marigold text-khadi hover:text-haldi font-mono text-[11px] tracking-wider uppercase rounded-xs transition-all flex items-center justify-center gap-1.5"
          >
            <span>Inquire Wholesale Rates</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-marigold" />
          </a>
        </div>
      </div>
    </div>
  );
}

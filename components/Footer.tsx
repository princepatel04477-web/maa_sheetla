"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { createWhatsAppLink } from "../lib/whatsapp";

const HUB_CITIES = [
  "Surat (Looms & HQ)", "Delhi NCR", "Varanasi", "Patna", "Jaipur",
  "Indore", "Ludhiana", "Bhopal", "Raipur", "Ranchi", "Meerut", "Muzaffarnagar", "Dhanbad"
];

export default function Footer() {
  const waUrl = createWhatsAppLink("general agency enquiry");

  return (
    <footer className="w-full bg-selvedge border-t border-hairline text-ash font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16 space-y-10 sm:space-y-16">
        {/* 13-City Corridor */}
        <div className="space-y-2.5 pb-6 sm:pb-8 border-b border-hairline">
          <span className="text-[9.5px] sm:text-[10px] text-marigold tracking-[0.24em] uppercase block">
            THE 13-CITY WHOLESALE CORRIDOR
          </span>
          <div className="flex flex-wrap gap-x-3 sm:gap-x-4 gap-y-1.5 sm:gap-y-2 text-khadi/80 text-[10.5px] sm:text-[11px]">
            {HUB_CITIES.map((city, idx) => (
              <span key={city} className="flex items-center gap-1.5 sm:gap-2">
                <span>{city}</span>
                {idx < HUB_CITIES.length - 1 && <span className="text-ash/40">·</span>}
              </span>
            ))}
          </div>
        </div>

        {/* 4 Column Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Col 1 */}
          <div className="space-y-3">
            <div className="font-display text-xl text-khadi">Maa Sheetla Agency</div>
            <p className="text-xs text-ash font-light leading-relaxed">
              B2B Wholesale Textile Brokerage &amp; Commission Agency representing Surat powerlooms
              and jacquard mills to 570+ retail boutique counters.
            </p>
            <div className="text-[10px] sm:text-[10.5px] text-haldi">
              GST: 24AACCS1234F1Z5 · EST. 2010
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <span className="text-khadi uppercase tracking-widest text-[10px] block">
              Agency Desks
            </span>
            <ul className="space-y-2 text-xs font-light">
              <li>
                <Link href="/firms/maa-sheetla" className="hover:text-haldi flex items-center gap-1">
                  Maa Sheetla (Curated Label Desk) <ArrowUpRight className="w-3 h-3 text-marigold" />
                </Link>
              </li>
              <li>
                <Link href="/firms/sunrise-tex-fab" className="hover:text-haldi flex items-center gap-1">
                  Sunrise Tex Fab (Volume Desk) <ArrowUpRight className="w-3 h-3 text-marigold" />
                </Link>
              </li>
              <li>
                <Link href="/craft" className="hover:text-haldi flex items-center gap-1">
                  Quality Floor &amp; Loom Audit <ArrowUpRight className="w-3 h-3 text-marigold" />
                </Link>
              </li>
              <li>
                <Link href="/partner" className="hover:text-haldi flex items-center gap-1">
                  Wholesale Query Form <ArrowUpRight className="w-3 h-3 text-marigold" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <span className="text-khadi uppercase tracking-widest text-[10px] block">
              Sourcing Categories
            </span>
            <ul className="space-y-2 text-xs font-light">
              <li>
                <Link href="/partner" className="hover:text-haldi">
                  Wholesale Sarees (Tissue, Dola, Organza)
                </Link>
              </li>
              <li>
                <Link href="/partner" className="hover:text-haldi">
                  Bridal &amp; Sangeet Lehengas
                </Link>
              </li>
              <li>
                <Link href="/partner" className="hover:text-haldi">
                  Suits &amp; Kurtis (Chanderi, Cambric)
                </Link>
              </li>
              <li>
                <Link href="/reach" className="hover:text-haldi">
                  13-City Freight Schedule
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-3">
            <span className="text-khadi uppercase tracking-widest text-[10px] block">
              Surat Office &amp; Floor
            </span>
            <p className="text-xs text-ash font-light leading-relaxed">
              1st Floor, Surat Textile Market, Ring Road, Surat, Gujarat 395002
            </p>
            <div className="space-y-1 text-xs">
              <a href="tel:+919825144001" className="text-khadi hover:text-haldi block py-0.5">
                +91 98251 44001 / 44002
              </a>
              <a href={waUrl} target="_blank" rel="noopener noreferrer" className="text-marigold hover:text-haldi block py-0.5">
                WhatsApp Desk (10 AM – 8 PM IST)
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-hairline flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] sm:text-[10.5px] text-ash/70 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} Maa Sheetla Agency &amp; Sunrise Tex Fab. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Surat Loom Brokerage</span>
            <span>·</span>
            <span>B2B Multi-Firm Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

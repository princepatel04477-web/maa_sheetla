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
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-16 space-y-16">
        {/* 13-City Ticker */}
        <div className="space-y-3 pb-8 border-b border-hairline">
          <span className="text-[10px] text-marigold tracking-[0.24em] uppercase block">
            THE 13-CITY WHOLESALE CORRIDOR
          </span>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-khadi/80 text-[11px]">
            {HUB_CITIES.map((city, idx) => (
              <span key={city} className="flex items-center gap-2">
                <span>{city}</span>
                {idx < HUB_CITIES.length - 1 && <span className="text-ash/40">·</span>}
              </span>
            ))}
          </div>
        </div>

        {/* 4 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1 */}
          <div className="space-y-4">
            <div className="font-display text-xl text-khadi">Maa Sheetla Agency</div>
            <p className="text-xs text-ash font-light leading-relaxed">
              B2B Wholesale Textile Brokerage &amp; Commission Agency. Representing Surat’s finest
              powerlooms and jacquard mills to 570+ retail boutique counters.
            </p>
            <div className="text-[10.5px] text-haldi">
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
                  Stockist Account Application <ArrowUpRight className="w-3 h-3 text-marigold" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <span className="text-khadi uppercase tracking-widest text-[10px] block">
              Shared Catalogues
            </span>
            <ul className="space-y-2 text-xs font-light">
              <li>
                <Link href="/catalogue/sarees" className="hover:text-haldi">
                  Wholesale Sarees (Tissue, Dola, Organza)
                </Link>
              </li>
              <li>
                <Link href="/catalogue/lehengas" className="hover:text-haldi">
                  Bridal &amp; Sangeet Lehengas (Velvet, Georgette)
                </Link>
              </li>
              <li>
                <Link href="/catalogue/suits" className="hover:text-haldi">
                  Suits &amp; Kurtis (Chanderi, Cambric 60/60)
                </Link>
              </li>
              <li>
                <Link href="/catalogue/garments" className="hover:text-haldi">
                  Ready-to-Wear Indo-Western Garments
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
              <a href="tel:+919825144001" className="text-khadi hover:text-haldi block">
                +91 98251 44001 / 44002
              </a>
              <a href={waUrl} target="_blank" rel="noopener noreferrer" className="text-marigold hover:text-haldi block">
                WhatsApp Desk Active (10 AM – 8 PM)
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-hairline flex flex-col sm:flex-row items-center justify-between gap-4 text-[10.5px] text-ash/70">
          <div>
            © {new Date().getFullYear()} Maa Sheetla Agency &amp; Sunrise Tex Fab. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Surat Loom Brokerage</span>
            <span>·</span>
            <span>B2B Multi-Firm Textile Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

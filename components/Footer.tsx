import React from "react";
import Link from "next/link";
import { MessageCircle, Phone, Mail, MapPin, ArrowUpRight, ShieldCheck } from "lucide-react";
import { createWhatsAppLink } from "../lib/whatsapp";

export default function Footer() {
  const waOfficeUrl = createWhatsAppLink("office trade inquiry");

  return (
    <footer className="bg-warp border-t border-hairline text-ash pt-16 sm:pt-20 pb-12 px-4 sm:px-8 lg:px-12 relative z-10">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Col 1: Identity & Firm Heritage */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 border border-marigold/60 bg-selvedge flex items-center justify-center font-display text-sm text-haldi rounded-xs shadow-inner">
                MS
              </div>
              <div>
                <span className="font-display text-xl text-khadi tracking-tight block leading-tight">
                  Maa Sheetla Agency
                </span>
                <span className="text-[10px] font-mono tracking-widest uppercase text-ash">
                  Sunrise Tex Fab · Surat Floor
                </span>
              </div>
            </div>
            <p className="text-xs text-ash leading-relaxed max-w-md font-light">
              Commission brokerage, trade agency, and production quality representation operating continuously on the Surat textile trading floor since 2010. Connecting regional wholesalers with verified Surat mills.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-[10.5px] font-mono uppercase text-marigold">
              <span className="px-2.5 py-1 bg-selvedge border border-hairline rounded-xs">EST. 2010</span>
              <span className="px-2.5 py-1 bg-selvedge border border-hairline rounded-xs">STM RING ROAD</span>
              <span className="px-2.5 py-1 bg-selvedge border border-hairline rounded-xs">13 REGIONAL HUBS</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-khadi">
              Trade Navigation
            </h4>
            <ul className="space-y-2 text-xs font-light">
              <li>
                <Link href="/firms/maa-sheetla" className="hover:text-haldi transition-colors inline-flex items-center gap-1.5">
                  <span>Maa Sheetla Desk (Traditional Fabrics)</span>
                  <ArrowUpRight className="w-3 h-3 text-ash" />
                </Link>
              </li>
              <li>
                <Link href="/firms/sunrise-tex-fab" className="hover:text-haldi transition-colors inline-flex items-center gap-1.5">
                  <span>Sunrise Tex Fab (Fancy &amp; Prints)</span>
                  <ArrowUpRight className="w-3 h-3 text-ash" />
                </Link>
              </li>
              <li>
                <Link href="/craft" className="hover:text-haldi transition-colors inline-flex items-center gap-1.5">
                  <span>4-Step Physical QC Floor</span>
                  <ArrowUpRight className="w-3 h-3 text-ash" />
                </Link>
              </li>
              <li>
                <Link href="/reach" className="hover:text-haldi transition-colors inline-flex items-center gap-1.5">
                  <span>13-City Logistics Network</span>
                  <ArrowUpRight className="w-3 h-3 text-ash" />
                </Link>
              </li>
              <li>
                <Link href="/partner" className="hover:text-haldi transition-colors inline-flex items-center gap-1.5">
                  <span>Wholesale Trade Inquiry Form</span>
                  <ArrowUpRight className="w-3 h-3 text-ash" />
                </Link>
              </li>
              <li>
                <Link href="/admin/leads" className="text-marigold hover:underline inline-flex items-center gap-1.5 font-mono text-[11px] pt-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Leads Vault (D1 SQL)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact */}
          <div className="lg:col-span-4 space-y-3.5">
            <h4 className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-khadi">
              Surat Office &amp; Floor
            </h4>
            <div className="space-y-2.5 text-xs font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-marigold shrink-0 mt-0.5" />
                <span>1st Floor, Surat Textile Market, Ring Road, Surat, Gujarat 395002</span>
              </div>
              <div className="flex items-center gap-2.5 font-mono">
                <Phone className="w-4 h-4 text-marigold shrink-0" />
                <a href="tel:+919825144001" className="hover:text-haldi transition-colors">
                  +91 98251 44001 / +91 93745 33002
                </a>
              </div>
              <div className="flex items-center gap-2.5 font-mono">
                <Mail className="w-4 h-4 text-marigold shrink-0" />
                <a href="mailto:trade@maasheetla.in" className="hover:text-haldi transition-colors">
                  trade@maasheetla.in
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={waOfficeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-selvedge border border-hairline hover:border-marigold text-haldi font-mono text-xs uppercase tracking-wider rounded-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-marigold" />
                <span>WhatsApp Surat Trading Desk</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-hairline/60 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10.5px] text-ash/80">
          <div>
            &copy; 2010&ndash;{new Date().getFullYear()} Maa Sheetla Agency &amp; Sunrise Tex Fab. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin/leads" className="text-marigold hover:underline flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Admin Portal
            </Link>
            <span>·</span>
            <span>Surat Chamber of Commerce Member</span>
            <span>·</span>
            <span>GST Registered Brokerage</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

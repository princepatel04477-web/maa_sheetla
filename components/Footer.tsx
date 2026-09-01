import React from "react";
import Link from "next/link";
import { MessageCircle, Phone, Mail, MapPin, ArrowUpRight, ShieldCheck } from "lucide-react";
import { createWhatsAppLink } from "../lib/whatsapp";

export default function Footer() {
  const waOfficeUrl = createWhatsAppLink("office trade inquiry");

  return (
    <footer className="bg-selvedge-light border-t border-hairline text-ash pt-16 sm:pt-20 pb-12 px-4 sm:px-8 lg:px-12 relative z-10">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Col 1: Identity & Firm Heritage */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-10 sm:h-12 w-auto border border-marigold/30 bg-selvedge p-1.5 rounded-xs flex items-center shadow-2xs">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logos/maa_sheetla_maroon.png"
                  alt="Maa Sheetla Agency"
                  className="h-full w-auto object-contain"
                />
              </div>
              <div className="h-10 sm:h-12 w-auto border border-marigold/30 bg-selvedge p-1.5 rounded-xs flex items-center shadow-2xs">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logos/sunrise_fab_tex_colored.png"
                  alt="Sunrise Fab Tex Pvt Ltd"
                  className="h-full w-auto object-contain"
                />
              </div>
            </div>

            <div>
              <span className="font-display text-xl text-khadi tracking-tight block leading-tight">
                Maa Sheetla Agency &amp; Sunrise Fab Tex
              </span>
              <span className="text-[10px] font-mono tracking-widest uppercase text-ash font-medium">
                Two Desks · Surat HQ · Kanpur · Ahmedabad
              </span>
            </div>

            <p className="text-xs text-ash leading-relaxed max-w-md font-light">
              Commission brokerage, trade agency, and production quality representation operating continuously on the Surat textile trading floor since 2010. Connecting regional wholesalers with verified Surat mills.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-[10.5px] font-mono uppercase text-marigold font-medium">
              <span className="px-2.5 py-1 bg-selvedge border border-hairline rounded-xs shadow-2xs">EST. 2010</span>
              <span className="px-2.5 py-1 bg-selvedge border border-hairline rounded-xs shadow-2xs">SURAT · KANPUR · AHMEDABAD</span>
              <span className="px-2.5 py-1 bg-selvedge border border-hairline rounded-xs shadow-2xs">70+ TRADE CITIES</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-khadi font-semibold">
              Trade Navigation
            </h4>
            <ul className="space-y-2 text-xs font-light">
              <li>
                <Link href="/firms/maa-sheetla" className="hover:text-marigold transition-colors inline-flex items-center gap-1.5 text-ash">
                  <span>Maa Sheetla Desk (Traditional Fabrics)</span>
                  <ArrowUpRight className="w-3 h-3 text-ash" />
                </Link>
              </li>
              <li>
                <Link href="/firms/sunrise-tex-fab" className="hover:text-marigold transition-colors inline-flex items-center gap-1.5 text-ash">
                  <span>Sunrise Tex Fab (Fancy &amp; Prints)</span>
                  <ArrowUpRight className="w-3 h-3 text-ash" />
                </Link>
              </li>
              <li>
                <Link href="/craft" className="hover:text-marigold transition-colors inline-flex items-center gap-1.5 text-ash">
                  <span>4-Step Physical QC Floor</span>
                  <ArrowUpRight className="w-3 h-3 text-ash" />
                </Link>
              </li>
              <li>
                <Link href="/reach" className="hover:text-marigold transition-colors inline-flex items-center gap-1.5 text-ash">
                  <span>70+ City Logistics Network</span>
                  <ArrowUpRight className="w-3 h-3 text-ash" />
                </Link>
              </li>
              <li>
                <Link href="/partner" className="hover:text-marigold transition-colors inline-flex items-center gap-1.5 text-ash">
                  <span>Wholesale Trade Inquiry Form</span>
                  <ArrowUpRight className="w-3 h-3 text-ash" />
                </Link>
              </li>
              <li>
                <Link href="/admin/leads" className="text-marigold hover:underline inline-flex items-center gap-1.5 font-mono text-[11px] pt-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Leads Vault</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact */}
          <div className="lg:col-span-4 space-y-3.5">
            <h4 className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-khadi font-semibold">
              Surat Office &amp; Trading Floor (HQ)
            </h4>
            <div className="space-y-2.5 text-xs font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-marigold shrink-0 mt-0.5" />
                <span>H-32 India Market, Salabatpura, Ring Road, Surat, Gujarat</span>
              </div>
              <div className="flex items-center gap-2.5 font-mono">
                <Phone className="w-4 h-4 text-marigold shrink-0" />
                <span className="text-khadi font-medium">
                  <a href="tel:+919151003198" className="hover:text-marigold transition-colors">
                    +91 91510 03198
                  </a>
                  {" / "}
                  <a href="tel:+919151060271" className="hover:text-marigold transition-colors">
                    +91 91510 60271
                  </a>
                </span>
              </div>
              <div className="flex flex-col gap-1 font-mono text-[11px]">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-marigold shrink-0" />
                  <a href="mailto:manish@sunrisefabtex.com" className="hover:text-marigold transition-colors">
                    manish@sunrisefabtex.com
                  </a>
                </div>
                <div className="flex items-center gap-2 pl-5.5 text-ash">
                  <a href="mailto:surat@sunrisefabtex.com" className="hover:text-marigold transition-colors">
                    surat@sunrisefabtex.com
                  </a>
                </div>
                <div className="flex items-center gap-2 pl-5.5 text-ash">
                  <a href="mailto:maasheetlaagencyaccinfo@gmail.com" className="hover:text-marigold transition-colors truncate">
                    maasheetlaagencyaccinfo@gmail.com
                  </a>
                </div>
              </div>
              <div className="text-[10.5px] font-mono text-ash pt-1">
                Regional Desks: Kanpur (Shiv Market) · Ahmedabad (New Cloth Market)
              </div>
            </div>

            <div className="pt-2">
              <a
                href={waOfficeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-selvedge border border-hairline hover:border-marigold text-marigold font-mono text-xs uppercase tracking-wider rounded-xs transition-colors shadow-2xs font-medium"
              >
                <MessageCircle className="w-4 h-4 text-marigold" />
                <span>WhatsApp Surat Trading Desk</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-hairline flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10.5px] text-ash">
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

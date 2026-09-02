"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, Menu, X, ArrowUpRight, PhoneCall, Sparkles, MapPin, Building2 } from "lucide-react";
import { createWhatsAppLink } from "../lib/whatsapp";

const NAV_LINKS = [
  { href: "/#firms", label: "Two Desks", sub: "Maa Sheetla & Sunrise Fab Tex", num: "01" },
  { href: "/#operations", label: "Operations", sub: "4-Step Brokerage & QC", num: "02" },
  { href: "/reach", label: "Trade Network", sub: "70+ Connected Trade Cities", num: "03" },
  { href: "/craft", label: "Mill & QC Floor", sub: "Piece-by-Piece Quality Check", num: "04" },
  { href: "/partner", label: "Query Form", sub: "Verified Showroom Onboarding", num: "05" },
  { href: "/contact", label: "Our Offices", sub: "Surat HQ · Kanpur · Ahmedabad", num: "06" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  const waEnquiryUrl = createWhatsAppLink("general wholesale agency trade query");

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-20 sm:h-24 bg-[#FCFBF7] border-b border-hairline shadow-xs transition-colors gpu-layer">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Dual Brand Logos (Maa Sheetla & Sunrise Fab Tex) */}
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2.5 sm:gap-4 group shrink-0 py-1"
            aria-label="Maa Sheetla Agency & Sunrise Fab Tex"
          >
            <div className="h-12 sm:h-16 md:h-17 w-auto flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/maa_sheetla_maroon.png"
                alt="Maa Sheetla Agency"
                className="h-full w-auto object-contain filter drop-shadow-xs group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="h-6 sm:h-8 w-[1px] bg-hairline/80 mx-0.5" />

            <div className="h-10 sm:h-13 md:h-14 w-auto flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/sunrise_fab_tex_cropped.png"
                alt="Sunrise Fab Tex Pvt Ltd"
                className="h-full w-auto object-contain filter drop-shadow-xs group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-mono text-[11.5px] tracking-[0.18em] uppercase transition-colors relative py-1 ${
                    isActive ? "text-marigold font-medium" : "text-ash hover:text-khadi"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-marigold" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <a
              href={waEnquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 border border-kumkum/40 bg-kumkum/10 hover:bg-kumkum text-kumkum hover:text-white font-mono text-[11px] tracking-wider uppercase rounded-xs transition-all duration-200 shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Direct Desk</span>
              <span className="xs:hidden">Enquire</span>
            </a>

            {/* Mobile Hamburger Toggle with high contrast */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2.5 rounded-xs bg-selvedge-light border border-marigold/40 text-khadi hover:text-marigold hover:border-marigold transition-all focus:outline-none shadow-2xs"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5 text-kumkum" />
              ) : (
                <Menu className="w-5 h-5 text-marigold" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Solid Drawer Menu */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-x-0 top-20 sm:top-24 bottom-0 z-50 bg-[#151110] text-[#FAF8F5] border-t border-marigold/30 shadow-2xl flex flex-col justify-between overflow-y-auto p-4 sm:p-6 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="space-y-4">
            {/* Top Invocation & Brand Badge Strip */}
            <div className="flex items-center justify-between px-3 py-2 bg-[#201815] border border-marigold/30 rounded-xs font-mono text-[10px] text-marigold tracking-widest uppercase shadow-2xs">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-marigold animate-pulse" />
                <span>SURAT HQ · KANPUR · AHMEDABAD</span>
              </span>
              <span className="text-[9px] text-[#A67C26]/80">EST. 2010</span>
            </div>

            {/* Dual Firm Quick Cards */}
            <div className="grid grid-cols-2 gap-2.5">
              <Link
                href="/maa-sheetla"
                onClick={() => setMobileOpen(false)}
                className="p-3 rounded-xs bg-gradient-to-br from-[#2D1214] to-[#1D0C0D] border border-[#8B2628]/60 hover:border-marigold transition-all group shadow-sm"
              >
                <div className="font-mono text-[9px] text-[#E0A899] uppercase tracking-wider block font-medium">
                  Firm 01
                </div>
                <div className="font-display text-sm text-[#F7EFE9] group-hover:text-marigold transition-colors font-light">
                  Maa Sheetla
                </div>
                <div className="text-[10px] text-[#D0B8B0] font-light mt-0.5 line-clamp-1">
                  Bridal &amp; Pure Silks
                </div>
              </Link>

              <Link
                href="/sunrise-fab-tex"
                onClick={() => setMobileOpen(false)}
                className="p-3 rounded-xs bg-gradient-to-br from-[#2A1D0E] to-[#1C140A] border border-[#A67C26]/60 hover:border-marigold transition-all group shadow-sm"
              >
                <div className="font-mono text-[9px] text-[#E5C383] uppercase tracking-wider block font-medium">
                  Firm 02
                </div>
                <div className="font-display text-sm text-[#F7EFE9] group-hover:text-marigold transition-colors font-light">
                  Sunrise Fab Tex
                </div>
                <div className="text-[10px] text-[#D8C6A5] font-light mt-0.5 line-clamp-1">
                  Prints &amp; Festive Suits
                </div>
              </Link>
            </div>

            {/* Navigation Links with Numbering and Subtext */}
            <nav className="flex flex-col space-y-1.5 pt-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`p-3 rounded-xs border transition-all flex items-center justify-between ${
                      isActive
                        ? "bg-[#281A16] border-marigold text-marigold shadow-xs"
                        : "bg-[#1E1715]/90 border-[#382B26] hover:border-marigold/60 hover:bg-[#251D1A] text-[#EDE6DF]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[11px] text-marigold/80 font-medium">
                        {link.num}
                      </span>
                      <div>
                        <div className="font-mono text-xs tracking-wider uppercase font-medium">
                          {link.label}
                        </div>
                        <div className="text-[10px] text-[#A69E96] font-light">
                          {link.sub}
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-marigold" />
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom Direct Contact CTAs */}
          <div className="pt-4 mt-4 border-t border-[#382B26] space-y-2.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <a
                href={waEnquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3.5 bg-gradient-to-r from-kumkum to-kumkum-deep hover:brightness-110 text-white font-mono text-xs tracking-widest uppercase rounded-xs transition-all shadow-md min-h-[44px] font-medium border border-marigold/40"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>WhatsApp Surat Desk</span>
              </a>

              <a
                href="tel:+919151003198"
                className="flex items-center justify-center gap-2 px-4 py-3.5 bg-[#231A17] hover:bg-[#2C211D] border border-marigold/40 hover:border-marigold text-[#F7EFE9] font-mono text-xs tracking-widest uppercase rounded-xs transition-all min-h-[44px] font-medium shadow-sm"
              >
                <PhoneCall className="w-4 h-4 text-marigold" />
                <span>Call Surat HQ (+91 91510 03198)</span>
              </a>
            </div>

            <div className="text-center font-mono text-[9.5px] text-[#8C837B] pt-1">
              Commission brokerage &amp; QC operating on Surat floor since 2010
            </div>
          </div>
        </div>
      )}
    </>
  );
}

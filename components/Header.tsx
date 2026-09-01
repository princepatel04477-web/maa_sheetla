"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, Menu, X, ArrowUpRight, PhoneCall, ShieldCheck } from "lucide-react";
import { createWhatsAppLink } from "../lib/whatsapp";

const NAV_LINKS = [
  { href: "/#firms", label: "Two Desks" },
  { href: "/#operations", label: "Operations" },
  { href: "/reach", label: "Trade Network" },
  { href: "/craft", label: "Mill & QC Floor" },
  { href: "/partner", label: "Query Form" },
  { href: "/contact", label: "Our Offices" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const waEnquiryUrl = createWhatsAppLink("general wholesale agency trade query");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 sm:h-24 bg-[#FCFBF7] border-b border-hairline shadow-xs transition-colors gpu-layer">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Dual Brand Logos (Maa Sheetla & Sunrise Fab Tex) */}
        <Link
          href="/"
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
            className="inline-flex items-center gap-2 px-4 py-2 border border-kumkum/40 bg-kumkum/10 hover:bg-kumkum text-kumkum hover:text-white font-mono text-[11px] tracking-wider uppercase rounded-xs transition-all duration-200 shadow-xs"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Direct Desk</span>
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-khadi hover:text-marigold transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6 text-marigold" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#FCFBF7] border-b border-hairline-strong px-5 py-6 space-y-5 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-1 font-mono text-xs tracking-widest uppercase">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 px-3 rounded-xs text-khadi/90 hover:text-marigold hover:bg-selvedge-light border-b border-hairline/50 flex items-center justify-between transition-colors"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-marigold" />
              </Link>
            ))}
          </nav>

          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={waEnquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3.5 bg-kumkum hover:bg-kumkum-deep text-white font-mono text-xs tracking-widest uppercase rounded-xs transition-all shadow-sm min-h-[44px]"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp Surat Desk
            </a>
            <a
              href="tel:+919151003198"
              className="flex items-center justify-center gap-2 px-4 py-3.5 bg-selvedge border border-hairline text-khadi hover:text-marigold font-mono text-xs tracking-widest uppercase rounded-xs min-h-[44px]"
            >
              <PhoneCall className="w-4 h-4 text-marigold" /> Call Office
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

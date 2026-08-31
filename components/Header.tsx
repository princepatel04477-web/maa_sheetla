"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, Menu, X, ArrowUpRight, PhoneCall, ShieldCheck } from "lucide-react";
import { createWhatsAppLink } from "../lib/whatsapp";

const NAV_LINKS = [
  { href: "/#firms", label: "Two Desks" },
  { href: "/#operations", label: "Operations" },
  { href: "/reach", label: "13-City Network" },
  { href: "/craft", label: "Mill & QC Floor" },
  { href: "/partner", label: "Query Form" },
  { href: "/contact", label: "Surat Office" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const waEnquiryUrl = createWhatsAppLink("general wholesale agency trade query");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 sm:h-20 bg-warp/95 backdrop-blur-md border-b border-hairline shadow-md shadow-black/50">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-8 lg:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3.5 group shrink-0">
          <div className="h-10 sm:h-11 w-auto flex items-center justify-center shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logos/maa_sheetla_gold.png"
              alt="Maa Sheetla Agency Logo"
              className="h-9 sm:h-10 w-auto object-contain filter drop-shadow-xs group-hover:scale-105 transition-transform"
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="font-display text-base sm:text-lg tracking-tight text-khadi flex items-center gap-1.5 sm:gap-2 leading-snug whitespace-nowrap">
              <span>Maa Sheetla Agency</span>
              <span className="text-[9px] sm:text-[9.5px] font-mono text-marigold font-normal tracking-widest hidden xs:inline-block">
                · SURAT
              </span>
            </div>
            <div className="text-[8.5px] sm:text-[9.5px] font-mono tracking-[0.12em] uppercase text-ash group-hover:text-haldi transition-colors whitespace-nowrap">
              Sunrise Fab Tex · Est. 2010
            </div>
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
                  isActive ? "text-haldi" : "text-ash hover:text-khadi"
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
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Admin Vault Temporary Button */}
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 border border-marigold/80 bg-selvedge hover:bg-warp text-marigold hover:text-haldi font-mono text-[10px] sm:text-[11px] tracking-wider uppercase rounded-xs transition-all shadow-xs"
            title="Access Client Leads Vault (D1 SQL + Google Sheet)"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-marigold" />
            <span className="font-semibold">Admin Vault</span>
          </Link>

          <a
            href={waEnquiryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 border border-kumkum bg-kumkum/10 hover:bg-kumkum/20 text-haldi font-mono text-[11px] tracking-wider uppercase rounded-xs transition-all duration-200 shadow-sm"
          >
            <MessageCircle className="w-3.5 h-3.5 text-marigold" />
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
        <div className="lg:hidden bg-warp/98 backdrop-blur-xl border-b border-hairline px-5 py-6 space-y-5 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-1 font-mono text-xs tracking-widest uppercase">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 px-3 rounded-xs text-khadi/90 hover:text-haldi hover:bg-selvedge/80 border-b border-hairline/30 flex items-center justify-between transition-colors"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-marigold" />
              </Link>
            ))}

            {/* Mobile Admin Link */}
            <Link
              href="/admin/leads"
              onClick={() => setMobileOpen(false)}
              className="py-3 px-3 rounded-xs text-marigold bg-selvedge border border-marigold/40 flex items-center justify-between transition-colors font-semibold mt-2"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-marigold" />
                <span>Admin Leads Vault (D1 DB)</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-marigold" />
            </Link>
          </nav>

          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={waEnquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3.5 bg-kumkum hover:bg-kumkum-deep text-white font-mono text-xs tracking-widest uppercase rounded-xs transition-all shadow-agency-card min-h-[44px]"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp Surat Desk
            </a>
            <a
              href="tel:+919825144001"
              className="flex items-center justify-center gap-2 px-4 py-3.5 bg-selvedge border border-hairline text-khadi font-mono text-xs tracking-widest uppercase rounded-xs min-h-[44px]"
            >
              <PhoneCall className="w-4 h-4 text-marigold" /> Call Office
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

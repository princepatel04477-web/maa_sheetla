"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, Menu, X, ArrowUpRight } from "lucide-react";
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
    <header className="fixed top-0 left-0 right-0 z-50 h-20 bg-warp/95 backdrop-blur-md border-b border-hairline shadow-md shadow-black/50">
      <div className="max-w-7xl mx-auto h-full px-6 sm:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 border border-marigold/60 bg-selvedge flex items-center justify-center font-display text-sm text-haldi group-hover:border-marigold transition-colors rounded-xs shadow-inner">
            MS
          </div>
          <div>
            <div className="font-display text-lg tracking-tight text-khadi flex items-center gap-2 leading-snug">
              <span>Maa Sheetla Agency</span>
              <span className="text-[9.5px] font-mono text-marigold font-normal tracking-widest hidden sm:inline-block">
                · SURAT
              </span>
            </div>
            <div className="text-[9.5px] font-mono tracking-[0.22em] uppercase text-ash group-hover:text-haldi transition-colors">
              Wholesale Textile Agency · Est. 2010
            </div>
          </div>
        </Link>

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

        <div className="flex items-center gap-3">
          <a
            href={waEnquiryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 border border-kumkum bg-kumkum/10 hover:bg-kumkum/20 text-haldi font-mono text-[11px] tracking-wider uppercase rounded-xs transition-all duration-200 shadow-sm"
          >
            <MessageCircle className="w-3.5 h-3.5 text-marigold" />
            <span>Direct Agency Desk</span>
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-khadi hover:text-marigold transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-warp border-b border-hairline px-6 py-6 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-3 font-mono text-xs tracking-widest uppercase">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-2 text-khadi/80 hover:text-haldi border-b border-hairline/40 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-marigold" />
              </Link>
            ))}
          </nav>
          <div className="pt-2">
            <a
              href={waEnquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-kumkum text-white font-mono text-xs tracking-widest uppercase rounded-xs"
            >
              <MessageCircle className="w-4 h-4" /> Message Agency Desk
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

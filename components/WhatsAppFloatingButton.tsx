"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { createWhatsAppLink } from "../lib/whatsapp";

export default function WhatsAppFloatingButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.35);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const waUrl = createWhatsAppLink("inquiry on wholesale lots and trade booking terms");

  if (!visible) return null;

  return (
    <aside
      aria-label="Direct Wholesale Agency Contact"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2"
    >
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Connect with Maa Sheetla Surat Agency Desk on WhatsApp"
        className="group relative flex items-center gap-3 px-4 py-3 bg-warp/95 backdrop-blur-md border border-kumkum hover:border-marigold text-khadi hover:text-haldi shadow-agency-card rounded-xs transition-all duration-300 hover:scale-[1.02]"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-marigold opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-kumkum" />
        </span>

        <div className="text-left font-mono">
          <div className="text-[10px] tracking-[0.18em] uppercase text-marigold font-medium flex items-center gap-1">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Surat Agency Desk</span>
          </div>
          <div className="text-[9px] text-ash tracking-wider">Direct Wholesale WhatsApp</div>
        </div>
      </a>
    </aside>
  );
}

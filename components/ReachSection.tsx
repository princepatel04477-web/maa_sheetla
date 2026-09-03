"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronRight, Search, X, MapPin, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import IndiaReachMap, { ALL_REACH_NODES } from "./IndiaReachMap";
import { MOTION } from "../lib/motion";
import { createWhatsAppLink } from "../lib/whatsapp";

const REGION_TABS = [
  { id: "all", label: "All Hubs" },
  { id: "up", label: "Uttar Pradesh" },
  { id: "bihar-jharkhand", label: "Bihar & Jharkhand" },
  { id: "ncr-north", label: "NCR & North" },
  { id: "central-south", label: "Central & Others" },
];

const TAB_INDICATOR_ID = "reach-tab-indicator";

export default function ReachSection() {
  const [activeCityId, setActiveCityId] = useState<string | null>("delhi");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const listRef = useRef<HTMLDivElement>(null);

  const filteredCities = useMemo(() => {
    let list = ALL_REACH_NODES;

    if (activeTab === "up") {
      list = list.filter((c) => c.stateId === "uttar-pradesh");
    } else if (activeTab === "bihar-jharkhand") {
      list = list.filter((c) => c.stateId === "bihar" || c.stateId === "jharkhand");
    } else if (activeTab === "ncr-north") {
      list = list.filter((c) => c.stateId === "delhi" || c.stateId === "punjab");
    } else if (activeTab === "central-south") {
      list = list.filter(
        (c) =>
          c.stateId === "madhya-pradesh" ||
          c.stateId === "rajasthan" ||
          c.stateId === "chhattisgarh" ||
          c.stateId === "gujarat"
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.region.toLowerCase().includes(q) ||
          c.hub.toLowerCase().includes(q)
      );
    }

    return list;
  }, [activeTab, searchQuery]);

  const isFirstRender = useRef(true);

  // Scroll active city into view ONLY within ledger list container (zero window scroll)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!activeCityId || !listRef.current) return;
    const activeBtn = listRef.current.querySelector(
      `[data-city-id="${activeCityId}"]`
    ) as HTMLElement | null;
    if (activeBtn && listRef.current) {
      const containerTop = listRef.current.getBoundingClientRect().top;
      const btnTop = activeBtn.getBoundingClientRect().top;
      const relativeTop = btnTop - containerTop + listRef.current.scrollTop;
      listRef.current.scrollTo({ top: Math.max(0, relativeTop - 20), behavior: "smooth" });
    }
  }, [activeCityId]);

  const itemVariants = {
    hidden: { opacity: 0, y: 6 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: MOTION.dur.base,
        ease: MOTION.ease.outExpo,
        delay: Math.min(i * 0.04, 0.32),
      },
    }),
    exit: { opacity: 0, transition: { duration: 0.12 } },
  };

  return (
    <section id="reach" className="w-full py-24 sm:py-32 px-6 sm:px-12 bg-warp relative content-auto">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14 items-end">
          <div className="lg:col-span-8 space-y-3">
            <p className="eyebrow">02 — THE REACH</p>
            <h2 className="font-display text-4xl sm:text-6xl text-khadi font-light tracking-tight leading-[0.95]">
              Threads that travel <i className="italic text-haldi">farther.</i>
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-sm text-ash font-light leading-relaxed">
              From our Surat floor, consolidated trade corridors connect to 70+ wholesale centers across 10
              states. Every node on this map represents an active counter relationship.
            </p>
          </div>
        </div>

        {/* Interactive Layout: Map on left (60%), Ledger on right (40%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-selvedge border border-hairline p-6 sm:p-10 rounded-sm shadow-sm">
          {/* Map Container */}
          <div className="lg:col-span-7 flex flex-col justify-center items-center py-2 lg:sticky lg:top-28">
            <IndiaReachMap
              activeId={activeCityId}
              onActiveChange={setActiveCityId}
              className="w-full max-w-[620px]"
            />
            <div className="mt-3 text-center">
              <span className="font-mono text-[10.5px] text-ash tracking-widest uppercase">
                Tap any node to inspect its dispatch corridor
              </span>
            </div>
          </div>

          {/* City Ledger Container (Searchable & Filterable) */}
          <div className="lg:col-span-5 space-y-4 lg:border-l lg:border-hairline lg:pl-8">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-ash font-mono text-[10px] tracking-[0.2em] uppercase border-b border-hairline pb-2.5">
                <span>Active Network ({filteredCities.length} Cities)</span>
                <span>Corridor / Since</span>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-ash absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search city (e.g. Gonda, Bhadohi, Daltonganj)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-9 py-3 min-h-[44px] bg-selvedge-light border border-hairline rounded-xs text-base sm:text-xs font-mono text-khadi placeholder:text-ash/60 focus:outline-none focus:border-marigold focus-visible:ring-2 focus-visible:ring-marigold/60 transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    aria-label="Clear search"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-1 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-ash hover:text-khadi"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Region Filter Chips — layoutId sliding indicator */}
              <div className="flex flex-wrap gap-1.5 pt-1 relative">
                {REGION_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative px-3 py-2 min-h-[44px] text-[10px] font-mono uppercase tracking-wider rounded-xs border transition-colors ${
                      activeTab === tab.id
                        ? "text-white border-marigold font-medium shadow-2xs"
                        : "bg-selvedge-light text-ash border-hairline hover:border-marigold/40 hover:text-khadi"
                    }`}
                  >
                    {activeTab === tab.id && (
                      <motion.span
                        layoutId={TAB_INDICATOR_ID}
                        className="absolute inset-0 bg-marigold rounded-xs"
                        transition={{ duration: MOTION.dur.base, ease: MOTION.ease.outExpo }}
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable City Ledger List with AnimatePresence stagger */}
            <div
              ref={listRef}
              className="space-y-1.5 lg:max-h-[440px] lg:overflow-y-auto overscroll-contain pr-1"
            >
              <AnimatePresence mode="popLayout">
                {filteredCities.map((city, idx) => {
                  const isActive = activeCityId === city.id;
                  return (
                    <motion.button
                      key={city.id}
                      data-city-id={city.id}
                      layout
                      custom={idx}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      onClick={() => setActiveCityId(city.id)}
                      onMouseEnter={() => setActiveCityId(city.id)}
                      onFocus={() => setActiveCityId(city.id)}
                      className={`w-full text-left p-2.5 sm:p-3 border transition-all duration-200 flex items-center justify-between group rounded-sm ${
                        isActive
                          ? "bg-selvedge-light border-marigold shadow-xs"
                          : "bg-transparent border-hairline/40 hover:border-hairline hover:bg-selvedge-light/60"
                      }`}
                    >
                      <div className="space-y-0.5 pr-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[9px] text-ash">
                            {idx < 9 ? `0${idx + 1}` : idx + 1}
                          </span>
                          <span
                            className={`font-display text-base sm:text-lg transition-colors ${
                              isActive ? "text-kumkum font-normal" : "text-khadi group-hover:text-marigold font-light"
                            }`}
                          >
                            {city.name}
                          </span>
                          {city.isPrimary && (
                            <span className="text-[8.5px] font-mono px-1.5 py-0.5 bg-marigold/10 text-marigold border border-marigold/30 rounded-2xs uppercase">
                              Hub
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] sm:text-[10.5px] text-ash font-light line-clamp-1">
                          {city.region} · {city.hub}
                        </p>
                      </div>

                      <div className="text-right flex items-center gap-2 shrink-0">
                        <div>
                          <div className="font-mono text-[11px] text-marigold font-medium">
                            {city.since ? `Since ${city.since}` : "Direct Dispatch"}
                          </div>
                          <div className="font-mono text-[8.5px] text-ash tracking-widest uppercase">
                            Verified
                          </div>
                        </div>
                        <ChevronRight
                          className={`w-3.5 h-3.5 transition-transform ${
                            isActive ? "text-marigold translate-x-0.5" : "text-ash/50 group-hover:text-ash"
                          }`}
                        />
                      </div>
                    </motion.button>
                  );
                })}
              </AnimatePresence>

              {filteredCities.length === 0 && (
                <div className="p-5 bg-selvedge/95 border border-marigold/30 rounded-xs text-center space-y-3.5 my-2 shadow-2xs">
                  <div className="w-10 h-10 mx-auto rounded-full bg-marigold/10 border border-marigold/30 flex items-center justify-center text-marigold shadow-2xs">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="space-y-1.5">
                    <span className="font-mono text-[9.5px] text-marigold tracking-[0.2em] uppercase font-medium block">
                      Active Expansion Corridor
                    </span>
                    <h4 className="font-display text-lg sm:text-xl text-khadi font-light leading-snug">
                      We would like to join you in {searchQuery.trim() || "your city"}!
                    </h4>
                    <p className="text-xs text-ash font-light max-w-sm mx-auto leading-relaxed">
                      Your city is part of our upcoming trade expansion. Register your showroom to become our verified stockist and secure direct Surat mill dispatches.
                    </p>
                  </div>
                  <div className="pt-1 flex flex-col sm:flex-row items-center justify-center gap-2">
                    <Link
                      href={searchQuery.trim() ? `/partner?city=${encodeURIComponent(searchQuery.trim())}` : "/partner"}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-kumkum hover:bg-kumkum-deep text-white font-mono text-xs uppercase tracking-wider rounded-xs transition-all font-medium shadow-xs min-h-[42px]"
                    >
                      <span>Trade Query Form</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                    <a
                      href={createWhatsAppLink(`inquiring about expanding wholesale trade desk to ${searchQuery.trim() || "our city"}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 bg-selvedge-light hover:bg-selvedge border border-hairline hover:border-marigold text-khadi hover:text-marigold font-mono text-xs uppercase tracking-wider rounded-xs transition-all font-medium min-h-[42px]"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>WhatsApp Desk</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Network Total Ledger Footnote */}
            <div className="pt-4 border-t border-hairline flex items-center justify-between font-mono text-xs">
              <span className="text-ash tracking-[0.2em] uppercase text-[10px]">
                Total Network Scope
              </span>
              <span className="font-display text-2xl text-marigold font-light">
                70+ <i className="text-xs font-mono text-ash not-italic font-normal">Cities</i>
              </span>
            </div>

            <div className="pt-1">
              <Link
                href="/reach"
                className="inline-flex items-center gap-2 py-3 min-h-[44px] text-[11px] font-mono tracking-[0.2em] uppercase text-marigold hover:text-kumkum transition-colors font-medium"
              >
                <span>Full Transit Logistics &amp; Timelines</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

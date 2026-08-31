"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronRight, MapPin } from "lucide-react";
import IndiaReachMap, { ALL_REACH_NODES, DEFAULT_ORIGIN } from "./IndiaReachMap";

const CITIES_LIST = [
  { id: "delhi", name: "Delhi NCR", region: "Delhi", counters: 85, since: 2013, hub: "Chandni Chowk & Karol Bagh" },
  { id: "varanasi", name: "Varanasi", region: "Uttar Pradesh", counters: 55, since: 2012, hub: "Chowk & Godowlia" },
  { id: "patna", name: "Patna", region: "Bihar", counters: 50, since: 2015, hub: "Hathwa Market & Bakarganj" },
  { id: "jaipur", name: "Jaipur", region: "Rajasthan", counters: 45, since: 2014, hub: "Johari Bazaar & Bapu Bazaar" },
  { id: "indore", name: "Indore", region: "Madhya Pradesh", counters: 45, since: 2013, hub: "MT Cloth Market & Rajwada" },
  { id: "ludhiana", name: "Ludhiana", region: "Punjab", counters: 40, since: 2016, hub: "Chaura Bazaar & Ghumar Mandi" },
  { id: "bhopal", name: "Bhopal", region: "Madhya Pradesh", counters: 40, since: 2014, hub: "New Market & Chowk" },
  { id: "raipur", name: "Raipur", region: "Chhattisgarh", counters: 35, since: 2017, hub: "Pandri Cloth Market & Malviya Rd" },
  { id: "ranchi", name: "Ranchi", region: "Jharkhand", counters: 35, since: 2016, hub: "Upper Bazaar & Main Road" },
  { id: "meerut", name: "Meerut", region: "Uttar Pradesh", counters: 30, since: 2013, hub: "Abu Lane & Valley Bazaar" },
  { id: "muzaffarnagar", name: "Muzaffarnagar", region: "Uttar Pradesh", counters: 25, since: 2015, hub: "Bhagat Singh Market & Roorkee Rd" },
  { id: "dhanbad", name: "Dhanbad", region: "Jharkhand", counters: 25, since: 2018, hub: "Bank More & Purana Bazaar" },
  { id: "surat", name: "Surat & Gujarat", region: "Gujarat (Origin)", counters: 60, since: 2010, hub: "Ring Road Market & Loom Floor" },
];

export default function ReachSection() {
  const [activeCityId, setActiveCityId] = useState<string | null>("delhi");

  return (
    <section id="reach" className="w-full py-24 sm:py-32 px-6 sm:px-12 bg-warp relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-end">
          <div className="lg:col-span-8 space-y-3">
            <p className="eyebrow">02 — THE REACH</p>
            <h2 className="font-display text-4xl sm:text-6xl text-khadi font-light tracking-tight leading-[0.95]">
              Threads that travel <i className="italic text-haldi">farther.</i>
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-sm text-ash font-light leading-relaxed">
              From our Surat floor, trade corridors run to 13 wholesale centers across 9 states. Every
              point on this map is an active boutique partnership.
            </p>
          </div>
        </div>

        {/* Interactive Layout: Map on left (60%), Ledger on right (40%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-selvedge/50 border border-hairline p-6 sm:p-10 rounded-sm">
          {/* Map Container */}
          <div className="lg:col-span-7 flex justify-center items-center py-2 sticky top-28">
            <IndiaReachMap
              activeId={activeCityId}
              onActiveChange={setActiveCityId}
              className="w-full max-w-[620px]"
            />
          </div>

          {/* City Ledger Container (Scrollable) */}
          <div className="lg:col-span-5 space-y-4 lg:border-l lg:border-hairline lg:pl-8">
            <div className="border-b border-hairline pb-3 flex items-center justify-between text-ash font-mono text-[10px] tracking-[0.2em] uppercase">
              <span>All 13 Trade Hubs</span>
              <span>Network / Since</span>
            </div>

            <div className="space-y-1.5 max-h-[460px] overflow-y-auto pr-1">
              {CITIES_LIST.map((city, idx) => {
                const isActive = activeCityId === city.id;
                return (
                  <button
                    key={city.id}
                    onClick={() => setActiveCityId(city.id)}
                    onMouseEnter={() => setActiveCityId(city.id)}
                    onFocus={() => setActiveCityId(city.id)}
                    className={`w-full text-left p-3 border transition-all duration-200 flex items-center justify-between group rounded-sm ${
                      isActive
                        ? "bg-selvedge border-marigold shadow-md shadow-marigold/5"
                        : "bg-transparent border-hairline/40 hover:border-hairline hover:bg-selvedge/40"
                    }`}
                  >
                    <div className="space-y-0.5 pr-2">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-[9px] text-ash">
                          {idx < 9 ? `0${idx + 1}` : idx + 1}
                        </span>
                        <span
                          className={`font-display text-lg transition-colors ${
                            isActive ? "text-haldi font-normal" : "text-khadi group-hover:text-haldi font-light"
                          }`}
                        >
                          {city.name}
                        </span>
                      </div>
                      <p className="text-[10.5px] text-ash font-light line-clamp-1">
                        {city.region} · {city.hub}
                      </p>
                    </div>

                    <div className="text-right flex items-center gap-2.5 shrink-0">
                      <div>
                        <div className="font-mono text-xs text-marigold font-medium">
                          Since {city.since}
                        </div>
                        <div className="font-mono text-[9px] text-ash tracking-widest uppercase">
                          Active Hub
                        </div>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${
                          isActive ? "text-marigold translate-x-0.5" : "text-ash/50 group-hover:text-ash"
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Network Total Ledger Footnote */}
            <div className="pt-4 border-t border-hairline flex items-center justify-between font-mono text-xs">
              <span className="text-ash tracking-[0.2em] uppercase text-[10px]">
                Total Network Volume
              </span>
              <span className="font-display text-2xl text-haldi font-light">
                570+ <i className="text-xs font-mono text-ash not-italic font-normal">Counters</i>
              </span>
            </div>

            <div className="pt-1">
              <Link
                href="/reach"
                className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.2em] uppercase text-marigold hover:text-haldi transition-colors"
              >
                View Full 13-City Logistics Schedule <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

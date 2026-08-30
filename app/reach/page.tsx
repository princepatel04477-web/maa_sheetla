"use client";

import React, { useState } from "react";
import IndiaReachMap from "../../components/IndiaReachMap";
import ThreadsBackground from "../../components/react-bits/ThreadsBackground";
import { ArrowUpRight, Truck, Building2, Calendar } from "lucide-react";
import { createWhatsAppLink } from "../../lib/whatsapp";

const REGIONAL_HUBS = [
  {
    id: "delhi",
    city: "Delhi NCR",
    state: "Delhi NCR",
    counters: 85,
    since: 2013,
    transitTime: "36 – 48 Hours via Dedicated Express Cargo",
    markets: "Chandni Chowk, Karol Bagh, Lajpat Nagar, Shahpur Jat",
    notes: "High demand for pure organza sarees and heavy bridal velvet lehengas during Q3/Q4 wedding cycles.",
  },
  {
    id: "varanasi",
    city: "Varanasi",
    state: "Uttar Pradesh",
    counters: 55,
    since: 2012,
    transitTime: "40 – 48 Hours Direct Rail & Road Freight",
    markets: "Chowk, Godowlia, Thatheri Bazaar",
    notes: "Signature demand for kadwa cutwork georgettes and tissue kanjivaram weaves.",
  },
  {
    id: "patna",
    city: "Patna",
    state: "Bihar",
    counters: 50,
    since: 2015,
    transitTime: "42 – 50 Hours Dedicated Eastern Corridor",
    markets: "Hathwa Market, Bakarganj, Khetan Super Market",
    notes: "Fast volume turnover in festive sarees and ready-to-wear sharara garments.",
  },
  {
    id: "jaipur",
    city: "Jaipur",
    state: "Rajasthan",
    counters: 45,
    since: 2014,
    transitTime: "24 – 36 Hours Direct Freight",
    markets: "Johari Bazaar, Bapu Bazaar, MI Road Boutiques",
    notes: "Strong seasonal appetite for gota patti suits, chanderi silks, and bandhani fusion designs.",
  },
  {
    id: "indore",
    city: "Indore",
    state: "Madhya Pradesh",
    counters: 45,
    since: 2013,
    transitTime: "20 – 24 Hours Overnight Express",
    markets: "MT Cloth Market, Rajwada, Sitlamata Bazaar",
    notes: "High volume daily turnover in cambric cottons, dola silk prints, and party kurtis.",
  },
  {
    id: "ludhiana",
    city: "Ludhiana",
    state: "Punjab",
    counters: 40,
    since: 2016,
    transitTime: "48 Hours Direct Logistics",
    markets: "Chaura Bazaar, Ghumar Mandi, Mall Road",
    notes: "High-ticket velvet winter suits, heavily embellished bridal lehengas, and silk dupattas.",
  },
  {
    id: "bhopal",
    city: "Bhopal",
    state: "Madhya Pradesh",
    counters: 40,
    since: 2014,
    transitTime: "24 – 30 Hours West-Central Freight",
    markets: "New Market, Chowk Bazaar, 10 No. Market",
    notes: "Preferred hub for printed sangeet lehengas and chanderi silk ensembles.",
  },
  {
    id: "raipur",
    city: "Raipur",
    state: "Chhattisgarh",
    counters: 35,
    since: 2017,
    transitTime: "36 – 42 Hours Express Route",
    markets: "Pandri Cloth Market, Malviya Road, Sadar Bazaar",
    notes: "Emerging high-margin market for bridal lehengas and festive saree collections.",
  },
  {
    id: "ranchi",
    city: "Ranchi",
    state: "Jharkhand",
    counters: 35,
    since: 2016,
    transitTime: "44 – 50 Hours Direct Freight",
    markets: "Upper Bazaar, Main Road, Lalpur",
    notes: "Consistent boutique demand for designer silk sarees and embroidered suit sets.",
  },
  {
    id: "meerut",
    city: "Meerut",
    state: "Uttar Pradesh",
    counters: 30,
    since: 2013,
    transitTime: "38 – 44 Hours NCR Transit",
    markets: "Abu Lane, Valley Bazaar, Central Market",
    notes: "High demand for fast-turnover cambric cotton suits and festive tissue sarees.",
  },
  {
    id: "muzaffarnagar",
    city: "Muzaffarnagar",
    state: "Uttar Pradesh",
    counters: 25,
    since: 2015,
    transitTime: "40 – 48 Hours UP West Freight",
    markets: "Bhagat Singh Market, Roorkee Road, Shiv Chowk",
    notes: "Reliable partner counters for volume saree packs and seasonal wedding suits.",
  },
  {
    id: "dhanbad",
    city: "Dhanbad",
    state: "Jharkhand",
    counters: 25,
    since: 2018,
    transitTime: "48 – 52 Hours Eastern Rail & Road Cargo",
    markets: "Bank More, Purana Bazaar, Hirapur",
    notes: "Rapidly expanding boutique presence for festive lehengas and party wear.",
  },
  {
    id: "surat",
    city: "Surat (Origin)",
    state: "Gujarat",
    counters: 60,
    since: 2010,
    transitTime: "Same Day / Immediate Floor Collection",
    markets: "Ring Road Market, Millennium Textile Market, Sahara Gate",
    notes: "Loom origins, centralized quality audit floor, sample showroom, and regional dealer pickup hub.",
  },
];

export default function ReachPage() {
  const [selectedHub, setSelectedHub] = useState<string | null>("delhi");
  const waUrl = createWhatsAppLink("network delivery times and local counter reference");

  return (
    <div className="min-h-screen pt-36 pb-28 px-6 sm:px-12 bg-warp relative">
      <ThreadsBackground />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <p className="eyebrow">NETWORK &amp; TRADE CORRIDORS</p>
          <h1 className="font-display text-4xl sm:text-6xl text-khadi font-light tracking-tight leading-[0.95]">
            570+ counters across <i className="italic text-haldi">13 primary trade hubs.</i>
          </h1>
          <p className="text-sm sm:text-base text-ash font-light leading-relaxed">
            Our trade network connects our Surat loom floor directly to India's most established retail
            and bridal markets. Explore transit logistics and counter distributions below.
          </p>
        </div>

        {/* Interactive Map Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-6 sm:p-10 bg-selvedge border border-hairline rounded-sm">
          <div className="lg:col-span-7 flex justify-center">
            <IndiaReachMap
              activeId={selectedHub}
              onActiveChange={setSelectedHub}
              className="w-full max-w-[620px]"
            />
          </div>

          <div className="lg:col-span-5 space-y-6 lg:border-l lg:border-hairline lg:pl-8">
            <div className="space-y-2">
              <span className="font-mono text-[10px] tracking-[0.2em] text-marigold uppercase">
                Active Corridor Focus
              </span>
              <h2 className="font-display text-3xl text-khadi">
                {REGIONAL_HUBS.find((h) => h.id === selectedHub)?.city || "Select a City Node"}
              </h2>
            </div>

            {selectedHub && (
              <div className="space-y-4 font-mono text-xs text-ash">
                <div className="flex items-center gap-2 text-khadi">
                  <Building2 className="w-4 h-4 text-marigold" />
                  <span>
                    Counters: <strong>{REGIONAL_HUBS.find((h) => h.id === selectedHub)?.counters}</strong> active boutiques
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-ash" />
                  <span>Supplying since: {REGIONAL_HUBS.find((h) => h.id === selectedHub)?.since}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Truck className="w-4 h-4 text-ash shrink-0 mt-0.5" />
                  <span>{REGIONAL_HUBS.find((h) => h.id === selectedHub)?.transitTime}</span>
                </div>
                <div className="p-3 bg-warp border border-hairline text-[11px] leading-relaxed text-khadi/85">
                  <strong className="text-haldi block mb-1">Key Markets Supplied:</strong>
                  {REGIONAL_HUBS.find((h) => h.id === selectedHub)?.markets}
                </div>
              </div>
            )}

            <div className="pt-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-kumkum/15 hover:bg-kumkum/25 text-haldi border border-kumkum font-mono text-xs tracking-wider uppercase rounded-sm transition-all"
              >
                Inquire for Your Market Corridor <ArrowUpRight className="w-3.5 h-3.5 text-marigold" />
              </a>
            </div>
          </div>
        </div>

        {/* City Breakdown Deep-Dive Cards */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-hairline pb-4">
            <h3 className="font-display text-3xl text-khadi font-light">
              All 13 City Hubs &amp; Regional Counter Data
            </h3>
            <span className="font-mono text-xs text-ash tracking-wider uppercase">
              13 Cities · 9 States
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REGIONAL_HUBS.map((hub) => (
              <div
                key={hub.id}
                onClick={() => setSelectedHub(hub.id)}
                className={`p-6 border transition-all cursor-pointer rounded-sm flex flex-col justify-between ${
                  selectedHub === hub.id
                    ? "bg-selvedge border-marigold shadow-lg shadow-marigold/5"
                    : "bg-selvedge/60 border-hairline hover:border-hairline-strong"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-display text-2xl text-khadi">{hub.city}</span>
                    <span className="font-mono text-xs text-marigold font-medium">
                      {hub.counters} Counters
                    </span>
                  </div>
                  <p className="font-mono text-[10px] text-ash mb-2 uppercase">{hub.state} · Since {hub.since}</p>
                  <p className="text-xs text-khadi/80 font-light leading-relaxed mb-4">
                    {hub.notes}
                  </p>
                </div>
                <div className="text-[10px] font-mono text-ash/80 border-t border-hairline/60 pt-3">
                  <strong>Transit:</strong> {hub.transitTime}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

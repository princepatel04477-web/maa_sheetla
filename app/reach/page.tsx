import React from "react";
import Link from "next/link";
import ThreadsBackground from "../../components/react-bits/ThreadsBackground";
import BlurText from "../../components/react-bits/BlurText";
import ShinyText from "../../components/react-bits/ShinyText";
import SpotlightCard from "../../components/react-bits/SpotlightCard";
import IndiaReachMap from "../../components/IndiaReachMap";
import { ArrowUpRight, MessageCircle, MapPin, Clock, Truck } from "lucide-react";
import { createWhatsAppLink } from "../../lib/whatsapp";

export const metadata = {
  title: "13-City Wholesale Network · Maa Sheetla Agency",
  description: "Direct Surat powerloom dispatch network across 9 states and 13 major trade hubs.",
};

const HUBS = [
  { city: "Surat (Looms & Trading Floor)", state: "Gujarat", transit: "Same-day Packing", role: "Primary Milling & Brokerage Floor" },
  { city: "Delhi NCR (Chandni Chowk & Karol Bagh)", state: "Delhi", transit: "24–36 hrs Rail Freight", role: "High-Volume Bridal & Wholesale Despatch" },
  { city: "Varanasi (Chowk & Kunj Gali)", state: "Uttar Pradesh", transit: "36–48 hrs Direct Cargo", role: "Silk Weave Exchange & Brocade Trade" },
  { city: "Patna (Machharhatta & Hathwa Market)", state: "Bihar", transit: "48 hrs Parcel Express", role: "Eastern Regional Distribution" },
  { city: "Jaipur (Johari & Purohit Ji Ka Katla)", state: "Rajasthan", transit: "24 hrs Road Cargo", role: "Bandhej & Leheriya Silk Corridor" },
  { city: "Indore (MT Cloth Market & Sitlamata)", state: "Madhya Pradesh", transit: "24 hrs Overnight Rail", role: "Central India Wholesale Node" },
  { city: "Ludhiana (AC Market & Chaura Bazaar)", state: "Punjab", transit: "36–48 hrs Express", role: "Northern Festive Suit Assortments" },
  { city: "Bhopal (Bairagarh Cloth Market)", state: "Madhya Pradesh", transit: "24–36 hrs Cargo", role: "Malwa & Bundelkhand Retail Supply" },
  { city: "Raipur (Pandri Cloth Market)", state: "Chhattisgarh", transit: "36 hrs Direct Transit", role: "Mining & Industrial Belt Supply" },
  { city: "Ranchi (Upper Bazaar)", state: "Jharkhand", transit: "48 hrs Parcel", role: "Chhota Nagpur Plateau Hub" },
  { city: "Meerut (Kaiser Ganj & Valley Bazaar)", state: "Uttar Pradesh", transit: "36 hrs Rail", role: "Western UP Retail Counters" },
  { city: "Muzaffarnagar (Bhagwan Market)", state: "Uttar Pradesh", transit: "36 hrs Rail", role: "Sugar Belt Festive Counters" },
  { city: "Dhanbad (Purana Bazaar)", state: "Jharkhand", transit: "48 hrs Parcel", role: "Coalfield Retail Trade Center" },
];

export default function ReachPage() {
  const waUrl = createWhatsAppLink("freight timing and agency representation inquiry");

  return (
    <div className="min-h-screen pt-28 sm:pt-36 pb-20 px-4 sm:px-8 lg:px-12 bg-warp relative">
      <ThreadsBackground />

      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 relative z-10">
        {/* Header */}
        <div className="space-y-3.5 max-w-3xl">
          <div className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px] tracking-[0.22em] text-marigold uppercase">
            <span>DISPATCH LOGISTICS &amp; TRANSIT TIMES</span>
            <span>·</span>
            <ShinyText text="9 STATES · 13 HUBS" />
          </div>
          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl text-khadi font-light tracking-tight leading-[0.95]">
            <BlurText text="The 13-City Wholesale Trade Corridor." />
          </h1>
          <p className="text-xs sm:text-base text-ash font-light leading-relaxed">
            Consolidated 48-hour freight dispatches from our Surat trading floor to over 570 verified
            boutique and showroom counters across North &amp; Central India.
          </p>
        </div>

        {/* Map View */}
        <div className="p-4 sm:p-8 bg-selvedge border border-hairline rounded-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-hairline pb-4">
            <h2 className="font-display text-xl sm:text-2xl text-khadi font-light flex items-center gap-2">
              <MapPin className="w-4 h-4 text-marigold" /> Active Trade Corridors
            </h2>
            <span className="font-mono text-xs text-ash">Interactive Regional Connectivity</span>
          </div>
          <div className="w-full max-w-2xl mx-auto py-2">
            <IndiaReachMap />
          </div>
        </div>

        {/* Hubs Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-hairline pb-4">
            <h2 className="font-display text-2xl sm:text-3xl text-khadi font-light">
              Trade Hub Directory &amp; Timelines
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {HUBS.map((hub, idx) => (
              <SpotlightCard key={hub.city} className="p-5 sm:p-6 bg-selvedge border-hairline rounded-sm space-y-3">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-marigold font-display text-xl font-light">0{idx + 1}</span>
                  <span className="text-haldi text-[9.5px] border border-hairline px-2 py-0.5 bg-warp uppercase">
                    {hub.state}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-lg sm:text-xl text-khadi font-light">{hub.city}</h3>
                  <p className="text-xs text-ash font-light mt-1">{hub.role}</p>
                </div>
                <div className="pt-2 border-t border-hairline flex items-center gap-2 font-mono text-[10.5px] text-marigold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{hub.transit}</span>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="p-6 sm:p-10 bg-selvedge border border-hairline rounded-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="font-display text-2xl text-khadi">Ready to source in your city?</h3>
            <p className="text-xs sm:text-sm text-ash font-light">
              Connect directly with our Surat dispatch desk to lock exclusive territorial slots.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-kumkum text-white font-mono text-xs tracking-widest uppercase rounded-xs transition-all shadow-agency-card min-h-[44px]"
            >
              <MessageCircle className="w-4 h-4" /> Message Desk
            </a>
            <Link
              href="/partner"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-warp border border-hairline text-khadi hover:text-haldi font-mono text-xs tracking-widest uppercase rounded-xs min-h-[44px]"
            >
              Submit Query Form <ArrowUpRight className="w-4 h-4 text-marigold" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import Link from "next/link";
import ThreadsBackground from "../../components/react-bits/ThreadsBackground";
import BlurText from "../../components/react-bits/BlurText";
import ShinyText from "../../components/react-bits/ShinyText";
import SpotlightCard from "../../components/react-bits/SpotlightCard";
import IndiaReachMap, { ALL_REACH_NODES } from "../../components/IndiaReachMap";
import { ArrowUpRight, MessageCircle, MapPin, Clock, Truck, ShieldCheck, Building2 } from "lucide-react";
import { createWhatsAppLink } from "../../lib/whatsapp";
import { Picture } from "../../components/Picture";

export const metadata = {
  title: "70+ City Wholesale Trade Network · Maa Sheetla Agency",
  description: "Direct powerloom dispatch network connecting 700+ suppliers around India with 500+ buyers across 70+ trade cities.",
};

const PRIMARY_REGIONS = [
  {
    state: "Uttar Pradesh",
    corridor: "Central, Eastern & Western UP (40+ Cities)",
    transit: "24–48 hrs Direct Dispatch",
    cities: "Kanpur, Lucknow, Varanasi, Gorakhpur, Bareilly, Meerut, Muzaffarnagar, Saharanpur, Allahabad, Akbarpur, Azamgarh, Babhnan, Bhadohi, Bahraich, Ballia, Balrampur, Barabanki, Barhalganj, Bashkhari, Basti, Belthara Road, Colonelganj, Dalmau, Faizabad, Gilaula, Gonda, Gosaiganj, Ikauna, Itiyathok, Jalalabad, Jalalpur, Jaunpur, Kaptanganj, Katra Bazar, Khalilabad, Lakhimpur Kheri, Meerganj, Mohammadabad, Nanpara, Nawabganj, Paraspur, Phoolpur, Rae Bareli, Rudauli, Sandila, Shahjahanpur, Sitapur, Sultanpur, Unnao, Utraula",
  },
  {
    state: "Bihar",
    corridor: "Eastern Trade Corridor (8 Key Cities)",
    transit: "36–48 hrs Parcel Express",
    cities: "Patna, Muzaffarpur, Arrah, Aurangabad, Bagaha, Bihar Sharif, Kishanganj, Lakhisarai",
  },
  {
    state: "Jharkhand",
    corridor: "Chhota Nagpur & Coalfield Belt (5 Cities)",
    transit: "48 hrs Consolidated Cargo",
    cities: "Ranchi, Dhanbad, Daltonganj, Garhwa, Deoghar, Kirkend Bazar",
  },
  {
    state: "Delhi NCR & Haryana",
    corridor: "Northern Capital Metro Corridor",
    transit: "24–36 hrs Rail Express",
    cities: "Delhi NCR (Chandni Chowk, Karol Bagh, Gandhi Nagar), Gurgaon, Panipat, Ambala",
  },
  {
    state: "Rajasthan, MP & Others",
    corridor: "Western & Central Powerhouse",
    transit: "24–36 hrs Fast Transit",
    cities: "Jaipur (Johari Bazaar), Indore (MT Cloth Market), Bhopal, Raipur, Ludhiana, Kolkata (Burrabazar), Jammu, Jwalapur (Haridwar), Vizianagaram",
  },
];

export default function ReachPage() {
  const waUrl = createWhatsAppLink("dispatch timing and agency representation inquiry for our city");

  return (
    <div className="min-h-screen pt-28 sm:pt-36 pb-20 px-4 sm:px-8 lg:px-12 bg-warp relative">
      <ThreadsBackground />

      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 relative z-10">
        {/* Header with Hero-Reach Atmosphere */}
        <div className="relative overflow-hidden rounded-sm border border-hairline p-6 sm:p-12 lg:p-16 space-y-5 bg-selvedge">
          <div className="absolute inset-0 opacity-40 pointer-events-none">
            <Picture
              imageKey="HERO-REACH"
              priority={true}
              sizes="100vw"
              className="w-full h-full"
              imgClassName="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-selvedge via-selvedge/60 to-transparent" />
          </div>

          <div className="relative z-10 space-y-3.5 max-w-3xl">
            <div className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px] tracking-[0.22em] text-marigold uppercase">
              <span>DISPATCH LOGISTICS &amp; TRANSIT TIMES</span>
              <span>·</span>
              <ShinyText text="10 STATES · 70+ TRADE CITIES" />
            </div>
            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl text-khadi font-light tracking-tight leading-[0.95]">
              <BlurText text="The 70+ City Wholesale Trade Network." />
            </h1>
            <p className="text-xs sm:text-base text-ash font-light leading-relaxed">
              Consolidated 24-to-48 hour dispatches connecting 700+ suppliers around India with over
              500+ verified buyers and showroom counters across North, Central, and Eastern India.
            </p>
          </div>
        </div>

        {/* Map View with Live Highlight */}
        <div className="p-4 sm:p-8 bg-selvedge border border-hairline rounded-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-hairline pb-4">
            <h2 className="font-display text-xl sm:text-2xl text-khadi font-light flex items-center gap-2">
              <MapPin className="w-4 h-4 text-marigold" /> Interactive Trade Corridors (70+ Cities)
            </h2>
            <span className="font-mono text-xs text-ash">Hover or click any node to view details</span>
          </div>
          <div className="w-full max-w-3xl mx-auto py-2">
            <IndiaReachMap />
          </div>
        </div>

        {/* State-Wise Regional Breakdown */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-hairline pb-4">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl text-khadi font-light">
                Regional Trade Corridors &amp; Coverage
              </h2>
              <p className="text-xs text-ash font-light mt-1">
                Verified wholesale supply lines connected directly to our Surat Head Office &amp; Loom Floor.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRIMARY_REGIONS.map((reg, idx) => (
              <SpotlightCard
                key={reg.state}
                className="p-5 sm:p-6 bg-selvedge border-hairline rounded-sm space-y-4 shadow-2xs hover:shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-marigold font-display text-xl font-light">0{idx + 1}</span>
                    <span className="text-marigold text-[9.5px] border border-hairline px-2 py-0.5 bg-selvedge-light uppercase font-medium">
                      {reg.state}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg sm:text-xl text-khadi font-light">{reg.corridor}</h3>
                    <div className="flex items-center gap-1.5 font-mono text-[10.5px] text-kumkum font-medium mt-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{reg.transit}</span>
                    </div>
                  </div>
                  <p className="text-xs text-ash font-light leading-relaxed pt-2 border-t border-hairline">
                    <strong className="font-medium text-khadi">Connected Centers: </strong>
                    {reg.cities}
                  </p>
                </div>

                <div className="pt-3 border-t border-hairline flex items-center justify-between text-[10px] font-mono text-marigold uppercase">
                  <span>Territorial Lock Active</span>
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="p-6 sm:p-10 bg-selvedge border border-hairline rounded-sm flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xs">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="font-display text-2xl text-khadi font-light">Ready to source in your city?</h3>
            <p className="text-xs sm:text-sm text-ash font-light">
              Connect directly with our Surat dispatch desk to lock exclusive territorial slots for your city counter.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-kumkum hover:bg-kumkum-deep text-white font-mono text-xs tracking-widest uppercase rounded-xs transition-all shadow-xs min-h-[44px]"
            >
              <MessageCircle className="w-4 h-4" /> Message Dispatch Desk
            </a>
            <Link
              href="/partner"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-selvedge-light hover:bg-selvedge border border-hairline text-khadi hover:text-marigold font-mono text-xs tracking-widest uppercase rounded-xs min-h-[44px] shadow-2xs font-medium"
            >
              Submit Trade Query <ArrowUpRight className="w-4 h-4 text-marigold" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

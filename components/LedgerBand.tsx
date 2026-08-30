"use client";

import React from "react";
import CountUp from "./react-bits/CountUp";

export default function LedgerBand() {
  return (
    <section className="w-full bg-selvedge border-b border-hairline py-12 sm:py-16 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 divide-y md:divide-y-0 md:divide-x divide-hairline">
        {/* Stat 1 */}
        <div className="pt-4 md:pt-0 md:pl-6 first:pl-0 space-y-2">
          <div className="font-display text-4xl sm:text-5xl lg:text-6xl text-haldi font-light tracking-tight leading-none">
            <CountUp to={2010} duration={1.2} separator="" />
          </div>
          <p className="font-mono text-[10.5px] tracking-[0.24em] text-ash uppercase">
            Established In Surat
          </p>
        </div>

        {/* Stat 2 */}
        <div className="pt-4 md:pt-0 md:pl-8 space-y-2">
          <div className="font-display text-4xl sm:text-5xl lg:text-6xl text-haldi font-light tracking-tight leading-none">
            <CountUp to={570} duration={1.6} suffix="+" />
          </div>
          <p className="font-mono text-[10.5px] tracking-[0.24em] text-ash uppercase">
            Boutique Counters
          </p>
        </div>

        {/* Stat 3 */}
        <div className="pt-4 md:pt-0 md:pl-8 space-y-2">
          <div className="font-display text-4xl sm:text-5xl lg:text-6xl text-haldi font-light tracking-tight leading-none">
            <CountUp to={120} duration={1.2} suffix="+" />
          </div>
          <p className="font-mono text-[10.5px] tracking-[0.24em] text-ash uppercase">
            Partner Weaving Mills
          </p>
        </div>

        {/* Stat 4 */}
        <div className="pt-4 md:pt-0 md:pl-8 space-y-2">
          <div className="font-display text-4xl sm:text-5xl lg:text-6xl text-haldi font-light tracking-tight leading-none">
            0<CountUp to={9} duration={1.2} /> <span className="text-xs font-mono text-ash font-normal">STATES</span>
          </div>
          <p className="font-mono text-[10.5px] tracking-[0.24em] text-ash uppercase">
            And 13 Trade Hubs
          </p>
        </div>
      </div>
    </section>
  );
}

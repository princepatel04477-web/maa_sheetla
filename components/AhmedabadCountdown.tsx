"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import { createWhatsAppLink } from "../lib/whatsapp";
import ShinyText from "./react-bits/ShinyText";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function AhmedabadCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 30,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const saved = localStorage.getItem("msa_ahmedabad_target");
    let target: number;
    if (saved) {
      target = parseInt(saved, 10);
    } else {
      target = Date.now() + 30 * 24 * 60 * 60 * 1000;
      localStorage.setItem("msa_ahmedabad_target", target.toString());
    }

    const updateTimer = () => {
      const difference = target - Date.now();
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const waUrl = createWhatsAppLink(
    "pre-registering for the upcoming Ahmedabad Office launch & showroom preview"
  );

  return (
    <div
      className="w-full bg-gradient-to-r from-warp via-selvedge to-warp border-b border-hairline relative overflow-hidden py-7 px-4 sm:px-8 lg:px-12"
      style={{ contain: "content" }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-48 bg-marigold/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-6 relative z-10">
        {/* Left Info */}
        <div className="space-y-2 text-center lg:text-left max-w-xl">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 font-mono text-[9px] sm:text-[9.5px] tracking-[0.22em] text-marigold uppercase bg-warp/90 px-2.5 py-1 border border-marigold/30 rounded-xs">
            <Sparkles className="w-3 h-3 text-marigold animate-pulse shrink-0" />
            <span>MAJOR EXPANSION</span>
            <span>·</span>
            <ShinyText text="OCTOBER 2026" />
          </div>
          <h3 className="font-display text-xl sm:text-3xl text-khadi font-light tracking-tight leading-tight">
            Opening Our New <i className="italic text-haldi">Ahmedabad Office</i> &amp; Trade Floor
          </h3>
          <p className="text-xs text-ash font-light leading-relaxed">
            Direct Surat mill rates, exclusive sample halls, and express dispatch closer
            to Central &amp; North Gujarat retail showrooms.
          </p>
        </div>

        {/* Countdown Digits & Action */}
        <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
          {/* 4 Timer Boxes fitting all mobile viewports cleanly */}
          <div className="w-full sm:w-auto grid grid-cols-4 gap-1.5 sm:gap-2.5 text-center">
            {/* Days */}
            <div className="bg-warp border border-marigold/50 p-2 sm:p-3 rounded-xs min-w-[54px] sm:min-w-[68px] shadow-sm">
              <span className="font-display text-xl sm:text-3xl text-haldi font-light block leading-none">
                {String(timeLeft.days).padStart(2, "0")}
              </span>
              <span className="font-mono text-[8px] sm:text-[9.5px] text-ash tracking-widest uppercase block mt-1">
                DAYS
              </span>
            </div>

            {/* Hours */}
            <div className="bg-warp border border-hairline p-2 sm:p-3 rounded-xs min-w-[54px] sm:min-w-[68px] shadow-sm">
              <span className="font-display text-xl sm:text-3xl text-khadi font-light block leading-none">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span className="font-mono text-[8px] sm:text-[9.5px] text-ash tracking-widest uppercase block mt-1">
                HOURS
              </span>
            </div>

            {/* Minutes */}
            <div className="bg-warp border border-hairline p-2 sm:p-3 rounded-xs min-w-[54px] sm:min-w-[68px] shadow-sm">
              <span className="font-display text-xl sm:text-3xl text-khadi font-light block leading-none">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <span className="font-mono text-[8px] sm:text-[9.5px] text-ash tracking-widest uppercase block mt-1">
                MINS
              </span>
            </div>

            {/* Seconds */}
            <div className="bg-warp border border-kumkum/60 p-2 sm:p-3 rounded-xs min-w-[54px] sm:min-w-[68px] shadow-sm">
              <span className="font-display text-xl sm:text-3xl text-marigold font-light block leading-none">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
              <span className="font-mono text-[8px] sm:text-[9.5px] text-ash tracking-widest uppercase block mt-1">
                SECS
              </span>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex flex-col gap-1 w-full sm:w-auto">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-kumkum hover:bg-kumkum-deep text-white font-mono text-xs tracking-wider uppercase rounded-xs transition-all shadow-agency-card w-full sm:w-auto whitespace-nowrap min-h-[44px]"
            >
              <span>Pre-Register Ahmedabad Desk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <div className="flex items-center justify-center gap-1 text-[9px] sm:text-[9.5px] font-mono text-ash/80">
              <MapPin className="w-3 h-3 text-marigold" />
              <span>300, 1st Floor, New Cloth Market, Sarangpur</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

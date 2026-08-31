"use client";

import React from "react";
import Link from "next/link";
import ThreadsBackground from "../../components/react-bits/ThreadsBackground";
import BlurText from "../../components/react-bits/BlurText";
import ShinyText from "../../components/react-bits/ShinyText";
import SpotlightCard from "../../components/react-bits/SpotlightCard";
import AhmedabadCountdown from "../../components/AhmedabadCountdown";
import { MapPin, Phone, MessageCircle, Clock, Mail, Building2, ArrowUpRight, UserCheck } from "lucide-react";
import { createWhatsAppLink, OFFICE_NUMBERS } from "../../lib/whatsapp";
import { Picture } from "../../components/Picture";

export default function ContactPage() {
  const suratWa = createWhatsAppLink("inquiring with Surat Head Office desk", {
    targetNumber: OFFICE_NUMBERS.surat,
  });
  const kanpurWa = createWhatsAppLink("inquiring with Kanpur Regional Office desk", {
    targetNumber: OFFICE_NUMBERS.kanpur,
  });
  const ahmedabadWa = createWhatsAppLink("inquiring with Ahmedabad Office desk", {
    targetNumber: OFFICE_NUMBERS.ahmedabad,
  });
  const founderWa = createWhatsAppLink("direct inquiry with Founder & CEO Manish Kanodia", {
    targetNumber: OFFICE_NUMBERS.founder,
  });
  const salesWa = createWhatsAppLink("direct trade inquiry with Amit Agarwal", {
    targetNumber: OFFICE_NUMBERS.sales,
  });

  return (
    <div className="min-h-screen pt-28 sm:pt-36 pb-20 px-4 sm:px-8 lg:px-12 bg-warp relative">
      <ThreadsBackground />

      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 relative z-10">
        {/* Sacred Invocation & Header */}
        <div className="space-y-5 max-w-4xl">
          <div className="inline-block p-2.5 bg-selvedge border border-marigold/30 rounded-xs font-mono text-[9px] sm:text-[11px] text-marigold tracking-widest leading-relaxed shadow-2xs">
            ॐ Hare Krishna Hare Krishna Krishna Krishna Hare Hare · Hare Ram Hare Ram Ram Ram Hare Hare ॐ
          </div>

          <div className="flex items-center gap-4 sm:gap-6 pt-1">
            <div className="h-10 sm:h-14 w-auto border border-marigold/30 bg-selvedge p-1.5 rounded-xs flex items-center shadow-2xs">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/maa_sheetla_black.png"
                alt="Maa Sheetla Agency"
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="h-8 w-px bg-hairline" />
            <div className="h-10 sm:h-14 w-auto border border-marigold/30 bg-selvedge p-1.5 rounded-xs flex items-center shadow-2xs">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/sunrise_fab_tex_colored.png"
                alt="Sunrise Fab Tex Pvt Ltd"
                className="h-full w-auto object-contain"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px] tracking-[0.22em] text-kumkum uppercase">
            <span>OFFICIAL DIRECTORY</span>
            <span>·</span>
            <ShinyText text="SURAT HQ · KANPUR · AHMEDABAD" />
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl text-khadi font-light tracking-tight leading-[0.95]">
            <BlurText text="Connect with our office floors &amp; desks." />
          </h1>
          <p className="text-xs sm:text-base text-ash font-light leading-relaxed">
            Maa Sheetla Agency &amp; Sunrise Fab Tex Pvt Ltd operate active wholesale trading desks in Surat,
            Kanpur, and Ahmedabad for mill allocations, sample reviews, QC audits, and freight scheduling.
          </p>
        </div>

        {/* 30-Day Ahmedabad Countdown */}
        <AhmedabadCountdown />

        {/* 3 Main Office Cards */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-hairline pb-3">
            <h2 className="font-display text-xl sm:text-2xl text-khadi font-light">
              Office Locations &amp; Trading Desks
            </h2>
            <span className="font-mono text-[10px] text-marigold uppercase tracking-wider font-medium">
              3 Active Centers
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* 1. Surat Head Office */}
            <SpotlightCard className="p-6 sm:p-7 bg-selvedge border-hairline rounded-sm space-y-6 flex flex-col justify-between shadow-2xs hover:shadow-xs">
              <div className="space-y-4">
                <div className="card-media card-media--office w-full rounded-xs overflow-hidden mb-2">
                  <Picture
                    imageKey="OFFICE-SURAT"
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 30vw"
                    className="w-full h-full"
                    imgClassName="hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-marigold font-display text-2xl font-light">SURAT</span>
                  <span className="text-marigold text-[10px] border border-marigold/30 px-2 py-0.5 bg-selvedge-light uppercase font-medium">
                    Head Office &amp; QC Floor
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-display text-2xl text-khadi font-light">
                    Surat Head Office
                  </h3>
                  <p className="text-xs text-ash font-light leading-relaxed">
                    Central loom allocation desk, master fabric inspection floor, and regional carton freight dispatch dock.
                  </p>
                </div>

                <div className="space-y-2.5 text-xs font-mono text-khadi/90 pt-3 border-t border-hairline">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-marigold shrink-0 mt-0.5" />
                    <span>H-32 India Market, Salabatpura, Ring Road, Surat, Gujarat</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-marigold shrink-0" />
                    <span>Mon – Sat: 9:30 AM – 8:30 PM IST</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-marigold shrink-0" />
                    <a href="tel:+919151003198" className="hover:text-marigold underline">
                      +91 91510 03198
                    </a>
                    <span className="text-ash">/</span>
                    <a href="tel:+919616415615" className="hover:text-marigold underline">
                      +91 96164 15615
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-ash">
                    <Mail className="w-3.5 h-3.5 text-marigold shrink-0" />
                    <a href="mailto:surat@sunrisefabtex.com" className="hover:text-marigold">
                      surat@sunrisefabtex.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-2.5">
                <a
                  href={suratWa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-3 bg-kumkum hover:bg-kumkum-deep text-white font-mono text-[11px] tracking-widest uppercase rounded-xs transition-all shadow-xs min-h-[42px]"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> Surat Desk
                </a>
                <a
                  href="tel:+919151003198"
                  className="px-4 py-3 bg-selvedge-light border border-hairline hover:border-marigold text-khadi font-mono text-[11px] tracking-widest uppercase rounded-xs text-center min-h-[42px] flex items-center justify-center font-medium"
                >
                  Call Direct
                </a>
              </div>
            </SpotlightCard>

            {/* 2. Kanpur Office */}
            <SpotlightCard className="p-6 sm:p-7 bg-selvedge border-hairline rounded-sm space-y-6 flex flex-col justify-between shadow-2xs hover:shadow-xs">
              <div className="space-y-4">
                <div className="card-media card-media--office w-full rounded-xs overflow-hidden mb-2">
                  <Picture
                    imageKey="OFFICE-KANPUR"
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 30vw"
                    className="w-full h-full"
                    imgClassName="hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-marigold font-display text-2xl font-light">KANPUR</span>
                  <span className="text-marigold text-[10px] border border-marigold/30 px-2 py-0.5 bg-selvedge-light uppercase font-medium">
                    Regional Office
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-display text-2xl text-khadi font-light">
                    Kanpur Office
                  </h3>
                  <p className="text-xs text-ash font-light leading-relaxed">
                    Regional trade coordination, bridal showroom allocations, and UP/Bihar logistics nodal center.
                  </p>
                </div>

                <div className="space-y-2.5 text-xs font-mono text-khadi/90 pt-3 border-t border-hairline">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-marigold shrink-0 mt-0.5" />
                    <span>50/274, 1st Floor, Shiv Market, Naughara, Kanpur - 208001</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-marigold shrink-0" />
                    <span>Mon – Sat: 10:00 AM – 8:00 PM IST</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-marigold shrink-0" />
                    <a href="tel:+919151060273" className="hover:text-marigold underline">
                      +91 91510 60273
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-ash">
                    <Mail className="w-3.5 h-3.5 text-marigold shrink-0" />
                    <a href="mailto:kanpur@sunrisefabtex.com" className="hover:text-marigold">
                      kanpur@sunrisefabtex.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-2.5">
                <a
                  href={kanpurWa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-3 bg-kumkum hover:bg-kumkum-deep text-white font-mono text-[11px] tracking-widest uppercase rounded-xs transition-all shadow-xs min-h-[42px]"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> Kanpur Desk
                </a>
                <a
                  href="tel:+919151060273"
                  className="px-4 py-3 bg-selvedge-light border border-hairline hover:border-marigold text-khadi font-mono text-[11px] tracking-widest uppercase rounded-xs text-center min-h-[42px] flex items-center justify-center font-medium"
                >
                  Call Direct
                </a>
              </div>
            </SpotlightCard>

            {/* 3. Ahmedabad Office */}
            <SpotlightCard className="p-6 sm:p-7 bg-selvedge border-hairline rounded-sm space-y-6 flex flex-col justify-between shadow-2xs hover:shadow-xs">
              <div className="space-y-4">
                <div className="card-media card-media--office w-full rounded-xs overflow-hidden mb-2">
                  <Picture
                    imageKey="OFFICE-AHMEDABAD"
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 30vw"
                    className="w-full h-full"
                    imgClassName="hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-marigold font-display text-2xl font-light">AHMEDABAD</span>
                  <span className="text-marigold text-[10px] border border-marigold/30 px-2 py-0.5 bg-selvedge-light uppercase font-medium">
                    New Cloth Market
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-display text-2xl text-khadi font-light">
                    Ahmedabad Office
                  </h3>
                  <p className="text-xs text-ash font-light leading-relaxed">
                    Regional commercial showroom, bridal &amp; fancy collection gallery, and North/Central Gujarat trade desk.
                  </p>
                </div>

                <div className="space-y-2.5 text-xs font-mono text-khadi/90 pt-3 border-t border-hairline">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-marigold shrink-0 mt-0.5" />
                    <span>300, 1st Floor, New Cloth Market, Sarangpur, Sherkotda, Ahmedabad, Gujarat 380002</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-marigold shrink-0" />
                    <span>Mon – Sat: 10:00 AM – 8:00 PM IST</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-marigold shrink-0" />
                    <a href="tel:+919559650752" className="hover:text-marigold underline">
                      +91 95596 50752
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-ash">
                    <Mail className="w-3.5 h-3.5 text-marigold shrink-0" />
                    <a href="mailto:ahmedabad@sunrisefabtex.com" className="hover:text-marigold">
                      ahmedabad@sunrisefabtex.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-2.5">
                <a
                  href={ahmedabadWa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-3 bg-kumkum hover:bg-kumkum-deep text-white font-mono text-[11px] tracking-widest uppercase rounded-xs transition-all shadow-xs min-h-[42px]"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> Ahmedabad Desk
                </a>
                <a
                  href="tel:+919559650752"
                  className="px-4 py-3 bg-selvedge-light border border-hairline hover:border-marigold text-khadi font-mono text-[11px] tracking-widest uppercase rounded-xs text-center min-h-[42px] flex items-center justify-center font-medium"
                >
                  Call Direct
                </a>
              </div>
            </SpotlightCard>
          </div>
        </div>

        {/* Leadership & Executive Direct Contacts */}
        <div className="p-6 sm:p-8 bg-selvedge border border-hairline rounded-sm space-y-6 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-hairline pb-4">
            <div>
              <div className="font-mono text-[10px] text-marigold uppercase tracking-widest font-medium">
                LEADERSHIP &amp; PROPRIETORS
              </div>
              <h2 className="font-display text-2xl sm:text-3xl text-khadi font-light">
                Direct Management Contacts
              </h2>
            </div>
            <p className="text-xs text-ash font-light max-w-md">
              For large-volume mill agreements, exclusive agency partnerships, or direct trade queries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Manish Kanodia */}
            <div className="p-5 bg-selvedge-light border border-hairline rounded-xs space-y-4 shadow-2xs">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-xl sm:text-2xl text-khadi font-light">
                    Manish Kanodia
                  </h3>
                  <div className="font-mono text-[11px] text-marigold uppercase tracking-wider font-medium">
                    Founder, CEO
                  </div>
                </div>
                <div className="w-10 h-10 border border-marigold/30 bg-selvedge flex items-center justify-center rounded-xs text-marigold shadow-2xs">
                  <UserCheck className="w-5 h-5" />
                </div>
              </div>

              <div className="flex items-center gap-2.5 font-mono text-xs text-khadi pt-2 border-t border-hairline">
                <Phone className="w-4 h-4 text-marigold shrink-0" />
                <a href="tel:+919616415615" className="hover:text-marigold transition-colors font-medium">
                  +91 96164 15615
                </a>
              </div>

              <div className="pt-1 flex gap-2">
                <a
                  href={founderWa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 bg-selvedge border border-marigold/40 hover:border-marigold text-marigold font-mono text-[10.5px] uppercase tracking-wider rounded-xs transition-colors font-medium shadow-2xs"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-marigold" /> Connect on WhatsApp
                </a>
                <a
                  href="tel:+919616415615"
                  className="px-3.5 py-2.5 bg-selvedge border border-hairline text-khadi font-mono text-[10.5px] uppercase tracking-wider rounded-xs hover:border-marigold font-medium shadow-2xs"
                >
                  Call
                </a>
              </div>
            </div>

            {/* Amit Agarwal */}
            <div className="p-5 bg-selvedge-light border border-hairline rounded-xs space-y-4 shadow-2xs">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-xl sm:text-2xl text-khadi font-light">
                    Amit Agarwal
                  </h3>
                  <div className="font-mono text-[11px] text-marigold uppercase tracking-wider font-medium">
                    Executive Trade &amp; Sales Desk
                  </div>
                </div>
                <div className="w-10 h-10 border border-marigold/30 bg-selvedge flex items-center justify-center rounded-xs text-marigold shadow-2xs">
                  <UserCheck className="w-5 h-5" />
                </div>
              </div>

              <div className="flex items-center gap-2.5 font-mono text-xs text-khadi pt-2 border-t border-hairline">
                <Phone className="w-4 h-4 text-marigold shrink-0" />
                <a href="tel:+919559650752" className="hover:text-marigold transition-colors font-medium">
                  +91 95596 50752
                </a>
              </div>

              <div className="pt-1 flex gap-2">
                <a
                  href={salesWa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 bg-selvedge border border-marigold/40 hover:border-marigold text-marigold font-mono text-[10.5px] uppercase tracking-wider rounded-xs transition-colors font-medium shadow-2xs"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-marigold" /> Connect on WhatsApp
                </a>
                <a
                  href="tel:+919559650752"
                  className="px-3.5 py-2.5 bg-selvedge border border-hairline text-khadi font-mono text-[10.5px] uppercase tracking-wider rounded-xs hover:border-marigold font-medium shadow-2xs"
                >
                  Call
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Partnership Query Redirect */}
        <div className="p-6 sm:p-8 bg-selvedge border border-hairline rounded-sm flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xs">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-display text-xl sm:text-2xl text-khadi font-light">
              Are you a showroom owner or fabric boutique?
            </h3>
            <p className="text-xs text-ash font-light">
              Submit your GST details and counter requirements through our verified stockist form.
            </p>
          </div>
          <Link
            href="/partner"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-selvedge-light border border-marigold/50 hover:border-marigold text-marigold font-mono text-xs uppercase tracking-widest rounded-xs transition-all whitespace-nowrap font-medium shadow-2xs"
          >
            <span>Open Query Form</span>
            <ArrowUpRight className="w-4 h-4 text-marigold" />
          </Link>
        </div>
      </div>
    </div>
  );
}

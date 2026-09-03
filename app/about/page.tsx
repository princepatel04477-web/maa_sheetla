import React from "react";
import Link from "next/link";
import ThreadsBackground from "../../components/react-bits/ThreadsBackground";
import BlurText from "../../components/react-bits/BlurText";
import ShinyText from "../../components/react-bits/ShinyText";
import SpotlightCard from "../../components/react-bits/SpotlightCard";
import AhmedabadCountdown from "../../components/AhmedabadCountdown";
import {
  History,
  Building2,
  MapPin,
  Phone,
  MessageCircle,
  ShieldCheck,
  Scale,
  Truck,
  Factory,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Users,
  Award
} from "lucide-react";
import { createWhatsAppLink, OFFICE_NUMBERS } from "../../lib/whatsapp";
import { Picture } from "../../components/Picture";

export const metadata = {
  title: "Our Story & Heritage (2008–2026) · Maa Sheetla Agency & Sunrise Fab Tex Adat",
  description:
    "The 18-year journey of Maa Sheetla Agency and Sunrise Fab Tex Adat: founded in 2008, Kanpur office acquired in 2009, Surat arrival in 2010, Surat HQ acquired in 2016, and Ahmedabad trade floor launch in 2026.",
};

const CHAPTERS = [
  {
    year: "2008",
    tagline: "Agency Founded",
    title: "1. The Inception of Agency Brokerage",
    subtitle: "A Founding Promise of Pure Transparency",
    desc: "Founded by Manish Kanodia, our operations began as an independent textile commission agency. In an era where fragmented middlemen inflated margins and obscured mill sources, we introduced a transparent trading brokerage: negotiating genuine loom rates directly for wholesale cloth merchants with zero-bad-debt guarantees and absolute trade integrity.",
    highlights: [
      "Ethical commission brokerage without hidden middleman markups",
      "Direct negotiation between regional buyers and weaving masters",
      "Zero-bad-debt and payment reliability protocols",
    ],
    badge: "Foundation Year",
  },
  {
    year: "2009",
    tagline: "Kanpur Office",
    title: "2. Kanpur Regional Office Acquired",
    subtitle: "Anchoring the North Indian B2B Corridor",
    desc: "Within twelve months of launching agency operations, we solidified our physical commitment to our North Indian merchant partners by acquiring our dedicated regional office at 50/274 Shiv Market, Naughara, Kanpur. Situated in the historic heart of Uttar Pradesh's premier textile bazaar, this office became a vital hub for physical fabric sampling, swift repeat orders, and personalized showroom consultations.",
    highlights: [
      "Acquired dedicated premises in Shiv Market, Naughara, Kanpur",
      "Direct physical liaison counter for UP, Bihar, and MP buyers",
      "Daily sample updates and expedited repeat consignment bookings",
    ],
    badge: "First Physical Office",
  },
  {
    year: "2010",
    tagline: "Surat Expansion",
    title: "3. Arrival in the Textile Capital, Surat",
    subtitle: "Stepping Directly onto the Nation's Weaving Epicentre",
    desc: "To provide our wholesale buyers with unbeatable mill-floor cost structures, we moved our boots directly to Surat, Gujarat — the epicenter of Indian synthetic, bridal silk, and jacquard manufacturing. Being on-ground in Surat enabled us to forge direct partnerships with over a hundred master powerloom owners, twisting mills, and specialized dyehouses across Salabatpura and Ring Road.",
    highlights: [
      "Established full-time on-ground trade presence in Surat, Gujarat",
      "Forged direct alliances with 100+ weaving powerlooms and mills",
      "Secured mill-floor pricing without multi-tier broker inflation",
    ],
    badge: "Surat Gateway",
  },
  {
    year: "2016",
    tagline: "Surat Headquarters",
    title: "4. Permanent Surat Head Office Acquired",
    subtitle: "H-32 India Market Flagship Trading Floor & QC Facility",
    desc: "After years of continuous volume growth and expanding buyer accounts, we acquired our permanent flagship headquarters at H-32 India Market, Salabatpura, Ring Road in Surat. We transformed this property into an advanced trading floor equipped with backlit quality control tables, strict piece-by-piece flaw screening, and a heavy-duty moisture-barrier packaging station for 48-hour consolidated express dispatches.",
    highlights: [
      "Acquired H-32 India Market, Salabatpura as permanent Surat HQ",
      "Built dedicated illuminated tables for piece-by-piece QC screening",
      "Engineered 48-hour express rail and road cargo dispatch corridors",
    ],
    badge: "Surat Headquarters",
  },
  {
    year: "2026",
    tagline: "Ahmedabad Expansion",
    title: "5. Ahmedabad Trade Floor Launch",
    subtitle: "New Cloth Market Garment & Cotton Hub",
    desc: "Marking 18 years of uninterrupted wholesale standing, we inaugurate our third major regional trade desk at 300, 1st Floor, New Cloth Market, Sarangpur, Ahmedabad. This expansion focuses on Ahmedabad's world-renowned readymade garments, pure 60/60 cottons, designer kurtis, 2-piece & 3-piece co-ord sets, providing our national retail network with direct manufacturer sourcing.",
    highlights: [
      "Inaugurating desk at New Cloth Market, Sarangpur, Ahmedabad",
      "Dedicated sourcing of pure cotton garments, kurtis, and festive tunics",
      "Comprehensive tri-city floor presence: Surat · Kanpur · Ahmedabad",
    ],
    badge: "Active Launch 2026",
  },
];

const CORE_VALUES = [
  {
    icon: Scale,
    title: "Transparent Brokerage",
    desc: "Zero hidden commissions or multi-tiered brokerage. Showrooms access authentic mill cost structures with absolute billing clarity.",
  },
  {
    icon: ShieldCheck,
    title: "Piece-by-Piece Screening",
    desc: "Every saree, suit, and lehenga panel is thoroughly audited on illuminated tables for weaving flaws, needle skips, and colorfastness.",
  },
  {
    icon: Factory,
    title: "700+ Verified Mills",
    desc: "Direct tie-ups with vetted jacquard powerlooms, master dyehouses, and handloom cooperatives across Surat, Ahmedabad, and Varanasi.",
  },
  {
    icon: Truck,
    title: "48-Hour Dispatches",
    desc: "Consolidated, moisture-shielded carton dispatches connecting our trading floors to 70+ city freight corridors across North & Central India.",
  },
];

export default function AboutPage() {
  const founderWa = createWhatsAppLink("connecting directly regarding agency history and wholesale partnership", {
    targetNumber: OFFICE_NUMBERS.founder,
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
                src="/logos/maa_sheetla_maroon-640.png"
                srcSet="/logos/maa_sheetla_maroon-320.png 320w, /logos/maa_sheetla_maroon-640.png 640w"
                sizes="(max-width: 640px) 220px, 360px"
                width={640}
                height={494}
                decoding="async"
                alt="Maa Sheetla Agency"
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="h-8 w-px bg-hairline" />
            <div className="h-10 sm:h-14 w-auto border border-marigold/30 bg-selvedge p-1.5 rounded-xs flex items-center shadow-2xs">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/sunrise_fab_tex_colored-640.png"
                srcSet="/logos/sunrise_fab_tex_colored-320.png 320w, /logos/sunrise_fab_tex_colored-640.png 640w"
                sizes="(max-width: 640px) 220px, 360px"
                width={640}
                height={342}
                decoding="async"
                alt="Sunrise Fab Tex Adat"
                className="h-full w-auto object-contain"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px] tracking-[0.22em] text-kumkum uppercase">
            <span>ABOUT OUR HERITAGE</span>
            <span>·</span>
            <ShinyText text="18 YEARS OF TEXTILE TRUST (2008 – 2026)" />
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl text-khadi font-light tracking-tight leading-[0.95]">
            <BlurText text="The Story Behind Our Textile Trading Desks." />
          </h1>
          <p className="text-xs sm:text-base text-ash font-light leading-relaxed max-w-3xl">
            From humble beginnings in 2008 to on-ground trading floors across Kanpur, Surat, and Ahmedabad —
            this is the journey of how Maa Sheetla Agency and Sunrise Fab Tex Adat became trusted trade partners
            for 500+ verified showrooms and 700+ textile manufacturers across India.
          </p>
        </div>

        {/* 30-Day Ahmedabad Countdown */}
        <AhmedabadCountdown />

        {/* Narrative Overview Card */}
        <div className="p-6 sm:p-10 lg:p-12 bg-selvedge border border-hairline rounded-sm space-y-6 shadow-2xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-marigold/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <span className="font-mono text-xs text-marigold uppercase tracking-widest block font-medium">
                Founder&apos;s Vision · Manish Kanodia
              </span>
              <h2 className="font-display text-2xl sm:text-4xl text-khadi font-light leading-tight">
                Built on Traditional B2B Trust, Powered by Modern Verification.
              </h2>
              <div className="space-y-3 text-xs sm:text-sm text-ash font-light leading-relaxed">
                <p>
                  In the Indian wholesale textile sector, relationships are everything. When we started agency operations in <strong className="text-khadi font-medium">2008</strong>, showroom retailers in North India faced persistent challenges: unpredictable quality, delays in dispatch, and opaque price layers added by brokers.
                </p>
                <p>
                  We resolved to build an agency that acts as a true trade fiduciary. In <strong className="text-khadi font-medium">2009</strong>, we established our first physical branch at Kanpur&apos;s Shiv Market. In <strong className="text-khadi font-medium">2010</strong>, we relocated our core operations to Surat to negotiate directly on mill floors. In <strong className="text-khadi font-medium">2016</strong>, we acquired our own headquarters at H-32 India Market, Salabatpura. And in <strong className="text-khadi font-medium">2026</strong>, we are thrilled to expand into Ahmedabad&apos;s New Cloth Market.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={founderWa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-kumkum hover:bg-kumkum-deep text-white font-mono text-xs tracking-wider uppercase rounded-xs transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Connect With Manish Kanodia (Founder)</span>
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-selvedge hover:bg-selvedge-light border border-hairline text-khadi hover:text-marigold font-mono text-xs tracking-wider uppercase rounded-xs transition-colors shadow-2xs"
                >
                  <span>View All 3 Offices →</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 bg-warp/60 border border-hairline p-6 rounded-xs space-y-4">
              <h3 className="font-display text-xl text-khadi font-light border-b border-hairline pb-2">
                Agency At A Glance
              </h3>
              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center py-1 border-b border-hairline/50">
                  <span className="text-ash">Founding Year</span>
                  <span className="text-marigold font-semibold">2008</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-hairline/50">
                  <span className="text-ash">Kanpur Office</span>
                  <span className="text-khadi font-medium">Acquired 2009</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-hairline/50">
                  <span className="text-ash">Surat Floor</span>
                  <span className="text-khadi font-medium">Arrived 2010</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-hairline/50">
                  <span className="text-ash">Surat HQ Acquired</span>
                  <span className="text-khadi font-medium">H-32 India Mkt (2016)</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-hairline/50">
                  <span className="text-ash">Ahmedabad Desk</span>
                  <span className="text-kumkum font-semibold">Launching 2026</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-ash">Verified Showrooms</span>
                  <span className="text-marigold font-semibold">500+ Buyers</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The 5 Historic Chapters (Detailed Timeline) */}
        <div className="space-y-8">
          <div className="space-y-2 border-b border-hairline pb-4">
            <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-marigold">
              <History className="w-4 h-4" />
              <span>THE FIVE DEFINING MILESTONES (2008 – 2026)</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl text-khadi font-light tracking-tight">
              Chronicles of an 18-Year Textile Journey
            </h2>
          </div>

          <div className="space-y-6">
            {CHAPTERS.map((chap, idx) => (
              <SpotlightCard
                key={chap.year}
                className="p-6 sm:p-8 lg:p-10 bg-selvedge border border-hairline hover:border-marigold/50 rounded-sm space-y-4 shadow-2xs relative"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-hairline/70 pb-4">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="font-mono text-sm sm:text-base text-marigold font-semibold bg-warp px-3 py-1 border border-marigold/30 rounded-2xs">
                        {chap.year}
                      </span>
                      <span className="text-xs font-mono text-kumkum uppercase tracking-wider font-medium px-2 py-0.5 bg-kumkum/10 border border-kumkum/30 rounded-2xs">
                        {chap.tagline}
                      </span>
                      <span className="text-[10px] font-mono text-ash/70 px-2 py-0.5 border border-hairline rounded-2xs hidden sm:inline-block">
                        {chap.badge}
                      </span>
                    </div>
                    <h3 className="font-display text-xl sm:text-3xl text-khadi font-light pt-1">
                      {chap.title}
                    </h3>
                    <p className="font-mono text-xs text-ash italic">
                      {chap.subtitle}
                    </p>
                  </div>
                  <span className="font-display text-4xl sm:text-5xl text-ash/20 font-light shrink-0">
                    0{idx + 1}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-ash font-light leading-relaxed">
                  {chap.desc}
                </p>

                <div className="pt-2">
                  <span className="font-mono text-[10px] uppercase text-khadi font-medium tracking-wider block mb-2">
                    Key Achievements:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {chap.highlights.map((h) => (
                      <div key={h} className="p-3 bg-warp/60 border border-hairline/50 rounded-2xs flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-marigold shrink-0 mt-0.5" />
                        <span className="text-[11px] text-ash leading-snug">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>

        {/* Core Values / Operational Principles */}
        <div className="space-y-8 pt-4">
          <div className="space-y-2 border-b border-hairline pb-4">
            <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-kumkum">
              <Award className="w-4 h-4" />
              <span>PILLARS OF REPUTATION</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl text-khadi font-light tracking-tight">
              Why India&apos;s Leading Showrooms Choose Our Agency
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {CORE_VALUES.map((val) => (
              <div
                key={val.title}
                className="p-6 bg-selvedge border border-hairline hover:border-marigold/60 rounded-xs space-y-3 flex flex-col justify-between shadow-2xs"
              >
                <div className="space-y-2.5">
                  <val.icon className="w-6 h-6 text-marigold" />
                  <h3 className="font-display text-lg text-khadi font-light">{val.title}</h3>
                  <p className="text-xs text-ash font-light leading-relaxed">{val.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3 Regional Office Locations Summary */}
        <div className="p-6 sm:p-10 bg-selvedge border border-hairline rounded-sm space-y-6 shadow-2xs">
          <div className="space-y-2">
            <span className="font-mono text-xs text-marigold uppercase tracking-widest block font-medium">
              Nationwide Presence
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-khadi font-light">
              Visit Our Trading Floors in Person
            </h2>
            <p className="text-xs sm:text-sm text-ash font-light max-w-2xl">
              Whether you need direct fabric inspection in Surat, regional sample matching in Kanpur,
              or cotton garment procurement in Ahmedabad, our agency desks welcome retail buyers daily.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="p-5 bg-warp/70 border border-hairline rounded-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-marigold font-semibold uppercase">Surat HQ Floor</span>
                <span className="text-[10px] font-mono text-ash">Est. 2010 / HQ 2016</span>
              </div>
              <p className="text-xs text-ash font-light">
                H-32 India Market, Salabatpura, Ring Road, Surat, Gujarat
              </p>
              <div className="pt-1 text-[11px] font-mono text-khadi">
                Phone: +91 91510 03198 / +91 91510 60271
              </div>
            </div>

            <div className="p-5 bg-warp/70 border border-hairline rounded-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-marigold font-semibold uppercase">Kanpur Regional Office</span>
                <span className="text-[10px] font-mono text-ash">Acquired 2009</span>
              </div>
              <p className="text-xs text-ash font-light">
                50/274, 1st Floor, Shiv Market, Naughara, Kanpur, UP - 208001
              </p>
              <div className="pt-1 text-[11px] font-mono text-khadi">
                Phone: +91 91510 60273
              </div>
            </div>

            <div className="p-5 bg-warp/70 border border-hairline rounded-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-kumkum font-semibold uppercase">Ahmedabad Hub</span>
                <span className="text-[10px] font-mono text-ash">Expanding 2026</span>
              </div>
              <p className="text-xs text-ash font-light">
                300, 1st Floor, New Cloth Market, Sarangpur, Ahmedabad - 380002
              </p>
              <div className="pt-1 text-[11px] font-mono text-khadi">
                Phone: +91 95596 50752
              </div>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-8 sm:p-12 bg-gradient-to-b from-selvedge to-selvedge-light border border-hairline rounded-sm text-center space-y-6 shadow-2xs">
          <p className="eyebrow text-kumkum">EXPERIENCE 18 YEARS OF REPUTATION</p>
          <h2 className="font-display text-3xl sm:text-5xl text-khadi font-light tracking-tight max-w-2xl mx-auto leading-tight">
            Partner with an agency built on eighteeen years of textile trust.
          </h2>
          <p className="text-xs sm:text-base text-ash font-light max-w-xl mx-auto leading-relaxed">
            Register your showroom counter with our Surat trading floor to access mill-direct jacquards,
            bridal lehengas, and volume carton assortments with territorial design protection.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Link
              href="/partner"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-kumkum hover:bg-kumkum-deep text-white font-mono text-xs tracking-widest uppercase rounded-xs transition-all shadow-xs"
            >
              Open Agency Account →
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-selvedge hover:bg-selvedge-light border border-hairline text-khadi hover:text-marigold font-mono text-xs tracking-widest uppercase rounded-xs transition-all shadow-2xs"
            >
              Contact Our Desks
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

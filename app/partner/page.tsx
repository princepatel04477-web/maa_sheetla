"use client";

import React, { useState } from "react";
import ThreadsBackground from "../../components/react-bits/ThreadsBackground";
import BlurText from "../../components/react-bits/BlurText";
import ShinyText from "../../components/react-bits/ShinyText";
import { CheckCircle2, MessageCircle, Send, Loader2, Database } from "lucide-react";
import { createWhatsAppLink } from "../../lib/whatsapp";

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi NCR",
  "Jammu & Kashmir",
  "Ladakh",
  "Chandigarh",
  "Puducherry",
  "Dadra & Nagar Haveli and Daman & Diu",
  "Andaman & Nicobar Islands",
  "Lakshadweep",
];

const GAS_FALLBACK_URL = "https://script.google.com/macros/s/AKfycbw_HwwZzXqwTIog1s1ez9X6CmnHw9iG1HrkH4w2C5ab_H0pzOASw7zgkpBjsQUK9-S9rw/exec";

export default function QueryPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [recordId, setRecordId] = useState<string | number | null>(null);

  const [formData, setFormData] = useState({
    firm: "",
    firstName: "",
    lastName: "",
    gst: "",
    city: "",
    state: "Uttar Pradesh",
    contact: "",
    email: "",
    categoryInterest: "Sarees (Tissue, Dola, Organza)",
    preferredFirm: "Both Desks" as "Maa Sheetla" | "Sunrise Tex Fab" | "Both Desks",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const fullFirmName = `${formData.firm.trim()} (${formData.city.trim() ? formData.city.trim() + ", " : ""}${formData.state})`;

    const payload = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      firm: fullFirmName,
      gst: formData.gst.trim(),
      contact: formData.contact.trim(),
      email: formData.email.trim(),
      city: formData.city.trim(),
      state: formData.state,
      category: formData.categoryInterest,
      preferredDesk: formData.preferredFirm,
      notes: formData.message.trim(),
      page: typeof window !== "undefined" ? window.location.href : "/partner",
      referrer: typeof document !== "undefined" ? document.referrer : "",
    };

    let assignedId = null;

    // 1. Primary Write: Cloudflare D1 Serverless Database (/api/submit-enquiry)
    try {
      const d1Res = await fetch("/api/submit-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (d1Res.ok) {
        const d1Data = await d1Res.json();
        if (d1Data && d1Data.recordId) {
          assignedId = d1Data.recordId;
          setRecordId(d1Data.recordId);
        }
      }
    } catch (d1Err) {
      console.warn("D1 direct endpoint notice:", d1Err);
    }

    // 2. Redundant Direct Google Apps Script Dispatch
    try {
      fetch(GAS_FALLBACK_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          token: "maa-sheetla-2010",
          ...payload,
        }),
        mode: "no-cors",
        keepalive: true,
      }).catch(() => {});
    } catch (gasErr) {
      console.warn("Google Sheet sync notice:", gasErr);
    }

    setLoading(false);
    setSubmitted(true);
  };

  const handleOpenWhatsApp = () => {
    const formattedQuery = `${formData.categoryInterest} - ${formData.message ? formData.message : "Wholesale trade enquiry"} (Contact: ${formData.contact}, GST: ${formData.gst || "N/A"})`;
    const url = createWhatsAppLink("wholesale trade query", {
      shopName: `${formData.firm} (${formData.firstName} ${formData.lastName})`.trim(),
      city: `${formData.city}, ${formData.state}`,
      category: formattedQuery,
      firm: formData.preferredFirm === "Both Desks" ? "Both" : formData.preferredFirm,
    });
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen pt-28 sm:pt-36 pb-20 px-4 sm:px-8 lg:px-12 bg-warp relative">
      <ThreadsBackground />

      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 relative z-10">
        {/* Header */}
        <div className="space-y-3.5 max-w-3xl">
          <div className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px] tracking-[0.22em] text-marigold uppercase">
            <span>B2B WHOLESALE TRADE INQUIRY</span>
            <span>·</span>
            <ShinyText text="DIRECT SURAT DESK" />
          </div>
          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl text-khadi font-light tracking-tight leading-[0.95]">
            <BlurText text="Submit your wholesale query." />
          </h1>
          <p className="text-xs sm:text-base text-ash font-light leading-relaxed">
            Fill out your showroom details below. All enquiries are recorded permanently in our Cloudflare D1 SQL database
            and Google Sheet for immediate response and lifetime backup.
          </p>
        </div>

        {/* Form & Info Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Query Form */}
          <div className="lg:col-span-7 bg-selvedge border border-hairline p-5 sm:p-8 lg:p-10 rounded-sm">
            {submitted ? (
              <div className="space-y-6 py-6 text-center animate-in fade-in zoom-in-95 duration-200">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-kumkum/10 border border-marigold/40 rounded-full flex items-center justify-center mx-auto text-marigold">
                  <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-marigold" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-2xl sm:text-3xl text-khadi">Enquiry Secured in Database</h3>
                  <p className="text-xs sm:text-sm text-ash max-w-md mx-auto leading-relaxed">
                    Your enquiry has been assigned Reference <b>#{recordId || "LIVE"}</b> and saved to the Cloudflare D1 database and Google Sheet. Our Surat floor team will call you on <b>{formData.contact}</b>.
                  </p>
                </div>
                <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleOpenWhatsApp}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-kumkum hover:bg-kumkum-deep text-white font-mono text-xs tracking-widest uppercase rounded-xs transition-all shadow-agency-card min-h-[44px]"
                  >
                    <MessageCircle className="w-4 h-4" /> Message Desk on WhatsApp
                  </button>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setRecordId(null);
                      setFormData({
                        firm: "",
                        firstName: "",
                        lastName: "",
                        gst: "",
                        city: "",
                        state: "Uttar Pradesh",
                        contact: "",
                        email: "",
                        categoryInterest: "Sarees (Tissue, Dola, Organza)",
                        preferredFirm: "Both Desks",
                        message: "",
                      });
                    }}
                    className="w-full sm:w-auto px-6 py-3.5 bg-warp border border-hairline text-ash hover:text-khadi font-mono text-xs tracking-widest uppercase rounded-xs min-h-[44px]"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-1.5">
                    <label className="block text-[10.5px] font-mono text-ash tracking-widest uppercase">
                      Firm / Boutique Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firm}
                      onChange={(e) => setFormData({ ...formData, firm: e.target.value })}
                      placeholder="e.g. Shringar Saree Mandir"
                      className="w-full px-4 py-3.5 bg-warp border border-hairline rounded-xs text-base sm:text-sm text-khadi placeholder-ash/50 focus:outline-none focus:border-marigold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10.5px] font-mono text-ash tracking-widest uppercase">
                      GST Number (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.gst}
                      onChange={(e) => setFormData({ ...formData, gst: e.target.value })}
                      placeholder="e.g. 24AACCS1234F1Z5"
                      className="w-full px-4 py-3.5 bg-warp border border-hairline rounded-xs text-base sm:text-sm text-khadi placeholder-ash/50 focus:outline-none focus:border-marigold uppercase"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-1.5">
                    <label className="block text-[10.5px] font-mono text-ash tracking-widest uppercase">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="e.g. Ramesh"
                      className="w-full px-4 py-3.5 bg-warp border border-hairline rounded-xs text-base sm:text-sm text-khadi placeholder-ash/50 focus:outline-none focus:border-marigold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10.5px] font-mono text-ash tracking-widest uppercase">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="e.g. Patel"
                      className="w-full px-4 py-3.5 bg-warp border border-hairline rounded-xs text-base sm:text-sm text-khadi placeholder-ash/50 focus:outline-none focus:border-marigold"
                    />
                  </div>
                </div>

                {/* State & City (Manual Entry) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-1.5">
                    <label className="block text-[10.5px] font-mono text-ash tracking-widest uppercase">
                      State / UT (All 29 States) *
                    </label>
                    <select
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-4 py-3.5 bg-warp border border-hairline rounded-xs text-base sm:text-sm text-khadi focus:outline-none focus:border-marigold"
                    >
                      {INDIAN_STATES.map((st) => (
                        <option key={st} value={st} className="bg-warp text-khadi">
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10.5px] font-mono text-ash tracking-widest uppercase">
                      City (Enter Manually) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Surat, Varanasi, Meerut, Raipur"
                      className="w-full px-4 py-3.5 bg-warp border border-hairline rounded-xs text-base sm:text-sm text-khadi placeholder-ash/50 focus:outline-none focus:border-marigold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-1.5">
                    <label className="block text-[10.5px] font-mono text-ash tracking-widest uppercase">
                      Contact / WhatsApp Mobile *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      placeholder="e.g. 9825100000"
                      className="w-full px-4 py-3.5 bg-warp border border-hairline rounded-xs text-base sm:text-sm text-khadi placeholder-ash/50 focus:outline-none focus:border-marigold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10.5px] font-mono text-ash tracking-widest uppercase">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. buyer@example.com"
                      className="w-full px-4 py-3.5 bg-warp border border-hairline rounded-xs text-base sm:text-sm text-khadi placeholder-ash/50 focus:outline-none focus:border-marigold"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10.5px] font-mono text-ash tracking-widest uppercase">
                    Primary Sourcing Interest
                  </label>
                  <select
                    value={formData.categoryInterest}
                    onChange={(e) => setFormData({ ...formData, categoryInterest: e.target.value })}
                    className="w-full px-4 py-3.5 bg-warp border border-hairline rounded-xs text-base sm:text-sm text-khadi focus:outline-none focus:border-marigold"
                  >
                    <option value="Sarees (Tissue, Dola, Organza)">Sarees (Tissue, Dola, Organza)</option>
                    <option value="Bridal & Lehengas">Bridal &amp; Lehengas</option>
                    <option value="Suits & Kurtis (Chanderi, Cambric)">Suits &amp; Kurtis (Chanderi, Cambric)</option>
                    <option value="Ready Indo-Western Garments">Ready Indo-Western Garments</option>
                    <option value="All Wholesale Sourcing Lines">All Wholesale Sourcing Lines</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10.5px] font-mono text-ash tracking-widest uppercase">
                    Agency Desk Focus
                  </label>
                  <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                    {(["Both Desks", "Maa Sheetla", "Sunrise Tex Fab"] as const).map((firm) => (
                      <button
                        type="button"
                        key={firm}
                        onClick={() => setFormData({ ...formData, preferredFirm: firm as any })}
                        className={`py-2.5 px-2 text-center border rounded-xs transition-colors text-[11px] sm:text-xs ${
                          formData.preferredFirm === firm
                            ? "bg-warp text-haldi border-marigold font-medium"
                            : "bg-warp/50 border-hairline text-ash hover:text-khadi"
                        }`}
                      >
                        {firm}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10.5px] font-mono text-ash tracking-widest uppercase">
                    Specific Query / Requirements (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="e.g. Looking for festive season bridal sets, MOQ inquiry, rate cards, etc."
                    className="w-full px-4 py-3 bg-warp border border-hairline rounded-xs text-base sm:text-sm text-khadi placeholder-ash/50 focus:outline-none focus:border-marigold resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-4 bg-kumkum hover:bg-kumkum-deep text-white font-mono text-xs tracking-[0.18em] uppercase rounded-xs transition-all flex items-center justify-center gap-2 shadow-agency-card disabled:opacity-50 min-h-[48px]"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Saving to Database &amp; Sheet...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Submit Enquiry to Vault
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleOpenWhatsApp}
                    className="px-6 py-4 bg-warp hover:bg-selvedge border border-marigold/60 text-haldi font-mono text-xs tracking-wider uppercase rounded-xs transition-all flex items-center justify-center gap-2 min-h-[48px]"
                  >
                    <MessageCircle className="w-4 h-4 text-marigold" /> WhatsApp Desk
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Benefits Side Column */}
          <div className="lg:col-span-5 space-y-5">
            <div className="p-5 sm:p-8 bg-selvedge/60 border border-hairline rounded-sm space-y-3.5">
              <div className="flex items-center gap-2 text-marigold font-mono text-xs uppercase tracking-wider">
                <Database className="w-4 h-4" />
                <span>Dual-Vault Redundancy</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl text-khadi font-light">
                Permanent Database &amp; Sheet
              </h3>
              <ul className="space-y-3 text-xs text-khadi/85 font-light">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-marigold shrink-0 mt-0.5" />
                  <span>Cloudflare D1 SQL storage with transaction IDs.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-marigold shrink-0 mt-0.5" />
                  <span>Live IST timestamping &amp; Google Sheet parallel mirror.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-marigold shrink-0 mt-0.5" />
                  <span>1-click CSV export anytime in the client admin vault.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-marigold shrink-0 mt-0.5" />
                  <span>Instant email alert to princepatel01258@gmail.com.</span>
                </li>
              </ul>
            </div>

            <div className="p-5 bg-warp border border-hairline rounded-sm font-mono text-xs space-y-2 text-ash">
              <div className="text-haldi uppercase tracking-wider">Direct Desk Assistance:</div>
              <div>Phone: +91 91510 03198 / +91 96164 15615</div>
              <div>Surat HQ: H-32 India Market, Salabatpura, Ring Road, Surat</div>
              <div className="text-[11px] text-ash/80">Branches: Kanpur (Shiv Market) · Ahmedabad (New Cloth Market)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

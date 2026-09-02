"use client";

import React, { useState } from "react";
import ThreadsBackground from "../../components/react-bits/ThreadsBackground";
import BlurText from "../../components/react-bits/BlurText";
import ShinyText from "../../components/react-bits/ShinyText";
import { CheckCircle2, MessageCircle, Send, Loader2, ShieldCheck } from "lucide-react";
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

export default function QueryPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [recordId, setRecordId] = useState<string | number | null>(null);
  // Honeypot: hidden from real buyers, irresistible to naive spam bots.
  const [companyWebsite, setCompanyWebsite] = useState("");

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
    preferredFirm: "Both Desks" as "Maa Sheetla" | "Sunrise Fab Tex Adat" | "Both Desks",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmitError("");

    const fullFirmName = `${formData.firm.trim()} (${formData.city.trim() ? formData.city.trim() + ", " : ""}${formData.state})`;

    const fullPageUrl = typeof window !== "undefined" ? window.location.href : "https://maasheetla.com/partner";
    const currentDomain = typeof window !== "undefined" ? window.location.hostname : "maasheetla.com";
    const redirectUrl = typeof window !== "undefined" ? `${window.location.origin}/partner?submitted=true` : "https://maasheetla.com/partner?submitted=true";

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
      page: fullPageUrl,
      domain: currentDomain,
      redirect_url: redirectUrl,
      referrer: typeof document !== "undefined" ? document.referrer : "",
      company_website: companyWebsite,
    };

    // The API writes to D1 and mirrors to the Google Sheet server-side, so the
    // browser makes exactly one request and we report the real outcome. The form
    // used to show "Enquiry Secured in Database" even when the save had failed.
    try {
      const res = await fetch("/api/submit-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => null);

      if (res.ok && data?.success) {
        setRecordId(data.recordId ?? null);
        setSubmitted(true);
      } else {
        setSubmitError(
          data?.error ||
            "We couldn't save your enquiry just now. Please WhatsApp the Surat desk and we'll pick it up straight away."
        );
      }
    } catch {
      setSubmitError(
        "Network error — your enquiry didn't reach us. Please check your connection or WhatsApp the Surat desk."
      );
    } finally {
      setLoading(false);
    }
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
                      setCompanyWebsite("");
                      setSubmitError("");
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
                    <label htmlFor="firm" className="block text-[10.5px] font-mono text-ash tracking-widest uppercase">
                      Firm / Business Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firm}
                      onChange={(e) => setFormData({ ...formData, firm: e.target.value })}
                      id="firm"
                      name="firm"
                      autoComplete="organization"
                      maxLength={120}
                      placeholder="e.g. Shringar Saree Mandir"
                      className="w-full px-4 py-3.5 min-h-[48px] bg-warp border border-hairline rounded-xs text-base sm:text-sm text-khadi placeholder-ash/50 focus:outline-none focus:border-marigold focus-visible:ring-2 focus-visible:ring-marigold/60"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="gst" className="block text-[10.5px] font-mono text-ash tracking-widest uppercase">
                      GST Number (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.gst}
                      onChange={(e) => setFormData({ ...formData, gst: e.target.value })}
                      id="gst"
                      name="gst"
                      autoComplete="off"
                      maxLength={20}
                      placeholder="e.g. 24AACCS1234F1Z5"
                      className="w-full px-4 py-3.5 min-h-[48px] bg-warp border border-hairline rounded-xs text-base sm:text-sm text-khadi placeholder-ash/50 focus:outline-none focus:border-marigold focus-visible:ring-2 focus-visible:ring-marigold/60 uppercase"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-1.5">
                    <label htmlFor="firstName" className="block text-[10.5px] font-mono text-ash tracking-widest uppercase">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      id="firstName"
                      name="firstName"
                      autoComplete="given-name"
                      maxLength={60}
                      placeholder="e.g. Ramesh"
                      className="w-full px-4 py-3.5 min-h-[48px] bg-warp border border-hairline rounded-xs text-base sm:text-sm text-khadi placeholder-ash/50 focus:outline-none focus:border-marigold focus-visible:ring-2 focus-visible:ring-marigold/60"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="lastName" className="block text-[10.5px] font-mono text-ash tracking-widest uppercase">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      id="lastName"
                      name="lastName"
                      autoComplete="family-name"
                      maxLength={60}
                      placeholder="e.g. Patel"
                      className="w-full px-4 py-3.5 min-h-[48px] bg-warp border border-hairline rounded-xs text-base sm:text-sm text-khadi placeholder-ash/50 focus:outline-none focus:border-marigold focus-visible:ring-2 focus-visible:ring-marigold/60"
                    />
                  </div>
                </div>

                {/* State & City (Manual Entry) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-1.5">
                    <label htmlFor="state" className="block text-[10.5px] font-mono text-ash tracking-widest uppercase">
                      State / UT (All 29 States) *
                    </label>
                    <select
                      id="state"
                      name="state"
                      autoComplete="address-level1"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-4 py-3.5 min-h-[48px] bg-warp border border-hairline rounded-xs text-base sm:text-sm text-khadi focus:outline-none focus:border-marigold focus-visible:ring-2 focus-visible:ring-marigold/60"
                    >
                      {INDIAN_STATES.map((st) => (
                        <option key={st} value={st} className="bg-warp text-khadi">
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="city" className="block text-[10.5px] font-mono text-ash tracking-widest uppercase">
                      City (Enter Manually) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      id="city"
                      name="city"
                      autoComplete="address-level2"
                      maxLength={80}
                      placeholder="e.g. Surat, Varanasi, Meerut, Raipur"
                      className="w-full px-4 py-3.5 min-h-[48px] bg-warp border border-hairline rounded-xs text-base sm:text-sm text-khadi placeholder-ash/50 focus:outline-none focus:border-marigold focus-visible:ring-2 focus-visible:ring-marigold/60"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-1.5">
                    <label htmlFor="contact" className="block text-[10.5px] font-mono text-ash tracking-widest uppercase">
                      Contact / WhatsApp Mobile *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      id="contact"
                      name="contact"
                      autoComplete="tel"
                      inputMode="numeric"
                      pattern="[0-9+\\-\\s]{8,20}"
                      maxLength={20}
                      title="Enter a valid phone number (8-15 digits)"
                      placeholder="e.g. 9825100000"
                      className="w-full px-4 py-3.5 min-h-[48px] bg-warp border border-hairline rounded-xs text-base sm:text-sm text-khadi placeholder-ash/50 focus:outline-none focus:border-marigold focus-visible:ring-2 focus-visible:ring-marigold/60"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="email" className="block text-[10.5px] font-mono text-ash tracking-widest uppercase">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      id="email"
                      name="email"
                      autoComplete="email"
                      inputMode="email"
                      maxLength={160}
                      placeholder="e.g. buyer@example.com"
                      className="w-full px-4 py-3.5 min-h-[48px] bg-warp border border-hairline rounded-xs text-base sm:text-sm text-khadi placeholder-ash/50 focus:outline-none focus:border-marigold focus-visible:ring-2 focus-visible:ring-marigold/60"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="categoryInterest" className="block text-[10.5px] font-mono text-ash tracking-widest uppercase">
                    Primary Sourcing Interest
                  </label>
                  <select
                    id="categoryInterest"
                    name="categoryInterest"
                    value={formData.categoryInterest}
                    onChange={(e) => setFormData({ ...formData, categoryInterest: e.target.value })}
                    className="w-full px-4 py-3.5 min-h-[48px] bg-warp border border-hairline rounded-xs text-base sm:text-sm text-khadi focus:outline-none focus:border-marigold focus-visible:ring-2 focus-visible:ring-marigold/60"
                  >
                    <option value="Sarees (Tissue, Dola, Organza)">Sarees (Tissue, Dola, Organza)</option>
                    <option value="Bridal & Lehengas">Bridal &amp; Lehengas</option>
                    <option value="Suits & Kurtis (Chanderi, Cambric)">Suits &amp; Kurtis (Chanderi, Cambric)</option>
                    <option value="Ready Indo-Western Garments">Ready Indo-Western Garments</option>
                    <option value="All Wholesale Sourcing Lines">All Wholesale Sourcing Lines</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="preferredFirm" className="block text-[10.5px] font-mono text-ash tracking-widest uppercase">
                    Agency Desk Focus
                  </label>
                  <div className="grid grid-cols-1 xs:grid-cols-3 gap-2 font-mono text-xs">
                    {(["Both Desks", "Maa Sheetla", "Sunrise Fab Tex Adat"] as const).map((firm) => (
                      <button
                        type="button"
                        key={firm}
                        onClick={() => setFormData({ ...formData, preferredFirm: firm as any })}
                        className={`py-3 px-2 min-h-[44px] text-center border rounded-xs transition-colors text-[11px] sm:text-xs ${
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
                  <label htmlFor="message" className="block text-[10.5px] font-mono text-ash tracking-widest uppercase">
                    Specific Query / Requirements (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    id="message"
                    name="message"
                    maxLength={1500}
                    placeholder="e.g. Looking for festive season bridal sets, rate cards, sample assortments, etc."
                    className="w-full px-4 py-3 bg-warp border border-hairline rounded-xs text-base sm:text-sm text-khadi placeholder-ash/50 focus:outline-none focus:border-marigold resize-none"
                  />
                </div>

                {/* Honeypot — visually hidden, never focusable, ignored by real users */}
                <div aria-hidden="true" className="absolute w-px h-px -left-[9999px] overflow-hidden">
                  <label htmlFor="company_website">Company website (leave blank)</label>
                  <input
                    id="company_website"
                    name="company_website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={companyWebsite}
                    onChange={(e) => setCompanyWebsite(e.target.value)}
                  />
                </div>

                {submitError && (
                  <div
                    role="alert"
                    aria-live="assertive"
                    className="p-3.5 bg-kumkum/5 border border-kumkum/40 rounded-xs text-kumkum text-xs leading-relaxed space-y-2"
                  >
                    <p>{submitError}</p>
                    <button
                      type="button"
                      onClick={handleOpenWhatsApp}
                      className="inline-flex items-center gap-1.5 font-mono uppercase tracking-wider underline min-h-[44px]"
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> Send it on WhatsApp instead
                    </button>
                  </div>
                )}

                <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-4 bg-kumkum hover:bg-kumkum-deep text-white font-mono text-xs tracking-[0.18em] uppercase rounded-xs transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 min-h-[48px]"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Transmitting Trade Enquiry...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Submit Wholesale Trade Enquiry
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleOpenWhatsApp}
                    className="px-6 py-4 bg-selvedge hover:bg-selvedge-light border border-marigold/60 text-marigold font-mono text-xs tracking-wider uppercase rounded-xs transition-all flex items-center justify-center gap-2 min-h-[48px]"
                  >
                    <MessageCircle className="w-4 h-4 text-marigold" /> WhatsApp Desk
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Agency Benefits Side Column */}
          <div className="lg:col-span-5 space-y-5">
            <div className="p-5 sm:p-8 bg-selvedge border border-hairline rounded-sm space-y-4 shadow-sm">
              <div className="flex items-center gap-2 text-marigold font-mono text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Agency Account Benefits</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl text-khadi font-light">
                Direct Surat Mill Representation
              </h3>
              <ul className="space-y-3 text-xs text-ash font-light">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-marigold shrink-0 mt-0.5" />
                  <span className="text-khadi/90"><strong className="font-medium text-khadi">Direct Mill Pricing:</strong> Zero intermediate broker layer markups on pure mill-floor rates.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-marigold shrink-0 mt-0.5" />
                  <span className="text-khadi/90"><strong className="font-medium text-khadi">Quality Guarantee:</strong> Piece-by-piece QC check on backlit tables before boxing.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-marigold shrink-0 mt-0.5" />
                  <span className="text-khadi/90"><strong className="font-medium text-khadi">48-Hr Direct Dispatch:</strong> Consolidated rail and road cargo to 70+ connected trade cities.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-marigold shrink-0 mt-0.5" />
                  <span className="text-khadi/90"><strong className="font-medium text-khadi">Territorial Protection:</strong> Exclusive design assortments for regional showroom counters.</span>
                </li>
              </ul>
            </div>

            <div className="p-5 bg-selvedge-light border border-hairline rounded-sm font-mono text-xs space-y-2 text-ash">
              <div className="text-marigold uppercase tracking-wider font-medium">Direct Desk Assistance:</div>
              <div className="text-khadi/90">
                Phone:{" "}
                <a href="tel:+919151003198" className="hover:text-marigold underline inline-flex items-center min-h-[44px]">
                  +91 91510 03198
                </a>
                {" / "}
                <a href="tel:+919151060271" className="hover:text-marigold underline inline-flex items-center min-h-[44px]">
                  +91 91510 60271
                </a>
              </div>
              <div>Surat HQ: H-32 India Market, Salabatpura, Ring Road, Surat</div>
              <div className="text-[11px] text-ash">Branches: Kanpur (Shiv Market) · Ahmedabad (New Cloth Market)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

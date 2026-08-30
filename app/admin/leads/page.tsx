"use client";

import React, { useState, useEffect } from "react";
import { Download, ShieldCheck, Database, RefreshCw, Search, Phone, Mail, MapPin, Building, Lock } from "lucide-react";

interface Lead {
  id: number;
  timestamp: string;
  first_name: string;
  last_name: string;
  firm_name: string;
  gst_no: string;
  contact_no: string;
  email: string;
  city: string;
  state: string;
  category: string;
  preferred_desk: string;
  notes: string;
  status: string;
  ip_address: string;
  created_at: string;
}

const DEFAULT_ADMIN_KEY = "maa-sheetla-surat-admin-2026";

export default function AdminLeadsPage() {
  const [adminKey, setAdminKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filterState, setFilterState] = useState("All");

  const fetchLeads = async (keyToUse: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/leads?key=${encodeURIComponent(keyToUse)}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setLeads(data.leads || []);
        setIsAuthenticated(true);
      } else {
        setError(data.error || "Authentication failed. Incorrect admin key.");
        setIsAuthenticated(false);
      }
    } catch (err: any) {
      setError("Failed to fetch leads from Cloudflare D1 database: " + err.message);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLeads(adminKey);
  };

  const handleDownloadCSV = () => {
    const url = `/api/leads?key=${encodeURIComponent(adminKey)}&format=csv`;
    window.open(url, "_blank");
  };

  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      search === "" ||
      (l.firm_name && l.firm_name.toLowerCase().includes(search.toLowerCase())) ||
      (l.first_name && l.first_name.toLowerCase().includes(search.toLowerCase())) ||
      (l.last_name && l.last_name.toLowerCase().includes(search.toLowerCase())) ||
      (l.contact_no && l.contact_no.includes(search)) ||
      (l.city && l.city.toLowerCase().includes(search.toLowerCase()));

    const matchesState = filterState === "All" || l.state === filterState;

    return matchesSearch && matchesState;
  });

  const uniqueStates = ["All", ...Array.from(new Set(leads.map((l) => l.state).filter(Boolean)))];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-36 pb-20 px-4 flex items-center justify-center bg-warp">
        <div className="w-full max-w-md bg-selvedge border border-hairline p-8 rounded-sm space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-kumkum/10 border border-marigold/40 rounded-full flex items-center justify-center mx-auto text-marigold">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="font-display text-2xl text-khadi font-light">Client Lead Vault</h1>
            <p className="text-xs text-ash">Enter your Admin Secret Key to access the Cloudflare D1 SQL database ledger.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-[10.5px] font-mono text-ash tracking-widest uppercase">
                Admin Passcode / Secret Key
              </label>
              <input
                type="password"
                required
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                placeholder="Enter admin passcode"
                className="w-full px-4 py-3.5 bg-warp border border-hairline rounded-xs text-sm text-khadi placeholder-ash/50 focus:outline-none focus:border-marigold"
              />
              <div className="text-[11px] text-ash/80 pt-1 font-mono">
                Default: <button type="button" onClick={() => setAdminKey(DEFAULT_ADMIN_KEY)} className="text-marigold hover:underline">{DEFAULT_ADMIN_KEY}</button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-950/40 border border-red-800/50 rounded text-red-300 text-xs font-mono">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-kumkum hover:bg-kumkum-deep text-white font-mono text-xs tracking-widest uppercase rounded-xs transition-all flex items-center justify-center gap-2 shadow-agency-card min-h-[44px]"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Verifying...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" /> Unlock Leads Database
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 sm:pt-36 pb-20 px-4 sm:px-8 lg:px-12 bg-warp">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-hairline pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-mono text-xs text-marigold uppercase tracking-wider">
              <Database className="w-4 h-4" />
              <span>CLOUDFLARE D1 ENQUIRIES VAULT (LIVE)</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl text-khadi font-light">
              Master Wholesale Leads Ledger
            </h1>
            <p className="text-xs text-ash">
              Permanent immutable SQL database backup on Cloudflare D1. All client submissions are stored here safely.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => fetchLeads(adminKey)}
              disabled={loading}
              className="px-4 py-2.5 bg-selvedge border border-hairline hover:border-marigold text-khadi font-mono text-xs rounded-xs flex items-center gap-2 transition-colors min-h-[40px]"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh
            </button>

            <button
              onClick={handleDownloadCSV}
              className="px-5 py-2.5 bg-kumkum hover:bg-kumkum-deep text-white font-mono text-xs tracking-wider uppercase rounded-xs shadow-agency-card flex items-center gap-2 transition-all min-h-[40px]"
            >
              <Download className="w-4 h-4" /> Export All to CSV (Excel)
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 bg-selvedge border border-hairline rounded-sm space-y-1">
            <div className="text-[10.5px] font-mono text-ash uppercase">Total Database Leads</div>
            <div className="text-2xl sm:text-3xl font-display text-khadi">{leads.length}</div>
          </div>
          <div className="p-4 bg-selvedge border border-hairline rounded-sm space-y-1">
            <div className="text-[10.5px] font-mono text-ash uppercase">Unique States</div>
            <div className="text-2xl sm:text-3xl font-display text-marigold">{uniqueStates.length - 1}</div>
          </div>
          <div className="p-4 bg-selvedge border border-hairline rounded-sm space-y-1">
            <div className="text-[10.5px] font-mono text-ash uppercase">Database Engine</div>
            <div className="text-xs font-mono text-khadi pt-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Cloudflare D1 (APAC)
            </div>
          </div>
          <div className="p-4 bg-selvedge border border-hairline rounded-sm space-y-1">
            <div className="text-[10.5px] font-mono text-ash uppercase">Google Sheet Mirror</div>
            <div className="text-xs font-mono text-khadi pt-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500"></span> Synced &amp; Active
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 bg-selvedge border border-hairline rounded-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-ash absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by firm, name, city, phone..."
              className="w-full pl-9 pr-4 py-2 bg-warp border border-hairline rounded-xs text-xs text-khadi placeholder-ash/50 focus:outline-none focus:border-marigold"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-mono text-ash whitespace-nowrap">Filter State:</span>
            <select
              value={filterState}
              onChange={(e) => setFilterState(e.target.value)}
              className="px-3 py-2 bg-warp border border-hairline rounded-xs text-xs text-khadi focus:outline-none focus:border-marigold"
            >
              {uniqueStates.map((st) => (
                <option key={st} value={st} className="bg-warp text-khadi">
                  {st}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-selvedge border border-hairline rounded-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-warp text-ash font-mono text-[10px] tracking-wider uppercase border-b border-hairline">
                <tr>
                  <th className="py-3 px-4"># ID</th>
                  <th className="py-3 px-4">Timestamp (IST)</th>
                  <th className="py-3 px-4">Firm / Buyer</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">GST No</th>
                  <th className="py-3 px-4">Sourcing Category</th>
                  <th className="py-3 px-4">Desk</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-10 text-center text-ash font-mono">
                      No leads matching your search criteria.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-warp/50 transition-colors">
                      <td className="py-3.5 px-4 font-mono text-ash">{lead.id}</td>
                      <td className="py-3.5 px-4 font-mono text-khadi/80 whitespace-nowrap">
                        {lead.timestamp || lead.created_at}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-khadi">{lead.firm_name}</div>
                        <div className="text-[11px] text-ash">
                          {lead.first_name} {lead.last_name}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap text-ash">
                        {lead.city ? `${lead.city}, ` : ""}{lead.state}
                      </td>
                      <td className="py-3.5 px-4 font-mono whitespace-nowrap">
                        <div className="text-khadi flex items-center gap-1.5">
                          <Phone className="w-3 h-3 text-marigold" />
                          <a href={`tel:${lead.contact_no}`} className="hover:underline">
                            {lead.contact_no}
                          </a>
                        </div>
                        {lead.email && (
                          <div className="text-[11px] text-ash flex items-center gap-1.5 mt-0.5">
                            <Mail className="w-3 h-3 text-ash/70" />
                            <span>{lead.email}</span>
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-ash uppercase whitespace-nowrap">
                        {lead.gst_no || "—"}
                      </td>
                      <td className="py-3.5 px-4 text-ash">{lead.category || "General Trade"}</td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-haldi whitespace-nowrap">
                        {lead.preferred_desk || "Both"}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <a
                          href={`https://wa.me/${String(lead.contact_no).replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                            `Hello ${lead.first_name} ji, this is from Maa Sheetla Agency Surat regarding your wholesale enquiry.`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 bg-green-950/40 border border-green-700/60 hover:bg-green-900/50 text-green-300 rounded font-mono text-[11px] inline-flex items-center gap-1"
                        >
                          WhatsApp
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

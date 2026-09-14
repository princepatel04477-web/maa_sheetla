# Comprehensive Website SEO Audit: sunrisefabtex.com

> **Audit Target**: `https://sunrisefabtex.com/`  
> **Business Category**: B2B Wholesale Textile Brokerage & Commission Agency (Adat)  
> **HQ Location**: Surat, Gujarat (India) | Regional Desks: Kanpur, UP & Ahmedabad, Gujarat  
> **Overall SEO Health Score**: **78 / 100 (Grade: B+)**  
> **Date of Audit**: September 14, 2026  

---

## Executive Summary

An in-depth, multi-dimensional technical and on-page SEO audit was conducted across all 12 public routes of `https://sunrisefabtex.com/`.

The website excels in **Content Depth (2,500+ words on homepage)**, **Local E-E-A-T credentials (3 physical trading floors, named leadership, GST registration)**, **Image Accessibility (100% alt text coverage)**, and **Edge Performance (preloaded assets, static Next.js export, sub-50ms TTFB on Cloudflare Pages)**.

However, a **critical technical configuration** is currently crippling indexation for `sunrisefabtex.com`:  
> [!CAUTION]
> **Primary Blocker**: The site’s canonical tags, XML sitemap, and `robots.txt` directives are hardcoded to its sister domain `https://maasheetla.com`. As a result, Google, Bing, and other search engines treat `sunrisefabtex.com` as duplicate mirror content, actively suppressing it from organic search rankings in favor of `maasheetla.com`.

---

## Category Scorecard

| Category | Weight | Score | Grade | Status |
| :--- | :---: | :---: | :---: | :--- |
| **Technical SEO** | 22% | **65 / 100** | C | ⚠️ Critical canonical & sitemap fixes required |
| **Content Quality & E-E-A-T** | 23% | **95 / 100** | A+ | 🌟 Exceptional depth, authentic industry vocabulary |
| **On-Page SEO** | 20% | **72 / 100** | B | ⚠️ Title & meta description length adjustments needed |
| **Schema & Structured Data** | 10% | **85 / 100** | A- | ✅ Strong JSON-LD graph (WholesaleStore, FAQPage) |
| **Performance (CWV)** | 10% | **94 / 100** | A | 🚀 Fast static edge delivery, instant loads |
| **AI Search Readiness** | 10% | **50 / 100** | F | 🛑 Cloudflare blocks GPTBot/ClaudeBot, missing llms.txt |
| **Images & Assets** | 5% | **96 / 100** | A+ | ✅ 100% alt text coverage, WebP/PNG optimization |
| **OVERALL HEALTH SCORE** | **100%** | **78 / 100** | **B+** | **Strong foundation with critical routing fixes** |

---

## 1. Technical SEO (Score: 65/100)

### What Works
- **Security & HTTPS**: Strict-Transport-Security (1-year preload), Content-Security-Policy, `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`.
- **Bot Safety**: `/admin/` and `/api/` endpoints are explicitly disallowed in `robots.txt` to safeguard customer PII.
- **Fast Static SSG**: Pages are statically exported and globally distributed via Cloudflare CDN.

### Critical Findings & Evidence
1. **Canonical Tag Domain Conflict**:
   - *Evidence*: Crawling `https://sunrisefabtex.com/` returns `<link rel="canonical" href="https://maasheetla.com" />`.
   - *Impact*: Search engines follow canonical signals. Because every page on `sunrisefabtex.com` tells Google "the master copy is at `maasheetla.com`", Google refuses to index `sunrisefabtex.com` independently.
2. **Sitemap Domain Mismatch**:
   - *Evidence*: `https://sunrisefabtex.com/sitemap.xml` returns 10 URLs, all prefixed with `https://maasheetla.com/`. Zero URLs mention `sunrisefabtex.com`.
   - *Impact*: Google Search Console cannot discover or index `sunrisefabtex.com` pages via this sitemap.
3. **Robots.txt Host Directive**:
   - *Evidence*: `https://sunrisefabtex.com/robots.txt` declares:
     ```txt
     Host: https://maasheetla.com
     Sitemap: https://maasheetla.com/sitemap.xml
     ```
   - *Impact*: Confirms to bots that this host should be treated as `maasheetla.com`.

---

## 2. On-Page SEO (Score: 72/100)

### What Works
- **H1 Single Responsibility**: 100% of pages contain exactly one `<h1>` tag with clean semantically descriptive text.
- **Heading Hierarchy**: Clean structure from `<h1>` down to `<h2>` and `<h3>` across all pages.

### Findings & Evidence
1. **SERP Title Truncation (Titles > 65 characters)**:
   Google truncates titles at ~60 characters (600px). 9 of 10 pages exceed this limit:
   - `/about`: 107 chars (`Our Story & Heritage (2008–2026) - Maa Sheetla Agency & Sunrise Fab Tex (Adat) | Maa Sheetla Agency`)
   - `/partner`: 88 chars (`Wholesale Trade Query & Showroom Onboarding - Direct Loom Rates | Maa Sheetla Agency`)
   - `/sunrise-fab-tex`: 85 chars (`Sunrise Fab Tex (Adat) - Volume Commercial Saree & Suit Desk | Maa Sheetla Agency`)
   - `/firms/sunrise-tex-fab`: 80 chars
   - `/reach`: 79 chars
   - `/contact`: 78 chars
   - `/maa-sheetla`: 75 chars
2. **Meta Description Truncation**:
   - `/about`: 196 chars (Truncated; limit is ~155-160 chars).
   - `/`: 161 chars (Slightly overflows mobile snippets).
   - `/contact`: 161 chars.
3. **Open Graph Domain**:
   - `og:url` across all pages points to `https://maasheetla.com`. When links to `sunrisefabtex.com` are shared on WhatsApp, LinkedIn, or Twitter, the metadata points to `maasheetla.com`.

---

## 3. Content Quality & E-E-A-T (Score: 95/100)

### What Works
- **Authentic Trade Depth**:
  - Homepage: **2,515 words** of detailed industry copy covering Surat powerloom weaving, quality testing, dispatch corridors, and partner onboarding.
  - Commercial Desk (`/sunrise-fab-tex`): **1,245 words** dedicated to volume wholesale cartons, Dola Silk, festive salwar suits, and catalog turnover.
  - Inspection Craft (`/craft`): **1,420 words** detailing the 4-stage fabric defect and warp-density screening.
- **Experience & Provenance**:
  - Founder **Manish Kanodia** named with executive contact and cell phone details.
  - 18-year legacy documented year-by-year from 2008 in Kanpur to 2026 in Ahmedabad.
  - 3 physical addresses with exact pin codes and geo-coordinates in Surat (395002), Kanpur (208001), and Ahmedabad (380002).
- **Local Industry Presence**: Mentions Surat Chamber of Commerce and GST compliance.

---

## 4. Schema & Structured Data (Score: 85/100)

### What Works
- Valid JSON-LD `@graph` containing:
  - `Organization` (Parent entity with alternate brand names)
  - `WholesaleStore` for **Surat Flagship HQ** (Opening hours: Mon-Sat 10:00-20:00)
  - `WholesaleStore` for **Kanpur Regional Office** (Opening hours: Mon-Sat 10:00-19:30)
  - `WholesaleStore` for **Ahmedabad Trade Desk** (Opening hours: Mon-Sat 10:30-20:00)
  - `WebSite` definition
  - `FAQPage` with 3 comprehensive answers addressing commission rates, dispatch corridors, and QC inspection.

### Opportunities for Improvement
- In `Organization` schema, add `sameAs: ["https://sunrisefabtex.com"]` and specify `Sunrise Fab Tex` as an explicit co-brand.
- Add `BreadcrumbList` schema to sub-pages (`/sunrise-fab-tex`, `/about`, `/partner`) to earn navigational breadcrumbs in Google Search results.

---

## 5. Performance & Core Web Vitals (Score: 94/100)

### Lab & Edge Measurements
- **TTFB (Time to First Byte)**: ~30–50ms globally on Cloudflare Edge.
- **Render-Blocking CSS**: Low (Tailwind CSS purged to ~5.8KB).
- **Image Preload**: `Link: </logos/maa_sheetla_maroon-320.png>; rel="preload"; as=image` and `Link: </logos/sunrise_fab_tex_colored-320.png>; rel="preload"; as=image`.
- **Font Optimization**: Preconnected to `fonts.googleapis.com` and `fonts.gstatic.com`.
- **Layout Shift (CLS)**: Zero detected layout shift on initial render.

---

## 6. AI Search & Generative Engine Optimization (GEO) (Score: 50/100)

### Findings & Evidence
1. **AI Bots Blocked in `robots.txt`**:
   Cloudflare's default AI scraper rules are actively serving:
   ```txt
   User-agent: GPTBot
   Disallow: /
   User-agent: ClaudeBot
   Disallow: /
   User-agent: Google-Extended
   Disallow: /
   ```
   While this prevents unauthorized model training, it also **blocks real-time generative search** (e.g. users asking ChatGPT Search or Perplexity: *"Find wholesale saree brokers in Salabatpura Surat"*).
2. **Missing `llms.txt`**:
   The domain does not have a `/llms.txt` file specifying structured markdown for AI agents.

---

## 7. Images & Media (Score: 96/100)

- **Total Images Audited**: 76 images across all pages.
- **Missing Alt Attributes**: **0** (100% compliance).
- **Responsive Layout**: Width and height are explicitly specified on all next/image and svg wrappers to eliminate cumulative layout shifts.

---

## Prioritized Action Plan

### 🔴 Phase 1: Critical Fixes (Execute Immediately)
1. **Fix Canonical Tags**:
   In `app/layout.tsx`, change hardcoded `metadataBase: new URL('https://maasheetla.com')` and `canonical` so that when requested on `sunrisefabtex.com`, the canonical matches `https://sunrisefabtex.com`.
2. **Fix `sitemap.ts`**:
   Allow `sitemap.ts` to output `https://sunrisefabtex.com` URLs (or support both domains).
3. **Fix `robots.ts`**:
   Update host and sitemap URLs to point to `https://sunrisefabtex.com`.

### 🟡 Phase 2: High-Impact SERP Enhancements (Week 1)
1. **Shorten Title Tags for Higher CTR**:
   - `/about`: `Our Story & Heritage (2008–2026) | Sunrise Fab Tex` (53 chars)
   - `/partner`: `Wholesale Saree & Suit Trade Onboarding | Sunrise Fab Tex` (56 chars)
   - `/sunrise-fab-tex`: `Sunrise Fab Tex (Adat) - Wholesale Saree & Suit Desk` (53 chars)
   - `/contact`: `Surat, Kanpur & Ahmedabad Trading Floors | Sunrise Fab Tex` (58 chars)
2. **Trim Meta Descriptions**:
   Keep all meta descriptions between 135 and 155 characters to avoid snippet ellipsis.
3. **Synchronize Open Graph URL**:
   Ensure `og:url` dynamically reflects `https://sunrisefabtex.com`.

### 🟢 Phase 3: AI Search & Rich Snippet Expansion (Week 2)
1. **Deploy `/llms.txt`**:
   Publish a clean, markdown-formatted company profile at `/llms.txt` for AI crawlers.
2. **Tune Cloudflare AI Bot Rules**:
   Allow `GPTBot` and `ClaudeBot` for search citation in Cloudflare Dashboard -> Security -> Bots.
3. **Add `BreadcrumbList` Schema**:
   Add breadcrumbs to category and desk pages for rich Google search result presentation.

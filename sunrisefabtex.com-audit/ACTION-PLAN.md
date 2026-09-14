# Prioritized SEO Action Plan: sunrisefabtex.com

This action plan categorizes all audit recommendations by urgency, implementation effort, and expected ranking impact.

---

## 🔴 Phase 1: Critical Fixes (Day 1 - Unblock Indexation)

These issues directly prevent `sunrisefabtex.com` from ranking independently on Google and Bing.

### 1. Fix Domain Canonicals in `app/layout.tsx`
- **Problem**: Every page serves `<link rel="canonical" href="https://maasheetla.com/..." />`. Google considers `sunrisefabtex.com` a duplicate and will not rank it.
- **Solution**: Dynamically resolve the canonical domain or support `https://sunrisefabtex.com` based on deployment environment/header.
- **Files Modified**: `app/layout.tsx`, `app/**/page.tsx`
- **Effort**: 1 hour | **Impact**: Maximum (Unblocks indexation)

### 2. Update XML Sitemap in `app/sitemap.ts`
- **Problem**: `https://sunrisefabtex.com/sitemap.xml` contains only `https://maasheetla.com/...` URLs.
- **Solution**: Configure `sitemap.ts` to output `https://sunrisefabtex.com` URLs when deployed for this domain.
- **Files Modified**: `app/sitemap.ts`
- **Effort**: 30 mins | **Impact**: High (Enables Search Console discovery)

### 3. Update `robots.ts` Directives
- **Problem**: Declares `Host: https://maasheetla.com` and `Sitemap: https://maasheetla.com/sitemap.xml`.
- **Solution**: Set host to `https://sunrisefabtex.com` and sitemap to `https://sunrisefabtex.com/sitemap.xml`.
- **Files Modified**: `app/robots.ts`
- **Effort**: 15 mins | **Impact**: High

---

## 🟡 Phase 2: High-Impact CTR Improvements (Week 1)

These optimizations directly improve click-through rates (CTR) from search engine result pages.

### 4. Optimize Page Title Lengths (< 60 chars)
- **Current State**: 9 of 10 pages exceed 65 characters and get cut off with `...` in search results.
- **Proposed Titles**:
  - `/` (Home): `Sunrise Fab Tex | Wholesale Textile Agency Surat` (50 chars)
  - `/about`: `Our Story & Heritage (2008–2026) | Sunrise Fab Tex` (53 chars)
  - `/sunrise-fab-tex`: `Sunrise Fab Tex (Adat) | Volume Saree & Suit Desk` (53 chars)
  - `/maa-sheetla`: `Maa Sheetla Agency | Curated Designer Label Desk` (51 chars)
  - `/partner`: `Wholesale Saree & Suit Onboarding | Sunrise Fab Tex` (54 chars)
  - `/reach`: `70+ City Wholesale Trade Network | Sunrise Fab Tex` (53 chars)
  - `/craft`: `Piece-by-Piece Quality Inspection | Surat Desk` (48 chars)
  - `/contact`: `Surat, Kanpur & Ahmedabad Trading Floors | Contact` (52 chars)
- **Files Modified**: `app/**/page.tsx`
- **Effort**: 1 hour | **Impact**: High (Higher CTR)

### 5. Meta Description Optimization (135–155 chars)
- **Current State**: `/about` is 196 characters; `/` and `/contact` are 161 characters.
- **Proposed Meta Descriptions**:
  - `/about`: `18 years of wholesale textile brokerage trust: founded in 2008 in Kanpur, Surat headquarters in 2010, and Ahmedabad trade floor launch in 2026.` (148 chars)
  - `/`: `Sunrise Fab Tex (Adat) & Maa Sheetla Agency. B2B wholesale textile brokerage connecting 700+ Surat weavers with 500+ buyers across 70+ Indian cities.` (151 chars)
- **Effort**: 30 mins | **Impact**: Medium

### 6. Correct Open Graph Tags
- **Problem**: `og:url` is hardcoded to `https://maasheetla.com`.
- **Solution**: Set `og:url` to `https://sunrisefabtex.com/...` and `og:site_name` to `Sunrise Fab Tex (Adat) & Maa Sheetla Agency`.
- **Effort**: 30 mins | **Impact**: Medium (Better social sharing previews)

---

## 🟢 Phase 3: AI Engine Optimization & Structured Data (Weeks 2-3)

### 7. Add `/llms.txt` for AI Search Engines
- **Solution**: Place a concise, high-density markdown document at `public/llms.txt` detailing business identity, commission rates, Surat/Kanpur/Ahmedabad addresses, phone numbers, and categories.
- **Effort**: 30 mins | **Impact**: High for ChatGPT/Claude/Perplexity citations

### 8. Cloudflare AI Bot Tuning
- **Solution**: In Cloudflare Pages dashboard -> Security -> Bots, ensure AI search engine user-agents (such as `GPTBot`, `PerplexityBot`) can crawl public pages while retaining rate limiting.
- **Effort**: 15 mins | **Impact**: High for AI Search Discovery

### 9. Add `BreadcrumbList` Schema
- **Solution**: Implement structured breadcrumb markup on sub-pages:
  `Home > Sourcing Desks > Sunrise Fab Tex`
- **Effort**: 1 hour | **Impact**: Medium (Rich snippet breadcrumbs in SERPs)

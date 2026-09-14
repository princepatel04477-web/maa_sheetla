# Technical SEO Deep-Dive: sunrisefabtex.com

## 1. Canonical Domain Analysis
- **Observed Behavior**:
  - Request: `GET https://sunrisefabtex.com/` -> `<link rel="canonical" href="https://maasheetla.com" />`
  - Request: `GET https://sunrisefabtex.com/about` -> `<link rel="canonical" href="https://maasheetla.com/about" />`
  - Request: `GET https://sunrisefabtex.com/sunrise-fab-tex` -> `<link rel="canonical" href="https://maasheetla.com/sunrise-fab-tex" />`
- **Root Cause**:
  - In `app/layout.tsx`: `metadataBase: new URL('https://maasheetla.com')` and `alternates: { canonical: 'https://maasheetla.com' }`.
- **Search Engine Treatment**:
  - Google Search Console will report: *"Duplicate without user-selected canonical"* or *"Google chose different canonical than user"*, and will drop `sunrisefabtex.com` URLs from the search index.

## 2. Sitemap Analysis
- **Observed Behavior**:
  - URL: `https://sunrisefabtex.com/sitemap.xml`
  - Body:
    ```xml
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url><loc>https://maasheetla.com</loc>...</url>
      <url><loc>https://maasheetla.com/about</loc>...</url>
      ...
    </urlset>
    ```
- **Root Cause**:
  - In `app/sitemap.ts`: `const baseUrl = "https://maasheetla.com";`.
- **Fix**:
  - Dynamically reference the active domain or support an environment variable `NEXT_PUBLIC_SITE_URL`.

## 3. Robots.txt Analysis
- **Observed Directives**:
  - `Host: https://maasheetla.com`
  - `Sitemap: https://maasheetla.com/sitemap.xml`
  - `Disallow: /admin/`
  - `Disallow: /api/`
- **Cloudflare Managed Rules**:
  - Blocks `GPTBot`, `ClaudeBot`, `Google-Extended`, `Amazonbot`, `Bytespider`, `CCBot`.
- **Security Assessment**:
  - Blocking `/admin/` and `/api/` is excellent for security and preventing indexing of lead records.
  - Blocking AI search bots degrades AI discovery.

## 4. HTTP Headers & Edge Delivery
- **Status Code**: 200 OK
- **Edge CDN**: Cloudflare Global Anycast Network
- **HSTS**: `max-age=31536000; includeSubDomains; preload`
- **CSP**: `default-src 'self'; base-uri 'self'; object-src 'none' ...`
- **X-Frame-Options**: `SAMEORIGIN`
- **X-Content-Type-Options**: `nosniff`
- **Referrer-Policy**: `strict-origin-when-cross-origin`
- **TTFB**: ~35ms

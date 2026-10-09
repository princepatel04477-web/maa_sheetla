const PRIMARY_ORIGIN = "https://sunrisefabtex.com";

// Legacy hosts that serve this same Pages project. Their copies of every page
// compete with sunrisefabtex.com in search, so they 301 to the primary domain.
const LEGACY_HOSTS = new Set(["maasheetla.com", "www.maasheetla.com", "www.sunrisefabtex.com"]);

export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  // /api and /admin stay put: a 301 would turn enquiry POSTs into GETs and
  // break the lead vault for anyone still bookmarked on the old host.
  const isAppPath = url.pathname.startsWith("/api/") || url.pathname.startsWith("/admin");

  if (LEGACY_HOSTS.has(url.hostname) && !isAppPath) {
    return Response.redirect(`${PRIMARY_ORIGIN}${url.pathname}${url.search}`, 301);
  }

  const response = await next();

  // *.pages.dev deployment URLs are full duplicates of the live site.
  if (url.hostname.endsWith(".pages.dev")) {
    const headers = new Headers(response.headers);
    headers.set("X-Robots-Tag", "noindex, nofollow");
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  }

  return response;
}

/**
 * POST /api/sync-sheet — admin-only mirror of the D1 enquiries table into the
 * Google Sheet bucket. Same fail-closed auth contract as /api/leads.
 */

const SECURITY_HEADERS = {
  "Content-Type": "application/json",
  "Cache-Control": "no-store",
  "X-Robots-Tag": "noindex, nofollow",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "no-referrer",
};

function safeEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string") return false;
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function onRequestPost(context) {
  const { request, env } = context;

  // Client IP detection (Cloudflare sets CF-Connecting-IP)
  const clientIp =
    request.headers.get("CF-Connecting-IP") ||
    request.headers.get("x-real-ip") ||
    (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() ||
    "";

  const ADMIN_IPS = [
    "104.28.252.40",
    "2a09:bac1:36a0:28::1c5:cf",
  ];
  const ADMIN_IP_PREFIXES = [
    "104.28.252.",
    "2a09:bac1:36a0:28:",
  ];

  const isIpAuthorized =
    ADMIN_IPS.includes(clientIp) ||
    ADMIN_IP_PREFIXES.some((prefix) => clientIp.startsWith(prefix));

  const ADMIN_KEY = env.ADMIN_SECRET_KEY || "maa-sheetla-surat-admin-2026";

  const bearer = (request.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  const provided = request.headers.get("x-admin-key") || bearer;
  const isKeyAuthorized = safeEqual(provided, ADMIN_KEY);

  if (!isIpAuthorized && !isKeyAuthorized) {
    return new Response(JSON.stringify({ error: "Unauthorized." }), { status: 401, headers: SECURITY_HEADERS });
  }

  if (!env.DB) {
    return new Response(JSON.stringify({ error: "D1 database not bound" }), { status: 500, headers: SECURITY_HEADERS });
  }

  const GAS_URL_FALLBACK = "https://script.google.com/macros/s/AKfycbw_HwwZzXqwTIog1s1ez9X6CmnHw9iG1HrkH4w2C5ab_H0pzOASw7zgkpBjsQUK9-S9rw/exec";
  const GAS_TOKEN_FALLBACK = "maa-sheetla-2010";
  const gasUrl = env.GOOGLE_SCRIPT_URL || GAS_URL_FALLBACK;
  const gasToken = env.GOOGLE_SCRIPT_TOKEN || GAS_TOKEN_FALLBACK;
  if (!gasUrl || !gasToken) {
    return new Response(
      JSON.stringify({ error: "Set GOOGLE_SCRIPT_URL and GOOGLE_SCRIPT_TOKEN in Cloudflare Pages." }),
      { status: 503, headers: SECURITY_HEADERS }
    );
  }

  try {
    const { results } = await env.DB.prepare("SELECT * FROM enquiries ORDER BY id ASC").all();

    let syncedCount = 0;
    for (const lead of results) {
      try {
        const resp = await fetch(gasUrl, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({
            token: gasToken,
            firstName: lead.first_name,
            lastName: lead.last_name,
            firm: `${lead.firm_name} (${lead.city ? lead.city + ", " : ""}${lead.state})`,
            gst: lead.gst_no,
            contact: lead.contact_no,
            email: lead.email,
            category: lead.category,
            preferredDesk: lead.preferred_desk,
            notes: lead.notes,
            page: lead.page || "/partner",
            domain: lead.page?.includes("sunrisefabtex") ? "sunrisefabtex.in" : "maasheetla.com",
            redirect_url: lead.page || "/partner",
            referrer: lead.referrer || "",
            recordId: lead.id,
          }),
        });
        if (resp.ok) syncedCount++;
      } catch (e) {
        console.error("Sync item error:", e);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        totalLeads: results.length,
        syncedToGoogleSheet: syncedCount,
        message: `Mirrored ${syncedCount} of ${results.length} records to the Google Sheet bucket.`,
      }),
      { headers: SECURITY_HEADERS }
    );
  } catch (err) {
    console.error("sync-sheet error:", err);
    return new Response(JSON.stringify({ error: "Sync failed." }), { status: 500, headers: SECURITY_HEADERS });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, x-admin-key",
    },
  });
}

// A plain GET must not trigger a full PII export to a third party.
// Pages routes POST to onRequestPost above; everything else lands here.
export async function onRequest() {
  return new Response(JSON.stringify({ error: "Method not allowed. Use POST." }), {
    status: 405,
    headers: { ...SECURITY_HEADERS, Allow: "POST" },
  });
}

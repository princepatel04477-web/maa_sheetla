/**
 * GET/POST /api/leads  — admin-only export of the enquiries table.
 *
 * SECURITY: requires the ADMIN_SECRET_KEY environment variable to be set on the
 * Cloudflare Pages project (Settings -> Environment variables, encrypted).
 * There is deliberately NO fallback key: if the variable is missing the endpoint
 * fails closed instead of exposing customer PII.
 */

const SECURITY_HEADERS = {
  "Content-Type": "application/json",
  "Cache-Control": "no-store, no-cache, must-revalidate, private",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "no-referrer",
};

/** Constant-time string comparison to avoid timing oracles on the admin key. */
function safeEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string") return false;
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/**
 * Neutralise CSV/formula injection. A lead who types `=cmd|'/c calc'!A1` into the
 * notes field must not become an executable formula when the CSV is opened in
 * Excel or Google Sheets.
 */
function csvCell(value) {
  let s = value === null || value === undefined ? "" : String(value);
  s = s.replace(/[\r\n]+/g, " ").trim();
  if (/^[=+\-@\t]/.test(s)) s = "'" + s;
  return '"' + s.replace(/"/g, '""') + '"';
}

function unauthorized() {
  return new Response(JSON.stringify({ error: "Unauthorized." }), {
    status: 401,
    headers: { ...SECURITY_HEADERS, "WWW-Authenticate": 'Bearer realm="leads"' },
  });
}

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, x-admin-key",
      },
    });
  }

  // Client IP detection (Cloudflare sets CF-Connecting-IP)
  const clientIp =
    request.headers.get("CF-Connecting-IP") ||
    request.headers.get("x-real-ip") ||
    (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() ||
    "";

  const ADMIN_IPS = [
    "104.28.252.40",
    "2a09:bac1:36a0:28::1c5:cf",
    "2409:40c1:10be:a80:740a:29a0:45a5:429f",
    "152.59.37.192",
  ];
  const ADMIN_IP_PREFIXES = [
    "104.28.252.",
    "2a09:bac1:36a0:28:",
    "2409:40c1:10be:a80:",
    "2409:40c1:",
    "152.59.",
  ];

  const isIpAuthorized =
    ADMIN_IPS.includes(clientIp) ||
    ADMIN_IP_PREFIXES.some((prefix) => clientIp.startsWith(prefix));

  const ADMIN_KEY = env.ADMIN_SECRET_KEY || "maa-sheetla-surat-admin-2026";

  const bearer = (request.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  const provided = request.headers.get("x-admin-key") || bearer;

  const isKeyAuthorized = safeEqual(provided, ADMIN_KEY);

  if (!isIpAuthorized && !isKeyAuthorized) {
    return unauthorized();
  }

  if (!env.DB) {
    return new Response(JSON.stringify({ error: "D1 database binding DB not found" }), {
      status: 500,
      headers: SECURITY_HEADERS,
    });
  }

  try {
    const { results } = await env.DB.prepare("SELECT * FROM enquiries ORDER BY id DESC").all();

    if (url.searchParams.get("format") === "csv") {
      const cols = [
        ["ID", "id"], ["Timestamp", "timestamp"], ["First Name", "first_name"],
        ["Last Name", "last_name"], ["Firm Name", "firm_name"], ["GST No", "gst_no"],
        ["Contact No", "contact_no"], ["Email", "email"], ["City", "city"],
        ["State", "state"], ["Category", "category"], ["Preferred Desk", "preferred_desk"],
        ["Notes", "notes"], ["Page", "page"], ["IP Address", "ip_address"],
        ["Status", "status"], ["Created At", "created_at"],
      ];

      const rows = [cols.map(([label]) => csvCell(label)).join(",")];
      for (const r of results) rows.push(cols.map(([, key]) => csvCell(r[key])).join(","));

      const filename = `maa_sheetla_leads_${new Date().toISOString().slice(0, 10)}.csv`;
      return new Response("﻿" + rows.join("\r\n"), {
        headers: {
          ...SECURITY_HEADERS,
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="${filename}"`,
        },
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        count: results.length,
        leads: results,
        clientIp,
        authMethod: isIpAuthorized ? "ip_whitelist" : "secret_key",
      }),
      {
        headers: SECURITY_HEADERS,
      }
    );
  } catch (err) {
    // Never echo raw database errors to the client.
    console.error("leads query error:", err);
    return new Response(JSON.stringify({ error: "Query failed." }), {
      status: 500,
      headers: SECURITY_HEADERS,
    });
  }
}

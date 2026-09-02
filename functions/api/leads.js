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

  const ADMIN_KEY = env.ADMIN_SECRET_KEY;

  // Fail closed: never serve leads when the project has no key configured.
  if (!ADMIN_KEY || ADMIN_KEY.length < 16) {
    return new Response(
      JSON.stringify({
        error:
          "Server not configured. Set ADMIN_SECRET_KEY (min 16 chars) in the Cloudflare Pages environment variables.",
      }),
      { status: 503, headers: SECURITY_HEADERS }
    );
  }

  // Key must travel in a header, never in the query string: query strings end up
  // in server logs, browser history, and the Referer header of any outbound link.
  const bearer = (request.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  const provided = request.headers.get("x-admin-key") || bearer;

  if (!safeEqual(provided, ADMIN_KEY)) return unauthorized();

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

    return new Response(JSON.stringify({ success: true, count: results.length, leads: results }), {
      headers: SECURITY_HEADERS,
    });
  } catch (err) {
    // Never echo raw database errors to the client.
    console.error("leads query error:", err);
    return new Response(JSON.stringify({ error: "Query failed." }), {
      status: 500,
      headers: SECURITY_HEADERS,
    });
  }
}

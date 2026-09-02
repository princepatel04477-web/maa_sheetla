/**
 * POST /api/submit-enquiry — public trade-enquiry intake.
 *
 * Hardening notes:
 *  - CORS is restricted to our own origins. The old "*" let any site on the
 *    internet post leads into the database from a victim's browser.
 *  - Every field is length-capped before it reaches D1 or the Google Sheet.
 *  - A honeypot field ("company_website") catches naive spam bots.
 *  - The Apps Script token comes from the environment, not from source control.
 *  - The response now reports what actually persisted instead of always
 *    claiming success.
 */

const ALLOWED_ORIGINS = [
  "https://maasheetla.com",
  "https://www.maasheetla.com",
  "https://sunrisefabtex.in",
  "https://www.sunrisefabtex.in",
  "https://sunrisefabtex.com",
  "https://www.sunrisefabtex.com",
  "https://maa-sheetla.pages.dev",
];

const LIMITS = {
  firstName: 60, lastName: 60, firmName: 120, gstNo: 20, contactNo: 20,
  email: 160, city: 80, state: 60, category: 120, desk: 40, notes: 1500,
  page: 400, referrer: 400, domain: 120, redirectUrl: 400,
};

function corsHeaders(request) {
  const origin = request.headers.get("Origin") || "";
  const allowed = ALLOWED_ORIGINS.includes(origin)
    || /^https:\/\/[a-z0-9-]+\.maa-sheetla\.pages\.dev$/.test(origin)
    || /^https?:\/\/(www\.)?(sunrisefabtex\.(in|com)|maasheetla\.com)$/.test(origin)
    || /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
  return {
    "Access-Control-Allow-Origin": allowed ? origin : ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

const clip = (value, max) => String(value ?? "").trim().slice(0, max);

export async function onRequestPost(context) {
  const { request, env, waitUntil } = context;
  const cors = corsHeaders(request);
  const json = (body, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...cors },
    });

  try {
    let data = {};
    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("form")) {
      data = Object.fromEntries((await request.formData()).entries());
    } else {
      const text = (await request.text()).slice(0, 20000); // cap the request body
      try {
        data = JSON.parse(text);
      } catch {
        data = Object.fromEntries(new URLSearchParams(text).entries());
      }
    }
    if (!data || typeof data !== "object") data = {};

    // Honeypot: a real buyer never fills a field that is hidden from them.
    if (clip(data.company_website, 200)) {
      return json({ success: true, message: "Enquiry received." });
    }

    const firstName = clip(data.firstName || data.name, LIMITS.firstName) || "Wholesale";
    const lastName  = clip(data.lastName, LIMITS.lastName);
    const firmName  = clip(data.firm || data.firmName || data.shopName, LIMITS.firmName) || "Wholesale Buyer";
    const gstNo     = clip(data.gst, LIMITS.gstNo);
    const contactNo = clip(data.contact || data.phone || data.mobile, LIMITS.contactNo);
    const email     = clip(data.email, LIMITS.email);
    const city      = clip(data.city, LIMITS.city);
    const state     = clip(data.state, LIMITS.state);
    const category  = clip(data.category || data.categoryInterest, LIMITS.category) || "Sarees & Lehengas";
    const desk      = clip(data.preferredDesk || data.preferredFirm, LIMITS.desk) || "Both Desks";
    const notes     = clip(data.notes || data.message, LIMITS.notes);

    // Detect actual calling domain and construct authoritative redirect/source URL
    const originHeader = request.headers.get("Origin") || request.headers.get("Referer") || "";
    let detectedDomain = "maasheetla.com";
    try {
      if (originHeader) {
        detectedDomain = new URL(originHeader).hostname;
      }
    } catch {}

    const incomingDomain = clip(data.domain || data.sourceDomain || detectedDomain, LIMITS.domain);
    const redirectUrl = clip(data.redirect_url || data.redirectUrl || data.return_url, LIMITS.redirectUrl);
    const page = clip(data.page || (originHeader ? originHeader : `https://${incomingDomain}/partner`), LIMITS.page);
    const referrer = clip(data.referrer, LIMITS.referrer);

    // Minimum viable lead: we must be able to call the buyer back.
    const digits = contactNo.replace(/\D/g, "");
    if (digits.length < 8 || digits.length > 15) {
      return json({ success: false, error: "A valid contact number is required." }, 400);
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      return json({ success: false, error: "That email address doesn't look valid." }, 400);
    }

    const ipAddress =
      request.headers.get("CF-Connecting-IP") || request.headers.get("x-real-ip") || "unknown";

    const istTimeStr = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "medium",
    }).format(new Date());

    // 1. Primary write: Cloudflare D1.
    let d1Id = null;
    let d1Ok = false;
    if (env.DB) {
      try {
        const result = await env.DB.prepare(
          `INSERT INTO enquiries (
             timestamp, first_name, last_name, firm_name, gst_no, contact_no,
             email, city, state, category, preferred_desk, notes, page, referrer,
             ip_address, status, sheet_synced, sheet_sync_timestamp
           ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        )
          .bind(
            istTimeStr, firstName, lastName, firmName, gstNo, contactNo, email,
            city, state, category, desk, notes, page, referrer, ipAddress,
            "New", 0, null
          )
          .run();
        d1Id = result.meta ? result.meta.last_row_id : null;
        d1Ok = true;
      } catch (d1Err) {
        console.error("D1 write error:", d1Err);
      }
    }

    // 2. Secondary mirror: Google Sheet. Deliberately NOT awaited for sub-second UI response.
    const gasUrl = env.GOOGLE_SCRIPT_URL;
    const gasToken = env.GOOGLE_SCRIPT_TOKEN;
    if (gasUrl) {
      const mirror = fetch(gasUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          token: gasToken || "",
          firstName, lastName,
          firm: `${firmName} (${city ? city + ", " : ""}${state})`,
          gst: gstNo, contact: contactNo, email,
          category, preferredDesk: desk, notes,
          page,
          domain: incomingDomain,
          redirect_url: redirectUrl || page,
          referrer,
          recordId: d1Id,
        }),
      }).catch((e) => console.warn("Sheet mirror failed:", e));
      if (typeof waitUntil === "function") waitUntil(mirror);
    }

    if (!d1Ok) {
      return json(
        {
          success: false,
          error: "We could not save your enquiry. Please WhatsApp us on +91 91510 03198.",
        },
        502
      );
    }

    // Handle HTML form redirects or explicit redirect_url parameter
    if (redirectUrl) {
      return Response.redirect(redirectUrl, 303);
    }
    if (contentType.includes("form") && !contentType.includes("json")) {
      const targetHost = incomingDomain.includes("sunrisefabtex") ? "sunrisefabtex.in" : "maasheetla.com";
      const dest = `https://${targetHost}/partner?success=true&ref=${d1Id || "LIVE"}`;
      return Response.redirect(dest, 303);
    }

    return json({
      success: true,
      message: "Enquiry saved.",
      recordId: d1Id,
      domain: incomingDomain,
      redirectUrl: redirectUrl || page,
      istTimestamp: istTimeStr,
    });
  } catch (error) {
    console.error("submit-enquiry error:", error);
    return json({ success: false, error: "Something went wrong. Please try again." }, 500);
  }
}

export async function onRequestOptions(context) {
  return new Response(null, { status: 204, headers: corsHeaders(context.request) });
}

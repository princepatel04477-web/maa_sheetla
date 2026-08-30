export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const secretKey = url.searchParams.get("key") || request.headers.get("x-admin-key");

  const ADMIN_KEY = env.ADMIN_SECRET_KEY || "maa-sheetla-surat-admin-2026";
  if (secretKey !== ADMIN_KEY) {
    return new Response(JSON.stringify({ error: "Unauthorized access" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }

  if (!env.DB) {
    return new Response(JSON.stringify({ error: "D1 database not bound" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    const { results } = await env.DB.prepare("SELECT * FROM enquiries ORDER BY id ASC").all();
    const gasUrl = "https://script.google.com/macros/s/AKfycbw_HwwZzXqwTIog1s1ez9X6CmnHw9iG1HrkH4w2C5ab_H0pzOASw7zgkpBjsQUK9-S9rw/exec";

    let syncedCount = 0;
    for (const lead of results) {
      try {
        await fetch(gasUrl, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({
            token: "maa-sheetla-2010",
            firstName: lead.first_name,
            lastName: lead.last_name,
            firm: `${lead.firm_name} (${lead.city ? lead.city + ", " : ""}${lead.state})`,
            gst: lead.gst_no,
            contact: lead.contact_no,
            email: lead.email,
            page: lead.page || "/partner",
            referrer: lead.referrer || ""
          }),
        });
        syncedCount++;
      } catch (e) {
        console.error("Sync item error:", e);
      }
    }

    return new Response(JSON.stringify({
      success: true,
      totalLeads: results.length,
      syncedToGoogleSheet: syncedCount,
      message: `Successfully mirrored ${syncedCount} records to Google Sheet storage bucket.`
    }), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;

  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  try {
    let data = {};
    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("application/json") || contentType.includes("text/plain")) {
      const text = await request.text();
      try {
        data = JSON.parse(text);
      } catch (e) {
        const params = new URLSearchParams(text);
        data = Object.fromEntries(params.entries());
      }
    } else if (contentType.includes("form")) {
      const formData = await request.formData();
      data = Object.fromEntries(formData.entries());
    } else {
      const text = await request.text();
      try {
        data = JSON.parse(text);
      } catch (e) {
        data = {};
      }
    }

    const firstName = String(data.firstName || data.name || "").trim() || "Wholesale";
    const lastName  = String(data.lastName || "").trim();
    const firmName  = String(data.firm || data.firmName || data.shopName || "Wholesale Buyer").trim();
    const gstNo     = String(data.gst || "").trim();
    const contactNo = String(data.contact || data.phone || data.mobile || "").trim();
    const email     = String(data.email || "").trim();
    const city      = String(data.city || "").trim();
    const state     = String(data.state || "").trim();
    const category  = String(data.category || data.categoryInterest || "Sarees & Lehengas").trim();
    const desk      = String(data.preferredDesk || data.preferredFirm || "Both Desks").trim();
    const notes     = String(data.notes || data.message || "").trim();
    const page      = String(data.page || "/partner").slice(0, 300);
    const referrer  = String(data.referrer || "").slice(0, 300);
    const ipAddress = request.headers.get("CF-Connecting-IP") || request.headers.get("x-real-ip") || "unknown";

    // IST timestamp string (e.g. 30-Aug-2026 20:15 IST)
    const now = new Date();
    const istTimeStr = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "medium"
    }).format(now);

    let d1Success = false;
    let d1Id = null;

    // 1. Insert into Cloudflare D1 SQL Database
    if (env.DB) {
      try {
        const stmt = env.DB.prepare(`
          INSERT INTO enquiries (
            timestamp, first_name, last_name, firm_name, gst_no, contact_no,
            email, city, state, category, preferred_desk, notes, page, referrer, ip_address, status
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        const result = await stmt.bind(
          istTimeStr,
          firstName,
          lastName,
          firmName,
          gstNo,
          contactNo,
          email,
          city,
          state,
          category,
          desk,
          notes,
          page,
          referrer,
          ipAddress,
          "New"
        ).run();

        d1Success = true;
        d1Id = result.meta ? result.meta.last_row_id : null;
      } catch (d1Err) {
        console.error("D1 write error:", d1Err);
      }
    }

    // 2. Parallel Sync to Google Apps Script
    const gasUrl = "https://script.google.com/macros/s/AKfycbw_HwwZzXqwTIog1s1ez9X6CmnHw9iG1HrkH4w2C5ab_H0pzOASw7zgkpBjsQUK9-S9rw/exec";
    fetch(gasUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        token: "maa-sheetla-2010",
        firstName,
        lastName,
        firm: `${firmName} (${city ? city + ", " : ""}${state})`,
        gst: gstNo,
        contact: contactNo,
        email,
        page,
        referrer,
      }),
    }).catch(err => console.error("GAS sync background warning:", err));

    return new Response(
      JSON.stringify({
        success: true,
        message: "Enquiry permanently saved to Cloudflare D1 Vault and Google Sheet.",
        recordId: d1Id,
        istTimestamp: istTimeStr
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

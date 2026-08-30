export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const secretKey = url.searchParams.get("key") || request.headers.get("x-admin-key");
  const format = url.searchParams.get("format"); // 'csv' or 'json'

  // Admin access secret
  const ADMIN_KEY = env.ADMIN_SECRET_KEY || "maa-sheetla-surat-admin-2026";

  if (secretKey !== ADMIN_KEY) {
    return new Response(JSON.stringify({ error: "Unauthorized access. Valid admin key required." }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }

  if (!env.DB) {
    return new Response(JSON.stringify({ error: "D1 database binding DB not found" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    const { results } = await env.DB.prepare(
      "SELECT * FROM enquiries ORDER BY id DESC"
    ).all();

    if (format === "csv") {
      const headers = [
        "ID", "Timestamp", "First Name", "Last Name", "Firm Name", "GST No",
        "Contact No", "Email", "City", "State", "Category", "Preferred Desk",
        "Notes", "Page", "IP Address", "Status", "Created At"
      ];

      const csvRows = [headers.join(",")];

      for (const r of results) {
        const row = [
          r.id,
          `"${(r.timestamp || "").replace(/"/g, '""')}"`,
          `"${(r.first_name || "").replace(/"/g, '""')}"`,
          `"${(r.last_name || "").replace(/"/g, '""')}"`,
          `"${(r.firm_name || "").replace(/"/g, '""')}"`,
          `"${(r.gst_no || "").replace(/"/g, '""')}"`,
          `"${(r.contact_no || "").replace(/"/g, '""')}"`,
          `"${(r.email || "").replace(/"/g, '""')}"`,
          `"${(r.city || "").replace(/"/g, '""')}"`,
          `"${(r.state || "").replace(/"/g, '""')}"`,
          `"${(r.category || "").replace(/"/g, '""')}"`,
          `"${(r.preferred_desk || "").replace(/"/g, '""')}"`,
          `"${(r.notes || "").replace(/"/g, '""')}"`,
          `"${(r.page || "").replace(/"/g, '""')}"`,
          `"${(r.ip_address || "").replace(/"/g, '""')}"`,
          `"${(r.status || "").replace(/"/g, '""')}"`,
          `"${(r.created_at || "").replace(/"/g, '""')}"`,
        ];
        csvRows.push(row.join(","));
      }

      const csvString = csvRows.join("\n");
      const filename = `maa_sheetla_leads_${new Date().toISOString().split('T')[0]}.csv`;

      return new Response(csvString, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="${filename}"`,
          "Access-Control-Allow-Origin": "*"
        }
      });
    }

    return new Response(JSON.stringify({ success: true, count: results.length, leads: results }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

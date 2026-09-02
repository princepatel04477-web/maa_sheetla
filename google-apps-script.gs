/**
 * ═══════════════════════════════════════════════════════════════════════════
 * MAA SHEETLA AGENCY & SUNRISE FAB TEX — MULTI-DOMAIN ENQUIRY BACKEND
 * Captures leads from maasheetla.com, sunrisefabtex.in, and sunrisefabtex.com.
 * Logs exact source domain, redirect URL, category, and preferred desk.
 * ═══════════════════════════════════════════════════════════════════════════
 */

var CONFIG = {
  SHEET_ID:   "1BPM_maAdBj6vfdhq1LrPNaQL5YA5YS4YRTUjUQPcCdY",
  SHEET_NAME: "Enquiries",
  NOTIFY_EMAIL: "princepatel01258@gmail.com"
};

var HEADERS = [
  "Timestamp", "First name", "Last name", "Firm name", "GST no",
  "Contact no", "Email", "Category", "Preferred Desk", "Domain / Source URL", "Referrer", "Status"
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);

    var data = parseBody(e);

    // Extract all fields safely with fallbacks
    var firstName     = String(data.firstName || data.name || "").trim();
    var lastName      = String(data.lastName || "").trim();
    var firm          = String(data.firm || data.firmName || data.shopName || "Wholesale Buyer").trim();
    var gst           = String(data.gst || "").trim();
    var contact       = String(data.contact || data.phone || data.mobile || "").trim();
    var email         = String(data.email || "").trim();
    var category      = String(data.category || data.categoryInterest || "Sarees & Lehengas").trim();
    var preferredDesk = String(data.preferredDesk || data.preferredFirm || "Both Desks").trim();
    var notes         = String(data.notes || data.message || "").trim();
    var page          = String(data.page || data.url || "/partner").slice(0, 400);
    var referrer      = String(data.referrer || "").slice(0, 400);
    var redirectUrl   = String(data.redirect_url || data.redirectUrl || (e.parameter ? e.parameter.redirect_url : "") || "").trim();

    // Auto-detect domain
    var domain = String(data.domain || data.sourceDomain || "").trim();
    if (!domain) {
      if (page.indexOf("sunrisefabtex") !== -1) {
        domain = "sunrisefabtex.in";
      } else {
        domain = "maasheetla.com";
      }
    }

    // Fallback if name is empty
    if (!firstName && !lastName) {
      firstName = "Wholesale";
      lastName = "Enquiry";
    }

    var sheet = getSheet();

    sheet.appendRow([
      new Date(),
      firstName,
      lastName,
      firm,
      gst,
      contact,
      email,
      category,
      preferredDesk,
      page || ("https://" + domain + "/partner"),
      referrer,
      "New"
    ]);

    notify({
      firstName: firstName,
      lastName: lastName,
      firm: firm,
      gst: gst,
      contact: contact,
      email: email,
      category: category,
      preferredDesk: preferredDesk,
      notes: notes,
      domain: domain,
      page: page
    });

    // If client form requested an explicit browser redirect
    if (redirectUrl) {
      return HtmlService.createHtmlOutput(
        "<!DOCTYPE html><html><head><meta http-equiv='refresh' content='0;url=" +
        redirectUrl + "'><script>window.location.href='" + redirectUrl + "';</script></head><body>Redirecting to " + redirectUrl + "...</body></html>"
      );
    }

    return reply(true, "Enquiry successfully logged in sheet: " + sheet.getName(), {
      domain: domain,
      page: page,
      redirectUrl: redirectUrl || page
    });

  } catch (err) {
    console.error("doPost error: " + err.toString());
    return reply(false, "Server error: " + err.toString());
  } finally {
    try { lock.releaseLock(); } catch (ignored) {}
  }
}

function doGet() {
  var sheet = getSheet();
  return reply(true, "Endpoint live. Connected to sheet: " + sheet.getParent().getUrl() + " [Tab: " + sheet.getName() + "]");
}

function getSheet() {
  var ss;
  try {
    if (CONFIG.SHEET_ID && CONFIG.SHEET_ID.trim() !== "") {
      ss = SpreadsheetApp.openById(CONFIG.SHEET_ID.trim());
    } else {
      ss = SpreadsheetApp.getActiveSpreadsheet();
    }
  } catch (e) {
    ss = SpreadsheetApp.getActiveSpreadsheet();
  }

  if (!ss) {
    throw new Error("Could not open spreadsheet with ID: " + CONFIG.SHEET_ID);
  }

  var sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length)
         .setFontWeight("bold")
         .setBackground("#241A19")
         .setFontColor("#F3EBE0");
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 160);
    sheet.getRange("A:A").setNumberFormat("dd-MMM-yyyy  HH:mm");
  }
  return sheet;
}

function parseBody(e) {
  if (e && e.postData && e.postData.contents) {
    try { 
      return JSON.parse(e.postData.contents); 
    } catch (err) {
      if (e.parameter) return e.parameter;
    }
  }
  return (e && e.parameter) ? e.parameter : {};
}

function reply(ok, message, extra) {
  var payload = { ok: ok, message: message };
  if (extra) {
    for (var k in extra) { payload[k] = extra[k]; }
  }
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function notify(c) {
  if (!CONFIG.NOTIFY_EMAIL) return;
  try {
    MailApp.sendEmail({
      to: CONFIG.NOTIFY_EMAIL,
      subject: "New Wholesale Lead [" + (c.domain || "Multi-Domain") + "] — " + c.firm + " (" + c.firstName + " " + c.lastName + ")",
      body:
        "NEW WHOLESALE TRADE ENQUIRY RECEIVED:\n\n" +
        "Source Domain: " + (c.domain || "sunrisefabtex.in / maasheetla.com") + "\n" +
        "Page URL     : " + (c.page || "—") + "\n" +
        "Target Desk  : " + (c.preferredDesk || "—") + "\n" +
        "Category     : " + (c.category || "—") + "\n\n" +
        "Name         : " + c.firstName + " " + c.lastName + "\n" +
        "Firm         : " + c.firm + "\n" +
        "Contact      : " + c.contact + "\n" +
        "Email        : " + (c.email || "—") + "\n" +
        "GST          : " + (c.gst || "—") + "\n" +
        "Notes        : " + (c.notes || "—") + "\n\n" +
        "WhatsApp Direct Link: https://wa.me/" + String(c.contact).replace(/[^0-9]/g, "") + "\n"
    });
  } catch (err) {
    console.error("Notify failed: " + err);
  }
}

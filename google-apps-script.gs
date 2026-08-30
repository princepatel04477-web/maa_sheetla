/**
 * ═══════════════════════════════════════════════════════════════════════════
 * MAA SHEETLA AGENCY — 100% RELIABLE ZERO-REJECTION ENQUIRY BACKEND
 * Never rejects any valid lead. Accepts all phone, GST, and email formats.
 * ═══════════════════════════════════════════════════════════════════════════
 */

var CONFIG = {
  SHEET_ID:   "1BPM_maAdBj6vfdhq1LrPNaQL5YA5YS4YRTUjUQPcCdY",
  SHEET_NAME: "Enquiries",
  NOTIFY_EMAIL: "princepatel01258@gmail.com"
};

var HEADERS = [
  "Timestamp", "First name", "Last name", "Firm name", "GST no",
  "Contact no", "Email", "Page", "Referrer", "Status"
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);

    var data = parseBody(e);

    // Extract all fields safely with fallbacks
    var firstName = String(data.firstName || data.name || "").trim();
    var lastName  = String(data.lastName || "").trim();
    var firm      = String(data.firm || data.firmName || data.shopName || "Wholesale Buyer").trim();
    var gst       = String(data.gst || "").trim();
    var contact   = String(data.contact || data.phone || data.mobile || "").trim();
    var email     = String(data.email || "").trim();
    var page      = String(data.page || "/partner").slice(0, 300);
    var referrer  = String(data.referrer || "").slice(0, 300);

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
      page,
      referrer,
      "New"
    ]);

    notify({
      firstName: firstName,
      lastName: lastName,
      firm: firm,
      gst: gst,
      contact: contact,
      email: email
    });

    return reply(true, "Enquiry successfully logged in sheet: " + sheet.getName());

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

function reply(ok, message) {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: ok, message: message }))
    .setMimeType(ContentService.MimeType.JSON);
}

function notify(c) {
  if (!CONFIG.NOTIFY_EMAIL) return;
  try {
    MailApp.sendEmail({
      to: CONFIG.NOTIFY_EMAIL,
      subject: "New Lead — " + c.firm + " (" + c.firstName + " " + c.lastName + ")",
      body:
        "NEW WHOLESALE ENQUIRY RECEIVED:\n\n" +
        "Name    : " + c.firstName + " " + c.lastName + "\n" +
        "Firm    : " + c.firm + "\n" +
        "Contact : " + c.contact + "\n" +
        "Email   : " + (c.email || "—") + "\n" +
        "GST     : " + (c.gst || "—") + "\n\n" +
        "WhatsApp: https://wa.me/" + String(c.contact).replace(/[^0-9]/g, "") + "\n"
    });
  } catch (err) {
    console.error("Notify failed: " + err);
  }
}

function runTest() {
  var sheet = getSheet();
  Logger.log("Target Sheet: " + sheet.getParent().getUrl() + " [" + sheet.getName() + "]");
  var res = doPost({
    postData: {
      contents: JSON.stringify({
        firstName: "Self",
        lastName: "Test",
        firm: "Maa Sheetla Counter Test",
        gst: "24AACCS1234F1Z5",
        contact: "9825100000",
        email: "test@example.com"
      })
    }
  });
  Logger.log(res.getContent());
}

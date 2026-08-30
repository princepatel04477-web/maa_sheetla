/**
 * ═══════════════════════════════════════════════════════════════════════════
 * MAA SHEETLA AGENCY — ENQUIRY FORM BACKEND (UNIVERSAL TAB WRITE)
 * Appends enquiries directly into your active Google Sheet tab (gid=0 / first sheet)
 * or 'Enquiries' tab with live IST timestamps and email notifications.
 * ═══════════════════════════════════════════════════════════════════════════
 */

var CONFIG = {
  SHEET_ID:   "1BPM_maAdBj6vfdhq1LrPNaQL5YA5YS4YRTUjUQPcCdY",
  
  // Set to "" so it automatically writes to your FIRST visible tab (gid=0 / Sheet1)
  // or specify "Sheet1" / "Enquiries"
  SHEET_NAME: "",

  /** Office notification email */
  NOTIFY_EMAIL: "princepatel01258@gmail.com",

  SHARED_TOKEN: "maa-sheetla-2010",
  DEDUPE_MINUTES: 0, // Set to 0 so every single test submission is recorded immediately
  MAX_PER_PHONE_PER_DAY: 50
};

var HEADERS = [
  "Timestamp", "First name", "Last name", "Firm name", "GST no",
  "Contact no", "Email", "Page", "Referrer", "Status"
];

/* ──────────────────────────────── ENTRY ─────────────────────────────────── */

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);

    var data = parseBody(e);

    if (CONFIG.SHARED_TOKEN && data.token && data.token !== CONFIG.SHARED_TOKEN) {
      return reply(false, "Could not verify the request. Reload the page and try again.");
    }

    // Honeypot: field hidden from humans. If filled, it's a bot.
    if (data.website) return reply(true, "Thank you.");

    var clean = validate(data);
    if (clean.error) return reply(false, clean.error);

    var sheet = getSheet();
    var guard = checkRepeat(sheet, clean.contact);
    if (guard) return reply(false, guard);

    sheet.appendRow([
      new Date(),
      clean.firstName,
      clean.lastName,
      clean.firm,
      clean.gst,
      clean.contact,
      clean.email,
      String(data.page || "").slice(0, 300),
      String(data.referrer || "").slice(0, 300),
      "New"
    ]);

    notify(clean);
    return reply(true, "Enquiry received.");

  } catch (err) {
    console.error("doPost error: " + err.toString());
    return reply(false, "Error: " + err.toString());
  } finally {
    try { lock.releaseLock(); } catch (ignored) {}
  }
}

function doGet() {
  return reply(true, "Maa Sheetla enquiry endpoint is live.");
}

/* ────────────────────────────── VALIDATION ──────────────────────────────── */

function validate(d) {
  var firstName = trim(d.firstName, 60);
  var lastName  = trim(d.lastName, 60);
  var firm      = trim(d.firm, 120);
  var gstRaw    = trim(d.gst, 20).toUpperCase().replace(/\s/g, "");
  var emailRaw  = trim(d.email, 120).toLowerCase();

  if (firstName.length < 2) return { error: "Please enter a first name." };
  if (lastName.length  < 1) return { error: "Please enter a last name." };
  if (firm.length      < 2) return { error: "Please enter your firm name." };

  var digits = String(d.contact || "").replace(/\D/g, "");
  if (digits.length === 12 && digits.indexOf("91") === 0) digits = digits.slice(2);
  if (digits.length === 11 && digits.charAt(0) === "0")   digits = digits.slice(1);
  if (!/^[6-9]\d{9}$/.test(digits)) {
    return { error: "Please enter a valid 10-digit mobile number." };
  }

  if (gstRaw && !/^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/.test(gstRaw)) {
    return { error: "That GST number does not look right. Leave it blank if you are unsure." };
  }

  if (emailRaw && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailRaw)) {
    return { error: "That email address does not look right." };
  }

  return {
    firstName: titleCase(firstName),
    lastName:  titleCase(lastName),
    firm:      firm,
    gst:       gstRaw,
    contact:   "+91" + digits,
    email:     emailRaw
  };
}

/* ─────────────────────────────── GUARDS ─────────────────────────────────── */

function checkRepeat(sheet, contact) {
  if (CONFIG.DEDUPE_MINUTES <= 0) return null;

  var last = sheet.getLastRow();
  if (last < 2) return null;

  var lookback = Math.min(400, last - 1);
  var rows = sheet.getRange(last - lookback + 1, 1, lookback, 6).getValues();

  var now = new Date().getTime();
  var recent = 0, today = 0;

  for (var i = 0; i < rows.length; i++) {
    if (rows[i][5] !== contact) continue;
    var when = rows[i][0];
    if (!(when instanceof Date)) continue;
    var ageMin = (now - when.getTime()) / 60000;
    if (ageMin < CONFIG.DEDUPE_MINUTES) recent++;
    if (ageMin < 1440) today++;
  }

  if (recent > 0) {
    return "We already have your enquiry — our team will call you shortly.";
  }
  if (today >= CONFIG.MAX_PER_PHONE_PER_DAY) {
    return "You have sent several enquiries today. Please WhatsApp us directly.";
  }
  return null;
}

/* ─────────────────────────────── HELPERS ────────────────────────────────── */

function getSheet() {
  var ss;
  try {
    if (CONFIG.SHEET_ID && CONFIG.SHEET_ID.trim() !== "" && !CONFIG.SHEET_ID.includes("PASTE_")) {
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

  // If SHEET_NAME is specified, try finding it; otherwise use the first sheet (gid=0)
  var sheet = null;
  if (CONFIG.SHEET_NAME && CONFIG.SHEET_NAME.trim() !== "") {
    sheet = ss.getSheetByName(CONFIG.SHEET_NAME.trim());
  }
  if (!sheet) {
    sheet = ss.getSheets()[0];
  }

  if (!sheet) {
    sheet = ss.insertSheet("Enquiries");
  }

  // If header row is missing, insert it
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

function trim(v, max) {
  return String(v == null ? "" : v).trim().slice(0, max);
}

function titleCase(s) {
  return s.replace(/\w\S*/g, function (w) {
    return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
  });
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
      subject: "New wholesale enquiry — " + c.firm + " (" + c.firstName + " " + c.lastName + ")",
      body:
        "Name    : " + c.firstName + " " + c.lastName + "\n" +
        "Firm    : " + c.firm + "\n" +
        "Contact : " + c.contact + "\n" +
        "Email   : " + (c.email || "—") + "\n" +
        "GST     : " + (c.gst || "—") + "\n\n" +
        "WhatsApp: https://wa.me/" + c.contact.replace("+", "") + "\n"
    });
  } catch (err) {
    console.error("Notify failed: " + err);
  }
}

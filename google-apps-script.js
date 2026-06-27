// ============================================================
// Google Apps Script — paste this in script.google.com
// See SETUP.md for full instructions
// ============================================================

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Get or create the sheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName("Registrations");

    // Create sheet with headers if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet("Registrations");
      const headers = [
        "Timestamp", "First Name", "Last Name", "Full Name",
        "Email", "Phone", "Age", "Gender", "City", "Organisation",
        "UTR Number", "Payment Method", "Payment Time", "Status",
        "Reg. ID"
      ];
      sheet.appendRow(headers);

      // Style the header row
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground("#2d6a4f");
      headerRange.setFontColor("#ffffff");
      headerRange.setFontWeight("bold");
      sheet.setFrozenRows(1);
      sheet.setColumnWidth(1, 160); // Timestamp
      sheet.setColumnWidth(4, 160); // Full Name
      sheet.setColumnWidth(5, 200); // Email
      sheet.setColumnWidth(11, 180); // UTR
    }

    // Generate a unique registration ID
    const lastRow = sheet.getLastRow();
    const regId = "REG" + String(lastRow).padStart(4, "0");

    // Append the new registration
    sheet.appendRow([
      data.timestamp,
      data.fname,
      data.lname,
      data.fname + " " + data.lname,
      data.email,
      data.phone,
      data.age,
      data.gender,
      data.city,
      data.org,
      data.utr,
      data.paymode,
      data.paytime,
      data.status,
      regId,
    ]);

    // Color the status cell based on value
    const newRow = sheet.getLastRow();
    const statusCell = sheet.getRange(newRow, 14);
    if (data.status === "Pending") {
      statusCell.setBackground("#fef9ec");
      statusCell.setFontColor("#7a5c10");
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: "ok", regId: regId }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Allow GET requests (needed for CORS preflight)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok", message: "Event registration API is running" }))
    .setMimeType(ContentService.MimeType.JSON);
}

# Setup Guide — Event Registration System

You have 3 files:
- index.html        → the registration form (your website)
- google-apps-script.js  → backend that saves to Google Sheets
- SETUP.md          → this guide

---

## Step 1 — Set up Google Sheets (5 minutes)

1. Go to https://sheets.google.com and create a new blank spreadsheet.
   Name it something like "Event Registrations".

2. In the menu bar, click Extensions → Apps Script

3. Delete all the default code in the editor.

4. Open google-apps-script.js (from this folder) in any text editor,
   copy ALL the code, and paste it into the Apps Script editor.

5. Click Save (💾 icon or Ctrl+S).

6. Click Deploy → New deployment

7. In the dialog:
   - Click the gear icon next to "Type" and choose Web app
   - Description: Event Registration API
   - Execute as: Me
   - Who has access: Anyone   ← important!

8. Click Deploy. You may be asked to authorize — click Allow.

9. Copy the Web app URL that appears (looks like:
   https://script.google.com/macros/s/XXXX.../exec)

   ✅ Keep this URL private — anyone with it can submit data.

---

## Step 2 — Configure the form (2 minutes)

Open index.html in a text editor (Notepad, VS Code, etc.)

Find this section near the top of the script:

    const CONFIG = {
      GOOGLE_SCRIPT_URL: "YOUR_GOOGLE_SCRIPT_URL_HERE",
      UPI_ID: "yourname@upi",
      EVENT_NAME: "Your Event Name",
    };

Edit each value:

- GOOGLE_SCRIPT_URL → paste the URL you copied in Step 1
- UPI_ID            → your actual UPI ID (e.g. rahul@oksbi)
- EVENT_NAME        → name of your event

Also update the visible text in the HTML:
- Search for "Your Event Name Here" and replace with your event name
- Search for "Date · Venue, City" and replace with your event details

Add your QR code:
- Save your QR code image as qr.png in the same folder as index.html
- It will appear automatically

---

## Step 3 — Host on Netlify (free, 3 minutes)

1. Go to https://netlify.com and sign up for free (use Google login).

2. On the dashboard, scroll down to the "Deploy manually" section.
   (Or go to https://app.netlify.com/drop)

3. Drag and drop your entire event-registration folder onto the page.

4. Netlify gives you a URL like:
   https://amazing-name-123456.netlify.app

5. Share that URL with your participants!

To use a custom URL like "register.yourevent.com", upgrade to Netlify's
free plan and add a custom domain in Site settings → Domain management.

---

## Managing registrations

All submissions appear instantly in your Google Sheet.

To verify or reject a payment:
- Open the sheet
- Find the row (search by name, email, or UTR number)
- Change the Status column from "Pending" to "Verified" or "Rejected"
- You can also add a "Notes" column for your own reference

To export data:
- In Google Sheets: File → Download → CSV or Excel

Tip: Use Ctrl+F (or Cmd+F on Mac) in Google Sheets to search by UTR number
when verifying a payment.

---

## Troubleshooting

Problem: Submissions aren't appearing in the sheet
→ Check that "Who has access" is set to "Anyone" in Apps Script deploy settings
→ Make sure the GOOGLE_SCRIPT_URL in index.html is correct (no extra spaces)
→ Try re-deploying: in Apps Script, Deploy → Manage deployments → Edit → Deploy

Problem: QR code isn't showing
→ Make sure your QR image is named exactly qr.png (lowercase)
→ It must be in the same folder as index.html

Problem: Form shows "Submission failed"
→ Open the browser console (F12 → Console) and check the error message
→ Re-deploy your Apps Script (a new URL is generated each time you deploy)

---

Capacity: This setup handles 1000+ submissions easily. Google Sheets
supports up to 10 million cells. Apps Script has a quota of 20,000
requests/day on a free Google account (more than enough for most events).

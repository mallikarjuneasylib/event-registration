# 🎟️ Event Registration & Payment System

A lightweight, fully functional event registration form with UPI QR payment collection and automatic Google Sheets integration. Built for events with 1000+ attendees.

## ✨ Features

- **2-step registration flow** — personal details → UPI payment confirmation
- **QR code payment** — participants scan and pay ₹100, then submit their UTR/transaction number
- **Google Sheets backend** — every submission saves instantly to your spreadsheet
- **Admin-ready** — each row includes name, email, phone, city, UTR, payment method, and status
- **Mobile friendly** — works on all screen sizes
- **No backend server needed** — just a Google Apps Script web app
- **Free to host** — deploy on Netlify in 3 minutes

## 📁 Files

| File | Purpose |
|------|---------|
| `index.html` | The registration form (your website) |
| `google-apps-script.js` | Paste this into Google Apps Script to save data to Sheets |
| `SETUP.md` | Full step-by-step setup instructions |

## 🚀 Quick Setup (10 minutes total)

### Step 1 — Google Sheets backend
1. Create a new Google Sheet at [sheets.google.com](https://sheets.google.com)
2. Click **Extensions → Apps Script**
3. Delete default code, paste contents of `google-apps-script.js`
4. Click **Deploy → New deployment → Web app**
5. Set **Who has access** to `Anyone` → Deploy
6. Copy the Web App URL

### Step 2 — Configure the form
Open `index.html` and edit the `CONFIG` block:

```js
const CONFIG = {
  GOOGLE_SCRIPT_URL: "YOUR_WEB_APP_URL_HERE", // from Step 1
  UPI_ID: "yourname@upi",                      // your UPI ID
  EVENT_NAME: "Your Event Name",
};
```

Also update the event name and date in the HTML, and add your QR code image as `qr.png` (or embed it as base64).

### Step 3 — Deploy to Netlify
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the entire project folder
3. Get a shareable link instantly — free forever with a Netlify account

## 📊 Data Collected Per Registrant

- Full name, email, phone
- Age, gender, city, organisation
- UTR / transaction number
- Payment method & timestamp
- Status (Pending / Verified / Rejected)
- Registration ID & timestamp

## 💰 Payment Limits (UPI, India)

- No limit on **number of payments** received on a merchant QR code
- Each participant's per-transaction limit: ₹1,00,000 (well above ₹100)
- Zero charges for bank-to-bank UPI transfers
- GST registration required only if annual receipts exceed ₹20L (services)

## 🛠️ Tech Stack

- Plain HTML, CSS, JavaScript (no frameworks, no build step)
- Google Apps Script (serverless backend)
- Google Sheets (database)
- Netlify (hosting)

## 📄 License

MIT — free to use, modify, and distribute.

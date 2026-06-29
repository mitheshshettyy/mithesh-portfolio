# Portfolio Backend — Setup Guide

Node.js + Express API server for the portfolio contact form.

---

## Prerequisites

- Node.js ≥ 18
- A Gmail account with **2-Step Verification** enabled

---

## Gmail App Password Setup

The contact form uses Gmail SMTP via Nodemailer. You **must** use a Gmail App Password — your normal Gmail password will not work.

### Step 1 — Enable 2-Step Verification

1. Go to [myaccount.google.com](https://myaccount.google.com)
2. Click **Security** in the left sidebar
3. Under "How you sign in to Google", click **2-Step Verification**
4. Follow the prompts to enable it

### Step 2 — Generate an App Password

1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   *(You must have 2-Step Verification enabled to see this page)*
2. Under "Select app", choose **Mail**
3. Under "Select device", choose **Other (custom name)** → type `Portfolio`
4. Click **Generate**
5. Copy the **16-character password** shown (e.g. `abcd efgh ijkl mnop`)

> ⚠️ Google shows this password only once. Copy it immediately.

### Step 3 — Add credentials to `.env`

Open `server/.env` and fill in:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=you@gmail.com
SMTP_PASS=abcd efgh ijkl mnop
CONTACT_EMAIL=you@gmail.com
```

> The spaces in `SMTP_PASS` are fine — paste the 16-char password exactly as Google shows it.

---

## Installation

```bash
cd server
npm install
```

---

## Running the Server

**Development (with auto-restart):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

The server starts on **port 3001** by default.

---

## Environment Variables

| Variable | Description | Example |
|---|---|---|
| `PORT` | Server port | `3001` |
| `NODE_ENV` | Environment | `development` |
| `ALLOWED_ORIGINS` | Comma-separated CORS origins | `http://localhost:5173` |
| `SMTP_HOST` | Gmail SMTP host | `smtp.gmail.com` |
| `SMTP_PORT` | Gmail SMTP port | `587` |
| `SMTP_USER` | Your Gmail address | `you@gmail.com` |
| `SMTP_PASS` | Gmail App Password (16 chars) | `abcd efgh ijkl mnop` |
| `CONTACT_EMAIL` | Where form submissions are sent | `you@gmail.com` |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window in ms | `900000` (15 min) |
| `RATE_LIMIT_MAX_REQUESTS` | Max submissions per window | `5` |

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

---

## API Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/health` | Server health check |
| `POST` | `/api/contact` | Submit contact form → sends email |
| `GET` | `/api/portfolio` | Portfolio metadata |
| `GET` | `/api/projects` | Projects list |
| `GET` | `/api/skills` | Skills list |

### POST /api/contact

**Request body:**
```json
{
  "name": "Jane Recruiter",
  "email": "jane@company.com",
  "subject": "Internship Opportunity",
  "message": "Hi Mithesh, we'd love to..."
}
```

**Success response (200):**
```json
{
  "success": true,
  "message": "Message sent successfully! I'll get back to you within 24 hours."
}
```

**Validation error (400):**
```json
{
  "error": "Validation failed",
  "fields": {
    "name": "Name is required.",
    "message": "Message must be at least 10 characters."
  }
}
```

**Rate limited (429):**
```json
{
  "error": "Too many messages submitted. Please wait 15 minutes before trying again."
}
```

---

## Security

- **Helmet** — sets secure HTTP headers
- **CORS** — restricts allowed origins
- **Rate limiting** — 5 contact submissions per 15 minutes per IP
- **Input sanitization** — strips control characters, enforces length limits
- **Spam filter** — basic keyword detection
- **No credentials in code** — all secrets via environment variables

# Portfolio Backend — Setup Guide

Node.js + Express API server for the portfolio contact form.

---

## Prerequisites

- Node.js ≥ 18
- A Gmail account with **2-Step Verification** enabled

---

## Resend API Setup

The contact form uses Resend to send emails over an HTTP API, which bypasses Render's outbound SMTP block.

### Step 1 — Create a Resend Account

1. Go to [resend.com](https://resend.com) and sign up.
2. In your dashboard, go to **API Keys**.
3. Click **Create API Key**. Give it a name and give it "Sending access".
4. Copy the API key (it starts with `re_`).

### Step 2 — Add credentials to `.env`

Open `server/.env` and fill in:

```env
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=Portfolio <onboarding@resend.dev>
CONTACT_EMAIL=you@gmail.com
```

> **Note**: For production, it's recommended to add and verify your custom domain in Resend to send from `contact@yourdomain.com` instead of `onboarding@resend.dev`.

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
| `RESEND_API_KEY` | Your Resend API key | `re_123456789` |
| `RESEND_FROM_EMAIL` | Sender email address | `Portfolio <onboarding@resend.dev>` |
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

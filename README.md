# Mithesh R Shetty — Terminal Portfolio

> An interactive, terminal-inspired developer portfolio built with React, TypeScript, and Three.js. Navigate through projects, skills, and professional background using a real command-line interface.

[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white&labelColor=20232a)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript&logoColor=white&labelColor=1e293b)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-7-646cff?logo=vite&logoColor=white&labelColor=1a1a2e)](https://vite.dev)
[![Node.js](https://img.shields.io/badge/Node.js-≥18-339933?logo=nodedotjs&logoColor=white&labelColor=1a2a1a)](https://nodejs.org)

---

## Overview

This portfolio is a **terminal-first web application** that provides an immersive way to explore my background as a Computer Science undergraduate and Full-Stack Developer.

Visitors interact with the portfolio through a real command-line interface supporting 30+ commands, tab auto-completion, command history, and a virtual filesystem — alongside dedicated visual pages for every section.

---

## Features

| Feature | Description |
|---|---|
| **Interactive Terminal** | Fully functional CLI with auto-completion, command history, and 30+ commands |
| **Virtual Filesystem** | Simulated directory tree navigable with `ls`, `cd`, `pwd`, `tree`, and `cat` |
| **Three.js Particle Field** | Interactive 3D particle background responding to mouse movement |
| **GSAP Animations** | Smooth page transitions, entrance reveals, and animated experience timeline |
| **Functional Contact Form** | End-to-end contact form via Nodemailer + Gmail SMTP with real-time validation |
| **Resume Preview & Download** | Embedded PDF viewer with single-click download |
| **Project Grid & Modals** | Filterable project grid with detailed inspect modals |
| **NightShell Theme** | High-contrast dark palette with neon green (`#00ff88`) and electric cyan (`#00d4ff`) accents |
| **Fully Responsive** | Mobile-first layout working cleanly from 320px to ultra-wide monitors |
| **SEO Optimized** | Open Graph metadata, descriptive title tags, and semantic HTML |

---

## Tech Stack

### Frontend
- **React 19** — UI library
- **TypeScript 5.9** — strict type-checking throughout
- **Vite 7** — build tool and dev server
- **React Router DOM 7** — client-side routing
- **Tailwind CSS 4** — utility-first styling
- **Three.js** — 3D particle background
- **GSAP** — animations and page transitions
- **Framer Motion** — supplemental motion

### Backend
- **Node.js + Express** — REST API server
- **Nodemailer** — Gmail SMTP email delivery
- **Helmet** — secure HTTP headers
- **express-rate-limit** — abuse prevention on contact endpoint
- **dotenv** — environment variable management

---

## Project Structure

```text
mithesh-portfolio/
├── src/
│   ├── components/
│   │   ├── layout/         # Navbar, Layout, Footer
│   │   ├── terminal/       # Terminal, NeofetchBox, WhoAmIBox, MobileCommandBar
│   │   ├── three/          # ParticleBackground (Three.js)
│   │   └── ui/             # AnimatedText, BootScreen, PageTransition
│   ├── pages/              # About, Contact, Education, Experience,
│   │                       # Home, NotFound, Projects, Resume, Skills
│   ├── data/
│   │   └── portfolioData.ts  # All portfolio content (projects, skills, timeline)
│   ├── utils/
│   │   ├── cn.ts           # clsx + tailwind-merge utility
│   │   └── uptime.ts       # Portfolio uptime calculation
│   ├── config.ts           # Centralised env-driven configuration
│   ├── App.tsx             # Route definitions
│   ├── main.tsx            # React entry point
│   └── index.css           # Global styles and design tokens
│
├── public/
│   ├── images/             # favicon.svg and other static images
│   └── resume/             # Resume PDF (served statically)
│
├── server/
│   ├── index.js            # Express API — health, contact, portfolio endpoints
│   ├── package.json
│   ├── .env.example        # Environment variable template (safe to commit)
│   └── README.md           # Backend setup & Gmail App Password guide
│
├── .env.example            # Frontend environment variable template
├── .gitignore
├── index.html              # HTML entry point
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Terminal Commands

### Navigation & Pages
| Command | Action |
|---|---|
| `about` | Open About Me page |
| `education` | Open Education page |
| `skills` | Open Skills page |
| `projects` | Open Projects page |
| `experience` | Open Experience page |
| `contact` | Open Contact page |
| `resume` | Open Resume page |

### Filesystem & Utilities
| Command | Description |
|---|---|
| `ls` | List files and directories in current path |
| `cd <dir>` | Change virtual directory (`cd about`, `cd ..`) |
| `pwd` | Print virtual working directory |
| `tree` | Display full virtual directory tree |
| `cat <file>` | Print contents of a virtual file |
| `history` | View recent command history |

### System & Identity
| Command | Description |
|---|---|
| `whoami` | Display identity card / brief biography |
| `neofetch` | Print system specs and tech stack |
| `date` / `time` | Show current date and time |
| `uptime` | Show portfolio uptime |
| `clear` / `cls` | Clear terminal output |
| `echo <msg>` | Print text to terminal |

### Actions & Custom
| Command | Description |
|---|---|
| `social` | List all social profile links |
| `github` | Open GitHub profile in new tab |
| `linkedin` | Open LinkedIn profile in new tab |
| `email` | Display contact email address |
| `status` | Show availability status and role targets |
| `theme` | Print active terminal theme configuration |
| `ascii` / `banner` | Display ASCII signature logo |
| `matrix` | Toggle Matrix waterfall effect |
| `intro` | Replay boot message sequence |
| `download resume` | Download resume PDF directly |
| `open resume` | Open resume PDF in a new tab |
| `exit` | Exit terminal and return to homepage |

### Keyboard Shortcuts
| Shortcut | Action |
|---|---|
| `Ctrl + \`` | Return to terminal from any page |
| `↑` / `↓` | Browse command history |
| `Tab` | Auto-complete commands |
| `Ctrl + C` | Cancel current input |
| `Ctrl + L` | Clear terminal |

---

## Getting Started

### Prerequisites
- **Node.js** ≥ 18
- **npm** ≥ 9
- A Gmail account with 2-Step Verification for the contact form

### 1. Clone the Repository

```bash
git clone https://github.com/mitheshshettyy/mithesh-portfolio.git
cd mithesh-portfolio
```

### 2. Install Dependencies

```bash
# Frontend
npm install

# Backend
cd server && npm install && cd ..
```

### 3. Configure Environment Variables

**Frontend:**
```bash
cp .env.example .env
```
The defaults in `.env.example` are pre-filled for local development — no changes needed to run the frontend.

**Backend (required for contact form):**
```bash
cp server/.env.example server/.env
```
Then open `server/.env` and fill in your Gmail credentials:
```env
SMTP_USER=you@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx   # Gmail App Password
CONTACT_EMAIL=you@gmail.com
```
> See [`server/README.md`](./server/README.md) for the full Gmail App Password setup guide.

### 4. Start Development Servers

```bash
# Terminal 1 — Frontend (port 5173)
npm run dev

# Terminal 2 — Backend (port 3001)
cd server && npm run dev
```

The Vite dev server automatically proxies `/api/*` requests to the Express backend — no manual CORS configuration needed in development.

Open [http://localhost:5173](http://localhost:5173) to view the portfolio.

---

## Build & Deployment

### Production Build

```bash
npm run build
```

Output is written to `dist/`. This is a single-file build (`vite-plugin-singlefile`) — the entire frontend compiles into one self-contained `index.html`.

### Type Checking

```bash
npm run typecheck
```

### Deploy the Backend

The Express server (`server/`) can be deployed to any Node.js host (Railway, Render, Fly.io, VPS):

1. Set all environment variables from `server/.env.example` in your host's dashboard
2. Run `npm start` in the `server/` directory

> **Important:** Never commit `server/.env` to version control. It is gitignored. Use your host's secret management to inject credentials.

---

## REST API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Server health check + SMTP status |
| `GET` | `/api/portfolio` | Portfolio metadata (name, university, links) |
| `GET` | `/api/projects` | Projects list with optional `?category=` and `?featured=true` filters |
| `GET` | `/api/skills` | Full skills list by category |
| `GET` | `/api/resume` | Resume metadata |
| `GET` | `/api/resume/download` | Resume download info |
| `POST` | `/api/contact` | Submit contact form → sends email via SMTP |

### POST /api/contact

**Request:**
```json
{
  "name": "Jane Recruiter",
  "email": "jane@company.com",
  "subject": "Internship Opportunity",
  "message": "Hi Mithesh, we'd love to connect..."
}
```

**Success (200):**
```json
{ "success": true, "message": "Message sent successfully! I'll get back to you within 24 hours." }
```

**Validation error (400):**
```json
{ "error": "Validation failed", "fields": { "message": "Message must be at least 10 characters." } }
```

**Rate limited (429):** After 10 submissions per 15-minute window per IP.

---

## Security

- **Helmet** — sets secure HTTP response headers
- **CORS** — restricts API access to configured frontend origins
- **Rate limiting** — 10 contact submissions per 15 minutes per IP
- **Input sanitization** — strips control characters, enforces length limits
- **Spam filter** — basic keyword-pattern detection on name and message
- **No secrets in source code** — all credentials are environment variables
- **`.env` files are gitignored** — only `.env.example` templates are committed

> ⚠️ If you fork or clone this repository, generate your own Gmail App Password. Do not reuse credentials from any example or documentation.

---

## Environment Variables

### Frontend (`.env`)

| Variable | Description | Default |
|---|---|---|
| `VITE_API_URL` | Backend API base URL | `http://localhost:3001` |
| `VITE_PERSONAL_NAME` | Full name displayed across the site | `Mithesh R Shetty` |
| `VITE_CONTACT_EMAIL` | Public contact email | — |
| `VITE_CONTACT_GITHUB` | GitHub profile URL | — |
| `VITE_CONTACT_LINKEDIN` | LinkedIn profile URL | — |
| `VITE_RESUME_PATH` | Public path to resume PDF | `/resume/Mithesh_R_Shetty.pdf` |
| `VITE_SITE_TITLE` | Browser tab title | `Mithesh R Shetty` |

See `.env.example` for the complete variable list.

### Backend (`server/.env`)

| Variable | Description |
|---|---|
| `PORT` | Server port (default: `3001`) |
| `NODE_ENV` | Runtime environment (`development` / `production`) |
| `ALLOWED_ORIGINS` | Comma-separated CORS allowed origins |
| `SMTP_HOST` | SMTP host (`smtp.gmail.com`) |
| `SMTP_PORT` | SMTP port (`587`) |
| `SMTP_USER` | Gmail address used to send emails |
| `SMTP_PASS` | Gmail App Password (16 characters) |
| `CONTACT_EMAIL` | Recipient address for contact form submissions |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window in ms (default: `900000`) |
| `RATE_LIMIT_MAX_REQUESTS` | Max submissions per window (default: `10`) |

See `server/.env.example` for the full template.

---

## License

MIT License — © 2026 Mithesh R Shetty

Permission is hereby granted, free of charge, to any person obtaining a copy of this software to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software, subject to the standard MIT license terms.

---

*Built with ❤️ by [Mithesh R Shetty](https://github.com/mitheshshettyy)*
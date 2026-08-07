# Mithesh R Shetty — Developer Portfolio

[![React 19](https://img.shields.io/badge/React-19.2.6-61dafb?style=flat-square\&logo=react\&logoColor=white)](https://react.dev)
[![TypeScript 5.9](https://img.shields.io/badge/TypeScript-5.9.3-3178c6?style=flat-square\&logo=typescript\&logoColor=white)](https://www.typescriptlang.org)
[![Vite 7](https://img.shields.io/badge/Vite-7.3.2-646cff?style=flat-square\&logo=vite\&logoColor=white)](https://vite.dev)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4.1.17-38bdf8?style=flat-square\&logo=tailwindcss\&logoColor=white)](https://tailwindcss.com)
[![Three.js](https://img.shields.io/badge/Three.js-0.184-black?style=flat-square\&logo=three.js\&logoColor=white)](https://threejs.org)
[![Node.js 22](https://img.shields.io/badge/Node.js-22.19-339933?style=flat-square\&logo=nodedotjs\&logoColor=white)](https://nodejs.org)
[![Express 4](https://img.shields.io/badge/Express-4.18-000000?style=flat-square\&logo=express\&logoColor=white)](https://expressjs.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](./LICENSE)

A modern, production-grade personal portfolio and interactive terminal application. Built with **React 19**, **TypeScript**, **Three.js**, **GSAP**, and an **Express API server**, combining a classic Linux/Zsh CLI experience with a visual web interface.

---

## Overview

This repository contains the source code for a software engineering portfolio. The application offers a dual-mode browsing experience:

1. **Interactive CLI Terminal**: A feature-complete Zsh-inspired shell with a virtual filesystem, tab auto-completion, command history, neofetch diagnostics, and custom execution utilities.
2. **Visual Web Interface**: Responsive layout featuring smooth GSAP motion transitions, custom Three.js particle dynamics, project showcases, skills matrices, and an integrated resume viewer.

The frontend is powered by **Vite** and styled with **Tailwind CSS v4**, while a **Node.js + Express** backend server manages secure contact form submissions via **Resend API**, enforced with rate-limiting, Helmet security headers, CORS origin controls, and automated spam filtering.

---

## Key Features

### Interactive Terminal Interface

* **Zsh Engine Emulation**: Tab auto-completion for commands and virtual directory paths, arrow key command history navigation (`Up`/`Down`), and clear output streaming.
* **Simulated Virtual Filesystem**: In-memory Unix-style filesystem allowing visitors to navigate (`cd`), inspect directories (`ls`, `tree`), read documents (`cat`), and check path location (`pwd`).
* **Built-in Terminal Commands**: Over 30 custom commands including `neofetch`, `whoami`, `projects`, `skills`, `experience`, `education`, `contact`, `resume`, `uptime`, `date`, `theme`, `curl`, `sudo`, and `gui`.
* **Mobile Shell Access**: Includes a mobile quick-command bar optimized for touch interaction without needing a soft keyboard.

### Visual & Interactive UI Components

* **Three.js Interactive Canvas**: A background particle field that responds dynamically to cursor movements and window dimensions.
* **GSAP Motion & Animations**: Entrance reveals, page route transitions, timeline animations, and a retro system boot sequence screen (`BootScreen`).
* **Projects Showcase**: Filterable project gallery (Full-Stack, AI/ML, Frontend) with detailed modal views, live demo links, repository URLs, and search capabilities.
* **Resume Viewer**: Direct in-app PDF preview with custom toolbar controls and single-click download functionality.

### Secure Backend & Infrastructure

* **Transactional Email Dispatch**: Express endpoint (`POST /api/contact`) integrating the **Resend API** with custom HTML email templating.
* **API Security & Spam Prevention**: IP rate limiting via `express-rate-limit` (5 requests per 15 minutes), strict input sanitization, spam keyword detection, CORS protection, and secure HTTP headers via `helmet`.
* **Health & Metadata Endpoints**: `GET /api/health` and `GET /api/portfolio` providing runtime uptime tracking and developer metadata.
* **Performance & Telemetry**: Integrated `@vercel/analytics` and `@vercel/speed-insights` for monitoring performance metrics.

---

## Tech Stack

### Frontend Core

* **Library**: React 19.2
* **Language**: TypeScript 5.9 (Strict Type Checking)
* **Build System**: Vite 7.3
* **Routing**: React Router DOM 7.18
* **Styling**: Tailwind CSS 4.1, Custom CSS (`NightShell Dark` theme tokens)
* **Graphics & FX**: Three.js 0.184, GSAP 3.15, React Icons 5.6
* **Analytics**: `@vercel/analytics`, `@vercel/speed-insights`

### Backend Core

* **Runtime**: Node.js >= 18 (Tested on v22)
* **Framework**: Express 4.18
* **Email Service**: Resend SDK
* **Security & Middleware**: Helmet, CORS, Express Rate Limit, Dotenv

---

## Project Structure

```text
portfolio-website/
├── public/                      # Static assets (favicons, profile avatar, resume PDF)
│   └── resume/                  # Embedded resume PDF asset
│
├── server/                      # Backend API server (Node.js + Express)
│   ├── index.js                 # Express app entry, routes, rate limiting & email handler
│   ├── package.json             # Server dependencies (Express, Resend, Helmet, Rate Limit)
│   ├── .env.example             # Environment configuration template for backend
│   └── README.md                # API & Resend email integration guide
│
├── src/                         # Frontend source code
│   ├── components/
│   │   ├── layout/              # Layout wrapper, Navbar, and Footer components
│   │   ├── terminal/            # Terminal UI, NeofetchBox, WhoAmIBox, MobileCommandBar
│   │   ├── three/               # Three.js interactive particle background canvas
│   │   └── ui/                  # System boot screen simulation component
│   │
│   ├── data/
│   │   └── portfolioData.ts     # Centralized portfolio data (projects, experience, skills)
│   │
│   ├── pages/                   # Page view routes (Home, About, Education, Skills,
│   │                           # Projects, Experience, Contact, Resume, NotFound)
│   │
│   ├── utils/                   # Uptime and date calculation utilities
│   ├── config.ts                # Environment-driven app configuration adapter
│   ├── App.tsx                  # Client routing definitions
│   ├── main.tsx                 # Application mounting entrypoint
│   └── index.css                # Design system rules, Tailwind imports & terminal styles
│
├── .env.example                 # Frontend environment variable configuration template
├── index.html                   # HTML entry point with Open Graph metadata
├── package.json                 # Frontend package configuration & scripts
├── tsconfig.json                # TypeScript compiler configuration
├── vercel.json                  # Vercel deployment rewrite rules for SPA routing
└── vite.config.ts               # Vite plugins and dev server setup
```

---

## Setup and Installation

### Prerequisites

* **Node.js**: `v18.0.0` or higher (v22 recommended)
* **npm**: `v9.0.0` or higher

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/portfolio-website.git
cd portfolio-website
```

### 2. Install Dependencies

Install root (frontend) dependencies:

```bash
npm install
```

Install server (backend) dependencies:

```bash
cd server
npm install
cd ..
```

### 3. Environment Configuration

#### Frontend (`.env`)

Create a `.env` file in the root directory by copying `.env.example`:

```bash
cp .env.example .env
```

Configure your local backend endpoint:

```env
VITE_API_URL=http://localhost:3001
VITE_PERSONAL_NAME="Your Name"
VITE_CONTACT_EMAIL="your.email@example.com"
```

#### Backend (`server/.env`)

Create a `.env` file in the `server/` directory by copying `server/.env.example`:

```bash
cd server
cp .env.example .env
```

Fill in your server configuration and Resend API credentials:

```env
PORT=3001
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
RESEND_API_KEY=your_resend_api_key_here
CONTACT_EMAIL=your.email@example.com
```

### 4. Run Development Servers

Start the backend API server:

```bash
cd server
npm run dev
```

In a second terminal window, start the Vite frontend development server:

```bash
npm run dev
```

The application will be accessible at:

* **Frontend**: `http://localhost:5173`
* **Backend API**: `http://localhost:3001/api/health`

---

## Environment Variables

### Frontend Variables (`.env`)

| Variable                   | Description                     | Default / Example                       |
| :------------------------- | :------------------------------ | :-------------------------------------- |
| `VITE_API_URL`             | Base URL of backend Express API | `http://localhost:3001`                 |
| `VITE_PERSONAL_NAME`       | Full name displayed across UI   | `Your Name`                             |
| `VITE_PERSONAL_ROLE`       | Professional role title         | `Full-Stack Developer & CS Student`     |
| `VITE_PERSONAL_DEGREE`     | Academic qualification          | `B.Tech Computer Science & Engineering` |
| `VITE_PERSONAL_UNIVERSITY` | University name                 | `Your University`                       |
| `VITE_PERSONAL_CGPA`       | Academic score                  | `8.78 / 10.0`                           |
| `VITE_CONTACT_EMAIL`       | Contact email address           | `your.email@example.com`                |
| `VITE_CONTACT_GITHUB`      | GitHub profile URL              | `https://github.com/your-username`      |
| `VITE_CONTACT_LINKEDIN`    | LinkedIn profile URL            | `https://linkedin.com/in/your-profile`  |
| `VITE_RESUME_PATH`         | Path to PDF resume asset        | `/resume/Your_Name.pdf`                 |

### Backend Variables (`server/.env`)

| Variable                  | Description                                     | Default / Example                   |
| :------------------------ | :---------------------------------------------- | :---------------------------------- |
| `PORT`                    | API server port number                          | `3001`                              |
| `NODE_ENV`                | Environment mode (`development` / `production`) | `development`                       |
| `ALLOWED_ORIGINS`         | Comma-separated CORS allowed origin URLs        | `http://localhost:5173`             |
| `RESEND_API_KEY`          | Transactional email API key from Resend         | `re_123456789...`                   |
| `RESEND_FROM_EMAIL`       | Verified sender email address                   | `Portfolio <onboarding@resend.dev>` |
| `CONTACT_EMAIL`           | Recipient email address for form submissions    | `your.email@example.com`            |
| `RATE_LIMIT_WINDOW_MS`    | Rate limit time window in milliseconds          | `900000` (15 mins)                  |
| `RATE_LIMIT_MAX_REQUESTS` | Max contact requests allowed per IP window      | `5`                                 |

---

## Available Scripts

### Frontend Scripts (Root Directory)

* `npm run dev`: Launches Vite development server with Hot Module Replacement (HMR).
* `npm run build`: Type-checks with `tsc` and bundles the production build into `dist/`.
* `npm run preview`: Statically serves the local `dist/` directory for build verification.
* `npm run typecheck`: Executes strict TypeScript compilation check without emitting assets.
* `npm run lint`: Performs codebase linting and type assertion verification.

### Backend Scripts (`server/` Directory)

* `npm run dev`: Starts Express server with `nodemon` for auto-reloading during development.
* `npm start`: Runs the Node.js production server (`node index.js`).
* `npm test`: Executes test suites via `jest`.

---

## Deployment

### Frontend (Vercel)

The repository includes a `vercel.json` configuration file handling single-page application routing rewrites.

1. Connect the repository to [Vercel](https://vercel.com).
2. Set the **Framework Preset** to **Vite**.
3. Add the required environment variables (`VITE_API_URL`, etc.).
4. Deploy.

### Backend API (Render / Railway / Serverless)

The backend Express application can be deployed independently to Node.js hosts such as Render, Railway, or Fly.io:

1. Create a Web Service pointing to the `server/` directory.
2. Set the Build Command to `npm install` and Start Command to `node index.js`.
3. Configure environment variables (`RESEND_API_KEY`, `ALLOWED_ORIGINS`, `CONTACT_EMAIL`).
4. Update the frontend `VITE_API_URL` variable to point to the live backend domain.

---

## License

This project is open-source and licensed under the [MIT License](./LICENSE).
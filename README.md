# Alex Chen — Terminal Portfolio

> A production-grade, terminal-first developer portfolio built with React, Three.js, GSAP, and a Node.js backend.

```
  █████╗ ██╗     ███████╗██╗  ██╗     ██████╗██╗  ██╗███████╗███╗   ██╗
 ██╔══██╗██║     ██╔════╝╚██╗██╔╝    ██╔════╝██║  ██║██╔════╝████╗  ██║
 ███████║██║     █████╗   ╚███╔╝     ██║     ███████║█████╗  ██╔██╗ ██║
 ██╔══██║██║     ██╔══╝   ██╔██╗     ██║     ██╔══██║██╔══╝  ██║╚██╗██║
 ██║  ██║███████╗███████╗██╔╝ ██╗    ╚██████╗██║  ██║███████╗██║ ╚████║
 ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝     ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝
```

## ✨ Features

- **Terminal-First Home** — Interactive zsh-inspired terminal as the homepage hero
- **25+ Commands** — `help`, `about`, `skills`, `projects`, `experience`, `resume`, `neofetch`, and more
- **Three.js Background** — Immersive particle field with mouse-reactive camera
- **GSAP Animations** — Page transitions, text reveals, micro-interactions
- **Ctrl+\`** — Global shortcut to return to terminal from any page
- **8 Full Pages** — Home, About, Education, Skills, Projects, Experience, Contact, Resume
- **REST API Backend** — Express.js API for contact form, resume, and content endpoints
- **Fully Responsive** — Mobile-friendly across all device sizes
- **Dark Terminal Theme** — NightShell Dark with neon green + electric cyan accents

## 🗂️ Project Structure

```
portfolio/
├── client/                    # Frontend (React + Vite)
│   └── src/
│       ├── components/
│       │   ├── layout/        # Navbar, Footer, Layout
│       │   ├── terminal/      # Terminal component + command processor
│       │   ├── three/         # Three.js particle background
│       │   └── ui/            # AnimatedText, PageTransition
│       ├── data/
│       │   └── portfolioData.ts  # All portfolio content
│       └── pages/
│           ├── Home.tsx       # Terminal homepage
│           ├── About.tsx
│           ├── Education.tsx
│           ├── Skills.tsx
│           ├── Projects.tsx
│           ├── Experience.tsx
│           ├── Contact.tsx
│           └── Resume.tsx
│
└── server/                    # Backend (Node.js + Express)
    ├── index.js               # Main server + API routes
    ├── .env.example           # Environment variable template
    └── package.json
```

## 🚀 Quick Start

### Frontend

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Backend

```bash
cd server

# Install dependencies
npm install

# Copy and configure environment
cp .env.example .env

# Start development server
npm run dev

# Start production server
npm start
```

## 🖥️ Terminal Commands

| Command | Description |
|---------|-------------|
| `help` | List all commands |
| `about` | Navigate to About page |
| `education` | Navigate to Education page |
| `skills` | Navigate to Skills page |
| `projects` | Navigate to Projects page |
| `experience` | Navigate to Experience page |
| `contact` | Navigate to Contact page |
| `resume` | Open resume section |
| `whoami` | Display identity summary |
| `neofetch` | System info display |
| `ls` | List available sections |
| `pwd` | Show current path |
| `date` | Current date |
| `time` | Current time |
| `clear` | Clear terminal |
| `social` | All social links |
| `github` | Open GitHub profile |
| `linkedin` | Open LinkedIn profile |
| `email` | Display email |
| `status` | Availability status |
| `ascii` | ASCII art banner |
| `uptime` | Portfolio uptime |
| `echo <msg>` | Print a message |
| `cat about.txt` | Quick about summary |
| `cat skills.txt` | Skills summary |
| `open resume` | Download resume |

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + \`` | Return to terminal from any page |
| `↑ / ↓` | Navigate command history |
| `Tab` | Autocomplete commands |
| `Ctrl + C` | Cancel current input |
| `Ctrl + L` | Clear terminal |

## 🎨 Design System

```css
/* Color Palette */
--bg-primary:       #080c18   /* Near-black background */
--terminal-green:   #00ff88   /* Primary accent */
--terminal-cyan:    #00d4ff   /* Secondary accent */
--terminal-blue:    #3d8bff   /* Tertiary accent */
--text-primary:     #e2e8f0   /* Main text */
--text-secondary:   #94a3b8   /* Secondary text */
--text-muted:       #4a5568   /* Muted text */

/* Typography */
--font-mono:  'JetBrains Mono', 'Fira Code', monospace
```

## 🔌 API Endpoints

```
GET  /api/health              — Server health check
GET  /api/portfolio           — Portfolio metadata
GET  /api/projects            — Projects list (filterable)
GET  /api/skills              — Skills data
GET  /api/resume              — Resume metadata
GET  /api/resume/download     — Download resume PDF
POST /api/contact             — Submit contact form
```

## 🛠️ Tech Stack

**Frontend:**
- React 19 + TypeScript
- Vite (build tool)
- React Router DOM (routing)
- Three.js (3D background)
- GSAP (animations)
- Tailwind CSS (styling)
- JetBrains Mono / Fira Code (fonts)

**Backend:**
- Node.js + Express
- CORS + Helmet
- dotenv (configuration)
- Express Rate Limit

## 📄 License

MIT — Alex Chen, 2025

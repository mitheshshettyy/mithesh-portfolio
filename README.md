# Mithesh R Shetty — Terminal Portfolio

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

* 🖥️ Interactive terminal-inspired homepage
* ⌨️ 25+ built-in terminal commands
* 🌌 Three.js animated background
* ⚡ GSAP-powered animations and page transitions
* 📄 Online resume preview and download
* 📚 Dedicated pages for About, Education, Skills, Projects, Experience, Contact, and Resume
* 📱 Fully responsive across desktop, tablet, and mobile devices
* 🎯 Keyboard shortcuts and terminal history
* 📬 Express.js backend for contact form and portfolio APIs
* 🌙 Custom NightShell Dark theme

---

## 🛠️ Tech Stack

### Frontend

* React 19
* TypeScript
* Vite
* React Router DOM
* Tailwind CSS
* Three.js
* GSAP

### Backend

* Node.js
* Express.js
* Helmet
* CORS
* dotenv
* Express Rate Limit

### Developer Tools

* Git
* GitHub
* VS Code
* npm

---

## 📂 Project Structure

```text
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
npm install
```

### Start Frontend

```bash
npm run dev
```

### Start Backend

```bash
cd server

npm install

npm run dev
```

### Build for Production

```bash
npm run build
```

---

## 🔌 REST API

```text
GET  /api/health
GET  /api/portfolio
GET  /api/projects
GET  /api/skills
GET  /api/resume
GET  /api/resume/download
POST /api/contact
```

---

## 🎨 Design Highlights

* Terminal-inspired user experience
* NightShell Dark color palette
* Neon green and cyan accents
* Responsive layouts
* Smooth GSAP transitions
* Interactive Three.js particle background
* Monospace typography

---

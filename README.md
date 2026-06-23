# Mithesh R Shetty — Terminal Portfolio

> A modern, terminal-inspired developer portfolio showcasing my projects, technical skills, education, and professional journey through an interactive command-line interface.

---

## 📖 Overview

This portfolio is a **terminal-first web application** designed to provide an engaging way to explore my background as a Computer Science undergraduate and Full-Stack Developer.

Inspired by modern developer terminals, the portfolio combines interactive command-line navigation with smooth animations, immersive visuals, and responsive design.

Visitors can explore my education, projects, technical skills, internship experience, resume, and contact information using familiar terminal commands.

---

## ✨ Features

* 🖥️ **Interactive Terminal Shell**: A fully-functional terminal CLI landing page featuring auto-completion, command history, and dynamic suggestions.
* ⌨️ **30+ Commands & Aliases**: Navigate sections, interact with files, and trigger special commands (e.g., `matrix`, `neofetch`, `theme`).
* 📁 **Virtual Filesystem**: Explore a simulated directory tree with commands like `ls`, `cd`, `pwd`, `tree`, and view file contents using `cat`.
* 📅 **GSAP-powered Experience Timeline**: Interactive vertical experience timeline featuring hover parallax card tilts and smooth entrance transitions.
* 🌌 **Three.js Particle Field**: Immersive, interactive 3D particle background responding dynamically to mouse movement.
* ⚡ **GSAP Page Transitions**: Smooth global page-to-page navigation and content entrance reveals.
* 🔍 **Enhanced SEO & Branding**: Predefined search engine metadata, Open Graph tags, and a customized green prompt-style SVG favicon.
* 📄 **Resume Preview & Download**: Seamless online resume rendering with direct single-click PDF download option.
* 📚 **Dedicated Sub-pages**: Custom views for About, Education, Skills, Projects, Experience, Contact, and Resume.
* 📱 **Fully Responsive Layout**: Built mobile-first, rendering beautifully on smartphones, tablets, and wide-screen monitors.
* 📬 **Express.js API Backend**: Secure server handling contact form submissions, rate-limiting, and portfolio data routing.
* 🌙 **NightShell Theme**: High-contrast, premium dark mode palette with neon green and electric cyan terminal accents.

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
├── src/
│   ├── components/
│   ├── pages/
│   ├── data/
│   ├── hooks/
│   ├── utils/
│   └── assets/
│
├── public/
│   ├── images/
│   │   └── favicon.svg
│   └── resume/
│
├── server/
│   ├── index.js
│   ├── package.json
│   └── .env.example
│
├── package.json
└── README.md
```

---

## 🖥️ Terminal Commands

The terminal commands are categorized into four logical modules:

### 1. Navigation & Visual Pages
| Command | Action |
| --- | --- |
| `about` | Navigate to the visual About Me page |
| `education` | Navigate to the visual Education page |
| `skills` | Navigate to the visual Skills page |
| `projects` | Navigate to the visual Projects page |
| `experience` | Navigate to the visual Experience page |
| `contact` | Navigate to the visual Contact page |
| `resume` | Navigate to the visual Resume page |

### 2. Filesystem & Utilities
| Command | Description |
| --- | --- |
| `ls` | List directories and files in current path |
| `cd <dir>` | Change virtual directory (e.g., `cd about`, `cd ..`) |
| `pwd` | Print virtual working directory path |
| `tree` | Display virtual directory tree structure |
| `cat <file>` | Read and print contents of a virtual text file (e.g., `cat about.txt`) |
| `history` | View list of recently executed commands |

### 3. System & Identity Info
| Command | Description |
| --- | --- |
| `whoami` | Display brief biography / identity card |
| `neofetch` | Print system specifications, version info, and tech stack |
| `date` | Show current date |
| `time` | Show current time and timezone |
| `uptime` | Show total elapsed uptime of the portfolio site |
| `clear` / `cls` | Clear the terminal console output |
| `echo <msg>` | Print text back to the terminal |

### 4. Actions & Custom Features
| Command | Description |
| --- | --- |
| `social` | List and link all social media profiles |
| `github` | Open GitHub profile in a new browser tab |
| `linkedin` | Open LinkedIn profile in a new browser tab |
| `email` | Display email contact address |
| `status` | Show job-seeking availability status & role targets |
| `theme` | Print active UI terminal colors and fonts configuration |
| `ascii` / `banner`| Display ASCII terminal signature logo |
| `matrix` | Toggle green binary Matrix waterfall effect |
| `intro` | Replay the welcome boot message sequence |
| `exit` | Exits terminal mode and redirects back to the main homepage |
| `download resume` | Initiate direct download of the PDF resume |
| `open resume` | Open the resume PDF in a new tab |

---

## ⌨️ Keyboard Shortcuts

| Shortcut   | Action                 |
| ---------- | ---------------------- |
| `Ctrl + `` | Return to terminal     |
| `↑ / ↓`    | Browse command history |
| `Tab`      | Auto-complete commands |
| `Ctrl + C` | Cancel current input   |
| `Ctrl + L` | Clear terminal         |

---

## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://github.com/mitheshshettyy/<repository-name>.git

cd <repository-name>
```

### Install Dependencies

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

* **Interactive CLI Interface**: Realistic command validation with colorful terminal error reporting, tab-completion, and command history persistence.
* **Premium Theme**: Modern dark mode based on the NightShell console theme, blending deep blues and blacks with bright emerald green (`#00ff88`) and electric cyan (`#00d4ff`) accents.
* **Animated Vertical Timeline**: Scroll-triggered timeline for the Experience section, with active ripple pulses and mouse-tracking card hover tilts.
* **Liquid Transitions**: GSAP-powered canvas adjustments and page transitions ensuring a fluid flow from page to page.
* **Responsive Styling**: Tailwind CSS media queries and optimized layout padding ensuring full usability across screens from 320px to ultra-wide desktop monitors.

---
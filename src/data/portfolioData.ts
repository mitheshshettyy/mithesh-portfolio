import config from '../config';
import { getPortfolioUptime } from '../utils/uptime';

export const personalInfo = {
  name: config.personal.name,
  title: config.personal.role,
  tagline: config.personal.tagline,
  year: "4th Year",
  degree: config.personal.degree,
  university: config.personal.university,
  graduationYear: config.personal.graduationYear,
  cgpa: config.personal.cgpa,
  location: config.personal.location,
  email: config.contact.email,
  github: config.contact.github,
  linkedin: config.contact.linkedin,
  resumeUrl: config.resume.path,
  prompt: `${config.terminal.user}@${config.terminal.host}`,
  shell: config.terminal.shell,
  version: config.terminal.version,
  get uptime() {
    return getPortfolioUptime();
  },
  status: config.personal.status,
};

export const aboutData = {
  summary: `I am a Computer Science and Engineering student dedicated to building impactful, real-world software. With a strong foundation in software design and a focus on clean user experiences, I excel at solving complex problems and adapting to new technologies quickly. I am motivated to develop reliable, well-structured applications, bridging robust backend functionality with polished, intuitive frontends.`,
  philosophy: `I believe great software emerges at the intersection of clean database architecture, well-structured backend APIs, and responsive user interfaces. I'm passionate about writing clean, efficient, and well-documented code that solves real-world problems.`,
  interests: [
    "Data Structures & Algorithms",
    "Full-Stack Web Development",
    "DevOps & Cloud Computing",
    "Database Design & Optimization",
    "Open Source & Continuous Learning",
  ],
  stats: [
    { label: "Projects Built", value: "10+", color: "green" },
    { label: "CGPA", value: "8.78", color: "cyan" },
    { label: "LeetCode Problems", value: "350+", color: "purple" },
    { label: "Internships", value: "1", color: "blue" },
  ],
  funFacts: [
    "Full-Stack Development Enthusiast",
    "DSA Practitioner",
    "Avid Series Watcher",
    "Always Exploring New Tech",
    "Cricket & F1 Fan",
  ],
};

export const educationData = [
  {
    id: "nmamit",
    institution: config.personal.university.split(',')[0].trim(),
    degree: "Bachelor of Technology",
    field: "Computer Science and Engineering",
    duration: "Aug 2023 – Present",
    status: "Current",
    cgpa: config.personal.cgpa,
    location: "Nitte, Karnataka, India",
    highlights: [
      "Distinction in multiple academic terms",
      "Built interactive 3D web scenes and full-stack projects",
      "Active member of technical student clubs",
    ],
    coursework: [
      "Data Structures & Algorithms",
      "Database Management Systems",
      "Object-Oriented Programming",
      "Web Development",
      "Software Engineering",
      "Computer Networks",
      "Operating Systems",
      "System Design",
    ],
  },
  {
    id: "vidyodaya",
    institution: "Vidyodaya Pre-University College",
    degree: "Pre-University Education",
    field: "PCMC (Physics, Chemistry, Mathematics, Computer Science)",
    duration: "Aug 2021 – May 2023",
    status: "Completed",
    score: "94.5%",
    location: "Udupi, Karnataka, India",
    highlights: [
      "Distinction in Board Examinations",
      "Strong foundation in Computer Science and Mathematics",
    ],
    coursework: [],
  },
];

export const skillsData = {
  languages: [
    { name: "Java", level: 80 },
    { name: "Python", level: 80 },
    { name: "C/C++", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "TypeScript", level: 80 },
  ],
  frontend: [
    { name: "HTML/CSS", level: 85 },
    { name: "React", level: 85 },
    { name: "Next.js", level: 80 },
    { name: "Tailwind CSS", level: 80 },
    { name: "Three.js", level: 75 },
  ],
  backend: [
    { name: "Node.js", level: 80 },
    { name: "Express.js", level: 80 },
    { name: "REST APIs", level: 85 },
    { name: "FastAPI", level: 75 },
  ],
  databases: [
    { name: "MySQL", level: 85 },
    { name: "MongoDB", level: 90 },
    { name: "PostgreSQL", level: 75 },
  ],
  developerEcosystem: [
    { name: "Git", level: 90 },
    { name: "GitHub", level: 90 },
    { name: "Postman", level: 85 },
    { name: "Docker", level: 80 },
    { name: "Vercel", level: 85 },
    { name: "VS Code", level: 90 },
  ],
  csFundamentals: [
    { name: "Data Structures", level: 85 },
    { name: "Operating Systems", level: 90 },
    { name: "DBMS", level: 85 },
    { name: "Computer Networks", level: 80 },
    { name: "Compiler Design", level: 90 },
  ],
  concepts: [
    "Full-Stack Development",
    "Database Systems",
    "API Design",
    "3D Graphics & Animations",
    "Code Complexity Analysis",
    "Session Authentication",
    "Role-Based Access Control",
    "Data Structures & Algorithms",
    "Software Engineering",
  ],
};

export const projectsData = [
  {
    id: "my-coffee-co",
    name: "My Coffee Co.",
    tagline: "Premium, performance-tuned coffee e-commerce frontend",
    shortDescription:
      "A premium, mobile-first e-commerce frontend optimized for consistent 60 FPS scrolling through render isolation and Core Web Vitals tuning.",
    description:
      "My Coffee Co. is a premium, mobile-first e-commerce frontend designed to make coffee shopping fast, tactile, and frictionless. Through responsive layout restructuring, elimination of main-thread render bottlenecks, and GPU-composited layers, the app delivers consistent 60 FPS scroll performance across all mobile devices — from iPhone SE to Galaxy S22 Ultra.",
    category: "Frontend",
    tech: ["React", "Vite", "Tailwind CSS", "TypeScript", "Framer Motion", "Vercel"],
    features: [
      "Split-context render isolation — cart state is separated from product cards to eliminate unnecessary re-renders",
      "Swipeable horizontal scroll-snapping carousels that reduce page height by over 70%",
      "Animated cart drawer with Framer Motion transitions and a free-shipping progress tracker",
      "Core Web Vitals tuning via React.lazy/Suspense for dynamic below-the-fold loading",
      "LCP preloading and WebP asset optimization to minimize initial payload size",
      "Glassmorphic sticky header and persistent mobile bottom navigation bar",
    ],
    problemSolved:
      "Mobile e-commerce sites commonly suffer from large payloads, layout shifts, and catalog-wide re-renders when items are added to the cart — all leading to scroll lag. My Coffee Co. isolates reactive state from static components and optimizes asset delivery to maintain a stable 60 FPS experience.",
    approach:
      "A split-context architecture ensures catalog components do not subscribe directly to cart state updates. The critical rendering path is optimized with lazy-loaded below-the-fold sections and high-priority preloading (fetchPriority) for above-the-fold hero images, reducing the initial HTML payload to just 0.58 KB.",
    architecture:
      "A client-side frontend built with React 19, Vite 7, and Tailwind CSS v4, deployed on Vercel. State management uses isolated contexts that separate read-only cart values from item dispatchers to prevent catalog-wide DOM updates.",
    challenges:
      "Preventing catalog re-renders on cart updates while maintaining smooth mobile scroll physics. Resolved through custom context isolation and hardware-accelerated GPU-composited layers for the horizontal touch carousels.",
    futureImprovements:
      "Stripe/UPI checkout integration, persistent cart sync via an Express backend, and user account dashboards.",
    github: "https://github.com/mitheshshettyy/my-coffee-co",
    liveDemo: "https://my-coffee-co.vercel.app/",
    status: "Completed",
    date: "May 2026",
    stars: 8,
    featured: true,
  },
  {
    id: "complexify",
    name: "Complexify",
    tagline: "AI-powered Python code complexity classifier",
    shortDescription:
      "A tool that accepts Python code and predicts time and space complexity, a readability score, and optimization suggestions — powered by a FastAPI backend and a JavaScript frontend.",
    description:
      "A production-ready machine learning tool that analyzes Python source code and instantly classifies its algorithmic complexity. By parsing the Abstract Syntax Tree (AST) of the input code, the system extracts rich structural features to predict time and space complexity categories, and provides readability scores alongside actionable optimization suggestions.",
    category: "AI/ML",
    tech: ["Python", "FastAPI", "Scikit-learn", "HTML", "CSS", "JavaScript"],
    features: [
      "Predicts algorithmic time complexity from Python code snippets",
      "Evaluates space complexity requirements",
      "Computes readability scores to assess code maintainability",
      "Generates actionable optimization suggestions to improve performance",
      "Powered by a FastAPI backend serving a Scikit-learn Random Forest model",
    ],
    problemSolved:
      "Developers — especially students and junior engineers — often struggle to assess algorithm efficiency or understand time/space complexity implications. Existing static analysis tools are either overly simplistic or require complex local setups. Complexify provides a web-based, instant feedback loop for analyzing and improving code efficiency.",
    approach:
      "A lightweight FastAPI backend parses Python code into an Abstract Syntax Tree (AST) and extracts structural features such as loop nesting depth, recursive call patterns, branching complexity, and built-in function usage. These features are fed to a Scikit-learn Random Forest classifier trained on over 1,000 labeled code samples, which returns predictions to a clean JavaScript frontend.",
    architecture:
      "The HTML/CSS/JS frontend sends source code via POST request to a FastAPI backend. The backend runs the code through a custom AST parser to extract structural metrics, converts them into a feature vector, feeds it to a serialized Scikit-learn model, and returns the complexity classification along with optimization recommendations.",
    challenges:
      "Accurately predicting complexity for unstructured code or deeply nested logic branches proved difficult. Simple regex parsing failed to capture execution depth, requiring a migration to full AST node traversal to reliably identify control flow structures.",
    futureImprovements:
      "Multi-file analysis support, integration of transformer-based LLMs for more nuanced optimization suggestions, and coverage of additional languages such as Java and C++.",
    github: "https://github.com/mitheshshettyy/Complexify",
    demo: null,
    status: "Completed",
    date: "Apr 2026",
    stars: 12,
    featured: true,
  },
  {
    id: "nextresume",
    name: "NextResume",
    tagline: "Real-time resume builder with live preview",
    shortDescription:
      "A modern resume builder with a live side-by-side editor — changes to structured sections are reflected instantly in the formatted layout, with one-click PDF download.",
    description:
      "A modern, full-stack resume builder featuring a real-time, side-by-side interactive editor. Users enter their professional details in structured fields and watch the document layout update instantly. The app integrates secure authentication and PDF generation to deliver print-ready, high-quality resumes.",
    category: "Full-Stack",
    tech: ["Next.js", "React", "Node.js", "NextAuth.js", "JavaScript"],
    features: [
      "AI-assisted bullet point generation for professional resume descriptions",
      "Real-time, side-by-side interactive editor with instant preview updates",
      "Multiple distinct, recruiter-friendly resume templates",
      "High-quality, ATS-ready PDF exports",
      "User dashboard for managing multiple resumes and tracking progress",
      "Secure session-based authentication for user accounts",
    ],
    problemSolved:
      "Traditional resume builders are often slow, lack real-time visual feedback, or lock templates behind premium paywalls. NextResume addresses this with an instant-rendering editor, zero rendering lag, and clean PDF export — all available without a paywall.",
    approach:
      "Built on Next.js, the app uses React state management to synchronize form inputs with a live document preview. NextAuth.js handles secure credential and OAuth authentication. PDF rendering is performed client-side using react-pdf, compiling React components into a pixel-perfect downloadable PDF.",
    architecture:
      "The frontend is built with React and Tailwind CSS on Next.js, managing state sync and rendering the PDF document via react-pdf. The backend uses Next.js API Routes to store user profiles and resume data, with NextAuth.js managing sessions securely.",
    challenges:
      "Synchronizing state across complex nested sections — Education, Experience, and Skills — without triggering full-page re-renders or lagging the live preview. Resolved by optimizing React context usage and memoizing individual form fields.",
    futureImprovements:
      "Additional professional resume templates, an AI assistant for writing achievement-focused bullet points, and an ATS compatibility scanner.",
    github: "https://github.com/mitheshshettyy/NextResume",
    demo: null,
    status: "Completed",
    date: "Jan 2026",
    stars: 18,
    featured: true,
  },
  {
    id: "orbitlearn",
    name: "OrbitLearn",
    tagline: "Secure, role-based Learning Management System",
    shortDescription:
      "A secure, role-based LMS with a React + Vite frontend and an Express backend API that persists course progress in MongoDB.",
    description:
      "OrbitLearn is a secure Learning Management System (LMS) built to streamline course delivery, user management, and performance tracking. Featuring a dark-mode Cosmic design language with glassmorphism and smooth micro-animations, it provides dedicated portals for students, instructors, and administrators.",
    category: "Full-Stack",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Vite", "JWT"],
    features: [
      "Secure authentication with JWT tokens and bcryptjs password hashing",
      "Role-Based Access Control (RBAC) with separate dashboards for Students, Instructors, and Admins",
      "Course studio supporting multi-chapter editing and interactive quiz creation",
      "Dynamic chapter completion tracking and course progress indicators",
      "Multer-powered file uploads for custom course thumbnails and certificates",
      "Cosmic dark-mode UI with glassmorphism and responsive flex/grid layouts",
    ],
    problemSolved:
      "Many online learning platforms are cluttered, visually dated, and difficult to manage across roles. OrbitLearn addresses this by separating concerns into distinct role-based dashboards, secured with JWT and backed by dynamic frontend routing.",
    approach:
      "Engineered as a decoupled full-stack SPA. The React frontend uses context providers for authentication and app state, while the Node.js/Express backend exposes secure REST APIs mapped to MongoDB via Mongoose ODM schemas.",
    architecture:
      "A client-server application composed of a React 19 SPA and a Node.js/Express 5 API server. MongoDB handles persistence, while JWT middleware intercepts and verifies requests before they reach protected routes.",
    challenges:
      "Keeping student progress counters and quiz submissions in sync without causing sluggish re-renders. Resolved by implementing a dedicated React context layer with optimistic client-side updates applied before API persistence.",
    futureImprovements:
      "Automated completion certificates sent by email, real-time student–instructor messaging, and AWS S3 integration for media storage.",
    github: "https://github.com/mitheshshettyy/OrbitLearn",
    demo: null,
    status: "Completed",
    date: "Nov 2025",
    stars: 6,
    featured: true,
  },
  {
    id: "eventsphere",
    name: "EventSphere",
    tagline: "College Event Management System",
    shortDescription:
      "A secure college event management platform built with Spring Boot MVC and Thymeleaf, enabling admins to coordinate campus events and students to register dynamically.",
    description:
      "EventSphere is a secure college event management system designed to streamline the organizing, scheduling, and tracking of campus activities. It provides a dedicated administrative dashboard for event orchestration and registration monitoring, alongside a student portal for browsing and signing up for events.",
    category: "Full-Stack",
    tech: ["Java", "Spring Boot", "MySQL", "Thymeleaf", "Tailwind CSS", "Maven"],
    features: [
      "Secure user registration and login with session-based role redirection",
      "Admin controls for the full event lifecycle — creation, update, and deletion",
      "Student portal for browsing and registering for events securely",
      "Admin dashboard displaying registration counts and enrolled student details",
      "Dynamic, modular frontend rendering using Thymeleaf layouts and fragments",
    ],
    problemSolved:
      "Campus event organization is often fragmented and reliant on manual spreadsheets. EventSphere consolidates event publishing, student registration, and attendance rosters into a single secure web portal.",
    approach:
      "Built a responsive, multi-role Java web application with Spring Boot. Designed relational MySQL schemas managed via Spring Data JPA. Used server-side Thymeleaf templates for fast rendering and session-role-based dynamic state management.",
    architecture:
      "A full-stack MVC application using Spring Boot controllers to handle HTTP requests, JPA/Hibernate repositories to interface with MySQL, and Thymeleaf for server-rendered page layouts.",
    challenges:
      "Enforcing session-based route protection — preventing students from accessing admin pages — without configuring full Spring Security. Resolved by building custom controller interceptors and HTTP session validation checks inside the view controllers.",
    futureImprovements:
      "Automated email notifications on successful registration, dynamic event capacity enforcement, and a REST API layer for future mobile app integration.",
    github: "https://github.com/mitheshshettyy/EventSphere",
    demo: null,
    status: "Completed",
    date: "Nov 2025",
    stars: 5,
    featured: true,
  },
  {
    id: "virtual-garden",
    name: "Virtual Garden",
    tagline: "3D interactive medicinal plant platform",
    shortDescription:
      "A platform for browsing and submitting medicinal plant entries, with a gallery, submission form, and contact page — anchored by an immersive Three.js 3D landing scene.",
    description:
      "An immersive, interactive web platform showcasing a digital library of medicinal plants. The application pairs a structured botanical database with a beautifully rendered 3D landing page scene, letting users explore plant models in a virtual greenhouse environment.",
    category: "Frontend",
    tech: ["Next.js", "React", "Tailwind CSS", "MongoDB", "Three.js", "TypeScript"],
    features: [
      "Plant Gallery for browsing medicinal plants with their uses and images",
      "Dynamic user submission form for adding new plants to the library",
      "Contact page for user collaboration and feedback",
      "Immersive Three.js 3D background featuring an animated Earth scene",
      "Modern UI with glassmorphism effects and custom CSS gradients",
    ],
    problemSolved:
      "Online botanical databases are typically static, text-heavy, and visually unengaging. Virtual Garden bridges the gap between scientific information and modern interactive experiences by layering dynamic 3D elements onto educational content.",
    approach:
      "The landing page embeds a Three.js canvas that loads optimized GLTF/GLB plant models with custom lighting, OrbitControls, and hover-triggered annotations. Database operations use Next.js API routes connected to a MongoDB Atlas cluster.",
    architecture:
      "The client renders a WebGL canvas via Three.js and React Three Fiber. Click handlers on 3D elements surface detailed information cards. Plant data and user submissions are routed through Next.js serverless API functions to MongoDB.",
    challenges:
      "High VRAM usage and slow load times for 3D assets on mobile devices. Resolved by optimizing GLTF meshes, applying DRACO texture compression, and implementing a lazy-loading skeleton to avoid blocking the initial page render.",
    futureImprovements:
      "Real-time weather and daylight simulation affecting the 3D scene, a database expanded to 100+ species, and WebXR (virtual reality) support.",
    github: "https://github.com/mitheshshettyy/Virtual-Garden",
    demo: null,
    status: "Completed",
    date: "Sep 2025",
    stars: 25,
    featured: true,
  },
];

export const experienceData = [
  {
    id: "full-stack-intern-algoorbit",
    role: "Full Stack Development Intern",
    company: "ALGOORBIT Innovations Private Limited",
    team: "EdTech Platform Team",
    type: "Internship",
    duration: "Nov 2025 – Jan 2026",
    location: "Remote",
    description:
      "Developed course management and student progress tracking modules for a MERN stack EdTech platform. Implemented JWT-based role access control, resolved N+1 MongoDB query performance issues, and built Express.js RESTful APIs.",
    achievements: [
      "Developed course management and student progress tracking modules for a MERN stack EdTech platform with 100+ registered users",
      "Implemented role-based access control using JWT with distinct permission scopes for Admin, Instructor, and Student roles",
      "Resolved N+1 query issues in MongoDB aggregation pipelines and added field-level indexing, reducing average API response time by ~25%",
      "Designed and tested RESTful API endpoints in Express.js with consistent schema validation and structured error handling",
    ],
    tech: ["React", "Node.js", "Express.js", "MongoDB", "JWT"],
    logo: "A",
    color: "#00ff88",
  }
];

export const commandDocs: Record<string, string> = {
  help: "Display available commands and their descriptions",
  about: "Navigate to the About Me page",
  education: "Navigate to the Education page",
  skills: "Navigate to the Skills page",
  projects: "Navigate to the Projects page",
  experience: "Navigate to the Experience page",
  contact: "Navigate to the Contact page",
  resume: "Open/download resume PDF",
  whoami: "Display identity summary",
  date: "Show current date",
  time: "Show current time",
  pwd: "Show current working directory",
  ls: "List available sections",
  cd: "Change virtual directory (e.g. cd about, cd ..)",
  tree: "Display filesystem directory tree",
  history: "View typed command history",
  clear: "Clear the terminal output",
  cls: "Clear the terminal output (alias for clear)",
  social: "Display social media links",
  github: "Open GitHub profile",
  linkedin: "Open LinkedIn profile",
  email: "Display email address",
  status: "Show availability status",
  theme: "Display current terminal theme info",
  ascii: "Display ASCII art banner",
  banner: "Display ASCII art banner (alias for ascii)",
  uptime: "Show portfolio uptime",
  intro: "Replay the intro sequence",
  echo: "Print a message (usage: echo <message>)",
  cat: "Read a file (usage: cat <filename>.txt)",
  download: "Download a resource directly (usage: download resume)",
  open: "Open a resource (usage: open resume)",
  exit: "Simulate terminal exit (redirects home)",
  neofetch: "Display system information",
  matrix: "Toggle matrix rain effect",
};

export const socialLinks = {
  github: { url: config.contact.github, label: "GitHub", handle: `@${config.contact.github.split('/').pop()}` },
  linkedin: { url: config.contact.linkedin, label: "LinkedIn", handle: `in/${config.contact.linkedin.split('/in/').pop()}` },
  email: { url: `mailto:${config.contact.email}`, label: "Email", handle: config.contact.email },
};

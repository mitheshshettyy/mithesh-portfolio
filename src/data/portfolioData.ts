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
  phone: "+91 63629 69943",
  github: config.contact.github,
  linkedin: config.contact.linkedin,
  twitter: "https://twitter.com/mitheshshettyy",
  resumeUrl: config.resume.path,
  availability: config.personal.status,
  prompt: `${config.terminal.user}@${config.terminal.host}`,
  shell: config.terminal.shell,
  version: config.terminal.version,
  get uptime() {
    return getPortfolioUptime();
  },
  status: config.personal.status,
};

export const aboutData = {
  summary: `I'm a Computer Science & Engineering student at NMAM Institute of Technology with a strong foundation in full-stack web development. I specialize in building web applications with React, Next.js, and Node.js, database optimization with MongoDB, and creating interactive user experiences with Three.js. I thrive at the intersection of robust backend systems and beautiful frontend designs.`,
  philosophy: `I believe great software is born at the intersection of clean database architecture, structured backend APIs, and responsive user interfaces. I am passionate about writing clean, efficient, and well-documented code that solves real-world challenges.`,
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
    { label: "LeetCode Problems", value: "300+", color: "purple" },
    { label: "Internship", value: "1", color: "blue" },
  ],
  funFacts: [
    "Enjoys Full-Stack Development",
    "DSA Enthusiast",
    "Love Watching Series",
    "Exploring Everything",
    "Love Watching Cricket & F1",
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
      "Distinction in academic terms",
      "Built interactive 3D web scenes and full-stack projects",
      "Active participant in technical student clubs",
    ],
    coursework: [
      "Data Structures & Algorithms",
      "Database Management Systems",
      "Object Oriented Programming",
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
    { name: "C++", level: 90 },
    { name: "Java", level: 80 },
    { name: "Python", level: 80 },
    { name: "JavaScript", level: 85 },
    { name: "TypeScript", level: 80 },
  ],
  frontend: [
    { name: "React", level: 85 },
    { name: "Next.js", level: 80 },
    { name: "Tailwind CSS", level: 80 },
    { name: "Three.js", level: 75 },
  ],
  backend: [
    { name: "Node.js", level: 80 },
    { name: "Express.js", level: 80 },
    { name: "REST APIs", level: 85 },
  ],
  databases: [
    { name: "MongoDB", level: 90 },
    { name: "MySQL", level: 85 },
    { name: "PostgreSQL", level: 80 },
  ],
  developerEcosystem: [
    { name: "Git & GitHub", level: 90 },
    { name: "Postman", level: 85 },
    { name: "VS Code", level: 90 },
    { name: "Vercel", level: 85 },
    { name: "Docker", level: 80 },
    { name: "Linux", level: 90 },
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
    id: "complexify",
    name: "Complexify",
    tagline: "AI-powered Python code complexity classifier",
    shortDescription:
      "A tool that accepts Python code and predicts time and space complexity, readability score, and optimization suggestions via a FastAPI backend and JavaScript frontend.",
    description:
      "A production-ready machine learning tool designed to analyze Python source code and instantly classify its algorithmic complexity. By parsing the Abstract Syntax Tree (AST) of the input code, the system extracts rich structural features to predict time and space complexity categories, alongside providing readability scores and actionable code optimization suggestions.",
    category: "AI/ML",
    tech: ["Python", "FastAPI", "Scikit-learn", "HTML", "CSS", "JavaScript"],
    features: [
      "Extracted AST-based features such as loop nesting depth and branching structure",
      "Trained a Scikit-learn classifier model on ~1,000 labeled samples",
      "Achieved ~78% validation accuracy across five complexity classes",
      "Generates time/space complexity predictions and optimization suggestions",
    ],
    problemSolved:
      "Developers, especially students and junior engineers, often struggle to evaluate the efficiency of their algorithms or understand time/space complexity implications. Existing static analysis tools are either overly simplistic or require complex local setups. Complexify offers a web-based, instant feedback loop to analyze and improve code efficiency.",
    approach:
      "The application uses a lightweight FastAPI backend to parse Python code into an Abstract Syntax Tree (AST). It extracts code features such as loop nesting depth, recursive calls, branching complexity, and built-in function calls. These features are passed to a Scikit-learn Random Forest classifier trained on over 1,000 labeled code blocks, which returns predictions to a clean JavaScript frontend.",
    architecture:
      "Frontend (HTML/CSS/JS) sends source code via a POST request to a FastAPI backend. The backend runs the code through a custom AST parser to extract structural metrics, transforms these into a feature vector, feeds it to a serialized Scikit-learn model, and responds with the classification and optimization recommendations.",
    challenges:
      "Accurately predicting complexity for unstructured code or deeply nested logical branches was a challenge. Simple regex parsing failed to capture execution depth, which required migrating to full AST node traversal to identify control flow structures reliably.",
    futureImprovements:
      "Support for multi-file analysis, integration of transformer-based LLMs for more nuanced code optimization suggestions, and support for additional programming languages like Java and C++.",
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
    tagline: "Live preview resume builder",
    shortDescription:
      "A modern resume builder with a live preview editor where changes to structured sections are reflected instantly in the formatted layout, with PDF download support.",
    description:
      "A modern, full-stack resume builder featuring a real-time, side-by-side interactive editor. Users can input their professional details in structured fields and watch the document layout dynamically adapt. The app integrates secure authentication and PDF generation to deliver print-ready, high-quality resumes.",
    category: "Full-Stack",
    tech: ["Next.js", "React", "Node.js", "NextAuth.js", "JavaScript"],
    features: [
      "Live preview editor where changes to structured sections reflect instantly",
      "Session-based authentication with NextAuth.js and protected dashboard routes",
      "Integrated react-pdf to render the layout as a downloadable, print-ready PDF",
    ],
    problemSolved:
      "Traditional resume builders are often slow, lack real-time visual feedback, or lock layouts behind premium paywalls. NextResume solves this by providing a developer-focused, instant-rendering resume builder with zero lag and clean PDF export functionality.",
    approach:
      "Built on Next.js, NextResume leverages React's state management to synchronize user input fields with a formatted document preview in real time. It uses NextAuth.js to handle secure credentials and OAuth logins. PDF rendering is handled client-side using react-pdf to compile HTML components into a pixel-perfect downloadable PDF.",
    architecture:
      "The frontend is built with React and Tailwind CSS on Next.js, handling state sync and rendering the PDF document using react-pdf. The backend is powered by Next.js API Routes, storing user profiles and resume data, and using NextAuth.js to manage sessions securely.",
    challenges:
      "Synchronizing state changes across complex, nested sections (Education, Experience, Skills) without triggering full-page rerenders or lagging the live preview. This was resolved by optimizing React contexts and memoizing form fields.",
    futureImprovements:
      "Add multiple professional resume templates, integrate an AI assistant to write bullet points, and add ATS-friendliness scanning checks.",
    github: "https://github.com/mitheshshettyy/NextResume",
    demo: null,
    status: "Completed",
    date: "Jan 2026",
    stars: 18,
    featured: true,
  },
  {
    id: "virtual-garden",
    name: "Virtual Garden",
    tagline: "3D interactive medicinal plant platform",
    shortDescription:
      "A platform for browsing and submitting medicinal plant entries, including a gallery, submission form, and contact features, featuring an interactive Three.js 3D landing page scene.",
    description:
      "An immersive, interactive web platform that showcases a digital library of medicinal plants. The application combines a structured database of botanical entries with a beautifully rendered 3D scene on the landing page, allowing users to interact with plant models in a virtual greenhouse environment.",
    category: "Frontend",
    tech: ["Next.js", "React", "Tailwind CSS", "MongoDB", "Three.js", "TypeScript"],
    features: [
      "Browsing and submitting medicinal plant entries with Next.js API routes and MongoDB",
      "Rendered interactive Three.js 3D scene on landing page with animated plant models",
      "Fully responsive UI designed with Tailwind CSS utility classes",
    ],
    problemSolved:
      "Online botanical databases are typically static, text-heavy, and unengaging. Virtual Garden bridges the gap between scientific information and modern interactive experiences by adding dynamic 3D elements that make learning about nature visually appealing.",
    approach:
      "The landing page embeds a Three.js canvas loading optimized GLTF/GLB models of plants and gardens. The models are rendered in a 3D scene with custom lighting, camera controls (OrbitControls), and hover-based node annotations. The database operations use Next.js API routes linked to a MongoDB Atlas cluster.",
    architecture:
      "The client uses Three.js and React Three Fiber to display a WebGL canvas in the browser. Interactive click handlers on 3D elements trigger detailed information cards. Plant meta-information and user submissions are routed through Next.js serverless functions to MongoDB.",
    challenges:
      "VRAM usage and loading times for 3D assets on mobile devices. I optimized the GLTF meshes, applied texture compression (DRACO loader), and implemented a lazy-loading skeleton placeholder to prevent blocking the initial page load.",
    futureImprovements:
      "Add real-time weather and daylight simulation affecting the 3D scene, expand the database to cover 100+ species, and introduce virtual reality (WebXR) support.",
    github: "https://github.com/mitheshshettyy/Virtual-Garden",
    demo: null,
    status: "Completed",
    date: "Sep 2025",
    stars: 25,
    featured: true,
  },
  {
    id: "my-coffee-co",
    name: "My Coffee Co.",
    tagline: "Premium, high-performance coffee e-commerce experience",
    shortDescription:
      "A premium, mobile-first e-commerce frontend optimized for 60 FPS scrolling with render isolation and Core Web Vital tuning.",
    description:
      "My Coffee Co. is a premium, mobile-first, high-converting e-commerce frontend designed to make coffee buying fast, tactile, and frictionless. By reorganizing responsive layouts, eliminating main-thread render dependencies, and utilizing GPU-composited layers, the application is optimized for mobile touchscreens (from iPhone SE up to Galaxy S22 Ultra), securing consistent 60 FPS scroll performance.",
    category: "Frontend",
    tech: ["React", "Vite", "Tailwind CSS", "TypeScript", "Framer Motion", "Vercel"],
    features: [
      "Split-Context Render Isolation separating cart state from product cards to eliminate re-renders",
      "Swipeable mobile horizontal scroll-snapping carousels reducing page height by over 70%",
      "Interactive cart drawer with Framer Motion transitions and free-shipping progress tracker",
      "Core Web Vital tuning with React.lazy/Suspense loading below-the-fold sections dynamically",
      "LCP preloading and WebP asset optimizations reducing initial payload size significantly",
      "Glassmorphic sticky header and persistent mobile bottom navigation bar",
    ],
    problemSolved:
      "Traditional mobile e-commerce sites often suffer from high payload sizes, layout shifts, and heavy catalog re-renders when items are added to the cart, leading to scroll lag. My Coffee Co. solves this by isolating reactive state from static components and optimizing asset delivery to maintain a stable 60 FPS experience.",
    approach:
      "The application leverages a split-context architecture where catalog items do not subscribe to cart state updates directly. It optimizes the critical rendering path using lazy loading for lower sections and high-priority preloading (fetchPriority) for above-the-fold hero images, cutting initial HTML payload size to just 0.58 KB.",
    architecture:
      "A client-side e-commerce frontend built using React 19, Vite 7, and Tailwind CSS v4, deployed on Vercel. State management utilizes isolated contexts separating read-only cart values from item dispatchers to prevent catalog-wide DOM updates.",
    challenges:
      "Avoiding catalog re-renders upon cart updates and optimizing mobile scroll physics. This was resolved by using custom context isolation and deploying hardware-accelerated GPU-composited layers for the horizontal touch carousels.",
    futureImprovements:
      "Integrate Stripe/UPI checkout processing, implement persistent cart sync with an Express backend, and add user account dashboards.",
    github: "https://github.com/mitheshshettyy/my-coffee-co",
    liveDemo: "https://my-coffee-co.vercel.app/",
    status: "Completed",
    date: "May 2026",
    stars: 8,
    featured: true,
  },
  {
    id: "eventsphere",
    name: "EventSphere",
    tagline: "College Event Management System",
    shortDescription:
      "A secure college event management platform built using Spring Boot MVC and Thymeleaf, enabling admins to coordinate campus events and students to register dynamically.",
    description:
      "EventSphere is a secure college event management system designed to streamline organizing, scheduling, and tracking campus activities. The application provides dedicated administrative dashboards for event orchestration and student registration monitoring, alongside a personalized portal for students to register for events.",
    category: "Full-Stack",
    tech: ["Java", "Spring Boot", "MySQL", "Thymeleaf", "Tailwind CSS", "Maven"],
    features: [
      "Secure user registration and login with session role redirection",
      "Administrative controls for the complete event lifecycle (creation, update, deletion)",
      "Student registration portal to browse events and sign up securely",
      "Admin event management dashboard displaying registration counts and student details",
      "Dynamic, modular frontend rendering using Thymeleaf layouts and fragments"
    ],
    problemSolved:
      "Campus event organization is often fragmented and dependent on manual tracking sheets. EventSphere unifies event publishing, registration, and attendance rosters into a single secure web portal.",
    approach:
      "Developed a responsive multi-role Java web application with Spring Boot. Designed relational database schemas in MySQL managed via Spring Data JPA. Leveraged server-side Thymeleaf templates for fast rendering and dynamic state management based on user session roles.",
    architecture:
      "A full-stack MVC application using Spring Boot controllers to handle HTTP requests, JPA/Hibernate repositories to interface with a MySQL database, and Thymeleaf for server-rendered page layouts.",
    challenges:
      "Ensuring proper session-based validation for page routes (e.g. protecting admin pages from student users) without configuring full Spring Security. Resolved this by building controller interceptors and HTTP session validation checks directly within the view controllers.",
    futureImprovements:
      "Integrate automated email notifications for successful registration, enforce dynamic event capacity limits, and build a REST API version for future mobile application integration.",
    github: "https://github.com/mitheshshettyy/EventSphere",
    demo: null,
    status: "Completed",
    date: "Nov 2025",
    stars: 5,
    featured: true,
  },
  {
    id: "orbitlearn",
    name: "OrbitLearn",
    tagline: "Premium Learning Management System (LMS)",
    shortDescription:
      "A secure, role-based LMS featuring an interactive React + Vite frontend client and an Express backend API storing course progress in MongoDB.",
    description:
      "OrbitLearn is a secure, premium Learning Management System (LMS) designed to streamline course delivery, user management, and performance tracking. Featuring a modern, dark-mode Cosmic design language with glassmorphism and smooth micro-animations, the application provides dedicated portals for student course consumption, instructor course creation, and administrative platform controls.",
    category: "Full-Stack",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Vite", "JWT"],
    features: [
      "Secure user authentication with JWT tokens and bcryptjs password hashing",
      "Role-Based Access Control (RBAC) supporting custom Student, Instructor, and Admin dashboard layouts",
      "Course studio with multi-chapter editing and interactive quiz sets generation",
      "Dynamic chapter completion status and course registration progress trackers",
      "Multer-configured file upload logic for custom course thumbnails and certificates",
      "Cosmic styling with glassmorphism layouts and responsive flex/grid viewport scaling"
    ],
    problemSolved:
      "Traditional online learning platforms are often cluttered, visually outdated, and difficult to manage across different roles. OrbitLearn solves this by separating concerns into distinct dashboards with JWT protection and dynamic frontend routing.",
    approach:
      "Engineered a full-stack, decoupled SPA. The frontend utilizes React context providers to manage authentication and application states, while the Node/Express backend hosts secure REST APIs mapping data to MongoDB via Mongoose ODM schemas.",
    architecture:
      "A client-server application composed of a React 19 frontend SPA and a Node.js/Express 5 API server. Persistence is managed in MongoDB, while security middleware intercepts and verifies requests using JSON Web Tokens.",
    challenges:
      "Optimizing the application to synchronize student progress counters and quiz submissions without sluggish page rerenders. Resolved this by building a dedicated React context layer that implements optimistic client updates prior to API persistence.",
    futureImprovements:
      "Integrate automated email certificates on completion, add real-time messaging between students and instructors, and support cloud storage services like AWS S3 for media uploads.",
    github: "https://github.com/mitheshshettyy/OrbitLearn",
    demo: null,
    status: "Completed",
    date: "Nov 2025",
    stars: 6,
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
    location: "Karkala, Karnataka, India",
    description:
      "Built course management and student progress tracking modules for a MERN stack EdTech platform. Implemented JWT role-based access control, resolved N+1 MongoDB query performance issues, and developed Express.js RESTful APIs.",
    achievements: [
      "Built course management and student progress tracking modules for a MERN stack EdTech platform with 100+ registered users",
      "Implemented role-based access control using JWT with separate permission scopes for admin, instructor, and student roles",
      "Resolved N+1 query issues in MongoDB aggregation pipelines and added field-level indexing, reducing average API response time by ~25%",
      "Developed and tested RESTful API endpoints in Express.js with consistent schema validation and structured error handling",
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
  twitter: { url: "https://twitter.com/mitheshshettyy", label: "Twitter", handle: "@mitheshshettyy" },
  email: { url: `mailto:${config.contact.email}`, label: "Email", handle: config.contact.email },
};

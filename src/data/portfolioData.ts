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
    year: 2026,
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
    year: 2026,
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
    year: 2025,
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

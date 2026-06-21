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
    { name: "JavaScript", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "Python", level: 85 },
    { name: "Java", level: 80 },
    { name: "C/C++", level: 75 },
    { name: "HTML/CSS", level: 90 },
  ],
  frontend: [
    { name: "React", level: 90 },
    { name: "Next.js", level: 85 },
    { name: "Tailwind CSS", level: 90 },
    { name: "Three.js", level: 80 },
  ],
  backend: [
    { name: "Node.js", level: 85 },
    { name: "Express.js", level: 85 },
    { name: "FastAPI", level: 80 },
    { name: "REST APIs", level: 90 },
  ],
  databases: [
    { name: "MongoDB", level: 85 },
    { name: "MySQL", level: 80 },
  ],
  tools: [
    { name: "Git & GitHub", level: 90 },
    { name: "Postman", level: 85 },
    { name: "VS Code", level: 90 },
  ],
  cloud: [
    { name: "Google Cloud Platform", level: 70 },
    { name: "Vercel", level: 85 },
  ],
  devops: [
    { name: "Docker", level: 75 },
  ],
  ai: [
    { name: "Scikit-learn", level: 75 },
    { name: "ML Basics", level: 70 },
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
    description:
      "A tool that accepts Python code and predicts time and space complexity, readability score, and optimization suggestions via a FastAPI backend and JavaScript frontend.",
    category: "AI/ML",
    tech: ["Python", "FastAPI", "Scikit-learn", "HTML", "CSS", "JavaScript"],
    features: [
      "Extracted AST-based features such as loop nesting depth and branching structure",
      "Trained a Scikit-learn classifier model on ~1,000 labeled samples",
      "Achieved ~78% validation accuracy across five complexity classes",
      "Generates time/space complexity predictions and optimization suggestions",
    ],
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
    description:
      "A modern resume builder with a live preview editor where changes to structured sections are reflected instantly in the formatted layout, with PDF download support.",
    category: "Full-Stack",
    tech: ["Next.js", "React", "Node.js", "NextAuth.js", "JavaScript"],
    features: [
      "Live preview editor where changes to structured sections reflect instantly",
      "Session-based authentication with NextAuth.js and protected dashboard routes",
      "Integrated react-pdf to render the layout as a downloadable, print-ready PDF",
    ],
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
    description:
      "A platform for browsing and submitting medicinal plant entries, including a gallery, submission form, and contact features, featuring an interactive Three.js 3D landing page scene.",
    category: "Frontend",
    tech: ["Next.js", "React", "Tailwind CSS", "MongoDB", "Three.js", "TypeScript"],
    features: [
      "Browsing and submitting medicinal plant entries with Next.js API routes and MongoDB",
      "Rendered interactive Three.js 3D scene on landing page with animated plant models",
      "Fully responsive UI designed with Tailwind CSS utility classes",
    ],
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
  },
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
  clear: "Clear the terminal output",
  social: "Display social media links",
  github: "Open GitHub profile",
  linkedin: "Open LinkedIn profile",
  email: "Display email address",
  status: "Show availability status",
  theme: "Display current terminal theme info",
  ascii: "Display ASCII art banner",
  uptime: "Show portfolio uptime",
  intro: "Replay the intro sequence",
  echo: "Print a message (usage: echo <message>)",
  cat: "Read a file (usage: cat <filename>.txt)",
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

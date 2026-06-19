/**
 * ============================================================
 *  Portfolio Backend — Express.js API Server
 *  Author: Mithesh R Shetty
 *  Stack: Node.js + Express + CORS + dotenv
 * ============================================================
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ──
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// ── Request logging ──
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

// ── Routes ──

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

// Portfolio data endpoint
app.get('/api/portfolio', (req, res) => {
  res.json({
    name: 'Mithesh R Shetty',
    title: 'Full-Stack Developer & CS Student',
    university: 'NMAM Institute of Technology, Nitte, Karnataka',
    year: '3rd Year',
    graduationYear: 2027,
    cgpa: '8.68/10.0',
    email: 'shettymithesh030@gmail.com',
    github: 'https://github.com/mitheshshettyy',
    linkedin: 'https://linkedin.com/in/mithesh-shetty030',
    availability: 'Open to Opportunities — Summer 2027',
  });
});

// Projects endpoint
app.get('/api/projects', (req, res) => {
  const { category, featured } = req.query;

  const projects = [
    {
      id: 'complexify',
      name: 'Complexify',
      category: 'AI/ML',
      featured: true,
      tech: ['Python', 'FastAPI', 'Scikit-learn', 'HTML', 'CSS', 'JavaScript'],
      stars: 12,
      status: 'Completed',
    },
    {
      id: 'nextresume',
      name: 'NextResume',
      category: 'Full-Stack',
      featured: true,
      tech: ['Next.js', 'React', 'Node.js', 'NextAuth.js', 'JavaScript'],
      stars: 18,
      status: 'Completed',
    },
    {
      id: 'virtual-garden',
      name: 'Virtual Garden',
      category: 'Frontend',
      featured: true,
      tech: ['Next.js', 'React', 'Tailwind CSS', 'MongoDB', 'Three.js', 'TypeScript'],
      stars: 25,
      status: 'Completed',
    },
  ];

  let filtered = projects;
  if (category) filtered = filtered.filter(p => p.category === category);
  if (featured === 'true') filtered = filtered.filter(p => p.featured);

  res.json({ projects: filtered, total: filtered.length });
});

// Contact form submission
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({
      error: 'Missing required fields',
      required: ['name', 'email', 'message'],
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  if (message.length > 5000) {
    return res.status(400).json({ error: 'Message exceeds maximum length of 5000 characters' });
  }

  // In production: send email via Nodemailer / Resend / SendGrid
  console.log(`[CONTACT] New message from ${name} <${email}>`);
  console.log(`[CONTACT] Subject: ${subject || 'No subject'}`);
  console.log(`[CONTACT] Message: ${message.substring(0, 100)}...`);

  // Simulate processing
  const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  return res.status(200).json({
    success: true,
    messageId,
    message: 'Message received! I\'ll get back to you within 24 hours.',
    timestamp: new Date().toISOString(),
  });
});

// Resume download endpoint
app.get('/api/resume/download', (req, res) => {
  const resumePath = path.join(__dirname, 'assets', 'resume.pdf');

  // Check if file exists (in production)
  try {
    // In production, serve the actual PDF
    // res.download(resumePath, 'Mithesh_R_Shetty_Resume.pdf');

    // For now, return metadata
    res.json({
      filename: 'Mithesh_R_Shetty_Resume.pdf',
      url: '/resume/mithesh-r-shetty-resume.pdf',
      lastUpdated: '2026-06-01',
      size: '108KB',
    });
  } catch {
    res.status(404).json({ error: 'Resume file not found' });
  }
});

// Resume info
app.get('/api/resume', (req, res) => {
  res.json({
    name: 'Mithesh R Shetty',
    filename: 'Mithesh_R_Shetty_Resume.pdf',
    version: '2026.1',
    lastUpdated: '2026-06-01',
    pages: 1,
    format: 'PDF',
    atsOptimized: true,
    downloadUrl: '/api/resume/download',
  });
});

// Skills endpoint
app.get('/api/skills', (req, res) => {
  res.json({
    languages: ['Java', 'Python', 'C/C++', 'JavaScript', 'TypeScript', 'HTML/CSS'],
    frontend: ['React', 'Next.js', 'Tailwind CSS', 'Three.js'],
    backend: ['Node.js', 'Express.js', 'FastAPI'],
    databases: ['MySQL', 'MongoDB'],
    tools: ['Git', 'GitHub', 'Postman', 'Docker', 'Google Cloud Platform', 'Vercel', 'VS Code'],
  });
});

// ── 404 Handler ──
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.path,
    message: `zsh: route not found: ${req.path}`,
  });
});

// ── Error Handler ──
app.use((err, req, res, _next) => {
  console.error('[ERROR]', err.message);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
  });
});

// ── Start Server ──
app.listen(PORT, () => {
  console.log(`
  ╔═══════════════════════════════════════════╗
  ║   Portfolio API Server — Running           ║
  ║   Port: ${PORT}                              ║
  ║   Env:  ${(process.env.NODE_ENV || 'development').padEnd(12)}                 ║
  ╚═══════════════════════════════════════════╝
  `);
});

module.exports = app;

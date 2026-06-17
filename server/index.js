/**
 * ============================================================
 *  Portfolio Backend — Express.js API Server
 *  Author: Alex Chen
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
    name: 'Alex Chen',
    title: 'Full-Stack Developer & CS Student',
    university: 'IIT Delhi',
    year: '4th Year',
    graduationYear: 2025,
    cgpa: '9.1/10.0',
    email: 'alex.chen@iiitd.ac.in',
    github: 'https://github.com/alexchen-dev',
    linkedin: 'https://linkedin.com/in/alexchen-cs',
    availability: 'Open to Opportunities — May 2025',
  });
});

// Projects endpoint
app.get('/api/projects', (req, res) => {
  const { category, featured } = req.query;

  const projects = [
    {
      id: 'nexus-os',
      name: 'NexusOS',
      category: 'Systems',
      featured: true,
      tech: ['C++', 'Rust', 'POSIX'],
      stars: 142,
      status: 'Active',
    },
    {
      id: 'synapse-ai',
      name: 'Synapse AI',
      category: 'AI/ML',
      featured: true,
      tech: ['Python', 'FastAPI', 'Next.js', 'pgvector'],
      stars: 318,
      status: 'Active',
    },
    {
      id: 'tradestream',
      name: 'TradeStream',
      category: 'Backend',
      featured: true,
      tech: ['Go', 'Kafka', 'Redis'],
      stars: 204,
      status: 'Active',
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
    // res.download(resumePath, 'Alex_Chen_Resume_2025.pdf');

    // For now, return metadata
    res.json({
      filename: 'Alex_Chen_Resume_2025.pdf',
      url: '/resume/alex-chen-resume.pdf',
      lastUpdated: '2025-01-01',
      size: '124KB',
    });
  } catch {
    res.status(404).json({ error: 'Resume file not found' });
  }
});

// Resume info
app.get('/api/resume', (req, res) => {
  res.json({
    name: 'Alex Chen',
    filename: 'Alex_Chen_Resume_2025.pdf',
    version: '2025.1',
    lastUpdated: '2025-01-01',
    pages: 1,
    format: 'PDF',
    atsOptimized: true,
    downloadUrl: '/api/resume/download',
  });
});

// Skills endpoint
app.get('/api/skills', (req, res) => {
  res.json({
    languages: ['TypeScript', 'Python', 'Go', 'C++', 'Java', 'Rust'],
    frontend: ['React', 'Next.js', 'Three.js', 'Tailwind CSS'],
    backend: ['Node.js', 'FastAPI', 'Go/Gin', 'gRPC'],
    databases: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch'],
    tools: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
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

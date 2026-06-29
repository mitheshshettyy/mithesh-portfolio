/**
 * ============================================================
 *  Portfolio Backend — Express.js API Server
 *  Author: Mithesh R Shetty
 *  Stack: Node.js + Express + Nodemailer + Helmet + Rate Limit
 * ============================================================
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// ── Security Middleware ──
app.use(helmet());

app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: false,
}));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ── Request Logging ──
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

// ── Rate Limiting for Contact Endpoint ──
const contactLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 min
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '5', 10),        // 5 submissions per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many messages submitted. Please wait 15 minutes before trying again.',
  },
  skip: (req) => process.env.NODE_ENV === 'development' && req.ip === '::1', // skip in local dev
});

// ── Input Sanitizer ──
function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str
    .trim()
    .replace(/[\u0000-\u001F\u007F]/g, '') // strip control chars
    .substring(0, 5000);
}

// ── Nodemailer Transporter ──
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: false, // STARTTLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: true,
  },
});

// Verify transporter on startup (non-fatal)
transporter.verify((error) => {
  if (error) {
    console.warn('[SMTP] Transporter verification failed:', error.message);
    console.warn('[SMTP] Contact form emails will NOT be sent until SMTP is configured.');
  } else {
    console.log('[SMTP] Transporter ready ✓');
  }
});

// ── Routes ──

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    smtp: !!(process.env.SMTP_USER && process.env.SMTP_PASS),
  });
});

// Portfolio data endpoint
app.get('/api/portfolio', (req, res) => {
  res.json({
    name: process.env.PERSONAL_NAME || 'Mithesh R Shetty',
    title: process.env.PERSONAL_ROLE || 'Full-Stack Developer & CS Student',
    university: process.env.PERSONAL_UNIVERSITY || 'NMAM Institute of Technology, Nitte, Karnataka',
    year: process.env.PERSONAL_YEAR || '4th Year',
    graduationYear: parseInt(process.env.PERSONAL_GRAD_YEAR || '2027', 10),
    cgpa: process.env.PERSONAL_CGPA || '8.78/10.0',
    email: process.env.PERSONAL_EMAIL || 'shettymithesh030@gmail.com',
    github: process.env.PERSONAL_GITHUB || 'https://github.com/mitheshshettyy',
    linkedin: process.env.PERSONAL_LINKEDIN || 'https://linkedin.com/in/mithesh-shetty030',
    availability: process.env.PERSONAL_AVAILABILITY || 'Open to Opportunities — Summer 2027',
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

// ── POST /api/contact ── Real email sending via Nodemailer
app.post('/api/contact', contactLimiter, async (req, res) => {
  // 1. Sanitize
  const name    = sanitize(req.body.name);
  const email   = sanitize(req.body.email);
  const subject = sanitize(req.body.subject);
  const message = sanitize(req.body.message);

  // 2. Server-side validation
  const errors = {};

  if (!name)                  errors.name    = 'Name is required.';
  if (!email)                 errors.email   = 'Email is required.';
  if (!subject)               errors.subject = 'Subject is required.';
  if (!message)               errors.message = 'Message is required.';
  if (message && message.length < 10)
                              errors.message = 'Message must be at least 10 characters.';
  if (message && message.length > 5000)
                              errors.message = 'Message must be under 5000 characters.';

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) errors.email = 'Invalid email address.';

  // Basic spam: reject if name/message contains obvious spam keywords
  const spamPattern = /\b(viagra|casino|crypto|bitcoin|click here|free money|winner|congratulations)\b/i;
  if (spamPattern.test(name) || spamPattern.test(message)) {
    return res.status(400).json({ error: 'Message flagged as spam.' });
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ error: 'Validation failed', fields: errors });
  }

  // 3. Check SMTP is configured
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error('[CONTACT] SMTP credentials not configured — cannot send email.');
    return res.status(503).json({
      error: `Email service is not configured. Please contact me directly at ${process.env.CONTACT_EMAIL || 'my email address'}`,
    });
  }

  // 4. Build and send email
  const submittedAt = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'long',
  });

  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_EMAIL || 'shettymithesh030@gmail.com',
    replyTo: email,
    subject: `New Portfolio Contact - ${subject}`,
    text: [
      '----------------------------------',
      'New Contact Form Submission',
      '----------------------------------',
      '',
      `Name:`,
      name,
      '',
      `Email:`,
      email,
      '',
      `Subject:`,
      subject,
      '',
      `Message:`,
      message,
      '',
      `Submitted at:`,
      submittedAt,
      '',
      '----------------------------------',
    ].join('\n'),
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Courier New', monospace; background: #0a0f1a; color: #e2e8f0; margin: 0; padding: 24px; }
    .card { background: #0d1424; border: 1px solid rgba(0,255,136,0.2); border-radius: 8px; padding: 32px; max-width: 600px; margin: 0 auto; }
    .header { color: #00ff88; font-size: 13px; letter-spacing: 2px; margin-bottom: 24px; border-bottom: 1px solid rgba(0,255,136,0.15); padding-bottom: 16px; }
    .field-label { color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
    .field-value { color: #e2e8f0; font-size: 14px; margin-bottom: 20px; line-height: 1.6; white-space: pre-wrap; }
    .field-value a { color: #00ff88; text-decoration: none; }
    .divider { border: none; border-top: 1px solid rgba(255,255,255,0.06); margin: 8px 0 20px; }
    .footer { color: #475569; font-size: 11px; margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.06); }
    .badge { display: inline-block; background: rgba(0,255,136,0.1); border: 1px solid rgba(0,255,136,0.25); color: #00ff88; border-radius: 4px; padding: 2px 8px; font-size: 11px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">// NEW CONTACT FORM SUBMISSION — PORTFOLIO</div>

    <div class="field-label">$ name</div>
    <div class="field-value">${escapeHtml(name)}</div>
    <hr class="divider">

    <div class="field-label">$ email</div>
    <div class="field-value"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></div>
    <hr class="divider">

    <div class="field-label">$ subject</div>
    <div class="field-value">${escapeHtml(subject)}</div>
    <hr class="divider">

    <div class="field-label">$ message</div>
    <div class="field-value">${escapeHtml(message)}</div>
    <hr class="divider">

    <div class="field-label">$ submitted_at</div>
    <div class="field-value">${submittedAt}</div>

    <div class="footer">
      Reply directly to this email to respond to <span class="badge">${escapeHtml(name)}</span>
    </div>
  </div>
</body>
</html>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[CONTACT] ✓ Email sent — MessageId: ${info.messageId} | From: ${name} <${email}>`);

    return res.status(200).json({
      success: true,
      message: "Message sent successfully! I'll get back to you within 24 hours.",
    });
  } catch (err) {
    console.error('[CONTACT] ✗ Failed to send email:', err.message);
    return res.status(500).json({
      error: `Failed to send your message. Please try again or email me directly at ${process.env.CONTACT_EMAIL || 'my email address'}`,
    });
  }
});

// Resume endpoints
app.get('/api/resume/download', (req, res) => {
  const resumePath = process.env.RESUME_FILE_PATH || path.join(__dirname, '..', 'public', 'resume', 'Mithesh_R_Shetty.pdf');
  try {
    res.json({
      filename: path.basename(resumePath),
      url: process.env.RESUME_PUBLIC_URL || '/resume/Mithesh_R_Shetty.pdf',
      lastUpdated: '2026-06-15',
      size: '108KB',
    });
  } catch {
    res.status(404).json({ error: 'Resume file not found' });
  }
});

app.get('/api/resume', (req, res) => {
  const resumePath = process.env.RESUME_FILE_PATH || 'Mithesh_R_Shetty.pdf';
  res.json({
    name: process.env.PERSONAL_NAME || 'Mithesh R Shetty',
    filename: path.basename(resumePath),
    version: '2026.1',
    lastUpdated: '2026-06-15',
    pages: 1,
    format: 'PDF',
    atsOptimized: true,
    downloadUrl: '/api/resume/download',
  });
});

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

// ── HTML Escape Helper ──
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ── Start Server ──
app.listen(PORT, () => {
  console.log(`
  ╔═══════════════════════════════════════════╗
  ║   Portfolio API Server — Running           ║
  ║   Port: ${PORT}                              ║
  ║   Env:  ${(process.env.NODE_ENV || 'development').padEnd(12)}                 ║
  ║   SMTP: ${(process.env.SMTP_USER ? '✓ configured' : '✗ not set   ').padEnd(12)}             ║
  ╚═══════════════════════════════════════════╝
  `);
});

module.exports = app;

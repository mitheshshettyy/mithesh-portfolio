export const config = {
  resume: {
    path: import.meta.env.VITE_RESUME_PATH || '/resume/Mithesh_R_Shetty.pdf',
    filename: import.meta.env.VITE_RESUME_FILENAME || 'Mithesh_R_Shetty.pdf',
    downloadName: import.meta.env.VITE_RESUME_DOWNLOAD_NAME || 'Mithesh_R_Shetty_Resume.pdf',
    lastUpdated: import.meta.env.VITE_RESUME_LAST_UPDATED || '2026-06-15',
    version: import.meta.env.VITE_RESUME_VERSION || 'v1',
  },
  personal: {
    name: import.meta.env.VITE_PERSONAL_NAME || 'Mithesh R Shetty',
    shortName: import.meta.env.VITE_PERSONAL_SHORT_NAME || 'Mithesh',
    role: import.meta.env.VITE_PERSONAL_ROLE || 'Full-Stack Developer & CS Student',
    tagline: import.meta.env.VITE_PERSONAL_TAGLINE || 'Building robust web applications and interactive experiences.',
    degree: import.meta.env.VITE_PERSONAL_DEGREE || 'B.Tech Computer Science & Engineering',
    university: import.meta.env.VITE_PERSONAL_UNIVERSITY || 'NMAM Institute of Technology, Nitte, Karnataka',
    cgpa: import.meta.env.VITE_PERSONAL_CGPA || '8.78 / 10.0',
    graduationYear: parseInt(import.meta.env.VITE_PERSONAL_GRAD_YEAR || '2027', 10),
    location: import.meta.env.VITE_PERSONAL_LOCATION || 'Udupi, Karnataka, India',
    status: import.meta.env.VITE_PERSONAL_STATUS || '🟢 Available for internships & software engineering roles',
  },
  contact: {
    email: import.meta.env.VITE_CONTACT_EMAIL || 'shettymithesh030@gmail.com',
    github: import.meta.env.VITE_CONTACT_GITHUB || 'https://github.com/mitheshshettyy',
    linkedin: import.meta.env.VITE_CONTACT_LINKEDIN || 'https://linkedin.com/in/mithesh-shetty030',
    portfolioUrl: import.meta.env.VITE_CONTACT_PORTFOLIO_URL || 'http://localhost:5173',
  },
  terminal: {
    user: import.meta.env.VITE_TERMINAL_USER || 'mithesh',
    host: import.meta.env.VITE_TERMINAL_HOST || 'portfolio',
    shell: import.meta.env.VITE_TERMINAL_SHELL || 'zsh',
    theme: import.meta.env.VITE_TERMINAL_THEME || 'NightShell Dark',
    version: import.meta.env.VITE_TERMINAL_VERSION || '5.9',
    installDate: import.meta.env.VITE_TERMINAL_INSTALL_DATE || '2026-06-15T00:00:00',
    defaultCmd: import.meta.env.VITE_TERMINAL_DEFAULT_CMD || 'help',
  },
  neofetch: {
    os: import.meta.env.VITE_NEOFETCH_OS || 'Portfolio OS v2.0.0',
    host: import.meta.env.VITE_NEOFETCH_HOST || 'portfolio.local',
    shell: import.meta.env.VITE_NEOFETCH_SHELL || 'zsh 5.9',
    terminal: import.meta.env.VITE_NEOFETCH_TERMINAL || 'NightShell Client',
    framework: import.meta.env.VITE_NEOFETCH_FRAMEWORK || 'React 19.2.6',
    runtime: import.meta.env.VITE_NEOFETCH_RUNTIME || 'Node.js 22.19.17',
    theme: import.meta.env.VITE_NEOFETCH_THEME || 'NightShell Dark',
  },
  website: {
    title: import.meta.env.VITE_SITE_TITLE || 'Mithesh R Shetty | Developer Portfolio',
    metaDesc: import.meta.env.VITE_SITE_META_DESC || 'Terminal-style developer portfolio of Mithesh R Shetty, Full-Stack Developer & Computer Science Student.',
    keywords: import.meta.env.VITE_SITE_KEYWORDS || 'Mithesh R Shetty, portfolio, terminal, developer, full-stack, react',
    author: import.meta.env.VITE_SITE_AUTHOR || 'Mithesh R Shetty',
    copyright: import.meta.env.VITE_SITE_COPYRIGHT || '© 2026 Mithesh R Shetty',
  },
  backend: {
    apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  }
};

export default config;

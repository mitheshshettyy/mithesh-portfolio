import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import config from '../../config';
import {
  personalInfo,
  commandDocs,
  socialLinks,
} from '../../data/portfolioData';
import MobileCommandBar from './MobileCommandBar';
import WhoAmIBox from './WhoAmIBox';
import NeofetchBox from './NeofetchBox';
import { PORTFOLIO_START_DISPLAY_DATE } from '../../utils/uptime';

// ── Types ──
interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'success' | 'info' | 'section' | 'blank';
  content: string | React.ReactNode;
  timestamp?: string;
  dir?: string;
}

// ── ASCII Art ──
const ASCII_BANNER = `
███╗   ███╗ ██╗ █████╗ ██╗██╗ ████╗ ████╗ ██╗██╗   █████╗    ████╗ ██╗██╗ ████╗ █████╗ █████╗ ██╗ ██╗
████╗ ████║ ██║ ╚═██╔╝ ██║██║ ██╔═╝ ██╔═╝ ██║██║   ██╔═██╗   ██╔═╝ ██║██║ ██╔═╝ ╚═██╔╝ ╚═██╔╝ ╚████╔╝
██╔████╔██║ ██║   ██║  █████║ ████╗ ████╗ █████║   █████╔╝   ████╗ █████║ ████╗   ██║    ██║   ╚██╔╝ 
██║╚██╔╝██║ ██║   ██║  ██╔██║ ██╔═╝ ╚═██║ ██╔██║   ██╔═██╗   ╚═██║ ██╔██║ ██╔═╝   ██║    ██║    ██║  
██║ ╚═╝ ██║ ██║   ██║  ██║██║ ████╗ ████║ ██║██║   ██║ ██║   ████║ ██║██║ ████╗   ██║    ██║    ██║  
╚═╝     ╚═╝ ╚═╝   ╚═╝  ╚═╝╚═╝ ╚═══╝ ╚═══╝ ╚═╝╚═╝   ╚═╝ ╚═╝   ╚═══╝ ╚═╝╚═╝ ╚═══╝   ╚═╝    ╚═╝    ╚═╝  
`;

// ── Virtual Filesystem Data ──
const VIRTUAL_FS: Record<string, { dirs: string[]; files: Record<string, string> }> = {
  '~': {
    dirs: ['about', 'education', 'skills', 'projects', 'experience', 'contact', 'resume'],
    files: {
      'about.txt': 'aboutData',
      'skills.txt': 'skillsData',
      'resume.txt': 'resumeData',
      'projects.txt': 'projectsData',
      'experience.txt': 'experienceData'
    }
  },
  '~/about': {
    dirs: [],
    files: { 'about.txt': 'aboutData' }
  },
  '~/education': {
    dirs: [],
    files: {}
  },
  '~/skills': {
    dirs: [],
    files: { 'skills.txt': 'skillsData' }
  },
  '~/projects': {
    dirs: [],
    files: { 'projects.txt': 'projectsData' }
  },
  '~/experience': {
    dirs: [],
    files: { 'experience.txt': 'experienceData' }
  },
  '~/contact': {
    dirs: [],
    files: {}
  },
  '~/resume': {
    dirs: [],
    files: { 'resume.txt': 'resumeData' }
  }
};

const FILE_CONTENTS: Record<string, string> = {
  get aboutData() {
    return `--- ABOUT ME ---
Name: ${config.personal.name}
Role: ${config.personal.role}

Summary:
I'm a Computer Science & Engineering student at ${config.personal.university} with a strong foundation in full-stack web development. I specialize in building web applications with React, Next.js, and Node.js, database optimization with MongoDB, and creating interactive user experiences with Three.js.

Philosophy:
I believe great software is born at the intersection of clean database architecture, structured backend APIs, and responsive user interfaces.`;
  },
  
  skillsData: `--- SKILLS ---
Languages: C++, Java, Python, JavaScript, TypeScript
Frontend:  React, Next.js, Tailwind CSS, Three.js
Backend:   Node.js, Express.js, REST APIs
Databases: MongoDB, MySQL, PostgreSQL
Developer Ecosystem: Git & GitHub, Postman, VS Code, Vercel, Docker, Linux
CS Fundamentals:     Data Structures & Algorithms, Operating Systems, DBMS, Computer Networks, Compiler Design`,

  get resumeData() {
    return `--- RESUME ---
Name: ${config.personal.name}
Email: ${config.contact.email}
GitHub: ${config.contact.github.replace('https://', '')}
LinkedIn: ${config.contact.linkedin.replace('https://', '')}

Education:
- ${config.personal.university.split(',')[0]} (B.Tech CSE, CGPA: ${config.personal.cgpa.replace(/\s+/g, '')})
- Vidyodaya Pre-University College (Pre-University: 94.5%)

Experience:
- Full Stack Development Intern at ALGOORBIT Innovations (MERN stack)`;
  },

  projectsData: `--- PROJECTS ---
1. Complexify: AI-powered Python code complexity classifier (Python, FastAPI, Scikit-learn) - 12 stars
2. NextResume: Live preview resume builder (Next.js, React, Node.js, NextAuth.js) - 18 stars
3. Virtual Garden: 3D interactive medicinal plant platform (Next.js, MongoDB, Three.js) - 25 stars`,

  experienceData: `--- EXPERIENCE ---
- Full Stack Development Intern @ ALGOORBIT Innovations (Nov 2025 - Jan 2026)`
};

// Helper for syntax highlighting
function renderSyntaxHighlightedCommand(command: string) {
  const parts = command.trim().split(/\s+/);
  const cmd = parts[0];
  const rest = parts.slice(1);

  const isCommandValid = [
    'help', 'about', 'education', 'skills', 'projects', 'experience', 'contact', 'resume', 
    'whoami', 'pwd', 'ls', 'cd', 'tree', 'clear', 'date', 'time', 'history', 'echo', 'cat', 
    'neofetch', 'github', 'linkedin', 'email', 'theme', 'open', 'download'
  ].includes(cmd.toLowerCase());

  const cmdColor = isCommandValid ? 'var(--terminal-green)' : 'var(--terminal-red)';

  return (
    <span>
      <span style={{ color: cmdColor, fontWeight: 'bold' }}>{cmd}</span>
      {rest.length > 0 && ' '}
      {rest.map((word, idx) => {
        if (word.startsWith('-')) {
          return <span key={idx} style={{ color: 'var(--terminal-yellow)' }}>{word}{idx < rest.length - 1 ? ' ' : ''}</span>;
        }
        return <span key={idx} style={{ color: 'var(--text-secondary)' }}>{word}{idx < rest.length - 1 ? ' ' : ''}</span>;
      })}
    </span>
  );
}

// ── Command processor ──
function useCommandProcessor(
  navigate: ReturnType<typeof useNavigate>,
  currentDir: string,
  setCurrentDir: (dir: string) => void,
  history: string[]
) {
  const processCommand = useCallback((rawInput: string): TerminalLine[] => {
    const input = rawInput.trim();
    const [cmd, ...args] = input.split(/\s+/);
    const command = cmd.toLowerCase();
    const argStr = args.join(' ');
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });

    const line = (type: TerminalLine['type'], content: string | React.ReactNode, id?: string): TerminalLine => ({
      id: id || `${Date.now()}-${Math.random()}`,
      type,
      content,
      timestamp,
      dir: currentDir,
    });
    const blank = (): TerminalLine => line('blank', '');

    switch (command) {
      case 'help':
        return [
          line('section', '╔═══════════════════════════════════════════════════════╗'),
          line('section', '║              AVAILABLE COMMANDS                       ║'),
          line('section', '╚═══════════════════════════════════════════════════════╝'),
          blank(),
          line('info', '  NAVIGATION'),
          line('output', '  about          → Navigate to About Me page'),
          line('output', '  education      → Navigate to Education page'),
          line('output', '  skills         → Navigate to Skills page'),
          line('output', '  projects       → Navigate to Projects page'),
          line('output', '  experience     → Navigate to Experience page'),
          line('output', '  contact        → Navigate to Contact page'),
          line('output', '  resume         → Open/download resume PDF'),
          blank(),
          line('info', '  FILESYSTEM & UTILITIES'),
          line('output', '  cd <dir>       → Change directory (e.g. cd about, cd ..)'),
          line('output', '  ls             → List files and directories here'),
          line('output', '  tree           → Display filesystem tree'),
          line('output', '  cat <file>     → View file contents (e.g. cat about.txt)'),
          line('output', '  pwd            → Print working directory path'),
          line('output', '  history        → View typed command history'),
          blank(),
          line('info', '  IDENTITY & SYSTEM'),
          line('output', '  whoami         → Display identity summary'),
          line('output', '  neofetch       → Display system & stack info'),
          line('output', '  date / time    → Display current date / time'),
          line('output', '  uptime         → Portfolio uptime'),
          line('output', '  clear          → Clear terminal'),
          line('output', '  echo <msg>     → Print a message'),
          blank(),
          line('info', '  SOCIAL & ACTIONS'),
          line('output', '  github         → Open GitHub profile'),
          line('output', '  linkedin       → Open LinkedIn profile'),
          line('output', '  email          → View email address'),
          line('output', '  download resume → Download resume PDF directly'),
          line('output', '  open resume    → Open resume in a new tab'),
          blank(),
          line('success', '  SHORTCUT: Ctrl+` → Return to terminal from any page'),
          blank(),
        ];

      case 'about':
        setTimeout(() => navigate('/about'), 400);
        return [
          line('success', '▶ Loading About Me...'),
          line('output', '  Navigating to /about — please wait'),
        ];

      case 'education':
        setTimeout(() => navigate('/education'), 400);
        return [
          line('success', '▶ Loading Education...'),
          line('output', '  Navigating to /education — please wait'),
        ];

      case 'skills':
        setTimeout(() => navigate('/skills'), 400);
        return [
          line('success', '▶ Loading Skills...'),
          line('output', '  Navigating to /skills — please wait'),
        ];

      case 'projects':
        setTimeout(() => navigate('/projects'), 400);
        return [
          line('success', '▶ Loading Projects...'),
          line('output', '  Navigating to /projects — please wait'),
        ];

      case 'experience':
        setTimeout(() => navigate('/experience'), 400);
        return [
          line('success', '▶ Loading Experience...'),
          line('output', '  Navigating to /experience — please wait'),
        ];

      case 'contact':
        setTimeout(() => navigate('/contact'), 400);
        return [
          line('success', '▶ Loading Contact...'),
          line('output', '  Navigating to /contact — please wait'),
        ];

      case 'resume':
        setTimeout(() => navigate('/resume'), 400);
        return [
          line('success', '▶ Loading Resume section...'),
          line('output', '  Navigating to /resume — please wait'),
        ];

      case 'open':
        if (args[0]?.toLowerCase() === 'resume') {
          setTimeout(() => navigate('/resume'), 400);
          return [
            line('success', '▶ Opening resume...'),
            line('output', '  Navigating to /resume — please wait'),
          ];
        }
        return [line('error', `open: unknown target '${args[0] || ''}'`)];

      case 'download':
        if (args[0]?.toLowerCase() === 'resume') {
          const link = document.createElement('a');
          link.href = personalInfo.resumeUrl;
          link.download = config.resume.downloadName;
          link.click();
          return [line('success', '▶ Downloading resume PDF...')];
        }
        return [line('error', `download: unknown target '${args[0] || ''}'`)];

      case 'whoami':
        return [
          blank(),
          line('output', <WhoAmIBox />),
          blank(),
        ];

      case 'date':
        return [
          line('output', `  ${new Date().toLocaleDateString('en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
          })}`),
        ];

      case 'time':
        return [
          line('output', `  ${new Date().toLocaleTimeString('en-US', { hour12: true })} (${Intl.DateTimeFormat().resolvedOptions().timeZone})`),
        ];

      case 'pwd':
        return [
          line('output', `/home/${config.terminal.user}/portfolio${currentDir === '~' ? '' : currentDir.substring(1)}`),
          line('info', `  Shell: ${personalInfo.shell} — ${personalInfo.version}`),
        ];

      case 'cd': {
        const target = args[0];
        if (!target || target === '~') {
          setCurrentDir('~');
          return [line('success', 'Moved to ~')];
        }
        if (target === '..') {
          if (currentDir === '~') {
            return [line('info', 'Already in root directory')];
          }
          setCurrentDir('~');
          return [line('success', 'Moved to ~')];
        }
        const currentFolder = VIRTUAL_FS[currentDir];
        if (currentFolder.dirs.includes(target.toLowerCase())) {
          setCurrentDir(`~/${target.toLowerCase()}`);
          return [line('success', `Moved to ~/${target.toLowerCase()}`)];
        }
        return [line('error', `cd: no such file or directory: ${target}`)];
      }

      case 'ls': {
        const currentFolder = VIRTUAL_FS[currentDir];
        if (!currentFolder) return [line('error', 'ls: error reading directory')];
        const outputLines: TerminalLine[] = [];
        
        if (currentFolder.dirs.length > 0) {
          outputLines.push(line('info', '  Directories:'));
          currentFolder.dirs.forEach(d => {
            outputLines.push(line('info', `    ${d}/`));
          });
        }
        
        const filesKeys = Object.keys(currentFolder.files);
        if (filesKeys.length > 0) {
          if (outputLines.length > 0) outputLines.push(blank());
          outputLines.push(line('output', '  Files:'));
          filesKeys.forEach(f => {
            outputLines.push(line('output', `    ${f}`));
          });
        }
        
        if (outputLines.length === 0) {
          return [line('output', '  [empty directory]')];
        }
        return outputLines;
      }

      case 'tree':
        return [
          line('info', '.'),
          line('info', '├── about/'),
          line('output', '│   └── about.txt'),
          line('info', '├── education/'),
          line('info', '├── skills/'),
          line('output', '│   └── skills.txt'),
          line('info', '├── projects/'),
          line('output', '│   └── projects.txt'),
          line('info', '├── experience/'),
          line('output', '│   └── experience.txt'),
          line('info', '├── contact/'),
          line('info', '└── resume/'),
          line('output', '    └── resume.txt'),
        ];

      case 'cat': {
        const filename = args[0];
        if (!filename) return [line('error', 'Usage: cat <filename>')];
        
        const currentFolder = VIRTUAL_FS[currentDir];
        const fileKey = currentFolder.files[filename.toLowerCase()];
        
        if (fileKey) {
          const content = FILE_CONTENTS[fileKey];
          const linesOutput = content.split('\n').map(l => line('output', `  ${l}`));
          const pageName = filename.split('.')[0];
          linesOutput.push(blank());
          linesOutput.push(line('success', `  [Tip] Type '${pageName}' to navigate to the visual page.`));
          return linesOutput;
        }
        
        return [
          line('error', `cat: ${filename}: No such file or directory`),
          line('info', `Available files here: ${Object.keys(currentFolder.files).join(', ') || 'none'}`),
        ];
      }

      case 'history': {
        if (history.length === 0) return [line('output', '  No commands in history')];
        return history.slice().reverse().map((cmd, idx) => line('output', `  ${idx + 1}  ${cmd}`));
      }

      case 'clear':
        return [{ id: 'CLEAR', type: 'blank', content: '__CLEAR__', dir: currentDir }];

      case 'social':
        return [
          blank(),
          line('section', '  ── SOCIAL LINKS ───────────────────────────────────────'),
          line('success', `  GitHub    → ${socialLinks.github.url}`),
          line('info', `  LinkedIn  → ${socialLinks.linkedin.url}`),
          line('output', `  Twitter   → ${socialLinks.twitter.url}`),
          line('output', `  Email     → ${socialLinks.email.handle}`),
          blank(),
        ];

      case 'github':
        window.open(socialLinks.github.url, '_blank');
        return [
          line('success', `  Opening GitHub: ${socialLinks.github.url}`),
          line('info', `  Handle: ${socialLinks.github.handle}`),
        ];

      case 'linkedin':
        window.open(socialLinks.linkedin.url, '_blank');
        return [
          line('success', `  Opening LinkedIn: ${socialLinks.linkedin.url}`),
          line('info', `  Handle: ${socialLinks.linkedin.handle}`),
        ];

      case 'email':
        return [
          line('output', `  Email: ${personalInfo.email}`),
          line('info', `  → mailto:${personalInfo.email}`),
        ];

      case 'status':
        return [
          blank(),
          line('success', `  ${personalInfo.status}`),
          blank(),
          line('output', `  Role target : Full-Stack Engineer / SDE`),
          line('output', `  Availability: May 2025 onwards`),
          line('output', `  Preferred   : Full-time, Hybrid or Remote`),
          line('output', `  Open to     : Early-stage startups, Big Tech, Research`),
          blank(),
        ];

      case 'theme':
        return [
          blank(),
          line('section', '  ── TERMINAL THEME ──────────────────────────────────────'),
          line('output', `  Name     : ${config.terminal.theme}`),
          line('output', `  Palette  : Near-black bg, Terminal Green, Electric Cyan`),
          line('output', `  Font     : JetBrains Mono, Fira Code`),
          line('output', `  Shell    : ${config.terminal.shell} ${config.terminal.version}`),
          line('output', `  Icons    : Nerd Fonts patched`),
          line('success', `  Accent   : #00ff88 (terminal green)`),
          line('info', `  Accent2  : #00d4ff (electric cyan)`),
          blank(),
        ];

      case 'ascii':
        return [
          line('success', ASCII_BANNER),
          line('output', `  ${personalInfo.title}`),
          blank(),
        ];

      case 'uptime':
        return [
          line('output', `  Portfolio uptime: ${personalInfo.uptime}`),
          line('info', `  Started: ${PORTFOLIO_START_DISPLAY_DATE}`),
          line('success', `  Status: RUNNING ●`),
        ];

      case 'intro':
        return [
          blank(),
          line('section', `  ┌─── INTRO SEQUENCE ────────────────────────────────────`),
          line('success', `  │  Hi, I'm ${personalInfo.name} 👋`),
          line('info', `  │  ${personalInfo.title}`),
          line('output', `  │  ${personalInfo.tagline}`),
          line('output', `  │`),
          line('output', `  │  → Type 'help' to see what I can do`),
          line('output', `  │  → Type 'ls' to explore sections`),
          line('output', `  │  → Type 'whoami' to learn more about me`),
          line('section', `  └───────────────────────────────────────────────────────`),
          blank(),
        ];

      case 'neofetch':
        return [
          blank(),
          line('output', <NeofetchBox />),
          blank(),
        ];

      case 'echo':
        if (!argStr) return [line('output', '')];
        return [line('output', `  ${argStr}`)];

      case 'matrix':
        return [
          line('success', '  ENTERING THE MATRIX...'),
          line('output', '  01001000 01100101 01101100 01101100 01101111'),
          line('info', '  Follow the white rabbit 🐇'),
        ];

      case '':
        return [];

      default:
        return [
          line('error', `  zsh: command not found: ${command}`),
          line('info', `  Did you mean one of: ${Object.keys(commandDocs).slice(0, 4).join(', ')}?`),
          line('output', `  Type 'help' for available commands`),
        ];
    }
  }, [navigate, currentDir, setCurrentDir, history]);

  return { processCommand };
}


// ── Main Terminal Component ──
export default function Terminal() {
  const navigate = useNavigate();
  const [currentDir, setCurrentDir] = useState('~');
  
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [bootDone, setBootDone] = useState(false);

  const { processCommand } = useCommandProcessor(navigate, currentDir, setCurrentDir, history);

  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const allCommands = Object.keys(commandDocs);

  // Boot sequence
  useEffect(() => {
    const bootLines: { type: TerminalLine['type']; content: string; delay: number }[] = [
      { type: 'section', content: ASCII_BANNER, delay: 100 },
      { type: 'info', content: `  ${personalInfo.title}`, delay: 800 },
      { type: 'output', content: `  ${personalInfo.university} | ${personalInfo.year} | Graduating ${personalInfo.graduationYear}`, delay: 1000 },
      { type: 'blank', content: '', delay: 1200 },
      { type: 'success', content: `  ● ${personalInfo.status}`, delay: 1400 },
      { type: 'blank', content: '', delay: 1600 },
      { type: 'output', content: `  Shell: ${config.terminal.shell} ${config.terminal.version}  |  Theme: ${config.terminal.theme}  |  Location: ${personalInfo.location}`, delay: 1700 },
      { type: 'output', content: `  Last login: ${new Date().toLocaleString()}`, delay: 1900 },
      { type: 'blank', content: '', delay: 2100 },
      { type: 'info', content: `  Type 'help' to see available commands.`, delay: 2200 },
      { type: 'output', content: `  Type 'ls' to list sections  |  Type 'whoami' for my profile`, delay: 2400 },
      { type: 'blank', content: '', delay: 2600 },
    ];

    const timers: number[] = [];

    bootLines.forEach(({ type, content, delay }) => {
      const timer = window.setTimeout(() => {
        setLines(prev => [...prev, { id: `boot-${delay}`, type, content, dir: '~' }]);
      }, delay);
      timers.push(timer);
    });

    const doneTimer = window.setTimeout(() => {
      setBootDone(true);
      inputRef.current?.focus();
    }, 2800);
    timers.push(doneTimer);

    // GSAP entrance
    if (containerRef.current) {
      gsap.fromTo(containerRef.current,
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 }
      );
    }

    return () => {
      timers.forEach(t => clearTimeout(t));
    };
  }, []);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  // Input change + suggestions
  const handleInputChange = (val: string) => {
    setInput(val);
    setHistoryIndex(-1);
    if (val.length > 0) {
      const parts = val.toLowerCase().split(/\s+/);
      const cmdPart = parts[0];
      const matches = allCommands.filter(cmd => cmd.startsWith(cmdPart));
      setSuggestions(matches.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  // Submit command
  const submitCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    // Add input line
    const inputLine: TerminalLine = {
      id: `input-${Date.now()}`,
      type: 'input',
      content: trimmed,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      dir: currentDir,
    };

    // Add to history
    setHistory(prev => [trimmed, ...prev.slice(0, 49)]);
    setHistoryIndex(-1);

    const result = processCommand(trimmed);

    if (result.length === 1 && result[0].content === '__CLEAR__') {
      setLines([]);
    } else {
      setLines(prev => [...prev, inputLine, ...result]);
    }

    setInput('');
    setSuggestions([]);
  };

  // Keyboard handler
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submitCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIdx = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(newIdx);
      setInput(history[newIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIdx = Math.max(historyIndex - 1, -1);
      setHistoryIndex(newIdx);
      setInput(newIdx === -1 ? '' : history[newIdx] || '');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setInput(suggestions[0]);
        setSuggestions([]);
      }
    } else if (e.key === 'c' && e.ctrlKey) {
      setInput('');
      setSuggestions([]);
      setLines(prev => [...prev, {
        id: `cancel-${Date.now()}`,
        type: 'error',
        content: `^C`,
        dir: currentDir,
      }]);
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  // Click anywhere to focus
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  // Line renderer
  const renderLine = (line: TerminalLine) => {
    const colorMap: Record<TerminalLine['type'], string> = {
      input: 'var(--text-primary)',
      output: 'var(--text-secondary)',
      error: 'var(--terminal-red)',
      success: 'var(--terminal-green)',
      info: 'var(--terminal-cyan)',
      section: 'var(--terminal-green)',
      blank: 'transparent',
    };

    if (line.content === '' || line.type === 'blank') return <div key={line.id} className="h-2" />;

    if (typeof line.content === 'object' && line.content !== null) {
      return (
        <div
          key={line.id}
          className="terminal-line-enter flex items-start gap-2 leading-relaxed w-full"
        >
          {line.content}
        </div>
      );
    }

    const isBanner = line.content === ASCII_BANNER;

    if (isBanner) {
      return (
        <div
          key={line.id}
          className="terminal-line-enter flex justify-center w-full"
          style={{ color: colorMap[line.type] }}
        >
          <pre
            className="terminal-banner-text flex-grow-0"
            style={{
              fontFamily: 'var(--font-mono)',
              lineHeight: '1.25',
              whiteSpace: 'pre',
              margin: '0 auto',
            }}
          >
            {line.content}
          </pre>
        </div>
      );
    }

    return (
      <div
        key={line.id}
        className="terminal-line-enter flex items-start gap-2 leading-relaxed"
        style={{ color: colorMap[line.type] }}
      >
        {line.type === 'input' && (
          <span className="shrink-0 select-none" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
            <span style={{ color: 'var(--terminal-green)' }}>{personalInfo.prompt}</span>
            <span style={{ color: 'var(--text-muted)' }}>:</span>
            <span style={{ color: 'var(--terminal-cyan)' }}>{line.dir || '~'}</span>
            <span style={{ color: 'var(--text-muted)' }}>$</span>
          </span>
        )}
        {line.type === 'input' && typeof line.content === 'string' ? (
          <pre
            className="whitespace-pre-wrap break-words flex-1"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', lineHeight: '1.55' }}
          >
            {renderSyntaxHighlightedCommand(line.content)}
          </pre>
        ) : (
          <pre
            className="whitespace-pre-wrap break-words flex-1"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', lineHeight: '1.55' }}
          >
            {line.content}
          </pre>
        )}
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className="w-full flex-grow flex flex-col min-h-0"
      style={{
        background: 'rgba(8, 12, 24, 0.92)',
        border: '1px solid rgba(0, 255, 136, 0.15)',
        borderRadius: '10px',
        boxShadow: '0 0 60px rgba(0, 255, 136, 0.05), 0 20px 80px rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(10px)',
        overflow: 'hidden',
      }}
    >
      {/* Terminal Title Bar */}
      <div
        className="flex items-center gap-3 px-4 py-3 shrink-0"
        style={{
          background: 'rgba(0, 0, 0, 0.4)',
          borderBottom: '1px solid rgba(0, 255, 136, 0.1)',
        }}
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
        </div>
        <div
          className="flex-1 text-center text-xs select-none"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
        >
          {personalInfo.prompt} — {config.terminal.shell} — 120×40
        </div>
        <div
          className="text-xs tabular-nums"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-green)', opacity: 0.6 }}
        >
          {new Date().toLocaleTimeString('en-US', { hour12: false })}
        </div>
      </div>

      {/* Terminal Output */}
      <div
        ref={terminalRef}
        className="flex-1 overflow-y-auto px-4 py-4 cursor-text terminal-scroll"
        onClick={handleTerminalClick}
        style={{ minHeight: 0 }}
      >
        {lines.map(renderLine)}

        {/* Current Input Line */}
        {bootDone && (
          <div className="flex items-center gap-2 mt-1">
            <span className="shrink-0 select-none" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
              <span style={{ color: 'var(--terminal-green)' }}>{personalInfo.prompt}</span>
              <span style={{ color: 'var(--text-muted)' }}>:</span>
              <span style={{ color: 'var(--terminal-cyan)' }}>{currentDir}</span>
              <span style={{ color: 'var(--text-muted)' }}>$</span>
            </span>
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyDown={handleKeyDown}
                className="terminal-input text-sm w-full"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                aria-label="Terminal input"
              />
              {/* Autocomplete suggestions */}
              {suggestions.length > 0 && (
                <div
                  className="absolute left-0 bottom-full mb-1 z-10"
                  style={{
                    background: 'rgba(8, 12, 24, 0.98)',
                    border: '1px solid rgba(0, 255, 136, 0.2)',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                  }}
                >
                  {suggestions.map((sug, i) => (
                    <button
                      key={sug}
                      className="block w-full text-left px-3 py-1.5 text-xs transition-colors"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        color: i === 0 ? 'var(--terminal-green)' : 'var(--text-secondary)',
                        background: i === 0 ? 'rgba(0, 255, 136, 0.08)' : 'transparent',
                      }}
                      onClick={() => {
                        setInput(sug);
                        setSuggestions([]);
                        inputRef.current?.focus();
                      }}
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Mobile Quick Command Bar */}
      <MobileCommandBar onCommand={(cmd) => submitCommand(cmd)} />

      {/* Status Bar */}
      <div
        className="flex items-center justify-between px-4 py-1.5 shrink-0 text-xs"
        style={{
          fontFamily: 'var(--font-mono)',
          background: 'rgba(0, 255, 136, 0.06)',
          borderTop: '1px solid rgba(0, 255, 136, 0.1)',
          color: 'var(--text-muted)',
        }}
      >
        <div className="flex items-center gap-3">
          <span style={{ color: 'var(--terminal-green)' }}>● NORMAL</span>
          <span>{config.terminal.shell} {config.terminal.version}</span>
          <span>{config.terminal.theme.split(' ')[0]}</span>
        </div>
        <div className="flex items-center gap-3">
          <span>↑/↓ history</span>
          <span>TAB autocomplete</span>
          <span style={{ color: 'var(--terminal-cyan)' }}>help</span>
        </div>
      </div>
    </div>
  );
}

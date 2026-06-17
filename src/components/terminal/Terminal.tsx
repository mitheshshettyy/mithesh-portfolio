import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import {
  personalInfo,
  commandDocs,
  skillsData,
  socialLinks,
  projectsData,
} from '../../data/portfolioData';
import MobileCommandBar from './MobileCommandBar';

// ── Types ──
interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'success' | 'info' | 'section' | 'blank';
  content: string | React.ReactNode;
  timestamp?: string;
}

// ── ASCII Art ──
const ASCII_BANNER = `
 █████╗ ██╗     ███████╗██╗  ██╗     ██████╗██╗  ██╗███████╗███╗   ██╗
██╔══██╗██║     ██╔════╝╚██╗██╔╝    ██╔════╝██║  ██║██╔════╝████╗  ██║
███████║██║     █████╗   ╚███╔╝     ██║     ███████║█████╗  ██╔██╗ ██║
██╔══██║██║     ██╔══╝   ██╔██╗     ██║     ██╔══██║██╔══╝  ██║╚██╗██║
██║  ██║███████╗███████╗██╔╝ ██╗    ╚██████╗██║  ██║███████╗██║ ╚████║
╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝     ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝
`;

// ── Command processor ──
function useCommandProcessor(navigate: ReturnType<typeof useNavigate>) {
  const processCommand = useCallback((rawInput: string): TerminalLine[] => {
    const input = rawInput.trim();
    const [cmd, ...args] = input.split(' ');
    const command = cmd.toLowerCase();
    const argStr = args.join(' ');
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });

    const line = (type: TerminalLine['type'], content: string | React.ReactNode, id?: string): TerminalLine => ({
      id: id || `${Date.now()}-${Math.random()}`,
      type,
      content,
      timestamp,
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
          line('output', '  about         → Navigate to About Me page'),
          line('output', '  education      → Navigate to Education page'),
          line('output', '  skills         → Navigate to Skills page'),
          line('output', '  projects       → Navigate to Projects page'),
          line('output', '  experience     → Navigate to Experience page'),
          line('output', '  contact        → Navigate to Contact page'),
          line('output', '  resume         → Open/download resume PDF'),
          blank(),
          line('info', '  IDENTITY'),
          line('output', '  whoami         → Display identity summary'),
          line('output', '  ascii          → Display ASCII banner'),
          line('output', '  neofetch       → Display system info'),
          line('output', '  intro          → Replay intro sequence'),
          line('output', '  status         → Availability status'),
          blank(),
          line('info', '  SYSTEM'),
          line('output', '  date           → Current date'),
          line('output', '  time           → Current time'),
          line('output', '  pwd            → Working directory'),
          line('output', '  ls             → List sections'),
          line('output', '  uptime         → Portfolio uptime'),
          line('output', '  clear          → Clear terminal'),
          line('output', '  echo <msg>     → Print message'),
          blank(),
          line('info', '  FILES'),
          line('output', '  cat about.txt  → Read about section'),
          line('output', '  cat skills.txt → Read skills'),
          line('output', '  cat resume.txt → Read resume info'),
          line('output', '  open resume    → Download resume PDF'),
          blank(),
          line('info', '  SOCIAL'),
          line('output', '  social         → All social links'),
          line('output', '  github         → GitHub profile'),
          line('output', '  linkedin       → LinkedIn profile'),
          line('output', '  email          → Email address'),
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
      case 'open resume':
        return [
          line('success', '▶ Resume accessed'),
          line('output', `  Filename: alex-chen-resume-2025.pdf`),
          line('output', `  Route:    /resume`),
          line('output', `  Download: /api/resume/download`),
          blank(),
          line('info', '  → Navigating to resume section...'),
        ];

      case 'whoami':
        return [
          blank(),
          line('section', `  ┌─── IDENTITY ──────────────────────────────────────┐`),
          line('output', `  │ Name       : ${personalInfo.name}`),
          line('output', `  │ Role       : ${personalInfo.title}`),
          line('output', `  │ Degree     : ${personalInfo.degree}`),
          line('output', `  │ University : ${personalInfo.university}`),
          line('output', `  │ Year       : ${personalInfo.year} — Graduating ${personalInfo.graduationYear}`),
          line('output', `  │ CGPA       : ${personalInfo.cgpa}`),
          line('output', `  │ Location   : ${personalInfo.location}`),
          line('section', `  └────────────────────────────────────────────────────┘`),
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
          line('output', `/home/alex/portfolio`),
          line('info', `  Shell: ${personalInfo.shell} — ${personalInfo.version}`),
        ];

      case 'ls':
        return [
          blank(),
          line('info', '  drwxr-xr-x  portfolio/'),
          line('output', '  ├── about/          About Me'),
          line('output', '  ├── education/      Academic Background'),
          line('output', '  ├── skills/         Technical Skills'),
          line('output', '  ├── projects/       Projects Gallery'),
          line('output', '  ├── experience/     Work & Research'),
          line('output', '  ├── contact/        Get In Touch'),
          line('output', '  ├── resume/         CV & Downloads'),
          line('output', '  └── blog/           [coming soon]'),
          blank(),
          line('info', '  Type any section name to navigate'),
          blank(),
        ];

      case 'clear':
        return [{ id: 'CLEAR', type: 'blank', content: '__CLEAR__' }];

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
          line('output', `  Name     : NightShell Dark`),
          line('output', `  Palette  : Near-black bg, Terminal Green, Electric Cyan`),
          line('output', `  Font     : JetBrains Mono, Fira Code`),
          line('output', `  Shell    : zsh 5.9`),
          line('output', `  Icons    : Nerd Fonts patched`),
          line('success', `  Accent   : #00ff88 (terminal green)`),
          line('info', `  Accent2  : #00d4ff (electric cyan)`),
          blank(),
        ];

      case 'ascii':
        return [
          line('success', ASCII_BANNER),
          line('output', `  ${personalInfo.name} — ${personalInfo.title}`),
          blank(),
        ];

      case 'uptime':
        return [
          line('output', `  Portfolio uptime: ${personalInfo.uptime}`),
          line('info', `  Started: September 2021`),
          line('success', `  Status: RUNNING 🟢`),
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
          line('section', `              ${personalInfo.name}`),
          line('output', `  ─────────────────────────────`),
          line('info', `  OS     : Portfolio OS v1.0.0`),
          line('output', `  Shell  : ${personalInfo.shell} ${personalInfo.version}`),
          line('output', `  WM     : React + GSAP`),
          line('output', `  Font   : JetBrains Mono`),
          line('output', `  Theme  : NightShell Dark`),
          line('output', `  Stack  : TypeScript, Node.js, Go`),
          line('success', `  CGPA   : ${personalInfo.cgpa}`),
          line('info', `  Github : ${socialLinks.github.handle}`),
          line('output', `  Email  : ${personalInfo.email}`),
          blank(),
        ];

      case 'echo':
        if (!argStr) return [line('error', '  Usage: echo <message>')];
        return [line('output', `  ${argStr}`)];

      case 'cat': {
        const filename = args[0]?.toLowerCase();
        if (!filename) return [line('error', '  Usage: cat <filename>.txt')];
        if (filename === 'about.txt') {
          setTimeout(() => navigate('/about'), 600);
          return [
            line('output', `  Reading about.txt...`),
            line('success', `  Rendering About section → navigating`),
          ];
        }
        if (filename === 'skills.txt') {
          const topSkills = skillsData.languages.slice(0, 5).map(s => s.name).join(', ');
          return [
            line('output', `  Reading skills.txt...`),
            blank(),
            line('info', `  Top Languages: ${topSkills}`),
            line('output', `  Frontend: React, Next.js, Three.js, Tailwind`),
            line('output', `  Backend:  Node.js, FastAPI, Go/Gin, gRPC`),
            line('output', `  Tools:    Docker, K8s, AWS, CI/CD`),
            blank(),
            line('info', `  → Type 'skills' for the full breakdown`),
          ];
        }
        if (filename === 'resume.txt') {
          return [
            line('output', `  Reading resume.txt...`),
            blank(),
            line('info', `  Name: ${personalInfo.name}`),
            line('output', `  Title: ${personalInfo.title}`),
            line('output', `  University: ${personalInfo.university}`),
            line('output', `  CGPA: ${personalInfo.cgpa}`),
            blank(),
            line('success', `  → Type 'resume' to view full PDF`),
          ];
        }
        if (filename === 'projects.txt') {
          const featured = projectsData.filter(p => p.featured).map(p => p.name).join(', ');
          return [
            line('output', `  Reading projects.txt...`),
            blank(),
            line('info', `  Featured: ${featured}`),
            line('output', `  Total projects: ${projectsData.length}+`),
            blank(),
            line('success', `  → Type 'projects' to explore all`),
          ];
        }
        return [
          line('error', `  cat: ${filename}: No such file or directory`),
          line('info', `  Available: about.txt, skills.txt, resume.txt, projects.txt`),
        ];
      }

      case 'open': {
        const resource = args[0]?.toLowerCase();
        if (resource === 'resume') {
          setTimeout(() => navigate('/resume'), 400);
          return [
            line('success', `  Opening resume...`),
            line('output', `  File: alex-chen-resume-2025.pdf`),
          ];
        }
        return [line('error', `  open: ${resource || '?'}: Unknown resource`)];
      }

      case 'exit':
      case 'terminal':
        setTimeout(() => navigate('/'), 300);
        return [
          line('info', '  Returning to terminal home...'),
        ];

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
  }, [navigate]);

  return { processCommand };
}

// ── Main Terminal Component ──
export default function Terminal() {
  const navigate = useNavigate();
  const { processCommand } = useCommandProcessor(navigate);

  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [bootDone, setBootDone] = useState(false);

  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const allCommands = Object.keys(commandDocs);

  // Boot sequence
  useEffect(() => {
    const bootLines: { type: TerminalLine['type']; content: string; delay: number }[] = [
      { type: 'section', content: ASCII_BANNER, delay: 100 },
      { type: 'info', content: `  ${personalInfo.name} — ${personalInfo.title}`, delay: 800 },
      { type: 'output', content: `  ${personalInfo.university} | ${personalInfo.year} | Graduating ${personalInfo.graduationYear}`, delay: 1000 },
      { type: 'blank', content: '', delay: 1200 },
      { type: 'success', content: `  ● ${personalInfo.status}`, delay: 1400 },
      { type: 'blank', content: '', delay: 1600 },
      { type: 'output', content: `  Shell: ${personalInfo.shell} ${personalInfo.version}  |  Theme: NightShell Dark  |  Location: ${personalInfo.location}`, delay: 1700 },
      { type: 'output', content: `  Last login: ${new Date().toLocaleString()}`, delay: 1900 },
      { type: 'blank', content: '', delay: 2100 },
      { type: 'info', content: `  Type 'help' to see available commands.`, delay: 2200 },
      { type: 'output', content: `  Type 'ls' to list sections  |  Type 'whoami' for my profile`, delay: 2400 },
      { type: 'blank', content: '', delay: 2600 },
    ];

    bootLines.forEach(({ type, content, delay }) => {
      setTimeout(() => {
        setLines(prev => [...prev, { id: `boot-${delay}`, type, content }]);
      }, delay);
    });

    setTimeout(() => {
      setBootDone(true);
      inputRef.current?.focus();
    }, 2800);

    // GSAP entrance
    if (containerRef.current) {
      gsap.fromTo(containerRef.current,
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 }
      );
    }
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
      const matches = allCommands.filter(cmd => cmd.startsWith(val.toLowerCase()));
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
            <span style={{ color: 'var(--terminal-cyan)' }}>~</span>
            <span style={{ color: 'var(--text-muted)' }}>$</span>
          </span>
        )}
        <pre
          className="whitespace-pre-wrap break-words flex-1"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', lineHeight: '1.55' }}
        >
          {typeof line.content === 'string' ? line.content : line.content}
        </pre>
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex flex-col"
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
          {personalInfo.prompt} — zsh — 120×40
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
              <span style={{ color: 'var(--terminal-cyan)' }}>~</span>
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
          <span>zsh 5.9</span>
          <span>NightShell</span>
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

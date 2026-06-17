import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Terminal from '../components/terminal/Terminal';
import { Typewriter } from '../components/ui/AnimatedText';
import { personalInfo } from '../data/portfolioData';

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const sideInfoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.1 });

    if (heroRef.current) {
      tl.fromTo(heroRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }
      );
    }

    if (sideInfoRef.current) {
      const children = sideInfoRef.current.children;
      tl.fromTo(Array.from(children),
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
        '-=0.4'
      );
    }
  }, []);

  return (
    <div
      className="min-h-[calc(100vh-56px)] flex flex-col"
      style={{
        background: 'transparent',
        padding: '0',
      }}
    >
      {/* Grid pattern overlay */}
      <div
        className="fixed inset-0 pointer-events-none grid-pattern"
        style={{ zIndex: 1, opacity: 0.6 }}
      />

      <div
        ref={heroRef}
        className="flex-1 flex flex-col lg:flex-row gap-6 px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full"
        style={{ zIndex: 2, position: 'relative' }}
      >
        {/* Main Terminal */}
        <div className="flex-1 min-h-[500px] lg:min-h-[calc(100vh-120px)]">
          <Terminal />
        </div>

        {/* Side Panel */}
        <div ref={sideInfoRef} className="lg:w-72 xl:w-80 flex flex-col gap-4">

          {/* Profile Card */}
          <div
            className="terminal-card p-4"
            style={{
              background: 'rgba(8, 12, 24, 0.9)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg pulse-green"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,255,136,0.2), rgba(0,212,255,0.2))',
                  border: '1px solid rgba(0,255,136,0.3)',
                  color: 'var(--terminal-green)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                AC
              </div>
              <div>
                <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                  {personalInfo.name}
                </div>
                <div className="text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
                  <Typewriter
                    texts={['4th Year CS', 'Full-Stack Dev', 'ML Engineer', 'OSS Contributor']}
                    speed={70}
                    style={{ color: 'var(--terminal-green)' }}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <InfoRow label="university" value="IIT Delhi" />
              <InfoRow label="cgpa" value={personalInfo.cgpa} />
              <InfoRow label="location" value={personalInfo.location} />
              <InfoRow label="status" value="● Available" valueColor="var(--terminal-green)" />
            </div>
          </div>

          {/* Quick Commands */}
          <div
            className="terminal-card p-4"
            style={{
              background: 'rgba(8, 12, 24, 0.9)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div
              className="text-xs mb-3 flex items-center gap-2"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-cyan)' }}
            >
              <span>▸</span> quick_commands
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {quickCommands.map((cmd) => (
                <QuickCmd key={cmd.cmd} label={cmd.label} cmd={cmd.cmd} />
              ))}
            </div>
          </div>

          {/* Stack snippet */}
          <div
            className="terminal-card p-4"
            style={{
              background: 'rgba(8, 12, 24, 0.9)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div
              className="text-xs mb-3"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-cyan)' }}
            >
              ▸ current_stack
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['TypeScript', 'React', 'Go', 'Python', 'Docker', 'K8s', 'PostgreSQL', 'Redis'].map(tech => (
                <span
                  key={tech}
                  className="tech-tag"
                  style={{ fontSize: '0.65rem' }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Keyboard shortcut reminder */}
          <div
            className="terminal-card p-3"
            style={{
              background: 'rgba(0, 255, 136, 0.04)',
              border: '1px solid rgba(0, 255, 136, 0.12)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              <span style={{ color: 'var(--terminal-green)' }}>ctrl+`</span>
              {' '}→ return to terminal from any page
            </div>
          </div>

          {/* Social Links */}
          <div
            className="terminal-card p-4"
            style={{
              background: 'rgba(8, 12, 24, 0.9)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div
              className="text-xs mb-3"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-cyan)' }}
            >
              ▸ social_links
            </div>
            <div className="space-y-2">
              <SocialLink label="github" handle="@alexchen-dev" url={personalInfo.github} />
              <SocialLink label="linkedin" handle="in/alexchen-cs" url={personalInfo.linkedin} />
              <SocialLink label="email" handle="alex.chen@iiitd" url={`mailto:${personalInfo.email}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value, valueColor }: { label: string; value: string; valueColor?: string }) {
  return (
    <div className="flex items-center justify-between gap-2" style={{ fontFamily: 'var(--font-mono)' }}>
      <span className="text-xs shrink-0" style={{ color: 'var(--text-muted)' }}>{label}</span>
      <span className="text-xs truncate text-right" style={{ color: valueColor || 'var(--text-secondary)' }}>
        {value}
      </span>
    </div>
  );
}

function QuickCmd({ label, cmd }: { label: string; cmd: string }) {
  const handleCopy = () => {
    // Focus terminal and paste command — UX hint
    const terminalInput = document.querySelector('.terminal-input') as HTMLInputElement;
    if (terminalInput) {
      terminalInput.value = cmd;
      terminalInput.dispatchEvent(new Event('input', { bubbles: true }));
      terminalInput.focus();
      // Simulate the React controlled input
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
      if (nativeInputValueSetter) {
        nativeInputValueSetter.call(terminalInput, cmd);
        terminalInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="text-left px-2 py-1.5 rounded text-xs transition-all duration-150 hover-glow"
      style={{
        fontFamily: 'var(--font-mono)',
        color: 'var(--text-secondary)',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)',
        fontSize: '0.7rem',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.color = 'var(--terminal-green)';
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,255,136,0.25)';
        (e.currentTarget as HTMLElement).style.background = 'rgba(0,255,136,0.05)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
        (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
      }}
    >
      $ {label}
    </button>
  );
}

function SocialLink({ label, handle, url }: { label: string; handle: string; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between group"
      style={{ fontFamily: 'var(--font-mono)' }}
    >
      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{label}</span>
      <span
        className="text-xs transition-colors"
        style={{ color: 'var(--text-secondary)' }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--terminal-cyan)'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; }}
      >
        {handle} ↗
      </span>
    </a>
  );
}

const quickCommands = [
  { label: 'whoami', cmd: 'whoami' },
  { label: 'about', cmd: 'about' },
  { label: 'skills', cmd: 'skills' },
  { label: 'projects', cmd: 'projects' },
  { label: 'experience', cmd: 'experience' },
  { label: 'contact', cmd: 'contact' },
  { label: 'resume', cmd: 'resume' },
  { label: 'help', cmd: 'help' },
];

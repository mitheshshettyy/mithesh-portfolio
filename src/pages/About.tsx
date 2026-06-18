import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { personalInfo, aboutData } from '../data/portfolioData';

export default function About() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current) return;
    const els = pageRef.current.querySelectorAll('.reveal');
    gsap.fromTo(els,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out', delay: 0.15 }
    );
  }, []);

  return (
    <div ref={pageRef} className="desktop-container py-16 space-y-12">
      {/* Page Header */}
      <div className="reveal space-y-4">
        <TerminalBreadcrumb path="about" />
        <h1
          className="text-3xl sm:text-4xl font-extrabold"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}
        >
          cat <span style={{ color: 'var(--terminal-green)' }}>about.txt</span>
        </h1>
        <p className="text-sm leading-relaxed" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          # A deeper look at who I am beyond the command prompt
        </p>
      </div>

      {/* Two-Column Grid */}
      <div className="reveal grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Bio & Stats (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          <div className="terminal-card p-8 space-y-6">
            <div
              className="text-xs flex items-center gap-2"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-cyan)' }}
            >
              <span>▸</span> profile_summary
            </div>

            {/* Profile Info Row */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div
                className="w-24 h-24 rounded-2xl shrink-0 overflow-hidden"
                style={{
                  border: '2px solid rgba(0,255,136,0.3)',
                  boxShadow: '0 0 25px rgba(0,255,136,0.15)',
                }}
              >
                <img
                  src="/images/profile-avatar.jpg"
                  alt="Alex Chen"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const el = e.currentTarget as HTMLImageElement;
                    el.style.display = 'none';
                    if (el.parentElement) {
                      el.parentElement.style.background = 'linear-gradient(135deg, rgba(0,255,136,0.15), rgba(0,212,255,0.15))';
                      el.parentElement.innerHTML = '<span style="display:flex;align-items:center;justify-content:center;height:100%;font-family:monospace;font-size:2rem;font-weight:700;color:#00ff88">AC</span>';
                    }
                  }}
                />
              </div>
              <div className="text-center sm:text-left space-y-2">
                <h2 className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                  {personalInfo.name}
                </h2>
                <div className="text-sm font-medium" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-green)' }}>
                  {personalInfo.title}
                </div>
                <div className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  {personalInfo.university}
                </div>
              </div>
            </div>

            {/* Bio paragraphs */}
            <div className="space-y-4" style={{ fontFamily: 'var(--font-mono)' }}>
              <p className="text-sm leading-relaxed text-secondary-custom" style={{ color: 'var(--text-secondary)' }}>
                {aboutData.summary}
              </p>
              <p className="text-sm leading-relaxed text-muted-custom" style={{ color: 'var(--text-muted)' }}>
                {aboutData.philosophy}
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {aboutData.stats.map((stat) => (
              <StatCard key={stat.label} stat={stat} />
            ))}
          </div>
        </div>

        {/* Right Column: Facts, Status, Social (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          {/* Quick Facts */}
          <div className="terminal-card p-6 space-y-4">
            <div
              className="text-xs font-semibold"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-cyan)' }}
            >
              ▸ quick_facts
            </div>
            <div className="divide-y divide-gray-800" style={{ fontFamily: 'var(--font-mono)' }}>
              {quickFacts.map(({ key, val }) => (
                <div key={key} className="flex justify-between items-center py-2.5">
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {key}
                  </span>
                  <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Current Status */}
          <div
            className="terminal-card p-6 space-y-4"
            style={{
              background: 'rgba(0, 255, 136, 0.03)',
              borderColor: 'rgba(0, 255, 136, 0.2)',
            }}
          >
            <div
              className="text-xs font-semibold"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-green)' }}
            >
              ▸ availability
            </div>
            <div className="flex items-center gap-3">
              <span
                className="w-2.5 h-2.5 rounded-full pulse-green shrink-0"
                style={{ background: 'var(--terminal-green)' }}
              />
              <span className="text-xs font-bold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-green)' }}>
                {personalInfo.status}
              </span>
            </div>
          </div>

          {/* Social Links */}
          <div className="terminal-card p-6 space-y-4">
            <div
              className="text-xs font-semibold"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-cyan)' }}
            >
              ▸ direct_connections
            </div>
            <div className="space-y-4">
              <ContactItem icon="📍" label="Location" value={personalInfo.location} />
              <ContactItem icon="📧" label="Email" value={personalInfo.email} href={`mailto:${personalInfo.email}`} />
              <ContactItem icon="🐙" label="GitHub" value="@alexchen-dev" href={personalInfo.github} />
              <ContactItem icon="💼" label="LinkedIn" value="in/alexchen-cs" href={personalInfo.linkedin} />
            </div>
          </div>
        </div>
      </div>

      {/* Row Below: Interests & Fun Facts */}
      <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Interests */}
        <div className="terminal-card p-8 space-y-6 h-full">
          <div
            className="text-xs font-semibold"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-cyan)' }}
          >
            ▸ research_interests[]
          </div>
          <div className="space-y-3" style={{ fontFamily: 'var(--font-mono)' }}>
            {aboutData.interests.map((interest, i) => (
              <div key={i} className="flex items-center gap-3">
                <span style={{ color: 'var(--terminal-green)', fontSize: '0.85rem' }}>→</span>
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {interest}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Fun Facts */}
        <div className="terminal-card p-8 space-y-6 h-full">
          <div
            className="text-xs font-semibold"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-cyan)' }}
          >
            ▸ trivia_and_fun_facts.json
          </div>
          <div className="space-y-3" style={{ fontFamily: 'var(--font-mono)' }}>
            {aboutData.funFacts.map((fact, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-3 rounded"
                style={{
                  background: 'rgba(0, 255, 136, 0.02)',
                  border: '1px solid rgba(0, 255, 136, 0.06)',
                }}
              >
                <span
                  className="shrink-0 text-xs font-semibold"
                  style={{ color: 'var(--terminal-green)' }}
                >
                  [{i.toString().padStart(2, '0')}]
                </span>
                <span className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {fact}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TerminalBreadcrumb({ path }: { path: string }) {
  return (
    <div className="flex items-center gap-1 text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
      <span style={{ color: 'var(--terminal-green)' }}>alex@portfolio</span>
      <span>:</span>
      <span style={{ color: 'var(--terminal-cyan)' }}>~/{path}</span>
      <span>$</span>
    </div>
  );
}

function StatCard({ stat }: { stat: { label: string; value: string; color: string } }) {
  const colorMap: Record<string, string> = {
    green: 'var(--terminal-green)',
    cyan: 'var(--terminal-cyan)',
    blue: 'var(--terminal-blue)',
    purple: 'var(--terminal-purple)',
  };

  return (
    <div
      className="terminal-card p-4 text-center space-y-1.5"
      style={{
        border: `1px solid ${colorMap[stat.color]}22`,
        background: `${colorMap[stat.color]}04`,
      }}
    >
      <div
        className="text-xl font-bold"
        style={{ fontFamily: 'var(--font-mono)', color: colorMap[stat.color] }}
      >
        {stat.value}
      </div>
      <div
        className="text-[0.65rem] tracking-wider uppercase"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
      >
        {stat.label}
      </div>
    </div>
  );
}

function ContactItem({
  icon, label, value, href
}: { icon: string; label: string; value: string; href?: string }) {
  const content = (
    <div className="flex items-center gap-3">
      <span className="text-base select-none">{icon}</span>
      <div>
        <div className="text-[0.65rem] uppercase tracking-wider" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{label}</div>
        <div className="text-xs font-semibold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>{value}</div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith('mailto') ? undefined : '_blank'}
        rel="noopener noreferrer"
        className="block hover:opacity-80 transition-opacity"
      >
        {content}
      </a>
    );
  }

  return <div>{content}</div>;
}

const quickFacts = [
  { key: 'daily driver', val: 'Arch Linux' },
  { key: 'editor', val: 'Neovim' },
  { key: 'shell', val: 'zsh + oh-my-zsh' },
  { key: 'terminal', val: 'Alacritty' },
  { key: 'keyboard', val: 'Keychron Q3' },
  { key: 'coffee', val: 'Black, always' },
];

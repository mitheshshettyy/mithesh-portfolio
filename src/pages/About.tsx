import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { personalInfo, aboutData } from '../data/portfolioData';

export default function About() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current) return;
    const els = pageRef.current.querySelectorAll('.reveal');
    gsap.fromTo(els,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  return (
    <div ref={pageRef} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Page Header */}
      <div className="reveal mb-10">
        <TerminalBreadcrumb path="about" />
        <h1
          className="text-3xl sm:text-4xl font-bold mt-4 mb-2"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}
        >
          cat{' '}
          <span style={{ color: 'var(--terminal-green)' }}>about.txt</span>
        </h1>
        <p className="text-sm" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          # A deeper look at who I am beyond the résumé
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* Left Column — Bio */}
        <div className="lg:col-span-2 space-y-5">

          {/* Hero Summary */}
          <div className="reveal terminal-card p-6">
            <div
              className="text-xs mb-4 flex items-center gap-2"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-cyan)' }}
            >
              <span>▸</span> profile_summary
            </div>

            {/* Avatar area */}
            <div className="flex items-start gap-5 mb-5">
              <div
                className="w-16 h-16 rounded-xl shrink-0 overflow-hidden"
                style={{
                  border: '1px solid rgba(0,255,136,0.3)',
                  boxShadow: '0 0 20px rgba(0,255,136,0.15)',
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
                      el.parentElement.innerHTML = '<span style="display:flex;align-items:center;justify-content:center;height:100%;font-family:monospace;font-size:1.5rem;font-weight:700;color:#00ff88">AC</span>';
                    }
                  }}
                />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-0.5" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                  {personalInfo.name}
                </h2>
                <div className="text-sm mb-1" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-green)' }}>
                  {personalInfo.title}
                </div>
                <div className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  {personalInfo.university}
                </div>
              </div>
            </div>

            <p className="text-sm leading-relaxed mb-4" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
              {aboutData.summary}
            </p>
            <p className="text-sm leading-relaxed" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              {aboutData.philosophy}
            </p>
          </div>

          {/* Stats */}
          <div className="reveal grid grid-cols-2 sm:grid-cols-4 gap-3">
            {aboutData.stats.map((stat) => (
              <StatCard key={stat.label} stat={stat} />
            ))}
          </div>

          {/* Interests */}
          <div className="reveal terminal-card p-6">
            <div
              className="text-xs mb-4"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-cyan)' }}
            >
              ▸ interests[]
            </div>
            <div className="space-y-2">
              {aboutData.interests.map((interest, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span style={{ color: 'var(--terminal-green)', fontSize: '0.75rem' }}>→</span>
                  <span className="text-sm" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                    {interest}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Fun Facts */}
          <div className="reveal terminal-card p-6">
            <div
              className="text-xs mb-4"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-cyan)' }}
            >
              ▸ fun_facts.json
            </div>
            <div className="space-y-3">
              {aboutData.funFacts.map((fact, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded"
                  style={{
                    background: 'rgba(0,255,136,0.03)',
                    border: '1px solid rgba(0,255,136,0.08)',
                  }}
                >
                  <span
                    className="shrink-0 text-xs mt-0.5"
                    style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-green)' }}
                  >
                    [{i.toString().padStart(2, '0')}]
                  </span>
                  <span className="text-sm" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                    {fact}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-5">

          {/* Contact Info */}
          <div className="reveal terminal-card p-5">
            <div
              className="text-xs mb-4"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-cyan)' }}
            >
              ▸ contact_info
            </div>
            <div className="space-y-3">
              <ContactItem icon="📍" label="location" value={personalInfo.location} />
              <ContactItem icon="📧" label="email" value={personalInfo.email} href={`mailto:${personalInfo.email}`} />
              <ContactItem icon="🐙" label="github" value="@alexchen-dev" href={personalInfo.github} />
              <ContactItem icon="💼" label="linkedin" value="in/alexchen-cs" href={personalInfo.linkedin} />
            </div>
          </div>

          {/* Current Status */}
          <div
            className="reveal terminal-card p-5"
            style={{
              background: 'rgba(0,255,136,0.04)',
              border: '1px solid rgba(0,255,136,0.15)',
            }}
          >
            <div
              className="text-xs mb-3"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-green)' }}
            >
              ▸ current_status
            </div>
            <div
              className="flex items-center gap-2 mb-3"
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: 'var(--terminal-green)', boxShadow: '0 0 6px var(--terminal-green)' }}
              />
              <span className="text-sm" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-green)' }}>
                Available for Opportunities
              </span>
            </div>
            <div className="space-y-1.5">
              <div className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                → Full-time roles (May 2025)
              </div>
              <div className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                → Research positions
              </div>
              <div className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                → Open source collaboration
              </div>
            </div>
          </div>

          {/* Currently Working On */}
          <div className="reveal terminal-card p-5">
            <div
              className="text-xs mb-4"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-cyan)' }}
            >
              ▸ currently_building
            </div>
            <div className="space-y-3">
              {currentlyBuilding.map((item, i) => (
                <div key={i}>
                  <div className="text-xs font-semibold mb-0.5" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                    {item.name}
                  </div>
                  <div className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Facts */}
          <div className="reveal terminal-card p-5">
            <div
              className="text-xs mb-4"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-cyan)' }}
            >
              ▸ quick_facts
            </div>
            <div className="space-y-2">
              {quickFacts.map(({ key, val }) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    {key}
                  </span>
                  <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                    {val}
                  </span>
                </div>
              ))}
            </div>
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
      className="terminal-card p-4 text-center"
      style={{
        border: `1px solid ${colorMap[stat.color]}22`,
        background: `${colorMap[stat.color]}08`,
      }}
    >
      <div
        className="text-2xl font-bold mb-1"
        style={{ fontFamily: 'var(--font-mono)', color: colorMap[stat.color] }}
      >
        {stat.value}
      </div>
      <div
        className="text-xs"
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
    <div className="flex items-center gap-2">
      <span className="text-sm">{icon}</span>
      <div>
        <div className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{label}</div>
        <div className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>{value}</div>
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

const currentlyBuilding = [
  { name: 'Federated ML Framework', desc: 'Privacy-preserving FL for healthcare — IEEE S&P submission' },
  { name: 'Portfolio v2', desc: 'Terminal-first dev portfolio (you are here!)' },
  { name: 'RaftDB', desc: 'Distributed key-value store with Raft consensus in Go' },
];

const quickFacts = [
  { key: 'daily driver', val: 'Arch Linux' },
  { key: 'editor', val: 'Neovim' },
  { key: 'shell', val: 'zsh + oh-my-zsh' },
  { key: 'terminal', val: 'Alacritty' },
  { key: 'keyboard', val: 'Keychron Q3' },
  { key: 'coffee', val: 'Black, always' },
];

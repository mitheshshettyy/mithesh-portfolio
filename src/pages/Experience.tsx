import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { experienceData } from '../data/portfolioData';

type ExpType = 'All' | 'Internship' | 'Research' | 'Leadership' | 'Open Source';
const filters: ExpType[] = ['All', 'Internship', 'Research', 'Leadership', 'Open Source'];

export default function Experience() {
  const [activeFilter, setActiveFilter] = useState<ExpType>('All');
  const [activeId, setActiveId] = useState(experienceData[0].id);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current) return;
    const els = pageRef.current.querySelectorAll('.reveal');
    gsap.fromTo(els,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out', delay: 0.15 }
    );
  }, []);

  const filtered = activeFilter === 'All'
    ? experienceData
    : experienceData.filter(e => e.type === activeFilter);

  // Sync activeId if the currently selected is filtered out
  useEffect(() => {
    if (filtered.length > 0 && !filtered.some(e => e.id === activeId)) {
      setActiveId(filtered[0].id);
    }
  }, [activeFilter, filtered, activeId]);

  const selectedExp = filtered.find(e => e.id === activeId) || filtered[0] || experienceData[0];

  return (
    <div ref={pageRef} className="desktop-container py-16 space-y-12">
      {/* Header */}
      <div className="reveal space-y-4">
        <Breadcrumb path="experience" />
        <h1 className="text-3xl sm:text-4xl font-extrabold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
          cat <span style={{ color: 'var(--terminal-green)' }}>experience.log</span>
        </h1>
        <p className="text-sm leading-relaxed" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          # Chronology of work history, research roles, and technical leadership
        </p>
      </div>

      {/* Filters */}
      <div className="reveal flex flex-wrap gap-2.5">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className="px-4 py-1.5 rounded text-xs font-semibold transition-all duration-200 cursor-pointer"
            style={{
              fontFamily: 'var(--font-mono)',
              background: activeFilter === filter ? 'rgba(0,255,136,0.1)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${activeFilter === filter ? 'rgba(0,255,136,0.35)' : 'rgba(255,255,255,0.08)'}`,
              color: activeFilter === filter ? 'var(--terminal-green)' : 'var(--text-muted)',
            }}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Two-Column Layout */}
      <div className="reveal grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Timeline cards (7 cols) */}
        <div className="lg:col-span-7 relative pl-8 border-l border-gray-800 space-y-10">
          {filtered.map((exp) => (
            <ExperienceCard
              key={exp.id}
              exp={exp}
              isActive={exp.id === activeId}
              onClick={() => setActiveId(exp.id)}
            />
          ))}
        </div>

        {/* Right Column: Sticky Details Panel (5 cols) */}
        <div className="hidden lg:block lg:col-span-5">
          {selectedExp && <ExperienceDetailsPanel exp={selectedExp} />}
        </div>
      </div>
    </div>
  );
}

function ExperienceCard({
  exp,
  isActive,
  onClick
}: {
  exp: typeof experienceData[0];
  isActive: boolean;
  onClick: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  const typeColors: Record<string, string> = {
    Internship: 'var(--terminal-cyan)',
    Research: 'var(--terminal-blue)',
    Leadership: 'var(--terminal-purple)',
    'Open Source': 'var(--terminal-green)',
  };

  const color = typeColors[exp.type] || 'var(--text-muted)';

  useEffect(() => {
    if (expanded && detailsRef.current) {
      gsap.fromTo(detailsRef.current,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [expanded]);

  return (
    <div className="relative space-y-3">
      {/* Timeline connector dot */}
      <div
        className="absolute -left-[38px] top-6 w-4.5 h-4.5 rounded-full border-2 bg-primary flex items-center justify-center z-10"
        style={{
          borderColor: color,
          boxShadow: `0 0 12px ${color}60`,
        }}
      >
        <span className="w-2 h-2 rounded-full" style={{ background: color }} />
      </div>

      {/* Card Content */}
      <div
        ref={cardRef}
        className="terminal-card p-6 cursor-pointer space-y-4"
        onClick={() => {
          setExpanded(!expanded);
          onClick();
        }}
        onMouseEnter={() => {
          if (cardRef.current) cardRef.current.style.borderColor = color;
        }}
        onMouseLeave={() => {
          if (cardRef.current && !isActive) cardRef.current.style.borderColor = 'rgba(0, 255, 136, 0.12)';
        }}
        style={{
          transition: 'border-color 0.3s ease',
          borderColor: isActive ? color : 'rgba(0, 255, 136, 0.12)',
          boxShadow: isActive ? `0 0 20px ${color}25` : 'none',
        }}
      >
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div className="flex items-start gap-4">
            {/* Logo */}
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center font-bold shrink-0 text-lg"
              style={{
                background: `${exp.color}15`,
                border: `1px solid ${exp.color}35`,
                color: exp.color,
                fontFamily: 'var(--font-mono)',
              }}
            >
              {exp.logo}
            </div>

            <div className="space-y-1 text-left">
              <span
                className="text-[0.62rem] font-bold px-2 py-0.5 rounded uppercase"
                style={{
                  fontFamily: 'var(--font-mono)',
                  background: `${color}08`,
                  border: `1px solid ${color}25`,
                  color,
                }}
              >
                {exp.type}
              </span>
              <h3 className="text-base font-bold text-primary-custom" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                {exp.role}
              </h3>
              <div className="text-xs font-medium" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                {exp.company} — <span style={{ color: 'var(--text-muted)' }}>{exp.team}</span>
              </div>
            </div>
          </div>

          {/* Time & Location details */}
          <div className="text-left sm:text-right text-xs space-y-1" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
            <div>📅 {exp.duration}</div>
            <div>📍 {exp.location}</div>
          </div>
        </div>

        {/* Short description */}
        <p className="text-xs leading-relaxed text-secondary-custom" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
          {exp.description}
        </p>

        {/* Collapsible content container (hidden on large screens because it is shown in the sticky panel) */}
        {expanded ? (
          <div ref={detailsRef} className="space-y-4 pt-4 border-t border-gray-800 overflow-hidden text-left lg:hidden">
            {/* Responsibilities list */}
            <div className="space-y-2">
              <div className="text-xs font-semibold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-cyan)' }}>
                ▸ key_responsibilities_and_contributions
              </div>
              <div className="space-y-2">
                {exp.achievements.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span style={{ color: 'var(--terminal-green)', fontSize: '0.85rem' }}>✓</span>
                    <span className="text-xs leading-relaxed" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech tag list */}
            <div className="space-y-2">
              <div className="text-xs font-semibold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-cyan)' }}>
                ▸ technologies_deployed
              </div>
              <div className="flex flex-wrap gap-2">
                {exp.tech.map((t) => (
                  <span key={t} className="tech-tag" style={{ fontSize: '0.6rem' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="pt-2 text-center text-[0.68rem] text-muted-custom lg:hidden" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
            [ Click to expand responsibilities & technologies ]
          </div>
        )}
      </div>
    </div>
  );
}

function ExperienceDetailsPanel({ exp }: { exp: typeof experienceData[0] }) {
  const typeColors: Record<string, string> = {
    Internship: 'var(--terminal-cyan)',
    Research: 'var(--terminal-blue)',
    Leadership: 'var(--terminal-purple)',
    'Open Source': 'var(--terminal-green)',
  };

  const color = typeColors[exp.type] || 'var(--text-muted)';

  return (
    <div
      className="terminal-card p-8 space-y-6 sticky top-24 text-left"
      style={{
        borderColor: 'rgba(0, 255, 136, 0.15)',
        background: 'rgba(8, 12, 24, 0.95)',
        boxShadow: '0 0 40px rgba(0, 255, 136, 0.05)',
      }}
    >
      {/* Title bar decoration */}
      <div className="flex items-center gap-3 pb-4 border-b border-gray-800">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff5f57' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#febc2e' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#28c840' }} />
        </div>
        <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
          experience_viewer.sh
        </span>
      </div>

      <div className="flex items-start gap-4">
        {/* Logo */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold shrink-0 text-xl"
          style={{
            background: `${exp.color}15`,
            border: `1px solid ${exp.color}35`,
            color: exp.color,
            fontFamily: 'var(--font-mono)',
          }}
        >
          {exp.logo}
        </div>

        <div className="space-y-1">
          <span
            className="text-[0.62rem] font-bold px-2 py-0.5 rounded uppercase"
            style={{
              fontFamily: 'var(--font-mono)',
              background: `${color}08`,
              border: `1px solid ${color}25`,
              color,
            }}
          >
            {exp.type}
          </span>
          <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
            {exp.role}
          </h3>
          <div className="text-sm font-medium" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
            {exp.company} — <span style={{ color: 'var(--text-muted)' }}>{exp.team}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 py-3 border-y border-gray-800 text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
        <div>📅 Duration: <span style={{ color: 'var(--text-secondary)' }}>{exp.duration}</span></div>
        <div>📍 Location: <span style={{ color: 'var(--text-secondary)' }}>{exp.location}</span></div>
      </div>

      <div className="space-y-3">
        <div className="text-xs font-semibold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-cyan)' }}>
          ▸ key_responsibilities_and_contributions
        </div>
        <div className="space-y-3">
          {exp.achievements.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <span style={{ color: 'var(--terminal-green)', fontSize: '0.85rem' }}>✓</span>
              <span className="text-xs leading-relaxed" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="text-xs font-semibold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-cyan)' }}>
          ▸ technologies_deployed
        </div>
        <div className="flex flex-wrap gap-2">
          {exp.tech.map((t) => (
            <span key={t} className="tech-tag" style={{ fontSize: '0.65rem', padding: '4px 10px' }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Breadcrumb({ path }: { path: string }) {
  return (
    <div className="flex items-center gap-1 text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
      <span style={{ color: 'var(--terminal-green)' }}>alex@portfolio</span>
      <span>:</span>
      <span style={{ color: 'var(--terminal-cyan)' }}>~/{path}</span>
      <span>$</span>
    </div>
  );
}

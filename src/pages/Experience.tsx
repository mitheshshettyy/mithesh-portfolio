import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { experienceData } from '../data/portfolioData';

type ExpType = 'All' | 'Internship' | 'Research' | 'Leadership' | 'Open Source';
const filters: ExpType[] = ['All', 'Internship', 'Research', 'Leadership', 'Open Source'];

export default function Experience() {
  const [activeFilter, setActiveFilter] = useState<ExpType>('All');
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

  return (
    <div ref={pageRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
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

      {/* Experience Timeline */}
      <div className="relative pl-8 border-l border-gray-800 space-y-10">
        {filtered.map((exp) => (
          <ExperienceCard key={exp.id} exp={exp} />
        ))}
      </div>
    </div>
  );
}

function ExperienceCard({ exp }: { exp: typeof experienceData[0] }) {
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
        onClick={() => setExpanded(!expanded)}
        onMouseEnter={() => {
          if (cardRef.current) cardRef.current.style.borderColor = color;
        }}
        onMouseLeave={() => {
          if (cardRef.current) cardRef.current.style.borderColor = 'rgba(0, 255, 136, 0.12)';
        }}
        style={{ transition: 'border-color 0.3s ease' }}
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

        {/* Collapsible content container */}
        {expanded ? (
          <div ref={detailsRef} className="space-y-4 pt-4 border-t border-gray-800 overflow-hidden text-left">
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
          <div className="pt-2 text-center text-[0.68rem] text-muted-custom" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
            [ Click to expand responsibilities & technologies ]
          </div>
        )}
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

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
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  const filtered = activeFilter === 'All'
    ? experienceData
    : experienceData.filter(e => e.type === activeFilter);

  return (
    <div ref={pageRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="reveal mb-10">
        <Breadcrumb path="experience" />
        <h1 className="text-3xl sm:text-4xl font-bold mt-4 mb-2" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
          cat{' '}<span style={{ color: 'var(--terminal-green)' }}>experience.log</span>
        </h1>
        <p className="text-sm" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          # Internships, research, leadership, and open source contributions
        </p>
      </div>

      {/* Filters */}
      <div className="reveal mb-8 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className="px-4 py-1.5 rounded text-xs transition-all duration-200"
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
      <div className="relative">
        <div
          className="absolute left-5 top-0 bottom-0 w-px"
          style={{ background: 'linear-gradient(to bottom, var(--terminal-green), transparent)', opacity: 0.25 }}
        />

        <div className="space-y-6">
          {filtered.map((exp) => (
            <ExperienceCard key={exp.id} exp={exp} />
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="reveal mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {summaryStats.map(({ label, value, color }) => (
          <div
            key={label}
            className="terminal-card p-4 text-center"
            style={{ borderColor: `${color}22`, background: `${color}06` }}
          >
            <div className="text-xl font-bold mb-1" style={{ fontFamily: 'var(--font-mono)', color }}>
              {value}
            </div>
            <div className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExperienceCard({ exp }: { exp: typeof experienceData[0] }) {
  const [expanded, setExpanded] = useState(false);

  const typeColors: Record<string, string> = {
    Internship: 'var(--terminal-cyan)',
    Research: 'var(--terminal-blue)',
    Leadership: 'var(--terminal-purple)',
    'Open Source': 'var(--terminal-green)',
  };

  const color = typeColors[exp.type] || 'var(--text-muted)';

  return (
    <div className="reveal relative pl-14">
      {/* Timeline dot */}
      <div
        className="absolute left-3.5 top-6 w-3 h-3 rounded-full border-2 transform -translate-x-1/2 z-10"
        style={{
          background: color,
          borderColor: color,
          boxShadow: `0 0 8px ${color}60`,
        }}
      />

      <div
        className="terminal-card p-5 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
        style={{ transition: 'all 0.25s ease' }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span
                className="text-xs px-2 py-0.5 rounded"
                style={{
                  fontFamily: 'var(--font-mono)',
                  background: `${color}15`,
                  border: `1px solid ${color}30`,
                  color,
                  fontSize: '0.65rem',
                }}
              >
                {exp.type}
              </span>
              <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontSize: '0.65rem' }}>
                {exp.duration}
              </span>
            </div>

            <div className="flex items-center gap-3 mb-0.5">
              {/* Company Logo */}
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0"
                style={{
                  background: `${exp.color}20`,
                  border: `1px solid ${exp.color}40`,
                  color: exp.color,
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {exp.logo}
              </div>
              <div>
                <h3 className="text-sm font-bold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                  {exp.role}
                </h3>
                <div className="text-xs" style={{ fontFamily: 'var(--font-mono)', color }}>
                  {exp.company} — {exp.team}
                </div>
              </div>
            </div>
            <div className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              📍 {exp.location}
            </div>
          </div>

          <button
            className="text-xs shrink-0 mt-1"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
          >
            {expanded ? '▲ less' : '▼ more'}
          </button>
        </div>

        {/* Description */}
        <p className="text-xs leading-relaxed mt-3" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
          {exp.description}
        </p>

        {/* Expanded Content */}
        {expanded && (
          <div className="mt-4 space-y-4">
            {/* Achievements */}
            <div>
              <div className="text-xs mb-2" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-cyan)' }}>
                ▸ key_achievements
              </div>
              <div className="space-y-1.5">
                {exp.achievements.map((a, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-xs mt-0.5" style={{ color: 'var(--terminal-green)' }}>✓</span>
                    <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                      {a}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech */}
            <div>
              <div className="text-xs mb-2" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-cyan)' }}>
                ▸ tech_used
              </div>
              <div className="flex flex-wrap gap-1.5">
                {exp.tech.map((t) => (
                  <span key={t} className="tech-tag" style={{ fontSize: '0.65rem' }}>{t}</span>
                ))}
              </div>
            </div>
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

const summaryStats = [
  { label: 'Internships', value: '2', color: 'var(--terminal-cyan)' },
  { label: 'Research Papers', value: '1+', color: 'var(--terminal-blue)' },
  { label: 'OSS PRs Merged', value: '47', color: 'var(--terminal-green)' },
  { label: 'Leadership Roles', value: '2', color: 'var(--terminal-purple)' },
];

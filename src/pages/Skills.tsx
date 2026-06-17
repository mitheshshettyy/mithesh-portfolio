import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { skillsData } from '../data/portfolioData';

type Category = 'languages' | 'frontend' | 'backend' | 'databases' | 'tools';

const categories: { key: Category; label: string; icon: string }[] = [
  { key: 'languages', label: 'Languages', icon: '{ }' },
  { key: 'frontend', label: 'Frontend', icon: '◈' },
  { key: 'backend', label: 'Backend', icon: '⬡' },
  { key: 'databases', label: 'Databases', icon: '◇' },
  { key: 'tools', label: 'Tools & DevOps', icon: '⚙' },
];

function getLevelLabel(level: number): string {
  if (level >= 90) return 'Expert';
  if (level >= 75) return 'Advanced';
  if (level >= 60) return 'Intermediate';
  return 'Learning';
}

function getLevelColor(level: number): string {
  if (level >= 90) return 'var(--terminal-green)';
  if (level >= 75) return 'var(--terminal-cyan)';
  if (level >= 60) return 'var(--terminal-blue)';
  return 'var(--terminal-purple)';
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<Category>('languages');
  const pageRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current) return;
    const els = pageRef.current.querySelectorAll('.reveal');
    gsap.fromTo(els,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  useEffect(() => {
    // Animate skill bars
    const bars = document.querySelectorAll('.skill-bar-fill');
    gsap.fromTo(bars,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, stagger: 0.05, ease: 'power2.out', delay: 0.1 }
    );
  }, [activeCategory]);

  const currentSkills = skillsData[activeCategory];

  return (
    <div ref={pageRef} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="reveal mb-10">
        <Breadcrumb path="skills" />
        <h1 className="text-3xl sm:text-4xl font-bold mt-4 mb-2" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
          cat{' '}<span style={{ color: 'var(--terminal-green)' }}>skills.json</span>
        </h1>
        <p className="text-sm" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          # Technical proficiency across languages, frameworks, and tools
        </p>
      </div>

      {/* Category Tabs */}
      <div className="reveal mb-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className="px-4 py-2 rounded text-xs transition-all duration-200"
            style={{
              fontFamily: 'var(--font-mono)',
              background: activeCategory === cat.key ? 'rgba(0,255,136,0.1)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${activeCategory === cat.key ? 'rgba(0,255,136,0.35)' : 'rgba(255,255,255,0.08)'}`,
              color: activeCategory === cat.key ? 'var(--terminal-green)' : 'var(--text-muted)',
            }}
          >
            <span className="mr-2 text-xs">{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Skills List */}
        <div ref={barsRef} className="lg:col-span-3">
          <div className="reveal terminal-card p-6">
            <div className="text-xs mb-6" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-cyan)' }}>
              ▸ {activeCategory}_skills[]
            </div>
            <div className="space-y-5">
              {currentSkills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                      {skill.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs px-2 py-0.5 rounded"
                        style={{
                          fontFamily: 'var(--font-mono)',
                          color: getLevelColor(skill.level),
                          background: `${getLevelColor(skill.level)}15`,
                          border: `1px solid ${getLevelColor(skill.level)}30`,
                          fontSize: '0.65rem',
                        }}
                      >
                        {getLevelLabel(skill.level)}
                      </span>
                      <span
                        className="text-xs tabular-nums"
                        style={{ fontFamily: 'var(--font-mono)', color: getLevelColor(skill.level) }}
                      >
                        {skill.level}%
                      </span>
                    </div>
                  </div>
                  <div className="skill-bar">
                    <div
                      className="skill-bar-fill"
                      style={{
                        width: `${skill.level}%`,
                        background: `linear-gradient(90deg, ${getLevelColor(skill.level)}cc, ${getLevelColor(skill.level)})`,
                        boxShadow: `0 0 6px ${getLevelColor(skill.level)}40`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="lg:col-span-2 space-y-5">
          {/* Concepts */}
          <div className="reveal terminal-card p-5">
            <div className="text-xs mb-4" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-cyan)' }}>
              ▸ core_concepts[]
            </div>
            <div className="flex flex-wrap gap-1.5">
              {skillsData.concepts.map((concept) => (
                <span key={concept} className="tech-tag">
                  {concept}
                </span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div
            className="reveal terminal-card p-5"
            style={{ background: 'rgba(0,255,136,0.04)', border: '1px solid rgba(0,255,136,0.12)' }}
          >
            <div className="text-xs mb-3" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-green)' }}>
              ▸ skill_coverage
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Languages', count: skillsData.languages.length },
                { label: 'Frontend', count: skillsData.frontend.length },
                { label: 'Backend', count: skillsData.backend.length },
                { label: 'Databases', count: skillsData.databases.length },
              ].map(({ label, count }) => (
                <div key={label} className="text-center">
                  <div className="text-xl font-bold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-green)' }}>
                    {count}+
                  </div>
                  <div className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="reveal terminal-card p-5">
            <div className="text-xs mb-4" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-cyan)' }}>
              ▸ proficiency_legend
            </div>
            <div className="space-y-2.5">
              {[
                { label: 'Expert', range: '90–100', color: 'var(--terminal-green)' },
                { label: 'Advanced', range: '75–89', color: 'var(--terminal-cyan)' },
                { label: 'Intermediate', range: '60–74', color: 'var(--terminal-blue)' },
                { label: 'Learning', range: '< 60', color: 'var(--terminal-purple)' },
              ].map(({ label, range, color }) => (
                <div key={label} className="flex items-center gap-3">
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: color, boxShadow: `0 0 4px ${color}` }}
                  />
                  <span className="text-xs flex-1" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                    {label}
                  </span>
                  <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    {range}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* OS / Environment */}
          <div className="reveal terminal-card p-5">
            <div className="text-xs mb-4" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-cyan)' }}>
              ▸ environment
            </div>
            <div className="space-y-2">
              {envItems.map(({ icon, label, value }) => (
                <div key={label} className="flex items-center gap-2">
                  <span className="text-sm">{icon}</span>
                  <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    {label}:
                  </span>
                  <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* DSA */}
          <div
            className="reveal terminal-card p-5"
            style={{ background: 'rgba(0,255,136,0.04)', border: '1px solid rgba(0,255,136,0.12)' }}
          >
            <div className="text-xs mb-4" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-green)' }}>
              ▸ dsa_competitive_programming
            </div>
            <div className="space-y-2">
              {dsaStats.map(({ label, value }) => (
                <div key={label} className="flex justify-between">
                  <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    {label}
                  </span>
                  <span className="text-xs font-semibold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-green)' }}>
                    {value}
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

const envItems = [
  { icon: '🐧', label: 'OS', value: 'Arch Linux' },
  { icon: '⌨️', label: 'editor', value: 'Neovim 0.10' },
  { icon: '🖥️', label: 'terminal', value: 'Alacritty' },
  { icon: '🐚', label: 'shell', value: 'zsh 5.9' },
  { icon: '🔧', label: 'multiplexer', value: 'tmux' },
];

const dsaStats = [
  { label: 'LeetCode Solved', value: '450+ problems' },
  { label: 'Codeforces Rating', value: '1847 (Expert)' },
  { label: 'CodeChef Rating', value: '2102 (5 Star)' },
  { label: 'HackerRank', value: 'Gold — Problem Solving' },
  { label: 'Hackathons Won', value: '3 / 8 competed' },
];

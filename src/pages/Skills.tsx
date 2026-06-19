import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { skillsData, personalInfo } from '../data/portfolioData';

type CategoryKey = 'languages' | 'frontend' | 'backend' | 'databases' | 'tools' | 'cloud' | 'devops' | 'ai';

const categories: { key: CategoryKey; label: string; icon: string }[] = [
  { key: 'languages', label: 'Languages', icon: '{ }' },
  { key: 'frontend', label: 'Frontend', icon: '◈' },
  { key: 'backend', label: 'Backend', icon: '⬡' },
  { key: 'databases', label: 'Databases', icon: '◇' },
  { key: 'tools', label: 'Tools', icon: '⚙' },
  { key: 'cloud', label: 'Cloud Systems', icon: '☁' },
  { key: 'devops', label: 'DevOps & CI/CD', icon: '⚓' },
  { key: 'ai', label: 'Artificial Intelligence', icon: '🧠' },
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
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current) return;
    const els = pageRef.current.querySelectorAll('.reveal');
    gsap.fromTo(els,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out', delay: 0.15 }
    );

    // Animate all skill bars on page load
    const bars = pageRef.current.querySelectorAll('.skill-bar-fill');
    gsap.fromTo(bars,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.2, stagger: 0.03, ease: 'power2.out', delay: 0.3 }
    );
  }, []);

  return (
    <div ref={pageRef} className="desktop-container py-16 space-y-12">
      {/* Header */}
      <div className="reveal space-y-4">
        <Breadcrumb path="skills" />
        <h1 className="text-3xl sm:text-4xl font-extrabold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
          cat <span style={{ color: 'var(--terminal-green)' }}>skills.json</span>
        </h1>
        <p className="text-sm leading-relaxed" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          # Developer dashboard — technical proficiency across all categories
        </p>
      </div>

      {/* Grid Dashboard */}
      <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {categories.map((cat) => {
          // Check that the category exists in skillsData to prevent TypeScript errors
          const skills = skillsData[cat.key] || [];

          return (
            <div key={cat.key} className="terminal-card p-6 space-y-6 h-full">
              {/* Card Title */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-800">
                <span
                  className="text-sm font-bold flex items-center gap-2"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-cyan)' }}
                >
                  <span style={{ color: 'var(--terminal-green)' }}>{cat.icon}</span>
                  {cat.label}
                </span>
                <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  ({skills.length} skills)
                </span>
              </div>

              {/* Skill Bars List */}
              <div className="space-y-4">
                {skills.map((skill) => (
                  <div key={skill.name} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                        {skill.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <span
                          className="text-[0.6rem] px-1.5 py-0.5 rounded"
                          style={{
                            fontFamily: 'var(--font-mono)',
                            color: getLevelColor(skill.level),
                            background: `${getLevelColor(skill.level)}15`,
                            border: `1px solid ${getLevelColor(skill.level)}25`,
                          }}
                        >
                          {getLevelLabel(skill.level)}
                        </span>
                        <span
                          className="text-xs font-medium tabular-nums"
                          style={{ fontFamily: 'var(--font-mono)', color: getLevelColor(skill.level) }}
                        >
                          {skill.level}%
                        </span>
                      </div>
                    </div>
                    {/* Skill track */}
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
          );
        })}
      </div>

      {/* Row Below: Core Concepts & Professional Knowledge */}
      <div className="reveal grid grid-cols-1 md:grid-cols-1 gap-8">
        <div className="terminal-card p-8 space-y-6">
          <div
            className="text-xs font-semibold"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-cyan)' }}
          >
            ▸ core_concepts_and_methodologies[]
          </div>
          <div className="flex flex-wrap gap-2.5">
            {skillsData.concepts.map((concept) => (
              <span key={concept} className="tech-tag" style={{ fontSize: '0.75rem', padding: '4px 12px' }}>
                {concept}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Breadcrumb({ path }: { path: string }) {
  return (
    <div className="flex items-center gap-1 text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
      <span style={{ color: 'var(--terminal-green)' }}>{personalInfo.prompt}</span>
      <span>:</span>
      <span style={{ color: 'var(--terminal-cyan)' }}>~/{path}</span>
      <span>$</span>
    </div>
  );
}

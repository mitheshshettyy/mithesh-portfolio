import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { skillsData, personalInfo } from '../data/portfolioData';

type CategoryKey = 'languages' | 'frontend' | 'backend' | 'databases' | 'developerEcosystem' | 'csFundamentals';

const categories: { key: CategoryKey; label: string; icon: string }[] = [
  { key: 'languages', label: 'Languages', icon: '{ }' },
  { key: 'frontend', label: 'Frontend', icon: '◈' },
  { key: 'backend', label: 'Backend', icon: '⬡' },
  { key: 'databases', label: 'Databases', icon: '◇' },
  { key: 'developerEcosystem', label: 'Developer Ecosystem', icon: '⚙' },
  { key: 'csFundamentals', label: 'Computer Science Fundamentals', icon: '❖' },
];

function getLevelColor(level: number): string {
  if (level >= 90) return 'var(--terminal-green)';
  if (level >= 80) return 'var(--terminal-cyan)';
  if (level >= 70) return 'var(--terminal-blue)';
  return '#64748b'; // Gray
}

function getLevelGlow(level: number): string {
  if (level >= 90) return 'rgba(0, 255, 136, 0.4)';
  if (level >= 80) return 'rgba(0, 212, 255, 0.4)';
  if (level >= 70) return 'rgba(61, 139, 255, 0.4)';
  return 'rgba(100, 116, 139, 0.2)';
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
      <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {categories.map((cat) => {
          // Check that the category exists in skillsData to prevent TypeScript errors
          const skills = skillsData[cat.key] || [];

          return (
            <SkillCard
              key={cat.key}
              label={cat.label}
              icon={cat.icon}
              skills={skills}
            />
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

interface SkillCardProps {
  label: string;
  icon: string;
  skills: { name: string; level: number }[];
}

function SkillCard({ label, icon, skills }: SkillCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!cardRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(cardRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="terminal-card p-6 space-y-6 h-full flex flex-col justify-between"
    >
      <div>
        {/* Card Title */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-800">
          <span
            className="text-sm font-bold flex items-center gap-2"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-cyan)' }}
          >
            <span style={{ color: 'var(--terminal-green)' }}>{icon}</span>
            {label}
          </span>
          <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
            ({skills.length} skills)
          </span>
        </div>

        {/* Skill Bars List */}
        <div className="space-y-4 mt-6">
          {skills.map((skill) => (
            <SkillRow
              key={skill.name}
              name={skill.name}
              level={skill.level}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function SkillRow({ name, level, isVisible }: { name: string; level: number; isVisible: boolean }) {
  const totalBlocks = 20;
  const filledBlocks = Math.round((level / 100) * totalBlocks);
  const levelColor = getLevelColor(level);

  return (
    <div className="grid grid-cols-[120px_1fr_40px] sm:grid-cols-[165px_1fr_45px] gap-3 sm:gap-4 items-center min-h-[24px]">
      {/* Skill Name */}
      <span
        className="text-xs font-semibold truncate"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}
        title={name}
      >
        {name}
      </span>

      {/* Progress Bar Container */}
      <div className="relative w-full h-3">
        {/* Track: Inactive blocks (centered horizontal lines) */}
        <div className="absolute inset-0 flex gap-[2px] sm:gap-[3px] items-center">
          {Array.from({ length: totalBlocks }).map((_, i) => (
            <div
              key={i}
              className="h-[2px] bg-gray-800/80 flex-1 rounded-[1px]"
            />
          ))}
        </div>

        {/* Fill: Active blocks (colored rectangles) */}
        <div
          className="absolute inset-0 flex gap-[2px] sm:gap-[3px] items-center overflow-hidden"
          style={{
            clipPath: isVisible ? `inset(0 ${100 - level}% 0 0)` : 'inset(0 100% 0 0)',
            transition: 'clip-path 1.2s cubic-bezier(0.25, 1, 0.5, 1)',
          }}
        >
          {Array.from({ length: totalBlocks }).map((_, i) => {
            const isFilled = i < filledBlocks;
            return (
              <div
                key={i}
                className="h-2.5 flex-1 rounded-[1px] transition-all"
                style={{
                  backgroundColor: isFilled ? levelColor : 'transparent',
                  boxShadow: isFilled ? `0 0 8px ${getLevelGlow(level)}` : 'none',
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Percentage */}
      <span
        className="text-xs font-medium text-right tabular-nums"
        style={{ fontFamily: 'var(--font-mono)', color: levelColor }}
      >
        {level}%
      </span>
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

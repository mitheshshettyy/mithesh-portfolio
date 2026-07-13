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
  if (level >= 90) return '#0dbf78'; // Softer terminal green
  if (level >= 80) return '#00b4d8'; // Softer terminal cyan
  if (level >= 70) return '#3b82f6'; // Softer terminal blue
  return '#475569'; // Softer slate gray
}

function getLevelGlow(level: number): string {
  if (level >= 90) return 'rgba(13, 191, 120, 0.15)'; // Softer green glow
  if (level >= 80) return 'rgba(0, 180, 216, 0.15)';   // Softer cyan glow
  if (level >= 70) return 'rgba(59, 130, 246, 0.15)';   // Softer blue glow
  return 'rgba(71, 85, 105, 0.05)';
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
    <div ref={pageRef} className="desktop-container py-16 md:py-24 flex justify-center min-h-[calc(100vh-56px)]">
      <div className="w-full max-w-[1100px] flex flex-col gap-12 sm:gap-16">
        <div className="reveal space-y-4">
          <Breadcrumb path="skills" />
          <h1 className="text-3xl sm:text-4xl font-extrabold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
            cat <span style={{ color: '#0dbf78' }}>skills.json</span>
          </h1>
          <p className="text-sm leading-relaxed" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
            # Technical proficiency across all skill categories
          </p>
        </div>

        <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-16 lg:gap-y-16 lg:gap-x-20 items-stretch">
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
      className="p-8 sm:p-10 space-y-8 h-full flex flex-col justify-between rounded-xl border border-[rgba(0,255,136,0.08)] bg-[rgba(8,12,24,0.4)] hover:border-[rgba(0,255,136,0.22)] hover:bg-[rgba(13,20,38,0.55)] hover:shadow-[0_0_25px_rgba(0,255,136,0.04)] hover:-translate-y-1 transition-all duration-300"
      style={{ backdropFilter: 'blur(12px)' }}
    >
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/60">
          <span
            className="text-sm font-bold flex items-center gap-2"
            style={{ fontFamily: 'var(--font-mono)', color: '#00b4d8' }}
          >
            <span style={{ color: '#0dbf78' }}>{icon}</span>
            {label}
          </span>
          <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
            ({skills.length} skills)
          </span>
        </div>

        <div className="space-y-7 mt-8">
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
  const levelColor = getLevelColor(level);

  return (
    <div className="grid grid-cols-[110px_1fr_40px] sm:grid-cols-[150px_1fr_45px] gap-5 sm:gap-7 items-center min-h-[24px]">
      <span
        className="text-xs font-semibold truncate"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}
        title={name}
      >
        {name}
      </span>

      <div className="relative w-full h-[5px] bg-slate-950/80 rounded-full">
        <div
          className="absolute top-0 left-0 h-full rounded-full"
          style={{
            width: isVisible ? `${level}%` : '0%',
            backgroundColor: levelColor,
            boxShadow: `0 0 6px ${getLevelGlow(level)}`,
            transition: 'width 1.2s cubic-bezier(0.25, 1, 0.5, 1)',
          }}
        />
      </div>

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

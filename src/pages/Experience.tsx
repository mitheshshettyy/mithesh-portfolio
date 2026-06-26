import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experienceData } from '../data/portfolioData';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// ── Technical pill badges component ──
interface TechBadgeProps {
  tech: string;
}

export function TechBadge({ tech }: TechBadgeProps) {
  return (
    <span
      className="px-2.5 py-1 text-[11px] font-mono rounded-[4px] border transition-all duration-200"
      style={{
        background: 'transparent',
        borderColor: 'rgba(0, 255, 136, 0.15)',
        color: 'var(--terminal-green-dim)',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = '0 0 8px rgba(0, 255, 136, 0.2)';
        el.style.borderColor = 'var(--terminal-green)';
        el.style.color = 'var(--terminal-green)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = 'none';
        el.style.borderColor = 'rgba(0, 255, 136, 0.15)';
        el.style.color = 'var(--terminal-green-dim)';
      }}
    >
      {tech}
    </span>
  );
}

// ── Git Timeline Node component ──
interface TimelineNodeProps {
  isActive: boolean;
  logo: string;
}

export function TimelineNode({ isActive, logo }: TimelineNodeProps) {
  return (
    <div className="relative flex items-center justify-center shrink-0">
      {/* Outer ring / initials container */}
      <div
        className={`w-6 h-6 rounded-full border bg-slate-950 flex items-center justify-center transition-all duration-250 z-10 select-none font-mono text-[10px] font-bold ${isActive
            ? 'border-terminal-green scale-110 shadow-[0_0_10px_rgba(0,255,136,0.4)]'
            : 'border-[rgba(0,255,136,0.15)] group-hover:border-[rgba(0,255,136,0.35)] group-hover:scale-105 group-hover:shadow-[0_0_6px_rgba(0,255,136,0.2)]'
          }`}
        style={{
          borderColor: isActive ? 'var(--terminal-green)' : undefined,
          color: isActive ? 'var(--terminal-green)' : 'var(--text-secondary)',
        }}
      >
        {logo}
      </div>

      {/* Ripple pulse ring for active node */}
      {isActive && (
        <div className="absolute w-[34px] h-[34px] rounded-full border border-emerald-400 opacity-20 animate-ping pointer-events-none" />
      )}
    </div>
  );
}

// ── Git Vertical Connector component ──
interface TimelineConnectorProps {
  isFirst: boolean;
  isLast: boolean;
}

export function TimelineConnector({ isFirst, isLast }: TimelineConnectorProps) {
  return (
    <>
      {!isFirst && (
        <div
          className="timeline-connector-line w-[1px] absolute top-0 h-[36px] left-1/2 -translate-x-1/2 z-0"
          style={{
            background: 'rgba(0, 255, 136, 0.1)',
          }}
        />
      )}
      {!isLast && (
        <div
          className="timeline-connector-line w-[1px] absolute top-[36px] bottom-0 left-1/2 -translate-x-1/2 z-0"
          style={{
            background: 'rgba(0, 255, 136, 0.1)',
          }}
        />
      )}
    </>
  );
}

// ── Card Header component ──
interface ExperienceHeaderProps {
  type: string;
  role: string;
  company: string;
  duration: string;
  location: string;
}

export function ExperienceHeader({
  type,
  role,
  company,
  duration,
  location,
}: ExperienceHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start gap-2 w-full relative">
      {/* Role and Company Info */}
      <div className="flex flex-col text-left">
        <span
          className="text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase font-mono"
          style={{ color: 'var(--terminal-cyan)' }}
        >
          {type}
        </span>
        <h2
          className="text-[16px] sm:text-[18px] md:text-[20px] font-bold text-white leading-snug mt-1 mb-1 font-mono tracking-tight"
        >
          {role}
        </h2>
        <h3
          className="text-[13px] sm:text-[14px] md:text-[15px] font-semibold transition-colors duration-250 cursor-pointer font-mono"
          style={{
            color: 'var(--terminal-cyan)',
            textShadow: '0 0 3px rgba(0, 212, 255, 0.2)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--text-primary)';
            e.currentTarget.style.textShadow = '0 0 8px rgba(0, 212, 255, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--terminal-cyan)';
            e.currentTarget.style.textShadow = '0 0 3px rgba(0, 212, 255, 0.2)';
          }}
        >
          {company}
        </h3>
      </div>

      {/* Duration and Location */}
      <div className="flex flex-col sm:items-end text-left sm:text-right font-mono shrink-0 gap-1 mt-1 sm:mt-[2px]">
        <span style={{ color: 'var(--text-secondary)' }} className="font-semibold text-[11px] sm:text-[12px] md:text-[13px]">
          {duration}
        </span>
        <span style={{ color: 'var(--text-muted)' }} className="text-[10px] sm:text-[11px] md:text-[12px] font-medium">
          {location}
        </span>
      </div>
    </div>
  );
}

// ── Card Details / Achievements component ──
interface ExperienceDetailsProps {
  description: string;
  achievements: string[];
}

export function ExperienceDetails({ description, achievements }: ExperienceDetailsProps) {
  return (
    <div className="flex flex-col gap-4 text-left w-full">
      {/* Short Summary */}
      <p
        className="font-mono text-[12px] sm:text-[13px] md:text-[14px] max-w-[680px]"
        style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}
      >
        {description}
      </p>

      {/* Contribution Bullet Points */}
      <ul className="flex flex-col gap-2 pl-1 select-text">
        {achievements.map((item, idx) => (
          <li key={idx} className="grid grid-cols-[14px_1fr] gap-2.5 items-start">
            <span
              className="shrink-0 font-bold font-mono text-[14px] select-none leading-none pt-[2px]"
              style={{ color: 'var(--terminal-green)' }}
            >
              ✓
            </span>
            <span
              className="font-mono font-normal text-[12px] sm:text-[13px] md:text-[14px]"
              style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Experience Card component ──
interface ExperienceCardProps {
  exp: typeof experienceData[0];
  isActive: boolean;
  onClick: () => void;
}

export function ExperienceCard({ exp, isActive, onClick }: ExperienceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Parallax and lift handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const moveX = (x / rect.width) * 5;
    const moveY = ((y / rect.height) * 5) - 4; // lift up by 4px on hover

    gsap.to(card, {
      x: moveX,
      y: moveY,
      duration: 0.25,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      x: 0,
      y: 0,
      duration: 0.25,
      ease: 'power2.out',
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View experience details for ${exp.role} at ${exp.company}`}
      aria-selected={isActive}
      className={`w-full max-w-[800px] rounded-xl border p-6 sm:p-8 transition-all duration-250 ease-out text-left select-none relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--terminal-green)] ${isActive
          ? 'border-[rgba(0,255,136,0.18)] bg-[rgba(8,12,24,0.65)] shadow-[0_0_20px_rgba(0,255,136,0.04),_0_10px_30px_rgba(0,0,0,0.5)]'
          : 'border-[rgba(0,255,136,0.08)] bg-[rgba(8,12,24,0.45)] shadow-[0_5px_15px_rgba(0,0,0,0.3)]'
        }`}
      style={{
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="flex flex-col gap-4 w-full">
        {/* Badge & Info Header */}
        <ExperienceHeader
          type={exp.type}
          role={exp.role}
          company={exp.company}
          duration={exp.duration}
          location={exp.location}
        />

        {/* Short Summary & Bullet Points */}
        <ExperienceDetails
          description={exp.description}
          achievements={exp.achievements}
        />

        {/* Divider */}
        <div className="h-[1px] w-full bg-slate-800 opacity-[0.25] mt-4 mb-3" />

        {/* Tech Stack Badge Pills */}
        <div className="flex flex-wrap gap-2 w-full">
          {exp.tech.map((t) => (
            <TechBadge key={t} tech={t} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main Experience Section component ──
export default function Experience() {
  const pageRef = useRef<HTMLDivElement>(null);

  const displayExperiences = experienceData;

  // GSAP Viewport reveal animations
  useEffect(() => {
    // 1. Terminal title commands fade down
    gsap.fromTo('.reveal-title',
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.1 }
    );

    // 2. Subtitle log categories fade in
    gsap.fromTo('.reveal-subtitle',
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.2 }
    );

    // 3. Card fade-up on entry (Scroll-Triggered)
    const cards = gsap.utils.toArray('.reveal-card');
    cards.forEach((card: any) => {
      gsap.fromTo(card,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );
    });
  }, []);

  return (
    <div
      ref={pageRef}
      className="desktop-container pt-16 pb-40 sm:pb-52 lg:pb-64 flex flex-col items-center justify-start min-h-[calc(100vh-56px)]"
    >
      <div className="w-full max-w-[800px] flex flex-col items-center gap-6">
        {/* Page Header aligned perfectly with the main content grid */}
        <div className="w-full text-center flex flex-col items-center">
          {/* Terminal git log style subtitle command */}
          <div
            className="reveal-title flex items-center gap-1.5 font-mono select-none mb-1 text-[11px] sm:text-[12px]"
            style={{ color: 'var(--text-muted)' }}
          >
            <span style={{ color: 'var(--terminal-green)' }}>&gt;</span>
            <span>git log --oneline experience/</span>
          </div>

          {/* Page Title */}
          <h1
            className="reveal-title font-bold text-xl sm:text-2xl md:text-[28px] tracking-tight leading-tight mt-1 mb-1"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-green)' }}
          >
            Experience
          </h1>

          {/* Log categories subtitle */}
          <p
            className="reveal-subtitle text-[11px] sm:text-[12px] font-mono tracking-wider text-slate-400 mt-1 mb-6"
          >
            Internships • Open Source
          </p>
        </div>

        {/* Experience Cards Stack with Timeline connector line */}
        <div className="w-full flex flex-col gap-8 relative pl-12 sm:pl-16 pb-12">
          {displayExperiences.map((exp, idx) => (
            <div key={exp.id || idx} className="relative w-full reveal-card">
              {/* Continuous Straight Vertical Timeline Line Segment */}
              {idx < displayExperiences.length - 1 && (
                <div
                  className="absolute -left-[24px] sm:-left-[32px] -translate-x-1/2 top-[36px] sm:top-[44px] -bottom-[68px] sm:-bottom-[76px] w-[1px] pointer-events-none"
                  style={{
                    backgroundColor: 'rgba(0, 255, 136, 0.2)',
                  }}
                />
              )}

              {/* Timeline Marker Node */}
              <div className="absolute -left-[24px] sm:-left-[32px] -translate-x-1/2 top-6 sm:top-8 flex items-center justify-center z-10">
                <div
                  className={`w-6 h-6 rounded-full border bg-slate-950 flex items-center justify-center transition-all duration-300 ${idx === 0
                      ? 'border-[var(--terminal-green)]'
                      : 'border-slate-800'
                    }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={idx === 0 ? "var(--terminal-green)" : "#475569"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-3 h-3"
                  >
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                </div>
              </div>

              {/* Experience Card */}
              <div className="w-full">
                <ExperienceCard
                  exp={exp}
                  isActive={idx === 0}
                  onClick={() => { }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

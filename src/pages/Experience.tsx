import { useEffect, useRef, useState } from 'react';
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
      className="px-2.5 py-1 text-[13px] font-mono rounded border transition-all duration-200"
      style={{
        background: 'rgba(8, 16, 29, 0.95)',
        borderColor: 'rgba(0, 255, 136, 0.15)',
        color: 'var(--terminal-green)',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = '0 0 10px rgba(0, 255, 136, 0.35)';
        el.style.borderColor = 'var(--terminal-green)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = 'none';
        el.style.borderColor = 'rgba(0, 255, 136, 0.15)';
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
        className={`w-7 h-7 rounded-full border-2 bg-slate-950 flex items-center justify-center transition-all duration-250 z-10 select-none font-mono text-[11px] font-bold ${
          isActive
            ? 'border-terminal-green scale-110 shadow-[0_0_15px_rgba(0,255,136,0.6)]'
            : 'border-[rgba(0,255,136,0.2)] group-hover:border-[rgba(0,255,136,0.45)] group-hover:scale-105 group-hover:shadow-[0_0_10px_rgba(0,255,136,0.3)]'
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
        <div className="absolute w-9 h-9 rounded-full border border-emerald-400 opacity-25 animate-ping pointer-events-none" />
      )}
    </div>
  );
}

// ── Git Vertical Connector component ──
interface TimelineConnectorProps {
  isLast: boolean;
}

export function TimelineConnector({ isLast }: TimelineConnectorProps) {
  if (isLast) return null;
  return (
    <div
      className="timeline-connector-line w-[2px] grow"
      style={{
        background: 'linear-gradient(to bottom, rgba(0, 255, 136, 0.3) 0%, rgba(0, 255, 136, 0.08) 100%)',
        boxShadow: '0 0 8px rgba(0, 255, 136, 0.05)',
      }}
    />
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
    <div className="flex flex-col md:flex-row justify-between items-start gap-3 w-full">
      {/* Role and Company Info */}
      <div className="flex flex-col gap-1.5 text-left">
        <span
          className="text-[13px] font-bold tracking-wider uppercase font-mono"
          style={{ color: 'var(--terminal-cyan)' }}
        >
          {type}
        </span>
        <h2
          className="text-2xl md:text-[32px] font-extrabold text-white leading-tight font-mono tracking-tight"
        >
          {role}
        </h2>
        <h3
          className="text-lg md:text-[22px] font-medium transition-colors duration-200 cursor-pointer hover:text-white inline-block font-mono text-glow-cyan"
          style={{ color: 'var(--terminal-cyan)' }}
        >
          {company}
        </h3>
      </div>

      {/* Duration and Location */}
      <div className="flex flex-col md:items-end text-left md:text-right font-mono text-sm shrink-0 mt-1 md:mt-0 gap-1">
        <span style={{ color: 'var(--text-secondary)' }} className="font-semibold text-[14px]">
          {duration}
        </span>
        <span style={{ color: 'var(--text-muted)' }} className="text-xs">
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
    <div className="space-y-6 text-left w-full">
      {/* Short Summary */}
      <p
        className="font-mono"
        style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: '1.7' }}
      >
        {description}
      </p>

      {/* Contribution Bullet Points */}
      <ul className="space-y-3 pl-1 select-text">
        {achievements.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <span
              className="text-glow-green shrink-0 font-bold font-mono text-[16px] select-none"
              style={{ color: 'var(--terminal-green)' }}
            >
              ✓
            </span>
            <span
              className="leading-relaxed font-mono"
              style={{ color: 'var(--text-secondary)', fontSize: '15px' }}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Experience Card component with mouse events ──
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

    // Subtle 5px parallax translation + 4px vertical lift on hover
    const moveX = (x / rect.width) * 5;
    const moveY = ((y / rect.height) * 5) - 4;

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
      className={`w-full max-w-[950px] rounded-2xl border p-8 transition-all duration-250 ease-out text-left select-none relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--terminal-green)] ${
        isActive
          ? 'border-[rgba(0,255,136,0.45)] bg-[rgba(8,16,29,0.96)] shadow-[0_0_30px_rgba(0,255,136,0.08),_0_20px_45px_rgba(0,0,0,0.65)]'
          : 'border-[rgba(0,255,136,0.12)] bg-[rgba(8,16,29,0.82)] shadow-[0_10px_30px_rgba(0,0,0,0.4)] group-hover:border-[rgba(0,255,136,0.32)] group-hover:shadow-[0_0_20px_rgba(0,255,136,0.05),_0_15px_35px_rgba(0,0,0,0.55)]'
      }`}
      style={{
        backdropFilter: 'blur(10px)',
        transform: isActive ? 'translateY(-4px)' : 'none',
      }}
    >
      <div className="flex flex-col gap-6 w-full">
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
        <div className="h-[1px] w-full bg-slate-800 opacity-50 my-1" />

        {/* Tech Stack Badge Pills */}
        <div className="flex flex-wrap gap-2.5 w-full">
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
  const [activeId, setActiveId] = useState(experienceData[0]?.id || '');
  const pageRef = useRef<HTMLDivElement>(null);

  // GSAP Viewport stagger reveal animations
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

    // 3. Staggered card fade-up on entry (Scroll-Triggered)
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

    // 4. Vertical timeline connector scale animation
    gsap.fromTo('.timeline-connector-line',
      { scaleY: 0 },
      {
        scaleY: 1,
        duration: 1.2,
        ease: 'power2.out',
        transformOrigin: 'top',
        scrollTrigger: {
          trigger: '.timeline-container',
          start: 'top 80%',
        }
      }
    );

    // 5. Initial timeline node scale entry
    gsap.fromTo('.timeline-node-inner',
      { scale: 0 },
      {
        scale: 1,
        duration: 0.4,
        ease: 'back.out(2)',
        stagger: 0.15,
        delay: 0.5,
        scrollTrigger: {
          trigger: '.timeline-container',
          start: 'top 80%',
        }
      }
    );
  }, []);

  return (
    <div
      ref={pageRef}
      className="desktop-container py-16 flex flex-col items-center min-h-[calc(100vh-56px)]"
    >
      {/* Page Header */}
      <div className="w-full max-w-[950px] mb-12 text-left space-y-4">
        {/* Terminal git log style subtitle breadcrumb */}
        <div
          className="reveal-title flex items-center gap-1.5 text-xs font-mono select-none"
          style={{ color: 'var(--text-muted)' }}
        >
          <span style={{ color: 'var(--terminal-green)' }}>&gt;</span>
          <span>git log --oneline experience/</span>
        </div>

        {/* Page Title */}
        <h1
          className="reveal-title font-extrabold text-[40px] md:text-[56px] tracking-tight leading-none"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-green)' }}
        >
          Experience
        </h1>

        <div className="reveal-title h-[1px] w-full bg-slate-800 opacity-50 my-4" />

        {/* Log categories subtitle */}
        <p
          className="reveal-subtitle text-xs md:text-sm font-mono tracking-wider"
          style={{ color: 'var(--text-secondary)' }}
        >
          Internships · Hackathons · Leadership · Open Source
        </p>
      </div>

      {/* Timeline Section container */}
      <div className="timeline-container w-full max-w-[950px] mt-12 flex flex-col">
        {experienceData.map((exp, idx) => {
          const isActive = exp.id === activeId;
          const isLast = idx === experienceData.length - 1;

          return (
            <div
              key={exp.id}
              className="flex gap-6 md:gap-10 items-stretch relative group reveal-card"
            >
              {/* Left Column: Timeline line & nodes (Hidden on mobile) */}
              <div className="hidden md:flex flex-col items-center shrink-0 w-8 relative">
                {/* Node containing company initial */}
                <TimelineNode isActive={isActive} logo={exp.logo} />

                {/* Horizontal link connection */}
                <div
                  className={`absolute left-4 top-3.5 w-4 md:w-6 h-[2px] transition-all duration-250 z-0 ${
                    isActive
                      ? 'bg-terminal-green opacity-100 shadow-[0_0_8px_rgba(0,255,136,0.5)]'
                      : 'bg-zinc-800 opacity-40 group-hover:bg-[rgba(0,255,136,0.35)] group-hover:opacity-80'
                  }`}
                  style={{
                    backgroundColor: isActive ? 'var(--terminal-green)' : undefined,
                  }}
                />

                {/* Vertical Line Connector segment */}
                <TimelineConnector isLast={isLast} />
              </div>

              {/* Right Column: Experience Card */}
              <div className="flex-1 pb-10">
                <ExperienceCard
                  exp={exp}
                  isActive={isActive}
                  onClick={() => setActiveId(exp.id)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

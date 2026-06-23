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
      className="px-[10px] py-[4px] text-[12px] font-mono rounded-[6px] border transition-all duration-200"
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
        className={`w-6 h-6 rounded-full border bg-slate-950 flex items-center justify-center transition-all duration-250 z-10 select-none font-mono text-[10px] font-bold ${
          isActive
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
    <div className="flex flex-col md:flex-row justify-between items-start gap-2 w-full relative">
      {/* Role and Company Info */}
      <div className="flex flex-col text-left max-w-full md:max-w-[70%]">
        <span
          className="text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase font-mono"
          style={{ color: 'var(--terminal-cyan)' }}
        >
          {type}
        </span>
        <h2
          className="text-[20px] sm:text-[25px] md:text-[30px] font-bold text-white leading-[1.2] mt-1.5 mb-[14px] font-mono tracking-tight"
        >
          {role}
        </h2>
        <h3
          className="text-[15px] sm:text-[18px] md:text-[21px] font-semibold transition-colors duration-250 cursor-pointer font-mono mb-[26px]"
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
      <div className="flex flex-col md:items-end text-left md:text-right font-mono mt-2 md:mt-[68px] shrink-0 gap-[6px]">
        <span style={{ color: 'var(--text-secondary)' }} className="font-semibold text-[12.5px] sm:text-[13px] md:text-[14px]">
          {duration}
        </span>
        <span style={{ color: 'var(--text-muted)' }} className="text-[11.5px] sm:text-[12px] md:text-[13px] font-medium">
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
    <div className="flex flex-col gap-[20px] text-left w-full">
      {/* Short Summary */}
      <p
        className="font-mono text-[13px] sm:text-[14px] md:text-[15px] line-clamp-2 max-w-[650px] mb-[28px]"
        style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}
      >
        {description}
      </p>

      {/* Contribution Bullet Points */}
      <ul className="flex flex-col gap-[12px] pl-1 select-text">
        {achievements.map((item, idx) => (
          <li key={idx} className="grid grid-cols-[16px_1fr] gap-[12px] items-start">
            <span
              className="shrink-0 font-bold font-mono text-[16px] select-none leading-none pt-[3px]"
              style={{ color: 'var(--terminal-green)' }}
            >
              ✓
            </span>
            <span
              className="font-mono font-normal text-[13px] sm:text-[14px] md:text-[15px]"
              style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}
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
      className={`w-full max-w-[900px] rounded-2xl border pt-[28px] px-[28px] pb-[24px] transition-all duration-250 ease-out text-left select-none relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--terminal-green)] ${
        isActive
          ? 'border-[rgba(0,255,136,0.45)] bg-[rgba(8,16,29,0.96)] shadow-[0_0_25px_rgba(0,255,136,0.06),_0_15px_35px_rgba(0,0,0,0.6)]'
          : 'border-[rgba(0,255,136,0.1)] bg-[rgba(8,16,29,0.82)] shadow-[0_10px_30px_rgba(0,0,0,0.4)] group-hover:border-[rgba(0,255,136,0.22)] group-hover:shadow-[0_0_15px_rgba(0,255,136,0.04),_0_12px_28px_rgba(0,0,0,0.5)]'
      }`}
      style={{
        backdropFilter: 'blur(10px)',
        transform: isActive ? 'translateY(-4px)' : 'none',
      }}
    >
      <div className="flex flex-col gap-[20px] w-full">
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
        <div className="h-[1px] w-full bg-slate-800 opacity-[0.15] mt-[24px] mb-[18px]" />

        {/* Tech Stack Badge Pills */}
        <div className="flex flex-wrap gap-[10px] w-full">
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
      className="mx-auto w-full max-w-[980px] px-8 py-16 flex flex-col items-center min-h-[calc(100vh-56px)]"
    >
      {/* Page Header aligned perfectly with the left edge of cards on desktop */}
      <div className="w-full pl-0 md:pl-[72px] text-left flex flex-col">
        {/* Terminal git log style subtitle command */}
        <div
          className="reveal-title flex items-center gap-1.5 font-mono select-none mb-[14px]"
          style={{ color: 'var(--text-muted)', fontSize: '14px' }}
        >
          <span style={{ color: 'var(--terminal-green)' }}>&gt;</span>
          <span>git log --oneline experience/</span>
        </div>

        {/* Page Title */}
        <h1
          className="reveal-title font-bold text-[36px] sm:text-[44px] md:text-[56px] tracking-tight leading-[1.0] mt-2 mb-3"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-green)' }}
        >
          Experience
        </h1>

        <div className="reveal-title h-[1px] w-full bg-slate-800 opacity-[0.15] mt-1 mb-[10px]" />

        {/* Log categories subtitle */}
        <p
          className="reveal-subtitle text-[16px] font-mono tracking-wider mt-[10px] mb-[48px]"
          style={{ color: 'var(--text-secondary)' }}
        >
          Internships • Hackathons • Leadership • Open Source
        </p>
      </div>

      {/* Timeline Section container */}
      <div className="timeline-container w-full flex flex-col">
        {experienceData.map((exp, idx) => {
          const isActive = exp.id === activeId;
          const isFirst = idx === 0;
          const isLast = idx === experienceData.length - 1;

          return (
            <div
              key={exp.id}
              className="flex gap-8 items-stretch relative group reveal-card"
            >
              {/* Left Column: Timeline line & nodes (Hidden on mobile) */}
              <div className="hidden md:flex flex-col items-center shrink-0 w-10 relative">
                {/* Node containing company initial */}
                <div className="absolute top-[24px] left-1/2 -translate-x-1/2 z-10">
                  <TimelineNode isActive={isActive} logo={exp.logo} />
                </div>

                {/* Horizontal link connection */}
                <div
                  className={`absolute left-1/2 top-[36px] w-[52px] h-[1px] transition-all duration-250 z-0 ${
                    isActive
                      ? 'bg-terminal-green/50 opacity-100 shadow-[0_0_8px_rgba(0,255,136,0.3)]'
                      : 'bg-zinc-800/60 opacity-20 group-hover:bg-[rgba(0,255,136,0.25)] group-hover:opacity-50'
                  }`}
                  style={{
                    backgroundColor: isActive ? 'var(--terminal-green)' : undefined,
                  }}
                />

                {/* Vertical Line Connector segments */}
                <TimelineConnector isFirst={isFirst} isLast={isLast} />
              </div>

              {/* Right Column: Experience Card */}
              <div className="flex-1 pb-9">
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

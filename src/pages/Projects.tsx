import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { projectsData, personalInfo } from '../data/portfolioData';

type FilterCategory = 'All' | 'Frontend' | 'Full-Stack' | 'AI/ML';
const filters: FilterCategory[] = ['All', 'Frontend', 'Full-Stack', 'AI/ML'];

type Project = typeof projectsData[0];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // ── Page entrance: useLayoutEffect runs synchronously after DOM commit ──
  useLayoutEffect(() => {
    if (!pageRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.reveal',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.07, ease: 'power3.out', delay: 0.1 }
      );
    }, pageRef);          // scope selector to pageRef so it never hits null nodes
    return () => ctx.revert();
  }, []);

  // ── Card grid: rAF ensures React has committed filtered cards before GSAP queries them ──
  useEffect(() => {
    if (!gridRef.current) return;
    const frame = requestAnimationFrame(() => {
      if (!gridRef.current) return;
      const cards = gridRef.current.querySelectorAll('.project-card');
      if (!cards.length) return;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 18, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.38, stagger: 0.055, ease: 'power2.out' }
      );
    });
    return () => cancelAnimationFrame(frame);
  }, [activeFilter]);

  const filtered = activeFilter === 'All'
    ? projectsData
    : projectsData.filter(p => p.category === activeFilter);

  return (
    <div ref={pageRef} className="desktop-container py-10 flex flex-col gap-8">
      {/* ── Header ── */}
      <div className="reveal flex flex-col gap-2">
        <div className="flex items-center gap-1 text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          <span style={{ color: 'var(--terminal-green)' }}>{personalInfo.prompt}</span>
          <span>:</span>
          <span style={{ color: 'var(--terminal-cyan)' }}>~/projects</span>
          <span>$</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold leading-none" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
          ls <span style={{ color: 'var(--terminal-green)' }}>./projects/</span>
        </h1>
        <p className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          # {projectsData.length} projects — systems, full-stack apps, and AI tools
        </p>
      </div>

      {/* ── Filter Tabs ── */}
      <div className="reveal flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className="px-3.5 py-1.5 rounded text-[11px] font-semibold transition-all duration-200 cursor-pointer"
            style={{
              fontFamily: 'var(--font-mono)',
              background: activeFilter === filter ? 'rgba(0,255,136,0.1)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${activeFilter === filter ? 'rgba(0,255,136,0.35)' : 'rgba(255,255,255,0.07)'}`,
              color: activeFilter === filter ? 'var(--terminal-green)' : 'var(--text-muted)',
            }}
          >
            {filter}
            <span className="ml-1.5 text-[9px] opacity-50">
              ({filter === 'All' ? projectsData.length : projectsData.filter(p => p.category === filter).length})
            </span>
          </button>
        ))}
      </div>

      {/* ── Project Grid ── */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch"
      >
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} onOpen={setSelectedProject} />
        ))}
      </div>

      {/* ── Detail Modal ── */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}

// ── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  const demoUrl = project.liveDemo || project.demo;

  return (
    <div
      onClick={() => onOpen(project)}
      className="project-card group flex flex-col cursor-pointer rounded-lg border transition-all duration-250"
      style={{
        borderColor: 'rgba(0,255,136,0.1)',
        background: 'var(--bg-card)',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'rgba(0,255,136,0.28)';
        el.style.background = 'var(--bg-card-hover)';
        el.style.boxShadow = '0 0 18px rgba(0,255,136,0.06), 0 4px 20px rgba(0,0,0,0.4)';
        el.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'rgba(0,255,136,0.1)';
        el.style.background = 'var(--bg-card)';
        el.style.boxShadow = 'none';
        el.style.transform = 'translateY(0)';
      }}
    >
      {/* Card top */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        {/* Row 1: title + date */}
        <div className="flex items-start justify-between gap-3">
          <h3
            className="text-[15px] font-bold leading-tight"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}
          >
            {project.name}
          </h3>
          <span
            className="text-[10px] shrink-0 mt-0.5 tabular-nums"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
          >
            {project.date}
          </span>
        </div>

        {/* Row 2: category pill + status */}
        <div className="flex items-center gap-2">
          <span
            className="text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider"
            style={{
              fontFamily: 'var(--font-mono)',
              background: 'rgba(0,212,255,0.07)',
              border: '1px solid rgba(0,212,255,0.18)',
              color: 'var(--terminal-cyan)',
            }}
          >
            {project.category}
          </span>
          <span
            className="text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider"
            style={{
              fontFamily: 'var(--font-mono)',
              background: 'rgba(0,255,136,0.07)',
              border: '1px solid rgba(0,255,136,0.18)',
              color: 'var(--terminal-green)',
            }}
          >
            {project.status || 'Completed'}
          </span>
        </div>

        {/* Row 3: subtitle / tagline */}
        <p
          className="text-[11px] font-semibold leading-snug"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-green)', opacity: 0.85 }}
        >
          {project.tagline}
        </p>

        {/* Row 4: short description — 2 lines max */}
        <p
          className="text-[11px] leading-relaxed line-clamp-2"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}
        >
          {project.shortDescription}
        </p>

        {/* Row 5: tech chips */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
          {project.tech.slice(0, 5).map((t) => (
            <span key={t} className="tech-tag" style={{ fontSize: '0.6rem', padding: '2px 7px' }}>{t}</span>
          ))}
          {project.tech.length > 5 && (
            <span className="tech-tag opacity-50" style={{ fontSize: '0.6rem', padding: '2px 7px' }}>
              +{project.tech.length - 5}
            </span>
          )}
        </div>
      </div>

      {/* Card footer */}
      <div
        className="flex items-center justify-between gap-2 px-5 py-3 border-t"
        style={{ borderColor: 'rgba(255,255,255,0.05)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex gap-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-semibold transition-colors duration-150"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; }}
            >
              GitHub ↗
            </a>
          )}
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-semibold transition-colors duration-150"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-green)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.75'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
            >
              Live Demo ↗
            </a>
          )}
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); (e.currentTarget.closest('.project-card') as HTMLElement)?.click(); }}
          className="text-[10px] font-semibold cursor-pointer transition-colors duration-150"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-cyan)' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--terminal-cyan)'; }}
        >
          details →
        </button>
      </div>
    </div>
  );
}

// ── Project Modal ─────────────────────────────────────────────────────────────
//
// ROOT CAUSE FIX:
//   The original component returned null when !project || !isVisible, which
//   unmounted the DOM nodes.  The useEffect that called gsap.fromTo() ran
//   *after* the render, so on the very first open (project: null → Project)
//   React rendered null first, useEffect fired, and both refs were still null
//   → "GSAP target null not found".
//
//   Fix: the backdrop + panel are now ALWAYS in the DOM.
//   Visibility is controlled via CSS (opacity / pointer-events / aria-hidden).
//   GSAP therefore always has a valid DOM node to animate.
//
interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

function ProjectModal({ project, onClose }: ProjectModalProps) {
  // true  = modal is open (or animating open)
  // false = modal is fully closed (hidden via CSS)
  const [isOpen, setIsOpen] = useState(false);

  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef    = useRef<HTMLDivElement>(null);
  const closeRef    = useRef<HTMLButtonElement>(null);
  // Prevents double-firing of the close animation on rapid Escape/click
  const closingRef  = useRef(false);

  // ── Open animation — useLayoutEffect runs synchronously after DOM paint ──
  useLayoutEffect(() => {
    if (!project) return;             // project went null (close path) — skip

    closingRef.current = false;
    setIsOpen(true);

    // Refs are always non-null here because the elements are always rendered.
    const ctx = gsap.context(() => {
      gsap.fromTo(backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.22, ease: 'power2.out' }
      );
      gsap.fromTo(panelRef.current,
        { scale: 0.96, y: 14, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.22, ease: 'power2.out' }
      );
    });

    return () => ctx.revert();
  }, [project]);

  // ── Close animation ───────────────────────────────────────────────────────
  const handleClose = () => {
    if (closingRef.current) return;                         // guard double-close
    if (!backdropRef.current || !panelRef.current) return;

    closingRef.current = true;

    const ctx = gsap.context(() => {
      gsap.to(backdropRef.current, { opacity: 0, duration: 0.18, ease: 'power2.in' });
      gsap.to(panelRef.current, {
        scale: 0.96, y: 14, opacity: 0, duration: 0.18, ease: 'power2.in',
        onComplete: () => {
          ctx.revert();
          closingRef.current = false;
          setIsOpen(false);
          onClose();
        },
      });
    });
  };

  // ── Keyboard trap + scroll lock ───────────────────────────────────────────
  useEffect(() => {
    if (!isOpen || !project) return;
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => closeRef.current?.focus(), 80);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { handleClose(); return; }
      if (e.key === 'Tab' && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>('a[href], button, [tabindex="0"]');
        if (!focusable.length) return;
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
        else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
      clearTimeout(timer);
    };
  }, [isOpen, project]);

  const demoUrl = project ? (project.liveDemo || project.demo) : null;

  // ── Always rendered; CSS hides it when closed ─────────────────────────────
  return (
    <div
      ref={backdropRef}
      onClick={(e) => { if (e.target === backdropRef.current) handleClose(); }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      style={{
        background: 'rgba(4,6,16,0.82)',
        backdropFilter: 'blur(10px)',
        // When closed: invisible and non-interactive, but still in the DOM
        opacity: isOpen ? undefined : 0,
        pointerEvents: isOpen ? 'auto' : 'none',
      }}
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
      aria-labelledby="modal-title"
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-[700px] rounded-xl border flex flex-col overflow-hidden"
        style={{
          background: '#0b1120',
          borderColor: 'rgba(0,255,136,0.18)',
          boxShadow: '0 0 40px rgba(0,255,136,0.1), 0 24px 60px rgba(0,0,0,0.7)',
          maxHeight: '88vh',
        }}
      >
        {/* ── Mac-style titlebar ── */}
        <div
          className="flex items-center justify-between px-4 py-3 shrink-0 select-none border-b"
          style={{ background: '#080c18', borderColor: 'rgba(0,255,136,0.1)' }}
        >
          <div className="flex gap-1.5 items-center">
            <button
              ref={closeRef}
              onClick={handleClose}
              className="w-3 h-3 rounded-full border-0 cursor-pointer transition-opacity hover:opacity-80"
              style={{ background: '#ff5f57' }}
              aria-label="Close"
            />
            <div className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
            <div className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
          </div>
          <span className="text-[11px]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
            project :: <span style={{ color: 'var(--terminal-green)' }}>{project?.id ?? ''}</span>
          </span>
          <div className="w-16" />
        </div>

        {/* ── Scrollable body — project content only rendered when a project is set ── */}
        <div className="overflow-y-auto flex flex-col gap-5 px-6 pt-8 pb-8 md:px-8 md:pt-10 md:pb-10 text-sm" style={{ scrollbarWidth: 'thin' }}>
          {project && (
            <>
              {/* Title block */}
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2
                    id="modal-title"
                    className="text-2xl font-bold"
                    style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}
                  >
                    {project.name}
                  </h2>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        background: 'rgba(0,255,136,0.07)',
                        border: '1px solid rgba(0,255,136,0.2)',
                        color: 'var(--terminal-green)',
                      }}
                    >
                      {project.status || 'Completed'}
                    </span>
                    <span className="text-[11px]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                      {project.date}
                    </span>
                  </div>
                </div>
                <p className="text-xs font-semibold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-green)', opacity: 0.8 }}>
                  {project.tagline}
                </p>
              </div>

              <Divider compact />

              {/* // description */}
              <Section heading="// description">
                <p className="text-[13px] leading-relaxed" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', lineHeight: 1.7 }}>
                  {project.shortDescription}
                </p>
              </Section>

              {/* // problem_solved */}
              {project.problemSolved && (
                <Section heading="// problem_solved">
                  <p className="text-[13px] leading-relaxed" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', lineHeight: 1.7 }}>
                    {project.problemSolved}
                  </p>
                </Section>
              )}

              {/* // key_features */}
              {project.features?.length > 0 && (
                <Section heading="// key_features">
                  <ul className="flex flex-col gap-2">
                    {project.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="shrink-0 mt-[3px] text-[8px]" style={{ color: 'var(--terminal-green)' }}>■</span>
                        <span className="text-[13px]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', lineHeight: 1.65 }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </Section>
              )}

              {/* // tech_stack */}
              {project.tech?.length > 0 && (
                <Section heading="// tech_stack">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="tech-tag" style={{ fontSize: '0.68rem' }}>{t}</span>
                    ))}
                  </div>
                </Section>
              )}

              {/* // links */}
              {(project.github || demoUrl) && (
                <Section heading="// links">
                  <div className="flex flex-wrap gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2.5 px-5 py-2.5 rounded-lg text-[12px] font-semibold transition-all duration-200"
                        style={{
                          fontFamily: 'var(--font-mono)',
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.12)',
                          color: 'var(--text-primary)',
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.background = 'rgba(255,255,255,0.1)';
                          el.style.borderColor = 'rgba(255,255,255,0.2)';
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.background = 'rgba(255,255,255,0.05)';
                          el.style.borderColor = 'rgba(255,255,255,0.12)';
                        }}
                      >
                        <svg className="w-[15px] h-[15px] shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        View on GitHub
                      </a>
                    )}
                    {demoUrl && (
                      <a
                        href={demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2.5 px-5 py-2.5 rounded-lg text-[12px] font-semibold transition-all duration-200"
                        style={{
                          fontFamily: 'var(--font-mono)',
                          background: 'rgba(0,255,136,0.08)',
                          border: '1px solid rgba(0,255,136,0.25)',
                          color: 'var(--terminal-green)',
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.background = 'rgba(0,255,136,0.14)';
                          el.style.boxShadow = '0 0 14px rgba(0,255,136,0.18)';
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.background = 'rgba(0,255,136,0.08)';
                          el.style.boxShadow = 'none';
                        }}
                      >
                        <svg className="w-[15px] h-[15px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="2" y1="12" x2="22" y2="12" />
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                        Live Demo
                      </a>
                    )}
                  </div>
                </Section>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <span
        className="text-[12px] font-semibold tracking-wider"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-green)' }}
      >
        {heading}
      </span>
      <div className="pl-4 border-l" style={{ borderColor: 'rgba(0,255,136,0.08)' }}>
        {children}
      </div>
    </div>
  );
}

function Divider({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`select-none text-[10px] opacity-15 ${compact ? 'my-0' : ''}`}
      aria-hidden="true"
      style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.05em' }}
    >
      ────────────────────────────────────────────────────────────
    </div>
  );
}

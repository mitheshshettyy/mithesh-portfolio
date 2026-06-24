import { useEffect, useRef, useState } from 'react';
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

  useEffect(() => {
    if (!pageRef.current) return;
    const els = pageRef.current.querySelectorAll('.reveal');
    gsap.fromTo(els,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out', delay: 0.15 }
    );
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.project-card');
    gsap.fromTo(cards,
      { opacity: 0, y: 20, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.06, ease: 'power2.out' }
    );
  }, [activeFilter]);

  const filtered = activeFilter === 'All'
    ? projectsData
    : projectsData.filter(p => p.category === activeFilter);

  return (
    <div ref={pageRef} className="desktop-container py-16 space-y-12">
      {/* Header */}
      <div className="reveal space-y-4">
        <Breadcrumb path="projects" />
        <h1 className="text-3xl sm:text-4xl font-extrabold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
          ls <span style={{ color: 'var(--terminal-green)' }}>./projects/</span>
        </h1>
        <p className="text-sm leading-relaxed" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          # Exploring my systems, backend pipelines, full-stack tools, and AI architectures
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="reveal flex flex-wrap gap-3">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className="px-4 py-2 rounded text-xs font-semibold transition-all duration-200 cursor-pointer"
            style={{
              fontFamily: 'var(--font-mono)',
              background: activeFilter === filter ? 'rgba(0,255,136,0.1)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${activeFilter === filter ? 'rgba(0,255,136,0.35)' : 'rgba(255,255,255,0.08)'}`,
              color: activeFilter === filter ? 'var(--terminal-green)' : 'var(--text-muted)',
            }}
          >
            {filter}
            <span className="ml-2 text-[0.65rem] opacity-60">
              ({filter === 'All' ? projectsData.length : projectsData.filter(p => p.category === filter).length})
            </span>
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} onOpenModal={setSelectedProject} />
        ))}
      </div>

      {/* Details Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}

function ProjectCard({
  project,
  onOpenModal
}: {
  project: Project;
  onOpenModal: (project: Project) => void;
}) {
  return (
    <div
      onClick={() => onOpenModal(project)}
      className="project-card project-card-custom p-6 flex flex-col justify-between space-y-5 h-full rounded-lg border"
      style={{
        borderColor: 'rgba(0, 255, 136, 0.12)',
        background: 'var(--bg-card)',
      }}
    >
      <div className="space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          {/* Upper row details */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex gap-2">
              <span
                className="text-[0.65rem] font-bold px-2 py-0.5 rounded uppercase"
                style={{
                  fontFamily: 'var(--font-mono)',
                  background: 'rgba(0,212,255,0.08)',
                  border: '1px solid rgba(0,212,255,0.2)',
                  color: 'var(--terminal-cyan)',
                }}
              >
                {project.category}
              </span>
              <span
                className="text-[0.65rem] font-bold px-2 py-0.5 rounded uppercase"
                style={{
                  fontFamily: 'var(--font-mono)',
                  background: 'rgba(0, 255, 136, 0.08)',
                  border: '1px solid rgba(0, 255, 136, 0.2)',
                  color: 'var(--terminal-green)',
                }}
              >
                {project.status || 'Completed'}
              </span>
            </div>
            <span className="text-xs text-[var(--text-secondary)] font-mono">
              📅 {project.year}
            </span>
          </div>

          {/* Title and tagline */}
          <div className="space-y-1">
            <h3 className="project-card-title text-xl font-bold transition-colors duration-250" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
              {project.name}
            </h3>
            <p className="text-xs font-semibold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-green)' }}>
              {project.tagline}
            </p>
          </div>

          {/* Description */}
          <p className="text-xs leading-relaxed line-clamp-2" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
            {project.shortDescription || project.description}
          </p>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tech.slice(0, 6).map((t) => (
            <span key={t} className="project-card-tech tech-tag" style={{ fontSize: '0.62rem' }}>
              {t}
            </span>
          ))}
          {project.tech.length > 6 && (
            <span className="tech-tag opacity-60" style={{ fontSize: '0.62rem' }}>
              +{project.tech.length - 6}
            </span>
          )}
        </div>
      </div>

      {/* Footer Details: Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[rgba(255,255,255,0.05)]">
        <div className="flex gap-2">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="px-3 py-1.5 rounded text-[0.7rem] transition-all duration-200"
            style={{
              fontFamily: 'var(--font-mono)',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'var(--text-secondary)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = 'rgba(255,255,255,0.08)';
              el.style.color = 'var(--text-primary)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = 'rgba(255,255,255,0.03)';
              el.style.color = 'var(--text-secondary)';
            }}
          >
            GitHub ↗
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="px-3 py-1.5 rounded text-[0.7rem] transition-all duration-200"
              style={{
                fontFamily: 'var(--font-mono)',
                background: 'rgba(0,255,136,0.08)',
                border: '1px solid rgba(0,255,136,0.3)',
                color: 'var(--terminal-green)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = 'rgba(0,255,136,0.15)';
                el.style.boxShadow = '0 0 15px rgba(0,255,136,0.2)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = 'rgba(0,255,136,0.08)';
                el.style.boxShadow = 'none';
              }}
            >
              Demo ↗
            </a>
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenModal(project);
          }}
          className="text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors duration-250"
          style={{
            fontFamily: 'var(--font-mono)',
            color: 'var(--terminal-cyan)',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.color = 'var(--text-primary)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.color = 'var(--terminal-cyan)';
          }}
        >
          View Details →
        </button>
      </div>
    </div>
  );
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (project) {
      setIsVisible(true);
      // Run open animation (GSAP opening sequence)
      gsap.fromTo(backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: 'power2.out' }
      );
      gsap.fromTo(modalRef.current,
        { scale: 0.96, y: 16, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.25, ease: 'power2.out' }
      );
    }
  }, [project]);

  const handleClose = () => {
    // Run close animation
    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
    });
    gsap.to(modalRef.current, {
      scale: 0.96,
      y: 16,
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        setIsVisible(false);
        onClose();
      }
    });
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) {
      handleClose();
    }
  };

  useEffect(() => {
    if (!isVisible || !project) return;

    document.body.style.overflow = 'hidden';

    // Set initial focus to close button for access
    const timer = setTimeout(() => {
      if (closeButtonRef.current) {
        closeButtonRef.current.focus();
      }
    }, 100);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, [tabindex="0"]'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          last.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [isVisible, project]);

  if (!project || !isVisible) return null;

  // Spaced, terminal-syntax sections
  const sections = [
    {
      heading: '// description',
      show: true,
      content: (
        <p className="leading-relaxed text-[var(--text-primary)] font-mono text-[13px]">
          {project.description}
        </p>
      )
    },
    {
      heading: '// problem_solved',
      show: !!project.problemSolved,
      content: (
        <p className="leading-relaxed text-[var(--text-primary)] font-mono text-[13px]">
          {project.problemSolved}
        </p>
      )
    },
    {
      heading: '// approach',
      show: !!project.approach,
      content: (
        <p className="leading-relaxed text-[var(--text-primary)] font-mono text-[13px]">
          {project.approach}
        </p>
      )
    },
    {
      heading: '// key_features',
      show: !!(project.features && project.features.length > 0),
      content: (
        <ul className="space-y-2 list-none font-mono text-[13px]">
          {project.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="text-[var(--terminal-green)] mt-1.5 text-[8px] shrink-0">■</span>
              <span className="text-[var(--text-primary)]">{feature}</span>
            </li>
          ))}
        </ul>
      )
    },
    {
      heading: '// tech_stack',
      show: !!(project.tech && project.tech.length > 0),
      content: (
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="tech-tag" style={{ fontSize: '0.7rem' }}>
              {t}
            </span>
          ))}
        </div>
      )
    },
    {
      heading: '// architecture',
      show: !!project.architecture,
      content: (
        <p className="leading-relaxed text-[var(--text-primary)] font-mono text-[13px]">
          {project.architecture}
        </p>
      )
    },
    {
      heading: '// challenges',
      show: !!project.challenges,
      content: (
        <p className="leading-relaxed text-[var(--text-primary)] font-mono text-[13px]">
          {project.challenges}
        </p>
      )
    },
    {
      heading: '// future_improvements',
      show: !!project.futureImprovements,
      content: (
        <p className="leading-relaxed text-[var(--text-primary)] font-mono text-[13px]">
          {project.futureImprovements}
        </p>
      )
    },
    {
      heading: '// links',
      show: !!(project.github || project.demo),
      content: (
        <div className="flex flex-wrap items-center gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-github-premium"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              View on GitHub
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded text-xs transition-all duration-200 inline-flex items-center justify-center"
              style={{
                fontFamily: 'var(--font-mono)',
                background: 'rgba(0,255,136,0.08)',
                border: '1px solid rgba(0,255,136,0.3)',
                color: 'var(--terminal-green)',
                height: '35px'
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = 'rgba(0,255,136,0.15)';
                el.style.boxShadow = '0 0 15px rgba(0,255,136,0.2)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = 'rgba(0,255,136,0.08)';
                el.style.boxShadow = 'none';
              }}
            >
              Live Demo ↗
            </a>
          )}
        </div>
      )
    }
  ];

  const visibleSections = sections.filter(s => s.show);

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/70 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-[850px] md:w-[90%] rounded-lg border bg-[#0d1224] overflow-hidden shadow-[0_0_35px_rgba(0,255,136,0.15)] flex flex-col max-h-[85vh]"
        style={{
          borderColor: 'rgba(0, 255, 136, 0.2)',
        }}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#080c18] border-b border-[rgba(0,255,136,0.12)] shrink-0 select-none">
          <div className="flex gap-1.5">
            <button
              onClick={handleClose}
              className="w-3 h-3 rounded-full bg-[#ff5f57] border-0 cursor-pointer"
              aria-label="Close modal"
              ref={closeButtonRef}
            />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div
            className="text-xs font-semibold"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}
          >
            project :: <span style={{ color: 'var(--terminal-green)' }}>{project.id}</span>
          </div>
          <div className="w-12" /> {/* Spacer to align title center */}
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto terminal-scroll p-6 md:p-8 space-y-8 text-left bg-[#0d1224] text-sm">
          
          {/* Main Title Block */}
          <div className="space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h2
                id="modal-project-title"
                className="text-2xl font-bold text-white"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {project.name}
              </h2>
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className="text-[0.65rem] font-bold px-2 py-0.5 rounded uppercase"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    background: 'rgba(0,212,255,0.08)',
                    border: '1px solid rgba(0,212,255,0.2)',
                    color: 'var(--terminal-cyan)',
                  }}
                >
                  {project.category}
                </span>
                <span
                  className="text-[0.65rem] font-bold px-2 py-0.5 rounded uppercase"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    background: 'rgba(0, 255, 136, 0.08)',
                    border: '1px solid rgba(0, 255, 136, 0.2)',
                    color: 'var(--terminal-green)',
                  }}
                >
                  {project.status || 'Completed'}
                </span>
                <span className="text-xs text-[var(--text-secondary)] font-mono self-center">
                  📅 {project.year}
                </span>
              </div>
            </div>
            <p className="text-xs text-[var(--terminal-green)] font-semibold font-mono">
              {project.tagline}
            </p>
          </div>

          <div
            className="text-[var(--text-muted)] opacity-20 select-none font-mono text-xs pt-2"
            aria-hidden="true"
          >
            --------------------------------------------------------------------------------
          </div>

          {/* Render sections sequentially with custom separators */}
          {visibleSections.map((sec, i) => (
            <div key={sec.heading}>
              <div className="space-y-3">
                <div
                  className="text-sm font-semibold tracking-wider"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-green)' }}
                >
                  {sec.heading}
                </div>
                <div className="pl-0 md:pl-4 border-l border-[rgba(0,255,136,0.05)] py-0.5">
                  {sec.content}
                </div>
              </div>
              {i < visibleSections.length - 1 && (
                <div
                  className="text-[var(--text-muted)] opacity-20 select-none font-mono text-xs pt-8 pb-4"
                  aria-hidden="true"
                >
                  --------------------------------------------------------------------------------
                </div>
              )}
            </div>
          ))}

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

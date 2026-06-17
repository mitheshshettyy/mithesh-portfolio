import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { projectsData } from '../data/portfolioData';

type FilterCategory = 'All' | 'Systems' | 'AI/ML' | 'Backend' | 'Full-Stack';

const filters: FilterCategory[] = ['All', 'Systems', 'AI/ML', 'Backend', 'Full-Stack'];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current) return;
    const els = pageRef.current.querySelectorAll('.reveal');
    gsap.fromTo(els,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.project-card');
    gsap.fromTo(cards,
      { opacity: 0, y: 20, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.07, ease: 'power2.out' }
    );
  }, [activeFilter]);

  const filtered = activeFilter === 'All'
    ? projectsData
    : projectsData.filter(p => p.category === activeFilter);

  const featured = projectsData.filter(p => p.featured);

  return (
    <div ref={pageRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="reveal mb-10">
        <Breadcrumb path="projects" />
        <h1 className="text-3xl sm:text-4xl font-bold mt-4 mb-2" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
          ls{' '}<span style={{ color: 'var(--terminal-green)' }}>./projects/</span>
        </h1>
        <p className="text-sm" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          # {projectsData.length} projects — systems, AI/ML, full-stack, and more
        </p>
      </div>

      {/* Featured Projects */}
      <div className="reveal mb-10">
        <div className="text-xs mb-4" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-cyan)' }}>
          ▸ featured_projects
        </div>
        <div className="grid lg:grid-cols-3 gap-5">
          {featured.map((project) => (
            <FeaturedCard
              key={project.id}
              project={project}
              isHovered={hoveredId === project.id}
              onHover={(id) => setHoveredId(id)}
            />
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="reveal mb-6 flex flex-wrap gap-2">
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
            <span className="ml-2 text-xs opacity-60">
              {filter === 'All' ? projectsData.length : projectsData.filter(p => p.category === filter).length}
            </span>
          </button>
        ))}
      </div>

      {/* All Projects Grid */}
      <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

function FeaturedCard({
  project,
  isHovered,
  onHover,
}: {
  project: typeof projectsData[0];
  isHovered: boolean;
  onHover: (id: string | null) => void;
}) {
  return (
    <div
      className="project-card terminal-card p-5 flex flex-col cursor-pointer"
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={() => onHover(null)}
      style={{
        border: isHovered ? '1px solid rgba(0,255,136,0.35)' : '1px solid rgba(0,255,136,0.12)',
        boxShadow: isHovered ? 'var(--glow-green)' : 'none',
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div
          className="text-xs px-2 py-0.5 rounded"
          style={{
            fontFamily: 'var(--font-mono)',
            background: 'rgba(0,255,136,0.08)',
            border: '1px solid rgba(0,255,136,0.2)',
            color: 'var(--terminal-green)',
          }}
        >
          ★ Featured
        </div>
        <div className="flex items-center gap-1 text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          ⭐ {project.stars}
        </div>
      </div>

      <h3 className="text-base font-bold mb-1" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
        {project.name}
      </h3>
      <div className="text-xs mb-2" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-cyan)' }}>
        {project.tagline}
      </div>
      <p className="text-xs leading-relaxed mb-4 flex-1" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
        {project.description.substring(0, 120)}...
      </p>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-1 mb-4">
        {project.tech.slice(0, 4).map((t) => (
          <span key={t} className="tech-tag" style={{ fontSize: '0.6rem' }}>{t}</span>
        ))}
        {project.tech.length > 4 && (
          <span className="tech-tag" style={{ fontSize: '0.6rem' }}>+{project.tech.length - 4}</span>
        )}
      </div>

      {/* Links */}
      <div className="flex gap-2">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center text-xs py-1.5 rounded transition-all duration-150"
          style={{
            fontFamily: 'var(--font-mono)',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: 'var(--text-secondary)',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = 'var(--terminal-green)';
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,255,136,0.3)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
          }}
        >
          GitHub ↗
        </a>
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center text-xs py-1.5 rounded transition-all duration-150"
            style={{
              fontFamily: 'var(--font-mono)',
              background: 'rgba(0,255,136,0.08)',
              border: '1px solid rgba(0,255,136,0.25)',
              color: 'var(--terminal-green)',
            }}
          >
            Live Demo ↗
          </a>
        )}
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: typeof projectsData[0] }) {
  const [hovered, setHovered] = useState(false);

  const statusColor: Record<string, string> = {
    Active: 'var(--terminal-green)',
    Completed: 'var(--terminal-cyan)',
  };

  return (
    <div
      className="project-card terminal-card p-5 flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: hovered ? '1px solid rgba(0,212,255,0.3)' : '1px solid rgba(0,255,136,0.08)',
        boxShadow: hovered ? 'var(--glow-cyan)' : 'none',
        transition: 'all 0.25s ease',
      }}
    >
      {/* Top Row */}
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-xs px-2 py-0.5 rounded"
          style={{
            fontFamily: 'var(--font-mono)',
            background: `${statusColor[project.status] || 'var(--text-muted)'}15`,
            border: `1px solid ${statusColor[project.status] || 'var(--text-muted)'}30`,
            color: statusColor[project.status] || 'var(--text-muted)',
            fontSize: '0.65rem',
          }}
        >
          ● {project.status}
        </span>
        <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontSize: '0.65rem' }}>
          {project.year} · ⭐{project.stars}
        </span>
      </div>

      <h3 className="text-sm font-bold mb-0.5" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
        {project.name}
      </h3>
      <div className="text-xs mb-2" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-cyan)', fontSize: '0.7rem' }}>
        {project.tagline}
      </div>
      <p className="text-xs leading-relaxed mb-3 flex-1" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
        {project.description.substring(0, 100)}...
      </p>

      {/* Features */}
      <div className="mb-3">
        {project.features.slice(0, 2).map((f, i) => (
          <div key={i} className="flex items-start gap-1.5 mb-1">
            <span style={{ color: 'var(--terminal-green)', fontSize: '0.65rem', marginTop: '1px' }}>→</span>
            <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontSize: '0.65rem' }}>
              {f}
            </span>
          </div>
        ))}
      </div>

      {/* Tech */}
      <div className="flex flex-wrap gap-1 mb-3">
        {project.tech.slice(0, 3).map((t) => (
          <span key={t} className="tech-tag" style={{ fontSize: '0.6rem' }}>{t}</span>
        ))}
        {project.tech.length > 3 && (
          <span className="tech-tag" style={{ fontSize: '0.6rem' }}>+{project.tech.length - 3}</span>
        )}
      </div>

      {/* Links */}
      <div className="flex gap-2 mt-auto">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs py-1 px-3 rounded transition-colors"
          style={{
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-muted)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          GitHub
        </a>
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs py-1 px-3 rounded"
            style={{
              fontFamily: 'var(--font-mono)',
              color: 'var(--terminal-green)',
              border: '1px solid rgba(0,255,136,0.25)',
            }}
          >
            Demo
          </a>
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

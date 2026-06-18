import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { projectsData } from '../data/portfolioData';

type FilterCategory = 'All' | 'Systems' | 'AI/ML' | 'Backend' | 'Full-Stack';
const filters: FilterCategory[] = ['All', 'Systems', 'AI/ML', 'Backend', 'Full-Stack'];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');
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
    <div ref={pageRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
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
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: typeof projectsData[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        y: -4,
        borderColor: 'rgba(0, 212, 255, 0.4)',
        boxShadow: '0 0 25px rgba(0, 212, 255, 0.15)',
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        y: 0,
        borderColor: 'rgba(0, 255, 136, 0.12)',
        boxShadow: 'none',
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="project-card terminal-card p-6 flex flex-col justify-between space-y-6"
      style={{
        borderColor: 'rgba(0, 255, 136, 0.12)',
        background: 'var(--bg-card)',
      }}
    >
      {/* Upper Meta details */}
      <div className="space-y-4 flex-1">
        <div className="flex items-center justify-between">
          <span
            className="text-[0.65rem] font-bold px-2.5 py-0.5 rounded uppercase"
            style={{
              fontFamily: 'var(--font-mono)',
              background: 'rgba(0,212,255,0.08)',
              border: '1px solid rgba(0,212,255,0.2)',
              color: 'var(--terminal-cyan)',
            }}
          >
            {project.category}
          </span>
          <div className="flex items-center gap-3 text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
            <span>📅 {project.year}</span>
            <span>⭐ {project.stars}</span>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
            {project.name}
          </h3>
          <p className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-green)' }}>
            {project.tagline}
          </p>
        </div>

        {/* Mock Terminal Screenshot */}
        <div
          className="rounded p-4 overflow-x-auto select-none"
          style={{
            background: 'rgba(0,0,0,0.4)',
            border: '1px solid rgba(255,255,255,0.05)',
            maxHeight: '180px',
          }}
        >
          <div className="flex gap-1.5 mb-2.5">
            <div className="w-2 h-2 rounded-full" style={{ background: '#ff5f57' }} />
            <div className="w-2 h-2 rounded-full" style={{ background: '#febc2e' }} />
            <div className="w-2 h-2 rounded-full" style={{ background: '#28c840' }} />
          </div>
          <pre
            className="text-[0.68rem] leading-relaxed text-left whitespace-pre"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
          >
            {getProjectMockVisual(project.id)}
          </pre>
        </div>

        {/* Description */}
        <p className="text-xs leading-relaxed" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
          {project.description}
        </p>

        {/* Key Features */}
        <div className="space-y-1.5">
          {project.features.slice(0, 3).map((f, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <span className="text-xs mt-0.5" style={{ color: 'var(--terminal-green)' }}>→</span>
              <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                {f}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Details: Tech Tags & Buttons */}
      <div className="space-y-4 shrink-0 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        {/* Technology tags */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="tech-tag" style={{ fontSize: '0.62rem' }}>
              {t}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center text-xs py-2 rounded transition-all duration-200"
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
            GitHub Source ↗
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center text-xs py-2 rounded transition-all duration-200"
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
              Live Demo ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function getProjectMockVisual(id: string): string {
  switch (id) {
    case 'nexus-os':
      return `[PROCESS MGR] Running CPU Scheduling
PID   Command   CPU%   State
100   init      0.1%   Sleeping
104   Consensus 8.5%   Active (Raft)
109   VMemPaged 4.2%   Active
[Consensus] Raft leader elected: Node 3`;
    
    case 'synapse-ai':
      return `$ query --semantic "neural network graph"
Parsing Query... Done.
[DB] Searching pgvector (1536 dims)...
Matches found:
- Node_ID: 419 (Sim: 0.942) -> "Graph theory"
- Node_ID: 104 (Sim: 0.887) -> "Brain architecture"`;
    
    case 'tradestream':
      return `[KAFKA INGESTION] Processing 50K events/s
Symbol   Price     Change    Volume
BTC/USD  96403.50  +2.45%    14,210
ETH/USD   3542.20  -0.12%     8,419
SOL/USD    212.10  +8.19%    22,342
Strategy Backtest complete. P&L: +$14,204`;
    
    case 'devgrid':
      return `*   commit 9a4ef12 - Merge pull request #42
|\\  
| * commit f82a0d9 - fix: prisma connection pool leak
| * commit 3e9d1a4 - docs: update webhooks configuration
* | commit b234cf7 - chore: bump tailwind dependency`;
    
    case 'phantom-vpn':
      return `[Noise Handshake] initiator -> responder
[NAT traversal] Hole punch: Success
[WireGuard Tunnel] Connection established.
Interface: wg0 (P2P encrypted tunnel)
Peer: 184.22.99.1 (Relay: relay-2)`;
    
    default:
      return `1  import { Editor } from '@monaco-editor/react';
2  
3  export default function CodeIDE() {
4    return (
5      <Editor height="90vh" theme="vs-dark" />
6    );
7  }`;
  }
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

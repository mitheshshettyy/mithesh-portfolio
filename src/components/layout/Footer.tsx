import { personalInfo } from '../../data/portfolioData';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative z-10 mt-6 sm:mt-8"
      style={{
        borderTop: '1px solid rgba(0,255,136,0.08)',
        background: 'rgba(8,12,24,0.8)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div className="desktop-container py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left */}
          <div className="flex items-center gap-2">
            <span
              className="text-xs"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-green)' }}
            >
              {personalInfo.prompt}
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>:</span>
            <span style={{ color: 'var(--terminal-cyan)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>~</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
              $ echo "© {year} {personalInfo.name} — Built with React + Three.js + GSAP"
            </span>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs transition-colors"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--terminal-green)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; }}
            >
              GitHub
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs transition-colors"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--terminal-cyan)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; }}
            >
              LinkedIn
            </a>
            <span
              className="text-xs"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
            >
              Ctrl+` → terminal
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

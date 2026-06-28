import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { personalInfo } from '../data/portfolioData';
import config from '../config';

export default function Resume() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current) return;
    const els = pageRef.current.querySelectorAll('.reveal');
    gsap.fromTo(els,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = personalInfo.resumeUrl;
    link.download = config.resume.downloadName;
    link.click();
  };

  const formatLastUpdated = (dateStr: string) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const parts = dateStr.split('-');
    if (parts.length >= 2) {
      const year = parts[0];
      const monthIndex = parseInt(parts[1], 10) - 1;
      if (monthIndex >= 0 && monthIndex < 12) {
        return `${months[monthIndex]} ${year}`;
      }
    }
    return 'Jun 2026';
  };

  return (
    <div
      ref={pageRef}
      className="desktop-container flex flex-col items-center justify-start pt-16 pb-24 sm:pt-20 sm:pb-32 md:pt-24 md:pb-40 gap-8"
      style={{
        minHeight: 'calc(100vh - 110px)',
        boxSizing: 'border-box',
      }}
    >
      {/* Action Row Toolbar */}
      <div className="reveal w-full max-w-[760px] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 px-4 sm:px-0">
        {/* Left-Aligned Action Buttons */}
        <div className="flex gap-2.5 justify-center w-full sm:w-auto">
          <button
            onClick={() => window.open(personalInfo.resumeUrl, '_blank')}
            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded text-[13px] font-semibold transition-all duration-200 cursor-pointer w-1/2 sm:w-auto border border-[rgba(0,255,136,0.35)] text-[var(--terminal-green)] bg-[rgba(0,255,136,0.08)] hover:bg-[rgba(0,255,136,0.18)] hover:shadow-[0_0_12px_rgba(0,255,136,0.2)]"
          >
            <span className="text-[15px]">✓</span> View Full Screen
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded text-[13px] font-semibold transition-all duration-200 cursor-pointer w-1/2 sm:w-auto border border-gray-800 text-[var(--text-secondary)] bg-white/5 hover:bg-white/10 hover:border-gray-600"
          >
            <span className="text-[15px]">↓</span> Download PDF
          </button>
        </div>
        
        {/* Right-Aligned Metadata (Last updated timestamp) */}
        <div className="text-center sm:text-right text-[10px] text-gray-500 font-mono whitespace-nowrap self-center">
          Last updated: {formatLastUpdated(config.resume.lastUpdated)}
        </div>
      </div>

      {/* Resume Preview macOS-Style Window */}
      <div className="reveal w-full max-w-[760px] rounded-lg overflow-hidden border border-[rgba(0,255,136,0.15)] bg-[#121212] shadow-2xl flex flex-col h-auto">
        {/* macOS Title Bar */}
        <div
          className="flex items-center px-4 py-2.5 shrink-0"
          style={{ borderBottom: '1px solid rgba(0,255,136,0.1)', background: 'rgba(0,0,0,0.3)' }}
        >
          <div className="flex gap-1.5 w-16">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 text-center text-xs font-mono text-gray-400 truncate px-2">
            {config.resume.filename}
          </div>
          <div className="w-16 text-right">
            <span
              className="text-[9px] px-1.5 py-0.5 rounded font-mono animate-pulse"
              style={{
                background: 'rgba(0,255,136,0.08)',
                border: '1px solid rgba(0,255,136,0.2)',
                color: 'var(--terminal-green)',
              }}
            >
              PDF
            </span>
          </div>
        </div>
        
        {/* Editor Content Area with dark background surrounding the white PDF */}
        <div className="bg-[#181818] p-4 sm:p-6 md:p-8 flex justify-center items-center h-auto">
          <iframe
            src={`${personalInfo.resumeUrl}#toolbar=0&navpanes=0`}
            className="w-full aspect-[1/1.414] border border-gray-800/50 shadow-lg rounded bg-white h-auto"
            title="Resume PDF"
            style={{
              maxWidth: '100%',
            }}
          />
        </div>
      </div>

      {/* Bottom Information Panel */}
      <div className="reveal w-full max-w-[760px] font-mono border border-gray-800 rounded bg-[#0a0f1d]/40 overflow-hidden">
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-800 text-center py-1 sm:py-2">
          {/* Column 1 */}
          <div className="flex flex-col justify-center py-1.5 sm:py-0 px-1">
            <span className="text-[9px] text-gray-500 uppercase tracking-wider mb-0.5">FILE</span>
            <span className="text-[10px] sm:text-[11px] font-semibold truncate px-1" style={{ color: 'var(--terminal-green)' }}>
              {config.resume.filename}
            </span>
          </div>
          
          {/* Column 2 */}
          <div className="flex flex-col justify-center py-1.5 sm:py-0 px-1">
            <span className="text-[9px] text-gray-500 uppercase tracking-wider mb-0.5">SIZE</span>
            <span className="text-[10px] sm:text-[11px] font-semibold" style={{ color: 'var(--terminal-cyan)' }}>
              105 KB
            </span>
          </div>
          
          {/* Column 3 */}
          <div className="flex flex-col justify-center py-1.5 sm:py-0 px-1">
            <span className="text-[9px] text-gray-500 uppercase tracking-wider mb-0.5">PAGES</span>
            <span className="text-[10px] sm:text-[11px] font-semibold" style={{ color: 'var(--terminal-cyan)' }}>
              1
            </span>
          </div>
          
          {/* Column 4 */}
          <div className="flex flex-col justify-center py-1.5 sm:py-0 px-1">
            <span className="text-[9px] text-gray-500 uppercase tracking-wider mb-0.5">FORMAT</span>
            <span className="text-[10px] sm:text-[11px] font-semibold" style={{ color: 'var(--terminal-green)' }}>
              PDF/A
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

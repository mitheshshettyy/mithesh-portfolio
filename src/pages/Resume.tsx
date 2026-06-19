import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { personalInfo, skillsData, educationData, experienceData, socialLinks } from '../data/portfolioData';

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
    link.download = 'Mithesh_R_Shetty_Resume.pdf';
    link.click();
  };

  return (
    <div ref={pageRef} className="desktop-container py-12">
      {/* Header */}
      <div className="reveal mb-10">
        <Breadcrumb path="resume" />
        <div className="flex items-start justify-between flex-wrap gap-6 mt-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
              open{' '}<span style={{ color: 'var(--terminal-green)' }}>resume.pdf</span>
            </h1>
            <p className="text-sm" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              # Recruiter-ready resume — last updated Jun 2026
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-5 py-2.5 rounded text-sm font-medium transition-all duration-200"
              style={{
                fontFamily: 'var(--font-mono)',
                background: 'rgba(0,255,136,0.12)',
                border: '1px solid rgba(0,255,136,0.35)',
                color: 'var(--terminal-green)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(0,255,136,0.2)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(0,255,136,0.2)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(0,255,136,0.12)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              ↓ Download PDF
            </button>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded text-sm font-medium transition-all duration-200"
              style={{
                fontFamily: 'var(--font-mono)',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'var(--text-secondary)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
              }}
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Resume Preview - Left Side (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="reveal terminal-card overflow-hidden">
            {/* Top terminal bar */}
            <div
              className="flex items-center gap-3 px-4 py-3"
              style={{ borderBottom: '1px solid rgba(0,255,136,0.1)', background: 'rgba(0,0,0,0.3)' }}
            >
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff5f57' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#febc2e' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#28c840' }} />
              </div>
              <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                mithesh-r-shetty-resume.pdf
              </span>
              <span
                className="ml-auto text-xs px-2 py-0.5 rounded"
                style={{
                  fontFamily: 'var(--font-mono)',
                  background: 'rgba(0,255,136,0.08)',
                  border: '1px solid rgba(0,255,136,0.2)',
                  color: 'var(--terminal-green)',
                  fontSize: '0.65rem',
                }}
              >
                PDF · 1 page
              </span>
            </div>

            {/* Inline Resume Preview Content */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Resume Header & ATS Badge */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-6 gap-4" style={{ borderBottom: '1px solid rgba(0,255,136,0.1)' }}>
                <div className="text-left">
                  <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                    {personalInfo.name}
                  </h2>
                  <div className="text-sm mb-2" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-green)' }}>
                    {personalInfo.title}
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    <span>{personalInfo.email}</span>
                    <span>|</span>
                    <span>{socialLinks.github.url.replace('https://', '')}</span>
                    <span>|</span>
                    <span>{socialLinks.linkedin.url.replace('https://', '')}</span>
                    <span>|</span>
                    <span>{personalInfo.location}</span>
                  </div>
                </div>

                {/* ATS Badge */}
                <div className="flex flex-col sm:items-end border border-dashed border-emerald-500/35 p-2.5 rounded bg-emerald-500/5 self-start sm:self-auto">
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    ATS Compatible
                  </span>
                  <span className="text-[9px] text-emerald-500/80 font-mono mt-0.5">
                    100% Machine Parsable
                  </span>
                </div>
              </div>

              {/* Education */}
              <ResumeSection title="Education">
                <div className="space-y-4">
                  {educationData.map(edu => (
                    <div key={edu.id} className="group">
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <div>
                          <div className="text-sm font-semibold transition-colors duration-200 group-hover:text-emerald-400" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                            {edu.institution}
                          </div>
                          <div className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-cyan)' }}>
                            {edu.degree} — {edu.field}
                          </div>
                        </div>
                        <div className="text-right flex sm:flex-col justify-between items-center sm:items-end w-full sm:w-auto mt-1 sm:mt-0">
                          <div className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                            {edu.duration}
                          </div>
                          <div className="text-xs font-semibold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-green)' }}>
                            {'cgpa' in edu ? `CGPA: ${edu.cgpa}` : `Score: ${edu.score}`}
                          </div>
                        </div>
                      </div>
                      {edu.highlights.length > 0 && (
                        <ul className="mt-2 space-y-1 pl-1">
                          {edu.highlights.slice(0, 2).map(h => (
                            <li key={h} className="text-xs flex items-start gap-2" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                              <span style={{ color: 'var(--terminal-green)' }}>›</span>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </ResumeSection>

              {/* Experience */}
              <ResumeSection title="Experience">
                <div className="space-y-4">
                  {experienceData.filter(e => e.type === 'Internship' || e.type === 'Research').map(exp => (
                    <div key={exp.id} className="group">
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <div>
                          <div className="text-sm font-semibold transition-colors duration-200 group-hover:text-emerald-400" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                            {exp.role}
                          </div>
                          <div className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-cyan)' }}>
                            {exp.company} · {exp.location}
                          </div>
                        </div>
                        <div className="text-xs text-right mt-1 sm:mt-0" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                          {exp.duration}
                        </div>
                      </div>
                      <ul className="mt-2 space-y-1 pl-1">
                        {exp.achievements.slice(0, 2).map(a => (
                          <li key={a} className="text-xs flex items-start gap-2" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                            <span style={{ color: 'var(--terminal-cyan)' }}>›</span>
                            <span>{a}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </ResumeSection>

              {/* Skills */}
              <ResumeSection title="Technical Skills">
                <div className="space-y-2">
                  <SkillLine label="Languages" skills={skillsData.languages.map(s => s.name)} />
                  <SkillLine label="Frontend" skills={skillsData.frontend.map(s => s.name)} />
                  <SkillLine label="Backend" skills={skillsData.backend.slice(0, 6).map(s => s.name)} />
                  <SkillLine label="Databases" skills={skillsData.databases.map(s => s.name)} />
                  <SkillLine label="Tools" skills={skillsData.tools.slice(0, 6).map(s => s.name)} />
                </div>
              </ResumeSection>
            </div>
          </div>
        </div>

        {/* Info/Action Panel - Right Side */}
        <div className="space-y-6">
          {/* Download Card */}
          <div
            className="reveal terminal-card p-6"
            style={{ background: 'rgba(0,255,136,0.04)', border: '1px solid rgba(0,255,136,0.15)' }}
          >
            <div className="text-xs mb-4 uppercase tracking-wider font-bold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-green)' }}>
              ▸ download_resume
            </div>
            <div className="space-y-2.5 mb-6">
              <div className="flex justify-between text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
                <span style={{ color: 'var(--text-muted)' }}>File</span>
                <span style={{ color: 'var(--text-secondary)' }}>mithesh-r-shetty-resume.pdf</span>
              </div>
              <div className="flex justify-between text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Updated</span>
                <span style={{ color: 'var(--text-secondary)' }}>Jun 2026</span>
              </div>
              <div className="flex justify-between text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Pages</span>
                <span style={{ color: 'var(--text-secondary)' }}>1 Page</span>
              </div>
              <div className="flex justify-between text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Format</span>
                <span style={{ color: 'var(--text-secondary)' }}>PDF / ATS Friendly</span>
              </div>
            </div>
            <button
              onClick={handleDownload}
              className="w-full py-2.5 rounded text-sm font-medium transition-all duration-200"
              style={{
                fontFamily: 'var(--font-mono)',
                background: 'rgba(0,255,136,0.12)',
                border: '1px solid rgba(0,255,136,0.35)',
                color: 'var(--terminal-green)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(0,255,136,0.2)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(0,255,136,0.15)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(0,255,136,0.12)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              ↓ Download PDF
            </button>
          </div>

          {/* ATS Compatibility Checker Card */}
          <div className="reveal terminal-card p-6">
            <div className="text-xs mb-4 uppercase tracking-wider font-bold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-cyan)' }}>
              ▸ ats_compatibility_analysis
            </div>
            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-gray-800/50">
                <span style={{ color: 'var(--text-muted)' }}>Status</span>
                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold" style={{ background: 'rgba(0, 255, 136, 0.1)', color: 'var(--terminal-green)', border: '1px solid rgba(0, 255, 136, 0.2)' }}>
                  Passed (100%)
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span style={{ color: 'var(--text-muted)' }}>Structure Check</span>
                <span style={{ color: 'var(--text-secondary)' }}>Single Column (Optimal)</span>
              </div>
              <div className="flex justify-between items-center">
                <span style={{ color: 'var(--text-muted)' }}>Fonts Check</span>
                <span style={{ color: 'var(--text-secondary)' }}>Standard Mono (Valid)</span>
              </div>
              <div className="flex justify-between items-center">
                <span style={{ color: 'var(--text-muted)' }}>Parsability</span>
                <span style={{ color: 'var(--text-secondary)' }}>Plain Text Match</span>
              </div>
              <div className="pt-2">
                <div className="flex justify-between text-[10px] mb-1" style={{ color: 'var(--text-muted)' }}>
                  <span>Optimization score</span>
                  <span style={{ color: 'var(--terminal-green)' }}>98%</span>
                </div>
                <div className="w-full bg-gray-800/80 rounded h-1.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-1.5 rounded" style={{ width: '98%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Terminal Commands */}
          <div className="reveal terminal-card p-6">
            <div className="text-xs mb-4 uppercase tracking-wider font-bold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-cyan)' }}>
              ▸ terminal_commands
            </div>
            <div className="space-y-2.5">
              {[
                { cmd: 'resume', desc: 'View this page' },
                { cmd: 'open resume', desc: 'Download PDF' },
                { cmd: 'cat resume.txt', desc: 'Quick summary' },
                { cmd: 'whoami', desc: 'Identity details' },
              ].map(({ cmd, desc }) => (
                <div key={cmd} className="flex items-center justify-between gap-2">
                  <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-green)', fontSize: '0.65rem' }}>
                    $ {cmd}
                  </span>
                  <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontSize: '0.65rem' }}>
                    {desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="reveal terminal-card p-6">
            <div className="text-xs mb-4 uppercase tracking-wider font-bold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-cyan)' }}>
              ▸ at_a_glance
            </div>
            <div className="space-y-3">
              {glanceStats.map(({ label, value, color }) => (
                <div key={label} className="flex justify-between items-center">
                  <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    {label}
                  </span>
                  <span className="text-xs font-semibold" style={{ fontFamily: 'var(--font-mono)', color }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div
        className="text-xs font-bold uppercase tracking-wider mb-3 pb-1"
        style={{
          fontFamily: 'var(--font-mono)',
          color: 'var(--terminal-cyan)',
          borderBottom: '1px solid rgba(0,212,255,0.2)',
          letterSpacing: '0.1em',
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}

function SkillLine({ label, skills }: { label: string; skills: string[] }) {
  return (
    <div className="flex gap-2 text-xs" style={{ fontFamily: 'var(--font-mono)', lineHeight: '1.6' }}>
      <span className="shrink-0 w-24 font-semibold" style={{ color: 'var(--text-muted)' }}>{label}:</span>
      <span style={{ color: 'var(--text-secondary)' }}>{skills.join(', ')}</span>
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

const glanceStats = [
  { label: 'CGPA', value: '8.69 / 10', color: 'var(--terminal-green)' },
  { label: 'Internships', value: '1 (Algoorbit)', color: 'var(--terminal-cyan)' },
  { label: 'Projects', value: '10+', color: 'var(--terminal-blue)' },
  { label: 'Board Score', value: '94.5%', color: 'var(--terminal-purple)' },
  { label: 'Main Tech', value: 'React / Node.js', color: 'var(--terminal-green)' },
  { label: 'Database', value: 'MongoDB / MySQL', color: 'var(--terminal-cyan)' },
];

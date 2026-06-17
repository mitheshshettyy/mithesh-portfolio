import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { personalInfo, skillsData, educationData, experienceData } from '../data/portfolioData';

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
    // In production this would hit /api/resume/download
    const link = document.createElement('a');
    link.href = '/resume/alex-chen-resume.pdf';
    link.download = 'Alex_Chen_Resume_2025.pdf';
    link.click();
  };

  return (
    <div ref={pageRef} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="reveal mb-8">
        <Breadcrumb path="resume" />
        <div className="flex items-start justify-between flex-wrap gap-4 mt-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
              open{' '}<span style={{ color: 'var(--terminal-green)' }}>resume.pdf</span>
            </h1>
            <p className="text-sm" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              # Recruiter-ready resume — last updated Jan 2025
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-5 py-2.5 rounded text-sm transition-all duration-200"
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
              className="flex items-center gap-2 px-5 py-2.5 rounded text-sm transition-all duration-200"
              style={{
                fontFamily: 'var(--font-mono)',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'var(--text-secondary)',
              }}
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Resume Preview */}
        <div className="lg:col-span-2 space-y-5">

          {/* PDF Viewer Placeholder */}
          <div className="reveal terminal-card overflow-hidden">
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
                alex-chen-resume-2025.pdf
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

            {/* Inline Resume Preview */}
            <div className="p-6 space-y-5">
              {/* Resume Header */}
              <div className="text-center pb-5" style={{ borderBottom: '1px solid rgba(0,255,136,0.1)' }}>
                <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                  {personalInfo.name}
                </h2>
                <div className="text-sm mb-2" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-green)' }}>
                  {personalInfo.title}
                </div>
                <div className="flex flex-wrap justify-center gap-3 text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  <span>{personalInfo.email}</span>
                  <span>|</span>
                  <span>github.com/alexchen-dev</span>
                  <span>|</span>
                  <span>linkedin.com/in/alexchen-cs</span>
                  <span>|</span>
                  <span>{personalInfo.location}</span>
                </div>
              </div>

              {/* Education */}
              <ResumeSection title="Education">
                {educationData.map(edu => (
                  <div key={edu.id} className="mb-3">
                    <div className="flex justify-between items-start flex-wrap gap-1">
                      <div>
                        <div className="text-sm font-semibold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                          {edu.institution}
                        </div>
                        <div className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-cyan)' }}>
                          {edu.degree} — {edu.field}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                          {edu.duration}
                        </div>
                        <div className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-green)' }}>
                          {'cgpa' in edu ? `CGPA: ${edu.cgpa}` : `Score: ${edu.score}`}
                        </div>
                      </div>
                    </div>
                    {edu.highlights.length > 0 && (
                      <ul className="mt-1 space-y-0.5">
                        {edu.highlights.slice(0, 2).map(h => (
                          <li key={h} className="text-xs flex items-start gap-1.5" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                            <span>•</span><span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </ResumeSection>

              {/* Experience */}
              <ResumeSection title="Experience">
                {experienceData.filter(e => e.type === 'Internship' || e.type === 'Research').map(exp => (
                  <div key={exp.id} className="mb-3">
                    <div className="flex justify-between items-start flex-wrap gap-1">
                      <div>
                        <div className="text-sm font-semibold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                          {exp.role}
                        </div>
                        <div className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-cyan)' }}>
                          {exp.company} · {exp.location}
                        </div>
                      </div>
                      <div className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                        {exp.duration}
                      </div>
                    </div>
                    <ul className="mt-1 space-y-0.5">
                      {exp.achievements.slice(0, 2).map(a => (
                        <li key={a} className="text-xs flex items-start gap-1.5" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                          <span>•</span><span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </ResumeSection>

              {/* Skills */}
              <ResumeSection title="Technical Skills">
                <div className="space-y-1">
                  <SkillLine label="Languages" skills={skillsData.languages.map(s => s.name)} />
                  <SkillLine label="Frontend" skills={skillsData.frontend.map(s => s.name)} />
                  <SkillLine label="Backend" skills={skillsData.backend.slice(0, 5).map(s => s.name)} />
                  <SkillLine label="Tools" skills={skillsData.tools.slice(0, 5).map(s => s.name)} />
                  <SkillLine label="Databases" skills={skillsData.databases.map(s => s.name)} />
                </div>
              </ResumeSection>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="space-y-4">
          {/* Download Card */}
          <div
            className="reveal terminal-card p-5"
            style={{ background: 'rgba(0,255,136,0.04)', border: '1px solid rgba(0,255,136,0.15)' }}
          >
            <div className="text-xs mb-3" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-green)' }}>
              ▸ download_resume
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
                <span style={{ color: 'var(--text-muted)' }}>File</span>
                <span style={{ color: 'var(--text-secondary)' }}>resume_2025.pdf</span>
              </div>
              <div className="flex justify-between text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Updated</span>
                <span style={{ color: 'var(--text-secondary)' }}>Jan 2025</span>
              </div>
              <div className="flex justify-between text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Pages</span>
                <span style={{ color: 'var(--text-secondary)' }}>1</span>
              </div>
              <div className="flex justify-between text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Format</span>
                <span style={{ color: 'var(--text-secondary)' }}>PDF / ATS Friendly</span>
              </div>
            </div>
            <button
              onClick={handleDownload}
              className="w-full py-2.5 rounded text-sm transition-all duration-200"
              style={{
                fontFamily: 'var(--font-mono)',
                background: 'rgba(0,255,136,0.12)',
                border: '1px solid rgba(0,255,136,0.35)',
                color: 'var(--terminal-green)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(0,255,136,0.2)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(0,255,136,0.12)';
              }}
            >
              ↓ Download PDF
            </button>
          </div>

          {/* Terminal Commands */}
          <div className="reveal terminal-card p-5">
            <div className="text-xs mb-3" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-cyan)' }}>
              ▸ terminal_commands
            </div>
            <div className="space-y-1.5">
              {[
                { cmd: 'resume', desc: 'View this page' },
                { cmd: 'open resume', desc: 'Download PDF' },
                { cmd: 'cat resume.txt', desc: 'Quick summary' },
                { cmd: 'whoami', desc: 'Identity' },
              ].map(({ cmd, desc }) => (
                <div key={cmd} className="flex items-center justify-between">
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
          <div className="reveal terminal-card p-5">
            <div className="text-xs mb-3" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-cyan)' }}>
              ▸ at_a_glance
            </div>
            <div className="space-y-2">
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
        className="text-xs font-bold uppercase tracking-wider mb-2 pb-1"
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
    <div className="flex gap-2 text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
      <span className="shrink-0 w-20" style={{ color: 'var(--text-muted)' }}>{label}:</span>
      <span style={{ color: 'var(--text-secondary)' }}>{skills.join(', ')}</span>
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

const glanceStats = [
  { label: 'CGPA', value: '9.1 / 10', color: 'var(--terminal-green)' },
  { label: 'Internships', value: '2 (Google, Flipkart)', color: 'var(--terminal-cyan)' },
  { label: 'Projects', value: '20+', color: 'var(--terminal-blue)' },
  { label: 'OSS PRs', value: '47 merged', color: 'var(--terminal-purple)' },
  { label: 'LeetCode', value: '450+ solved', color: 'var(--terminal-green)' },
  { label: 'CF Rating', value: '1847 (Expert)', color: 'var(--terminal-cyan)' },
];

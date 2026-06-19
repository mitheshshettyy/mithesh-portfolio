import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { educationData, personalInfo } from '../data/portfolioData';

export default function Education() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current) return;
    const els = pageRef.current.querySelectorAll('.reveal');
    gsap.fromTo(els,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out', delay: 0.15 }
    );
  }, []);

  return (
    <div ref={pageRef} className="desktop-container py-16 space-y-16">
      {/* Header */}
      <div className="reveal space-y-4">
        <Breadcrumb path="education" />
        <h1 className="text-3xl sm:text-4xl font-extrabold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
          cat <span style={{ color: 'var(--terminal-green)' }}>education.log</span>
        </h1>
        <p className="text-sm leading-relaxed" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          # Academic path, coursework, achievements, and professional certifications
        </p>
      </div>

      {/* Two-Column Grid for Timeline + Achievements/Certifications */}
      <div className="reveal grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Academic History (Timeline) (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          <h2 className="text-xl font-bold border-b border-gray-800 pb-2 text-terminal-green" style={{ fontFamily: 'var(--font-mono)' }}>
            :: Academic History
          </h2>
          <div className="relative pl-8 border-l border-gray-800 space-y-12">
            {educationData.map((edu) => (
              <div key={edu.id} className="relative space-y-3">
                {/* Timeline marker */}
                <div
                  className="absolute -left-[38px] top-1.5 w-4.5 h-4.5 rounded-full border-2 bg-primary flex items-center justify-center"
                  style={{
                    borderColor: edu.status === 'Current' ? 'var(--terminal-green)' : 'var(--text-muted)',
                    boxShadow: edu.status === 'Current' ? '0 0 12px var(--terminal-green)' : 'none',
                  }}
                >
                  {edu.status === 'Current' && (
                    <span className="w-2 h-2 rounded-full" style={{ background: 'var(--terminal-green)' }} />
                  )}
                </div>

                {/* Card Container */}
                <div className="terminal-card p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-1">
                      <span
                        className="text-[0.65rem] font-bold px-2 py-0.5 rounded uppercase"
                        style={{
                          fontFamily: 'var(--font-mono)',
                          background: edu.status === 'Current' ? 'rgba(0,255,136,0.08)' : 'rgba(255,255,255,0.05)',
                          color: edu.status === 'Current' ? 'var(--terminal-green)' : 'var(--text-muted)',
                          border: `1px solid ${edu.status === 'Current' ? 'rgba(0,255,136,0.2)' : 'rgba(255,255,255,0.1)'}`,
                        }}
                      >
                        {edu.status}
                      </span>
                      <h3 className="text-lg font-bold pt-1" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                        {edu.institution}
                      </h3>
                      <div className="text-sm font-semibold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-cyan)' }}>
                        {edu.degree} — {edu.field}
                      </div>
                    </div>

                    {/* CGPA Badge */}
                    <div
                      className="p-3 rounded-lg text-center shrink-0 w-24"
                      style={{
                        background: 'rgba(0,255,136,0.04)',
                        border: '1px solid rgba(0,255,136,0.15)',
                      }}
                    >
                      <div className="text-lg font-bold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-green)' }}>
                        {'cgpa' in edu ? edu.cgpa : edu.score}
                      </div>
                      <div className="text-[0.6rem] uppercase tracking-wider text-muted-custom" style={{ color: 'var(--text-muted)' }}>
                        {'cgpa' in edu ? 'CGPA' : 'Score'}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    <span>📍 {edu.location}</span>
                    <span>📅 {edu.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Achievements & Certifications (5 cols) */}
        <div className="lg:col-span-5 space-y-12">
          {/* SECTION: CERTIFICATIONS */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold border-b border-gray-800 pb-2 text-terminal-green" style={{ fontFamily: 'var(--font-mono)' }}>
              :: Certifications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
              {certifications.map((cert, i) => (
                <div
                  key={i}
                  className="terminal-card p-5 space-y-2 h-full flex flex-col justify-between"
                  style={{
                    borderColor: 'rgba(0,212,255,0.15)',
                    background: 'rgba(0,212,255,0.02)',
                  }}
                >
                  <h3 className="text-xs font-bold leading-normal flex-1" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                    {cert.name}
                  </h3>
                  <div className="flex justify-between text-[0.65rem] pt-2" style={{ fontFamily: 'var(--font-mono)' }}>
                    <span style={{ color: 'var(--terminal-cyan)' }}>{cert.issuer}</span>
                    <span style={{ color: 'var(--text-muted)' }}>{cert.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION: ACHIEVEMENTS */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold border-b border-gray-800 pb-2 text-terminal-green" style={{ fontFamily: 'var(--font-mono)' }}>
              :: Key Academic Achievements
            </h2>
            <div className="terminal-card p-6 space-y-4">
              <div className="grid grid-cols-1 gap-3.5" style={{ fontFamily: 'var(--font-mono)' }}>
                {academicAchievements.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded"
                    style={{
                      background: 'rgba(0, 255, 136, 0.02)',
                      border: '1px solid rgba(0, 255, 136, 0.06)',
                    }}
                  >
                    <span style={{ color: 'var(--terminal-green)', fontSize: '0.85rem' }}>✓</span>
                    <span className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION: COURSEWORK (Full Width Bottom) */}
      <div className="reveal space-y-6">
        <h2 className="text-xl font-bold border-b border-gray-800 pb-2 text-terminal-green" style={{ fontFamily: 'var(--font-mono)' }}>
          :: Relevant Coursework
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {allCoursework.map((course) => (
            <div
              key={course}
              className="p-3 rounded border"
              style={{
                fontFamily: 'var(--font-mono)',
                borderColor: 'rgba(255,255,255,0.05)',
                background: 'rgba(255,255,255,0.01)',
              }}
            >
              <div className="text-xs text-secondary-custom" style={{ color: 'var(--text-secondary)' }}>
                → {course}
              </div>
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

const certifications = [
  { name: 'MERN Stack Web Development', issuer: 'Full-Stack Developer Focus', year: '2025' },
  { name: 'Next.js & React Frontend Engineering', issuer: 'Web Architecture Focus', year: '2025' },
  { name: 'FastAPI & Node.js Backend Development', issuer: 'API Design Focus', year: '2026' },
  { name: 'Three.js 3D Graphics & Animations', issuer: 'Interactive UI Focus', year: '2025' },
  { name: 'MongoDB & MySQL Database Design', issuer: 'Database Systems Focus', year: '2026' },
];

const allCoursework = [
  'Data Structures & Algorithms',
  'Database Management Systems',
  'Object Oriented Programming',
  'Web Development',
  'Software Engineering',
  'Computer Networks',
  'Operating Systems',
  'System Design'
];

const academicAchievements = [
  "Graduating with B.Tech in CSE — NMAM Institute of Technology",
  "Maintained a strong CGPA of 8.69 / 10.0 in Computer Science",
  "Pre-University Distinction — 94.5% Board Examination Score",
  "Completed Full Stack Internship at ALGOORBIT Innovations",
  "Developed Complexify: AI Code Complexity Classifier",
  "Developed Virtual Garden: 3D interactive plant platform"
];

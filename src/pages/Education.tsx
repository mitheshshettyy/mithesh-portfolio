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
    <div ref={pageRef} className="desktop-container py-[24px] px-[24px] flex flex-col gap-[18px]">
      <div className="reveal flex flex-col gap-[8px]">
        <Breadcrumb path="education" />
        <h1 className="text-3xl sm:text-4xl font-extrabold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
          cat <span style={{ color: 'var(--terminal-green)' }}>education.log</span>
        </h1>
        <p className="text-sm leading-relaxed" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          # Academic background and coursework
        </p>
      </div>

      <div className="reveal flex flex-col gap-[12px]">
        <h2 className="text-xl font-bold border-b border-gray-800 pb-2 text-terminal-green" style={{ fontFamily: 'var(--font-mono)' }}>
          :: Academic History
        </h2>
        <div className="relative pl-8 border-l border-gray-800 flex flex-col gap-[18px]">
          {educationData.map((edu) => (
            <div key={edu.id} className="relative flex flex-col gap-[8px]">
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

              <div className="terminal-card p-[18px] flex flex-col gap-[12px]">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-[16px]">
                  <div className="flex flex-col gap-[4px]">
                    <span
                      className="text-[0.65rem] font-bold px-2 py-0.5 rounded uppercase w-fit"
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

                  <div
                    className="p-[12px] rounded-lg text-center shrink-0 min-w-[130px] flex flex-col justify-center items-center"
                    style={{
                      background: 'rgba(0,255,136,0.04)',
                      border: '1px solid rgba(0,255,136,0.15)',
                    }}
                  >
                    <div
                      className="text-lg font-bold"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--terminal-green)',
                        whiteSpace: 'nowrap',
                      }}
                    >
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

      <div className="reveal flex flex-col gap-[12px]">
        <h2 className="text-xl font-bold border-b border-gray-800 pb-2 text-terminal-green" style={{ fontFamily: 'var(--font-mono)' }}>
          :: Relevant Coursework
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-[12px]">
          {allCoursework.map((course) => (
            <div
              key={course}
              className="p-[12px] rounded border"
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

const allCoursework = [
  'Data Structures & Algorithms',
  'Database Management Systems',
  'Object-Oriented Programming',
  'Web Development',
  'Software Engineering',
  'Computer Networks',
  'Operating Systems',
  'System Design'
];

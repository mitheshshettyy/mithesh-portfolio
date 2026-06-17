import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { educationData } from '../data/portfolioData';

export default function Education() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current) return;
    const els = pageRef.current.querySelectorAll('.reveal');
    gsap.fromTo(els,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  return (
    <div ref={pageRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="reveal mb-10">
        <Breadcrumb path="education" />
        <h1 className="text-3xl sm:text-4xl font-bold mt-4 mb-2" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
          cat{' '}<span style={{ color: 'var(--terminal-green)' }}>education.log</span>
        </h1>
        <p className="text-sm" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          # Academic background and formal training
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div
          className="absolute left-4 top-0 bottom-0 w-px"
          style={{ background: 'linear-gradient(to bottom, var(--terminal-green), transparent)', opacity: 0.3 }}
        />

        <div className="space-y-8">
          {educationData.map((edu) => (
            <div key={edu.id} className="reveal relative pl-12">
              {/* Timeline dot */}
              <div
                className="absolute left-2.5 top-6 w-3 h-3 rounded-full border-2 transform -translate-x-1/2"
                style={{
                  background: edu.status === 'Current' ? 'var(--terminal-green)' : 'var(--bg-secondary)',
                  borderColor: edu.status === 'Current' ? 'var(--terminal-green)' : 'var(--text-muted)',
                  boxShadow: edu.status === 'Current' ? '0 0 10px var(--terminal-green)' : 'none',
                }}
              />

              <div className="terminal-card p-6">
                {/* Status badge */}
                <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-xs px-2 py-0.5 rounded"
                        style={{
                          fontFamily: 'var(--font-mono)',
                          background: edu.status === 'Current' ? 'rgba(0,255,136,0.12)' : 'rgba(255,255,255,0.05)',
                          color: edu.status === 'Current' ? 'var(--terminal-green)' : 'var(--text-muted)',
                          border: `1px solid ${edu.status === 'Current' ? 'rgba(0,255,136,0.3)' : 'rgba(255,255,255,0.1)'}`,
                        }}
                      >
                        {edu.status}
                      </span>
                      <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                        {edu.duration}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                      {edu.institution}
                    </h2>
                    <div className="text-sm" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-cyan)' }}>
                      {edu.degree} — {edu.field}
                    </div>
                  </div>

                  {/* Score */}
                  <div
                    className="text-right p-3 rounded-lg"
                    style={{
                      background: 'rgba(0,255,136,0.06)',
                      border: '1px solid rgba(0,255,136,0.15)',
                    }}
                  >
                    <div className="text-xl font-bold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-green)' }}>
                      {'cgpa' in edu ? edu.cgpa : edu.score}
                    </div>
                    <div className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                      {'cgpa' in edu ? 'CGPA' : 'Score'}
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="text-xs mb-4" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  📍 {edu.location}
                </div>

                {/* Highlights */}
                {edu.highlights.length > 0 && (
                  <div className="mb-4">
                    <div className="text-xs mb-2" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-cyan)' }}>
                      ▸ highlights
                    </div>
                    <div className="space-y-1.5">
                      {edu.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-xs mt-0.5" style={{ color: 'var(--terminal-green)' }}>✓</span>
                          <span className="text-sm" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                            {h}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Coursework */}
                {edu.coursework.length > 0 && (
                  <div>
                    <div className="text-xs mb-2" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-cyan)' }}>
                      ▸ relevant_coursework
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {edu.coursework.map((course) => (
                        <span key={course} className="tech-tag" style={{ fontSize: '0.65rem' }}>
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications & Achievements */}
      <div className="reveal mt-10">
        <div className="terminal-card p-6">
          <div className="text-xs mb-5" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-cyan)' }}>
            ▸ certifications_and_achievements
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {certifications.map((cert, i) => (
              <div
                key={i}
                className="p-4 rounded-lg"
                style={{
                  background: 'rgba(0,212,255,0.04)',
                  border: '1px solid rgba(0,212,255,0.12)',
                }}
              >
                <div className="text-sm font-semibold mb-1" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                  {cert.name}
                </div>
                <div className="text-xs mb-1" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-cyan)' }}>
                  {cert.issuer}
                </div>
                <div className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  {cert.year}
                </div>
              </div>
            ))}
          </div>
        </div>
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

const certifications = [
  { name: 'AWS Solutions Architect – Associate', issuer: 'Amazon Web Services', year: '2024' },
  { name: 'Google Cloud Professional Data Engineer', issuer: 'Google Cloud', year: '2024' },
  { name: 'Kubernetes Administrator (CKA)', issuer: 'CNCF / Linux Foundation', year: '2023' },
  { name: 'Meta Backend Developer', issuer: 'Coursera / Meta', year: '2023' },
  { name: 'Deep Learning Specialization', issuer: 'Coursera / DeepLearning.AI', year: '2022' },
  { name: 'Competitive Programming — Expert', issuer: 'Codeforces (Rating: 1847)', year: '2024' },
];

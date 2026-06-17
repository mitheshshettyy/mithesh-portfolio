import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { personalInfo } from '../data/portfolioData';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface SubmitState {
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

export default function Contact() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' });
  const [submitState, setSubmitState] = useState<SubmitState>({ status: 'idle', message: '' });
  const [focused, setFocused] = useState<string | null>(null);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);

  useEffect(() => {
    if (!pageRef.current) return;
    const els = pageRef.current.querySelectorAll('.reveal');
    gsap.fromTo(els,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  const handleChange = (field: keyof FormState, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const addTerminalLine = (line: string) => {
    setTerminalOutput(prev => [...prev, line]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!form.name || !form.email || !form.message) {
      setSubmitState({ status: 'error', message: 'Please fill all required fields.' });
      addTerminalLine('✗ Error: Missing required fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setSubmitState({ status: 'error', message: 'Invalid email address.' });
      addTerminalLine('✗ Error: Invalid email format');
      return;
    }

    setSubmitState({ status: 'loading', message: '' });
    addTerminalLine(`$ POST /api/contact`);
    addTerminalLine(`  Payload: { name: "${form.name}", email: "${form.email}" }`);
    addTerminalLine(`  Sending request...`);

    // Simulate API call (backend would handle this)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate success (in production, this would be a real API call)
    addTerminalLine(`  Status: 200 OK`);
    addTerminalLine(`  Response: { success: true, id: "msg_${Date.now()}" }`);
    addTerminalLine(`✓ Message delivered successfully!`);

    setSubmitState({
      status: 'success',
      message: 'Message sent! I\'ll get back to you within 24 hours.',
    });

    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div ref={pageRef} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="reveal mb-10">
        <Breadcrumb path="contact" />
        <h1 className="text-3xl sm:text-4xl font-bold mt-4 mb-2" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
          init{' '}<span style={{ color: 'var(--terminal-green)' }}>connection</span>
          <span style={{ color: 'var(--text-muted)' }}>();</span>
        </h1>
        <p className="text-sm" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          # Open to opportunities, collaborations, and interesting conversations
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Contact Form */}
        <div className="lg:col-span-3">
          <div className="reveal terminal-card p-6">
            {/* Terminal header */}
            <div className="flex items-center gap-3 mb-6 pb-4" style={{ borderBottom: '1px solid rgba(0,255,136,0.1)' }}>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff5f57' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#febc2e' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#28c840' }} />
              </div>
              <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                contact_form.sh — bash
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <FormField
                label="name *"
                type="text"
                value={form.name}
                onChange={(v) => handleChange('name', v)}
                placeholder="Your full name"
                focused={focused === 'name'}
                onFocus={() => setFocused('name')}
                onBlur={() => setFocused(null)}
              />

              {/* Email */}
              <FormField
                label="email *"
                type="email"
                value={form.email}
                onChange={(v) => handleChange('email', v)}
                placeholder="you@example.com"
                focused={focused === 'email'}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
              />

              {/* Subject */}
              <FormField
                label="subject"
                type="text"
                value={form.subject}
                onChange={(v) => handleChange('subject', v)}
                placeholder="What's this about?"
                focused={focused === 'subject'}
                onFocus={() => setFocused('subject')}
                onBlur={() => setFocused(null)}
              />

              {/* Message */}
              <div>
                <label className="block text-xs mb-1.5" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  <span style={{ color: 'var(--terminal-green)' }}>$</span> message *
                </label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                  placeholder="Tell me what's on your mind..."
                  className="w-full resize-none rounded px-3 py-2.5 text-sm transition-all duration-200"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    background: 'rgba(0,0,0,0.3)',
                    border: `1px solid ${focused === 'message' ? 'rgba(0,255,136,0.4)' : 'rgba(255,255,255,0.08)'}`,
                    color: 'var(--text-primary)',
                    outline: 'none',
                    boxShadow: focused === 'message' ? '0 0 10px rgba(0,255,136,0.1)' : 'none',
                  }}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitState.status === 'loading'}
                className="w-full py-3 rounded text-sm font-medium transition-all duration-200"
                style={{
                  fontFamily: 'var(--font-mono)',
                  background: submitState.status === 'loading'
                    ? 'rgba(0,255,136,0.1)'
                    : 'rgba(0,255,136,0.12)',
                  border: '1px solid rgba(0,255,136,0.35)',
                  color: 'var(--terminal-green)',
                  cursor: submitState.status === 'loading' ? 'not-allowed' : 'pointer',
                }}
                onMouseEnter={(e) => {
                  if (submitState.status !== 'loading') {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(0,255,136,0.2)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(0,255,136,0.2)';
                  }
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(0,255,136,0.12)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                {submitState.status === 'loading' ? '$ sending...' : '$ send_message --async'}
              </button>

              {/* Status */}
              {submitState.status === 'success' && (
                <div
                  className="p-3 rounded text-xs"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    background: 'rgba(0,255,136,0.08)',
                    border: '1px solid rgba(0,255,136,0.25)',
                    color: 'var(--terminal-green)',
                  }}
                >
                  ✓ {submitState.message}
                </div>
              )}
              {submitState.status === 'error' && (
                <div
                  className="p-3 rounded text-xs"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    background: 'rgba(255,71,87,0.08)',
                    border: '1px solid rgba(255,71,87,0.25)',
                    color: 'var(--terminal-red)',
                  }}
                >
                  ✗ {submitState.message}
                </div>
              )}
            </form>
          </div>

          {/* Terminal Output Preview */}
          {terminalOutput.length > 0 && (
            <div
              className="reveal mt-4 terminal-card p-4"
              style={{ background: 'rgba(0,0,0,0.5)' }}
            >
              <div className="text-xs mb-2" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                request_log.txt
              </div>
              {terminalOutput.map((line, i) => (
                <div
                  key={i}
                  className="text-xs leading-relaxed"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    color: line.startsWith('✓') ? 'var(--terminal-green)'
                      : line.startsWith('✗') ? 'var(--terminal-red)'
                        : line.startsWith('$') ? 'var(--terminal-cyan)'
                          : 'var(--text-muted)',
                  }}
                >
                  {line}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div className="lg:col-span-2 space-y-4">
          {/* Direct Contact */}
          <div className="reveal terminal-card p-5">
            <div className="text-xs mb-4" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-cyan)' }}>
              ▸ direct_contact
            </div>
            <div className="space-y-4">
              <ContactItem
                icon="📧"
                label="Email"
                value={personalInfo.email}
                href={`mailto:${personalInfo.email}`}
                note="Best for opportunities"
              />
              <ContactItem
                icon="🐙"
                label="GitHub"
                value="@alexchen-dev"
                href={personalInfo.github}
                note="Code & projects"
              />
              <ContactItem
                icon="💼"
                label="LinkedIn"
                value="in/alexchen-cs"
                href={personalInfo.linkedin}
                note="Professional network"
              />
              <ContactItem
                icon="🐦"
                label="Twitter"
                value="@alexchen_dev"
                href={personalInfo.twitter}
                note="Dev thoughts"
              />
            </div>
          </div>

          {/* Response Time */}
          <div
            className="reveal terminal-card p-5"
            style={{ background: 'rgba(0,255,136,0.04)', border: '1px solid rgba(0,255,136,0.15)' }}
          >
            <div className="text-xs mb-3" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-green)' }}>
              ▸ response_sla
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>Email</span>
                <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-green)' }}>{'< 24h'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>LinkedIn DM</span>
                <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-cyan)' }}>{'< 48h'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>Contact Form</span>
                <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-cyan)' }}>{'< 48h'}</span>
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="reveal terminal-card p-5">
            <div className="text-xs mb-3" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-cyan)' }}>
              ▸ availability
            </div>
            <div className="flex items-center gap-2 mb-3">
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: 'var(--terminal-green)', boxShadow: '0 0 6px var(--terminal-green)' }}
              />
              <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-green)' }}>
                Open to Opportunities
              </span>
            </div>
            <div className="space-y-1.5">
              {[
                'Full-time SDE roles (May 2025)',
                'ML / AI Engineering',
                'Research collaborations',
                'Open source projects',
                'Technical consulting',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>→</span>
                  <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* PGP / Security note */}
          <div className="reveal terminal-card p-5">
            <div className="text-xs mb-2" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-cyan)' }}>
              ▸ security
            </div>
            <div className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              PGP key available on request for secure communications.
            </div>
            <div className="text-xs mt-1" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              Fingerprint: <span style={{ color: 'var(--terminal-green)', fontSize: '0.65rem' }}>A3F9...C21E</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormField({
  label, type, value, onChange, placeholder, focused, onFocus, onBlur,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  focused: boolean;
  onFocus: () => void;
  onBlur: () => void;
}) {
  return (
    <div>
      <label className="block text-xs mb-1.5" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
        <span style={{ color: 'var(--terminal-green)' }}>$</span> {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        className="w-full rounded px-3 py-2.5 text-sm transition-all duration-200"
        style={{
          fontFamily: 'var(--font-mono)',
          background: 'rgba(0,0,0,0.3)',
          border: `1px solid ${focused ? 'rgba(0,255,136,0.4)' : 'rgba(255,255,255,0.08)'}`,
          color: 'var(--text-primary)',
          outline: 'none',
          boxShadow: focused ? '0 0 10px rgba(0,255,136,0.1)' : 'none',
        }}
      />
    </div>
  );
}

function ContactItem({
  icon, label, value, href,
}: { icon: string; label: string; value: string; href: string; note?: string }) {
  return (
    <a
      href={href}
      target={href.startsWith('mailto') ? undefined : '_blank'}
      rel="noopener noreferrer"
      className="flex items-center gap-3 group"
    >
      <span className="text-base">{icon}</span>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-medium" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
          {label}
        </div>
        <div
          className="text-xs truncate transition-colors"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
        >
          {value}
        </div>
      </div>
      <div className="text-xs shrink-0" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontSize: '0.6rem' }}>
        ↗
      </div>
    </a>
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

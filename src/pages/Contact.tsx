import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { personalInfo, socialLinks } from '../data/portfolioData';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setSubmitState({ status: 'error', message: 'Please fill all required fields.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setSubmitState({ status: 'error', message: 'Invalid email address.' });
      return;
    }

    setSubmitState({ status: 'loading', message: '' });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setSubmitState({
      status: 'success',
      message: 'Message sent! I\'ll get back to you within 24 hours.',
    });

    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div ref={pageRef} className="desktop-container py-12">
      {/* Header */}
      <div className="reveal mb-12">
        <Breadcrumb path="contact" />
        <h1 className="text-3xl sm:text-4xl font-bold mt-4 mb-2" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
          init{' '}<span style={{ color: 'var(--terminal-green)' }}>connection</span>
          <span style={{ color: 'var(--text-muted)' }}>();</span>
        </h1>
        <p className="text-sm" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          # Open to opportunities, collaborations, and interesting conversations
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8 items-stretch">
        {/* Contact Form - Left Column */}
        <div className="lg:col-span-3 h-full">
          <div className="reveal terminal-card p-6 h-full">
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
        </div>

        {/* Contact Details - Right Column */}
        <div className="lg:col-span-2 h-full">
          <div className="reveal terminal-card p-6 h-full">
            <div className="text-xs mb-4 uppercase tracking-wider font-bold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-cyan)' }}>
              ▸ contact_details
            </div>
            <div className="space-y-4">
              <ContactItem
                icon="📧"
                label="Email"
                value={personalInfo.email}
                href={`mailto:${personalInfo.email}`}
              />
              <ContactItem
                icon="🐙"
                label="GitHub"
                value={socialLinks.github.handle}
                href={personalInfo.github}
              />
              <ContactItem
                icon="💼"
                label="LinkedIn"
                value={socialLinks.linkedin.handle}
                href={personalInfo.linkedin}
              />
              <ContactItem
                icon="📍"
                label="Location"
                value={personalInfo.location}
                href={`https://maps.google.com/?q=${encodeURIComponent(personalInfo.location)}`}
              />
              <ContactItem
                icon="🟢"
                label="Availability"
                value={personalInfo.availability}
                href="#"
                isLink={false}
              />
              <ContactItem
                icon="📄"
                label="Resume"
                value="View / Download Resume PDF"
                href="/resume"
                isLink={true}
              />
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
  icon, label, value, href, isLink = true,
}: { icon: string; label: string; value: string; href: string; isLink?: boolean }) {
  const content = (
    <div className="flex items-center gap-3 py-1 group">
      <span className="text-base shrink-0">{icon}</span>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-semibold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
          {label}
        </div>
        <div
          className="text-xs truncate transition-colors duration-200 group-hover:text-emerald-400"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
        >
          {value}
        </div>
      </div>
      {isLink && href !== '#' && (
        <div className="text-xs shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontSize: '0.65rem' }}>
          ↗
        </div>
      )}
    </div>
  );

  if (isLink && href !== '#') {
    const isExternal = href.startsWith('http') || href.startsWith('mailto');
    return (
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className="block cursor-pointer"
      >
        {content}
      </a>
    );
  }

  return <div>{content}</div>;
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

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { personalInfo, socialLinks } from '../data/portfolioData';
import config from '../config';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface SubmitState {
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

// Client-side validation — mirrors server rules
function validateForm(form: FormState): FieldErrors {
  const errors: FieldErrors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!form.name.trim()) errors.name = 'Name is required.';
  if (!form.email.trim()) errors.email = 'Email is required.';
  else if (!emailRegex.test(form.email)) errors.email = 'Enter a valid email address.';
  if (!form.subject.trim()) errors.subject = 'Subject is required.';
  if (!form.message.trim()) errors.message = 'Message is required.';
  else if (form.message.trim().length < 10) errors.message = 'Message must be at least 10 characters.';

  return errors;
}

export default function Contact() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>({ status: 'idle', message: '' });
  const [focused, setFocused] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

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
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    const errors = validateForm(form);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setSubmitting(true);
    setSubmitState({ status: 'loading', message: '' });

    try {
      const res = await fetch(`${config.backend.apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitState({
          status: 'success',
          message: data.message || "Message sent successfully! I'll get back to you within 24 hours.",
        });
        setForm({ name: '', email: '', subject: '', message: '' });
      } else if (res.status === 400 && data.fields) {
        setFieldErrors(data.fields);
        setSubmitState({ status: 'error', message: 'Please fix the errors below.' });
      } else if (res.status === 429) {
        setSubmitState({
          status: 'error',
          message: data.error || 'Too many requests. Please wait before trying again.',
        });
      } else {
        setSubmitState({
          status: 'error',
          message: data.error || 'Failed to send message. Please try again.',
        });
      }
    } catch {
      setSubmitState({
        status: 'error',
        message: 'Network error. Please check your connection and try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const isLoading = submitState.status === 'loading';

  return (
    <div ref={pageRef} className="desktop-container py-10 flex justify-center">
      <div className="w-full max-w-[1200px] flex flex-col gap-10">
        <div className="reveal">
          <Breadcrumb path="contact" />
          <h1 className="text-3xl sm:text-4xl font-bold mt-4 mb-2" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
            init{' '}<span style={{ color: 'var(--terminal-green)' }}>connection</span>
            <span style={{ color: 'var(--text-muted)' }}>();</span>
          </h1>
          <p className="text-sm" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
            # Open to opportunities, collaborations, and interesting conversations
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-3">
            <div className="reveal terminal-card p-6">
              <div className="flex items-center gap-3 mb-6 pb-4" style={{ borderBottom: '1px solid rgba(0,255,136,0.1)' }}>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff5f57' }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#febc2e' }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#28c840' }} />
                </div>
                <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  new_message.sh
                </span>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField
                    id="contact-name"
                    name="name"
                    label="name *"
                    type="text"
                    value={form.name}
                    onChange={(v) => handleChange('name', v)}
                    placeholder="Your name"
                    focused={focused === 'name'}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                    error={fieldErrors.name}
                    disabled={isLoading}
                  />
                  <FormField
                    id="contact-email"
                    name="email"
                    label="email *"
                    type="email"
                    value={form.email}
                    onChange={(v) => handleChange('email', v)}
                    placeholder="your@email.com"
                    focused={focused === 'email'}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    error={fieldErrors.email}
                    disabled={isLoading}
                  />
                </div>

                <FormField
                  id="contact-subject"
                  name="subject"
                  label="subject *"
                  type="text"
                  value={form.subject}
                  onChange={(v) => handleChange('subject', v)}
                  placeholder="Internship opportunity, collaboration, project inquiry..."
                  focused={focused === 'subject'}
                  onFocus={() => setFocused('subject')}
                  onBlur={() => setFocused(null)}
                  error={fieldErrors.subject}
                  disabled={isLoading}
                />

                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-message" className="block text-xs mb-0.5" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    <span style={{ color: 'var(--terminal-green)' }}>$</span> message *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    placeholder="Tell me about the opportunity, project, or just say hi..."
                    disabled={isLoading}
                    className="w-full resize-none rounded px-3 py-2.5 text-sm transition-all duration-200"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      background: 'rgba(0,0,0,0.3)',
                      border: `1px solid ${fieldErrors.message
                          ? 'rgba(255,71,87,0.5)'
                          : focused === 'message'
                            ? 'rgba(0,255,136,0.4)'
                            : 'rgba(255,255,255,0.08)'
                        }`,
                      color: 'var(--text-primary)',
                      outline: 'none',
                      boxShadow: focused === 'message' ? '0 0 10px rgba(0,255,136,0.1)' : 'none',
                      lineHeight: '1.6',
                      opacity: isLoading ? 0.6 : 1,
                    }}
                  />
                  <div className="flex justify-between items-start text-[10px] px-0.5" style={{ fontFamily: 'var(--font-mono)' }}>
                    <span style={{ color: 'var(--terminal-red)' }}>{fieldErrors.message || ''}</span>
                    <span style={{ color: 'var(--text-muted)' }}>{form.message.length} chars</span>
                  </div>
                </div>

                <div className="pt-1">
                  <button
                    id="contact-submit"
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2.5 rounded text-sm font-medium transition-all duration-200 w-fit flex items-center gap-2"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      background: isLoading ? 'rgba(0,255,136,0.05)' : 'rgba(0,255,136,0.08)',
                      border: '1px solid rgba(0,255,136,0.35)',
                      color: 'var(--terminal-green)',
                      cursor: isLoading ? 'not-allowed' : 'pointer',
                      opacity: isLoading ? 0.8 : 1,
                    }}
                    onMouseEnter={(e) => {
                      if (!isLoading) {
                        (e.currentTarget as HTMLElement).style.background = 'rgba(0,255,136,0.18)';
                        (e.currentTarget as HTMLElement).style.boxShadow = '0 0 15px rgba(0,255,136,0.2)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(0,255,136,0.08)';
                      (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                    }}
                  >
                    {isLoading ? (
                      <>
                        <Spinner />
                        <span>Sending...</span>
                      </>
                    ) : (
                      '+ Send Message'
                    )}
                  </button>
                </div>

                {submitState.status === 'success' && (
                  <div
                    className="p-3 rounded text-xs"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      background: 'rgba(0,0,0,0.2)',
                      border: '1px solid rgba(0,255,136,0.25)',
                      color: 'var(--terminal-green)',
                    }}
                  >
                    ✓ {submitState.message}
                  </div>
                )}
                {submitState.status === 'error' && !Object.values(fieldErrors).some(Boolean) && (
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

          <div className="lg:col-span-2 flex flex-col gap-4 w-full">
            <div className="reveal terminal-card p-6 w-full">
              <div className="text-xs mb-4 tracking-wider font-bold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-green)' }}>
                // reach_me
              </div>
              <div className="space-y-3">
                <ContactItem
                  icon={<FiGithub size={16} strokeWidth={1.8} />}
                  label="GitHub"
                  value={socialLinks.github.handle}
                  href={personalInfo.github}
                />
                <ContactItem
                  icon={<FiLinkedin size={16} strokeWidth={1.8} />}
                  label="LinkedIn"
                  value={socialLinks.linkedin.handle}
                  href={personalInfo.linkedin}
                />
                <ContactItem
                  icon={<FiMail size={16} strokeWidth={1.8} />}
                  label="Email"
                  value={personalInfo.email}
                  href={`mailto:${personalInfo.email}`}
                />
              </div>
            </div>

            <div className="reveal terminal-card p-6 w-full">
              <div className="text-xs mb-4 tracking-wider font-bold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-green)' }}>
                // response_time
              </div>
              <div className="flex flex-col gap-0">
                <div className="flex justify-between items-center text-xs font-mono py-1.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Email / Form</span>
                  <span style={{ color: 'var(--terminal-green)' }}>~ 24 hrs</span>
                </div>
                <div className="flex justify-between items-center text-xs font-mono py-1.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>LinkedIn DM</span>
                  <span style={{ color: 'var(--terminal-green)' }}>~ 48 hrs</span>
                </div>
                <div className="flex justify-between items-center text-xs font-mono py-1.5">
                  <span style={{ color: 'var(--text-secondary)' }}>Timezone</span>
                  <span style={{ color: 'var(--text-muted)' }}>IST (UTC+5:30)</span>
                </div>
              </div>
            </div>

            <div className="reveal terminal-card p-6 w-full">
              <div className="text-xs mb-4 tracking-wider font-bold flex items-center gap-2" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-green)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                <span>Currently available</span>
              </div>
              <p className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', lineHeight: '1.65' }}>
                Open to internship and software engineering opportunities and project collaborations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <svg
      width="14" height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ animation: 'spin 0.8s linear infinite' }}
    >
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

function FormField({
  id, name, label, type, value, onChange, placeholder, focused, onFocus, onBlur, error, disabled,
}: {
  id: string;
  name?: string;
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  focused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  error?: string;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="block text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
        <span style={{ color: 'var(--terminal-green)' }}>$</span> {label}
      </label>
      <input
        id={id}
        name={name || id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full rounded px-3 py-2.5 text-sm transition-all duration-200"
        style={{
          fontFamily: 'var(--font-mono)',
          background: 'rgba(0,0,0,0.3)',
          border: `1px solid ${error
              ? 'rgba(255,71,87,0.5)'
              : focused
                ? 'rgba(0,255,136,0.4)'
                : 'rgba(255,255,255,0.08)'
            }`,
          color: 'var(--text-primary)',
          outline: 'none',
          boxShadow: focused ? '0 0 10px rgba(0,255,136,0.1)' : 'none',
          opacity: disabled ? 0.6 : 1,
        }}
      />
      {error && (
        <span className="text-[10px] px-0.5" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-red)' }}>
          {error}
        </span>
      )}
    </div>
  );
}

function ContactItem({
  icon, label, value, href, isLink = true,
}: { icon: React.ReactNode; label: string; value: string; href: string; isLink?: boolean }) {
  const content = (
    <div className="flex items-center gap-3 py-1 group">
      <span className="shrink-0 transition-colors duration-200 group-hover:text-emerald-400" style={{ color: 'var(--text-secondary)' }}>{icon}</span>
      <div className="flex-1 min-w-0">
        <div className="text-xs mb-0.5" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
          {label}
        </div>
        <div
          className="text-xs font-semibold truncate transition-colors duration-200 group-hover:text-emerald-400"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}
        >
          {value}
        </div>
      </div>
      {isLink && href !== '#' && (
        <div className="text-xs shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          →
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

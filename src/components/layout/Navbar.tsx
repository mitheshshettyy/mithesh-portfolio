import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { personalInfo } from '../../data/portfolioData';

const navItems = [
  { label: 'Home', path: '/', icon: '~' },
  { label: 'About', path: '/about', icon: '01' },
  { label: 'Education', path: '/education', icon: '02' },
  { label: 'Skills', path: '/skills', icon: '03' },
  { label: 'Projects', path: '/projects', icon: '04' },
  { label: 'Experience', path: '/experience', icon: '05' },
  { label: 'Contact', path: '/contact', icon: '06' },
  { label: 'Resume', path: '/resume', icon: '07' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [time, setTime] = useState('');
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Time display
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scroll effect
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP entrance
  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(navRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      );
    }
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (mobileOpen) {
        gsap.fromTo(mobileMenuRef.current,
          { opacity: 0, y: -20, scaleY: 0.95 },
          { opacity: 1, y: 0, scaleY: 1, duration: 0.3, ease: 'power2.out', transformOrigin: 'top' }
        );
      } else {
        gsap.to(mobileMenuRef.current, { opacity: 0, y: -10, duration: 0.2, ease: 'power2.in' });
      }
    }
  }, [mobileOpen]);

  const handleNavClick = (path: string) => {
    setMobileOpen(false);
    navigate(path);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? 'rgba(8, 12, 24, 0.95)'
            : 'rgba(8, 12, 24, 0.7)',
          backdropFilter: 'blur(16px)',
          borderBottom: scrolled
            ? '1px solid rgba(0, 255, 136, 0.15)'
            : '1px solid rgba(0, 255, 136, 0.06)',
          boxShadow: scrolled ? '0 4px 30px rgba(0, 0, 0, 0.5)' : 'none',
        }}
      >
        <div className="desktop-container">
          <div className="flex items-center justify-between h-14">

            {/* Logo / Prompt */}
            <button
              onClick={() => handleNavClick('/')}
              className="flex items-center gap-2 group"
            >
              <span style={{ color: 'var(--terminal-green)', fontFamily: 'var(--font-mono)' }} className="text-sm font-bold">
                {personalInfo.prompt}
              </span>
              <span style={{ color: 'var(--text-muted)' }} className="text-sm">:</span>
              <span style={{ color: 'var(--terminal-cyan)', fontFamily: 'var(--font-mono)' }} className="text-sm">~</span>
              <span style={{ color: 'var(--text-muted)' }} className="text-sm">$</span>
              <span
                className="cursor-blink ml-1 inline-block w-2 h-4 align-middle"
                style={{ background: 'var(--terminal-green)', opacity: 0.8 }}
              />
            </button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-4">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className="relative px-3 py-1.5 text-xs font-semibold transition-all duration-300 group rounded cursor-pointer"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    color: isActive(item.path) ? 'var(--terminal-green)' : 'var(--text-secondary)',
                    background: isActive(item.path) ? 'rgba(0, 255, 136, 0.05)' : 'transparent',
                    border: '1px solid transparent',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    if (!isActive(item.path)) {
                      el.style.color = 'var(--terminal-cyan)';
                      el.style.background = 'rgba(0, 212, 255, 0.04)';
                      el.style.transform = 'translateY(-1px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    if (!isActive(item.path)) {
                      el.style.color = 'var(--text-secondary)';
                      el.style.background = 'transparent';
                      el.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  <span style={{ color: isActive(item.path) ? 'var(--terminal-green)' : 'var(--text-muted)', fontSize: '0.65rem' }} className="mr-1.5 transition-colors group-hover:text-terminal-cyan">
                    {item.icon === '~' ? '⌂' : item.icon}
                  </span>
                  {item.label}
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-300 origin-center scale-x-0 group-hover:scale-x-100"
                    style={{
                      background: 'var(--terminal-cyan)',
                    }}
                  />
                  {isActive(item.path) && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-[2px]"
                      style={{ background: 'var(--terminal-green)' }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Right side — time + shortcut hint */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span
                  className="text-xs px-2 py-1 rounded"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-muted)',
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    fontSize: '0.65rem',
                  }}
                  title="Press Ctrl+` to open terminal from anywhere"
                >
                  ctrl+` → terminal
                </span>
              </div>
              <div
                className="text-xs tabular-nums"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-green)', opacity: 0.7 }}
              >
                {time}
              </div>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span
                className="block w-5 h-px transition-all duration-300"
                style={{
                  background: 'var(--terminal-green)',
                  transform: mobileOpen ? 'rotate(45deg) translateY(4px)' : 'none',
                }}
              />
              <span
                className="block w-5 h-px transition-all duration-300"
                style={{
                  background: 'var(--terminal-green)',
                  opacity: mobileOpen ? 0 : 1,
                }}
              />
              <span
                className="block w-5 h-px transition-all duration-300"
                style={{
                  background: 'var(--terminal-green)',
                  transform: mobileOpen ? 'rotate(-45deg) translateY(-4px)' : 'none',
                }}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            ref={mobileMenuRef}
            className="lg:hidden"
            style={{
              background: 'rgba(8, 12, 24, 0.98)',
              borderTop: '1px solid rgba(0, 255, 136, 0.1)',
            }}
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded text-left transition-all duration-150"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    color: isActive(item.path) ? 'var(--terminal-green)' : 'var(--text-secondary)',
                    background: isActive(item.path) ? 'rgba(0, 255, 136, 0.08)' : 'transparent',
                    fontSize: '0.85rem',
                  }}
                >
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>
                    {item.icon === '~' ? '~' : item.icon}
                  </span>
                  {item.label}
                  {isActive(item.path) && (
                    <span
                      className="ml-auto text-xs"
                      style={{ color: 'var(--terminal-green)' }}
                    >
                      ●
                    </span>
                  )}
                </button>
              ))}
              <div
                className="mt-3 pt-3 text-xs text-center"
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-muted)',
                  borderTop: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                ctrl+` → terminal home
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer */}
      <div className="h-14" />
    </>
  );
}

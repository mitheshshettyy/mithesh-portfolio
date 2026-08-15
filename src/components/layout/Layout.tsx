import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import Navbar from './Navbar';
import Footer from './Footer';
import ParticleBackground from '../three/ParticleBackground';
import BootScreen from '../ui/BootScreen';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const [showBoot, setShowBoot] = useState(() => {
    if (typeof window !== 'undefined') {
      const booted = sessionStorage.getItem('portfolio-booted');
      if (!booted) {
        sessionStorage.setItem('portfolio-booted', 'true');
        return true;
      }
      return false;
    }
    return true;
  });

  // ── Global Ctrl+` shortcut ──
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.ctrlKey && (e.key === '`' || e.key === '~')) {
      e.preventDefault();
      if (location.pathname !== '/') {
        // GSAP exit animation
        const pageWrapper = document.querySelector('.page-content') as HTMLElement;
        if (pageWrapper) {
          gsap.to(pageWrapper, {
            opacity: 0,
            y: -20,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
              navigate('/');
            },
          });
        } else {
          navigate('/');
        }
      }
    }
  }, [navigate, location.pathname]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // ── Page entrance animation ──
  useEffect(() => {
    const pageWrapper = document.querySelector('.page-content') as HTMLElement;
    if (pageWrapper) {
      gsap.fromTo(pageWrapper,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.05 }
      );
    }
  }, [location.pathname]);

  const isHome = location.pathname === '/';

  return (
    <div
      className="min-h-screen relative flex flex-col"
      style={{ background: 'var(--bg-primary)' }}
    >
      {showBoot && (
        <BootScreen onComplete={() => setShowBoot(false)} />
      )}

      {/* Three.js Particle Background */}
      <ParticleBackground intensity={isHome ? 1 : 0.6} />

      {/* Grid pattern */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 136, 0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 136, 0.025) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          zIndex: 1,
        }}
      />

      {/* Gradient overlays */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 20% 50%, rgba(0, 255, 136, 0.04) 0%, transparent 50%)',
          zIndex: 1,
        }}
      />
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 80% 20%, rgba(0, 212, 255, 0.04) 0%, transparent 50%)',
          zIndex: 1,
        }}
      />

      {/* Navbar */}
      <div style={{ position: 'relative', zIndex: 50 }}>
        <Navbar />
      </div>

      {/* Page Content */}
      <main
        className="page-content flex-1"
        style={{ position: 'relative', zIndex: 2 }}
      >
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

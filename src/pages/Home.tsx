import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Terminal from '../components/terminal/Terminal';

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(heroRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.1 }
      );
    }
  }, []);

  return (
    <div
      className="min-h-[calc(100vh-56px)] flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8"
      style={{
        background: 'transparent',
      }}
    >
      {/* Grid pattern overlay */}
      <div
        className="fixed inset-0 pointer-events-none grid-pattern"
        style={{ zIndex: 1, opacity: 0.6 }}
      />

      <div
        ref={heroRef}
        className="w-full max-w-7xl h-auto max-h-[calc(100vh-160px)] min-h-[400px] flex flex-col"
        style={{ zIndex: 2, position: 'relative' }}
      >
        <div className="flex-grow flex flex-col min-h-0">
          <Terminal />
        </div>
      </div>
    </div>
  );
}

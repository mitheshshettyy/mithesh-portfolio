import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

export default function NotFound() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' }
      );
    }

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div
      ref={containerRef}
      className="min-h-[calc(100vh-56px)] flex items-center justify-center px-4"
    >
      <div className="text-center max-w-xl">
        {/* 404 ASCII */}
        <pre
          className="text-xs sm:text-sm mb-6"
          style={{
            fontFamily: 'var(--font-mono)',
            color: 'var(--terminal-green)',
            lineHeight: '1.4',
          }}
        >
{`
  ██╗  ██╗ ██████╗  ██╗  ██╗
  ██║  ██║██╔═████╗ ██║  ██║
  ███████║██║██╔██║ ███████║
  ╚════██║████╔╝██║ ╚════██║
       ██║╚██████╔╝       ██║
       ╚═╝ ╚═════╝        ╚═╝
`}
        </pre>

        <div
          className="terminal-card p-8 text-left"
          style={{ background: 'rgba(8,12,24,0.95)' }}
        >
          {/* Terminal style output */}
          <div className="space-y-2 mb-6">
            <div className="text-sm" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-red)' }}>
              zsh: command not found: {window.location.pathname}
            </div>
            <div className="text-sm" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              Error 404: Page not found
            </div>
            <div className="text-sm" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
              The path you requested does not exist on this system.
            </div>
          </div>

          <div
            className="mb-6 p-3 rounded"
            style={{
              background: 'rgba(0,0,0,0.3)',
              border: '1px solid rgba(0,255,136,0.1)',
            }}
          >
            <div className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              $ ls ~/ # Available paths:
            </div>
            <div className="text-xs mt-1" style={{ fontFamily: 'var(--font-mono)', color: 'var(--terminal-green)' }}>
              /about  /education  /skills  /projects  /experience  /contact  /resume
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <button
              onClick={() => navigate('/')}
              className="px-5 py-2 rounded text-sm transition-all duration-200"
              style={{
                fontFamily: 'var(--font-mono)',
                background: 'rgba(0,255,136,0.12)',
                border: '1px solid rgba(0,255,136,0.35)',
                color: 'var(--terminal-green)',
              }}
            >
              $ cd ~/home
            </button>
            <div className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              Auto-redirect in{' '}
              <span style={{ color: 'var(--terminal-cyan)' }}>{countdown}s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

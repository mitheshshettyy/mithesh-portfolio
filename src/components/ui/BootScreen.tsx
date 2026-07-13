import { useState, useEffect, useRef } from 'react';

interface BootScreenProps {
  onComplete: () => void;
}

const ASCII_ART = `██╗███╗   ██╗██╗████████╗
██║████╗  ██║██║╚══██╔══╝
██║██╔██╗ ██║██║   ██║
██║██║╚██╗██║██║   ██║
██║██║ ╚████║██║   ██║
╚═╝╚═╝  ╚═══╝╚═╝   ╚═╝`;

const SUBTITLE = "        INITIALIZING...";

const BOOT_LOGS = [
  { text: "> Initializing Portfolio Engine...", type: 'info' },
  { text: "✓ Runtime Environment Ready", type: 'success' },
  { text: "", type: 'blank' },
  { text: "> Initializing Graphics Pipeline...", type: 'info' },
  { text: "✓ Three.js Renderer Loaded", type: 'success' },
  { text: "", type: 'blank' },
  { text: "> Initializing Interactive Terminal...", type: 'info' },
  { text: "✓ Terminal Interface Ready", type: 'success' },
  { text: "", type: 'blank' },
  { text: "> Initializing Developer Profile...", type: 'info' },
  { text: "✓ Profile Loaded", type: 'success' },
  { text: "", type: 'blank' },
  { text: "> Initializing Project Registry...", type: 'info' },
  { text: "✓ Projects Indexed", type: 'success' },
  { text: "", type: 'blank' },
  { text: "> Initializing Experience Database...", type: 'info' },
  { text: "✓ Experience Records Loaded", type: 'success' },
  { text: "", type: 'blank' },
  { text: "> Initializing Contact Services...", type: 'info' },
  { text: "✓ Contact Module Ready", type: 'success' },
  { text: "", type: 'blank' },
  { text: "> Initializing Resume Viewer...", type: 'info' },
  { text: "✓ Resume Loaded", type: 'success' },
  { text: "", type: 'blank' },
  { text: "> Verifying System Integrity...", type: 'info' },
  { text: "✓ All Checks Passed", type: 'success' },
  { text: "", type: 'blank' },
  { text: "> Launching Developer Workspace...", type: 'info' },
  { text: "✓ System Ready", type: 'success' },
];

const WELCOME_LINES = [
  "═══════════════════════════════════════════════",
  "Welcome to MITHESH R SHETTY's Developer Portfolio",
  "System initialized successfully.",
  "Launching portfolio...",
  "═══════════════════════════════════════════════"
];

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [asciiIndex, setAsciiIndex] = useState(0);
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [logoDone, setLogoDone] = useState(false);
  const [fade, setFade] = useState(false);

  const [completedLogs, setCompletedLogs] = useState<{ text: string; type: string }[]>([]);
  const [currentLogText, setCurrentLogText] = useState('');
  
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(0);

  const [completedWelcome, setCompletedWelcome] = useState<string[]>([]);
  const [welcomeDone, setWelcomeDone] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Body scroll prevention and restoration
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);


  useEffect(() => {
    let active = true;
    const cleanups: (() => void)[] = [];

    const sleep = (ms: number) => new Promise<void>(resolve => {
      const t = setTimeout(() => {
        resolve();
      }, ms);
      cleanups.push(() => clearTimeout(t));
    });

    const runBoot = async () => {
      for (let i = 0; i <= ASCII_ART.length; i++) {
        if (!active) return;
        setAsciiIndex(i);
        await sleep(2);
      }

      await sleep(50);

      for (let i = 0; i <= SUBTITLE.length; i++) {
        if (!active) return;
        setSubtitleIndex(i);
        await sleep(15);
      }

      await sleep(200);
      if (!active) return;
      setLogoDone(true);

      for (let i = 0; i < BOOT_LOGS.length; i++) {
        if (!active) return;
        const log = BOOT_LOGS[i];

        if (log.type === 'blank') {
          setCompletedLogs(prev => [...prev, { text: '', type: 'blank' }]);
          await sleep(100);
        } else if (log.type === 'success') {
          await sleep(250);
          if (!active) return;
          setCompletedLogs(prev => [...prev, { text: log.text, type: 'success' }]);
        } else {

          for (let j = 0; j <= log.text.length; j++) {
            if (!active) return;
            setCurrentLogText(log.text.slice(0, j));
            await sleep(5);
          }
          if (!active) return;
          setCompletedLogs(prev => [...prev, { text: log.text, type: 'info' }]);
          setCurrentLogText('');
        }
      }

      if (!active) return;
      setShowProgress(true);
      for (let p = 0; p <= 100; p += 4) {
        if (!active) return;
        setProgress(p);
        await sleep(12);
      }
      if (!active) return;
      setProgress(100);


      await sleep(100);

      for (let i = 0; i < WELCOME_LINES.length; i++) {
        if (!active) return;
        setCompletedWelcome(prev => [...prev, WELCOME_LINES[i]]);
        await sleep(80);
      }
      if (!active) return;
      setWelcomeDone(true);

      await sleep(600);
      if (!active) return;
      setFade(true);

      await sleep(1000);
      if (!active) return;
      onComplete();
    };

    runBoot();

    return () => {
      active = false;
      cleanups.forEach(c => c());
    };
  }, [onComplete]);

  // Auto-scroll inside logs container
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [completedLogs, currentLogText, showProgress, progress, completedWelcome]);

  return (
    <div className={`boot-screen-overlay ${fade ? 'fade-out' : ''}`}>
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
      <div className="noise-overlay" />

      <div
        ref={contentRef}
        className="boot-screen-content z-10 flex flex-col justify-start h-full max-h-screen py-16 md:py-20 overflow-y-auto terminal-scroll"
      >
        <div className="flex flex-col items-center mb-16 shrink-0 w-full">
          <pre
            className="terminal-banner-text text-glow-green text-flicker font-bold leading-[1.1] font-mono text-left mx-auto"
            style={{
              fontFamily: 'var(--font-mono)',
              color: 'var(--terminal-green)',
            }}
          >
            <span>{ASCII_ART.slice(0, asciiIndex)}</span>
            <span style={{ opacity: 0 }}>{ASCII_ART.slice(asciiIndex)}</span>
          </pre>

          <div
            className="text-glow-cyan text-pulse text-sm md:text-base font-bold font-mono tracking-widest text-center"
            style={{
              marginTop: '40px',
              color: 'var(--terminal-cyan)',
              minHeight: '1.5em',
            }}
          >
            <span>{SUBTITLE.slice(0, subtitleIndex)}</span>
            <span style={{ opacity: 0 }}>{SUBTITLE.slice(subtitleIndex)}</span>
            {!logoDone && (
              <span className="cursor-blink inline-block w-1.5 h-3.5 bg-emerald-400 ml-1 align-middle" />
            )}
          </div>
        </div>

        {logoDone && (
          <div className="flex-1 flex flex-col items-center w-full">
            <div
              className="flex flex-col gap-2.5 text-sm md:text-base font-medium select-none w-full max-w-[650px] px-4 md:px-8"
              style={{ lineHeight: '1.6' }}
            >
              {completedLogs.map((log, idx) => {
                if (log.type === 'blank') {
                  return <div key={idx} className="h-4" />;
                }
                return (
                  <div
                    key={idx}
                    style={{
                      color: log.type === 'success' ? 'var(--terminal-green)' : 'var(--text-secondary)',
                      fontFamily: 'var(--font-mono)',
                    }}
                    className={log.type === 'success' ? 'text-glow-green' : ''}
                  >
                    {log.text}
                  </div>
                );
              })}

              {currentLogText && (
                <div
                  style={{
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-mono)',
                    opacity: 0.9,
                  }}
                >
                  {currentLogText}
                  <span className="cursor-blink inline-block w-2 h-4 bg-slate-300 ml-1 align-middle" />
                </div>
              )}

              {showProgress && (
                <div
                  style={{ color: 'var(--terminal-cyan)', fontFamily: 'var(--font-mono)' }}
                  className="text-glow-cyan mt-8"
                >
                  [SYSTEM PROGRESS]: [{'█'.repeat(Math.floor(progress / 2.5))}{'░'.repeat(40 - Math.floor(progress / 2.5))}] {progress}%
                </div>
              )}

              {progress === 100 && (
                <div
                  style={{ color: 'var(--terminal-green)', fontFamily: 'var(--font-mono)' }}
                  className="text-glow-green text-pulse mt-6 text-base md:text-lg font-bold"
                >
                  &gt; Launching Portfolio...
                </div>
              )}

              {completedWelcome.length > 0 && (
                <div
                  className="mt-10 flex flex-col gap-2 text-sm md:text-base font-bold text-glow-green"
                  style={{ color: 'var(--terminal-green)' }}
                >
                  {completedWelcome.map((line, idx) => (
                    <pre
                      key={idx}
                      className="whitespace-pre text-left mx-auto"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      {line}
                    </pre>
                  ))}
                  {!welcomeDone && (
                    <span className="cursor-blink inline-block w-2 h-4 bg-emerald-400 ml-0.5 align-middle" />
                  )}
                </div>
              )}

              <div ref={logsEndRef} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

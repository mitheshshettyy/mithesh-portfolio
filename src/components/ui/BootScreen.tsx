import { useState, useEffect, useRef } from 'react';

interface BootScreenProps {
  onComplete: () => void;
}

const ASCII_LOGO = `██╗███╗   ██╗██╗████████╗
██║████╗  ██║██║╚══██╔══╝
██║██╔██╗ ██║██║   ██║
██║██║╚██╗██║██║   ██║
██║██║ ╚████║██║   ██║
╚═╝╚═╝  ╚═══╝╚═╝   ╚═╝

        INITIALIZING...`;

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
  "Boot completed successfully.",
  "Launching interface...",
  "═══════════════════════════════════════════════"
];

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [displayedLogo, setDisplayedLogo] = useState('');
  const [logoDone, setLogoDone] = useState(false);
  const [fade, setFade] = useState(false);

  // Logs state
  const [completedLogs, setCompletedLogs] = useState<{ text: string; type: string }[]>([]);
  const [currentLogText, setCurrentLogText] = useState('');
  const [currentLogIndex, setCurrentLogIndex] = useState(0);

  // Welcome banner state
  const [completedWelcome, setCompletedWelcome] = useState<string[]>([]);
  const [welcomeIndex, setWelcomeIndex] = useState(0);
  const [welcomeDone, setWelcomeDone] = useState(false);

  const logsEndRef = useRef<HTMLDivElement>(null);

  // Typewriter for ASCII Logo
  useEffect(() => {
    let charIdx = 0;
    const interval = setInterval(() => {
      if (charIdx < ASCII_LOGO.length) {
        setDisplayedLogo(prev => prev + ASCII_LOGO[charIdx]);
        charIdx++;
      } else {
        clearInterval(interval);
        setTimeout(() => setLogoDone(true), 200);
      }
    }, 4);

    return () => clearInterval(interval);
  }, []);

  // Sequential typing for boot logs
  useEffect(() => {
    if (!logoDone || welcomeDone) return;

    if (currentLogIndex < BOOT_LOGS.length) {
      const currentLog = BOOT_LOGS[currentLogIndex];

      if (currentLog.type === 'blank') {
        setCompletedLogs(prev => [...prev, { text: '', type: 'blank' }]);
        setCurrentLogIndex(prev => prev + 1);
      } else if (currentLog.type === 'success') {
        // Success messages appear instantly with a short processing delay
        const timer = setTimeout(() => {
          setCompletedLogs(prev => [...prev, { text: currentLog.text, type: 'success' }]);
          setCurrentLogIndex(prev => prev + 1);
        }, 120);
        return () => clearTimeout(timer);
      } else {
        // Info messages type out character by character
        let charIdx = 0;
        setCurrentLogText('');

        const typeInterval = setInterval(() => {
          if (charIdx < currentLog.text.length) {
            setCurrentLogText(prev => prev + currentLog.text[charIdx]);
            charIdx++;
          } else {
            clearInterval(typeInterval);
            setTimeout(() => {
              setCompletedLogs(prev => [...prev, { text: currentLog.text, type: 'info' }]);
              setCurrentLogText('');
              setCurrentLogIndex(prev => prev + 1);
            }, 60);
          }
        }, 6);

        return () => clearInterval(typeInterval);
      }
    } else {
      // Logs finished, trigger welcome banner
      setWelcomeIndex(0);
    }
  }, [logoDone, currentLogIndex, welcomeDone]);

  // Sequential lines for welcome banner
  useEffect(() => {
    if (currentLogIndex < BOOT_LOGS.length || !logoDone || welcomeDone) return;

    if (welcomeIndex < WELCOME_LINES.length) {
      const timer = setTimeout(() => {
        setCompletedWelcome(prev => [...prev, WELCOME_LINES[welcomeIndex]]);
        setWelcomeIndex(prev => prev + 1);
      }, 150);
      return () => clearTimeout(timer);
    } else {
      setWelcomeDone(true);
      // Wait before initiating fadeout
      const fadeTimer = setTimeout(() => {
        setFade(true);
      }, 1000);
      return () => clearTimeout(fadeTimer);
    }
  }, [logoDone, currentLogIndex, welcomeIndex, welcomeDone]);

  // Handle final overlay unmount after fade transition completes
  useEffect(() => {
    if (fade) {
      const timer = setTimeout(() => {
        onComplete();
      }, 800); // Matches the 0.8s CSS transition
      return () => clearTimeout(timer);
    }
  }, [fade, onComplete]);

  // Auto-scroll when logs update
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [completedLogs, currentLogText, completedWelcome]);

  return (
    <div className={`boot-screen-overlay ${fade ? 'fade-out' : ''}`}>
      {/* Underlying layouts are rendered identically, this covers it seamlessly */}
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

      {/* Content Container */}
      <div className="boot-screen-content z-10 flex flex-col justify-start md:justify-center h-full max-h-screen py-8 overflow-y-auto terminal-scroll">
        
        {/* Centered ASCII Logo */}
        <div className="flex flex-col items-center mb-6">
          <pre
            className="text-glow-green text-xs font-bold leading-relaxed whitespace-pre text-center"
            style={{
              fontFamily: 'var(--font-mono)',
              color: 'var(--terminal-green)',
            }}
          >
            {displayedLogo}
          </pre>
        </div>

        {/* Logs Output */}
        {logoDone && (
          <div className="flex flex-col gap-1 text-sm font-semibold select-none">
            {completedLogs.map((log, idx) => {
              if (log.type === 'blank') {
                return <div key={idx} className="h-2" />;
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

            {/* Currently Typing Log */}
            {currentLogText && (
              <div
                style={{
                  color: 'var(--text-secondary)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {currentLogText}
                <span className="cursor-blink inline-block w-1.5 h-3.5 bg-slate-400 ml-0.5 align-middle" />
              </div>
            )}
          </div>
        )}

        {/* Welcome Banner Output */}
        {completedWelcome.length > 0 && (
          <div className="mt-4 flex flex-col gap-1 text-sm font-bold text-glow-green" style={{ color: 'var(--terminal-green)' }}>
            {completedWelcome.map((line, idx) => (
              <pre
                key={idx}
                className="whitespace-pre-wrap"
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
  );
}

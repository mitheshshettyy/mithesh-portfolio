import { useEffect, useRef, useState } from 'react';

interface TypewriterProps {
  texts: string[];
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
  loop?: boolean;
}

export function Typewriter({ texts, speed = 80, className, style, loop = true }: TypewriterProps) {
  const [displayed, setDisplayed] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPausing, setIsPausing] = useState(false);

  useEffect(() => {
    if (isPausing) return;

    const currentText = texts[textIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentText.length) {
          setDisplayed(currentText.slice(0, charIndex + 1));
          setCharIndex(c => c + 1);
        } else {
          if (loop) {
            setIsPausing(true);
            setTimeout(() => {
              setIsDeleting(true);
              setIsPausing(false);
            }, 2000);
          }
        }
      } else {
        if (charIndex > 0) {
          setDisplayed(currentText.slice(0, charIndex - 1));
          setCharIndex(c => c - 1);
        } else {
          setIsDeleting(false);
          setTextIndex(i => (i + 1) % texts.length);
        }
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, isPausing, textIndex, texts, speed, loop]);

  return (
    <span className={className} style={style}>
      {displayed}
      <span
        className="cursor-blink inline-block w-0.5 h-4 align-middle ml-0.5"
        style={{ background: 'var(--terminal-green)', marginTop: '-1px' }}
      />
    </span>
  );
}

interface GlitchTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export function GlitchText({ text, className, style }: GlitchTextProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let animFrame: number;
    let glitching = false;

    const glitch = () => {
      if (!glitching && Math.random() < 0.05) {
        glitching = true;
        const chars = '!<>-_\\/[]{}—=+*^?#@0123456789';
        let iterations = 0;

        const interval = setInterval(() => {
          if (el) {
            el.innerText = text
              .split('')
              .map((char, i) => {
                if (i < iterations || char === ' ') return char;
                return chars[Math.floor(Math.random() * chars.length)];
              })
              .join('');
          }
          iterations += 1 / 3;
          if (iterations >= text.length) {
            clearInterval(interval);
            if (el) el.innerText = text;
            glitching = false;
          }
        }, 30);
      }
      animFrame = requestAnimationFrame(glitch);
    };

    animFrame = requestAnimationFrame(glitch);
    return () => cancelAnimationFrame(animFrame);
  }, [text]);

  return (
    <span ref={ref} className={className} style={style}>
      {text}
    </span>
  );
}

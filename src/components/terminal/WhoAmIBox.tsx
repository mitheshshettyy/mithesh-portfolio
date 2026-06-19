import { useState, useEffect, useRef } from 'react';
import { personalInfo } from '../../data/portfolioData';

export default function WhoAmIBox() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cols, setCols] = useState(80);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create a temporary element to measure character width
    const testEl = document.createElement('span');
    testEl.style.fontFamily = 'var(--font-mono)';
    testEl.style.fontSize = '0.82rem';
    testEl.style.visibility = 'hidden';
    testEl.style.position = 'absolute';
    testEl.style.whiteSpace = 'pre';
    testEl.textContent = '─';
    document.body.appendChild(testEl);
    const rect = testEl.getBoundingClientRect();
    const charWidth = rect.width || 8.1;
    document.body.removeChild(testEl);

    const handleResize = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.clientWidth;
      // Subtract left margin (2 chars) and right padding
      const computedCols = Math.floor(containerWidth / charWidth);
      setCols(computedCols > 0 ? computedCols : 80);
    };

    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const rows = [
    { label: 'Name', value: personalInfo.name },
    { label: 'Role', value: personalInfo.title },
    { label: 'Degree', value: personalInfo.degree },
    { label: 'University', value: personalInfo.university },
    { label: 'Year', value: `${personalInfo.year} — Graduating ${personalInfo.graduationYear}` },
    { label: 'CGPA', value: personalInfo.cgpa },
    { label: 'Location', value: personalInfo.location },
  ];

  // Ideal boxWidth inside corners is 61 characters (to fit University without wrapping)
  const maxBoxWidth = 61;

  // boxWidth is between 30 and 61 based on window width, leaving 4 characters for margins
  const boxWidth = Math.max(30, Math.min(maxBoxWidth, cols - 4));
  const valueWidth = boxWidth - 15; // 1 space padding left + 13 label width + 1 space padding right = 15

  // Helper function to wrap text safely without breaking words
  const wrapText = (text: string, maxLength: number): string[] => {
    if (!text) return [''];
    const lines: string[] = [];
    let remaining = text;
    while (remaining.length > maxLength) {
      let splitIdx = remaining.lastIndexOf(' ', maxLength);
      if (splitIdx <= 0) {
        splitIdx = maxLength; // force break
      }
      lines.push(remaining.substring(0, splitIdx).trim());
      remaining = remaining.substring(splitIdx).trim();
    }
    if (remaining) {
      lines.push(remaining);
    }
    return lines;
  };

  // Render top border
  const topBarLength = boxWidth - 13; // "─── IDENTITY " is 13 characters
  const topBar = '┌─── IDENTITY ' + '─'.repeat(Math.max(0, topBarLength)) + '┐';

  // Render bottom border
  const bottomBar = '└' + '─'.repeat(boxWidth) + '┘';

  return (
    <div
      ref={containerRef}
      className="w-full select-text"
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.82rem',
        lineHeight: '1.55',
        whiteSpace: 'pre',
      }}
    >
      {/* Top Border */}
      <div style={{ color: 'var(--terminal-green)' }}>  {topBar}</div>

      {/* Content Rows */}
      {rows.map((row, idx) => {
        const valueLines = wrapText(row.value, valueWidth);
        return (
          <div key={idx} style={{ display: 'flex', flexDirection: 'column' }}>
            {valueLines.map((lineText, lineIdx) => {
              const isFirstLine = lineIdx === 0;
              const labelPart = isFirstLine ? `${row.label.padEnd(10)} : ` : '             ';
              const paddedValue = lineText.padEnd(valueWidth);
              return (
                <div key={lineIdx} style={{ display: 'flex', color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--terminal-green)' }}>  │ </span>
                  <span style={{ color: 'var(--text-secondary)' }}>{labelPart}</span>
                  <span style={{ color: 'var(--text-primary)' }}>{paddedValue}</span>
                  <span style={{ color: 'var(--terminal-green)' }}> │</span>
                </div>
              );
            })}
          </div>
        );
      })}

      {/* Bottom Border */}
      <div style={{ color: 'var(--terminal-green)' }}>  {bottomBar}</div>
    </div>
  );
}

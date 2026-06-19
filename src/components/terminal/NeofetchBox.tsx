import { personalInfo } from '../../data/portfolioData';

export default function NeofetchBox() {
  const logoRows = [
    { text: '  ██████╗    ██████╗   ███████╗   ██████╗ ', color: 'var(--terminal-green)' },
    { text: '  ██╔══██╗  ██╔═══██╗  ██╔════╝  ██╔═══██╗', color: 'var(--terminal-green)' },
    { text: '  ██████╔╝  ██║   ██║  ███████╗  ██║   ██║', color: 'var(--terminal-cyan)' },
    { text: '  ██╔═══╝   ██║   ██║  ╚════██║  ██║   ██║', color: 'var(--terminal-cyan)' },
    { text: '  ██║       ╚██████╔╝  ███████║  ╚██████╔╝', color: 'var(--text-secondary)' },
    { text: '  ╚═╝        ╚═════╝   ╚══════╝   ╚═════╝ ', color: 'var(--text-secondary)' },
  ];

  const specs = [
    { label: 'OS', value: 'Portfolio OS v2.0.0' },
    { label: 'Host', value: 'portfolio.local' },
    { label: 'Shell', value: `${personalInfo.shell} ${personalInfo.version}` },
    { label: 'WM/UI', value: 'React + GSAP' },
    { label: 'Theme', value: 'NightShell Dark' },
    { label: 'Terminal', value: 'NightShell Client' },
    { label: 'Framework', value: 'React 19.2.6' },
    { label: 'Runtime', value: 'Node.js 22.19.17' },
    { label: 'Uptime', value: personalInfo.uptime },
    { label: 'Version', value: 'v2.0.0' },
  ];

  const titleText = `${personalInfo.prompt.replace('@portfolio', '')}@portfolio`;
  const separatorLine = '─'.repeat(titleText.length);

  return (
    <div
      className="flex flex-col sm:flex-row font-mono text-xs w-full max-w-[720px] select-text sm:gap-[8ch] gap-4"
      style={{
        lineHeight: '1.55',
        whiteSpace: 'pre',
      }}
    >
      {/* Left Column: Logo */}
      <div className="shrink-0 flex flex-col select-none">
        {logoRows.map((row, idx) => (
          <span key={idx} style={{ color: row.color }}>
            {row.text}
          </span>
        ))}
        {/* Pad the height on desktop if logo has fewer rows than specs */}
        {Array.from({ length: Math.max(0, specs.length + 2 - logoRows.length) }).map((_, idx) => (
          <span key={idx} className="hidden sm:inline">
            {' '.repeat(42)}
          </span>
        ))}
      </div>

      {/* Right Column: System Specs */}
      <div className="flex-1 flex flex-col min-w-0 mt-4 sm:mt-0">
        {/* Title */}
        <span style={{ color: 'var(--terminal-green)', fontWeight: 'bold' }}>
          {titleText}
        </span>
        {/* Separator */}
        <span style={{ color: 'var(--text-muted)' }}>
          {separatorLine}
        </span>
        {/* Specs List */}
        {specs.map((spec, idx) => (
          <div key={idx} className="flex flex-row">
            <span style={{ color: 'var(--terminal-cyan)', width: '10ch', shrink: 0 }}>
              {spec.label.padEnd(9)}:
            </span>
            <span className="pl-2 break-all text-[var(--text-primary)]">
              {spec.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

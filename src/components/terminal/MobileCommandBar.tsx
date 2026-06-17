interface MobileCommandBarProps {
  onCommand: (cmd: string) => void;
}

const quickCmds = ['help', 'about', 'skills', 'projects', 'resume', 'clear'];

export default function MobileCommandBar({ onCommand }: MobileCommandBarProps) {
  return (
    <div
      className="sm:hidden flex gap-2 overflow-x-auto px-3 py-2 shrink-0"
      style={{
        borderTop: '1px solid rgba(0,255,136,0.1)',
        background: 'rgba(0,0,0,0.3)',
        scrollbarWidth: 'none',
      }}
    >
      {quickCmds.map((cmd) => (
        <button
          key={cmd}
          onClick={() => onCommand(cmd)}
          className="shrink-0 px-3 py-1.5 rounded text-xs transition-all duration-150"
          style={{
            fontFamily: 'var(--font-mono)',
            background: 'rgba(0,255,136,0.06)',
            border: '1px solid rgba(0,255,136,0.2)',
            color: 'var(--terminal-green)',
            whiteSpace: 'nowrap',
          }}
        >
          {cmd}
        </button>
      ))}
    </div>
  );
}

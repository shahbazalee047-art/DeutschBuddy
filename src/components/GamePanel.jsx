import { IconX } from './Icons';

export default function GamePanel({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative w-full max-w-2xl max-h-[90vh] bg-[var(--bg-white)] shadow-2xl overflow-hidden scale-in border border-border flex flex-col"
        style={{ borderRadius: 'var(--radius-modal)' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border shrink-0" style={{ background: 'var(--bg-white)' }}>
          <h2 className="text-xl font-bold text-text-dark" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{title}</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-text-muted hover:text-gold hover:bg-gold-pale transition rounded-[var(--radius-sm)]"
            aria-label="Close"
          >
            <IconX className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
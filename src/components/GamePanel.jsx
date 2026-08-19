import { IconX } from './Icons';

export default function GamePanel({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6" onClick={onClose}>
      <div className="absolute inset-0 bg-primary-dark/55" onClick={onClose} />
      <div
        className="dashboard-modal-card modal-card relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden border border-border bg-surface shadow-xl scale-in"
        style={{ borderRadius: 'var(--radius-modal)' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-border p-4 sm:p-6">
          <h2 className="text-xl font-bold text-text-dark" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{title}</h2>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center text-text-muted transition-colors hover:bg-bg-secondary hover:text-primary"
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

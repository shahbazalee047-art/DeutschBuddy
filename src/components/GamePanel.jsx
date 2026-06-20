import { IconX } from './Icons';

export default function GamePanel({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-[60]" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div
        className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-bg-white shadow-2xl overflow-y-auto slide-in border-l border-border"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-border bg-bg-white">
          <h2 className="text-xl font-bold text-text-dark" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{title}</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-text-muted hover:text-gold hover:bg-gold-pale transition"
            aria-label="Close"
          >
            <IconX className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

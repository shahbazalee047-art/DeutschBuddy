export default function Mascot({ mood = 'happy', size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const faces = {
    happy: '🐻',
    excited: '🎉',
    thinking: '🤔',
    proud: '💪',
    waving: '👋',
    sleeping: '😴',
  };

  return (
    <div className={`${sizes[size]} inline-flex items-center justify-center ${className}`}>
      <span className="animate-float" role="img" aria-label="mascot">
        {faces[mood] || faces.happy}
      </span>
    </div>
  );
}

export function MascotMessage({ message, mood = 'happy' }) {
  return (
    <div className="flex items-start gap-3 slide-up">
      <Mascot mood={mood} size="md" />
      <div className="bg-[#faf8f5] border border-[#d4a843]/20 rounded-2xl rounded-tl-md px-4 py-3 max-w-sm">
        <p className="text-sm text-gray-700 leading-relaxed">{message}</p>
      </div>
    </div>
  );
}

export function MascotBubble({ children, mood = 'happy' }) {
  return (
    <div className="flex items-start gap-3">
      <Mascot mood={mood} size="sm" />
      <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-md px-4 py-3 shadow-sm flex-1">
        {children}
      </div>
    </div>
  );
}

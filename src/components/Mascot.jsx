import { IconBear, IconSparkles, IconHelpCircle, IconHeart, IconWave, IconMoon } from './Icons';

export default function Mascot({ mood = 'happy', size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const faces = {
    happy: IconBear,
    excited: IconSparkles,
    thinking: IconHelpCircle,
    proud: IconHeart,
    waving: IconWave,
    sleeping: IconMoon,
  };

  const FaceIcon = faces[mood] || faces.happy;

  return (
    <div className={`${sizes[size]} inline-flex items-center justify-center ${className}`}>
      <FaceIcon className="w-full h-full text-lime-400 animate-float" />
    </div>
  );
}

export function MascotMessage({ message, mood = 'happy' }) {
  return (
    <div className="flex items-start gap-3 slide-up">
      <Mascot mood={mood} size="md" />
      <div className="glass-card rounded-2xl rounded-tl-md px-4 py-3 max-w-sm">
        <p className="text-sm text-zinc-300 leading-relaxed">{message}</p>
      </div>
    </div>
  );
}

export function MascotBubble({ children, mood = 'happy' }) {
  return (
    <div className="flex items-start gap-3">
      <Mascot mood={mood} size="sm" />
      <div className="bg-zinc-800 border border-zinc-700 rounded-2xl rounded-tl-md px-4 py-3 flex-1">
        {children}
      </div>
    </div>
  );
}

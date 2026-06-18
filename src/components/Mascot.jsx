import { IconSparkles, IconLeaf } from './Icons';

export default function Mascot() {
  const moods = [
    { emoji: '🌱', label: 'Growing' },
    { emoji: '🚀', label: 'Moving Forward' },
    { emoji: '⭐', label: 'Great Progress' },
    { emoji: '🌟', label: 'You Rock' },
  ];

  const currentMood = moods[Math.floor(Math.random() * moods.length)];

  return (
    <div className="glass-card p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl" style={{ background: 'rgba(127, 176, 105, 0.15)' }}>
          <IconLeaf className="w-7 h-7 text-sage-400" />
        </div>
        <div>
          <div className="text-sm font-bold text-cream-200" style={{ fontFamily: 'DM Serif Display, serif' }}>
            Deutsch Buddy
          </div>
          <div className="text-xs text-cream-500">
            {currentMood.label}
          </div>
        </div>
      </div>
      <div className="flex gap-2 text-sm">
        {moods.map((mood) => (
          <div key={mood.label} className="px-3 py-1 rounded-full text-xs text-cream-400 border border-amber-400/20 hover:border-amber-400/40 transition-all duration-200">
            {mood.emoji} {mood.label}
          </div>
        ))}
      </div>
    </div>
  );
}
import { useState } from 'react';
import { IconLeaf, IconZap, IconStar, IconSparkles } from './Icons';

const moods = [
  { icon: IconLeaf, label: 'Growing' },
  { icon: IconZap, label: 'Moving Forward' },
  { icon: IconStar, label: 'Great Progress' },
  { icon: IconSparkles, label: 'You Rock' },
];

export default function Mascot() {
  const [currentMood] = useState(() => moods[Math.floor(Math.random() * moods.length)]);

  return (
    <div className="paper-card p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl" style={{ background: 'rgba(196,146,74,0.15)' }}>
          <IconLeaf className="w-7 h-7 text-gold" />
        </div>
        <div>
          <div className="text-sm font-bold text-text-body" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            Deutsch Buddy
          </div>
          <div className="text-xs text-text-muted">
            {currentMood.label}
          </div>
        </div>
      </div>
      <div className="flex gap-2 text-sm">
        {moods.map((mood) => (
          <div key={mood.label} className="px-3 py-1 rounded-full text-xs text-text-muted border border-gold-light/20 hover:border-gold-light/40 transition-all duration-200 flex items-center gap-1">
            <mood.icon className="w-3 h-3" /> {mood.label}
          </div>
        ))}
      </div>
    </div>
  );
}

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
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-light text-2xl">
          <IconLeaf className="h-7 w-7 text-primary" />
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
          <div key={mood.label} className="flex items-center gap-1 rounded-full border border-primary/20 px-3 py-1 text-xs text-text-muted transition-all duration-200 hover:border-primary/40">
            <mood.icon className="w-3 h-3" /> {mood.label}
          </div>
        ))}
      </div>
    </div>
  );
}

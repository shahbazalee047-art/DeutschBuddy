import { useEffect, useState } from 'react';
import { IconBolt } from './Icons';

export default function XpToast({ xp, onComplete }) {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setGone(true);
      setTimeout(onComplete, 300);
    }, 1200);
    return () => clearTimeout(t);
  }, [onComplete]);

  if (gone) return null;

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[70] pointer-events-none animate-xp-toast">
      <div className="bg-gold text-text-on-dark font-bold text-lg px-5 py-2 shadow-lg shadow-gold/30 flex items-center gap-1.5">
        <IconBolt className="w-5 h-5" /> +{xp} XP
      </div>
    </div>
  );
}

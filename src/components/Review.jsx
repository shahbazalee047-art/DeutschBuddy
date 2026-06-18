import Quiz from './Quiz';
import { IconClipboard } from './Icons';
export default function Review({ content, onComplete }) {
  return (
    <div className="fade-in">
      <div className="rounded-2xl p-5 mb-5 border border-sage-400/20" style={{ background: 'linear-gradient(135deg, rgba(127, 176, 105, 0.1), rgba(107, 163, 190, 0.05))' }}>
        <h3 className="text-lg font-bold text-cream-100 flex items-center gap-2" style={{ fontFamily: 'DM Serif Display, serif' }}><IconClipboard className="w-5 h-5 text-sage-400" /> Week Review</h3>
        <p className="text-sm text-cream-400">Test everything you learned this week!</p>
      </div>
      <Quiz content={content} onComplete={onComplete} />
    </div>
  );
}

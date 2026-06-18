import Quiz from './Quiz';
import { IconClipboard } from './Icons';
export default function Review({ content, onComplete }) {
  return (
    <div className="fade-in">
      <div className="rounded-2xl p-5 mb-5 border border-lime-500/20" style={{ background: 'linear-gradient(135deg, rgba(163, 230, 53, 0.1), rgba(6, 182, 212, 0.05))' }}>
        <h3 className="text-lg font-bold text-zinc-100 flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}><IconClipboard className="w-5 h-5 text-lime-400" /> Week Review</h3>
        <p className="text-sm text-zinc-400">Test everything you learned this week!</p>
      </div>
      <Quiz content={content} onComplete={onComplete} />
    </div>
  );
}

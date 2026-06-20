import Quiz from './Quiz';
import { IconClipboard } from './Icons';
export default function Review({ content, onComplete }) {
  return (
    <div className="fade-in">
      <div className=" p-5 mb-5 border border-gold/20" style={{ background: 'linear-gradient(135deg, rgba(196,146,74,0.1), rgba(196,146,74,0.05))' }}>
        <h3 className="text-lg font-bold text-text-dark flex items-center gap-2" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}><IconClipboard className="w-5 h-5 text-gold" /> Week Review</h3>
        <p className="text-sm text-text-muted">Test everything you learned this week!</p>
      </div>
      <Quiz content={content} onComplete={onComplete} />
    </div>
  );
}

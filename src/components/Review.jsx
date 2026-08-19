import Quiz from './Quiz';
import { IconClipboard } from './Icons';
export default function Review({ content, onComplete }) {
  return (
    <div className="fade-in">
      <div className="mb-5 border border-primary/20 bg-primary-light p-5">
        <h3 className="flex items-center gap-2 text-lg font-bold text-text-dark" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}><IconClipboard className="h-5 w-5 text-primary" /> Week Review</h3>
        <p className="text-sm text-text-muted">Test everything you learned this week!</p>
      </div>
      <Quiz content={content} onComplete={onComplete} />
    </div>
  );
}

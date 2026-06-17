import Quiz from './Quiz';
export default function Review({ content, onComplete }) {
  return (
    <div className="fade-in">
      <div className="bg-gradient-to-r from-lime-400/10 to-cyan-400/10 border border-lime-400/20 rounded-2xl p-5 mb-5">
        <h3 className="text-lg font-bold text-zinc-100 mb-1">📋 Week Review</h3>
        <p className="text-zinc-400 text-sm">Test everything you learned this week!</p>
      </div>
      <Quiz content={content} onComplete={onComplete} />
    </div>
  );
}

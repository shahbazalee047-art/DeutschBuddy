import Quiz from './Quiz';

export default function Review({ content, onComplete }) {
  return (
    <div className="fade-in">
      <div className="bg-gradient-to-r from-blue-600/80 to-purple-600/80 border border-blue-500/30 text-white rounded-2xl p-5 mb-5">
        <h3 className="text-lg font-bold mb-1">📋 Week Review</h3>
        <p className="text-blue-200/70 text-sm">Test everything you learned this week!</p>
      </div>
      <Quiz content={content} onComplete={onComplete} />
    </div>
  );
}

import Quiz from './Quiz';
export default function Review({ content, onComplete }) {
  return (
    <div className="fade-in">
      <div className="rounded-2xl p-5 mb-5" style={{ background: 'linear-gradient(135deg, rgba(139,105,20,0.1) 0%, rgba(91,140,122,0.1) 100%)', border: '1px solid rgba(139,105,20,0.2)' }}>
        <h3 className="text-lg font-bold text-[#1a1a2e] mb-1">📋 Week Review</h3>
        <p className="text-[#4a5568] text-sm">Test everything you learned this week!</p>
      </div>
      <Quiz content={content} onComplete={onComplete} />
    </div>
  );
}

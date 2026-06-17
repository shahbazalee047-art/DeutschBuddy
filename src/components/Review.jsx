import Quiz from './Quiz';
export default function Review({ content, onComplete }) {
  return (
    <div className="fade-in">
      <div className="rounded-2xl p-5 mb-5" style={{ background: 'linear-gradient(135deg, #FFF8E1, #E0F2F1)', border: '1px solid #E8E0D4' }}>
        <h3 className="text-lg font-bold text-[#1A1A2E]" style={{ fontFamily: 'Poppins, sans-serif' }}>📋 Week Review</h3>
        <p className="text-sm text-[#8A8A9A]">Test everything you learned this week!</p>
      </div>
      <Quiz content={content} onComplete={onComplete} />
    </div>
  );
}

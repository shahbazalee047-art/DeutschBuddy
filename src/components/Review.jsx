import Quiz from './Quiz';
export default function Review({ content, onComplete }) {
  return (
    <div className="fade-in">
      <div className="rounded-2xl p-5 mb-5" style={{ background: 'linear-gradient(135deg, rgba(255,204,0,0.1) 0%, rgba(221,0,0,0.1) 100%)', border: '1px solid rgba(255,204,0,0.2)' }}>
        <h3 className="text-lg font-bold text-slate-100 mb-1">📋 Week Review</h3>
        <p className="text-slate-300 text-sm">Test everything you learned this week!</p>
      </div>
      <Quiz content={content} onComplete={onComplete} />
    </div>
  );
}

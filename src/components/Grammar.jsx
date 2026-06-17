import { useState } from 'react';
import SpeakerButton from './SpeakerButton';
export default function Grammar({ content, onComplete }) {
  const [showEx, setShowEx] = useState(true);
  if (!content.rule) return <Empty onComplete={onComplete} />;
  return (
    <div className="fade-in">
      <h3 className="font-bold text-[#1A1A2E] text-lg mb-5">📝 Grammar Lesson</h3>
      <div className="paper-card p-5">
        {content.rule && <div className="rounded-2xl p-4 mb-4" style={{ background: '#E0F2F1', border: '1px solid #2D8B7A20' }}><p className="text-[11px] font-bold text-[#2D8B7A] mb-1 uppercase" style={{ letterSpacing: '0.5px' }}>📏 Rule:</p><p className="text-[14px] font-medium text-[#1A1A2E]">{content.rule}</p></div>}
        {content.examples?.length > 0 && <div className="mb-4"><button onClick={() => setShowEx(!showEx)} className="text-[12px] font-bold text-[#8A8A9A] mb-2 flex items-center gap-1">{showEx ? '▼' : '▶'} Examples</button>{showEx && <div className="space-y-2 ml-4">{content.examples.map((ex, i) => (<div key={i} className="bg-[#FAF6F0] border border-[#E8E0D4] rounded-xl p-3"><div className="flex items-center gap-2"><p className="font-medium text-[#1A1A2E] flex-1">{ex.german}</p><SpeakerButton text={ex.german} size="sm" /></div><p className="text-[12px] text-[#8A8A9A]">{ex.english}</p></div>))}</div>}</div>}
        {content.note && <div className="bg-[#FFF8E1] border border-[#B8860B]/20 rounded-xl p-3 mt-3"><p className="text-[12px] text-[#4A4A5A]">💡 {content.note}</p></div>}
      </div>
      <div className="text-center mt-4"><button onClick={onComplete} className="btn-primary px-6">✓ I understand this grammar</button></div>
    </div>
  );
}
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-[#8A8A9A] mb-4">Coming soon!</p><button onClick={onComplete} className="btn-primary px-6">Mark Complete</button></div>; }

import { useState } from 'react';
import SpeakerButton from './SpeakerButton';
export default function Grammar({ content, onComplete }) {
  const [showEx, setShowEx] = useState(true);
  if (!content.rule) return <Empty onComplete={onComplete} />;
  return (
    <div className="fade-in">
      <h3 className="font-bold text-[#1a1a2e] text-lg mb-5">📝 Grammar Lesson</h3>
      <div className="bg-white border border-[#E8DFD4] rounded-2xl p-5 shadow-sm">
        {content.rule && <div className="rounded-xl p-4 mb-4" style={{ background: 'rgba(91,140,122,0.1)', border: '1px solid rgba(91,140,122,0.2)' }}><p className="text-xs font-medium mb-1" style={{ color: '#5B8C7A' }}>📏 Rule:</p><p className="text-sm font-medium text-[#1a1a2e]">{content.rule}</p></div>}
        {content.examples?.length > 0 && <div className="mb-4"><button onClick={() => setShowEx(!showEx)} className="text-xs font-bold text-[#9ca3af] mb-2 flex items-center gap-1">{showEx ? '▼' : '▶'} Examples</button>{showEx && <div className="space-y-2 ml-4">{content.examples.map((ex, i) => (<div key={i} className="bg-[#FAF5ED] border border-[#E8DFD4] rounded-lg p-3"><div className="flex items-center gap-2"><p className="font-medium text-[#1a1a2e] flex-1">{ex.german}</p><SpeakerButton text={ex.german} size="sm" /></div><p className="text-xs text-[#6b7280]">{ex.english}</p></div>))}</div>}</div>}
        {content.note && <div className="bg-[#F5EFE6] border border-[#E8DFD4] rounded-lg p-3 mt-3"><p className="text-xs text-[#4a5568]">💡 {content.note}</p></div>}
      </div>
      <div className="text-center mt-4"><button onClick={onComplete} className="px-5 py-2.5 text-white rounded-xl text-sm font-semibold hover:scale-[1.02] transition" style={{ background: 'linear-gradient(135deg, #8B6914, #C4956A)' }}>✓ I understand this grammar</button></div>
    </div>
  );
}
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-[#9ca3af] mb-4">Coming soon!</p><button onClick={onComplete} className="px-4 py-2 text-white rounded-xl text-sm font-semibold transition" style={{ background: 'linear-gradient(135deg, #8B6914, #C4956A)' }}>Mark Complete</button></div>; }

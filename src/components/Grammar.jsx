import { useState } from 'react';
import SpeakerButton from './SpeakerButton';
export default function Grammar({ content, onComplete }) {
  const [showEx, setShowEx] = useState(true);
  if (!content.rule) return <Empty onComplete={onComplete} />;
  return (
    <div className="fade-in">
      <h3 className="font-bold text-slate-200 text-lg mb-5">📝 Grammar Lesson</h3>
      <div className="bg-slate-800 border border-slate-700/50 rounded-2xl p-5">
        {content.rule && <div className="rounded-xl p-4 mb-4" style={{ background: 'rgba(221,0,0,0.1)', border: '1px solid rgba(221,0,0,0.2)' }}><p className="text-xs font-medium mb-1" style={{ color: '#DD0000' }}>📏 Rule:</p><p className="text-sm font-medium text-slate-200">{content.rule}</p></div>}
        {content.examples?.length > 0 && <div className="mb-4"><button onClick={() => setShowEx(!showEx)} className="text-xs font-bold text-slate-400 mb-2 flex items-center gap-1">{showEx ? '▼' : '▶'} Examples</button>{showEx && <div className="space-y-2 ml-4">{content.examples.map((ex, i) => (<div key={i} className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-3"><div className="flex items-center gap-2"><p className="font-medium text-slate-200 flex-1">{ex.german}</p><SpeakerButton text={ex.german} size="sm" /></div><p className="text-xs text-slate-400">{ex.english}</p></div>))}</div>}</div>}
        {content.note && <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-3 mt-3"><p className="text-xs text-slate-300">💡 {content.note}</p></div>}
      </div>
      <div className="text-center mt-4"><button onClick={onComplete} className="px-5 py-2.5 text-black rounded-xl text-sm font-semibold hover:scale-[1.02] transition" style={{ background: '#FFCC00' }}>✓ I understand this grammar</button></div>
    </div>
  );
}
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-slate-500 mb-4">Coming soon!</p><button onClick={onComplete} className="px-4 py-2 text-black rounded-xl text-sm font-semibold transition" style={{ background: '#FFCC00' }}>Mark Complete</button></div>; }

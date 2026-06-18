import { useState } from 'react';
import SpeakerButton from './SpeakerButton';
import { IconEdit, IconLightbulb, IconCheck } from './Icons';
export default function Grammar({ content, onComplete }) {
  const [showEx, setShowEx] = useState(true);
  if (!content.rule) return <Empty onComplete={onComplete} />;
  return (
    <div className="fade-in">
      <h3 className="font-bold text-cream-100 text-lg mb-5 flex items-center gap-2"><IconEdit className="w-5 h-5 text-sage-400" /> Grammar Lesson</h3>
      <div className="glass-card p-5">
        {content.rule && <div className="rounded-2xl p-4 mb-4 border border-sky-400/20" style={{ background: 'rgba(107, 163, 190, 0.05)' }}><p className="text-[11px] font-bold text-sky-400 mb-1 uppercase flex items-center gap-1" style={{ letterSpacing: '0.5px' }}><IconEdit className="w-3.5 h-3.5" /> Rule:</p><p className="text-[14px] font-medium text-cream-200">{content.rule}</p></div>}
        {content.examples?.length > 0 && <div className="mb-4"><button onClick={() => setShowEx(!showEx)} className="text-[12px] font-bold text-cream-500 mb-2 flex items-center gap-1">{showEx ? '▼' : '▶'} Examples</button>{showEx && <div className="space-y-2 ml-4">{content.examples.map((ex, i) => (<div key={i} className="border border-border rounded-xl p-3" style={{ background: '#142620' }}><div className="flex items-center gap-2"><p className="font-medium text-cream-200 flex-1">{ex.german}</p><SpeakerButton text={ex.german} size="sm" /></div><p className="text-[12px] text-cream-400">{ex.english}</p></div>))}</div>}</div>}
        {content.note && <div className="rounded-xl p-3 mt-3 border border-sage-400/20" style={{ background: 'rgba(127, 176, 105, 0.05)' }}><p className="text-[12px] text-cream-300 flex items-center gap-1"><IconLightbulb className="w-3.5 h-3.5 text-sky-400" /> {content.note}</p></div>}
      </div>
      <div className="text-center mt-4"><button onClick={onComplete} className="btn-primary px-6 active:scale-95"><IconCheck className="w-4 h-4 inline-block align-text-bottom mr-1" /> I understand this grammar</button></div>
    </div>
  );
}
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-cream-400 mb-4">Coming soon!</p><button onClick={onComplete} className="btn-primary px-6">Mark Complete</button></div>; }

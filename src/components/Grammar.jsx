import { useState } from 'react';
import SpeakerButton from './SpeakerButton';
import { IconEdit, IconLightbulb, IconCheck } from './Icons';
export default function Grammar({ content, onComplete }) {
  const [showEx, setShowEx] = useState(true);
  if (!content.rule) return <Empty onComplete={onComplete} />;
  return (
    <div className="fade-in">
      <h3 className="font-bold text-text-dark text-lg mb-5 flex items-center gap-2"><IconEdit className="w-5 h-5 text-gold" /> Grammar Lesson</h3>
      <div className="paper-card p-5">
        {content.rule && <div className=" p-4 mb-4 border border-gold/20" style={{ background: 'rgba(196,146,74,0.05)' }}><p className="text-[11px] font-bold text-gold mb-1 uppercase flex items-center gap-1" style={{ letterSpacing: '0.5px' }}><IconEdit className="w-3.5 h-3.5" /> Rule:</p><p className="text-[14px] font-medium text-text-body">{content.rule}</p></div>}
        {content.examples?.length > 0 && <div className="mb-4"><button onClick={() => setShowEx(!showEx)} className="text-sm font-bold text-text-body mb-2 flex items-center gap-1.5">{showEx ? '▼' : '▶'} Examples</button>{showEx && <div className="space-y-2 ml-4">{content.examples.map((ex, i) => (<div key={i} className="border border-border  p-3 bg-bg-secondary"><div className="flex items-center gap-2"><p className="font-medium text-text-body flex-1">{ex.german}</p><SpeakerButton text={ex.german} size="sm" /></div><p className="text-[12px] text-text-muted">{ex.english}</p></div>))}</div>}</div>}
        {content.note && <div className=" p-3 mt-3 border border-gold/20" style={{ background: 'rgba(196,146,74,0.05)' }}><p className="text-[12px] text-text-body flex items-center gap-1"><IconLightbulb className="w-3.5 h-3.5 text-gold" /> {content.note}</p></div>}
      </div>
      <div className="text-center mt-4"><button onClick={onComplete} className="btn-primary px-6 active:scale-95"><IconCheck className="w-4 h-4 inline-block align-text-bottom mr-1" /> I understand this grammar</button></div>
    </div>
  );
}
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-text-muted mb-4">Coming soon!</p><button onClick={onComplete} className="btn-primary px-6">Mark Complete</button></div>; }

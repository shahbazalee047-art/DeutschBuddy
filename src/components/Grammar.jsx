import { useState } from 'react';
import SpeakerButton from './SpeakerButton';
import { IconEdit, IconLightbulb, IconCheck } from './Icons';
export default function Grammar({ content, onComplete }) {
  const [showEx, setShowEx] = useState(true);
  if (!content.rule) return <Empty onComplete={onComplete} />;
  return (
    <div className="fade-in reading-body">
      <h3 className="mb-5 flex items-center gap-2 text-lg font-bold text-text-dark"><IconEdit className="h-5 w-5 text-primary" /> Grammar Lesson</h3>
      <div className="paper-card p-5">
        {content.rule && <div className="mb-4 border border-primary/20 bg-primary-light p-4"><p className="mb-1 flex items-center gap-1 text-[11px] font-bold uppercase text-primary" style={{ letterSpacing: '0.5px' }}><IconEdit className="h-3.5 w-3.5" /> Rule:</p><p className="text-[14px] font-medium text-text-body">{content.rule}</p></div>}
        {content.examples?.length > 0 && <div className="mb-4"><button onClick={() => setShowEx(!showEx)} className="text-sm font-bold text-text-body mb-2 flex items-center gap-1.5">{showEx ? '▼' : '▶'} Examples</button>{showEx && <div className="ml-4 space-y-2">{content.examples.map((ex, i) => (<div key={i} className="border border-accent/25 bg-accent-light p-3"><div className="flex items-center gap-2"><p className="flex-1 font-medium text-text-dark">{ex.german}</p><SpeakerButton text={ex.german} size="sm" /></div><p className="text-[12px] text-text-muted">{ex.english}</p></div>))}</div>}</div>}
        {content.note && <div className="mt-3 border border-primary/20 bg-primary-light p-3"><p className="flex items-center gap-1 text-[12px] text-text-body"><IconLightbulb className="h-3.5 w-3.5 text-primary" /> {content.note}</p></div>}
      </div>
      <div className="text-center mt-4"><button onClick={() => onComplete({ score: 1, maxScore: 1 })} className="btn-primary px-6 active:scale-95"><IconCheck className="w-4 h-4 inline-block align-text-bottom mr-1" /> I understand this grammar</button></div>
    </div>
  );
}
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-text-muted mb-4">Coming soon!</p><button onClick={() => onComplete({ score: 1, maxScore: 1 })} className="btn-primary px-6">Mark Complete</button></div>; }

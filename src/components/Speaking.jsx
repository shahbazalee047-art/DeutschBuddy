import { useState } from 'react';
import SpeakerButton from './SpeakerButton';
import { IconMic, IconLightbulb } from './Icons';
export default function Speaking({ content, onComplete }) {
  const [step, setStep] = useState(0); const [done, setDone] = useState(false);
  const steps = content.steps || []; const tips = content.tips || [];
  if (!content.prompt && !steps.length) return <Empty onComplete={onComplete} />;
  return (
    <div className="fade-in reading-body">
      <h3 className="mb-5 flex items-center gap-2 text-lg font-bold text-text-dark"><IconMic className="h-5 w-5 text-primary" /> Speaking Practice</h3>
      <div className="paper-card p-5 mb-4">
        <div className="mb-4 border border-primary/20 bg-primary-light p-4">
          <p className="mb-1 flex items-center gap-1 text-[11px] font-bold uppercase text-primary" style={{ letterSpacing: '0.5px' }}><IconMic className="h-3.5 w-3.5" /> Say this:</p>
          <div className="flex items-center gap-2"><p className="text-[16px] text-text-body font-medium flex-1">{content.prompt}</p><SpeakerButton text={content.prompt} size="md" /></div>
        </div>
        {steps.length > 0 && <div className="mt-3 space-y-2">{steps.map((s, i) => (<button key={i} onClick={() => setStep(i)} className={`w-full border p-3 text-left text-sm transition-all active:scale-[0.98] ${step === i ? 'border-primary/20 bg-primary-light font-semibold text-primary' : 'border-border bg-bg-secondary text-text-muted hover:border-primary/30'}`}><span className="mr-2 font-bold">{i + 1}.</span>{s}</button>))}</div>}
        {tips.length > 0 && <div className="mt-3 border border-primary/20 bg-primary-light p-3"><p className="mb-1 flex items-center gap-1 text-[11px] font-bold text-primary"><IconLightbulb className="h-3.5 w-3.5" /> Tips:</p><ul className="space-y-0.5 text-[12px] text-text-body">{tips.map((t, i) => <li key={i}>• {t}</li>)}</ul></div>}
      </div>
      <div className="text-center"><label className="flex cursor-pointer items-center justify-center gap-3"><input type="checkbox" checked={done} onChange={e => { setDone(e.target.checked); if (e.target.checked) onComplete({ score: 1, maxScore: 1 }); }} className="h-5 w-5 accent-primary" /><span className="text-sm text-text-muted">I practiced speaking this</span></label></div>
    </div>
  );
}
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-text-muted mb-4">Coming soon!</p><button onClick={() => onComplete({ score: 1, maxScore: 1 })} className="btn-primary px-6">Mark Complete</button></div>; }

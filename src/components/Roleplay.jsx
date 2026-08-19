import { useState } from 'react';
import SpeakerButton from './SpeakerButton';
import { IconTheater, IconVideo } from './Icons';
export default function Roleplay({ content, onComplete }) {
  const [step, setStep] = useState(0); const [done, setDone] = useState(false);
  const steps = content.steps || [];
  if (!steps.length) return <Empty onComplete={onComplete} />;
  return (
    <div className="fade-in">
      <h3 className="mb-5 flex items-center gap-2 text-lg font-bold text-text-dark"><IconTheater className="h-5 w-5 text-primary" /> Roleplay</h3>
      <div className="paper-card p-5">
        <div className="mb-4 border border-primary/20 bg-primary-light p-4"><p className="mb-1 flex items-center gap-1 text-[11px] font-bold uppercase text-primary" style={{ letterSpacing: '0.5px' }}><IconVideo className="h-3.5 w-3.5" /> Scenario:</p><p className="text-[14px] text-text-body">{content.scenario}</p></div>
        <div className="space-y-2">{steps.map((s, i) => (
          <div
            key={i}
            role="button"
            tabIndex={0}
            onClick={() => setStep(i)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setStep(i); } }}
            className={`flex w-full cursor-pointer select-none items-center gap-3 border p-3 text-left text-sm transition-all active:scale-[0.98] ${step === i ? 'border-primary/20 bg-primary-light text-primary font-semibold' : 'border-border bg-bg-secondary text-text-muted hover:border-primary/30'}`}
          >
            <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${i <= step ? 'bg-primary text-text-on-primary' : 'bg-bg-secondary text-text-muted'}`}>{i + 1}</span>
            <span className="flex-1">{s}</span><SpeakerButton text={s} size="sm" />
          </div>
        ))}</div>
      </div>
      <div className="mt-4 text-center"><label className="flex cursor-pointer items-center justify-center gap-3"><input type="checkbox" checked={done} onChange={e => { setDone(e.target.checked); if (e.target.checked) onComplete({ score: 1, maxScore: 1 }); }} className="h-5 w-5 accent-primary" /><span className="text-sm text-text-muted">I completed this roleplay</span></label></div>
    </div>
  );
}
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-text-muted mb-4">Coming soon!</p><button onClick={() => onComplete({ score: 1, maxScore: 1 })} className="btn-primary px-6">Mark Complete</button></div>; }

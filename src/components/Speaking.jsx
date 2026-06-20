import { useState } from 'react';
import SpeakerButton from './SpeakerButton';
import { IconMic, IconLightbulb } from './Icons';
export default function Speaking({ content, onComplete }) {
  const [step, setStep] = useState(0); const [done, setDone] = useState(false);
  const steps = content.steps || []; const tips = content.tips || [];
  if (!content.prompt && !steps.length) return <Empty onComplete={onComplete} />;
  return (
    <div className="fade-in">
      <h3 className="font-bold text-text-dark text-lg mb-5 flex items-center gap-2"><IconMic className="w-5 h-5 text-gold" /> Speaking Practice</h3>
      <div className="paper-card p-5 mb-4">
        <div className=" p-4 mb-4 border border-gold/20" style={{ background: 'rgba(196,146,74,0.05)' }}>
          <p className="text-[11px] font-bold text-gold mb-1 uppercase flex items-center gap-1" style={{ letterSpacing: '0.5px' }}><IconMic className="w-3.5 h-3.5" /> Say this:</p>
          <div className="flex items-center gap-2"><p className="text-[16px] text-text-body font-medium flex-1">{content.prompt}</p><SpeakerButton text={content.prompt} size="md" /></div>
        </div>
        {steps.length > 0 && <div className="space-y-2 mt-3">{steps.map((s, i) => (<button key={i} onClick={() => setStep(i)} className={`w-full text-left p-3  border text-sm transition-all active:scale-[0.98] ${step === i ? 'bg-gold/10 border-gold/20 text-gold font-semibold' : 'bg-bg-secondary border-border text-text-muted hover:border-gold/30'}`}><span className="font-bold mr-2">{i + 1}.</span>{s}</button>))}</div>}
        {tips.length > 0 && <div className="mt-3 p-3  border border-gold/20" style={{ background: 'rgba(196,146,74,0.05)' }}><p className="text-[11px] font-bold text-gold mb-1 flex items-center gap-1"><IconLightbulb className="w-3.5 h-3.5" /> Tips:</p><ul className="text-[12px] text-text-body space-y-0.5">{tips.map((t, i) => <li key={i}>• {t}</li>)}</ul></div>}
      </div>
      <div className="text-center"><label className="flex items-center justify-center gap-3 cursor-pointer"><input type="checkbox" checked={done} onChange={e => { setDone(e.target.checked); if (e.target.checked) onComplete(); }} className="w-5 h-5 rounded border-cream-500" style={{ accentColor: 'var(--gold)' }} /><span className="text-sm text-text-muted">I practiced speaking this</span></label></div>
    </div>
  );
}
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-text-muted mb-4">Coming soon!</p><button onClick={onComplete} className="btn-primary px-6">Mark Complete</button></div>; }

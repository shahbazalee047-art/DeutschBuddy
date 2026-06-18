import { useState } from 'react';
import SpeakerButton from './SpeakerButton';
import { IconMic, IconLightbulb } from './Icons';
export default function Speaking({ content, onComplete }) {
  const [step, setStep] = useState(0); const [done, setDone] = useState(false);
  const steps = content.steps || []; const tips = content.tips || [];
  if (!content.prompt && !steps.length) return <Empty onComplete={onComplete} />;
  return (
    <div className="fade-in">
      <h3 className="font-bold text-cream-100 text-lg mb-5 flex items-center gap-2"><IconMic className="w-5 h-5 text-sky-400" /> Speaking Practice</h3>
      <div className="glass-card p-5 mb-4">
        <div className="rounded-2xl p-4 mb-4 border border-sage-400/20" style={{ background: 'rgba(127, 176, 105, 0.05)' }}>
          <p className="text-[11px] font-bold text-sage-400 mb-1 uppercase flex items-center gap-1" style={{ letterSpacing: '0.5px' }}><IconMic className="w-3.5 h-3.5" /> Say this:</p>
          <div className="flex items-center gap-2"><p className="text-[16px] text-cream-200 font-medium flex-1">{content.prompt}</p><SpeakerButton text={content.prompt} size="md" /></div>
        </div>
        {steps.length > 0 && <div className="space-y-2 mt-3">{steps.map((s, i) => (<button key={i} onClick={() => setStep(i)} className={`w-full text-left p-3 rounded-xl border text-sm transition-all active:scale-[0.98] ${step === i ? 'bg-sage-400/10 border-sage-400/20 text-sage-400 font-semibold' : 'bg-forest-800 border-border text-cream-400 hover:border-sage-400/30'}`}><span className="font-bold mr-2">{i + 1}.</span>{s}</button>))}</div>}
        {tips.length > 0 && <div className="mt-3 p-3 rounded-xl border border-sky-400/20" style={{ background: 'rgba(107, 163, 190, 0.05)' }}><p className="text-[11px] font-bold text-sky-400 mb-1 flex items-center gap-1"><IconLightbulb className="w-3.5 h-3.5" /> Tips:</p><ul className="text-[12px] text-cream-300 space-y-0.5">{tips.map((t, i) => <li key={i}>• {t}</li>)}</ul></div>}
      </div>
      <div className="text-center"><label className="flex items-center justify-center gap-3 cursor-pointer"><input type="checkbox" checked={done} onChange={e => { setDone(e.target.checked); if (e.target.checked) onComplete(); }} className="w-5 h-5 rounded border-cream-500" style={{ accentColor: '#7FB069' }} /><span className="text-sm text-cream-400">I practiced speaking this</span></label></div>
    </div>
  );
}
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-cream-400 mb-4">Coming soon!</p><button onClick={onComplete} className="btn-primary px-6">Mark Complete</button></div>; }

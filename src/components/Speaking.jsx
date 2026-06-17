import { useState } from 'react';
import SpeakerButton from './SpeakerButton';
export default function Speaking({ content, onComplete }) {
  const [step, setStep] = useState(0); const [done, setDone] = useState(false);
  const steps = content.steps || []; const tips = content.tips || [];
  if (!content.prompt && !steps.length) return <Empty onComplete={onComplete} />;
  return (
    <div className="fade-in">
      <h3 className="font-bold text-zinc-100 text-lg mb-5">🗣️ Speaking Practice</h3>
      <div className="glass-card p-5 mb-4">
        <div className="rounded-2xl p-4 mb-4 border border-lime-500/20" style={{ background: 'rgba(163, 230, 53, 0.05)' }}>
          <p className="text-[11px] font-bold text-lime-400 mb-1 uppercase" style={{ letterSpacing: '0.5px' }}>🗣️ Say this:</p>
          <div className="flex items-center gap-2"><p className="text-[16px] text-zinc-200 font-medium flex-1">{content.prompt}</p><SpeakerButton text={content.prompt} size="md" /></div>
        </div>
        {steps.length > 0 && <div className="space-y-2 mt-3">{steps.map((s, i) => (<button key={i} onClick={() => setStep(i)} className={`w-full text-left p-3 rounded-xl border text-sm transition-all active:scale-[0.98] ${step === i ? 'bg-lime-500/10 border-lime-500/20 text-lime-400 font-semibold' : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-lime-500/30'}`}><span className="font-bold mr-2">{i + 1}.</span>{s}</button>))}</div>}
        {tips.length > 0 && <div className="mt-3 p-3 rounded-xl border border-cyan-500/20" style={{ background: 'rgba(6, 182, 212, 0.05)' }}><p className="text-[11px] font-bold text-cyan-400 mb-1">💡 Tips:</p><ul className="text-[12px] text-zinc-300 space-y-0.5">{tips.map((t, i) => <li key={i}>• {t}</li>)}</ul></div>}
      </div>
      <div className="text-center"><label className="flex items-center justify-center gap-3 cursor-pointer"><input type="checkbox" checked={done} onChange={e => { setDone(e.target.checked); if (e.target.checked) onComplete(); }} className="w-5 h-5 rounded border-zinc-600" style={{ accentColor: '#A3E635' }} /><span className="text-sm text-zinc-400">I practiced speaking this</span></label></div>
    </div>
  );
}
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-zinc-400 mb-4">Coming soon!</p><button onClick={onComplete} className="btn-primary px-6">Mark Complete</button></div>; }

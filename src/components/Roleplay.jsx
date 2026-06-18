import { useState } from 'react';
import SpeakerButton from './SpeakerButton';
import { IconTheater, IconVideo } from './Icons';
export default function Roleplay({ content, onComplete }) {
  const [step, setStep] = useState(0); const [done, setDone] = useState(false);
  const steps = content.steps || [];
  if (!steps.length) return <Empty onComplete={onComplete} />;
  return (
    <div className="fade-in">
      <h3 className="font-bold text-zinc-100 text-lg mb-5 flex items-center gap-2"><IconTheater className="w-5 h-5 text-warning" /> Roleplay</h3>
      <div className="glass-card p-5">
        <div className="rounded-2xl p-4 mb-4 border border-warning/20" style={{ background: 'rgba(245, 158, 11, 0.05)' }}><p className="text-[11px] font-bold text-warning mb-1 uppercase flex items-center gap-1" style={{ letterSpacing: '0.5px' }}><IconVideo className="w-3.5 h-3.5" /> Scenario:</p><p className="text-[14px] text-zinc-300">{content.scenario}</p></div>
        <div className="space-y-2">{steps.map((s, i) => (<button key={i} onClick={() => setStep(i)} className={`w-full text-left p-3 rounded-xl border text-sm transition-all flex items-center gap-3 active:scale-[0.98] ${step === i ? 'bg-warning/10 border-warning/20 text-warning font-semibold' : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-warning/30'}`}>
          <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${i <= step ? 'text-zinc-900' : 'bg-zinc-700 text-zinc-500'}`} style={i <= step ? { background: '#F59E0B' } : {}}>{i + 1}</span>
          <span className="flex-1">{s}</span><SpeakerButton text={s} size="sm" />
        </button>))}</div>
      </div>
      <div className="text-center mt-4"><label className="flex items-center justify-center gap-3 cursor-pointer"><input type="checkbox" checked={done} onChange={e => { setDone(e.target.checked); if (e.target.checked) onComplete(); }} className="w-5 h-5 rounded border-zinc-600" style={{ accentColor: '#A3E635' }} /><span className="text-sm text-zinc-400">I completed this roleplay</span></label></div>
    </div>
  );
}
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-zinc-400 mb-4">Coming soon!</p><button onClick={onComplete} className="btn-primary px-6">Mark Complete</button></div>; }

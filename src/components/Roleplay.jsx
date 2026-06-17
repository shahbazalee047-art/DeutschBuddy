import { useState } from 'react';
import SpeakerButton from './SpeakerButton';
export default function Roleplay({ content, onComplete }) {
  const [step, setStep] = useState(0); const [done, setDone] = useState(false);
  const steps = content.steps || [];
  if (!steps.length) return <Empty onComplete={onComplete} />;
  return (
    <div className="fade-in">
      <h3 className="font-bold text-slate-200 text-lg mb-5">🎭 Roleplay</h3>
      <div className="bg-slate-800 border border-slate-700/50 rounded-2xl p-5">
        <div className="bg-purple-400/10 border border-purple-400/20 rounded-xl p-4 mb-4"><p className="text-xs text-purple-400 font-medium mb-1">🎬 Scenario:</p><p className="text-sm text-purple-300">{content.scenario}</p></div>
        <div className="space-y-1.5">{steps.map((s, i) => (<button key={i} onClick={() => setStep(i)} className={`w-full text-left p-3 rounded-xl border text-sm transition-all flex items-center gap-3 ${step === i ? 'bg-purple-400/10 border-purple-400/20 text-purple-300' : 'bg-slate-900/50 border-slate-700/50 text-slate-400 hover:border-slate-600'}`}>
          <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${i <= step ? 'bg-purple-400/20 text-purple-400' : 'bg-slate-700 text-slate-500'}`}>{i + 1}</span>
          <span className="flex-1">{s}</span><SpeakerButton text={s} size="sm" />
        </button>))}</div>
      </div>
      <div className="text-center mt-4"><label className="flex items-center justify-center gap-3 cursor-pointer"><input type="checkbox" checked={done} onChange={e => { setDone(e.target.checked); if (e.target.checked) onComplete(); }} className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-purple-400 focus:ring-purple-400/50" /><span className="text-sm text-slate-400">I completed this roleplay</span></label></div>
    </div>
  );
}
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-slate-500 mb-4">Coming soon!</p><button onClick={onComplete} className="px-4 py-2 bg-lime-400 text-slate-900 rounded-xl text-sm font-semibold hover:bg-lime-300 transition">Mark Complete</button></div>; }

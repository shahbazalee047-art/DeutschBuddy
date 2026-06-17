import { useState } from 'react';
import SpeakerButton from './SpeakerButton';
export default function Speaking({ content, onComplete }) {
  const [step, setStep] = useState(0); const [done, setDone] = useState(false);
  const steps = content.steps || []; const tips = content.tips || [];
  if (!content.prompt && !steps.length) return <Empty onComplete={onComplete} />;
  return (
    <div className="fade-in">
      <h3 className="font-bold text-slate-200 text-lg mb-5">🗣️ Speaking Practice</h3>
      <div className="bg-slate-800 border border-slate-700/50 rounded-2xl p-5 mb-4">
        <div className="rounded-xl p-4 mb-4" style={{ background: 'rgba(255,204,0,0.1)', border: '1px solid rgba(255,204,0,0.2)' }}>
          <p className="text-xs font-medium mb-1" style={{ color: '#FFCC00' }}>🗣️ Say this:</p>
          <div className="flex items-center gap-2"><p className="text-base text-slate-200 font-medium flex-1">{content.prompt}</p><SpeakerButton text={content.prompt} size="md" /></div>
        </div>
        {steps.length > 0 && <div className="space-y-1.5 mt-3">{steps.map((s, i) => (<button key={i} onClick={() => setStep(i)} className={`w-full text-left p-3 rounded-xl border text-sm transition-all ${step === i ? 'text-black' : 'bg-slate-900/50 border-slate-700/50 text-slate-400 hover:border-slate-600'}`}
          style={step === i ? { background: 'rgba(255,204,0,0.1)', borderColor: 'rgba(255,204,0,0.2)', color: '#FFCC00' } : {}}><span className="font-bold mr-2">{i + 1}.</span>{s}</button>))}</div>}
        {tips.length > 0 && <div className="mt-3 p-3 rounded-xl" style={{ background: 'rgba(221,0,0,0.1)', border: '1px solid rgba(221,0,0,0.2)' }}><p className="text-xs font-bold mb-1" style={{ color: '#DD0000' }}>💡 Tips:</p><ul className="text-xs text-slate-300/70 space-y-0.5">{tips.map((t, i) => <li key={i}>• {t}</li>)}</ul></div>}
      </div>
      <div className="text-center"><label className="flex items-center justify-center gap-3 cursor-pointer"><input type="checkbox" checked={done} onChange={e => { setDone(e.target.checked); if (e.target.checked) onComplete(); }} className="w-5 h-5 rounded border-slate-600 bg-slate-800 focus:ring-[#FFCC00]/50" style={{ accentColor: '#FFCC00' }} /><span className="text-sm text-slate-400">I practiced speaking this</span></label></div>
    </div>
  );
}
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-slate-500 mb-4">Coming soon!</p><button onClick={onComplete} className="px-4 py-2 text-black rounded-xl text-sm font-semibold transition" style={{ background: '#FFCC00' }}>Mark Complete</button></div>; }

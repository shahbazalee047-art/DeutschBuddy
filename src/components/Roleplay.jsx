import { useState } from 'react';
import SpeakerButton from './SpeakerButton';
export default function Roleplay({ content, onComplete }) {
  const [step, setStep] = useState(0); const [done, setDone] = useState(false);
  const steps = content.steps || [];
  if (!steps.length) return <Empty onComplete={onComplete} />;
  return (
    <div className="fade-in">
      <h3 className="font-bold text-[#1a1a2e] text-lg mb-5">🎭 Roleplay</h3>
      <div className="bg-white border border-[#E8DFD4] rounded-2xl p-5 shadow-sm">
        <div className="rounded-xl p-4 mb-4" style={{ background: 'rgba(196,149,106,0.1)', border: '1px solid rgba(196,149,106,0.2)' }}><p className="text-xs font-medium mb-1" style={{ color: '#C4956A' }}>🎬 Scenario:</p><p className="text-sm text-[#4a5568]">{content.scenario}</p></div>
        <div className="space-y-1.5">{steps.map((s, i) => (<button key={i} onClick={() => setStep(i)} className={`w-full text-left p-3 rounded-xl border text-sm transition-all flex items-center gap-3 ${step === i ? '' : 'bg-[#FAF5ED] border-[#E8DFD4] text-[#6b7280] hover:border-[#d4c9b8]'}`}
          style={step === i ? { background: 'rgba(196,149,106,0.1)', borderColor: 'rgba(196,149,106,0.2)', color: '#C4956A' } : {}}>
          <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${i <= step ? 'text-white' : 'bg-[#E8DFD4] text-[#9ca3af]'}`}
            style={i <= step ? { background: '#C4956A' } : {}}>{i + 1}</span>
          <span className="flex-1">{s}</span><SpeakerButton text={s} size="sm" />
        </button>))}</div>
      </div>
      <div className="text-center mt-4"><label className="flex items-center justify-center gap-3 cursor-pointer"><input type="checkbox" checked={done} onChange={e => { setDone(e.target.checked); if (e.target.checked) onComplete(); }} className="w-5 h-5 rounded border-[#E8DFD4] focus:ring-[#8B6914]/50" style={{ accentColor: '#8B6914' }} /><span className="text-sm text-[#6b7280]">I completed this roleplay</span></label></div>
    </div>
  );
}
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-[#9ca3af] mb-4">Coming soon!</p><button onClick={onComplete} className="px-4 py-2 text-white rounded-xl text-sm font-semibold transition" style={{ background: 'linear-gradient(135deg, #8B6914, #C4956A)' }}>Mark Complete</button></div>; }

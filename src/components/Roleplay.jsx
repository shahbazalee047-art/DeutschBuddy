import { useState } from 'react';
import SpeakerButton from './SpeakerButton';
export default function Roleplay({ content, onComplete }) {
  const [step, setStep] = useState(0); const [done, setDone] = useState(false);
  const steps = content.steps || [];
  if (!steps.length) return <Empty onComplete={onComplete} />;
  return (
    <div className="fade-in">
      <h3 className="font-bold text-[#1A1A2E] text-lg mb-5">🎭 Roleplay</h3>
      <div className="paper-card p-5">
        <div className="rounded-2xl p-4 mb-4" style={{ background: '#FFF3E0', border: '1px solid #FF980020' }}><p className="text-[11px] font-bold text-[#FF9800] mb-1 uppercase" style={{ letterSpacing: '0.5px' }}>🎬 Scenario:</p><p className="text-[14px] text-[#4A4A5A]">{content.scenario}</p></div>
        <div className="space-y-2">{steps.map((s, i) => (<button key={i} onClick={() => setStep(i)} className={`w-full text-left p-3 rounded-xl border text-sm transition-all flex items-center gap-3 ${step === i ? 'bg-[#FFF3E0] border-[#FF9800]/20 text-[#FF9800] font-semibold' : 'bg-[#FAF6F0] border-[#E8E0D4] text-[#8A8A9A] hover:border-[#FF9800]/30'}`}>
          <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${i <= step ? 'text-white' : 'bg-[#E8E0D4] text-[#8A8A9A]'}`} style={i <= step ? { background: '#FF9800' } : {}}>{i + 1}</span>
          <span className="flex-1">{s}</span><SpeakerButton text={s} size="sm" />
        </button>))}</div>
      </div>
      <div className="text-center mt-4"><label className="flex items-center justify-center gap-3 cursor-pointer"><input type="checkbox" checked={done} onChange={e => { setDone(e.target.checked); if (e.target.checked) onComplete(); }} className="w-5 h-5 rounded border-[#E8E0D4] accent-[#B8860B]" /><span className="text-sm text-[#8A8A9A]">I completed this roleplay</span></label></div>
    </div>
  );
}
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-[#8A8A9A] mb-4">Coming soon!</p><button onClick={onComplete} className="btn-primary px-6">Mark Complete</button></div>; }

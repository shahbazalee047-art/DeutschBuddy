import { useState } from 'react';
import SpeakerButton from './SpeakerButton';
export default function Speaking({ content, onComplete }) {
  const [step, setStep] = useState(0); const [done, setDone] = useState(false);
  const steps = content.steps || []; const tips = content.tips || [];
  if (!content.prompt && !steps.length) return <Empty onComplete={onComplete} />;
  return (
    <div className="fade-in">
      <h3 className="font-bold text-[#1A1A2E] text-lg mb-5">🗣️ Speaking Practice</h3>
      <div className="paper-card p-5 mb-4">
        <div className="rounded-2xl p-4 mb-4" style={{ background: '#FFF8E1', border: '1px solid #B8860B20' }}>
          <p className="text-[11px] font-bold text-[#B8860B] mb-1 uppercase" style={{ letterSpacing: '0.5px' }}>🗣️ Say this:</p>
          <div className="flex items-center gap-2"><p className="text-[16px] text-[#1A1A2E] font-medium flex-1">{content.prompt}</p><SpeakerButton text={content.prompt} size="md" /></div>
        </div>
        {steps.length > 0 && <div className="space-y-2 mt-3">{steps.map((s, i) => (<button key={i} onClick={() => setStep(i)} className={`w-full text-left p-3 rounded-xl border text-sm transition-all ${step === i ? 'bg-[#FFF8E1] border-[#B8860B]/20 text-[#B8860B] font-semibold' : 'bg-[#FAF6F0] border-[#E8E0D4] text-[#8A8A9A] hover:border-[#B8860B]/30'}`}><span className="font-bold mr-2">{i + 1}.</span>{s}</button>))}</div>}
        {tips.length > 0 && <div className="mt-3 p-3 rounded-xl" style={{ background: '#E0F2F1', border: '1px solid #2D8B7A20' }}><p className="text-[11px] font-bold text-[#2D8B7A] mb-1">💡 Tips:</p><ul className="text-[12px] text-[#4A4A5A] space-y-0.5">{tips.map((t, i) => <li key={i}>• {t}</li>)}</ul></div>}
      </div>
      <div className="text-center"><label className="flex items-center justify-center gap-3 cursor-pointer"><input type="checkbox" checked={done} onChange={e => { setDone(e.target.checked); if (e.target.checked) onComplete(); }} className="w-5 h-5 rounded border-[#E8E0D4] accent-[#B8860B]" /><span className="text-sm text-[#8A8A9A]">I practiced speaking this</span></label></div>
    </div>
  );
}
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-[#8A8A9A] mb-4">Coming soon!</p><button onClick={onComplete} className="btn-primary px-6">Mark Complete</button></div>; }

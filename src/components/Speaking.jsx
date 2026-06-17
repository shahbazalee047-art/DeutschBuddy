import { useState } from 'react';
import SpeakerButton from './SpeakerButton';
export default function Speaking({ content, onComplete }) {
  const [step, setStep] = useState(0); const [done, setDone] = useState(false);
  const steps = content.steps || []; const tips = content.tips || [];
  if (!content.prompt && !steps.length) return <Empty onComplete={onComplete} />;
  return (
    <div className="fade-in">
      <h3 className="font-bold text-[#1a1a2e] text-lg mb-5">🗣️ Speaking Practice</h3>
      <div className="bg-white border border-[#E8DFD4] rounded-2xl p-5 mb-4 shadow-sm">
        <div className="rounded-xl p-4 mb-4" style={{ background: 'rgba(139,105,20,0.1)', border: '1px solid rgba(139,105,20,0.2)' }}>
          <p className="text-xs font-medium mb-1" style={{ color: '#8B6914' }}>🗣️ Say this:</p>
          <div className="flex items-center gap-2"><p className="text-base text-[#1a1a2e] font-medium flex-1">{content.prompt}</p><SpeakerButton text={content.prompt} size="md" /></div>
        </div>
        {steps.length > 0 && <div className="space-y-1.5 mt-3">{steps.map((s, i) => (<button key={i} onClick={() => setStep(i)} className={`w-full text-left p-3 rounded-xl border text-sm transition-all ${step === i ? '' : 'bg-[#FAF5ED] border-[#E8DFD4] text-[#6b7280] hover:border-[#d4c9b8]'}`}
          style={step === i ? { background: 'rgba(139,105,20,0.1)', borderColor: 'rgba(139,105,20,0.2)', color: '#8B6914' } : {}}><span className="font-bold mr-2">{i + 1}.</span>{s}</button>))}</div>}
        {tips.length > 0 && <div className="mt-3 p-3 rounded-xl" style={{ background: 'rgba(91,140,122,0.1)', border: '1px solid rgba(91,140,122,0.2)' }}><p className="text-xs font-bold mb-1" style={{ color: '#5B8C7A' }}>💡 Tips:</p><ul className="text-xs text-[#4a5568] space-y-0.5">{tips.map((t, i) => <li key={i}>• {t}</li>)}</ul></div>}
      </div>
      <div className="text-center"><label className="flex items-center justify-center gap-3 cursor-pointer"><input type="checkbox" checked={done} onChange={e => { setDone(e.target.checked); if (e.target.checked) onComplete(); }} className="w-5 h-5 rounded border-[#E8DFD4] focus:ring-[#8B6914]/50" style={{ accentColor: '#8B6914' }} /><span className="text-sm text-[#6b7280]">I practiced speaking this</span></label></div>
    </div>
  );
}
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-[#9ca3af] mb-4">Coming soon!</p><button onClick={onComplete} className="px-4 py-2 text-white rounded-xl text-sm font-semibold transition" style={{ background: 'linear-gradient(135deg, #8B6914, #C4956A)' }}>Mark Complete</button></div>; }

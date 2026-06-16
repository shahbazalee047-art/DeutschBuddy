import { useState } from 'react';
import SpeakerButton from './SpeakerButton';

export default function Speaking({ content, onComplete }) {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const steps = content.steps || [];
  const tips = content.tips || [];
  if (!content.prompt && steps.length === 0) return <EmptyState onComplete={onComplete} />;

  return (
    <div className="fade-in">
      <h3 className="font-bold text-slate-200 text-lg mb-5">🗣️ Speaking Practice</h3>
      <div className="glass-card p-5 mb-4">
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-4">
          <p className="text-xs text-blue-400 font-medium mb-1">🗣️ Say this:</p>
          <div className="flex items-center gap-2">
            <p className="text-base text-blue-300 font-medium flex-1">{content.prompt}</p>
            <SpeakerButton text={content.prompt} size="md" />
          </div>
        </div>
        {steps.length > 0 && (
          <div className="space-y-1.5 mt-3">
            {steps.map((step, i) => (
              <button key={i} onClick={() => setActiveStep(i)}
                className={`w-full text-left p-3 rounded-xl border text-sm transition-all ${activeStep === i ? 'bg-blue-500/10 border-blue-500/20 text-blue-300' : 'bg-slate-800/30 border-slate-700/30 text-slate-400 hover:border-slate-600/50'}`}>
                <span className="font-bold mr-2">{i + 1}.</span> {step}
              </button>
            ))}
          </div>
        )}
        {tips.length > 0 && (
          <div className="mt-3 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
            <p className="text-xs font-bold text-amber-400 mb-1">💡 Tips:</p>
            <ul className="text-xs text-amber-300/70 space-y-0.5">{tips.map((t, i) => <li key={i}>• {t}</li>)}</ul>
          </div>
        )}
      </div>
      <div className="text-center">
        <label className="flex items-center justify-center gap-3 cursor-pointer">
          <input type="checkbox" checked={completed} onChange={(e) => { setCompleted(e.target.checked); if (e.target.checked) onComplete(); }}
            className="w-5 h-5 rounded border-slate-700 bg-[#0f172a] text-blue-500 focus:ring-blue-500/50" />
          <span className="text-sm text-slate-400">I practiced speaking this</span>
        </label>
      </div>
    </div>
  );
}

function EmptyState({ onComplete }) {
  return (
    <div className="text-center py-12">
      <div className="text-4xl mb-4">🚧</div>
      <p className="text-slate-500 mb-4">Speaking exercise coming soon!</p>
      <button onClick={onComplete} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm hover:bg-blue-500 transition shadow-lg shadow-blue-500/20">Mark as Complete</button>
    </div>
  );
}

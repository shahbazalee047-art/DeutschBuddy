import { useState } from 'react';
import SpeakerButton from './SpeakerButton';

export default function Roleplay({ content, onComplete }) {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const steps = content.steps || [];
  if (steps.length === 0) return <EmptyState onComplete={onComplete} />;

  return (
    <div className="fade-in">
      <h3 className="font-bold text-slate-200 text-lg mb-5">🎭 Roleplay</h3>
      <div className="glass-card p-5">
        <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl p-4 mb-4">
          <p className="text-xs text-violet-400 font-medium mb-1">🎬 Scenario:</p>
          <p className="text-sm text-violet-300">{content.scenario}</p>
        </div>
        <div className="space-y-1.5">
          {steps.map((step, i) => (
            <button key={i} onClick={() => setActiveStep(i)}
              className={`w-full text-left p-3 rounded-xl border text-sm transition-all flex items-center gap-3 ${activeStep === i ? 'bg-violet-500/10 border-violet-500/20 text-violet-300' : 'bg-slate-800/30 border-slate-700/30 text-slate-400 hover:border-slate-600/50'}`}>
              <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${i <= activeStep ? 'bg-violet-500/20 text-violet-400' : 'bg-slate-700/50 text-slate-500'}`}>{i + 1}</span>
              <span className="flex-1">{step}</span>
              <SpeakerButton text={step} size="sm" />
            </button>
          ))}
        </div>
      </div>
      <div className="text-center mt-4">
        <label className="flex items-center justify-center gap-3 cursor-pointer">
          <input type="checkbox" checked={completed} onChange={(e) => { setCompleted(e.target.checked); if (e.target.checked) onComplete(); }}
            className="w-5 h-5 rounded border-slate-700 bg-[#0f172a] text-violet-500 focus:ring-violet-500/50" />
          <span className="text-sm text-slate-400">I completed this roleplay</span>
        </label>
      </div>
    </div>
  );
}

function EmptyState({ onComplete }) {
  return (
    <div className="text-center py-12">
      <div className="text-4xl mb-4">🚧</div>
      <p className="text-slate-500 mb-4">Roleplay coming soon!</p>
      <button onClick={onComplete} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm hover:bg-blue-500 transition shadow-lg shadow-blue-500/20">Mark as Complete</button>
    </div>
  );
}

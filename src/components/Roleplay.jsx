import { useState } from 'react';
import SpeakerButton from './SpeakerButton';

export default function Roleplay({ content, onComplete }) {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const steps = content.steps || [];
  if (steps.length === 0) return <EmptyState onComplete={onComplete} />;

  return (
    <div className="fade-in">
      <h3 className="font-bold text-zinc-200 text-lg mb-5">🎭 Roleplay</h3>
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
        <div className="bg-purple-400/10 border border-purple-400/20 rounded-xl p-4 mb-4">
          <p className="text-xs text-purple-400 font-medium mb-1">🎬 Scenario:</p>
          <p className="text-sm text-purple-300">{content.scenario}</p>
        </div>
        <div className="space-y-1.5">
          {steps.map((step, i) => (
            <button key={i} onClick={() => setActiveStep(i)}
              className={`w-full text-left p-3 rounded-xl border text-sm transition-all flex items-center gap-3 ${
                activeStep === i ? 'bg-purple-400/10 border-purple-400/20 text-purple-300' : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-600'
              }`}>
              <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                i <= activeStep ? 'bg-purple-400/20 text-purple-400' : 'bg-zinc-700 text-zinc-500'
              }`}>{i + 1}</span>
              <span className="flex-1">{step}</span>
              <SpeakerButton text={step} size="sm" />
            </button>
          ))}
        </div>
      </div>
      <div className="text-center mt-4">
        <label className="flex items-center justify-center gap-3 cursor-pointer">
          <input type="checkbox" checked={completed} onChange={(e) => { setCompleted(e.target.checked); if (e.target.checked) onComplete(); }}
            className="w-5 h-5 rounded border-zinc-600 bg-zinc-800 text-purple-400 focus:ring-purple-400/50" />
          <span className="text-sm text-zinc-400">I completed this roleplay</span>
        </label>
      </div>
    </div>
  );
}

function EmptyState({ onComplete }) {
  return <div className="text-center py-12"><p className="text-zinc-500 mb-4">Coming soon!</p><button onClick={onComplete} className="px-4 py-2 bg-lime-400 text-zinc-950 rounded-xl text-sm font-semibold hover:bg-lime-300 transition">Mark Complete</button></div>;
}

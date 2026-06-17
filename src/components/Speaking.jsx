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
      <h3 className="font-bold text-zinc-200 text-lg mb-5">🗣️ Speaking Practice</h3>
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mb-4">
        <div className="bg-lime-400/10 border border-lime-400/20 rounded-xl p-4 mb-4">
          <p className="text-xs text-lime-400 font-medium mb-1">🗣️ Say this:</p>
          <div className="flex items-center gap-2">
            <p className="text-base text-zinc-200 font-medium flex-1">{content.prompt}</p>
            <SpeakerButton text={content.prompt} size="md" />
          </div>
        </div>
        {steps.length > 0 && (
          <div className="space-y-1.5 mt-3">
            {steps.map((step, i) => (
              <button key={i} onClick={() => setActiveStep(i)}
                className={`w-full text-left p-3 rounded-xl border text-sm transition-all ${
                  activeStep === i ? 'bg-lime-400/10 border-lime-400/20 text-lime-400' : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-600'
                }`}><span className="font-bold mr-2">{i + 1}.</span>{step}</button>
            ))}
          </div>
        )}
        {tips.length > 0 && (
          <div className="mt-3 p-3 bg-cyan-400/10 border border-cyan-400/20 rounded-xl">
            <p className="text-xs font-bold text-cyan-400 mb-1">💡 Tips:</p>
            <ul className="text-xs text-cyan-300/70 space-y-0.5">{tips.map((t, i) => <li key={i}>• {t}</li>)}</ul>
          </div>
        )}
      </div>
      <div className="text-center">
        <label className="flex items-center justify-center gap-3 cursor-pointer">
          <input type="checkbox" checked={completed} onChange={(e) => { setCompleted(e.target.checked); if (e.target.checked) onComplete(); }}
            className="w-5 h-5 rounded border-zinc-600 bg-zinc-800 text-lime-400 focus:ring-lime-400/50" />
          <span className="text-sm text-zinc-400">I practiced speaking this</span>
        </label>
      </div>
    </div>
  );
}

function EmptyState({ onComplete }) {
  return <div className="text-center py-12"><p className="text-zinc-500 mb-4">Coming soon!</p><button onClick={onComplete} className="px-4 py-2 bg-lime-400 text-zinc-950 rounded-xl text-sm font-semibold hover:bg-lime-300 transition">Mark Complete</button></div>;
}

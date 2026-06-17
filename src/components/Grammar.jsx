import { useState } from 'react';
import SpeakerButton from './SpeakerButton';

export default function Grammar({ content, onComplete }) {
  const [showExamples, setShowExamples] = useState(true);
  if (!content.rule) return <EmptyState onComplete={onComplete} />;

  return (
    <div className="fade-in">
      <h3 className="font-bold text-zinc-200 text-lg mb-5">📝 Grammar Lesson</h3>
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
        {content.rule && (
          <div className="bg-purple-400/10 border border-purple-400/20 rounded-xl p-4 mb-4">
            <p className="text-xs text-purple-400 font-medium mb-1">📏 Rule:</p>
            <p className="text-sm text-purple-300 font-medium">{content.rule}</p>
          </div>
        )}
        {content.examples && content.examples.length > 0 && (
          <div className="mb-4">
            <button onClick={() => setShowExamples(!showExamples)} className="text-xs font-bold text-zinc-400 mb-2 flex items-center gap-1">
              {showExamples ? '▼' : '▶'} Examples
            </button>
            {showExamples && (
              <div className="space-y-2 ml-4">
                {content.examples.map((ex, i) => (
                  <div key={i} className="bg-zinc-800 border border-zinc-700 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-zinc-200 flex-1">{ex.german}</p>
                      <SpeakerButton text={ex.german} size="sm" />
                    </div>
                    <p className="text-xs text-zinc-500">{ex.english}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {content.note && <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-3 mt-3"><p className="text-xs text-zinc-400">💡 {content.note}</p></div>}
      </div>
      <div className="text-center mt-4">
        <button onClick={onComplete} className="px-5 py-2.5 bg-lime-400 text-zinc-950 rounded-xl text-sm font-semibold hover:bg-lime-300 transition">✓ I understand this grammar</button>
      </div>
    </div>
  );
}

function EmptyState({ onComplete }) {
  return <div className="text-center py-12"><p className="text-zinc-500 mb-4">Grammar coming soon!</p><button onClick={onComplete} className="px-4 py-2 bg-lime-400 text-zinc-950 rounded-xl text-sm font-semibold hover:bg-lime-300 transition">Mark Complete</button></div>;
}

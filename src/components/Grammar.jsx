import { useState } from 'react';
import SpeakerButton from './SpeakerButton';

export default function Grammar({ content, onComplete }) {
  const [showExamples, setShowExamples] = useState(true);
  if (!content.rule && !content.exercises) return <EmptyState onComplete={onComplete} />;

  return (
    <div className="fade-in">
      <h3 className="font-bold text-slate-200 text-lg mb-5">📝 Grammar Lesson</h3>
      <div className="glass-card p-5">
        {content.rule && (
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 mb-4">
            <p className="text-xs text-purple-400 font-medium mb-1">📏 Rule:</p>
            <p className="text-sm text-purple-300 font-medium">{content.rule}</p>
          </div>
        )}
        {content.examples && content.examples.length > 0 && (
          <div className="mb-4">
            <button onClick={() => setShowExamples(!showExamples)} className="text-xs font-bold text-slate-400 mb-2 flex items-center gap-1">
              {showExamples ? '▼' : '▶'} Examples
            </button>
            {showExamples && (
              <div className="space-y-2 ml-4">
                {content.examples.map((ex, i) => (
                  <div key={i} className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-slate-200 flex-1">{ex.german}</p>
                      <SpeakerButton text={ex.german} size="sm" />
                    </div>
                    <p className="text-xs text-slate-500">{ex.english}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {content.connectors && (
          <div className="mb-4">
            <p className="text-xs font-bold text-slate-400 mb-2">Connectors:</p>
            <div className="grid grid-cols-2 gap-2">
              {content.connectors.map((c, i) => (
                <div key={i} className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-2">
                  <span className="font-bold text-blue-400">{c.word}</span>
                  <span className="text-xs text-blue-300/60 ml-2">= {c.meaning}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {content.note && (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 mt-3">
            <p className="text-xs text-amber-400">💡 {content.note}</p>
          </div>
        )}
      </div>
      <div className="text-center mt-4">
        <button onClick={onComplete} className="px-5 py-2.5 bg-purple-600 text-white rounded-xl text-sm font-semibold hover:bg-purple-500 transition shadow-lg shadow-purple-500/20">
          ✓ I understand this grammar
        </button>
      </div>
    </div>
  );
}

function EmptyState({ onComplete }) {
  return (
    <div className="text-center py-12">
      <div className="text-4xl mb-4">🚧</div>
      <p className="text-slate-500 mb-4">Grammar lesson coming soon!</p>
      <button onClick={onComplete} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm hover:bg-blue-500 transition shadow-lg shadow-blue-500/20">Mark as Complete</button>
    </div>
  );
}

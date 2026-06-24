import { useState } from 'react';
import SpeakerButton from './SpeakerButton';
import { IconBookOpen, IconSpeaker, IconCheck, IconSquare, IconSparkles } from './Icons';

const gc = {
  der: {
    label: 'der',
    color: '#1B3A35',
    border: 'var(--gold)',
    align: 'flex-start',
    cardClass: 'vocab-card-der',
    genderTagClass: 'gender-tag-der'
  },
  die: {
    label: 'die',
    color: '#C44A4A',
    border: 'var(--error)',
    align: 'flex-end',
    cardClass: 'vocab-card-die',
    genderTagClass: 'gender-tag-die'
  },
  das: {
    label: 'das',
    color: '#7A6E62',
    border: 'var(--border-strong)',
    align: 'center',
    cardClass: 'vocab-card-das',
    genderTagClass: 'gender-tag-das'
  }
};

export default function Vocabulary({ content, onComplete }) {
  const [studied, setStudied] = useState(new Set());
  const items = content.items || [];

  if (items.length === 0) return <Empty onComplete={onComplete} />;

  const toggle = (i) => setStudied((p) => {
    const n = new Set(p);
    n.has(i) ? n.delete(i) : n.add(i);
    return n;
  });

  const allStudied = studied.size === items.length;

  return (
    <div className="fade-in reading-body focus-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-text-dark text-lg flex items-center gap-2">
          <IconBookOpen className="w-5 h-5 text-gold" /> Vocabulary
        </h3>
        <span className="text-sm text-text-muted">{studied.size}/{items.length}</span>
      </div>

      <div className="space-y-2 exercise-list">
        {items.map((item, i) => {
          const g = item.gender ? gc[item.gender] : null;

          return (
            <button
              key={i}
              onClick={() => toggle(i)}
              className={`w-full text-left paper-card p-4 transition-all duration-300 hover:border-gold/20 active:scale-[0.99] ${g ? g.cardClass : ''} ${
                studied.has(i) ? 'border-gold/20' : ''
              }`}
              style={{
                background: studied.has(i) ? 'rgba(232,163,61,0.05)' : undefined,
                borderLeftWidth: g ? '3px' : undefined,
                borderLeftColor: g ? g.border : undefined,
                textAlign: g ? 'left' : undefined,
              }}
            >
              <div
                className="flex items-center justify-between"
                style={g ? { justifyContent: 'space-between', flexDirection: 'row' } : {}}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-text-dark text-lg">{item.german}</span>
                    <SpeakerButton text={item.german} size="sm" />
                    {item.gender && g && (
                      <span
                        className={`gender-tag ${g.genderTagClass}`}
                        style={{ color: g.color }}
                      >
                        [{g.label}]
                      </span>
                    )}
                  </div>
                  <p className="text-text-muted text-[14px] mt-0.5">{item.english}</p>
                  {item.pronunciation && (
                    <p className="text-[12px] text-text-muted mt-0.5 flex items-center gap-1">
                      <IconSpeaker className="w-3.5 h-3.5 text-text-muted" />
                      {item.pronunciation}
                    </p>
                  )}
                </div>

                <span className="ml-4 flex-shrink-0">
                  {studied.has(i) ? (
                    <IconCheck className="w-5 h-5" style={{ color: 'var(--success)' }} />
                  ) : (
                    <IconSquare className="w-5 h-5 text-text-muted" />
                  )}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-5 text-center">
        <button
          onClick={onComplete}
          className={`px-6 py-3 font-semibold text-[14px] transition-all active:scale-95 rounded-[var(--radius-button)] ${
            allStudied ? 'btn-primary' : 'btn-secondary'
          }`}
        >
          {allStudied ? (
            <span className="flex items-center justify-center gap-1.5">
              <IconSparkles className="w-4 h-4" /> All studied!
            </span>
          ) : (
            `Complete (${studied.size}/${items.length})`
          )}
        </button>
      </div>
    </div>
  );
}

function Empty({ onComplete }) {
  return (
    <div className="text-center py-12">
      <p className="text-text-muted mb-4">Coming soon!</p>
      <button onClick={onComplete} className="btn-primary px-6">Mark Complete</button>
    </div>
  );
}
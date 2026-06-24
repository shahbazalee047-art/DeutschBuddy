import { IconCheck } from './Icons';

const HERE_RING = 'rgba(240,234,224,0.40)';

export default function JourneyMap({ currentWeek, weeks }) {
  const completedWeeks = weeks.filter(w => w.completed).length;
  const progress = weeks.length > 0 ? (completedWeeks / weeks.length) * 100 : 0;

  return (
    <div className="focus-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[var(--text-h3)] font-bold text-text-dark" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
          Your Journey
        </h2>
        <span className="text-sm font-medium text-gold">{completedWeeks}/{weeks.length} Complete</span>
      </div>

      <div className="relative">
        {weeks.length === 0 ? (
          <div className="text-center py-8 text-text-muted">No journey data available.</div>
        ) : (
          weeks.map((week, index) => {
            const isCurrent = currentWeek === week.id;
            const isCompleted = week.completed;
            const isFuture = !isCompleted && !isCurrent;

            return (
              <div key={week.id} className="relative">
                <div className="flex items-stretch gap-0">
                  {index < weeks.length - 1 && (
                    <div className="absolute left-[19px] top-10 bottom-0 w-0.5 z-0"
                      style={{ background: isCompleted ? 'var(--gold)' : 'var(--border-default)' }}
                    />
                  )}

                  <div className="relative z-10 flex flex-col items-center">
                    {isCurrent && (
                      <div
                        className="absolute inset-0 rounded-full animate-[breath-pulse_1.5s_ease-in-out_infinite]"
                        style={{
                          transform: 'scale(1.35)',
                          border: `2px solid ${HERE_RING}`,
                          background: 'transparent',
                        }}
                      />
                    )}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isCompleted
                          ? 'bg-gold text-[var(--cta-text)] shadow-[0_0_16px_rgba(232,183,61,0.30)]'
                          : isCurrent
                            ? 'bg-[var(--bg-white)] text-gold border-2 border-gold'
                            : 'bg-[var(--card-muted)] border border-dashed border-[var(--border-locked)] text-[var(--text-locked)]'
                      }`}
                    >
                      {isCompleted ? (
                        <IconCheck className="w-5 h-5" />
                      ) : (
                        <span className="text-sm font-bold">{week.day}</span>
                      )}
                    </div>
                  </div>

                  <div className={`flex-1 pb-10 pl-4 ${isFuture ? 'opacity-60' : ''}`}>
                    <div className="flex items-center justify-between mb-1">
                      <h3
                        className={`text-[15px] font-semibold transition-colors ${
                          isCompleted ? 'text-text-dark' : isCurrent ? 'text-gold' : 'text-[var(--text-locked)]'
                        }`}
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {week.title}
                      </h3>
                      {isCompleted && (
                        <span className="text-[11px] font-medium text-gold">+{week.xp} XP</span>
                      )}
                      {isCurrent && (
                        <span className="status-dot-active text-[11px] font-medium text-gold">In Progress</span>
                      )}
                    </div>
                    <p className="text-[13px] text-text-muted leading-relaxed" style={{ lineHeight: '1.5' }}>
                      {week.theme}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex justify-between text-xs mb-2">
          <span className="text-text-muted">Overall Progress</span>
          <span className="text-text-body font-medium">{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-2 overflow-hidden rounded-full bg-[var(--bg-secondary)]">
          <div
            className="h-full transition-all duration-700 rounded-full"
            style={{ width: `${progress}%`, background: 'var(--gold)' }}
          />
        </div>
      </div>
    </div>
  );
}
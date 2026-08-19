import { IconCheck } from './Icons';

export default function JourneyMap({ currentWeek, weeks }) {
  const completedWeeks = weeks.filter(w => w.completed).length;
  const progress = weeks.length > 0 ? (completedWeeks / weeks.length) * 100 : 0;

  return (
    <div className="focus-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[var(--text-h3)] font-bold text-text-dark" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
          Your Journey
        </h2>
        <span className="text-sm font-medium text-success">{completedWeeks}/{weeks.length} Complete</span>
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
                    <div className="absolute bottom-0 left-[19px] top-10 z-0 w-0.5"
                      style={{ background: isCompleted ? 'var(--db-success)' : 'var(--db-border)' }}
                    />
                  )}

                  <div className="relative z-10 flex flex-col items-center">
                    <div
                      className={`relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${
                        isCompleted
                          ? 'bg-success text-white'
                          : isCurrent
                            ? 'border-2 border-primary bg-primary-light text-primary'
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
                          isCompleted ? 'text-text-dark' : isCurrent ? 'text-primary' : 'text-[var(--text-locked)]'
                        }`}
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {week.title}
                      </h3>
                      {isCompleted && (
                        <span className="text-[11px] font-medium text-text-muted">+{week.xp} XP</span>
                      )}
                      {isCurrent && (
                        <span className="status-dot-active text-[11px] font-medium text-primary">In Progress</span>
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
            className="h-full rounded-full bg-primary transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

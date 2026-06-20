import { IconTree, IconChevronRight } from './Icons';

export default function JourneyMap({ currentWeek, weeks }) {
  const completedWeeks = weeks.filter(w => w.completed).length;
  const progress = (completedWeeks / weeks.length) * 100;

  return (
    <div className="paper-card p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <IconTree className="w-4 h-4 text-gold" />
          <h3 className="text-sm font-bold text-text-body" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            Your Journey
          </h3>
        </div>
        <span className="text-xs text-gold font-medium">
          {completedWeeks}/{weeks.length}
        </span>
      </div>
      
      <div className="relative">
        {/* Progress line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gold/20" />
        
        {/* Progress line fill */}
        <div
          className="absolute left-4 top-0 w-0.5 bg-gold transition-all duration-500"
          style={{ height: `${progress}%`, top: '0%' }}
        />
        
        {/* Weeks */}
        <div className="space-y-4 pl-0">
          {weeks.map((week) => (
            <div key={week.id} className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 z-10 ${
                  week.completed ? 'bg-gold text-text-on-dark' : 'bg-bg-secondary border border-gold/20 text-text-muted'
                } ${currentWeek === week.id ? 'ring-2 ring-gold-light/30' : ''}`}
              >
                {week.completed ? (
                  <IconTree className="w-4 h-4" />
                ) : (
                  <span className="text-sm font-medium">{week.day}</span>
                )}
              </div>
              <div className="flex-1">
                <div className={`text-xs font-medium transition-all duration-200 ${
                  week.completed ? 'text-text-body' : 'text-text-muted'
                }`}>
                  {week.title}
                </div>
                {week.completed && (
                  <div className="text-[10px] text-gold font-medium">
                    +{week.xp} XP
                  </div>
                )}
              </div>
              <IconChevronRight className={`w-5 h-5 transition-all duration-200 ${
                week.completed ? 'text-gold' : 'text-text-muted/40'
              }`} />
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gold/10">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-text-muted">Weekly Progress</span>
          <span className="text-text-body">{progress}%</span>
        </div>
        <div className="w-full h-2 overflow-hidden bg-bg-secondary">
          <div
            className="h-full transition-all duration-500"
            style={{ width: `${progress}%`, background: 'var(--gold)' }}
          />
        </div>
      </div>
    </div>
  );
}
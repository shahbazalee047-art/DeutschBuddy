import { IconTree, IconChevronRight } from './Icons';

export default function JourneyMap({ currentWeek, weeks }) {
  const completedWeeks = weeks.filter(w => w.completed).length;
  const progress = (completedWeeks / weeks.length) * 100;

  return (
    <div className="glass-card p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <IconTree className="w-4 h-4 text-sage-400" />
          <h3 className="text-sm font-bold text-cream-200" style={{ fontFamily: 'DM Serif Display, serif' }}>
            Your Journey
          </h3>
        </div>
        <span className="text-xs text-sage-400 font-medium">
          {completedWeeks}/{weeks.length}
        </span>
      </div>
      
      <div className="relative">
        {/* Progress line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-sage-400/20" />
        
        {/* Progress line fill */}
        <div
          className="absolute left-4 top-0 w-0.5 bg-sage-400 transition-all duration-500"
          style={{ height: `${progress}%`, top: '0%' }}
        />
        
        {/* Weeks */}
        <div className="space-y-4 pl-0">
          {weeks.map((week, idx) => (
            <div key={week.id} className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 z-10 ${
                  week.completed ? 'bg-sage-400 text-forest-900' : 'bg-surface-raised border border-sage-400/20 text-cream-500'
                } ${currentWeek === week.id ? 'ring-2 ring-amber-400/30' : ''}`}
              >
                {week.completed ? (
                  <IconTree className="w-4 h-4" />
                ) : (
                  <span className="text-sm font-medium">{week.day}</span>
                )}
              </div>
              <div className="flex-1">
                <div className={`text-xs font-medium transition-all duration-200 ${
                  week.completed ? 'text-cream-200' : 'text-cream-500'
                }`}>
                  {week.title}
                </div>
                {week.completed && (
                  <div className="text-[10px] text-sage-400 font-medium">
                    +{week.xp} XP
                  </div>
                )}
              </div>
              <IconChevronRight className={`w-4 h-4 transition-all duration-200 ${
                week.completed ? 'text-sage-400/60' : 'text-cream-500/20'
              }`} />
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-sage-400/10">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-cream-500">Weekly Progress</span>
          <span className="text-cream-200">{progress}%</span>
        </div>
        <div className="w-full h-2 rounded-full overflow-hidden bg-forest-700">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #7FB069, #D4A574)' }}
          />
        </div>
      </div>
    </div>
  );
}
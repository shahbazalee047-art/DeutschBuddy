import { Flame, CheckCircle, Calendar } from 'lucide-react';

export default function ProgressDashboard({ xp = 340, streak = 7, tasksDone = 18, weeksComplete = 3 }) {
  const maxXP = 500;
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (xp / maxXP) * circumference;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mx-auto p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center mb-4">
          <svg className="transform -rotate-90 w-24 h-24">
            <circle cx="48" cy="48" r={radius} stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
            <circle cx="48" cy="48" r={radius} stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} className="text-amber-500 transition-all duration-1000 ease-out" />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-2xl font-bold text-white">{xp}</span>
            <span className="text-xs font-semibold text-slate-400 tracking-wider">XP</span>
          </div>
        </div>
        <div className="text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">To Next Level</p>
          <p className="text-sm text-slate-500">{maxXP - xp} XP remaining</p>
        </div>
      </div>
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center">
        <div className="flex items-center gap-2 mb-2">
          <Flame className="text-orange-500" size={32}/>
          <span className="text-4xl font-bold text-white">{streak}</span>
        </div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Day Streak</p>
        <p className="text-sm text-slate-500 mt-1">best: 12 days</p>
      </div>
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle className="text-emerald-500" size={32}/>
          <span className="text-4xl font-bold text-white">{tasksDone}</span>
        </div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tasks Done</p>
        <p className="text-sm text-slate-500 mt-1">of 45 total</p>
      </div>
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="text-blue-500" size={32}/>
          <span className="text-4xl font-bold text-white">{weeksComplete}</span>
        </div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Weeks Complete</p>
        <p className="text-sm text-slate-500 mt-1">of 8 weeks</p>
      </div>
    </div>
  );
}
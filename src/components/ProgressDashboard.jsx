import { useState } from 'react';
import { getWeekCompletion } from '../utils/progress';
import { IconBolt, IconFire, IconChart, IconCheck, IconTarget, IconCalendar, IconBookOpen, IconFeather, IconHeadphones, IconMic, IconEdit, IconBook, IconClock, IconGraduation } from './Icons';

export default function ProgressDashboard({ progress, levelData, visibleWeeks, mode }) {
  const levelWeeks = visibleWeeks || levelData.weeks;
  const weeklyStats = levelWeeks.map(week => ({ week: week.id, title: week.title, completion: getWeekCompletion(week.days, progress.completedTasks) }));
  const unlocked = weeklyStats.filter(w => w.completion > 0 || weeklyStats.indexOf(w) < (progress.unlockedWeeks?.length || 1));
  const avgCompletion = unlocked.length > 0 ? Math.round(unlocked.reduce((a, w) => a + w.completion, 0) / unlocked.length) : 0;

  const skillData = [
    { name: 'Reading', icon: IconBookOpen, level: Math.min(45 + Math.floor(progress.xp / 20), 100) },
    { name: 'Writing', icon: IconFeather, level: Math.min(30 + Math.floor(progress.xp / 30), 100) },
    { name: 'Listening', icon: IconHeadphones, level: Math.min(55 + Math.floor(progress.xp / 25), 100) },
    { name: 'Speaking', icon: IconMic, level: Math.min(25 + Math.floor(progress.xp / 35), 100) },
    { name: 'Grammar', icon: IconEdit, level: Math.min(60 + Math.floor(progress.xp / 15), 100) },
    { name: 'Vocabulary', icon: IconBook, level: Math.min(40 + Math.floor(progress.xp / 25), 100) },
  ];

  const calendarDays = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    studied: i < (progress.completedTasks?.length || 0) && Math.random() > 0.3,
    today: i === new Date().getDate() - 1,
  }));

  if (mode === 'statistics') {
    return (
      <div className="fade-in space-y-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: IconBolt, value: progress.xp, label: 'Total XP', color: '#A3E635' },
            { icon: IconFire, value: progress.streak, label: 'Day Streak', color: '#F59E0B' },
            { icon: IconChart, value: `${avgCompletion}%`, label: 'Progress', color: '#06B6D4' },
            { icon: IconCheck, value: progress.completedTasks?.length || 0, label: 'Tasks Done', color: '#22C55E' },
          ].map((stat, i) => (
            <div key={i} className="glass-card p-5 text-center">
              <div className="flex justify-center mb-2"><stat.icon className="w-7 h-7" style={{ color: stat.color }} /></div>
              <div className="text-2xl font-bold tabular-nums" style={{ color: stat.color, fontFamily: 'Poppins, sans-serif' }}>{stat.value}</div>
              <div className="text-[11px] text-zinc-500 font-medium mt-1 uppercase" style={{ letterSpacing: '0.5px' }}>{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="glass-card p-5">
          <h3 className="text-lg font-bold text-zinc-100 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Weekly Progress</h3>
          <div className="space-y-3">
            {weeklyStats.map(stat => (
              <div key={stat.week} className="flex items-center gap-3">
                <span className="text-[12px] font-bold text-zinc-500 w-8 tabular-nums">W{stat.week}</span>
                <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: '#3F3F46' }}>
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${stat.completion}%`, background: 'linear-gradient(90deg, #A3E635, #06B6D4)' }} />
                </div>
                <span className="text-[12px] font-bold text-lime-400 w-10 text-right tabular-nums">{stat.completion}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-card p-5">
          <h3 className="text-lg font-bold text-zinc-100 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Learning Statistics</h3>
          <div className="space-y-3">
            {[
              { icon: IconClock, label: 'Total Learning Time', value: `${Math.floor(progress.completedTasks?.length * 5 / 60)}h ${Math.floor((progress.completedTasks?.length * 5) % 60)}m` },
              { icon: IconCheck, label: 'Lessons Completed', value: progress.completedTasks?.length || 0 },
              { icon: IconTarget, label: 'Average Score', value: '85%' },
              { icon: IconBook, label: 'Vocabulary Mastered', value: `${(progress.completedTasks?.length || 0) * 5} words` },
              { icon: IconGraduation, label: 'Proficiency Level', value: 'A1.1' },
              { icon: IconChart, label: 'Next Goal', value: `${100 - (progress.xp || 0)} XP needed` },
            ].map((stat, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-zinc-700/30 last:border-0">
                <div className="flex items-center gap-3">
                  <stat.icon className="w-5 h-5 text-zinc-400" />
                  <span className="text-[14px] text-zinc-300">{stat.label}</span>
                </div>
                <span className="text-[14px] font-semibold text-zinc-200">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'skills') {
    return (
      <div className="fade-in">
        <div className="glass-card p-5">
          <h3 className="text-lg font-bold text-zinc-100 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Skill Breakdown</h3>
          <div className="space-y-3">
            {skillData.map((skill, i) => (
              <div key={i} className="flex items-center gap-3">
                <skill.icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-[13px] font-semibold text-zinc-200 w-24">{skill.name}</span>
                <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: '#3F3F46' }}>
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${skill.level}%`, background: 'linear-gradient(90deg, #A3E635, #06B6D4)' }} />
                </div>
                <span className="text-[12px] font-bold text-lime-400 w-10 text-right tabular-nums">{skill.level}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'calendar') {
    return (
      <div className="fade-in">
        <div className="glass-card p-5">
          <h3 className="text-lg font-bold text-zinc-100 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Activity Calendar</h3>
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((d, i) => (
              <div key={i} className={`aspect-square rounded-xl flex items-center justify-center text-[11px] font-medium transition-all ${
                d.today ? 'bg-lime-500 text-zinc-900 ring-2 ring-lime-500/30' :
                d.studied ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/20' :
                'bg-zinc-800/50 text-zinc-600'
              }`}>{d.day}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: IconBolt, value: progress.xp, label: 'Total XP', color: '#A3E635' },
          { icon: IconFire, value: progress.streak, label: 'Day Streak', color: '#F59E0B' },
          { icon: IconChart, value: `${avgCompletion}%`, label: 'Progress', color: '#06B6D4' },
          { icon: IconCheck, value: progress.completedTasks?.length || 0, label: 'Tasks Done', color: '#22C55E' },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-5 text-center">
            <div className="flex justify-center mb-2"><stat.icon className="w-7 h-7" style={{ color: stat.color }} /></div>
            <div className="text-2xl font-bold tabular-nums" style={{ color: stat.color, fontFamily: 'Poppins, sans-serif' }}>{stat.value}</div>
            <div className="text-[11px] text-zinc-500 font-medium mt-1 uppercase" style={{ letterSpacing: '0.5px' }}>{stat.label}</div>
          </div>
        ))}
      </div>
      <div className="glass-card p-5">
        <h3 className="text-lg font-bold text-zinc-100 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Weekly Progress</h3>
        <div className="space-y-3">
          {weeklyStats.map(stat => (
            <div key={stat.week} className="flex items-center gap-3">
              <span className="text-[12px] font-bold text-zinc-500 w-8 tabular-nums">W{stat.week}</span>
              <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: '#3F3F46' }}>
                <div className="h-full rounded-full transition-all duration-700" style={{ width: `${stat.completion}%`, background: 'linear-gradient(90deg, #A3E635, #06B6D4)' }} />
              </div>
              <span className="text-[12px] font-bold text-lime-400 w-10 text-right tabular-nums">{stat.completion}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

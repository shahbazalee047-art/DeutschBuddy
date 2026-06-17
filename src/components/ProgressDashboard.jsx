import { useState } from 'react';
import { getWeekCompletion } from '../utils/progress';
import BadgeGallery from './BadgeGallery';

export default function ProgressDashboard({ progress, levelData, visibleWeeks }) {
  const levelWeeks = visibleWeeks || levelData.weeks;
  const weeklyStats = levelWeeks.map(week => ({ week: week.id, title: week.title, completion: getWeekCompletion(week.days, progress.completedTasks) }));
  const unlocked = weeklyStats.filter(w => w.completion > 0 || weeklyStats.indexOf(w) < (progress.unlockedWeeks?.length || 1));
  const avgCompletion = unlocked.length > 0 ? Math.round(unlocked.reduce((a, w) => a + w.completion, 0) / unlocked.length) : 0;

  const skillData = [
    { name: 'Reading', icon: '📖', level: 45 },
    { name: 'Writing', icon: '✍️', level: 30 },
    { name: 'Listening', icon: '🎧', level: 55 },
    { name: 'Speaking', icon: '🗣️', level: 25 },
    { name: 'Grammar', icon: '📝', level: 60 },
    { name: 'Vocabulary', icon: '📚', level: 40 },
  ];

  const calendarDays = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    studied: Math.random() > 0.6,
    today: i === new Date().getDate() - 1,
  }));

  return (
    <div className="fade-in space-y-5">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: '⚡', value: progress.xp, label: 'Total XP', color: '#B8860B' },
          { icon: '🔥', value: progress.streak, label: 'Day Streak', color: '#FF9800' },
          { icon: '📊', value: `${avgCompletion}%`, label: 'Progress', color: '#2D8B7A' },
          { icon: '✅', value: progress.completedTasks?.length || 0, label: 'Tasks Done', color: '#4CAF50' },
        ].map((stat, i) => (
          <div key={i} className="paper-card p-5 text-center">
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-2xl font-bold tabular-nums" style={{ color: stat.color, fontFamily: 'Poppins, sans-serif' }}>{stat.value}</div>
            <div className="text-[11px] text-[#8A8A9A] font-medium mt-1 uppercase" style={{ letterSpacing: '0.5px' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Weekly Progress */}
      <div className="paper-card p-5">
        <h3 className="text-lg font-bold text-[#1A1A2E] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Weekly Progress</h3>
        <div className="space-y-3">
          {weeklyStats.map(stat => (
            <div key={stat.week} className="flex items-center gap-3">
              <span className="text-[12px] font-bold text-[#8A8A9A] w-8 tabular-nums">W{stat.week}</span>
              <div className="flex-1 h-3 bg-[#E8E0D4] rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700" style={{ width: `${stat.completion}%`, background: 'linear-gradient(90deg, #B8860B, #D4A843)' }} />
              </div>
              <span className="text-[12px] font-bold text-[#B8860B] w-10 text-right tabular-nums">{stat.completion}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Calendar */}
      <div className="paper-card p-5">
        <h3 className="text-lg font-bold text-[#1A1A2E] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Activity Calendar</h3>
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((d, i) => (
            <div key={i} className={`aspect-square rounded-xl flex items-center justify-center text-[11px] font-medium transition-all ${
              d.today ? 'bg-[#B8860B] text-white ring-2 ring-[#B8860B]/30' :
              d.studied ? 'bg-[#E8F5E9] text-[#4CAF50] border border-[#4CAF50]/20' :
              'bg-[#F5F5F5] text-[#C0C0C0]'
            }`}>
              {d.day}
            </div>
          ))}
        </div>
      </div>

      {/* Skill Breakdown */}
      <div className="paper-card p-5">
        <h3 className="text-lg font-bold text-[#1A1A2E] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Skill Breakdown</h3>
        <div className="space-y-3">
          {skillData.map((skill, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-xl w-8">{skill.icon}</span>
              <span className="text-[13px] font-semibold text-[#1A1A2E] w-24">{skill.name}</span>
              <div className="flex-1 h-2 bg-[#E8E0D4] rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700" style={{ width: `${skill.level}%`, background: 'linear-gradient(90deg, #B8860B, #D4A843)' }} />
              </div>
              <span className="text-[12px] font-bold text-[#B8860B] w-10 text-right tabular-nums">{skill.level}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Stats */}
      <div className="paper-card p-5">
        <h3 className="text-lg font-bold text-[#1A1A2E] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Learning Statistics</h3>
        <div className="space-y-3">
          {[
            { icon: '⏱️', label: 'Total Learning Time', value: '2h 15m' },
            { icon: '✅', label: 'Lessons Completed', value: progress.completedTasks?.length || 0 },
            { icon: '🎯', label: 'Average Score', value: '85%' },
            { icon: '📚', label: 'Vocabulary Mastered', value: '47 words' },
            { icon: '🎓', label: 'Proficiency Level', value: 'A1.1' },
            { icon: '🏆', label: 'Next Goal', value: 'A1.2 - 150 XP needed' },
          ].map((stat, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-[#E8E0D4] last:border-0">
              <div className="flex items-center gap-3">
                <span className="text-lg">{stat.icon}</span>
                <span className="text-[14px] text-[#4A4A5A]">{stat.label}</span>
              </div>
              <span className="text-[14px] font-semibold text-[#1A1A2E]">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>

      <BadgeGallery badges={progress.badges || []} />
    </div>
  );
}

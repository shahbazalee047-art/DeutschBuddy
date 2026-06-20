import { useState, useEffect, useMemo } from 'react';
import { getWeekCompletion } from '../utils/progress';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import {
  IconBolt, IconFire, IconChart, IconCheck, IconTarget,
  IconBookOpen, IconFeather, IconHeadphones, IconMic,
  IconEdit, IconBook, IconClock, IconGraduation
} from './Icons';

const SKILL_MAP = {
  quiz: 'Reading',
  fillblank: 'Reading',
  matching: 'Reading',
  scramble: 'Reading',
  flashcards: 'Vocabulary',
  vocabulary: 'Vocabulary',
  writing: 'Writing',
  listening: 'Listening',
  speaking: 'Speaking',
  grammar: 'Grammar',
  review: 'Reading',
  fun: 'Reading',
};

const SKILL_ICONS = {
  Reading: IconBookOpen,
  Writing: IconFeather,
  Listening: IconHeadphones,
  Speaking: IconMic,
  Grammar: IconEdit,
  Vocabulary: IconBook,
};

function getTaskType(taskId, levelData) {
  if (!levelData?.weeks) return null;
  for (const week of levelData.weeks) {
    for (const day of week.days || []) {
      for (const task of day.tasks || []) {
        if (task.id === taskId) return task.type;
      }
    }
  }
  return null;
}

function formatDuration(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

function getProficiencyLevel(avgScore, completedCount) {
  if (completedCount === 0) return 'A1.1';
  if (avgScore >= 90 && completedCount >= 50) return 'A2.2';
  if (avgScore >= 80 && completedCount >= 30) return 'A2.1';
  if (avgScore >= 70 && completedCount >= 15) return 'A1.3';
  if (avgScore >= 60 || completedCount >= 5) return 'A1.2';
  return 'A1.1';
}

export default function ProgressDashboard({ progress, levelData, visibleWeeks, mode }) {
  const { user } = useAuth();
  const [results, setResults] = useState([]);
  const [resultsLoading, setResultsLoading] = useState(true);

  const level = levelData?.level;

  useEffect(() => {
    if (!user?.id || !level) {
      setResults([]);
      setResultsLoading(false);
      return;
    }

    let cancelled = false;
    async function fetchResults() {
      setResultsLoading(true);
      try {
        const { data, error } = await supabase
          .from('exercise_results')
          .select('*')
          .eq('user_id', user.id)
          .eq('level', level)
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (!cancelled) setResults(data || []);
      } catch (err) {
        console.error('Failed to fetch exercise results:', err);
        if (!cancelled) setResults([]);
      } finally {
        if (!cancelled) setResultsLoading(false);
      }
    }
    fetchResults();
    return () => { cancelled = true; };
  }, [user?.id, level]);

  const weeklyStats = useMemo(() => {
    const weeks = visibleWeeks || levelData?.weeks || [];
    return weeks.map(week => ({
      week: week.id,
      title: week.title,
      completion: getWeekCompletion(week.days, progress.completedTasks)
    }));
  }, [visibleWeeks, levelData?.weeks, progress.completedTasks]);

  const unlocked = weeklyStats.filter(w => w.completion > 0 || weeklyStats.indexOf(w) < (progress.unlockedWeeks?.length || 1));
  const avgCompletion = unlocked.length > 0 ? Math.round(unlocked.reduce((a, w) => a + w.completion, 0) / unlocked.length) : 0;

  const stats = useMemo(() => {
    const completed = results.filter(r => r.completed);
    const totalSeconds = completed.reduce((sum, r) => sum + (r.time_spent_seconds || 0), 0);
    const scored = completed.filter(r => r.max_score > 0);
    const avgScore = scored.length > 0
      ? Math.round(scored.reduce((sum, r) => sum + ((r.score || 0) / r.max_score) * 100, 0) / scored.length)
      : 0;

    const vocabCount = completed.filter(r => {
      const type = getTaskType(r.task_id, levelData);
      return type === 'vocabulary' || type === 'flashcards';
    }).length;

    const nextGoal = Math.max(0, 100 - ((progress.xp || 0) % 100));

    return {
      totalSeconds,
      completedCount: completed.length,
      avgScore,
      vocabCount,
      proficiency: getProficiencyLevel(avgScore, completed.length),
      nextGoal,
    };
  }, [results, levelData, progress.xp]);

  const skillData = useMemo(() => {
    const buckets = { Reading: [], Writing: [], Listening: [], Speaking: [], Grammar: [], Vocabulary: [] };

    results.forEach(r => {
      if (!r.completed) return;
      const taskType = getTaskType(r.task_id, levelData);
      const skill = SKILL_MAP[taskType] || 'Reading';
      const pct = r.max_score > 0 ? ((r.score || 0) / r.max_score) * 100 : 100;
      buckets[skill].push(pct);
    });

    return Object.entries(buckets).map(([name, values]) => {
      const avg = values.length > 0 ? Math.round(values.reduce((a, b) => a + b, 0) / values.length) : 0;
      return { name, icon: SKILL_ICONS[name], level: avg };
    });
  }, [results, levelData]);

  const calendarDays = useMemo(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const studiedSet = new Set();

    results.forEach(r => {
      if (!r.completed || !r.created_at) return;
      const d = new Date(r.created_at);
      if (d.getFullYear() === year && d.getMonth() === month) {
        studiedSet.add(d.getDate());
      }
    });

    return Array.from({ length: daysInMonth }, (_, i) => ({
      day: i + 1,
      studied: studiedSet.has(i + 1),
      today: i + 1 === today.getDate(),
    }));
  }, [results]);

  if (mode === 'statistics') {
    return (
      <div className="fade-in">
        <div className="paper-card p-5">
          <span className="eyebrow">Statistics</span>
          <h3 className="text-lg font-bold text-text-dark mb-4" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Learning <i className="text-gold-light not-italic">Insights</i></h3>
          {resultsLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-8 h-8 border-2 border-gold/20 border-t-gold rounded-full animate-spin" />
            </div>
          ) : (
            <div className="space-y-3">
              {[
                { icon: IconClock, label: 'Total Learning Time', value: formatDuration(stats.totalSeconds) },
                { icon: IconCheck, label: 'Lessons Completed', value: stats.completedCount },
                { icon: IconTarget, label: 'Average Score', value: `${stats.avgScore}%` },
                { icon: IconBook, label: 'Vocabulary Mastered', value: `${stats.vocabCount} words` },
                { icon: IconGraduation, label: 'Proficiency Level', value: stats.proficiency },
                { icon: IconChart, label: 'Next Goal', value: `${stats.nextGoal} XP needed` },
              ].map((stat, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="flex items-center gap-3">
                    <stat.icon className="w-5 h-5 text-text-muted" />
                    <span className="text-[14px] text-text-body">{stat.label}</span>
                  </div>
                  <span className="text-[14px] font-semibold text-text-body">{stat.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (mode === 'skills') {
    return (
      <div className="fade-in">
        <div className="paper-card p-5">
          <span className="eyebrow">Skills</span>
          <h3 className="text-lg font-bold text-text-dark mb-4" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Skill <i className="text-gold-light not-italic">Breakdown</i></h3>
          {resultsLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-8 h-8 border-2 border-gold/20 border-t-gold rounded-full animate-spin" />
            </div>
          ) : (
            <div className="space-y-3">
              {skillData.map((skill, i) => (
                <div key={i} className="flex items-center gap-3">
                  <skill.icon className="w-5 h-5 flex-shrink-0 text-text-muted" />
                  <span className="text-[13px] font-semibold text-text-body w-24">{skill.name}</span>
                  <div className="flex-1 h-2 overflow-hidden bg-bg-secondary">
                    <div className="h-full transition-all duration-700" style={{ width: `${skill.level}%`, background: 'var(--gold)' }} />
                  </div>
                  <span className="text-[12px] font-bold text-gold w-10 text-right tabular-nums">{skill.level}%</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (mode === 'calendar') {
    return (
      <div className="fade-in">
        <div className="paper-card p-5">
          <span className="eyebrow">Calendar</span>
          <h3 className="text-lg font-bold text-text-dark mb-4" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Activity <i className="text-gold-light not-italic">Calendar</i></h3>
          {resultsLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-8 h-8 border-2 border-gold/20 border-t-gold rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((d, i) => (
                <div key={i} className={`aspect-square flex items-center justify-center text-[11px] font-medium transition-all ${
                  d.today ? 'bg-gold text-text-on-dark ring-2 ring-gold/30' :
                  d.studied ? 'bg-gold/20 text-gold border border-gold/20' :
                  'bg-bg-secondary text-text-muted'
                }`}>{d.day}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in space-y-5">
      <div>
        <span className="eyebrow">Overview</span>
        <h2 className="text-2xl font-bold text-text-dark mb-4 editorial-heading" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Your <i>Progress</i></h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: IconBolt, value: progress.xp, label: 'Total XP', color: 'var(--gold)' },
          { icon: IconFire, value: progress.streak, label: 'Day Streak', color: 'var(--gold-light)' },
          { icon: IconChart, value: `${avgCompletion}%`, label: 'Progress', color: 'var(--gold-light)' },
          { icon: IconCheck, value: progress.completedTasks?.length || 0, label: 'Tasks Done', color: 'var(--success)' },
        ].map((stat, i) => (
          <div key={i} className="paper-card p-5 text-center">
            <div className="flex justify-center mb-2"><stat.icon className="w-7 h-7" style={{ color: stat.color }} /></div>
            <div className="text-2xl font-bold tabular-nums" style={{ color: stat.color, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{stat.value}</div>
            <div className="text-[11px] text-text-muted font-medium mt-1 uppercase" style={{ letterSpacing: '0.5px' }}>{stat.label}</div>
          </div>
        ))}
      </div>
      <div className="paper-card p-5">
        <h3 className="text-lg font-bold text-text-dark mb-4" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Weekly Progress</h3>
        <div className="space-y-3">
          {weeklyStats.map(stat => (
            <div key={stat.week} className="flex items-center gap-3">
              <span className="text-[12px] font-bold text-text-muted w-8 tabular-nums">W{stat.week}</span>
              <div className="flex-1 h-3 overflow-hidden bg-bg-secondary">
                <div className="h-full transition-all duration-700" style={{ width: `${stat.completion}%`, background: 'var(--gold)' }} />
              </div>
              <span className="text-[12px] font-bold text-gold w-10 text-right tabular-nums">{stat.completion}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

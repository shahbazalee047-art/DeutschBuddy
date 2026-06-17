import { useState, useEffect } from 'react';
import { InlineVerbLookup } from './QuickGermanTool';

const dailyTips = [
  { tip: 'German compound nouns always take the gender of the last word. "der Hand-schuh" is masculine.', tag: 'Grammar' },
  { tip: 'The word "doch" has no English equivalent. It means a firm "yes" to a negative question.', tag: 'Vocabulary' },
  { tip: 'In German, all months are masculine: der Januar, der Februar, etc.', tag: 'Grammar' },
  { tip: '"Entschuldigung" means both "sorry" and "excuse me".', tag: 'Culture' },
  { tip: 'German separable prefixes (ab-, an-, auf-, aus-, ein-) split in main clauses.', tag: 'Grammar' },
  { tip: 'The verb "lassen" can mean both "to let" and "to have something done".', tag: 'Grammar' },
  { tip: 'German has 3 genders: der (masculine), die (feminine), das (neuter). Always learn nouns with their article!', tag: 'Vocabulary' },
];

const didYouKnow = [
  'Bread is sacred in Germany. There are over 3,200 officially registered types of bread.',
  'The longest German word is "Rechtsschutzversicherungsgesellschaften" with 39 letters.',
  'Berlin has more bridges than Venice, about 1,700 bridges.',
  'Germans invented the printing press, the car, aspirin, and the Christmas tree tradition.',
  'The word "Kindergarten" comes from German and means "children\'s garden".',
  'Germany has over 1,500 types of beer and 1,300 breweries.',
];

function getDailyIndex(array) {
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  return dayOfYear % array.length;
}

export default function RightPanel({ progress, streak }) {
  const [tipIndex] = useState(() => getDailyIndex(dailyTips));
  const [didIndex] = useState(() => getDailyIndex(didYouKnow));
  const tip = dailyTips[tipIndex];
  const fact = didYouKnow[didIndex];

  const milestones = [
    { label: '10 XP', target: 10, icon: '⚡' },
    { label: '50 XP', target: 50, icon: '🎯' },
    { label: '100 XP', target: 100, icon: '🏆' },
  ];
  const nextMilestone = milestones.find(m => progress.xp < m.target) || { label: 'Legend', target: 1000, icon: '💎' };

  return (
    <div className="space-y-4">
      {/* Verb Lookup */}
      <div className="glass-card p-4">
        <InlineVerbLookup />
      </div>

      {/* Stats */}
      <div className="glass-card p-4">
        <h4 className="text-sm font-bold text-slate-200 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>⚡ Your Stats</h4>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-[#FFF8E1]/10 rounded-2xl p-4 text-center border border-[#B8860B]/10">
            <div className="text-2xl font-bold tabular-nums text-[#B8860B]">{progress.xp}</div>
            <div className="text-[10px] text-slate-400 font-medium uppercase" style={{ letterSpacing: '0.5px' }}>XP Earned</div>
          </div>
          <div className="bg-[#FFF3E0]/10 rounded-2xl p-4 text-center border border-orange-500/10">
            <div className="text-2xl font-bold tabular-nums text-orange-400">{streak}</div>
            <div className="text-[10px] text-slate-400 font-medium uppercase" style={{ letterSpacing: '0.5px' }}>Day Streak</div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-[12px] text-slate-400 mb-1">
            <span>Next: {nextMilestone.icon} {nextMilestone.label}</span>
            <span>{progress.xp}/{nextMilestone.target}</span>
          </div>
          <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.min((progress.xp / nextMilestone.target) * 100, 100)}%`, background: 'linear-gradient(90deg, #B8860B, #D4A843)' }} />
          </div>
        </div>
      </div>

      {/* Tip of the Day */}
      <div className="glass-card p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm">💡</span>
          <h4 className="text-sm font-bold text-slate-200" style={{ fontFamily: 'Poppins, sans-serif' }}>Tip of the Day</h4>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#4CAF50]/10 text-[#4CAF50] border border-[#4CAF50]/20">{tip.tag}</span>
        </div>
        <p className="text-[13px] text-slate-300 leading-relaxed">{tip.tip}</p>
      </div>

      {/* Did You Know */}
      <div className="glass-card p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm">🇩🇪</span>
          <h4 className="text-sm font-bold text-slate-200" style={{ fontFamily: 'Poppins, sans-serif' }}>Did You Know?</h4>
        </div>
        <p className="text-[13px] text-slate-300 leading-relaxed">{fact}</p>
      </div>
    </div>
  );
}

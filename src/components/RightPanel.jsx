import { InlineVerbLookup } from './QuickGermanTool';

const dailyTips = [
  { tip: 'German compound nouns always take the gender of the last word. "der Hand-schuh" is masculine.', tag: 'Grammar' },
  { tip: 'The word "doch" has no English equivalent. It means a firm "yes" to a negative question.', tag: 'Vocabulary' },
  { tip: 'In German, all months are masculine: der Januar, der Februar, etc.', tag: 'Grammar' },
];

const didYouKnow = [
  'Bread is sacred in Germany. There are over 3,200 officially registered types of bread.',
  'The longest German word is "Rechtsschutzversicherungsgesellschaften" with 39 letters.',
  'Berlin has more bridges than Venice, about 1,700 bridges.',
];

export default function RightPanel({ progress, streak }) {
  const tipIndex = new Date().getDate() % dailyTips.length;
  const didIndex = new Date().getDate() % didYouKnow.length;
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
      <div className="paper-card p-4">
        <InlineVerbLookup />
      </div>

      {/* Stats */}
      <div className="paper-card p-4">
        <h4 className="text-sm font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>⚡ Your Stats</h4>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-[#FFF8E1] rounded-2xl p-4 text-center border border-[#B8860B]/10">
            <div className="text-2xl font-bold tabular-nums" style={{ color: '#B8860B', fontFamily: 'Poppins, sans-serif' }}>{progress.xp}</div>
            <div className="text-[10px] text-[#8A8A9A] font-medium uppercase" style={{ letterSpacing: '0.5px' }}>XP Earned</div>
          </div>
          <div className="bg-[#FFF3E0] rounded-2xl p-4 text-center border border-[#FF9800]/10">
            <div className="text-2xl font-bold tabular-nums" style={{ color: '#FF9800', fontFamily: 'Poppins, sans-serif' }}>{streak}</div>
            <div className="text-[10px] text-[#8A8A9A] font-medium uppercase" style={{ letterSpacing: '0.5px' }}>Day Streak</div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-[12px] text-[#8A8A9A] mb-1">
            <span>Next: {nextMilestone.icon} {nextMilestone.label}</span>
            <span>{progress.xp}/{nextMilestone.target}</span>
          </div>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${Math.min((progress.xp / nextMilestone.target) * 100, 100)}%` }} />
          </div>
        </div>
      </div>

      {/* Tip of the Day */}
      <div className="paper-card p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm">💡</span>
          <h4 className="text-sm font-bold text-[#1A1A2E]" style={{ fontFamily: 'Poppins, sans-serif' }}>Tip of the Day</h4>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: '#E0F2F1', color: '#2D8B7A' }}>{tip.tag}</span>
        </div>
        <p className="text-[13px] text-[#4A4A5A] leading-relaxed">{tip.tip}</p>
      </div>

      {/* Did You Know */}
      <div className="paper-card p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm">🇩🇪</span>
          <h4 className="text-sm font-bold text-[#1A1A2E]" style={{ fontFamily: 'Poppins, sans-serif' }}>Did You Know?</h4>
        </div>
        <p className="text-[13px] text-[#4A4A5A] leading-relaxed">{fact}</p>
      </div>
    </div>
  );
}

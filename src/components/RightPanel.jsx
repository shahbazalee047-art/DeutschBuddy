import { InlineVerbLookup } from './QuickGermanTool';

const dailyTips = [
  { tip: 'German compound nouns always take the gender of the last word. "der Hand-schuh" (glove) is masculine because "der Schuh" is masculine.', tag: 'Grammar' },
  { tip: 'The word "doch" has no English equivalent. It means a firm "yes" in response to a negative question: "Du kommst nicht?" "Doch!"', tag: 'Vocabulary' },
  { tip: 'In German, all months are masculine: der Januar, der Februar, etc.', tag: 'Grammar' },
  { tip: '"Entschuldigung" means both "sorry" and "excuse me".', tag: 'Culture' },
  { tip: 'German separable prefixes (ab-, an-, auf-, aus-, ein-, mit-, vor-, zu-) split in main clauses.', tag: 'Grammar' },
];

const didYouKnow = [
  'Bread is sacred in Germany. There are over 3,200 officially registered types of bread.',
  'The longest German word is "Rechtsschutzversicherungsgesellschaften" with 39 letters.',
  'Berlin has more bridges than Venice, about 1,700 bridges.',
  'Germans invented the printing press, the car, aspirin, and the Christmas tree tradition.',
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
      <div className="paper-card p-4 border-t-2 border-t-[#5B8C7A]">
        <InlineVerbLookup />
      </div>

      {/* Stats */}
      <div className="paper-card p-4 border-t-2 border-t-[#8B6914]">
        <h4 className="text-sm font-bold text-[#1a1a2e] mb-3">⚡ Your Stats</h4>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-[#FAF5ED] rounded-xl p-3 text-center border border-[#E8DFD4]">
            <div className="text-2xl font-bold tabular-nums" style={{ color: '#8B6914' }}>{progress.xp}</div>
            <div className="text-[10px] text-[#9ca3af] font-medium uppercase tracking-wider">XP Earned</div>
          </div>
          <div className="bg-[#FAF5ED] rounded-xl p-3 text-center border border-[#E8DFD4]">
            <div className="text-2xl font-bold tabular-nums" style={{ color: '#C4956A' }}>{streak}</div>
            <div className="text-[10px] text-[#9ca3af] font-medium uppercase tracking-wider">Day Streak</div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs text-[#6b7280] mb-1">
            <span>Next: {nextMilestone.icon} {nextMilestone.label}</span>
            <span>{progress.xp}/{nextMilestone.target}</span>
          </div>
          <div className="w-full h-2 bg-[#E8DFD4] rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.min((progress.xp / nextMilestone.target) * 100, 100)}%`, background: 'linear-gradient(to right, #8B6914, #C4956A)' }} />
          </div>
        </div>
      </div>

      {/* Tip of the Day */}
      <div className="paper-card p-4 border-t-2 border-t-[#8B6914]">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm">💡</span>
          <h4 className="text-sm font-bold text-[#1a1a2e]">Tip of the Day</h4>
          <span className="text-[10px] bg-[#5B8C7A]/10 text-[#5B8C7A] px-2 py-0.5 rounded-full font-medium border border-[#5B8C7A]/20">{tip.tag}</span>
        </div>
        <p className="text-xs text-[#4a5568] leading-relaxed">{tip.tip}</p>
      </div>

      {/* Did You Know */}
      <div className="paper-card p-4 border-t-2 border-t-[#C4956A]">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm">🇩🇪</span>
          <h4 className="text-sm font-bold text-[#1a1a2e]">Did You Know?</h4>
        </div>
        <p className="text-xs text-[#4a5568] leading-relaxed">{fact}</p>
      </div>
    </div>
  );
}

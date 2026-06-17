import { InlineVerbLookup } from './QuickGermanTool';

const dailyTips = [
  { tip: 'German compound nouns always take the gender of the last word. "der Hand-schuh" (glove) is masculine because "der Schuh" is masculine.', tag: 'Grammar' },
  { tip: 'The word "doch" has no English equivalent. It means a firm "yes" in response to a negative question: "Du kommst nicht?" "Doch!"', tag: 'Vocabulary' },
  { tip: 'In German, all months are masculine: der Januar, der Februar, etc. Same with most days of the week.', tag: 'Grammar' },
  { tip: '"Entschuldigung" literally means "excuse/absolution". Use it for both "sorry" and "excuse me".', tag: 'Culture' },
  { tip: 'German separable prefixes (ab-, an-, auf-, aus-, ein-, mit-, vor-, zu-) split in main clauses: "Ich stehe um 7 Uhr auf."', tag: 'Grammar' },
  { tip: '"Trotzdem" means "nevertheless" and is one of the most useful connector words in A2 German.', tag: 'Vocabulary' },
];

const didYouKnow = [
  'Bread is sacred in Germany. There are over 3,200 officially registered types of bread, making it a UNESCO Intangible Cultural Heritage.',
  'The longest German word commonly used is "Rechtsschutzversicherungsgesellschaften" with 39 letters.',
  'Berlin has more bridges than Venice. About 1,700 bridges across the city\'s rivers and canals.',
  'Germans invented the printing press (Gutenberg), the car (Benz/Daimler), aspirin, and the Christmas tree tradition.',
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
      <InlineVerbLookup />

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
        <h4 className="text-sm font-bold text-zinc-200 mb-3">⚡ Your Stats</h4>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-zinc-800 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-lime-400 tabular-nums">{progress.xp}</div>
            <div className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">XP Earned</div>
          </div>
          <div className="bg-zinc-800 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-orange-400 tabular-nums">{streak}</div>
            <div className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">Day Streak</div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs text-zinc-500 mb-1">
            <span>Next: {nextMilestone.icon} {nextMilestone.label}</span>
            <span>{progress.xp}/{nextMilestone.target}</span>
          </div>
          <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-lime-400 rounded-full transition-all duration-500" style={{ width: `${Math.min((progress.xp / nextMilestone.target) * 100, 100)}%` }} />
          </div>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm">💡</span>
          <h4 className="text-sm font-bold text-zinc-200">Tip of the Day</h4>
          <span className="text-[10px] bg-cyan-400/10 text-cyan-400 px-2 py-0.5 rounded-full font-medium border border-cyan-400/20">{tip.tag}</span>
        </div>
        <p className="text-xs text-zinc-400 leading-relaxed">{tip.tip}</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm">🇩🇪</span>
          <h4 className="text-sm font-bold text-zinc-200">Did You Know?</h4>
        </div>
        <p className="text-xs text-zinc-400 leading-relaxed">{fact}</p>
      </div>
    </div>
  );
}

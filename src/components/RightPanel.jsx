import { InlineVerbLookup } from './QuickGermanTool';

const dailyTips = [
  { tip: 'German compound nouns always take the gender of the last word. "der Hand-schuh" (glove) is masculine because "der Schuh" is masculine.', tag: 'Grammar' },
  { tip: 'The word "doch" has no English equivalent. It means a firm "yes" in response to a negative question: "Du kommst nicht?" "Doch!"', tag: 'Vocabulary' },
  { tip: 'In German, all months are masculine: der Januar, der Februar, etc. Same with most days of the week.', tag: 'Grammar' },
  { tip: '"Entschuldigung" literally means "excuse/absolution". Use it for both "sorry" and "excuse me".', tag: 'Culture' },
  { tip: 'The "Präteritum" of modal verbs (konnte, musste, wollte) is used frequently in spoken German, unlike regular verbs.', tag: 'Grammar' },
  { tip: 'German separable prefixes (ab-, an-, auf-, aus-, ein-, mit-, vor-, zu-) split in main clauses: "Ich stehe um 7 Uhr auf."', tag: 'Grammar' },
  { tip: '"Trotzdem" means "nevertheless" and is one of the most useful connector words in A2 German.', tag: 'Vocabulary' },
  { tip: 'The "Konjunktiv II" of "werden" is "würde": "Ich würde gern reisen" (I would like to travel).', tag: 'Grammar' },
  { tip: '"Doch" can also contradict a negative statement. "Er ist nicht nett." "Doch, er ist nett!"', tag: 'Vocabulary' },
  { tip: 'The verb "lassen" means both "to let" and "to leave": "Ich lasse das so" (I\'ll leave it like that).', tag: 'Vocabulary' },
];

const didYouKnow = [
  'Bread is sacred in Germany. There are over 3,200 officially registered types of bread, making it a UNESCO Intangible Cultural Heritage.',
  'Germans are the world\'s second-biggest book buyers after the British. Reading is deeply embedded in the culture.',
  'The longest German word commonly used is "Rechtsschutzversicherungsgesellschaften" (insurance companies providing legal protection) with 39 letters.',
  'Berlin has more bridges than Venice. About 1,700 bridges across the city\'s rivers and canals.',
  'Germans invented the printing press (Gutenberg), the car (Benz/Daimler), aspirin, and the Christmas tree tradition.',
  'The Autobahn has no general speed limit in some sections, but there\'s a recommended "Richtgeschwindigkeit" of 130 km/h.',
  '"Fernweh" is a uniquely German word meaning the opposite of homesickness, an ache for distant places.',
  'Germany has over 1,500 different kinds of beer and 1,300 breweries. Beer purity laws date back to 1516.',
];

export default function RightPanel({ progress, streak }) {
  const tipIndex = new Date().getDate() % dailyTips.length;
  const didIndex = new Date().getDate() % didYouKnow.length;
  const tip = dailyTips[tipIndex];
  const fact = didYouKnow[didIndex];

  const nextMilestones = [
    { label: 'First Badge', target: 1, icon: '🌟' },
    { label: '10 XP', target: 10, icon: '⚡' },
    { label: '50 XP', target: 50, icon: '🎯' },
    { label: '100 XP', target: 100, icon: '🏆' },
  ];
  const nextMilestone = nextMilestones.find(m => progress.xp < m.target) || { label: 'Legend', target: 1000, icon: '💎' };

  return (
    <div className="space-y-4">
      {/* Verb Lookup */}
      <InlineVerbLookup />

      {/* Stats Card */}
      <div className="glass-card p-4">
        <h4 className="text-sm font-bold text-slate-200 mb-3">⚡ Your Stats</h4>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-amber-400 tabular-nums">{progress.xp}</div>
            <div className="text-[10px] text-amber-500/70 font-medium uppercase tracking-wider">XP Earned</div>
          </div>
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-orange-400 tabular-nums">{streak}</div>
            <div className="text-[10px] text-orange-500/70 font-medium uppercase tracking-wider">Day Streak</div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>Next: {nextMilestone.icon} {nextMilestone.label}</span>
            <span>{progress.xp}/{nextMilestone.target}</span>
          </div>
          <div className="w-full h-2 bg-slate-800/50 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((progress.xp / nextMilestone.target) * 100, 100)}%` }} />
          </div>
        </div>
      </div>

      {/* Tip for the Day */}
      <div className="glass-card p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm">💡</span>
          <h4 className="text-sm font-bold text-slate-200">Tip for the Day</h4>
          <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full font-medium border border-blue-500/20">{tip.tag}</span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">{tip.tip}</p>
      </div>

      {/* Did You Know */}
      <div className="glass-card p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm">🇩🇪</span>
          <h4 className="text-sm font-bold text-slate-200">Did You Know?</h4>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">{fact}</p>
      </div>
    </div>
  );
}

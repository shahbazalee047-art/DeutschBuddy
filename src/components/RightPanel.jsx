import { useState, useEffect, useRef } from 'react';
import { InlineVerbLookup } from './QuickGermanTool';

const dailyTips = [
  { tip: 'German compound nouns take the gender of the last word. "der Hand-schuh" is masculine.', tag: 'Grammar' },
  { tip: 'The word "doch" has no English equivalent — it means a firm "yes" to a negative question.', tag: 'Vocabulary' },
  { tip: 'In German, all months are masculine: der Januar, der Februar, der März...', tag: 'Grammar' },
  { tip: '"Entschuldigung" means both "sorry" and "excuse me".', tag: 'Culture' },
  { tip: 'German separable prefixes (ab-, an-, auf-, aus-, ein-) split in main clauses.', tag: 'Grammar' },
  { tip: 'The verb "lassen" can mean both "to let" and "to have something done".', tag: 'Grammar' },
  { tip: 'German has 3 genders: der, die, das. Always learn nouns with their article!', tag: 'Vocabulary' },
  { tip: 'Word order in German: verb is always the second element in a main clause.', tag: 'Grammar' },
  { tip: '"Bitte" means please, you\'re welcome, and pardon — context is everything.', tag: 'Vocabulary' },
  { tip: 'German numbers: 21 is einundzwanzig (one-and-twenty), not twenty-one.', tag: 'Vocabulary' },
];

const didYouKnow = [
  'Bread is sacred in Germany. There are over 3,200 officially registered types of bread.',
  'The longest German word is "Rechtsschutzversicherungsgesellschaften" with 39 letters.',
  'Berlin has more bridges than Venice, about 1,700 bridges.',
  'Germans invented the printing press, the car, aspirin, and the Christmas tree tradition.',
  'The word "Kindergarten" comes from German and means "children\'s garden".',
  'Germany has over 1,500 types of beer and 1,300 breweries.',
  'The first printed book (Gutenberg Bible) was printed in German-speaking Mainz.',
  'German is the most widely spoken native language in the European Union.',
  'The Nobel Prize has been awarded to more Germans than any other nationality.',
  '"Donaudampfschifffahrtsgesellschaftskapitän" is a real German word for a Danube steamship captain.',
  'There is a German word for the fear of losing your phone: "Handyphobie".',
  'The Christmas tree tradition (Tannenbaum) originated in Germany in the 16th century.',
];

function getDailyIndex(array) {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now - startOfYear;
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  return dayOfYear % array.length;
}

function getRandomFact(excludeIndex) {
  let idx;
  do {
    idx = Math.floor(Math.random() * didYouKnow.length);
  } while (idx === excludeIndex && didYouKnow.length > 1);
  return idx;
}

export default function RightPanel({ progress, streak }) {
  const [tipIndex] = useState(() => getDailyIndex(dailyTips));
  const [didIndex, setDidIndex] = useState(() => {
    const stored = localStorage.getItem('db_didyouknow_seed');
    if (stored) {
      const parsed = JSON.parse(stored);
      const today = new Date().toDateString();
      if (parsed.date === today) return parsed.index;
    }
    const randomIdx = Math.floor(Math.random() * didYouKnow.length);
    localStorage.setItem('db_didyouknow_seed', JSON.stringify({ date: new Date().toDateString(), index: randomIdx }));
    return randomIdx;
  });
  const prevUserRef = useRef(null);

  const tip = dailyTips[tipIndex];
  const fact = didYouKnow[didIndex];

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem('db_auth_session') || 'null');
    if (authData && authData.user?.id !== prevUserRef.current) {
      prevUserRef.current = authData.user?.id;
      setDidIndex(getRandomFact(didIndex));
      localStorage.setItem('db_didyouknow_seed', JSON.stringify({ date: new Date().toDateString(), index: didIndex }));
    }
  }, []);

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
        <h4 className="text-sm font-bold text-zinc-200 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>⚡ Your Stats</h4>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="rounded-2xl p-4 text-center border border-lime-500/10" style={{ background: 'rgba(163, 230, 53, 0.05)' }}>
            <div className="text-2xl font-bold tabular-nums text-lime-400">{progress.xp}</div>
            <div className="text-[10px] text-zinc-500 font-medium uppercase" style={{ letterSpacing: '0.5px' }}>XP Earned</div>
          </div>
          <div className="rounded-2xl p-4 text-center border border-orange-500/10" style={{ background: 'rgba(245, 158, 11, 0.05)' }}>
            <div className="text-2xl font-bold tabular-nums text-orange-400">{streak}</div>
            <div className="text-[10px] text-zinc-500 font-medium uppercase" style={{ letterSpacing: '0.5px' }}>Day Streak</div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-[12px] text-zinc-400 mb-1">
            <span>Next: {nextMilestone.icon} {nextMilestone.label}</span>
            <span>{progress.xp}/{nextMilestone.target}</span>
          </div>
          <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: '#3F3F46' }}>
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.min((progress.xp / nextMilestone.target) * 100, 100)}%`, background: 'linear-gradient(90deg, #A3E635, #06B6D4)' }} />
          </div>
        </div>
      </div>

      {/* Tip of the Day */}
      <div className="glass-card p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm">💡</span>
          <h4 className="text-sm font-bold text-zinc-200" style={{ fontFamily: 'Poppins, sans-serif' }}>Tip of the Day</h4>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-lime-500/20" style={{ background: 'rgba(163, 230, 53, 0.1)', color: '#A3E635' }}>{tip.tag}</span>
        </div>
        <p className="text-[13px] text-zinc-300 leading-relaxed">{tip.tip}</p>
      </div>

      {/* Did You Know */}
      <div className="glass-card p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm">🇩🇪</span>
          <h4 className="text-sm font-bold text-zinc-200" style={{ fontFamily: 'Poppins, sans-serif' }}>Did You Know?</h4>
        </div>
        <p className="text-[13px] text-zinc-300 leading-relaxed">{fact}</p>
      </div>
    </div>
  );
}

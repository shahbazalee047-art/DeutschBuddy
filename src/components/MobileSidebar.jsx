import { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { IconChart, IconTarget, IconCalendar, IconX, IconBolt, IconSearch, IconLightbulb, IconFlag, IconSparkles } from './Icons';

const progressSections = [
  { id: 'progress-statistics', label: 'Learning Statistics', icon: IconChart },
  { id: 'progress-skills', label: 'Skill Breakdown', icon: IconTarget },
  { id: 'progress-calendar', label: 'Activity Calendar', icon: IconCalendar },
];

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
  '"Donaudampfschifffahrtsgesellschaftskapitän" is a real German word for a Danube steamship captain.',
  'There is a German word for the fear of losing your phone: "Handyphobie".',
];

function getDailyIndex(array) {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now - startOfYear;
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  return dayOfYear % array.length;
}

export default function MobileSidebar({ isOpen, onClose, activeView, onViewChange, activeLevel, onLevelChange, xp, onVerbLookup }) {
  const tip = useMemo(() => dailyTips[getDailyIndex(dailyTips)], []);
  const fact = useMemo(() => didYouKnow[getDailyIndex(didYouKnow)], []);

  function handleNav(view) {
    onViewChange(view);
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute left-0 top-0 bottom-0 w-72 max-w-[85vw] shadow-2xl slide-in overflow-y-auto" onClick={e => e.stopPropagation()}
        style={{ background: '#0D1A14', borderRight: '1px solid rgba(36, 61, 47, 0.3)' }}>
        <div className="flex items-center justify-between p-4 border-b border-border">
          <Link to="/" onClick={() => { onViewChange('dashboard'); onClose(); }}
            className="flex items-center gap-2">
            <span className="text-xl leading-none">🇩🇪</span>
            <span className="text-base font-extrabold text-cream-100" style={{ fontFamily: 'DM Serif Display, serif' }}>DeutschBuddy</span>
          </Link>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-forest-800/50 hover:bg-forest-800 flex items-center justify-center text-cream-400 transition"><IconX className="w-4 h-4" /></button>
        </div>

        {/* Level Toggle — TOP */}
        <div className="p-3 pt-4 pb-2">
          <div className="flex gap-2 px-3">
            {['A1', 'A2'].map(lvl => (
              <button key={lvl} onClick={() => { onLevelChange(lvl); onClose(); }}
                className={`flex-1 py-2.5 rounded-xl text-[13px] font-bold transition-all active:scale-95 ${
                  activeLevel === lvl
                    ? lvl === 'A1' ? 'bg-sage-400 text-forest-900 shadow-sm shadow-sage-400/20' : 'bg-sky-400 text-forest-900 shadow-sm shadow-sky-400/20'
                    : 'bg-forest-800 text-cream-400 border border-border hover:text-cream-200'
                }`}>
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Progress Sections */}
        <div className="p-3 pt-2 border-t border-border">
          <p className="text-[10px] font-bold text-cream-500 uppercase tracking-widest px-3 mb-2">Progress</p>
          {progressSections.map(item => (
            <button key={item.id} onClick={() => handleNav(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] mb-0.5 ${
                activeView === item.id
                  ? 'text-forest-900 bg-sage-400 shadow-sm'
                  : 'text-cream-400 hover:text-cream-200 hover:bg-forest-800/50'
              }`}>
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Verb Lookup */}
        <div className="p-3 pt-2 border-t border-border">
          <p className="text-[10px] font-bold text-cream-500 uppercase tracking-widest px-3 mb-2">Tools</p>
          <button onClick={() => { onVerbLookup(); }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] text-cream-400 hover:text-cream-200 hover:bg-forest-800/50">
            <IconSearch className="w-5 h-5 flex-shrink-0" />
            <span>Verb Lookup</span>
          </button>
        </div>

        {/* Tip of the Day */}
        <div className="p-3 pt-2 border-t border-border">
          <div className="mx-3 rounded-2xl p-3 border border-sky-400/20 bg-sky-400/5">
            <div className="flex items-center gap-1.5 mb-1.5">
              <IconLightbulb className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-[10px] font-bold text-cream-500 uppercase tracking-wider flex-1">Tip of the Day</span>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-sage-400/20 bg-sage-400/10 text-sage-400">{tip.tag}</span>
            </div>
            <p className="text-[12px] text-cream-400 leading-relaxed">{tip.tip}</p>
          </div>
        </div>

        {/* Did You Know */}
        <div className="p-3 pt-0 border-b border-border">
          <div className="mx-3 rounded-2xl p-3 border border-sage-400/20 bg-sage-400/5">
            <div className="flex items-center gap-1.5 mb-1.5">
              <IconFlag className="w-3.5 h-3.5 text-sage-400" />
              <span className="text-[10px] font-bold text-cream-500 uppercase tracking-wider">Did You Know?</span>
            </div>
            <p className="text-[12px] text-cream-400 leading-relaxed">{fact}</p>
          </div>
        </div>

      </div>
    </div>
  );
}

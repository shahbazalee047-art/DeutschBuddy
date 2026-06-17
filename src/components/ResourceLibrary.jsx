import { useState } from 'react';

const FALLBACK_RESOURCES = [
  { name: 'Nicos Weg', description: 'Structured video course by Deutsche Welle for A1/A2 learners', url: 'https://learngerman.dw.com/en/overview', type: 'video' },
  { name: 'Easy German', description: 'YouTube channel with street interviews in German', url: 'https://www.youtube.com/@EasyGerman', type: 'video' },
  { name: 'Jenny\'s German Lessons', description: 'Grammar explanation videos for beginners', url: 'https://www.youtube.com/@JennysGermanLessons', type: 'video' },
  { name: 'Verbformen', description: 'Complete German verb conjugation reference', url: 'https://www.verbformen.de/', type: 'grammar' },
  { name: 'Goethe-Institut', description: 'Official German exam preparation materials', url: 'https://goethe.de', type: 'exercise' },
  { name: 'GradGermany', description: 'Free German grammar exercises and quizzes', url: 'https://gradgermany.com', type: 'exercise' },
  { name: 'Slow German', description: 'Podcast for intermediate learners', url: 'https://slowgerman.com', type: 'podcast' },
  { name: 'DeutschAkademie', description: 'Free online German courses A1-C2', url: 'https://www.deutschakademie.de', type: 'exercise' },
  { name: 'dict.cc', description: 'German-English dictionary and translator', url: 'https://www.dict.cc', type: 'vocabulary' },
  { name: 'Anki', description: 'Spaced repetition flashcard app', url: 'https://apps.ankiweb.net', type: 'vocabulary' },
  { name: 'DW Learn German', description: 'Deutsche Welle free German courses', url: 'https://learngerman.dw.com/en/overview', type: 'video' },
  { name: 'German.net', description: 'Grammar exercises and tests', url: 'https://german.net', type: 'exercise' },
];

const TYPE_ICONS = {
  video: '🎥', exercise: '📝', grammar: '📖', vocabulary: '📚',
  listening: '🎧', reading: '📰', podcast: '🎙️',
};

const TYPE_COLORS = {
  video: 'bg-red-500/10 text-red-400 border-red-500/20',
  exercise: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  grammar: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  vocabulary: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  listening: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  reading: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
  podcast: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
};

export default function ResourceLibrary({ resources }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const allResources = resources && resources.length > 0 ? resources : FALLBACK_RESOURCES;
  const categories = ['All', ...new Set(allResources.map(r => r.type))];
  const filtered = selectedCategory === 'All' ? allResources : allResources.filter(r => r.type === selectedCategory);

  return (
    <div className="fade-in space-y-5">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.5px' }}>📚 Resource Library</h1>
        <p className="text-slate-400" style={{ fontSize: '16px', lineHeight: '1.5' }}>Curated external resources to accelerate your German learning</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-[13px] font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat ? 'text-white bg-[#B8860B] shadow-md shadow-[#B8860B]/20' : 'bg-[#1A2744] text-slate-400 border border-slate-700/50'
            }`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((r, i) => (
          <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
            className="glass-card p-5 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 group block">
            <div className="flex items-start justify-between mb-3">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl" style={{ background: 'rgba(184, 134, 11, 0.05)', border: '1px solid rgba(184, 134, 11, 0.1)' }}>
                {TYPE_ICONS[r.type] || '🔗'}
              </div>
              <span className="text-slate-500 group-hover:text-[#B8860B] transition">↗</span>
            </div>
            <h3 className="text-[15px] font-bold text-slate-100 mb-1">{r.name}</h3>
            <p className="text-[13px] text-slate-400 leading-relaxed line-clamp-2">{r.description}</p>
            <span className={`inline-block mt-3 text-[10px] font-bold px-2 py-1 rounded-full border ${TYPE_COLORS[r.type] || TYPE_COLORS.grammar}`}>{r.type}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

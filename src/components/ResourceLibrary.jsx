import { useState } from 'react';
import { IconVideo, IconEdit, IconBookOpen, IconBook, IconHeadphones, IconNewspaper, IconPodcast, IconLink } from './Icons';

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
  video: IconVideo, exercise: IconEdit, grammar: IconBookOpen, vocabulary: IconBook,
  listening: IconHeadphones, reading: IconNewspaper, podcast: IconPodcast,
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
  const [selectedCategory, setSelectedCategory] = useState(null);
  const allResources = resources && resources.length > 0 ? resources : FALLBACK_RESOURCES;
  const categories = [...new Set(allResources.map(r => r.type))];
  const filtered = selectedCategory ? allResources.filter(r => r.type === selectedCategory) : allResources;

  return (
    <div className="fade-in space-y-5">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <IconBook className="w-8 h-8 text-sage-400" />
          <h1 className="text-3xl font-bold text-cream-100" style={{ fontFamily: 'DM Serif Display, serif', letterSpacing: '-0.5px' }}>Resource Library</h1>
        </div>
        <p className="text-cream-500" style={{ fontSize: '16px', lineHeight: '1.5' }}>Curated external resources to accelerate your German learning journey</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
            className={`px-4 py-2 rounded-xl text-[13px] font-semibold whitespace-nowrap transition-all active:scale-95 ${
              selectedCategory === cat ? 'text-forest-900 bg-sage-400 shadow-md shadow-sage-400/20' : 'bg-forest-800 text-cream-400 border border-border/50 hover:text-cream-200'
            }`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((r, i) => (
          <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
            className="glass-card p-4 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 group block active:scale-[0.98]">
            <div className="flex items-start justify-between mb-2">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center border border-sage-400/10 bg-sage-400/5">
                {(() => { const IconComp = TYPE_ICONS[r.type] || IconLink; return <IconComp className="w-5 h-5 text-sage-400" />; })()}
              </div>
              <span className="text-cream-400 transition">↗</span>
            </div>
            <h3 className="text-[14px] font-bold text-cream-200 mb-1">{r.name}</h3>
            <p className="text-[12px] text-cream-400 leading-relaxed line-clamp-2">{r.description}</p>
            <span className={`inline-block mt-2 text-[10px] font-bold px-2 py-1 rounded-full border ${TYPE_COLORS[r.type] || TYPE_COLORS.grammar}`}>{r.type}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

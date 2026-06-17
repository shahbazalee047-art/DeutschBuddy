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
  video: 'bg-red-50 text-red-700 border-red-200',
  exercise: 'bg-blue-50 text-blue-700 border-blue-200',
  grammar: 'bg-amber-50 text-amber-700 border-amber-200',
  vocabulary: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  listening: 'bg-purple-50 text-purple-700 border-purple-200',
  reading: 'bg-teal-50 text-teal-700 border-teal-200',
  podcast: 'bg-orange-50 text-orange-700 border-orange-200',
};

export default function ResourceLibrary({ resources }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedResource, setSelectedResource] = useState(null);

  const allResources = resources && resources.length > 0 ? resources : FALLBACK_RESOURCES;
  const categories = ['All', ...new Set(allResources.map(r => r.type))];
  const filtered = selectedCategory === 'All' ? allResources : allResources.filter(r => r.type === selectedCategory);

  return (
    <div className="fade-in space-y-5">
      <div>
        <h1 className="text-3xl font-bold text-[#1A1A2E] mb-2" style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.5px' }}>📚 Resource Library</h1>
        <p className="text-[#8A8A9A]" style={{ fontSize: '16px', lineHeight: '1.5' }}>Curated external resources to accelerate your German learning</p>
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-[13px] font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat ? 'text-white bg-[#B8860B] shadow-md shadow-[#B8860B]/20' : 'bg-[#F5F5F5] text-[#8A8A9A] border border-[#E8E0D4]'
            }`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Resource Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((r, i) => (
          <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
            className="paper-card p-5 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 group block">
            <div className="flex items-start justify-between mb-3">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl border border-[#E8E0D4]"
                style={{ background: r.type === 'video' ? '#FFF3E0' : r.type === 'exercise' ? '#E3F2FD' : r.type === 'grammar' ? '#FFF8E1' : r.type === 'vocabulary' ? '#E8F5E9' : r.type === 'podcast' ? '#F3E5F5' : '#F5F5F5' }}>
                {TYPE_ICONS[r.type] || '🔗'}
              </div>
              <span className="text-[#8A8A9A] group-hover:text-[#B8860B] transition">↗</span>
            </div>
            <h3 className="text-[15px] font-bold text-[#1A1A2E] mb-1">{r.name}</h3>
            <p className="text-[13px] text-[#8A8A9A] leading-relaxed line-clamp-2">{r.description}</p>
            <span className={`inline-block mt-3 text-[10px] font-bold px-2 py-1 rounded-full border ${TYPE_COLORS[r.type] || TYPE_COLORS.grammar}`}>{r.type}</span>
          </a>
        ))}
      </div>

      {/* Resource Detail Modal */}
      {selectedResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6" onClick={() => setSelectedResource(null)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative paper-card max-w-lg w-full p-8 scale-in shadow-2xl" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedResource(null)} className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-[#F5F5F5] hover:bg-[#E8E0D4] flex items-center justify-center text-[#8A8A9A] transition text-sm">✕</button>
            <div className="text-4xl mb-4">{TYPE_ICONS[selectedResource.type] || '🔗'}</div>
            <h3 className="text-xl font-bold text-[#1A1A2E] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>{selectedResource.name}</h3>
            <p className="text-[14px] text-[#8A8A9A] mb-4">{selectedResource.description}</p>
            <a href={selectedResource.url} target="_blank" rel="noopener noreferrer"
              className="block w-full py-3 text-center text-white font-semibold rounded-xl transition-all hover:shadow-lg"
              style={{ background: 'linear-gradient(135deg, #B8860B, #D4A843)' }}>
              Open Resource ↗
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

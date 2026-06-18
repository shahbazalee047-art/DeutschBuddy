import { IconSearch } from './Icons';

export default function QuickGermanTool({ onClose }) {
  const verbs = [
    { english: 'to run', german: 'laufen' },
    { english: 'to think', german: 'denken' },
    { english: 'to eat', german: 'essen' },
    { english: 'to speak', german: 'sprechen' },
    { english: 'to work', german: 'arbeiten' },
    { english: 'to play', german: 'spielen' },
  ];

   const conjugations = {
     'laufen': {
       present: { 'ich': 'laufe', 'du': 'läufst', 'er/sie/es': 'läuft', 'wir': 'laufen', 'ihr': 'lauft', 'sie/Sie': 'laufen' },
       past: { 'ich': 'lief', 'du': 'liefst', 'er/sie/es': 'lief', 'wir': 'liefen', 'ihr': 'lauft', 'sie/Sie': 'liefen' },
       future: { 'ich': 'werde laufen', 'du': 'wirst laufen', 'er/sie/es': 'wird laufen', 'wir': 'werden laufen', 'ihr': 'werdet laufen', 'sie/Sie': 'werden laufen' },
     },
     'denken': {
       present: { 'ich': 'denke', 'du': 'denkst', 'er/sie/es': 'denkt', 'wir': 'denken', 'ihr': 'denkt', 'sie/Sie': 'denken' },
       past: { 'ich': 'dachte', 'du': 'dachtest', 'er/sie/es': 'dachte', 'wir': 'dachten', 'ihr': 'dachtet', 'sie/Sie': 'dachten' },
       future: { 'ich': 'werde denken', 'du': 'wirst denken', 'er/sie/es': 'wird denken', 'wir': 'werden denken', 'ihr': 'werdet denken', 'sie/Sie': 'werden denken' },
     },
     'essen': {
       present: { 'ich': 'esse', 'du': 'ißt', 'er/sie/es': 'ißt', 'wir': 'essen', 'ihr': 'esst', 'sie/Sie': 'essen' },
       past: { 'ich': 'aß', 'du': 'aßt', 'er/sie/es': 'aß', 'wir': 'aßen', 'ihr': 'aßt', 'sie/Sie': 'aßen' },
       future: { 'ich': 'werde essen', 'du': 'wirst essen', 'er/sie/es': 'wird essen', 'wir': 'werden essen', 'ihr': 'werdet essen', 'sie/Sie': 'werden essen' },
     },
     'sprechen': {
       present: { 'ich': 'spreche', 'du': 'sprichst', 'er/sie/es': 'spricht', 'wir': 'sprechen', 'ihr': 'sprecht', 'sie/Sie': 'sprechen' },
       past: { 'ich': 'sprach', 'du': 'sprachst', 'er/sie/es': 'sprach', 'wir': 'sprachen', 'ihr': 'spracht', 'sie/Sie': 'sprachen' },
       future: { 'ich': 'werde sprechen', 'du': 'wirst sprechen', 'er/sie/es': 'wird sprechen', 'wir': 'werden sprechen', 'ihr': 'werdet sprechen', 'sie/Sie': 'werden sprechen' },
     },
     'arbeiten': {
       present: { 'ich': 'arbeite', 'du': 'arbeitest', 'er/sie/es': 'arbeitet', 'wir': 'arbeiten', 'ihr': 'arbeitet', 'sie/Sie': 'arbeiten' },
       past: { 'ich': 'arbeitete', 'du': 'arbeitetest', 'er/sie/es': 'arbeitete', 'wir': 'arbeiteten', 'ihr': 'arbeitetet', 'sie/Sie': 'arbeiteten' },
       future: { 'ich': 'werde arbeiten', 'du': 'wirst arbeiten', 'er/sie/es': 'wird arbeiten', 'wir': 'werden arbeiten', 'ihr': 'werdet arbeiten', 'sie/Sie': 'werden arbeiten' },
     },
     'spielen': {
       present: { 'ich': 'spiele', 'du': 'spielst', 'er/sie/es': 'spielt', 'wir': 'spielen', 'ihr': 'spielt', 'sie/Sie': 'spielen' },
       past: { 'ich': 'spielte', 'du': 'spieltest', 'er/sie/es': 'spielte', 'wir': 'spielten', 'ihr': 'spieltet', 'sie/Sie': 'spielten' },
       future: { 'ich': 'werde spielen', 'du': 'wirst spielen', 'er/sie/es': 'wird spielen', 'wir': 'werden spielen', 'ihr': 'werdet spielen', 'sie/Sie': 'werden spielen' },
     },
   };

  const handleVerbSearch = (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (query && verbs.some(v => v.english.includes(query) || v.german.includes(query))) {
      const found = verbs.find(v => v.english.includes(query) || v.german.includes(query));
      if (found) {
        const tense = Object.keys(conjugations[found.german])[0];
        alert(`German: ${found.german} - ${tense.charAt(0).toUpperCase() + tense.slice(1)}`);
      }
    }
  };

  return (
    <div className="glass-card p-4">
      <div className="flex items-center gap-2 mb-4">
        <IconSearch className="w-4 h-4 text-sage-400" />
        <h4 className="text-sm font-bold text-cream-200" style={{ fontFamily: 'DM Serif Display, serif' }}>Quick German Tool</h4>
      </div>
      <input
        type="text"
        placeholder="Search or input a verb..."
        className="w-full p-3 rounded-xl border border-sage-400/20 bg-[#0D1A14]/80 text-cream-100 placeholder:text-cream-500/60 focus:outline-none focus:border-sage-400 focus:ring-1 focus:ring-sage-400/50 transition-all duration-200"
        onChange={handleVerbSearch}
      />
      <div className="mt-4 space-y-2">
        {verbs.map((v) => (
          <div key={v.german} className="text-xs text-cream-300">
            <span className="text-sage-400 font-medium">{v.english}:</span> {v.german}
          </div>
        ))}
      </div>
    </div>
  );
}
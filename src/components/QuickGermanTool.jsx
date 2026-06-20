import { useState, useMemo } from 'react';
import { IconSearch, IconX } from './Icons';

const verbs = [
  { english: 'to run', german: 'laufen' },
  { english: 'to think', german: 'denken' },
  { english: 'to eat', german: 'essen' },
  { english: 'to speak', german: 'sprechen' },
  { english: 'to work', german: 'arbeiten' },
  { english: 'to play', german: 'spielen' },
  { english: 'to have', german: 'haben' },
  { english: 'to be', german: 'sein' },
  { english: 'to become', german: 'werden' },
  { english: 'to come', german: 'kommen' },
  { english: 'to go', german: 'gehen' },
  { english: 'to see', german: 'sehen' },
  { english: 'to give', german: 'geben' },
  { english: 'to know', german: 'wissen' },
  { english: 'to make', german: 'machen' },
];

const conjugations = {
  'laufen': {
    present: { 'ich': 'laufe', 'du': 'läufst', 'er/sie/es': 'läuft', 'wir': 'laufen', 'ihr': 'lauft', 'sie/Sie': 'laufen' },
    past: { 'ich': 'lief', 'du': 'liefst', 'er/sie/es': 'lief', 'wir': 'liefen', 'ihr': 'lieft', 'sie/Sie': 'liefen' },
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
  'haben': {
    present: { 'ich': 'habe', 'du': 'hast', 'er/sie/es': 'hat', 'wir': 'haben', 'ihr': 'habt', 'sie/Sie': 'haben' },
    past: { 'ich': 'hatte', 'du': 'hattest', 'er/sie/es': 'hatte', 'wir': 'hatten', 'ihr': 'hattet', 'sie/Sie': 'hatten' },
    future: { 'ich': 'werde haben', 'du': 'wirst haben', 'er/sie/es': 'wird haben', 'wir': 'werden haben', 'ihr': 'werdet haben', 'sie/Sie': 'werden haben' },
  },
  'sein': {
    present: { 'ich': 'bin', 'du': 'bist', 'er/sie/es': 'ist', 'wir': 'sind', 'ihr': 'seid', 'sie/Sie': 'sind' },
    past: { 'ich': 'war', 'du': 'warst', 'er/sie/es': 'war', 'wir': 'waren', 'ihr': 'wart', 'sie/Sie': 'waren' },
    future: { 'ich': 'werde sein', 'du': 'wirst sein', 'er/sie/es': 'wird sein', 'wir': 'werden sein', 'ihr': 'werdet sein', 'sie/Sie': 'werden sein' },
  },
  'werden': {
    present: { 'ich': 'werde', 'du': 'wirst', 'er/sie/es': 'wird', 'wir': 'werden', 'ihr': 'werdet', 'sie/Sie': 'werden' },
    past: { 'ich': 'wurde', 'du': 'wurdest', 'er/sie/es': 'wurde', 'wir': 'wurden', 'ihr': 'wurdet', 'sie/Sie': 'wurden' },
    future: { 'ich': 'werde werden', 'du': 'wirst werden', 'er/sie/es': 'wird werden', 'wir': 'werden werden', 'ihr': 'werdet werden', 'sie/Sie': 'werden werden' },
  },
  'kommen': {
    present: { 'ich': 'komme', 'du': 'kommst', 'er/sie/es': 'kommt', 'wir': 'kommen', 'ihr': 'kommt', 'sie/Sie': 'kommen' },
    past: { 'ich': 'kam', 'du': 'kamst', 'er/sie/es': 'kam', 'wir': 'kamen', 'ihr': 'kamt', 'sie/Sie': 'kamen' },
    future: { 'ich': 'werde kommen', 'du': 'wirst kommen', 'er/sie/es': 'wird kommen', 'wir': 'werden kommen', 'ihr': 'werdet kommen', 'sie/Sie': 'werden kommen' },
  },
  'gehen': {
    present: { 'ich': 'gehe', 'du': 'gehst', 'er/sie/es': 'geht', 'wir': 'gehen', 'ihr': 'geht', 'sie/Sie': 'gehen' },
    past: { 'ich': 'ging', 'du': 'gingst', 'er/sie/es': 'ging', 'wir': 'gingen', 'ihr': 'gingt', 'sie/Sie': 'gingen' },
    future: { 'ich': 'werde gehen', 'du': 'wirst gehen', 'er/sie/es': 'wird gehen', 'wir': 'werden gehen', 'ihr': 'werdet gehen', 'sie/Sie': 'werden gehen' },
  },
  'sehen': {
    present: { 'ich': 'sehe', 'du': 'siehst', 'er/sie/es': 'sieht', 'wir': 'sehen', 'ihr': 'seht', 'sie/Sie': 'sehen' },
    past: { 'ich': 'sah', 'du': 'sahst', 'er/sie/es': 'sah', 'wir': 'sahen', 'ihr': 'saht', 'sie/Sie': 'sahen' },
    future: { 'ich': 'werde sehen', 'du': 'wirst sehen', 'er/sie/es': 'wird sehen', 'wir': 'werden sehen', 'ihr': 'werdet sehen', 'sie/Sie': 'werden sehen' },
  },
  'geben': {
    present: { 'ich': 'gebe', 'du': 'gibst', 'er/sie/es': 'gibt', 'wir': 'geben', 'ihr': 'gebt', 'sie/Sie': 'geben' },
    past: { 'ich': 'gab', 'du': 'gabst', 'er/sie/es': 'gab', 'wir': 'gaben', 'ihr': 'gabt', 'sie/Sie': 'gaben' },
    future: { 'ich': 'werde geben', 'du': 'wirst geben', 'er/sie/es': 'wird geben', 'wir': 'werden geben', 'ihr': 'werdet geben', 'sie/Sie': 'werden geben' },
  },
  'wissen': {
    present: { 'ich': 'weiß', 'du': 'weißt', 'er/sie/es': 'weiß', 'wir': 'wissen', 'ihr': 'wisst', 'sie/Sie': 'wissen' },
    past: { 'ich': 'wusste', 'du': 'wusstest', 'er/sie/es': 'wusste', 'wir': 'wussten', 'ihr': 'wusstet', 'sie/Sie': 'wussten' },
    future: { 'ich': 'werde wissen', 'du': 'wirst wissen', 'er/sie/es': 'wird wissen', 'wir': 'werden wissen', 'ihr': 'werdet wissen', 'sie/Sie': 'werden wissen' },
  },
  'machen': {
    present: { 'ich': 'mache', 'du': 'machst', 'er/sie/es': 'macht', 'wir': 'machen', 'ihr': 'macht', 'sie/Sie': 'machen' },
    past: { 'ich': 'machte', 'du': 'machtest', 'er/sie/es': 'machte', 'wir': 'machten', 'ihr': 'machtet', 'sie/Sie': 'machten' },
    future: { 'ich': 'werde machen', 'du': 'wirst machen', 'er/sie/es': 'wird machen', 'wir': 'werden machen', 'ihr': 'werdet machen', 'sie/Sie': 'werden machen' },
  },
};

const pronouns = ['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie/Sie'];
const tenses = ['present', 'past', 'future'];

export default function QuickGermanTool({ onClose }) {
  const [query, setQuery] = useState('');
  const [selectedVerb, setSelectedVerb] = useState(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return verbs;
    const q = query.toLowerCase();
    return verbs.filter(v => v.english.includes(q) || v.german.includes(q));
  }, [query]);

  function handleSelect(verb) {
    setSelectedVerb(verb);
    setQuery('');
  }

  function handleBack() {
    setSelectedVerb(null);
    setQuery('');
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative w-full max-w-lg mx-4 max-h-[85vh] overflow-y-auto p-5 sm:p-6" onClick={e => e.stopPropagation()}>
        {!selectedVerb ? (
          <div className="glass-card">
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gold/20">
              <div className="flex items-center gap-2">
                <IconSearch className="w-5 h-5 text-gold" />
                <h3 className="text-base sm:text-lg font-bold text-text-on-dark" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  Verb Lookup
                </h3>
              </div>
              <button onClick={onClose} className="w-8 h-8 bg-bg-dark/60 hover:bg-bg-dark/60 flex items-center justify-center text-text-on-dark-muted transition">
                <IconX className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 sm:p-5">
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search verb (e.g. 'laufen' or 'to run')..."
                className="w-full p-3 border border-gold/20 bg-bg-dark/80 text-text-on-dark placeholder:text-text-on-dark-muted/60 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 transition-all duration-200 text-sm"
                autoFocus
              />
              <div className="mt-3 space-y-1">
                {filtered.map(v => (
                  <button
                    key={v.german}
                    onClick={() => handleSelect(v)}
                    className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-left hover:bg-bg-dark/60 transition"
                  >
                    <span className="text-gold font-medium">{v.german}</span>
                    <span className="text-text-on-dark-muted">{v.english}</span>
                  </button>
                ))}
                {filtered.length === 0 && (
                  <p className="text-center text-text-on-dark-muted text-sm py-4">No verbs found</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="glass-card">
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gold/20">
              <div className="flex items-center gap-2">
                <button onClick={handleBack} className="w-8 h-8 bg-bg-dark/60 hover:bg-bg-dark/60 flex items-center justify-center text-text-on-dark-muted transition">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-text-on-dark" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                    {selectedVerb.german}
                  </h3>
                  <p className="text-xs text-text-on-dark-muted">{selectedVerb.english}</p>
                </div>
              </div>
              <button onClick={onClose} className="w-8 h-8 bg-bg-dark/60 hover:bg-bg-dark/60 flex items-center justify-center text-text-on-dark-muted transition">
                <IconX className="w-4 h-4" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gold/20">
                    <th className="text-left px-4 sm:px-5 py-3 text-[10px] font-bold text-text-on-dark-muted uppercase tracking-widest">Pronoun</th>
                    {tenses.map(t => (
                      <th key={t} className="text-left px-3 sm:px-4 py-3 text-[10px] font-bold text-text-on-dark-muted uppercase tracking-widest">
                        {t === 'present' ? 'Präsens' : t === 'past' ? 'Präteritum' : 'Futur I'}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pronouns.map(p => (
                    <tr key={p} className="border-b border-gold/20 last:border-0">
                      <td className="px-4 sm:px-5 py-2.5 text-text-on-dark-muted font-medium whitespace-nowrap">{p}</td>
                      {tenses.map(t => (
                        <td key={t} className="px-3 sm:px-4 py-2.5 text-text-on-dark whitespace-nowrap">
                          {conjugations[selectedVerb.german]?.[t]?.[p] || '-'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

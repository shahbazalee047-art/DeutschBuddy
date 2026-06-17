import { useState } from 'react';

const VERBS = {
  machen: { prasens: ['mache', 'machst', 'macht', 'machen', 'macht', 'machen'], perfekt: ['habe gemacht'] },
  lernen: { prasens: ['lerne', 'lernst', 'lernt', 'lernen', 'lernt', 'lernen'], perfekt: ['habe gelernt'] },
  gehen: { prasens: ['gehe', 'gehst', 'geht', 'gehen', 'geht', 'gehen'], perfekt: ['bin gegangen'] },
  haben: { prasens: ['habe', 'hast', 'hat', 'haben', 'habt', 'haben'], perfekt: ['hatte'] },
  sein: { prasens: ['bin', 'bist', 'ist', 'sind', 'seid', 'sind'], perfekt: ['war'] },
  kommen: { prasens: ['komme', 'kommst', 'kommt', 'kommen', 'kommt', 'kommen'], perfekt: ['bin gekommen'] },
  fahren: { prasens: ['fahre', 'fährst', 'fährt', 'fahren', 'fahrt', 'fahren'], perfekt: ['bin gefahren'] },
  essen: { prasens: ['esse', 'isst', 'isst', 'essen', 'esst', 'essen'], perfekt: ['habe gegessen'] },
  trinken: { prasens: ['trinke', 'trinkst', 'trinkt', 'trinken', 'trinkt', 'trinken'], perfekt: ['habe getrunken'] },
  sprechen: { prasens: ['spreche', 'sprichst', 'spricht', 'sprechen', 'sprecht', 'sprechen'], perfekt: ['habe gesprochen'] },
};

export default function QuickGermanTool({ onClose }) {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);

  function handleSearch(e) {
    e.preventDefault();
    const verb = query.trim().toLowerCase();
    if (VERBS[verb]) setResult({ verb, ...VERBS[verb] });
    else setResult(null);
  }

  function handleSelect(verb) { setQuery(verb); setResult({ verb, ...VERBS[verb] }); }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl w-full max-w-lg scale-in" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          <h3 className="font-bold text-zinc-200 text-sm">Quick Verb Lookup</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-zinc-200 transition text-sm">✕</button>
        </div>
        <form onSubmit={handleSearch} className="p-4">
          <div className="flex gap-2">
            <input type="text" value={query} onChange={e => { setQuery(e.target.value); setResult(null); }}
              placeholder="Type a verb..." autoFocus
              className="flex-1 px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-lime-400/50" />
            <button type="submit" className="px-4 py-2.5 bg-lime-400 text-zinc-950 rounded-xl text-sm font-semibold hover:bg-lime-300 transition">Search</button>
          </div>
        </form>
        {!result && (
          <div className="px-4 pb-4">
            <p className="text-xs text-zinc-500 mb-2">Quick select:</p>
            <div className="flex flex-wrap gap-1.5">
              {Object.keys(VERBS).map(verb => (
                <button key={verb} onClick={() => handleSelect(verb)}
                  className="px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-lg text-xs text-zinc-400 hover:bg-lime-400/10 hover:border-lime-400/30 hover:text-lime-400 transition">{verb}</button>
              ))}
            </div>
          </div>
        )}
        {result && (
          <div className="p-4 space-y-3 slide-up">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg font-bold text-zinc-100">{result.verb}</span>
              <span className="text-xs bg-lime-400/10 text-lime-400 px-2 py-0.5 rounded-full font-medium border border-lime-400/20">verb</span>
            </div>
            <ConjTable label="Präsens" forms={result.prasens} color="cyan" />
            <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-3">
              <p className="text-xs font-bold text-lime-400 mb-1">Perfekt</p>
              <p className="text-sm text-zinc-300">ich {result.perfekt[0]}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function InlineVerbLookup() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);

  function handleSearch(e) {
    e.preventDefault();
    const verb = query.trim().toLowerCase();
    if (VERBS[verb]) setResult({ verb, ...VERBS[verb] });
    else setResult(null);
  }

  function handleSelect(verb) { setQuery(verb); setResult({ verb, ...VERBS[verb] }); }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
      <h4 className="text-sm font-bold text-zinc-200 mb-3">🔍 Verb Lookup</h4>
      <form onSubmit={handleSearch} className="relative mb-3">
        <input type="text" value={query} onChange={e => { setQuery(e.target.value); setResult(null); }}
          placeholder="Type a verb..."
          className="w-full px-4 py-2 pr-10 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-lime-400/50" />
        <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-md bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-zinc-200 hover:bg-zinc-600 transition">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="m21 21-4.35-4.35"/></svg>
        </button>
      </form>
      {!result && (
        <div className="flex flex-wrap gap-1.5 mb-2">
          {['machen', 'gehen', 'haben', 'sein', 'kommen'].map(v => (
            <button key={v} onClick={() => handleSelect(v)}
              className="px-2.5 py-1 bg-zinc-800 border border-zinc-700 rounded-md text-[11px] text-zinc-500 hover:bg-lime-400/10 hover:text-lime-400 transition">{v}</button>
          ))}
        </div>
      )}
      {result && (
        <div className="space-y-2 mt-2">
          <p className="font-bold text-sm text-zinc-200">{result.verb}</p>
          <div className="bg-zinc-800 rounded-lg border border-zinc-700 p-2">
            <p className="text-[10px] font-bold text-cyan-400 mb-1">Präsens</p>
            <p className="text-xs text-zinc-300">ich {result.prasens[0]}</p>
          </div>
          <div className="bg-zinc-800 rounded-lg border border-zinc-700 p-2">
            <p className="text-[10px] font-bold text-lime-400 mb-1">Perfekt</p>
            <p className="text-xs text-zinc-300">ich {result.perfekt[0]}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function ConjTable({ label, forms, color }) {
  const colors = { cyan: 'bg-cyan-400/10 text-cyan-400 border-cyan-400/20' };
  const persons = ['ich', 'du', 'er/sie', 'wir', 'ihr', 'sie'];
  return (
    <div className={`rounded-xl border ${colors[color]} overflow-hidden`}>
      <div className="px-3 py-2 font-semibold text-xs">{label}</div>
      <div className="divide-y divide-current/5">
        {forms.map((form, i) => (
          <div key={i} className="px-3 py-1.5 flex justify-between text-xs">
            <span className="opacity-60">{persons[i]}</span>
            <span className="font-medium text-zinc-300">{form}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

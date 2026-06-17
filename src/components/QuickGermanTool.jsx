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
    const v = query.trim().toLowerCase();
    if (VERBS[v]) setResult({ verb: v, ...VERBS[v] });
    else setResult(null);
  }

  function handleSelect(v) { setQuery(v); setResult({ verb: v, ...VERBS[v] }); }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="relative paper-card w-full max-w-lg shadow-2xl scale-in" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-[#E8E0D4]">
          <h3 className="font-bold text-[#1A1A2E] text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>Quick Verb Lookup</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-[#F5F5F5] hover:bg-[#E8E0D4] flex items-center justify-center text-[#8A8A9A] hover:text-[#4A4A5A] transition text-sm">✕</button>
        </div>

        <form onSubmit={handleSearch} className="p-5">
          <div className="flex gap-3">
            <input type="text" value={query} onChange={e => { setQuery(e.target.value); setResult(null); }}
              placeholder="Type a verb..." autoFocus className="flex-1 paper-input" />
            <button type="submit" className="btn-primary px-6" style={{ height: '56px' }}>Search</button>
          </div>
        </form>

        {!result && (
          <div className="px-5 pb-5">
            <p className="text-[11px] font-bold text-[#8A8A9A] mb-2 uppercase" style={{ letterSpacing: '0.5px' }}>Quick select:</p>
            <div className="flex flex-wrap gap-2">
              {Object.keys(VERBS).map(v => (
                <button key={v} onClick={() => handleSelect(v)}
                  className="px-4 py-2 bg-[#F5F5F5] border border-[#E8E0D4] rounded-xl text-[13px] font-medium text-[#4A4A5A] hover:bg-[#E8E0D4] transition">
                  {v}
                </button>
              ))}
            </div>
          </div>
        )}

        {result && (
          <div className="p-5 space-y-4 slide-up">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-[#1A1A2E]" style={{ fontFamily: 'Poppins, sans-serif' }}>{result.verb}</span>
              <span className="text-[11px] font-bold px-3 py-1 rounded-full" style={{ background: '#E0F2F1', color: '#2D8B7A' }}>verb</span>
            </div>
            <div className="paper-card p-4">
              <p className="text-[11px] font-bold text-[#8A8A9A] mb-2 uppercase" style={{ letterSpacing: '0.5px' }}>Present Tense</p>
              <div className="grid grid-cols-2 gap-2">
                {['ich', 'du', 'er/sie', 'wir', 'ihr', 'sie'].map((p, i) => (
                  <div key={i} className="flex justify-between text-[13px]">
                    <span className="text-[#8A8A9A] font-medium">{p}</span>
                    <span className="font-semibold text-[#1A1A2E]">{result.prasens[i]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="paper-card p-4">
              <p className="text-[11px] font-bold text-[#8A8A9A] mb-2 uppercase" style={{ letterSpacing: '0.5px' }}>Perfekt</p>
              <p className="text-[14px] font-semibold text-[#1A1A2E]">ich {result.perfekt[0]}</p>
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
    const v = query.trim().toLowerCase();
    if (VERBS[v]) setResult({ verb: v, ...VERBS[v] });
    else setResult(null);
  }

  function handleSelect(v) { setQuery(v); setResult({ verb: v, ...VERBS[v] }); }

  return (
    <div>
      <h4 className="text-sm font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>🔍 Verb Lookup</h4>
      <form onSubmit={handleSearch} className="relative mb-3">
        <input type="text" value={query} onChange={e => { setQuery(e.target.value); setResult(null); }} placeholder="Type a verb..." className="w-full paper-input pr-10 text-sm" />
        <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-[#B8860B] text-white flex items-center justify-center text-sm hover:bg-[#D4A843] transition">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="m21 21-4.35-4.35"/></svg>
        </button>
      </form>
      {!result && (
        <div className="flex flex-wrap gap-2 mb-2">
          {['machen', 'gehen', 'haben', 'sein', 'kommen'].map(v => (
            <button key={v} onClick={() => handleSelect(v)} className="px-3 py-1.5 bg-[#F5F5F5] border border-[#E8E0D4] rounded-lg text-[12px] text-[#8A8A9A] hover:bg-[#E8E0D4] hover:text-[#4A4A5A] transition">{v}</button>
          ))}
        </div>
      )}
      {result && (
        <div className="space-y-2 mt-2">
          <p className="font-bold text-sm text-[#1A1A2E]">{result.verb}</p>
          <div className="bg-[#FAF6F0] border border-[#E8E0D4] rounded-lg p-2">
            <p className="text-[11px] font-bold mb-1" style={{ color: '#2D8B7A' }}>Präsens</p>
            <p className="text-[12px] text-[#4A4A5A]">ich {result.prasens[0]}</p>
          </div>
          <div className="bg-[#FAF6F0] border border-[#E8E0D4] rounded-lg p-2">
            <p className="text-[11px] font-bold mb-1" style={{ color: '#B8860B' }}>Perfekt</p>
            <p className="text-[12px] text-[#4A4A5A]">ich {result.perfekt[0]}</p>
          </div>
        </div>
      )}
    </div>
  );
}

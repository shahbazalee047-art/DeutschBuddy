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
  const [query, setQuery] = useState(''); const [result, setResult] = useState(null);
  function handleSearch(e) { e.preventDefault(); const v = query.trim().toLowerCase(); if (VERBS[v]) setResult({ verb: v, ...VERBS[v] }); else setResult(null); }
  function handleSelect(v) { setQuery(v); setResult({ verb: v, ...VERBS[v] }); }
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-[#1a1a2e]/40 backdrop-blur-sm" />
      <div className="relative bg-white border border-[#E8DFD4] rounded-2xl shadow-2xl w-full max-w-lg scale-in" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-[#E8DFD4]"><h3 className="font-bold text-[#1a1a2e] text-sm">Quick Verb Lookup</h3><button onClick={onClose} className="w-8 h-8 rounded-lg bg-[#F5EFE6] hover:bg-[#E8DFD4] flex items-center justify-center text-[#9ca3af] hover:text-[#4a5568] transition text-sm">✕</button></div>
        <form onSubmit={handleSearch} className="p-4"><div className="flex gap-2"><input type="text" value={query} onChange={e => { setQuery(e.target.value); setResult(null); }} placeholder="Type a verb..." autoFocus className="flex-1 px-4 py-2.5 bg-[#F5EFE6] border border-[#E8DFD4] rounded-xl text-sm text-[#1a1a2e] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#8B6914]" /><button type="submit" className="px-4 py-2.5 text-white font-semibold rounded-xl text-sm transition" style={{ background: 'linear-gradient(135deg, #8B6914, #C4956A)' }}>Search</button></div></form>
        {!result && (<div className="px-4 pb-4"><p className="text-xs text-[#9ca3af] mb-2">Quick select:</p><div className="flex flex-wrap gap-1.5">{Object.keys(VERBS).map(v => (<button key={v} onClick={() => handleSelect(v)} className="px-3 py-1.5 bg-[#F5EFE6] border border-[#E8DFD4] rounded-lg text-xs text-[#6b7280] hover:bg-[#E8DFD4] hover:text-[#1a1a2e] transition">{v}</button>))}</div></div>)}
        {result && (<div className="p-4 space-y-3 slide-up"><div className="flex items-center gap-2 mb-3"><span className="text-lg font-bold text-[#1a1a2e]">{result.verb}</span><span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: 'rgba(139,105,20,0.1)', color: '#8B6914', border: '1px solid rgba(139,105,20,0.2)' }}>verb</span></div>
          <div className="bg-[#FAF5ED] rounded-xl border border-[#E8DFD4] p-3"><p className="text-xs font-bold mb-1" style={{ color: '#5B8C7A' }}>Präsens</p><p className="text-sm text-[#1a1a2e]">ich {result.prasens[0]}</p></div>
          <div className="bg-[#FAF5ED] rounded-xl border border-[#E8DFD4] p-3"><p className="text-xs font-bold mb-1" style={{ color: '#8B6914' }}>Perfekt</p><p className="text-sm text-[#1a1a2e]">ich {result.perfekt[0]}</p></div></div>)}
      </div>
    </div>
  );
}

export function InlineVerbLookup() {
  const [query, setQuery] = useState(''); const [result, setResult] = useState(null);
  function handleSearch(e) { e.preventDefault(); const v = query.trim().toLowerCase(); if (VERBS[v]) setResult({ verb: v, ...VERBS[v] }); else setResult(null); }
  function handleSelect(v) { setQuery(v); setResult({ verb: v, ...VERBS[v] }); }
  return (
    <div><h4 className="text-sm font-bold text-[#1a1a2e] mb-3">🔍 Verb Lookup</h4>
      <form onSubmit={handleSearch} className="relative mb-3"><input type="text" value={query} onChange={e => { setQuery(e.target.value); setResult(null); }} placeholder="Type a verb..." className="w-full px-4 py-2 pr-10 bg-[#F5EFE6] border border-[#E8DFD4] rounded-lg text-sm text-[#1a1a2e] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#8B6914]" />
        <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-md bg-[#E8DFD4] flex items-center justify-center text-[#6b7280] hover:bg-[#d4c9b8] hover:text-[#1a1a2e] transition"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="m21 21-4.35-4.35"/></svg></button></form>
      {!result && (<div className="flex flex-wrap gap-1.5 mb-2">{['machen', 'gehen', 'haben', 'sein', 'kommen'].map(v => (<button key={v} onClick={() => handleSelect(v)} className="px-2.5 py-1 bg-[#F5EFE6] border border-[#E8DFD4] rounded-md text-[11px] text-[#6b7280] hover:bg-[#E8DFD4] hover:text-[#1a1a2e] transition">{v}</button>))}</div>)}
      {result && (<div className="space-y-2 mt-2"><p className="font-bold text-sm text-[#1a1a2e]">{result.verb}</p><div className="bg-[#FAF5ED] rounded-lg border border-[#E8DFD4] p-2"><p className="text-[10px] font-bold mb-1" style={{ color: '#5B8C7A' }}>Präsens</p><p className="text-xs text-[#4a5568]">ich {result.prasens[0]}</p></div><div className="bg-[#FAF5ED] rounded-lg border border-[#E8DFD4] p-2"><p className="text-[10px] font-bold mb-1" style={{ color: '#8B6914' }}>Perfekt</p><p className="text-xs text-[#4a5568]">ich {result.perfekt[0]}</p></div></div>)}
    </div>
  );
}

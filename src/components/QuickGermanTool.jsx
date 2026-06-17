import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const verbsDb = {
  sein: { verb: 'sein', meaning: 'to be', prasens: ['bin', 'bist', 'ist', 'sind', 'seid', 'sind'], prateritum: ['war', 'warst', 'war', 'waren', 'wart', 'waren'], perfekt: ['bin gewesen', 'bist gewesen', 'ist gewesen', 'sind gewesen', 'seid gewesen', 'sind gewesen'] },
  haben: { verb: 'haben', meaning: 'to have', prasens: ['habe', 'hast', 'hat', 'haben', 'habt', 'haben'], prateritum: ['hatte', 'hattest', 'hatte', 'hatten', 'hattet', 'hatten'], perfekt: ['habe gehabt', 'hast gehabt', 'hat gehabt', 'haben gehabt', 'habt gehabt', 'haben gehabt'] },
  werden: { verb: 'werden', meaning: 'to become', prasens: ['werde', 'wirst', 'wird', 'werden', 'werdet', 'werden'], prateritum: ['wurde', 'wurdest', 'wurde', 'wurden', 'wurdet', 'wurden'], perfekt: ['bin geworden', 'bist geworden', 'ist geworden', 'sind geworden', 'seid geworden', 'sind geworden'] },
  können: { verb: 'können', meaning: 'can/to be able', prasens: ['kann', 'kannst', 'kann', 'können', 'könnt', 'können'], prateritum: ['konnte', 'konntest', 'konnte', 'konnten', 'konntet', 'konnten'], perfekt: ['habe gekonnt', 'hast gekonnt', 'hat gekonnt', 'haben gekonnt', 'habt gekonnt', 'haben gekonnt'] },
  müssen: { verb: 'müssen', meaning: 'must/to have to', prasens: ['muss', 'musst', 'muss', 'müssen', 'müsst', 'müssen'], prateritum: ['musste', 'musstest', 'musste', 'mussten', 'musstet', 'mussten'], perfekt: ['habe gemusst', 'hast gemusst', 'hat gemusst', 'haben gemusst', 'habt gemusst', 'haben gemusst'] },
  dürfen: { verb: 'dürfen', meaning: 'may/to be allowed', prasens: ['darf', 'darfst', 'darf', 'dürfen', 'dürft', 'dürfen'], prateritum: ['durfte', 'durftest', 'durfte', 'durften', 'durftet', 'durften'], perfekt: ['habe gedurft', 'hast gedurft', 'hat gedurft', 'haben gedurft', 'habt gedurft', 'haben gedurft'] },
  wollen: { verb: 'wollen', meaning: 'to want', prasens: ['will', 'willst', 'will', 'wollen', 'wollt', 'wollen'], prateritum: ['wollte', 'wolltest', 'wollte', 'wollten', 'wolltet', 'wollten'], perfekt: ['habe gewollt', 'hast gewollt', 'hat gewollt', 'haben gewollt', 'habt gewollt', 'haben gewollt'] },
  sagen: { verb: 'sagen', meaning: 'to say', prasens: ['sage', 'sagst', 'sagt', 'sagen', 'sagt', 'sagen'], prateritum: ['sagte', 'sagtest', 'sagte', 'sagten', 'sagtet', 'sagten'], perfekt: ['habe gesagt', 'hast gesagt', 'hat gesagt', 'haben gesagt', 'habt gesagt', 'haben gesagt'] },
  machen: { verb: 'machen', meaning: 'to make/do', prasens: ['mache', 'machst', 'macht', 'machen', 'macht', 'machen'], prateritum: ['machte', 'machtest', 'machte', 'machten', 'machtet', 'machten'], perfekt: ['habe gemacht', 'hast gemacht', 'hat gemacht', 'haben gemacht', 'habt gemacht', 'haben gemacht'] },
  gehen: { verb: 'gehen', meaning: 'to go', prasens: ['gehe', 'gehst', 'geht', 'gehen', 'geht', 'gehen'], prateritum: ['ging', 'gingst', 'ging', 'gingen', 'gingt', 'gingen'], perfekt: ['bin gegangen', 'bist gegangen', 'ist gegangen', 'sind gegangen', 'seid gegangen', 'sind gegangen'] },
  kommen: { verb: 'kommen', meaning: 'to come', prasens: ['komme', 'kommst', 'kommt', 'kommen', 'kommt', 'kommen'], prateritum: ['kam', 'kamst', 'kam', 'kamen', 'kamt', 'kamen'], perfekt: ['bin gekommen', 'bist gekommen', 'ist gekommen', 'sind gekommen', 'seid gekommen', 'sind gekommen'] },
  sehen: { verb: 'sehen', meaning: 'to see', prasens: ['sehe', 'siehst', 'sieht', 'sehen', 'seht', 'sehen'], prateritum: ['sah', 'sahst', 'sah', 'sahen', 'saht', 'sahen'], perfekt: ['habe gesehen', 'hast gesehen', 'hat gesehen', 'haben gesehen', 'habt gesehen', 'haben gesehen'] },
  hören: { verb: 'hören', meaning: 'to hear', prasens: ['höre', 'hörst', 'hört', 'hören', 'hört', 'hören'], prateritum: ['hörte', 'hörtest', 'hörte', 'hörten', 'hörtet', 'hörten'], perfekt: ['habe gehört', 'hast gehört', 'hat gehört', 'haben gehört', 'habt gehört', 'haben gehört'] },
  geben: { verb: 'geben', meaning: 'to give', prasens: ['gebe', 'gibst', 'gibt', 'geben', 'gebt', 'geben'], prateritum: ['gab', 'gabst', 'gab', 'gaben', 'gabt', 'gaben'], perfekt: ['habe gegeben', 'hast gegeben', 'hat gegeben', 'haben gegeben', 'habt gegeben', 'haben gegeben'] },
  nehmen: { verb: 'nehmen', meaning: 'to take', prasens: ['nehme', 'nimmst', 'nimmt', 'nehmen', 'nehmt', 'nehmen'], prateritum: ['nahm', 'nahmst', 'nahm', 'nahmen', 'nahmt', 'nahmen'], perfekt: ['habe genommen', 'hast genommen', 'hat genommen', 'haben genommen', 'habt genommen', 'haben genommen'] },
  essen: { verb: 'essen', meaning: 'to eat', prasens: ['esse', 'isst', 'isst', 'essen', 'esst', 'essen'], prateritum: ['aß', 'aßest', 'aß', 'aßen', 'aßt', 'aßen'], perfekt: ['habe gegessen', 'hast gegessen', 'hat gegessen', 'haben gegessen', 'habt gegessen', 'haben gegessen'] },
  trinken: { verb: 'trinken', meaning: 'to drink', prasens: ['trinke', 'trinkst', 'trinkt', 'trinken', 'trinkt', 'trinken'], prateritum: ['trank', 'trankst', 'trank', 'tranken', 'trankt', 'tranken'], perfekt: ['habe getrunken', 'hast getrunken', 'hat getrunken', 'haben getrunken', 'habt getrunken', 'haben getrunken'] },
  sprechen: { verb: 'sprechen', meaning: 'to speak', prasens: ['spreche', 'sprichst', 'spricht', 'sprechen', 'sprecht', 'sprechen'], prateritum: ['sprach', 'sprachst', 'sprach', 'sprachen', 'spracht', 'sprachen'], perfekt: ['habe gesprochen', 'hast gesprochen', 'hat gesprochen', 'haben gesprochen', 'habt gesprochen', 'haben gesprochen'] },
  lesen: { verb: 'lesen', meaning: 'to read', prasens: ['lese', 'liest', 'liest', 'lesen', 'lest', 'lesen'], prateritum: ['las', 'lasest', 'las', 'lasen', 'last', 'lasen'], perfekt: ['habe gelesen', 'hast gelesen', 'hat gelesen', 'haben gelesen', 'habt gelesen', 'haben gelesen'] },
  schreiben: { verb: 'schreiben', meaning: 'to write', prasens: ['schreibe', 'schreibst', 'schreibt', 'schreiben', 'schreibt', 'schreiben'], prateritum: ['schrieb', 'schriebst', 'schrieb', 'schrieben', 'schriebt', 'schrieben'], perfekt: ['habe geschrieben', 'hast geschrieben', 'hat geschrieben', 'haben geschrieben', 'habt geschrieben', 'haben geschrieben'] },
};

const verbNames = Object.keys(verbsDb).sort();

function getVerbOfDay() {
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  return verbsDb[verbNames[dayOfYear % verbNames.length]];
}

const pronouns = ['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie/Sie'];

export function InlineVerbLookup() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const verbOfDay = getVerbOfDay();

  function handleSelect(verbName) {
    setQuery(verbName);
    setResult(verbsDb[verbName]);
    setExpanded(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const lower = query.toLowerCase().trim();
    if (verbsDb[lower]) {
      setResult(verbsDb[lower]);
      setExpanded(true);
    }
  }

  const filtered = query.length > 0 ? verbNames.filter(v => v.startsWith(query.toLowerCase())) : [];

  return (
    <div>
      <h4 className="text-sm font-bold text-zinc-200 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>🔍 Verb Lookup</h4>

      <form onSubmit={handleSubmit} className="relative mb-3">
        <input type="text" value={query} onChange={e => { setQuery(e.target.value); setExpanded(false); }} placeholder="Search verb..." className="w-full h-10 px-4 pr-10 text-[13px] rounded-xl border border-zinc-700" style={{ background: '#27272A', color: '#D4D4D8' }} />
        <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg bg-lime-500 text-zinc-900 flex items-center justify-center text-xs hover:bg-lime-400 transition">→</button>
        {query.length > 0 && filtered.length > 0 && !result && (
          <div className="absolute top-full left-0 right-0 mt-1 rounded-xl border border-zinc-700 overflow-hidden z-10" style={{ background: '#20202A' }}>
            {filtered.slice(0, 5).map(v => (
              <button key={v} type="button" onClick={() => handleSelect(v)} className="w-full text-left px-3 py-2 text-[12px] text-zinc-300 hover:bg-zinc-800 transition">{v}</button>
            ))}
          </div>
        )}
      </form>

      {!expanded && !result && (
        <div className="rounded-2xl p-3 mb-2 border border-zinc-700" style={{ background: 'rgba(163, 230, 53, 0.05)' }}>
          <p className="text-[10px] font-bold text-lime-400 mb-1 uppercase tracking-wider">✨ Verb of the Day</p>
          <p className="text-base font-bold text-zinc-100">{verbOfDay.verb}</p>
          <p className="text-[11px] text-zinc-500">{verbOfDay.meaning}</p>
          <div className="mt-2 flex flex-wrap gap-1">
            {verbOfDay.prasens.slice(0, 2).map((f, i) => (
              <span key={i} className="text-[10px] px-2 py-0.5 rounded-md border border-zinc-700 text-zinc-400">{pronouns[i]} {f}</span>
            ))}
          </div>
        </div>
      )}

      {result && expanded && (
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xl font-bold text-zinc-100" style={{ fontFamily: 'Poppins, sans-serif' }}>{result.verb}</span>
            <span className="text-[11px] text-zinc-500 italic">{result.meaning}</span>
          </div>
          {['Präsens', 'Präteritum', 'Perfekt'].map((tense, ti) => {
            const data = [result.prasens, result.prateritum, result.perfekt][ti];
            return (
              <div key={tense} className="mb-2">
                <p className="text-[10px] font-bold text-lime-400 mb-1 uppercase tracking-wider">{tense}</p>
                <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[12px] text-zinc-300">
                  {data.map((f, i) => (
                    <span key={i} className="text-zinc-400">{pronouns[i]} <span className="font-medium text-zinc-200">{f}</span></span>
                  ))}
                </div>
              </div>
            );
          })}
          <div className="flex flex-wrap gap-1 mt-2 pt-2 border-t border-zinc-700/50">
            {verbNames.slice(0, 6).map(v => (
              <button key={v} onClick={() => handleSelect(v)} className="px-2 py-1 rounded-lg border border-zinc-700 text-[10px] text-zinc-400 hover:text-zinc-200 hover:border-zinc-600 transition">{v}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function QuickGermanTool({ onClose }) {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [recent, setRecent] = useState([]);

  const verbOfDay = getVerbOfDay();

  function handleSelect(verbName) {
    setQuery(verbName);
    setResult(verbsDb[verbName]);
    if (!recent.includes(verbName)) setRecent(prev => [verbName, ...prev].slice(0, 5));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const lower = query.toLowerCase().trim();
    if (verbsDb[lower]) handleSelect(lower);
  }

  const filtered = query.length > 0 ? verbNames.filter(v => v.startsWith(query.toLowerCase())) : [];

  const pronouns = ['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie/Sie'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative w-full max-w-lg mx-4 max-h-[85vh] overflow-y-auto rounded-3xl shadow-2xl border border-zinc-700 scale-in" onClick={e => e.stopPropagation()} style={{ background: '#18181B' }}>
        <div className="flex items-center justify-between p-5 border-b border-zinc-700">
          <h3 className="font-bold text-zinc-100 text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>Quick Verb Lookup</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-zinc-200 transition text-sm">✕</button>
        </div>

        <div className="p-5">
          <form onSubmit={handleSubmit} className="relative mb-5">
            <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search German verb..." className="paper-input w-full pr-12" autoFocus />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-lime-500 text-zinc-900 flex items-center justify-center text-sm hover:bg-lime-400 transition">→</button>
            {query.length > 0 && filtered.length > 0 && !result && (
              <div className="absolute top-full left-0 right-0 mt-1 rounded-xl border border-zinc-700 overflow-hidden z-10" style={{ background: '#20202A' }}>
                {filtered.slice(0, 8).map(v => (
                  <button key={v} type="button" onClick={() => handleSelect(v)} className="w-full text-left px-4 py-2.5 text-[13px] text-zinc-300 hover:bg-zinc-800 transition">{v}</button>
                ))}
              </div>
            )}
          </form>

          {!result && !query && (
            <div className="rounded-2xl p-5 mb-4 border border-zinc-700" style={{ background: 'rgba(163, 230, 53, 0.05)' }}>
              <p className="text-[10px] font-bold text-lime-400 mb-2 uppercase tracking-wider">✨ Verb of the Day</p>
              <p className="text-lg font-bold text-zinc-100">{verbOfDay.verb}</p>
              <p className="text-[13px] text-zinc-500 mb-3">{verbOfDay.meaning}</p>
              <div className="grid grid-cols-2 gap-1 text-[12px] text-zinc-400">
                {pronouns.map((p, i) => <span key={i}>{p} {verbOfDay.prasens[i]}</span>)}
              </div>
            </div>
          )}

          {result && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-bold text-zinc-100" style={{ fontFamily: 'Poppins, sans-serif' }}>{result.verb}</span>
                <span className="text-[12px] text-zinc-500 italic">({result.meaning})</span>
              </div>

              {['Präsens', 'Präteritum', 'Perfekt'].map((tense, ti) => {
                const data = [result.prasens, result.prateritum, result.perfekt][ti];
                return (
                  <div key={tense} className="mb-4">
                    <p className="text-[10px] font-bold text-cyan-400 mb-1.5 uppercase tracking-wider">{tense}</p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {data.map((f, i) => (
                        <span key={i} className="text-[13px] text-zinc-400"><span className="text-zinc-600 w-16 inline-block">{pronouns[i]}</span><span className="font-semibold text-zinc-200">{f}</span></span>
                      ))}
                    </div>
                  </div>
                );
              })}

              <div className="mt-4 pt-4 border-t border-zinc-700/50">
                <p className="text-[11px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">Quick select</p>
                <div className="flex flex-wrap gap-1.5">
                  {verbNames.slice(0, 10).map(v => (
                    <button key={v} onClick={() => handleSelect(v)} className="px-3 py-1.5 rounded-lg border border-zinc-700 text-[12px] text-zinc-400 hover:text-zinc-200 hover:border-zinc-600 transition">{v}</button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

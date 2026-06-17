import { useState } from 'react';

const VERB_CONJUGATIONS = {
  machen: { prasens: ['ich mache', 'du machst', 'er/sie macht', 'wir machen', 'ihr macht', 'sie/Sie machen'], praeteritum: ['ich machte', 'du machtest', 'er/sie machte', 'wir machten', 'ihr machtet', 'sie/Sie machten'], perfekt: ['ich habe gemacht', 'du hast gemacht', 'er/sie hat gemacht', 'wir haben gemacht', 'ihr habt gemacht', 'sie/Sie haben gemacht'] },
  lernen: { prasens: ['ich lerne', 'du lernst', 'er/sie lernt', 'wir lernen', 'ihr lernt', 'sie/Sie lernen'], praeteritum: ['ich lernte', 'du lerntest', 'er/sie lernte', 'wir lernten', 'ihr lerntet', 'sie/Sie lernten'], perfekt: ['ich habe gelernt', 'du hast gelernt', 'er/sie hat gelernt', 'wir haben gelernt', 'ihr habt gelernt', 'sie/Sie haben gelernt'] },
  spielen: { prasens: ['ich spiele', 'du spielst', 'er/sie spielt', 'wir spielen', 'ihr spielt', 'sie/Sie spielen'], praeteritum: ['ich spielte', 'du spieltest', 'er/sie spielte', 'wir spielten', 'ihr spieltet', 'sie/Sie spielten'], perfekt: ['ich habe gespielt', 'du hast gespielt', 'er/sie hat gespielt', 'wir haben gespielt', 'ihr habt gespielt', 'sie/Sie haben gespielt'] },
  wohnen: { prasens: ['ich wohne', 'du wohnst', 'er/sie wohnt', 'wir wohnen', 'ihr wohnt', 'sie/Sie wohnen'], praeteritum: ['ich wohnte', 'du wohntest', 'er/sie wohnte', 'wir wohnten', 'ihr wohntet', 'sie/Sie wohnten'], perfekt: ['ich habe gewohnt', 'du hast gewohnt', 'er/sie hat gewohnt', 'wir haben gewohnt', 'ihr habt gewohnt', 'sie/Sie haben gewohnt'] },
  arbeiten: { prasens: ['ich arbeite', 'du arbeitest', 'er/sie arbeitet', 'wir arbeiten', 'ihr arbeitet', 'sie/Sie arbeiten'], praeteritum: ['ich arbeitete', 'du arbeitetest', 'er/sie arbeitete', 'wir arbeiteten', 'ihr arbeitetet', 'sie/Sie arbeiteten'], perfekt: ['ich habe gearbeitet', 'du hast gearbeitet', 'er/sie hat gearbeitet', 'wir haben gearbeitet', 'ihr habt gearbeitet', 'sie/Sie haben gearbeitet'] },
  essen: { prasens: ['ich esse', 'du isst', 'er/sie isst', 'wir essen', 'ihr esst', 'sie/Sie essen'], praeteritum: ['ich aß', 'du aßt', 'er/sie aß', 'wir aßen', 'ihr aßt', 'sie/Sie aßen'], perfekt: ['ich habe gegessen', 'du hast gegessen', 'er/sie hat gegessen', 'wir haben gegessen', 'ihr habt gegessen', 'sie/Sie haben gegessen'] },
  trinken: { prasens: ['ich trinke', 'du trinkst', 'er/sie trinkt', 'wir trinken', 'ihr trinkt', 'sie/Sie trinken'], praeteritum: ['ich trank', 'du trankst', 'er/sie trank', 'wir tranken', 'ihr trankt', 'sie/Sie tranken'], perfekt: ['ich habe getrunken', 'du hast getrunken', 'er/sie hat getrunken', 'wir haben getrunken', 'ihr habt getrunken', 'sie/Sie haben getrunken'] },
  gehen: { prasens: ['ich gehe', 'du gehst', 'er/sie geht', 'wir gehen', 'ihr geht', 'sie/Sie gehen'], praeteritum: ['ich ging', 'du gingst', 'er/sie ging', 'wir gingen', 'ihr gingt', 'sie/Sie gingen'], perfekt: ['ich bin gegangen', 'du bist gegangen', 'er/sie ist gegangen', 'wir sind gegangen', 'ihr seid gegangen', 'sie/Sie sind gegangen'] },
  fahren: { prasens: ['ich fahre', 'du fährst', 'er/sie fährt', 'wir fahren', 'ihr fahrt', 'sie/Sie fahren'], praeteritum: ['ich fuhr', 'du fuhrst', 'er/sie fuhr', 'wir fuhren', 'ihr fuhrt', 'sie/Sie fuhren'], perfekt: ['ich bin gefahren', 'du bist gefahren', 'er/sie ist gefahren', 'wir sind gefahren', 'ihr seid gefahren', 'sie/Sie sind gefahren'] },
  kommen: { prasens: ['ich komme', 'du kommst', 'er/sie kommt', 'wir kommen', 'ihr kommt', 'sie/Sie kommen'], praeteritum: ['ich kam', 'du kamst', 'er/sie kam', 'wir kamen', 'ihr kamt', 'sie/Sie kamen'], perfekt: ['ich bin gekommen', 'du bist gekommen', 'er/sie ist gekommen', 'wir sind gekommen', 'ihr seid gekommen', 'sie/Sie sind gekommen'] },
  sprechen: { prasens: ['ich spreche', 'du sprichst', 'er/sie spricht', 'wir sprechen', 'ihr sprecht', 'sie/Sie sprechen'], praeteritum: ['ich sprach', 'du sprachst', 'er/sie sprach', 'wir sprachen', 'ihr spracht', 'sie/Sie sprachen'], perfekt: ['ich habe gesprochen', 'du hast gesprochen', 'er/sie hat gesprochen', 'wir haben gesprochen', 'ihr habt gesprochen', 'sie/Sie haben gesprochen'] },
  lesen: { prasens: ['ich lese', 'du liest', 'er/sie liest', 'wir lesen', 'ihr lest', 'sie/Sie lesen'], praeteritum: ['ich las', 'du lasst', 'er/sie las', 'wir lasen', 'ihr last', 'sie/Sie lasen'], perfekt: ['ich habe gelesen', 'du hast gelesen', 'er/sie hat gelesen', 'wir haben gelesen', 'ihr habt gelesen', 'sie/Sie haben gelesen'] },
  schreiben: { prasens: ['ich schreibe', 'du schreibst', 'er/sie schreibt', 'wir schreiben', 'ihr schreibt', 'sie/Sie schreiben'], praeteritum: ['ich schrieb', 'du schriebst', 'er/sie schrieb', 'wir schrieben', 'ihr schriebt', 'sie/Sie schrieben'], perfekt: ['ich habe geschrieben', 'du hast geschrieben', 'er/sie hat geschrieben', 'wir haben geschrieben', 'ihr habt geschrieben', 'sie/Sie haben geschrieben'] },
  sehen: { prasens: ['ich sehe', 'du siehst', 'er/sie sieht', 'wir sehen', 'ihr seht', 'sie/Sie sehen'], praeteritum: ['ich sah', 'du sahst', 'er/sie sah', 'wir sahen', 'ihr saht', 'sie/Sie sahen'], perfekt: ['ich habe gesehen', 'du hast gesehen', 'er/sie hat gesehen', 'wir haben gesehen', 'ihr habt gesehen', 'sie/Sie haben gesehen'] },
  geben: { prasens: ['ich gebe', 'du gibst', 'er/sie gibt', 'wir geben', 'ihr gebt', 'sie/Sie geben'], praeteritum: ['ich gab', 'du gabst', 'er/sie gab', 'wir gaben', 'ihr gabt', 'sie/Sie gaben'], perfekt: ['ich habe gegeben', 'du hast gegeben', 'er/sie hat gegeben', 'wir haben gegeben', 'ihr habt gegeben', 'sie/Sie haben gegeben'] },
  nehmen: { prasens: ['ich nehme', 'du nimmst', 'er/sie nimmt', 'wir nehmen', 'ihr nehmt', 'sie/Sie nehmen'], praeteritum: ['ich nahm', 'du nahmst', 'er/sie nahm', 'wir nahmen', 'ihr nahmt', 'sie/Sie nahmen'], perfekt: ['ich habe genommen', 'du hast genommen', 'er/sie hat genommen', 'wir haben genommen', 'ihr habt genommen', 'sie/Sie haben genommen'] },
  schlafen: { prasens: ['ich schlafe', 'du schläfst', 'er/sie schläft', 'wir schlafen', 'ihr schlaft', 'sie/Sie schlafen'], praeteritum: ['ich schlief', 'du schliefst', 'er/sie schlief', 'wir schliefen', 'ihr schlieft', 'sie/Sie schliefen'], perfekt: ['ich habe geschlafen', 'du hast geschlafen', 'er/sie hat geschlafen', 'wir haben geschlafen', 'ihr habt geschlafen', 'sie/Sie haben geschlafen'] },
  helfen: { prasens: ['ich helfe', 'du hilfst', 'er/sie hilft', 'wir helfen', 'ihr helft', 'sie/Sie helfen'], praeteritum: ['ich half', 'du halfst', 'er/sie half', 'wir halfen', 'ihr halft', 'sie/Sie halfen'], perfekt: ['ich habe geholfen', 'du hast geholfen', 'er/sie hat geholfen', 'wir haben geholfen', 'ihr habt geholfen', 'sie/Sie haben geholfen'] },
  kennen: { prasens: ['ich kenne', 'du kennst', 'er/sie kennt', 'wir kennen', 'ihr kennt', 'sie/Sie kennen'], praeteritum: ['ich kannte', 'du kanntest', 'er/sie kannte', 'wir kannten', 'ihr kanntet', 'sie/Sie kannten'], perfekt: ['ich habe gekannt', 'du hast gekannt', 'er/sie hat gekannt', 'wir haben gekannt', 'ihr habt gekannt', 'sie/Sie haben gekannt'] },
  finden: { prasens: ['ich finde', 'du findest', 'er/sie findet', 'wir finden', 'ihr findet', 'sie/Sie finden'], praeteritum: ['ich fand', 'du fandst', 'er/sie fand', 'wir fanden', 'ihr fandt', 'sie/Sie fanden'], perfekt: ['ich habe gefunden', 'du hast gefunden', 'er/sie hat gefunden', 'wir haben gefunden', 'ihr habt gefunden', 'sie/Sie haben gefunden'] },
  wissen: { prasens: ['ich weiß', 'du weißt', 'er/sie weiß', 'wir wissen', 'ihr wisst', 'sie/Sie wissen'], praeteritum: ['ich wusste', 'du wusstest', 'er/sie wusste', 'wir wussten', 'ihr wusstet', 'sie/Sie wussten'], perfekt: ['ich habe gewusst', 'du hast gewusst', 'er/sie hat gewusst', 'wir haben gewusst', 'ihr habt gewusst', 'sie/Sie haben gewusst'] },
};

export default function QuickGermanTool({ onClose }) {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);

  function handleSearch(e) {
    e.preventDefault();
    const verb = query.trim().toLowerCase();
    if (VERB_CONJUGATIONS[verb]) setResult({ verb, ...VERB_CONJUGATIONS[verb] });
    else setResult(null);
  }

  function handleSelect(verb) {
    setQuery(verb);
    setResult({ verb, ...VERB_CONJUGATIONS[verb] });
  }

  const suggestedVerbs = Object.keys(VERB_CONJUGATIONS).slice(0, 8);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative glass-card w-full max-w-lg shadow-2xl scale-in" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
          <h3 className="font-bold text-slate-200 text-sm">Quick Verb Lookup</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 flex items-center justify-center text-slate-400 hover:text-slate-200 transition text-sm">✕</button>
        </div>

        <form onSubmit={handleSearch} className="p-4">
          <div className="flex gap-2">
            <input type="text" value={query} onChange={e => { setQuery(e.target.value); setResult(null); }}
              placeholder="Type a German verb..." autoFocus
              className="flex-1 px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50" />
            <button type="submit" className="px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-500 transition shadow-lg shadow-blue-500/20">Search</button>
          </div>
        </form>

        {!result && (
          <div className="px-4 pb-4">
            <p className="text-xs text-slate-500 mb-2">Quick select:</p>
            <div className="flex flex-wrap gap-1.5">
              {suggestedVerbs.map(verb => (
                <button key={verb} onClick={() => handleSelect(verb)}
                  className="px-3 py-1.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-xs text-slate-400 hover:bg-blue-500/10 hover:border-blue-500/30 hover:text-blue-400 transition">
                  {verb}
                </button>
              ))}
            </div>
          </div>
        )}

        {result && (
          <div className="p-4 space-y-3 slide-up">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg font-bold text-slate-100">{result.verb}</span>
              <span className="text-xs bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full font-medium border border-blue-500/20">verb</span>
            </div>
            <ConjugationTable label="Präsens (Present)" forms={result.prasens} color="blue" />
            <ConjugationTable label="Präteritum (Simple Past)" forms={result.praeteritum} color="amber" />
            <ConjugationTable label="Perfekt (Present Perfect)" forms={result.perfekt} color="emerald" />
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
    if (VERB_CONJUGATIONS[verb]) setResult({ verb, ...VERB_CONJUGATIONS[verb] });
    else setResult(null);
  }

  function handleSelect(verb) {
    setQuery(verb);
    setResult({ verb, ...VERB_CONJUGATIONS[verb] });
  }

  const quickVerbs = ['machen', 'gehen', 'haben', 'sein', 'kommen', 'sagen'];

  return (
    <div className="glass-card p-4">
      <h4 className="text-sm font-bold text-slate-200 mb-3">🔍 Verb Lookup</h4>
      <form onSubmit={handleSearch} className="flex gap-2 mb-3">
        <input type="text" value={query} onChange={e => { setQuery(e.target.value); setResult(null); }}
          placeholder="Type a verb..."
          className="flex-1 px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
        <button type="submit" className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-500 transition">Go</button>
      </form>

      {!result && (
        <div className="flex flex-wrap gap-1.5 mb-2">
          {quickVerbs.map(verb => (
            <button key={verb} onClick={() => handleSelect(verb)}
              className="px-2.5 py-1 bg-slate-800/50 border border-slate-700/50 rounded-md text-[11px] text-slate-500 hover:bg-blue-500/10 hover:text-blue-400 transition">
              {verb}
            </button>
          ))}
        </div>
      )}

      {result && (
        <div className="space-y-2 mt-2">
          <p className="font-bold text-sm text-slate-200">{result.verb}</p>
          <MiniConjugation label="Präsens" forms={result.prasens} color="blue" />
          <MiniConjugation label="Perfekt" forms={result.perfekt} color="emerald" />
        </div>
      )}
    </div>
  );
}

function ConjugationTable({ label, forms, color }) {
  const colors = { blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20', amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20', emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' };
  const persons = ['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie/Sie'];
  return (
    <div className={`rounded-xl border ${colors[color]} overflow-hidden`}>
      <div className="px-3 py-2 font-semibold text-xs">{label}</div>
      <div className="divide-y divide-current/5">
        {forms.map((form, i) => (
          <div key={i} className="px-3 py-1.5 flex justify-between text-xs">
            <span className="opacity-60">{persons[i]}</span>
            <span className="font-medium text-slate-300">{form.replace(/^(ich|du|er\/sie\/es|wir|ihr|sie\/Sie)\s+/, '')}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniConjugation({ label, forms, color }) {
  const bg = color === 'blue' ? 'bg-blue-500/10 border-blue-500/20' : 'bg-emerald-500/10 border-emerald-500/20';
  const text = color === 'blue' ? 'text-blue-400' : 'text-emerald-400';
  return (
    <div className={`${bg} border rounded-lg p-2`}>
      <p className={`text-[10px] font-bold ${text} mb-1`}>{label}</p>
      <p className="text-xs text-slate-300">{forms[0]}</p>
    </div>
  );
}

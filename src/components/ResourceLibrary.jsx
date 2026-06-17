export default function ResourceLibrary({ resources }) {
  if (!resources || resources.length === 0) return null;
  const icons = { 'Nicos Weg': '📺', 'Goethe-Institut': '🏛️', 'Easy German': '🎬', 'Jenny\'s German Lessons': '👩‍🏫', 'GradGermany': '📝', 'Slow German': '🎧', 'Deutsch für Dich': '💬', 'Lingoda': '📖', 'Babbel': '🗣️' };
  return (
    <div className="bg-slate-800 border border-slate-700/50 rounded-2xl p-5">
      <h4 className="text-sm font-bold text-slate-200 mb-3">📚 Resource Library</h4>
      <div className="space-y-2">
        {resources.map((r, i) => (
          <a key={i} href={r.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-slate-900/50 border border-slate-700/50 rounded-xl hover:border-cyan-400/50 hover:bg-slate-800 transition">
            <span className="text-lg">{icons[r.name] || '🔗'}</span>
            <div className="flex-1 min-w-0"><div className="text-sm font-medium text-slate-200 truncate">{r.name}</div><div className="text-xs text-slate-400 truncate">{r.description}</div></div>
            <span className="text-xs text-slate-500">↗</span>
          </a>
        ))}
      </div>
    </div>
  );
}

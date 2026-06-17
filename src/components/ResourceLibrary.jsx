export default function ResourceLibrary({ resources }) {
  if (!resources || resources.length === 0) return null;

  const iconMap = {
    'Nicos Weg': '📺', 'Goethe-Institut': '🏛️', 'Easy German': '🎬',
    'Jenny\'s German Lessons': '👩‍🏫', 'GradGermany': '📝', 'Slow German': '🎧',
    'Deutsch für Dich': '💬', 'Lingoda': '📖', 'Babbel': '🗣️',
    'default': '🔗',
  };

  return (
    <div className="glass-card p-5">
      <h4 className="text-sm font-bold text-slate-200 mb-3">📚 Resource Library</h4>
      <div className="space-y-2">
        {resources.map((resource, i) => (
          <a key={i} href={resource.url} target="_blank" rel="noopener noreferrer"
             className="flex items-center gap-3 p-3 bg-slate-800/30 border border-slate-700/30 rounded-xl hover:border-blue-500/30 hover:bg-slate-800/50 transition">
            <span className="text-lg">{iconMap[resource.name] || iconMap.default}</span>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-slate-300 truncate">{resource.name}</div>
              <div className="text-xs text-slate-500 truncate">{resource.description}</div>
            </div>
            <span className="text-xs text-slate-600">↗</span>
          </a>
        ))}
      </div>
    </div>
  );
}

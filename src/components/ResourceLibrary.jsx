export default function ResourceLibrary({ resources }) {
  if (!resources || resources.length === 0) return null;
  const icons = { 'Nicos Weg': '📺', 'Goethe-Institut': '🏛️', 'Easy German': '🎬', 'Jenny\'s German Lessons': '👩‍🏫', 'GradGermany': '📝', 'Slow German': '🎧' };

  return (
    <div className="paper-card p-5">
      <h4 className="text-lg font-bold text-[#1A1A2E] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>📚 Resource Library</h4>
      <div className="space-y-3">
        {resources.map((r, i) => (
          <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
             className="flex items-center gap-4 p-4 bg-[#FAF6F0] border border-[#E8E0D4] rounded-2xl hover:border-[#B8860B]/30 hover:shadow-md transition">
            <span className="text-2xl">{icons[r.name] || '🔗'}</span>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-[14px] text-[#1A1A2E]">{r.name}</div>
              <div className="text-[12px] text-[#8A8A9A]">{r.description}</div>
            </div>
            <span className="text-[#8A8A9A]">↗</span>
          </a>
        ))}
      </div>
    </div>
  );
}

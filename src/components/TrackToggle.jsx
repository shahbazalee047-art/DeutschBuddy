export default function TrackToggle({ mode, onToggle }) {
  return (
    <div className="flex items-center gap-1.5 bg-slate-800 border border-slate-700/50 rounded-xl px-2 py-1.5">
      <span className="text-[10px] text-slate-400 font-medium px-1.5 hidden sm:inline">Pacing:</span>
      <button onClick={() => onToggle('standard')}
        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
          mode === 'standard' ? 'text-black' : 'text-slate-400 hover:text-slate-200'
        }`}
        style={mode === 'standard' ? { background: '#FFCC00' } : {}}>🐢 Standard</button>
      <button onClick={() => onToggle('fast')}
        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
          mode === 'fast' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
        }`}
        style={mode === 'fast' ? { background: '#DD0000' } : {}}>🚀 Fast</button>
    </div>
  );
}

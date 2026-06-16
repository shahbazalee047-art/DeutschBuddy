export default function TrackToggle({ mode, onToggle }) {
  return (
    <div className="flex items-center gap-1.5 bg-slate-800/50 border border-slate-700/50 rounded-xl px-2 py-1.5">
      <span className="text-[10px] text-slate-500 font-medium px-1.5 hidden sm:inline">Pacing:</span>
      <button onClick={() => onToggle('standard')}
        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${
          mode === 'standard' ? 'bg-blue-600 text-white glow-blue' : 'text-slate-500 hover:text-slate-300'
        }`}>
        🐢 Standard
      </button>
      <button onClick={() => onToggle('fast')}
        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${
          mode === 'fast' ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30' : 'text-slate-500 hover:text-slate-300'
        }`}>
        🚀 Fast
      </button>
    </div>
  );
}

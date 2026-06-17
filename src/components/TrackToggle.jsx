export default function TrackToggle({ mode, onToggle }) {
  return (
    <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 rounded-xl px-2 py-1.5">
      <span className="text-[10px] text-zinc-500 font-medium px-1.5 hidden sm:inline">Pacing:</span>
      <button onClick={() => onToggle('standard')}
        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
          mode === 'standard' ? 'bg-lime-400 text-zinc-950' : 'text-zinc-500 hover:text-zinc-300'
        }`}>🐢 Standard</button>
      <button onClick={() => onToggle('fast')}
        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
          mode === 'fast' ? 'bg-orange-400 text-zinc-950' : 'text-zinc-500 hover:text-zinc-300'
        }`}>🚀 Fast</button>
    </div>
  );
}

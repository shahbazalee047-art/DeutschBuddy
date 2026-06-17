export default function TrackToggle({ mode, onToggle }) {
  return (
    <div className="flex items-center gap-1.5 p-1.5 rounded-2xl border border-zinc-700/50" style={{ background: '#1E1E24' }}>
      <span className="text-[11px] text-zinc-500 font-medium px-2 hidden sm:inline uppercase" style={{ letterSpacing: '0.5px' }}>Pacing:</span>
      <button onClick={() => onToggle('standard')}
        className={`px-4 py-2 rounded-xl text-[13px] font-semibold transition-all active:scale-95 ${
          mode === 'standard'
            ? 'text-zinc-900 shadow-md bg-gradient-to-r from-lime-500 to-cyan-500'
            : 'text-zinc-400 hover:text-zinc-200'
        }`}>
        🐢 Standard
      </button>
      <button onClick={() => onToggle('fast')}
        className={`px-4 py-2 rounded-xl text-[13px] font-semibold transition-all active:scale-95 ${
          mode === 'fast'
            ? 'text-zinc-900 shadow-md bg-gradient-to-r from-lime-500 to-cyan-500'
            : 'text-zinc-400 hover:text-zinc-200'
        }`}>
        🚀 Fast
      </button>
    </div>
  );
}

export default function TrackToggle({ mode, onToggle }) {
  return (
    <div className="flex items-center gap-1.5 bg-white border border-[#E8DFD4] rounded-xl px-2 py-1.5 shadow-sm">
      <span className="text-[10px] text-[#9ca3af] font-medium px-1.5 hidden sm:inline">Pacing:</span>
      <button onClick={() => onToggle('standard')}
        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${mode === 'standard' ? 'text-white shadow-sm' : 'text-[#9ca3af] hover:text-[#4a5568]'}`}
        style={mode === 'standard' ? { background: '#8B6914' } : {}}>🐢 Standard</button>
      <button onClick={() => onToggle('fast')}
        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${mode === 'fast' ? 'text-white shadow-sm' : 'text-[#9ca3af] hover:text-[#4a5568]'}`}
        style={mode === 'fast' ? { background: '#C4956A' } : {}}>🚀 Fast</button>
    </div>
  );
}

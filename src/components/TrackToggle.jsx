export default function TrackToggle({ mode, onToggle }) {
  return (
    <div className="flex items-center gap-1.5 p-1.5 rounded-2xl" style={{ background: '#F5EFE6', border: '1px solid #E8E0D4' }}>
      <span className="text-[11px] text-[#8A8A9A] font-medium px-2 hidden sm:inline uppercase" style={{ letterSpacing: '0.5px' }}>Pacing:</span>
      <button onClick={() => onToggle('standard')}
        className={`px-4 py-2 rounded-xl text-[13px] font-semibold transition-all ${mode === 'standard' ? 'text-white shadow-md' : 'text-[#8A8A9A] hover:text-[#4A4A5A]'}`}
        style={mode === 'standard' ? { background: 'linear-gradient(135deg, #B8860B, #D4A843)', boxShadow: '0 2px 8px rgba(184, 134, 11, 0.3)' } : {}}>
        🐢 Standard
      </button>
      <button onClick={() => onToggle('fast')}
        className={`px-4 py-2 rounded-xl text-[13px] font-semibold transition-all ${mode === 'fast' ? 'text-white shadow-md' : 'text-[#8A8A9A] hover:text-[#4A4A5A]'}`}
        style={mode === 'fast' ? { background: 'linear-gradient(135deg, #B8860B, #D4A843)', boxShadow: '0 2px 8px rgba(184, 134, 11, 0.3)' } : {}}>
        🚀 Fast
      </button>
    </div>
  );
}

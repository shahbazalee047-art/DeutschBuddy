import { useState, useEffect } from 'react';
export default function ConfettiEffect({ active, onComplete }) {
  const [particles, setParticles] = useState([]);
  useEffect(() => { if (!active) return; const colors = ['#8B6914', '#C4956A', '#5B8C7A', '#1a1a2e', '#E8DFD4']; const p = Array.from({ length: 30 }, (_, i) => ({ id: i, x: Math.random() * 100, color: colors[Math.floor(Math.random() * colors.length)], delay: Math.random() * 0.5, duration: 1.5 + Math.random(), size: 3 + Math.random() * 5 })); setParticles(p); const t = setTimeout(() => { setParticles([]); onComplete?.(); }, 3000); return () => clearTimeout(t); }, [active]);
  if (particles.length === 0) return null;
  return (<div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">{particles.map(p => (<div key={p.id} className="absolute" style={{ left: `${p.x}%`, top: '-10px', width: p.size, height: p.size, backgroundColor: p.color, borderRadius: Math.random() > 0.5 ? '50%' : '2px', animation: `confettiFall ${p.duration}s ease-in ${p.delay}s forwards` }} />))}</div>);
}
export function DayCompleteCelebration({ show, xpEarned }) {
  return (<><ConfettiEffect active={show} />{show && (<div className="fixed inset-0 flex items-center justify-center z-40 pointer-events-none"><div className="bg-white border border-[#E8DFD4] px-8 py-6 text-center scale-in pointer-events-auto rounded-2xl shadow-2xl"><div className="text-5xl mb-3">🎉</div><h3 className="text-xl font-bold text-[#1a1a2e] mb-1">Tag geschafft!</h3><p className="text-[#6b7280] text-sm mb-3">Day complete! Great work today.</p><div className="inline-flex items-center gap-2 font-bold px-4 py-2 rounded-full text-white" style={{ background: 'linear-gradient(135deg, #8B6914, #C4956A)' }}><span>⚡</span><span>+{xpEarned} XP</span></div></div></div>)}</>);
}

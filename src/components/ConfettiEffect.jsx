import { useState, useEffect } from 'react';
export default function ConfettiEffect({ active, onComplete }) {
  const [particles, setParticles] = useState([]);
  useEffect(() => { if (!active) return; const colors = ['#B8860B', '#D4A843', '#4CAF50', '#2D8B7A', '#FF9800']; const p = Array.from({ length: 30 }, (_, i) => ({ id: i, x: Math.random() * 100, color: colors[Math.floor(Math.random() * colors.length)], delay: Math.random() * 0.5, duration: 1.5 + Math.random(), size: 3 + Math.random() * 5 })); setParticles(p); const t = setTimeout(() => { setParticles([]); onComplete?.(); }, 3000); return () => clearTimeout(t); }, [active]);
  if (particles.length === 0) return null;
  return (<div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">{particles.map(p => (<div key={p.id} className="absolute" style={{ left: `${p.x}%`, top: '-10px', width: p.size, height: p.size, backgroundColor: p.color, borderRadius: Math.random() > 0.5 ? '50%' : '2px', animation: `confettiFall ${p.duration}s ease-in ${p.delay}s forwards` }} />))}</div>);
}
export function DayCompleteCelebration({ show, xpEarned }) {
  return (<><ConfettiEffect active={show} />{show && (<div className="fixed inset-0 flex items-center justify-center z-40 pointer-events-none"><div className="paper-card px-10 py-8 text-center scale-in pointer-events-auto shadow-2xl"><div className="text-5xl mb-3">🎉</div><h3 className="text-xl font-bold text-[#1A1A2E] mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>Tag geschafft!</h3><p className="text-[#8A8A9A] text-sm mb-4">Day complete! Great work today.</p><div className="inline-flex items-center gap-2 font-bold px-5 py-2.5 rounded-full text-white" style={{ background: 'linear-gradient(135deg, #B8860B, #D4A843)', boxShadow: '0 4px 12px rgba(184, 134, 11, 0.3)' }}><span>⚡</span><span>+{xpEarned} XP</span></div></div></div>)}</>);
}

import { useState, useEffect } from 'react';
import { IconSparkles, IconBolt } from './Icons';
export default function ConfettiEffect({ active, onComplete }) {
  const [particles, setParticles] = useState([]);
  useEffect(() => { if (!active) return; const colors = ['#A3E635', '#06B6D4', '#22C55E', '#22D3EE', '#F59E0B']; const p = Array.from({ length: 30 }, (_, i) => ({ id: i, x: Math.random() * 100, color: colors[Math.floor(Math.random() * colors.length)], delay: Math.random() * 0.5, duration: 1.5 + Math.random(), size: 3 + Math.random() * 5 })); setParticles(p); const t = setTimeout(() => { setParticles([]); onComplete?.(); }, 3000); return () => clearTimeout(t); }, [active]);
  if (particles.length === 0) return null;
  return (<div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">{particles.map(p => (<div key={p.id} className="absolute" style={{ left: `${p.x}%`, top: '-10px', width: p.size, height: p.size, backgroundColor: p.color, borderRadius: Math.random() > 0.5 ? '50%' : '2px', animation: `confettiFall ${p.duration}s ease-in ${p.delay}s forwards` }} />))}</div>);
}
export function DayCompleteCelebration({ show, xpEarned }) {
  return (<><ConfettiEffect active={show} />{show && (<div className="fixed inset-0 flex items-center justify-center z-40 pointer-events-none"><div className="rounded-3xl px-10 py-8 text-center scale-in pointer-events-auto shadow-2xl border border-lime-500/20" style={{ background: '#20202A' }}><IconSparkles className="w-12 h-12 text-lime-400 mx-auto mb-3" /><h3 className="text-xl font-bold text-zinc-100 mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>Tag geschafft!</h3><p className="text-zinc-400 text-sm mb-4">Day complete! Great work today.</p><div className="inline-flex items-center gap-2 font-bold px-5 py-2.5 rounded-full text-zinc-900" style={{ background: 'linear-gradient(135deg, #A3E635, #06B6D4)', boxShadow: '0 4px 12px rgba(163, 230, 53, 0.3)' }}><IconBolt className="w-4 h-4" /><span>+{xpEarned} XP</span></div></div></div>)}</>);
}

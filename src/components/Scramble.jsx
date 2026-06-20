import { useState, useEffect } from 'react';
import SpeakerButton from './SpeakerButton';
import { IconShuffle, IconSparkles, IconHeart } from './Icons';

function shuffleString(str) {
  return str.split('').sort(() => Math.random() - 0.5).join('');
}

export default function Scramble({ content, onComplete }) {
  const [idx, setIdx] = useState(0); const [input, setInput] = useState(''); const [show, setShow] = useState(false); const [score, setScore] = useState(0);
  const words = content.words || [];
  const w = words[idx];
  const [shuffled, setShuffled] = useState(() => w ? shuffleString(w.scrambled) : '');

  useEffect(() => {
    if (w) setShuffled(shuffleString(w.scrambled));
  }, [w, w?.scrambled]);

  if (!words.length) return <Empty onComplete={onComplete} />;
  const isLast = idx === words.length - 1;
  function submit() { const ok = input.trim().toLowerCase() === w.answer.toLowerCase(); if (ok) setScore(p => p + 1); setShow(true); setTimeout(() => { if (isLast) onComplete(); else { setIdx(p => p + 1); setInput(''); setShow(false); } }, 1200); }
  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-5"><h3 className="font-bold text-text-dark text-lg flex items-center gap-2"><IconShuffle className="w-5 h-5 text-gold" /> Unscramble</h3><span className="text-sm font-bold text-gold">{score}/{words.length}</span></div>
      <div className="progress-bar mb-5"><div className="progress-bar-fill" style={{ width: `${((idx + 1) / words.length) * 100}%` }} /></div>
      <div className="paper-card p-6 mb-4 text-center">
        <p className="text-[11px] text-text-muted mb-4 uppercase font-medium" style={{ letterSpacing: '0.5px' }}>Unscramble the German word:</p>
        <div className="flex justify-center gap-2 mb-5">{shuffled.map((l, i) => (<span key={i} className="w-12 h-12 flex items-center justify-center bg-bg-secondary border border-border  text-lg font-bold text-text-body">{l}</span>))}</div>
        <div className="flex items-center justify-center gap-3 mb-3"><input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && !show && submit()} disabled={show} placeholder="Type the word..." className="w-56 paper-input text-center text-lg font-medium" /><SpeakerButton text={w.answer} size="md" /></div>
        {!show && <button onClick={submit} className="btn-primary px-6 active:scale-95">Check</button>}
      </div>
      {show && <div className={`text-center p-3  text-sm font-semibold text-text-on-dark`} style={{ background: input.trim().toLowerCase() === w.answer.toLowerCase() ? 'var(--success)' : 'var(--gold-light)' }}>{input.trim().toLowerCase() === w.answer.toLowerCase() ? <span className="flex items-center justify-center gap-1">Richtig! <IconSparkles className="w-4 h-4" /></span> : <span className="flex items-center justify-center gap-1">Answer: "{w.answer}" <IconHeart className="w-4 h-4" /></span>}</div>}
    </div>
  );
}
function Empty({ onComplete }) { return <div className="text-center py-12"><p className="text-text-muted mb-4">Coming soon!</p><button onClick={onComplete} className="btn-primary px-6">Mark Complete</button></div>; }

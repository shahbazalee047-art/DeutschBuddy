import { useEffect, useRef } from 'react';

export default function DayCompleteCelebration({ show = false, xpEarned = 0, onComplete }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    if (!show) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const colors = ['var(--gold)', 'var(--gold-light)', 'var(--gold-light)', '#F4A261', '#E76F51'];
    const pieces = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      w: Math.random() * 10 + 4,
      h: Math.random() * 6 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      vy: Math.random() * 3 + 2,
      vx: (Math.random() - 0.5) * 2,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 6,
      opacity: 1,
    }));

    let startTime = performance.now();
    const duration = 4000;

    function animate(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of pieces) {
        p.y += p.vy;
        p.x += p.vx;
        p.rotation += p.rotSpeed;
        p.opacity = progress > 0.8 ? 1 - (progress - 0.8) / 0.2 : 1;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else if (onComplete) {
        onComplete();
      }
    }

    animRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [show, onComplete]);

  if (!show) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50"
      />
      {xpEarned > 0 && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none text-center animate-xp-toast">
          <div className="text-5xl font-bold text-gold" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", textShadow: '0 0 30px rgba(196,146,74,0.5)' }}>+{xpEarned} XP</div>
        </div>
      )}
    </>
  );
}
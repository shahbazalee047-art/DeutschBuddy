import { useEffect, useRef } from 'react';

export default function DayCompleteCelebration({ show = false, xpEarned = 0 }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    if (!show) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#7FB069', '#D4A574', '#6BA3BE', '#F4A261', '#E76F51'];
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
      }
    }

    animRef.current = requestAnimationFrame(animate);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [show]);

  if (!show) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
    />
  );
}
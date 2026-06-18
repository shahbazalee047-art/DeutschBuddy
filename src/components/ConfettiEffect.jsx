export default function DayCompleteCelebration({ show = false, xpEarned = 0 }) {
  if (!show) return null;

  const confetti = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * window.innerWidth,
    y: window.innerHeight,
    color: ['#7FB069', '#D4A574', '#6BA3BE', '#F4A261', '#E76F51'][Math.floor(Math.random() * 5)],
    size: Math.random() * 10 + 5,
    speed: Math.random() * 3 + 2,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 10,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confetti.map((item) => (
        <div
          key={item.id}
          style={{
            position: 'absolute',
            left: `${item.x}px`,
            top: `${item.y}px`,
            width: `${item.size}px`,
            height: `${item.size}px`,
            backgroundColor: item.color,
            transform: `rotate(${item.rotation}deg)`,
            opacity: '0.9',
          }}
          className="rounded-full transition-all duration-100 ease-linear"
        />
      ))}
    </div>
  );
}
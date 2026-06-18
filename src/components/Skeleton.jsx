export default function Skeleton({ className = '', width, height = 16, rounded = 'rounded-lg' }) {
  return (
    <div
      className={`skeleton ${rounded} ${className}`}
      style={{ width: width || '100%', height }}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="glass-card p-4 space-y-3">
      <div className="flex items-center gap-3">
        <Skeleton width={48} height={48} rounded="rounded-2xl" />
        <div className="flex-1 space-y-2">
          <Skeleton width="60%" height={14} />
          <Skeleton width="40%" height={12} />
        </div>
      </div>
      <Skeleton height={8} rounded="rounded-full" />
      <div className="flex gap-2 justify-center">
        {[1,2,3,4,5].map(i => <Skeleton key={i} width={36} height={36} rounded="rounded-full" />)}
      </div>
    </div>
  );
}

export function ListSkeleton({ count = 3 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="glass-card p-4 flex items-center gap-3">
          <Skeleton width={40} height={40} rounded="rounded-xl" />
          <div className="flex-1 space-y-1.5">
            <Skeleton width="70%" height={14} />
            <Skeleton width="50%" height={12} />
          </div>
          <Skeleton width={48} height={20} rounded="rounded-full" />
        </div>
      ))}
    </div>
  );
}

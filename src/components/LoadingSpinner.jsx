export default function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center bg-bg-base px-4 text-center">
      <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin mb-4" />
      {message && <p className="text-text-muted text-base font-semibold">{message}</p>}
    </div>
  );
}

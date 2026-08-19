import { useState, useEffect } from 'react';
import { IconRefresh, IconX } from './Icons';

// Shows a "reload for update" toast when a new service worker has taken over.
// The SW (sw.js) calls skipWaiting() on install + posts SW_UPDATED; we listen
// for the native 'controllerchange' event. We only prompt when a controller
// already existed at mount — i.e. this is an *update*, not the first install.
export default function UpdateToast() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return;
    const hadControllerAtStart = Boolean(navigator.serviceWorker.controller);
    if (!hadControllerAtStart) return; // first install — nothing to update
    const onChange = () => setShow(true);
    navigator.serviceWorker.addEventListener('controllerchange', onChange);
    return () => navigator.serviceWorker.removeEventListener('controllerchange', onChange);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed left-1/2 -translate-x-1/2 bottom-20 lg:bottom-6 z-[70] w-[calc(100%-2rem)] max-w-sm animate-in slide-in-from-bottom-4">
      <div className="db-card flex items-center gap-3 border-l-4 border-l-primary p-3 pr-2 shadow-xl">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <IconRefresh className="h-4 w-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-text-dark">Update ready</p>
          <p className="text-[12px] text-text-muted leading-snug">A new version of DeutschBuddy is available.</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="db-btn db-btn-primary px-4 py-2 text-xs flex-shrink-0"
        >
          Reload
        </button>
        <button
          onClick={() => setShow(false)}
          aria-label="Dismiss"
          className="w-8 h-8 flex items-center justify-center text-text-muted hover:text-text-dark flex-shrink-0"
        >
          <IconX className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

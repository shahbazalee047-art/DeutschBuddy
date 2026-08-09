import { useEffect, useRef, useState } from 'react';
import { showBanner, hideBanner } from '../services/ads';

// Banner ad slot. Intended for the dashboard home only (see placement rules).
// Renders an empty, zero-height container until the platform SDK confirms an
// ad is live, so an unconfigured/disabled ad setup never shifts the layout.
export default function BannerAd() {
  const containerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let mounted = true;
    showBanner(containerRef.current).then(ok => {
      if (mounted) setVisible(ok);
    });
    return () => {
      mounted = false;
      hideBanner();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="w-full"
      style={visible ? { minHeight: 50 } : { display: 'none' }}
    />
  );
}

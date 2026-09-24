import { useEffect, useState } from 'react';

import BrandLockup from './BrandLockup.jsx';
import { BRAND } from '../../data/site.js';

/**
 * Suspense fallback shown while a page chunk loads.
 * Delays its appearance by 100ms so fast loads do not flash.
 */
export default function RouteLoader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 100);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) {
    return <main className="route-skeleton route-skeleton--pending" aria-hidden="true" />;
  }

  return (
    <main className="route-skeleton" aria-label="Loading page">
      <div className="route-loading-mark">
        <BrandLockup />
        <div className="route-loading-progress" aria-hidden="true">
          <span />
        </div>
        <p>{BRAND.motto}</p>
      </div>
    </main>
  );
}

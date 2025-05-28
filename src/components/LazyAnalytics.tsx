import { lazy, Suspense } from 'react';

// Lazy load analytics components to reduce main thread work
const AnalyticsProvider = lazy(() => import('./analytics/AnalyticsProvider'));

/**
 * Lazy Analytics Loader
 * Loads analytics components after main content is rendered
 * to reduce initial JavaScript evaluation time
 */
const LazyAnalytics = () => {
  return (
    <Suspense fallback={null}>
      {/* Load analytics with delay to not block main thread */}
      <AnalyticsProvider />
    </Suspense>
  );
};

export default LazyAnalytics;

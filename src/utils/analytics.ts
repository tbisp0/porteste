import { Metric } from 'web-vitals';

// Types for analytics events
type AnalyticsEvent = {
  category: string;
  action: string;
  label?: string;
  value?: number;
};

// Initialize Microsoft Clarity
export const initClarity = () => {
  if (typeof window === 'undefined' || import.meta.env.DEV) {
    console.log('[Analytics] Clarity disabled in development');
    return;
  }

  try {
    // Dynamically import Clarity
    import('@microsoft/clarity').then(clarity => {
      // @ts-ignore - Clarity types might not be available
      clarity.default.init('YOUR_CLARITY_PROJECT_ID');
    }).catch(error => {
      console.error('Failed to load Clarity:', error);
    });
  } catch (error) {
    console.error('Failed to initialize Clarity:', error);
  }
};

// Track page views
export const trackPageView = async (path: string): Promise<void> => {
  if (typeof window === 'undefined') return;

  try {
    // Clarity page view
    if (typeof window !== 'undefined') {
      (window as any).clarity?.('track', 'pageview', { path });
    }
  } catch (error) {
    console.error('[Analytics] Failed to track page view:', error);
  }
};

// Track custom events
export const trackEvent = async (category: AnalyticsEvent['category'],
                               action: AnalyticsEvent['action'],
                               label?: AnalyticsEvent['label'],
                               value?: AnalyticsEvent['value']): Promise<void> => {
  if (typeof window === 'undefined') return;

  const event: AnalyticsEvent = { category, action, label, value };

  try {
    // Clarity event
    if (typeof window !== 'undefined') {
      (window as any).clarity?.('track', action, { category, label, value });
    }
  } catch (error) {
    console.error('[Analytics] Failed to track event:', error);
  }
};

// Web Vitals reporting
export const reportWebVitals = (metric: Metric): void => {
  if (typeof window === 'undefined') return;

  try {
    // Clarity web vital
    if (typeof window !== 'undefined') {
      (window as any).clarity?.('track', 'web-vital', metric);
    }
  } catch (error) {
    console.error('[Analytics] Failed to report web vital:', error);
  }

  // In development, log the web vitals instead of sending to analytics
  if (import.meta.env.DEV) {
    console.log(`[Web Vitals] ${metric.name}:`, {
      value: metric.value,
      id: metric.id,
      delta: metric.delta,
      navigationType: metric.navigationType,
    });
    return;
  }
  
  // Send to Google Analytics (if available)
  if (typeof window !== 'undefined' && 'gtag' in window) {
    try {
      const gtag = (window as any).gtag;
      gtag('event', metric.name, {
        event_category: 'Web Vitals',
        event_label: metric.id,
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        non_interaction: true,
      });
    } catch (error) {
      console.error('Error sending Web Vitals to Google Analytics:', error);
    }
  }

  // Send to backend API
  const body = {
    name: metric.name,
    value: metric.value,
    id: metric.id,
    delta: metric.delta,
    navigationType: metric.navigationType,
  };
  
  fetch('/api/analytics/vitals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    // Keep the request from blocking page unload
    keepalive: true,
  })
  .catch(error => {
    console.error('Failed to report web vitals:', error);
  });
}

// Initialize all analytics tools
export const initAnalytics = (): void => {
  if (typeof window === 'undefined') return;

  try {
    // Initialize Clarity
    initClarity();

    // Track initial page view
    trackPageView(window.location.pathname);

    // Track route changes
    if (typeof window !== 'undefined' && typeof window.history !== 'undefined') {
      const handleRouteChange = (path: string) => {
        trackPageView(path);
      };

      // Listen for route changes
      (window.history as any).pushState = new Proxy(window.history.pushState, {
        apply: (target: any, thisArg: any, args: any[]) => {
          const result = Reflect.apply(target, thisArg, args);
          handleRouteChange(args[2] || window.location.pathname);
          return result;
        }
      });

      (window.history as any).replaceState = new Proxy(window.history.replaceState, {
        apply: (target: any, thisArg: any, args: any[]) => {
          const result = Reflect.apply(target, thisArg, args);
          handleRouteChange(args[2] || window.location.pathname);
          return result;
        }
      });
    }
  } catch (error) {
    console.error('[Analytics] Failed to initialize analytics:', error);
  }
};
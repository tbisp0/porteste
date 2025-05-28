/**
 * Lazy loading optimization for components
 * Reduces initial bundle size by loading components on demand
 */

import { lazy } from 'react';

// Lazy load heavy components that are not immediately visible
export const LazyProjectShowcase = lazy(() =>
  import('../components/ProjectShowcase').then(module => ({
    default: module.default
  }))
);

export const LazyBacklogCycle = lazy(() =>
  import('../components/BacklogCycle').then(module => ({
    default: module.default
  }))
);

export const LazyContact = lazy(() =>
  import('../components/Contact').then(module => ({
    default: module.default
  }))
);

export const LazyFeedbackModal = lazy(() =>
  import('../components/ui/modals').then(module => ({
    default: module.FeedbackModal
  }))
);

export const LazyPrivacyPolicy = lazy(() =>
  import('../pages/PrivacyPolicy').then(module => ({
    default: module.default
  }))
);

// Lazy load analytics components
export const LazyAnalyticsProvider = lazy(() =>
  import('../components/analytics/AnalyticsProvider').then(module => ({
    default: module.default
  }))
);

// Lazy load heavy UI components
export const LazyFluidGradientBackground = lazy(() =>
  import('../components/FluidGradientBackground').then(module => ({
    default: module.default
  }))
);

// Preload components that will likely be needed soon
export const preloadComponents = () => {
  // Preload components after initial page load
  setTimeout(() => {
    import('../components/ProjectShowcase');
    import('../components/BacklogCycle');
  }, 2000);

  // Preload contact form after user interaction
  const preloadContact = () => {
    import('../components/Contact');
    import('../components/FeedbackModal');
  };

  // Preload on scroll or user interaction
  let hasPreloaded = false;
  const handleInteraction = () => {
    if (!hasPreloaded) {
      preloadContact();
      hasPreloaded = true;
      // Remove listeners after preloading
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    }
  };

  window.addEventListener('scroll', handleInteraction, { passive: true });
  window.addEventListener('mousemove', handleInteraction, { passive: true });
  window.addEventListener('touchstart', handleInteraction, { passive: true });
};

// Component wrapper with error boundary for lazy components
export const withLazyLoading = (Component: React.ComponentType) => {
  return (props: any) => {
    try {
      return <Component {...props} />;
    } catch (error) {
      console.error('Error loading lazy component:', error);
      return <div>Error loading component</div>;
    }
  };
};

// Optimize imports for specific libraries
export const optimizedImports = {
  // Only import specific Framer Motion components
  motion: () => import('framer-motion').then(mod => ({
    motion: mod.motion,
    AnimatePresence: mod.AnimatePresence,
    useAnimation: mod.useAnimation,
    useInView: mod.useInView
  })),

  // Only import specific Lucide icons
  icons: () => import('lucide-react').then(mod => ({
    Menu: mod.Menu,
    X: mod.X,
    Sun: mod.Sun,
    Moon: mod.Moon,
    Globe: mod.Globe,
    Eye: mod.Eye,
    ChevronDown: mod.ChevronDown,
    ChevronUp: mod.ChevronUp,
    ExternalLink: mod.ExternalLink,
    Mail: mod.Mail,
    Phone: mod.Phone,
    MapPin: mod.MapPin,
    Linkedin: mod.Linkedin,
    Send: mod.Send,
    Check: mod.Check,
    AlertCircle: mod.AlertCircle,
    ArrowUp: mod.ArrowUp
  })),

  // Only import specific React Hook Form components
  forms: () => import('react-hook-form').then(mod => ({
    useForm: mod.useForm,
    Controller: mod.Controller
  }))
};

// Bundle analyzer helper for development
export const analyzeBundles = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Bundle analysis available in production build');
  }
};

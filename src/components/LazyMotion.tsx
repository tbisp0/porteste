import React, { Suspense } from 'react';

/**
 * LazyMotion Component
 * Lazy loads Framer Motion features to reduce initial bundle size
 * Only loads motion features when animations are actually needed
 */

interface LazyMotionProps {
  children: React.ReactNode;
  features?: 'domAnimation' | 'domMax' | 'layout';
}

// Lazy load Framer Motion features
const domAnimationFeatures = () => import('framer-motion/dom').then(res => res.domAnimation);
const domMaxFeatures = () => import('framer-motion/dom').then(res => res.domMax);
const layoutFeatures = () => import('framer-motion').then(res => res.LazyMotion);

const LazyMotion: React.FC<LazyMotionProps> = ({ 
  children, 
  features = 'domAnimation' 
}) => {
  // For critical animations, render immediately without motion
  // For non-critical animations, use lazy loading
  
  return (
    <Suspense fallback={children}>
      <LazyMotionWrapper features={features}>
        {children}
      </LazyMotionWrapper>
    </Suspense>
  );
};

// Internal wrapper component
const LazyMotionWrapper: React.FC<LazyMotionProps> = ({ children, features }) => {
  const [MotionComponent, setMotionComponent] = React.useState<React.ComponentType<any> | null>(null);

  React.useEffect(() => {
    let isMounted = true;

    const loadMotion = async () => {
      try {
        let motionFeatures;
        
        switch (features) {
          case 'domMax':
            motionFeatures = await domMaxFeatures();
            break;
          case 'layout':
            const { LazyMotion: LazyMotionComponent } = await import('framer-motion');
            if (isMounted) {
              setMotionComponent(() => LazyMotionComponent);
            }
            return;
          default:
            motionFeatures = await domAnimationFeatures();
        }

        if (isMounted) {
          const { LazyMotion: LazyMotionComponent } = await import('framer-motion');
          setMotionComponent(() => (props: any) => (
            <LazyMotionComponent features={motionFeatures} {...props} />
          ));
        }
      } catch (error) {
        console.warn('Failed to load Framer Motion features:', error);
        // Fallback: render children without motion
        if (isMounted) {
          setMotionComponent(() => ({ children }: any) => children);
        }
      }
    };

    // Delay loading to prioritize critical resources
    const timer = setTimeout(loadMotion, 100);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [features]);

  if (!MotionComponent) {
    // Render without motion while loading
    return <>{children}</>;
  }

  return <MotionComponent>{children}</MotionComponent>;
};

/**
 * Lightweight motion component for critical animations
 * Uses CSS transitions instead of Framer Motion for better performance
 */
export const CriticalMotion: React.FC<{
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  animate?: boolean;
}> = ({ children, className = '', style = {}, animate = true }) => {
  const motionStyle: React.CSSProperties = {
    ...style,
    transition: animate ? 'all 0.3s ease' : 'none',
  };

  return (
    <div className={className} style={motionStyle}>
      {children}
    </div>
  );
};

/**
 * Hook to conditionally use motion based on user preferences
 */
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};

/**
 * Optimized motion component that respects user preferences
 */
export const OptimizedMotion: React.FC<{
  children: React.ReactNode;
  fallback?: React.ReactNode;
  critical?: boolean;
}> = ({ children, fallback, critical = false }) => {
  const prefersReducedMotion = useReducedMotion();

  // If user prefers reduced motion, render fallback or children without motion
  if (prefersReducedMotion) {
    return <>{fallback || children}</>;
  }

  // For critical animations, use lightweight CSS transitions
  if (critical) {
    return <CriticalMotion>{children}</CriticalMotion>;
  }

  // For non-critical animations, use lazy-loaded Framer Motion
  return (
    <LazyMotion features="domAnimation">
      {children}
    </LazyMotion>
  );
};

export default LazyMotion;

import React, { memo, useRef, useEffect, useState } from 'react';
import { useIntersectionObserver } from '@/utils/performanceOptimizations';

interface OptimizedSectionProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  fallback?: React.ReactNode;
  id?: string;
}

/**
 * OptimizedSection - Componente que só renderiza quando está visível
 * Reduz o DOM inicial e melhora performance
 */
const OptimizedSection = memo<OptimizedSectionProps>(({
  children,
  className = '',
  threshold = 0.1,
  rootMargin = '100px',
  fallback = null,
  id
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  const targetRef = useIntersectionObserver(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !hasBeenVisible) {
        setIsVisible(true);
        setHasBeenVisible(true);
      }
    },
    { threshold, rootMargin }
  );

  // Para seções críticas (above the fold), renderizar imediatamente
  const isCritical = id === 'hero' || id === 'profile';

  if (isCritical || isVisible || hasBeenVisible) {
    return (
      <section ref={targetRef} className={className} id={id}>
        {children}
      </section>
    );
  }

  return (
    <section ref={targetRef} className={className} id={id}>
      {fallback || (
        <div 
          className="min-h-[200px] flex items-center justify-center"
          style={{ minHeight: '200px' }}
        >
          <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg w-full h-32" />
        </div>
      )}
    </section>
  );
});

OptimizedSection.displayName = 'OptimizedSection';

export default OptimizedSection;

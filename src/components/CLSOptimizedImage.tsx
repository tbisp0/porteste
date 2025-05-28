import React, { useState, useRef, useEffect } from 'react';

interface CLSOptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  webpSrc?: string;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * CLS Optimized Image Component
 * Prevents Cumulative Layout Shift by enforcing explicit dimensions
 * and providing proper loading states
 */
const CLSOptimizedImage: React.FC<CLSOptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  priority = false,
  webpSrc,
  placeholder,
  onLoad,
  onError
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isInView, setIsInView] = useState(priority || loading === 'eager');
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (loading === 'lazy' && !priority && containerRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        },
        {
          rootMargin: '50px 0px', // Start loading 50px before entering viewport
          threshold: 0.01
        }
      );

      observer.observe(containerRef.current);

      return () => observer.disconnect();
    }
  }, [loading, priority]);

  const handleImageLoad = () => {
    setImageLoaded(true);
    onLoad?.();
  };

  const handleImageError = () => {
    setImageError(true);
    onError?.();
  };

  // Calculate aspect ratio for responsive behavior
  const aspectRatio = (height / width) * 100;

  // Container styles to prevent layout shift
  const containerStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: `${width}px`,
    position: 'relative',
    overflow: 'hidden',
    // Maintain aspect ratio
    paddingBottom: `${aspectRatio}%`,
    height: 0
  };

  // Image styles
  const imageStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'opacity 0.3s ease',
    opacity: imageLoaded ? 1 : 0
  };

  // Placeholder styles
  const placeholderStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#f3f4f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: imageLoaded ? 0 : 1,
    transition: 'opacity 0.3s ease'
  };

  return (
    <div
      ref={containerRef}
      className={`cls-optimized-image ${className}`}
      style={containerStyle}
    >
      {/* Placeholder */}
      <div style={placeholderStyle}>
        {placeholder ? (
          <img
            src={placeholder}
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'blur(5px)',
              transform: 'scale(1.1)'
            }}
          />
        ) : (
          <div
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#e5e7eb',
              borderRadius: '4px',
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
            }}
          />
        )}
      </div>

      {/* Main Image */}
      {isInView && (
        <picture>
          {webpSrc && (
            <source srcSet={webpSrc} type="image/webp" />
          )}
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? 'eager' : loading}
            decoding={priority ? 'sync' : 'async'}
            {...(priority && { fetchpriority: 'high' as any })}
            style={imageStyle}
            onLoad={handleImageLoad}
            onError={handleImageError}
            // Prevent layout shift with explicit dimensions
            sizes={`(max-width: ${width}px) 100vw, ${width}px`}
          />
        </picture>
      )}

      {/* Error state */}
      {imageError && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#fef2f2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#dc2626',
            fontSize: '14px',
            textAlign: 'center',
            padding: '8px'
          }}
        >
          Failed to load image
        </div>
      )}
    </div>
  );
};

// CSS for animations (injected via JavaScript)
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }

    .cls-optimized-image {
      contain: layout style paint;
      content-visibility: visible;
    }

    .cls-optimized-image img {
      contain: layout style paint;
      will-change: opacity;
    }
  `;

  if (!document.head.querySelector('[data-cls-optimized-styles]')) {
    style.setAttribute('data-cls-optimized-styles', 'true');
    document.head.appendChild(style);
  }
}

export default CLSOptimizedImage;

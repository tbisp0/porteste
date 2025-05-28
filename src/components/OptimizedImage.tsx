import React, { useState } from 'react';
import { SecureValidation } from '@/utils/secureValidation';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  width?: number;
  height?: number;
  priority?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  loading = 'lazy',
  width,
  height,
  priority = false
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Validação segura de URL usando utilitário seguro
  const isValidUnsplashUrl = (url: string): boolean => {
    return SecureValidation.validateUrl(url);
  };

  // Gerar URLs WebP e fallback com validação de segurança
  const getOptimizedSrc = (originalSrc: string) => {
    // Validação de segurança antes de processar
    if (!isValidUnsplashUrl(originalSrc)) {
      return originalSrc;
    }

    try {
      const url = new URL(originalSrc);
      url.searchParams.set('fm', 'webp');
      url.searchParams.set('q', '80');
      if (width) url.searchParams.set('w', width.toString());
      if (height) url.searchParams.set('h', height.toString());
      return url.toString();
    } catch {
      return originalSrc;
    }
  };

  const getFallbackSrc = (originalSrc: string) => {
    // Validação de segurança antes de processar
    if (!isValidUnsplashUrl(originalSrc)) {
      return originalSrc;
    }

    try {
      const url = new URL(originalSrc);
      url.searchParams.set('fm', 'jpg');
      url.searchParams.set('q', '80');
      if (width) url.searchParams.set('w', width.toString());
      if (height) url.searchParams.set('h', height.toString());
      return url.toString();
    } catch {
      return originalSrc;
    }
  };

  const webpSrc = getOptimizedSrc(src);
  const fallbackSrc = getFallbackSrc(src);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Loading placeholder */}
      {!imageLoaded && !imageError && (
        <div
          className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"
          style={{ width, height }}
        />
      )}

      <picture>
        {/* WebP source */}
        <source srcSet={webpSrc} type="image/webp" />

        {/* Fallback */}
        <img
          src={fallbackSrc}
          alt={alt}
          loading={priority ? 'eager' : loading}
          width={width}
          height={height}
          className={`${className} ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          decoding="async"
        />
      </picture>
    </div>
  );
};

export default OptimizedImage;

import { useOptimizedImage } from '../../hooks/useOptimizedImage';
import React from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  onClick?: () => void;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  onClick,
  objectFit = 'cover'
}) => {
  const { imgSrc, isLoaded, isError } = useOptimizedImage({
    src,
    priority,
    onError: (error) => console.error(`Failed to load image: ${src}`, error),
    onLoad: () => {
      // Adicionar animação de fade-in quando carregado
    }
  });

  // Placeholder while loading
  if (!isLoaded) {
    return (
      <div
        className={`bg-muted animate-pulse rounded ${className}`}
        style={{ width: width || '100%', height: height || '100%' }}
        aria-hidden="true"
        role="img"
        aria-label="Loading image"
      />
    );
  }

  // Error state
  if (isError) {
    return (
      <div
        className={`bg-muted flex items-center justify-center text-muted-foreground ${className}`}
        style={{ width: width || '100%', height: height || '100%' }}
        aria-label={`Error loading image: ${alt}`}
        role="img"
      >
        <span>Imagem não disponível</span>
      </div>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={`rounded ${className}`}
      style={{
        objectFit,
        width: width || '100%',
        height: height || '100%'
      }}
      onClick={onClick}
      loading="lazy"
      decoding="async"
      draggable={false}
      role="img"
      aria-label={alt}
    />
  );
};

export default OptimizedImage;
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      style={{ objectFit }}
      onClick={onClick}
    />
  return (
  );
};

export default OptimizedImage;
    return src;
  };

  // Registrar como LCP se for prioritário
  useEffect(() => {


    if (priority && imgRef.current) {
      registerLCP(imgRef.current);
    }

  }, [priority, registerLCP]);
  








































  // Manipuladores de eventos
  const handleLoad = () => {
    setLoaded(true);
    onLoad?.();
  };

export default OptimizedImage;
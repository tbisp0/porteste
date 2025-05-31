import React from 'react';

interface LoadingFallbackProps {
  height?: string;
  width?: string;
  message?: string;
  showSpinner?: boolean;
  className?: string;
}

const LoadingFallback: React.FC<LoadingFallbackProps> = ({
  height = '200px',
  width = '100%',
  message = 'Carregando...',
  showSpinner = true,
  className = ''
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center ${className}`}
      style={{ height, width }}
      aria-live="polite"
      aria-busy="true"
    >
      {showSpinner && (
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary mb-4" />
      )}
      
      {message && (
        <p className="text-gray-600 dark:text-gray-300 text-center">
          {message}
        </p>
      )}
    </div>
  );
};

export default LoadingFallback;
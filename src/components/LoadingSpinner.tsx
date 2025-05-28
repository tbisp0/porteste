import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative">
        <div className="w-8 h-8 border-4 border-[var(--color-border)] border-t-[var(--color-primary)] rounded-full animate-spin"></div>
        <span className="sr-only">Carregando...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;

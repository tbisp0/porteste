import React from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import { SkeletonTheme } from 'react-loading-skeleton';

interface SkeletonProviderProps {
  children: React.ReactNode;
}

export const SkeletonProvider: React.FC<SkeletonProviderProps> = ({ children }) => {
  return (
    <SkeletonTheme 
      baseColor="var(--color-surface)" 
      highlightColor="var(--color-border)"
      borderRadius="8px"
      duration={1.5}
    >
      {children}
    </SkeletonTheme>
  );
};

export default SkeletonProvider;

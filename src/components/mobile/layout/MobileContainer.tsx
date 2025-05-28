/**
 * 🎯 MOBILE CONTAINER
 * 
 * Container responsivo para mobile
 */

import React from 'react';
import { motion } from 'framer-motion';

interface MobileContainerProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  maxWidth?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

export const MobileContainer: React.FC<MobileContainerProps> = ({
  children,
  className = '',
  padding = 'md',
  maxWidth = 'none'
}) => {
  const paddingClasses = {
    none: '',
    sm: 'px-4',
    md: 'px-6',
    lg: 'px-8'
  };

  const maxWidthClasses = {
    none: '',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl'
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`
        mobile-container
        w-full mx-auto
        ${paddingClasses[padding]}
        ${maxWidthClasses[maxWidth]}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

export default MobileContainer;

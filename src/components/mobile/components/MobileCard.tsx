/**
 * 🎯 MOBILE CARD
 * 
 * Card component otimizado para mobile
 */

import React from 'react';
import { motion } from 'framer-motion';
import { MobileCardProps } from '../types';

export const MobileCard: React.FC<MobileCardProps> = ({
  children,
  variant = 'default',
  size = 'md',
  interactive = false,
  className = ''
}) => {
  const variantClasses = {
    default: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
    elevated: 'bg-white dark:bg-gray-800 shadow-lg',
    outlined: 'bg-transparent border-2 border-gray-300 dark:border-gray-600',
    filled: 'bg-gray-50 dark:bg-gray-700'
  };

  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };

  const Component = interactive ? motion.div : 'div';
  const motionProps = interactive ? {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.2 }
  } : {};

  return (
    <Component
      className={`
        mobile-card
        rounded-lg
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${interactive ? 'cursor-pointer' : ''}
        ${className}
      `}
      {...motionProps}
    >
      {children}
    </Component>
  );
};

export default MobileCard;

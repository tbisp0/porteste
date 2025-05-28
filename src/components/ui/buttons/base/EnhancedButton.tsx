import React, { useState } from 'react';
import { motion } from 'framer-motion';

export interface EnhancedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  morphing?: boolean;
  expanding?: boolean;
  ariaLabel?: string;
}

export const EnhancedButton: React.FC<EnhancedButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  morphing = true,
  expanding = true,
  ariaLabel,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseClasses = `
    relative inline-flex items-center justify-center
    font-medium rounded-lg transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${morphing ? 'button-morphing' : ''}
    ${expanding ? 'button-expand' : ''}
  `;

  const variantClasses = {
    primary: `
      bg-blue-500 text-white border border-blue-500
      hover:bg-blue-600 hover:border-blue-600
      focus:ring-blue-500
      dark:bg-blue-600 dark:border-blue-600
      dark:hover:bg-blue-700 dark:hover:border-blue-700
    `,
    secondary: `
      bg-gray-100 text-gray-900 border border-gray-300
      hover:bg-gray-200 hover:border-gray-400
      focus:ring-gray-500
      dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600
      dark:hover:bg-gray-700 dark:hover:border-gray-500
    `,
    ghost: `
      bg-transparent text-gray-700 border border-transparent
      hover:bg-gray-100 hover:text-gray-900
      focus:ring-gray-500
      dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100
    `,
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const buttonClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  // Animation variants
  const morphingVariants = {
    initial: { scale: 1 },
    hover: expanding ? { scale: 1.05 } : { scale: 1 },
    tap: { scale: 0.95 },
  };

  const contentVariants = {
    initial: { y: 0 },
    hover: { y: -1 },
  };

  return (
    <motion.button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      variants={morphingVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      aria-label={ariaLabel}
    >
      {/* Morphing background effect */}
      {morphing && (
        <motion.div
          className="absolute inset-0 rounded-lg"
          style={{
            background: variant === 'primary' 
              ? 'linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))'
              : 'rgba(0, 0, 0, 0.05)',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: isHovered ? 1 : 0,
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      )}

      {/* Button content */}
      <motion.span
        className="relative z-10 flex items-center gap-2"
        variants={contentVariants}
      >
        {children}
      </motion.span>

      {/* Ripple effect on click */}
      <motion.div
        className="absolute inset-0 rounded-lg pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%)',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 0, opacity: 0 }}
        whileTap={{ 
          scale: 2, 
          opacity: [0, 1, 0],
          transition: { duration: 0.4, ease: 'easeOut' }
        }}
      />
    </motion.button>
  );
};

// Enhanced version of the existing project card button
export const ProjectCardButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}> = ({ children, onClick, className = '' }) => {
  return (
    <EnhancedButton
      onClick={onClick}
      variant="primary"
      size="md"
      className={`project-card-button ${className}`}
      morphing={true}
      expanding={true}
      ariaLabel="Ver mais detalhes do projeto"
    >
      {children}
    </EnhancedButton>
  );
};

export default EnhancedButton;

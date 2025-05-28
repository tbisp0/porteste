import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useNavigationSounds } from '@/hooks/useSound';

interface IconButtonProps {
  icon: LucideIcon;
  onClick?: () => void;
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  ariaLabel: string; // Required for accessibility
  enableSound?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  onClick,
  variant = 'default',
  size = 'md',
  disabled = false,
  className = '',
  ariaLabel,
  enableSound = true
}) => {
  const { playButtonHover, playButtonClick } = useNavigationSounds();

  const handleClick = () => {
    if (enableSound) {
      playButtonClick();
    }
    onClick?.();
  };

  const handleHover = () => {
    if (enableSound) {
      playButtonHover();
    }
  };

  // Variant styles
  const variantClasses = {
    default: `
      bg-[var(--color-surface)] text-[var(--color-text)]
      border border-[var(--color-border)]
      hover:bg-[var(--color-accent)] hover:border-[var(--color-primary)]/50
    `,
    ghost: `
      bg-transparent text-[var(--color-text)]
      border border-transparent
      hover:bg-[var(--color-accent)]
    `,
    outline: `
      bg-transparent text-[var(--color-primary)]
      border border-[var(--color-primary)]
      hover:bg-[var(--color-primary)] hover:text-white
    `
  };

  // Size styles
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  // Icon sizes
  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const baseClasses = `
    inline-flex items-center justify-center
    rounded-lg
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)]
    disabled:opacity-50 disabled:cursor-not-allowed
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <motion.button
      onClick={disabled ? undefined : handleClick}
      onMouseEnter={handleHover}
      className={baseClasses}
      disabled={disabled}
      aria-label={ariaLabel}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
    >
      <Icon className={iconSizes[size]} aria-hidden="true" />
    </motion.button>
  );
};

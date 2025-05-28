import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useNavigationSounds } from '@/hooks/useSound';

interface ActionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
  enableSound?: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  onClick,
  variant = 'default',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
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
    sm: 'px-3 py-1.5 text-sm h-8',
    md: 'px-4 py-2 text-base h-10',
    lg: 'px-6 py-3 text-lg h-12'
  };

  const baseClasses = `
    inline-flex items-center justify-center gap-2
    font-medium rounded-lg
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
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      {/* Left Icon */}
      {Icon && iconPosition === 'left' && (
        <Icon className="w-4 h-4" aria-hidden="true" />
      )}

      {/* Button Text */}
      <span>{children}</span>

      {/* Right Icon */}
      {Icon && iconPosition === 'right' && (
        <Icon className="w-4 h-4" aria-hidden="true" />
      )}
    </motion.button>
  );
};

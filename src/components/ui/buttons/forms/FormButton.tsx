import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useNavigationSounds } from '@/hooks/useSound';

interface FormButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  ariaLabel?: string;
  enableSound?: boolean;
}

export const FormButton: React.FC<FormButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
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
    primary: 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/90',
    secondary: 'bg-[var(--color-secondary)] text-[var(--color-text)] hover:bg-[var(--color-secondary)]/90',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    success: 'bg-green-600 text-white hover:bg-green-700'
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
    border border-transparent
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)]
    disabled:opacity-50 disabled:cursor-not-allowed
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <motion.button
      type={type}
      onClick={disabled ? undefined : handleClick}
      onMouseEnter={handleHover}
      className={baseClasses}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      {/* Loading Spinner */}
      {loading && (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}

      {/* Left Icon */}
      {Icon && iconPosition === 'left' && !loading && (
        <Icon className="w-4 h-4" aria-hidden="true" />
      )}

      {/* Button Text */}
      <span>{children}</span>

      {/* Right Icon */}
      {Icon && iconPosition === 'right' && !loading && (
        <Icon className="w-4 h-4" aria-hidden="true" />
      )}
    </motion.button>
  );
};

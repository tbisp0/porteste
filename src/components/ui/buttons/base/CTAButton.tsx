import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useNavigationSounds } from '@/hooks/useSound';

export interface CTAButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'hero';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  ariaLabel?: string;
  target?: '_blank' | '_self';
  rel?: string;
  enableSound?: boolean;
}

const CTAButton: React.FC<CTAButtonProps> = ({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'right',
  disabled = false,
  loading = false,
  className = '',
  ariaLabel,
  target,
  rel,
  enableSound = true
}) => {
  const { playButtonHover, playButtonClick } = useNavigationSounds();
  
  // Classes CSS centralizadas
  const baseClasses = `cta-button variant-${variant} size-${size} ${className}`.trim();

  // Handle click with sound
  const handleClick = () => {
    if (enableSound) {
      playButtonClick();
    }
    onClick?.();
  };

  // Handle hover with sound
  const handleHover = () => {
    if (enableSound) {
      playButtonHover();
    }
  };

  // Variantes de animação
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, y: -2 },
    tap: { scale: 0.98, y: 0 },
  };

  // Conteúdo do botão
  const buttonContent = (
    <motion.div
      className="flex items-center justify-center gap-2 relative z-10"
      variants={{
        initial: { y: 0 },
        hover: { y: -1 },
      }}
    >
      {Icon && iconPosition === 'left' && (
        <Icon className="w-5 h-5" aria-hidden="true" />
      )}

      <span>
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span>Carregando...</span>
          </div>
        ) : (
          children
        )}
      </span>

      {Icon && iconPosition === 'right' && !loading && (
        <Icon className="w-5 h-5" aria-hidden="true" />
      )}
    </motion.div>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        className={baseClasses}
        aria-label={ariaLabel}
        onClick={handleClick}
        onMouseEnter={handleHover}
        style={{
          textDecoration: 'none',
          pointerEvents: disabled ? 'none' : 'auto',
          opacity: disabled ? 0.5 : 1
        }}
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
      >
        {buttonContent}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={disabled ? undefined : handleClick}
      onMouseEnter={handleHover}
      className={baseClasses}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
    >
      {buttonContent}
    </motion.button>
  );
};

export default CTAButton;

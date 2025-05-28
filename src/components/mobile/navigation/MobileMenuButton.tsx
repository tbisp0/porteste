/**
 * 🎯 BOTÃO DE MENU MOBILE UNIFICADO
 * 
 * Botão hamburger animado para abrir/fechar menu mobile
 * Versão unificada e otimizada
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigationSounds } from '@/hooks/useSound';

interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
  variant?: 'default' | 'minimal' | 'filled';
  size?: 'sm' | 'md' | 'lg';
}

export const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({
  isOpen,
  onClick,
  className = '',
  variant = 'default',
  size = 'md'
}) => {
  const { t } = useTranslation();
  const { playButtonHover, playButtonClick } = useNavigationSounds();

  const handleClick = () => {
    playButtonClick();
    onClick();
  };

  const handleHover = () => {
    playButtonHover();
  };

  // Tamanhos
  const sizeClasses = {
    sm: 'w-9 h-9',
    md: 'w-11 h-11',
    lg: 'w-12 h-12'
  };

  // Variantes
  const variantClasses = {
    default: `
      border border-[var(--color-border)]
      bg-[var(--color-surface)]
      shadow hover:shadow-lg
    `,
    minimal: `
      border-0
      bg-transparent
      hover:bg-[var(--color-surface-hover)]
    `,
    filled: `
      border-0
      bg-[var(--color-primary)]
      text-white
      shadow-lg hover:shadow-xl
    `
  };

  return (
    <motion.button
      onClick={handleClick}
      onMouseEnter={handleHover}
      className={`
        relative flex items-center justify-center
        ${sizeClasses[size]}
        rounded-lg
        ${variantClasses[variant]}
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
        hover:scale-105 active:scale-95
        touch-manipulation
        ${className}
      `}
      aria-label={isOpen ? t('common.close') : t('navigation.menu.open')}
      aria-expanded={isOpen}
      aria-controls="mobile-navigation-menu"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Hamburger/X Icon Animation */}
      <div className="relative w-5 h-5 flex flex-col justify-center items-center">
        {/* Top line */}
        <motion.span
          className={`
            absolute w-5 h-0.5 rounded-full
            ${variant === 'filled' ? 'bg-white' : 'bg-[var(--color-text)]'}
          `}
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 0 : -6,
          }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        />
        
        {/* Middle line */}
        <motion.span
          className={`
            absolute w-5 h-0.5 rounded-full
            ${variant === 'filled' ? 'bg-white' : 'bg-[var(--color-text)]'}
          `}
          animate={{
            opacity: isOpen ? 0 : 1,
            x: isOpen ? -10 : 0,
          }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        />
        
        {/* Bottom line */}
        <motion.span
          className={`
            absolute w-5 h-0.5 rounded-full
            ${variant === 'filled' ? 'bg-white' : 'bg-[var(--color-text)]'}
          `}
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? 0 : 6,
          }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        initial={false}
        animate={isOpen ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(circle, ${variant === 'filled' ? 'rgba(255,255,255,0.2)' : 'var(--color-primary)'} 0%, transparent 70%)`
        }}
      />
    </motion.button>
  );
};

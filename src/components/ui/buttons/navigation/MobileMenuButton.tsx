import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigationSounds } from '@/hooks/useSound';

interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({
  isOpen,
  onClick,
  className = ''
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

  return (
    <motion.button
      onClick={handleClick}
      onMouseEnter={handleHover}
      className={`
        relative flex items-center justify-center
        w-11 h-11 rounded-lg
        border border-[var(--color-border)]
        bg-[var(--color-surface)]
        shadow hover:shadow-lg
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
        hover:scale-105 active:scale-95
        ${className}
      `}
      aria-label={isOpen ? t('navigation.menu.close') : t('navigation.menu.open')}
      aria-expanded={isOpen}
      aria-controls="mobile-navigation-menu"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Hamburger/X Icon Animation */}
      <div className="relative w-5 h-5 flex flex-col justify-center items-center">
        {/* Top line */}
        <motion.span
          className="absolute w-5 h-0.5 bg-[var(--color-text)] rounded-full"
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 0 : -6,
          }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        />
        
        {/* Middle line */}
        <motion.span
          className="absolute w-5 h-0.5 bg-[var(--color-text)] rounded-full"
          animate={{
            opacity: isOpen ? 0 : 1,
            x: isOpen ? -10 : 0,
          }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        />
        
        {/* Bottom line */}
        <motion.span
          className="absolute w-5 h-0.5 bg-[var(--color-text)] rounded-full"
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? 0 : 6,
          }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        />
      </div>
    </motion.button>
  );
};

export default MobileMenuButton;

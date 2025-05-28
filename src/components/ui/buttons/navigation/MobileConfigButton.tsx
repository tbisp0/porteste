import React from 'react';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigationSounds } from '@/hooks/useSound';

interface MobileConfigButtonProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

const MobileConfigButton: React.FC<MobileConfigButtonProps> = ({
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
      aria-label={isOpen ? t('navigation.settings.close') : t('navigation.settings.open')}
      aria-expanded={isOpen}
      aria-controls="mobile-config-menu"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Settings Icon with Rotation Animation */}
      <motion.div
        animate={{
          rotate: isOpen ? 180 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <Settings 
          className="w-5 h-5 text-[var(--color-text)]" 
          aria-hidden="true"
        />
      </motion.div>
    </motion.button>
  );
};

export default MobileConfigButton;

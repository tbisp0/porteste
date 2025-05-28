import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigationSounds } from '@/hooks/useSound';
import { useTranslation } from 'react-i18next';

interface ContentButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  enableSound?: boolean;
}

export const ExpandButton: React.FC<ContentButtonProps> = ({
  onClick,
  disabled = false,
  className = '',
  enableSound = true
}) => {
  const { playButtonHover, playButtonClick } = useNavigationSounds();
  const { t } = useTranslation();

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

  return (
    <motion.button
      onClick={disabled ? undefined : handleClick}
      onMouseEnter={handleHover}
      className={`
        inline-flex items-center justify-center gap-2
        px-4 py-2 h-10
        bg-[var(--color-surface)] text-[var(--color-text)]
        border border-[var(--color-border)]
        rounded-lg font-medium
        transition-all duration-200
        hover:bg-[var(--color-accent)] hover:border-[var(--color-primary)]/50
        focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      disabled={disabled}
      aria-label={t('tooltips.actions.expand')}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      <span>{t('projects.seeMore')}</span>
      <ChevronDown className="w-4 h-4" />
    </motion.button>
  );
};

export const CollapseButton: React.FC<ContentButtonProps> = ({
  onClick,
  disabled = false,
  className = '',
  enableSound = true
}) => {
  const { playButtonHover, playButtonClick } = useNavigationSounds();
  const { t } = useTranslation();

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

  return (
    <motion.button
      onClick={disabled ? undefined : handleClick}
      onMouseEnter={handleHover}
      className={`
        inline-flex items-center justify-center gap-2
        px-4 py-2 h-10
        bg-[var(--color-surface)] text-[var(--color-text)]
        border border-[var(--color-border)]
        rounded-lg font-medium
        transition-all duration-200
        hover:bg-[var(--color-accent)] hover:border-[var(--color-primary)]/50
        focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      disabled={disabled}
      aria-label={t('tooltips.actions.collapse')}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      <span>{t('projects.seeLess')}</span>
      <ChevronUp className="w-4 h-4" />
    </motion.button>
  );
};

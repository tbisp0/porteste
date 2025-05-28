import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigationSounds } from '@/hooks/useSound';
import { useTranslation } from 'react-i18next';

interface PaginationButtonProps {
  onClick?: () => void;
  direction: 'previous' | 'next';
  disabled?: boolean;
  className?: string;
  enableSound?: boolean;
}

export const PaginationButton: React.FC<PaginationButtonProps> = ({
  onClick,
  direction,
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

  const isPrevious = direction === 'previous';
  const Icon = isPrevious ? ChevronLeft : ChevronRight;
  const label = isPrevious ? t('backlog.previous') : t('backlog.next');
  const ariaLabel = isPrevious ? 'Página anterior' : 'Próxima página';

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
      aria-label={ariaLabel}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      {isPrevious && <Icon className="w-4 h-4" />}
      <span>{label}</span>
      {!isPrevious && <Icon className="w-4 h-4" />}
    </motion.button>
  );
};

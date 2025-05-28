/**
 * 🎯 MOBILE ACCESSIBILITY BUTTON
 * 
 * Botão de acessibilidade para mobile
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Accessibility } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface MobileAccessibilityButtonProps {
  onClick: () => void;
  className?: string;
  isActive?: boolean;
}

export const MobileAccessibilityButton: React.FC<MobileAccessibilityButtonProps> = ({
  onClick,
  className = '',
  isActive = false
}) => {
  const { t } = useTranslation();

  return (
    <motion.button
      onClick={onClick}
      className={`
        flex items-center justify-center
        w-12 h-12 rounded-full
        bg-blue-600 text-white
        shadow-lg
        focus:outline-none focus:ring-2 focus:ring-blue-500
        ${isActive ? 'bg-blue-700' : ''}
        ${className}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={t('navigation.settings.accessibility.menu')}
    >
      <Accessibility className="w-6 h-6" />
    </motion.button>
  );
};

export default MobileAccessibilityButton;

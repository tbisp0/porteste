/**
 * 🎯 MOBILE CONFIG BUTTON
 * 
 * Botão de configurações para mobile
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface MobileConfigButtonProps {
  onClick: () => void;
  className?: string;
  isActive?: boolean;
}

export const MobileConfigButton: React.FC<MobileConfigButtonProps> = ({
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
        w-11 h-11 rounded-lg
        border border-gray-300 dark:border-gray-600
        bg-white dark:bg-gray-800
        shadow hover:shadow-lg
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-500
        ${isActive ? 'bg-blue-50 border-blue-300 text-blue-600' : ''}
        ${className}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={t('navigation.settings.toggle')}
    >
      <Settings className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-700'}`} />
    </motion.button>
  );
};

export default MobileConfigButton;

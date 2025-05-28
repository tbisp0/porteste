/**
 * 🎯 MOBILE SETTINGS
 * 
 * Componente de configurações mobile
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MobileConfigState } from '../types';

interface MobileSettingsProps {
  config: MobileConfigState;
  onConfigChange: (config: Partial<MobileConfigState>) => void;
  className?: string;
}

export const MobileSettings: React.FC<MobileSettingsProps> = ({
  config,
  onConfigChange,
  className = ''
}) => {
  const { t, i18n } = useTranslation();

  const handleThemeChange = (theme: 'light' | 'dark' | 'auto') => {
    onConfigChange({ theme });
  };

  const handleLanguageChange = (language: string) => {
    onConfigChange({ language });
    i18n.changeLanguage(language);
  };

  const handleToggle = (key: keyof MobileConfigState) => {
    onConfigChange({ [key]: !config[key] });
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Theme Settings */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          {t('navigation.settings.theme.toggle')}
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {(['light', 'dark', 'auto'] as const).map((theme) => (
            <motion.button
              key={theme}
              onClick={() => handleThemeChange(theme)}
              className={`
                p-3 rounded-lg border text-sm font-medium
                transition-colors
                ${config.theme === theme
                  ? 'bg-blue-50 border-blue-300 text-blue-600'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {theme === 'light' && t('navigation.settings.theme.lightMode')}
              {theme === 'dark' && t('navigation.settings.theme.darkMode')}
              {theme === 'auto' && 'Auto'}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Language Settings */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          {t('navigation.settings.language.select')}
        </h3>
        <div className="space-y-2">
          {[
            { code: 'pt-BR', name: 'Português' },
            { code: 'en-US', name: 'English' },
            { code: 'es-ES', name: 'Español' }
          ].map((lang) => (
            <motion.button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`
                w-full p-3 rounded-lg border text-left
                transition-colors
                ${config.language === lang.code
                  ? 'bg-blue-50 border-blue-300 text-blue-600'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }
              `}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {lang.name}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Toggle Settings */}
      <div className="space-y-4">
        {[
          { key: 'soundEnabled', label: t('navigation.settings.sound.toggle') },
          { key: 'animationsEnabled', label: 'Animações' },
          { key: 'reducedMotion', label: 'Movimento Reduzido' },
          { key: 'highContrast', label: 'Alto Contraste' }
        ].map((setting) => (
          <div key={setting.key} className="flex items-center justify-between">
            <span className="text-gray-900 dark:text-white font-medium">
              {setting.label}
            </span>
            <motion.button
              onClick={() => handleToggle(setting.key as keyof MobileConfigState)}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full
                transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500
                ${config[setting.key as keyof MobileConfigState] ? 'bg-blue-600' : 'bg-gray-300'}
              `}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="inline-block h-4 w-4 rounded-full bg-white shadow-lg"
                animate={{
                  x: config[setting.key as keyof MobileConfigState] ? 24 : 4
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </motion.button>
          </div>
        ))}
      </div>

      {/* Font Size Settings */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Tamanho da Fonte
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <motion.button
              key={size}
              onClick={() => onConfigChange({ fontSize: size })}
              className={`
                p-3 rounded-lg border text-sm font-medium
                transition-colors
                ${config.fontSize === size
                  ? 'bg-blue-50 border-blue-300 text-blue-600'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {size === 'sm' && 'Pequeno'}
              {size === 'md' && 'Médio'}
              {size === 'lg' && 'Grande'}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileSettings;

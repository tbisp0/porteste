/**
 * 🎯 MOBILE ACCESSIBILITY MENU
 * 
 * Menu de acessibilidade otimizado para mobile
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Accessibility,
  Eye,
  EyeOff,
  Type,
  Contrast,
  Volume2,
  VolumeX,
  MousePointer,
  Keyboard,
  X
} from 'lucide-react';

interface AccessibilityState {
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  screenReader: boolean;
  keyboardNavigation: boolean;
  soundFeedback: boolean;
}

export const MobileAccessibilityMenu: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilityState>({
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    screenReader: false,
    keyboardNavigation: false,
    soundFeedback: false
  });

  const toggleSetting = (key: keyof AccessibilityState) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));

    // Apply accessibility changes
    applyAccessibilityChanges(key, !settings[key]);
  };

  const applyAccessibilityChanges = (setting: keyof AccessibilityState, enabled: boolean) => {
    const root = document.documentElement;

    switch (setting) {
      case 'highContrast':
        if (enabled) {
          root.classList.add('high-contrast');
        } else {
          root.classList.remove('high-contrast');
        }
        break;

      case 'largeText':
        if (enabled) {
          root.classList.add('large-text');
        } else {
          root.classList.remove('large-text');
        }
        break;

      case 'reducedMotion':
        if (enabled) {
          root.classList.add('reduced-motion');
        } else {
          root.classList.remove('reduced-motion');
        }
        break;

      case 'keyboardNavigation':
        if (enabled) {
          root.classList.add('keyboard-navigation');
        } else {
          root.classList.remove('keyboard-navigation');
        }
        break;
    }
  };

  const accessibilityOptions = [
    {
      id: 'highContrast',
      label: 'Alto Contraste',
      description: 'Aumenta o contraste para melhor visibilidade',
      icon: <Contrast className="w-5 h-5" />,
      enabled: settings.highContrast
    },
    {
      id: 'largeText',
      label: 'Texto Grande',
      description: 'Aumenta o tamanho do texto',
      icon: <Type className="w-5 h-5" />,
      enabled: settings.largeText
    },
    {
      id: 'reducedMotion',
      label: 'Reduzir Movimento',
      description: 'Reduz animações e transições',
      icon: <Eye className="w-5 h-5" />,
      enabled: settings.reducedMotion
    },
    {
      id: 'keyboardNavigation',
      label: 'Navegação por Teclado',
      description: 'Melhora a navegação por teclado',
      icon: <Keyboard className="w-5 h-5" />,
      enabled: settings.keyboardNavigation
    },
    {
      id: 'soundFeedback',
      label: 'Feedback Sonoro',
      description: 'Adiciona feedback sonoro às interações',
      icon: settings.soundFeedback ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />,
      enabled: settings.soundFeedback
    }
  ];

  return (
    <>
      {/* Accessibility Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="
          fixed bottom-20 right-4 z-40
          w-12 h-12 rounded-full
          bg-blue-600 text-white
          shadow-lg
          flex items-center justify-center
          focus:outline-none focus:ring-2 focus:ring-blue-500
          md:hidden
        "
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={t('navigation.settings.accessibility.menu')}
      >
        <Accessibility className="w-6 h-6" />
      </motion.button>

      {/* Accessibility Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="
                fixed bottom-0 left-0 right-0 z-50
                bg-white dark:bg-gray-900
                rounded-t-2xl
                shadow-2xl
                max-h-[80vh]
                overflow-y-auto
              "
              style={{
                paddingBottom: 'env(safe-area-inset-bottom)'
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <Accessibility className="w-6 h-6 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Acessibilidade
                  </h2>
                </div>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="
                    p-2 rounded-lg
                    text-gray-500 hover:text-gray-700
                    hover:bg-gray-100 dark:hover:bg-gray-800
                    transition-colors
                  "
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {accessibilityOptions.map((option, index) => (
                  <motion.div
                    key={option.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="
                      flex items-center justify-between p-4 rounded-lg
                      border border-gray-200 dark:border-gray-700
                      bg-gray-50 dark:bg-gray-800
                    "
                  >
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="text-blue-600 mt-1">{option.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {option.label}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {option.description}
                        </p>
                      </div>
                    </div>

                    {/* Toggle Switch */}
                    <motion.button
                      onClick={() => toggleSetting(option.id as keyof AccessibilityState)}
                      className={`
                        relative inline-flex h-6 w-11 items-center rounded-full
                        transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500
                        ${option.enabled ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}
                      `}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.span
                        className={`
                          inline-block h-4 w-4 rounded-full bg-white shadow-lg
                          transition-transform
                          ${option.enabled ? 'translate-x-6' : 'translate-x-1'}
                        `}
                        layout
                      />
                    </motion.button>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  {t('navigation.settings.accessibility.description')}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileAccessibilityMenu;

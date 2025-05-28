/**
 * 🎯 MOBILE CONFIG MENU
 * 
 * Menu de configurações otimizado para mobile
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  X, 
  Sun, 
  Moon, 
  Volume2, 
  VolumeX, 
  Globe, 
  Accessibility,
  Settings,
  Palette,
  Type,
  Contrast
} from 'lucide-react';

interface MobileConfigMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileConfigMenu: React.FC<MobileConfigMenuProps> = ({
  isOpen,
  onClose
}) => {
  const { t, i18n } = useTranslation();

  const configSections = [
    {
      id: 'theme',
      title: t('navigation.settings.theme.toggle'),
      icon: <Palette className="w-5 h-5" />,
      items: [
        {
          id: 'light',
          label: t('navigation.settings.theme.lightMode'),
          icon: <Sun className="w-4 h-4" />,
          action: () => console.log('Light theme')
        },
        {
          id: 'dark',
          label: t('navigation.settings.theme.darkMode'),
          icon: <Moon className="w-4 h-4" />,
          action: () => console.log('Dark theme')
        }
      ]
    },
    {
      id: 'language',
      title: t('navigation.settings.language.select'),
      icon: <Globe className="w-5 h-5" />,
      items: [
        {
          id: 'pt-BR',
          label: 'Português',
          action: () => i18n.changeLanguage('pt-BR')
        },
        {
          id: 'en-US',
          label: 'English',
          action: () => i18n.changeLanguage('en-US')
        },
        {
          id: 'es-ES',
          label: 'Español',
          action: () => i18n.changeLanguage('es-ES')
        }
      ]
    },
    {
      id: 'sound',
      title: t('navigation.settings.sound.toggle'),
      icon: <Volume2 className="w-5 h-5" />,
      items: [
        {
          id: 'sound-on',
          label: t('navigation.settings.sound.enabled'),
          icon: <Volume2 className="w-4 h-4" />,
          action: () => console.log('Sound on')
        },
        {
          id: 'sound-off',
          label: t('navigation.settings.sound.disabled'),
          icon: <VolumeX className="w-4 h-4" />,
          action: () => console.log('Sound off')
        }
      ]
    },
    {
      id: 'accessibility',
      title: t('navigation.settings.accessibility.menu'),
      icon: <Accessibility className="w-5 h-5" />,
      items: [
        {
          id: 'high-contrast',
          label: 'Alto Contraste',
          icon: <Contrast className="w-4 h-4" />,
          action: () => console.log('High contrast')
        },
        {
          id: 'large-text',
          label: 'Texto Grande',
          icon: <Type className="w-4 h-4" />,
          action: () => console.log('Large text')
        }
      ]
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />

          {/* Menu */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="
              fixed top-0 left-0 bottom-0 z-50
              w-80 max-w-[85vw]
              bg-white dark:bg-gray-900
              shadow-2xl
              overflow-y-auto
            "
            style={{
              paddingTop: 'env(safe-area-inset-top)',
              paddingBottom: 'env(safe-area-inset-bottom)',
              paddingLeft: 'env(safe-area-inset-left)'
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <Settings className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t('navigation.settings.title')}
                </h2>
              </div>
              <motion.button
                onClick={onClose}
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
            <div className="p-6 space-y-6">
              {configSections.map((section, sectionIndex) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: sectionIndex * 0.1 }}
                  className="space-y-3"
                >
                  {/* Section Header */}
                  <div className="flex items-center space-x-3">
                    <div className="text-blue-600">{section.icon}</div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {section.title}
                    </h3>
                  </div>

                  {/* Section Items */}
                  <div className="space-y-2 ml-8">
                    {section.items.map((item, itemIndex) => (
                      <motion.button
                        key={item.id}
                        onClick={item.action}
                        className="
                          w-full flex items-center space-x-3 p-3 rounded-lg
                          text-left text-gray-700 dark:text-gray-300
                          hover:bg-gray-100 dark:hover:bg-gray-800
                          transition-colors
                          focus:outline-none focus:ring-2 focus:ring-blue-500
                        "
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (sectionIndex * 0.1) + (itemIndex * 0.05) }}
                      >
                        {item.icon && (
                          <div className="text-gray-500">{item.icon}</div>
                        )}
                        <span className="flex-1">{item.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                {t('navigation.settings.description')}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileConfigMenu;

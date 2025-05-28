import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigationSounds } from '@/hooks/useSound';

const LANGUAGES = [
  { code: 'pt-BR', label: 'Português', nativeName: 'Português', flag: '🇧🇷' },
  { code: 'en-US', label: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es-ES', label: 'Español', nativeName: 'Español', flag: '🇪🇸' },
];

export const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();
  const { playButtonHover, playButtonClick } = useNavigationSounds();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = LANGUAGES.find(lang => lang.code === i18n.language) || LANGUAGES[0];

  const handleToggle = () => {
    playButtonClick();
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = (languageCode: string) => {
    playButtonClick();
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  const handleHover = () => {
    playButtonHover();
  };

  return (
    <div className="relative">
      {/* Main Button */}
      <motion.button
        onClick={handleToggle}
        onMouseEnter={handleHover}
        className="
          relative flex items-center justify-center gap-1
          w-11 h-11 rounded-lg
          border border-[var(--color-border)]
          bg-[var(--color-surface)]
          shadow hover:shadow-lg
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
          hover:scale-105 active:scale-95
        "
        aria-label={t('tooltips.language.switch')}
        aria-expanded={isOpen}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Globe Icon */}
        <Globe className="w-4 h-4 text-[var(--color-text)]" />

        {/* Chevron */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-3 h-3 text-[var(--color-text)]" />
        </motion.div>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="
              absolute top-full right-0 mt-2 z-50
              min-w-[160px] rounded-lg
              border border-[var(--color-border)]
              bg-[var(--color-surface)]
              shadow-lg backdrop-blur-sm
            "
          >
            <div className="p-1">
              {LANGUAGES.map((language) => (
                <motion.button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  onMouseEnter={handleHover}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2 rounded-md
                    text-sm text-left transition-colors duration-150
                    hover:bg-[var(--color-accent)]
                    focus:outline-none focus:bg-[var(--color-accent)]
                    ${i18n.language === language.code
                      ? 'bg-[var(--color-accent)] text-[var(--color-primary)]'
                      : 'text-[var(--color-text)]'
                    }
                  `}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-base">{language.flag}</span>
                  <span className="font-medium">{language.nativeName}</span>
                  {i18n.language === language.code && (
                    <motion.div
                      className="ml-auto w-2 h-2 rounded-full bg-[var(--color-primary)]"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

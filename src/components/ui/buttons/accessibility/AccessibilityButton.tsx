import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Accessibility, Eye, Type, BookOpen } from 'lucide-react';
import { useNavigationSounds } from '@/hooks/useSound';
import { useTranslation } from 'react-i18next';

interface AccessibilityOption {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  i18nKey: string;
  action: () => void;
}

const AccessibilityButton: React.FC = () => {
  const { playButtonHover, playButtonClick } = useNavigationSounds();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [voiceOver, setVoiceOver] = useState(false);
  const [dyslexiaMode, setDyslexiaMode] = useState(false);

  const handleToggle = () => {
    playButtonClick();
    setIsOpen(!isOpen);
  };

  const handleHover = () => {
    playButtonHover();
  };

  const accessibilityOptions: AccessibilityOption[] = [
    {
      id: 'contrast',
      label: 'Alto Contraste',
      icon: Eye,
      i18nKey: 'alto-contraste',
      action: () => setHighContrast(prev => !prev)
    },
    {
      id: 'text-size',
      label: 'Aumentar Fonte',
      icon: Type,
      i18nKey: 'aumentar-fonte',
      action: () => setLargeText(prev => !prev)
    },
    {
      id: 'voice-over',
      label: 'Ler Conteúdo',
      icon: BookOpen,
      i18nKey: 'ler-conteudo',
      action: () => setVoiceOver(prev => !prev)
    },
    {
      id: 'dyslexia',
      label: 'Modo Dislexia',
      icon: Type,
      i18nKey: 'modo-dislexia',
      action: () => setDyslexiaMode(prev => !prev)
    },
  ];

  const handleOptionClick = (option: AccessibilityOption) => {
    playButtonClick();
    option.action();
  };

  return (
    <div className="relative">
      {/* Main Button */}
      <motion.button
        onClick={handleToggle}
        onMouseEnter={handleHover}
        className="
          relative flex items-center justify-center
          w-11 h-11 rounded-lg
          border border-[var(--color-border)]
          bg-[var(--color-surface)]
          shadow hover:shadow-lg
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
          hover:scale-105 active:scale-95
        "
        aria-label={t('accessibility.menuTooltip')}
        aria-expanded={isOpen}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Accessibility className="w-5 h-5 text-[var(--color-text)]" />
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
              min-w-[200px] rounded-lg
              border border-[var(--color-border)]
              bg-[var(--color-surface)]
              shadow-lg backdrop-blur-sm
            "
          >
            <div className="p-2">
              <div className="px-3 py-2 border-b border-[var(--color-border)]">
                <h3 className="text-sm font-semibold text-[var(--color-text)]">
                  {t('accessibility.title')}
                </h3>
                <p className="text-xs text-[var(--color-muted)] mt-1">
                  {t('accessibility.subtitle')}
                </p>
              </div>
              
              <div className="mt-2 space-y-1">
                {accessibilityOptions.map((option) => {
                  const Icon = option.icon;
                  const isActive = 
                    (option.id === 'contrast' && highContrast) ||
                    (option.id === 'text-size' && largeText) ||
                    (option.id === 'voice-over' && voiceOver) ||
                    (option.id === 'dyslexia' && dyslexiaMode);

                  return (
                    <motion.button
                      key={option.id}
                      onClick={() => handleOptionClick(option)}
                      onMouseEnter={handleHover}
                      className={`
                        w-full flex items-center gap-3 px-3 py-2 rounded-md
                        text-sm text-left transition-colors duration-150
                        hover:bg-[var(--color-accent)]
                        focus:outline-none focus:bg-[var(--color-accent)]
                        ${isActive 
                          ? 'bg-[var(--color-accent)] text-[var(--color-primary)]' 
                          : 'text-[var(--color-text)]'
                        }
                      `}
                      whileHover={{ x: 2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{option.label}</span>
                      {isActive && (
                        <motion.div
                          className="ml-auto w-2 h-2 rounded-full bg-[var(--color-primary)]"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
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

export default AccessibilityButton;

import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { useNavigationSounds } from '@/hooks/useSound';
import { useTranslation } from 'react-i18next';

const SimpleThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { playButtonHover, playButtonClick } = useNavigationSounds();
  const { t } = useTranslation();

  const isDark = theme === 'dark';

  const handleToggle = () => {
    playButtonClick();
    setTheme(isDark ? 'light' : 'dark');
  };

  const handleHover = () => {
    playButtonHover();
  };

  return (
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
      aria-label={isDark ? t('tooltips.theme.light') : t('tooltips.theme.dark')}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Icon Container with Animation */}
      <motion.div
        className="relative w-5 h-5"
        animate={{
          rotate: isDark ? 180 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {/* Sun Icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            opacity: isDark ? 0 : 1,
            scale: isDark ? 0.5 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          <Sun className="w-5 h-5 text-[var(--color-text)]" />
        </motion.div>

        {/* Moon Icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            opacity: isDark ? 1 : 0,
            scale: isDark ? 1 : 0.5,
          }}
          transition={{ duration: 0.2 }}
        >
          <Moon className="w-5 h-5 text-[var(--color-text)]" />
        </motion.div>
      </motion.div>

      {/* Ripple Effect */}
      <motion.div
        className="absolute inset-0 rounded-lg bg-[var(--color-primary)] opacity-0"
        whileTap={{
          opacity: [0, 0.1, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
};

export default SimpleThemeToggle;

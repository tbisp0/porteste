import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useSoundEffects } from '@/hooks/useSound';
import { useTranslation } from 'react-i18next';

const SoundToggle: React.FC = () => {
  const { isEnabled, setEnabled, playToggle } = useSoundEffects();
  const { t } = useTranslation();

  const handleToggle = () => {
    playToggle();
    setEnabled(!isEnabled);
  };

  return (
    <motion.button
      onClick={handleToggle}
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
      aria-label={isEnabled ? t('tooltips.sound.disable') : t('tooltips.sound.enable')}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Icon Container with Animation */}
      <motion.div
        className="relative w-5 h-5"
        animate={{
          scale: isEnabled ? 1 : 0.9,
        }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
      >
        {/* Volume On Icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            opacity: isEnabled ? 1 : 0,
            scale: isEnabled ? 1 : 0.5,
          }}
          transition={{ duration: 0.2 }}
        >
          <Volume2 className="w-5 h-5 text-[var(--color-text)]" />
        </motion.div>

        {/* Volume Off Icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            opacity: isEnabled ? 0 : 1,
            scale: isEnabled ? 0.5 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          <VolumeX className="w-5 h-5 text-[var(--color-text)]" />
        </motion.div>
      </motion.div>

      {/* Sound Wave Animation when enabled */}
      {isEnabled && (
        <motion.div
          className="absolute inset-0 rounded-lg border-2 border-[var(--color-primary)]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

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

export default SoundToggle;

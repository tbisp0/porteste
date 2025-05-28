import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useNavigationSounds } from '@/hooks/useSound';
import { useTranslation } from 'react-i18next';

interface FloatingFeedbackButtonProps {
  onClick: () => void;
  className?: string;
}

const FloatingFeedbackButton: React.FC<FloatingFeedbackButtonProps> = ({
  onClick,
  className = ''
}) => {
  const { playButtonHover, playButtonClick } = useNavigationSounds();
  const { t } = useTranslation();

  const handleClick = () => {
    playButtonClick();
    onClick();
  };

  const handleHover = () => {
    playButtonHover();
  };

  return (
    <motion.button
      onClick={handleClick}
      onMouseEnter={handleHover}
      className={`
        fixed bottom-6 right-6 z-50
        flex items-center justify-center
        w-14 h-14 rounded-full
        bg-[var(--color-primary)]
        text-white shadow-lg
        hover:shadow-xl
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2
        ${className}
      `}
      aria-label={t('navigation.settings.feedback.open')}
      whileHover={{ 
        scale: 1.1,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: 0.5
      }}
    >
      {/* Icon with Pulse Animation */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.div>

      {/* Ripple Effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-white opacity-0"
        whileTap={{
          opacity: [0, 0.3, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Notification Dot (optional) */}
      <motion.div
        className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ delay: 1, duration: 0.3 }}
      />
    </motion.button>
  );
};

export default FloatingFeedbackButton;

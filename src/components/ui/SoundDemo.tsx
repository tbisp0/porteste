import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Play, CheckCircle, AlertCircle, MousePointer, ToggleLeft, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSoundEffects } from '@/hooks/useSound';

const SoundDemo: React.FC = () => {
  const { t } = useTranslation();
  const { playSuccess, playError, playHover, playClick, playToggle, isEnabled, isSupported } = useSoundEffects();
  const [isOpen, setIsOpen] = useState(false);

  if (!isSupported) {
    return null;
  }

  const soundButtons = [
    {
      label: 'Success Sound',
      icon: CheckCircle,
      color: 'bg-green-500 hover:bg-green-600',
      action: playSuccess,
      description: 'Plays when forms are submitted successfully'
    },
    {
      label: 'Error Sound',
      icon: AlertCircle,
      color: 'bg-red-500 hover:bg-red-600',
      action: playError,
      description: 'Plays when errors occur'
    },
    {
      label: 'Hover Sound',
      icon: MousePointer,
      color: 'bg-blue-500 hover:bg-blue-600',
      action: playHover,
      description: 'Plays on button and card hover'
    },
    {
      label: 'Click Sound',
      icon: Play,
      color: 'bg-purple-500 hover:bg-purple-600',
      action: playClick,
      description: 'Plays on button clicks'
    },
    {
      label: 'Toggle Sound',
      icon: ToggleLeft,
      color: 'bg-indigo-500 hover:bg-indigo-600',
      action: playToggle,
      description: 'Plays when toggling theme or settings'
    }
  ];

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-[var(--color-primary)] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Volume2 className="w-6 h-6" />
      </motion.button>

      {/* Expandable Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-16 right-0 w-80 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg shadow-xl p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-[var(--color-primary)]" />
                <h3 className="font-bold text-[var(--color-text)]">Sound Demo</h3>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  isEnabled
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                }`}>
                  {isEnabled ? 'ON' : 'OFF'}
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              {soundButtons.map((button, index) => {
                const Icon = button.icon;

                return (
                  <motion.button
                    key={button.label}
                    onClick={button.action}
                    onMouseEnter={playHover}
                    className={`${button.color} text-white p-2 rounded text-xs transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed`}
                    disabled={!isEnabled}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="flex items-center gap-1">
                      <Icon className="w-3 h-3" />
                      <span className="font-medium">{button.label.replace(' Sound', '')}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <div className="text-xs text-[var(--color-muted)]">
              <p className="mb-2">
                <strong>Integration Points:</strong>
              </p>
              <ul className="space-y-1 text-xs">
                <li>• Form submissions & validation</li>
                <li>• Project card interactions</li>
                <li>• Navigation & theme toggle</li>
                <li>• Button hover & click events</li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SoundDemo;

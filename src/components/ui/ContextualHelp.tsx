import React, { useState } from 'react';
import { HelpCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContextualHelpProps {
  title: string;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

const ContextualHelp: React.FC<ContextualHelpProps> = ({
  title,
  content,
  position = 'top',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const positionClasses = {
    top: 'bottom-full mb-2',
    bottom: 'top-full mt-2',
    left: 'right-full mr-2',
    right: 'left-full ml-2'
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Botão de ajuda */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') setIsOpen(false);
        }}
        className="w-6 h-6 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center hover:bg-[var(--color-primary-dark)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 hover:scale-110 shadow-sm"
        aria-label={`Ajuda sobre: ${title}`}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        <HelpCircle size={14} />
      </button>

      {/* Tooltip de ajuda */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`absolute z-50 w-72 p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-xl ${positionClasses[position]}`}
            role="dialog"
            aria-labelledby="help-title"
            aria-describedby="help-content"
          >
            {/* Cabeçalho */}
            <div className="flex items-start justify-between mb-3">
              <h3
                id="help-title"
                className="text-base font-bold"
                style={{ color: 'var(--color-text)' }}
              >
                {title}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="w-6 h-6 rounded-full hover:bg-[var(--color-border)] transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] hover:scale-110"
                aria-label="Fechar ajuda"
              >
                <X size={12} />
              </button>
            </div>

            {/* Conteúdo */}
            <div
              id="help-content"
              className="text-sm leading-relaxed space-y-2"
              style={{ color: 'var(--color-muted)' }}
            >
              {content.split('.').filter(sentence => sentence.trim()).map((sentence, index) => (
                <p key={index} className="mb-1">
                  {sentence.trim()}.
                </p>
              ))}
            </div>

            {/* Seta indicativa */}
            <div
              className={`absolute w-2 h-2 bg-[var(--color-surface)] border-[var(--color-border)] transform rotate-45 ${
                position === 'top' ? 'top-full -mt-1 left-4 border-r border-b' :
                position === 'bottom' ? 'bottom-full -mb-1 left-4 border-l border-t' :
                position === 'left' ? 'left-full -ml-1 top-4 border-t border-r' :
                'right-full -mr-1 top-4 border-b border-l'
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContextualHelp;

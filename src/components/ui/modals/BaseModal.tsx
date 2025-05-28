/**
 * 🎯 BASE MODAL COMPONENT
 * 
 * Modal base com design system unificado
 * Suporte completo ao modo escuro
 * WCAG 2.2 compliant
 */

import React, { useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { useNavigationSounds } from '@/hooks/useSound';
import { BaseModalProps, ModalSize, ModalVariant } from './types';
import { modalAnimations } from './utils/animations';

// Configurações de tamanho
const sizeClasses: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md', 
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-[90vw]'
};

// Configurações de variante
const variantClasses: Record<ModalVariant, string> = {
  default: 'border-gray-200 dark:border-gray-700',
  feedback: 'border-blue-200 dark:border-blue-800',
  confirm: 'border-yellow-200 dark:border-yellow-800',
  alert: 'border-orange-200 dark:border-orange-800',
  success: 'border-green-200 dark:border-green-800',
  error: 'border-red-200 dark:border-red-800',
  warning: 'border-yellow-200 dark:border-yellow-800'
};

export const BaseModal: React.FC<BaseModalProps> = ({
  open,
  onClose,
  title,
  description,
  children,
  variant = 'default',
  size = 'md',
  className = '',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  initialFocus,
  ariaLabel,
  ariaDescribedBy,
  ...props
}) => {
  const { t } = useTranslation();
  const { playButtonClick } = useNavigationSounds();

  // Handle escape key
  useEffect(() => {
    if (!closeOnEscape) return;
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onClose, closeOnEscape]);

  const handleClose = () => {
    playButtonClick();
    onClose();
  };

  const handleOverlayClick = () => {
    if (closeOnOverlayClick) {
      handleClose();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <Dialog
          open={open}
          onClose={handleClose}
          initialFocus={initialFocus}
          className="fixed z-50 inset-0 overflow-y-auto"
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedBy}
        >
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleOverlayClick}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div className="flex items-center justify-center min-h-screen px-4 py-6">
            <motion.div
              className={cn(
                // Base styles
                'relative w-full rounded-2xl shadow-xl z-10',
                // Background com modo escuro
                'bg-white dark:bg-gray-800',
                // Border com modo escuro
                'border',
                variantClasses[variant],
                // Size
                sizeClasses[size],
                // Custom className
                className
              )}
              {...modalAnimations.slideUp}
            >
              {/* Close Button */}
              {showCloseButton && (
                <button
                  onClick={handleClose}
                  className={cn(
                    'absolute top-4 right-4 p-2 rounded-full',
                    'hover:bg-gray-100 dark:hover:bg-gray-700',
                    'focus:outline-none focus:ring-2 focus:ring-blue-500',
                    'text-gray-500 dark:text-gray-400',
                    'transition-colors duration-200'
                  )}
                  aria-label={t('common.close')}
                >
                  <X className="w-5 h-5" />
                </button>
              )}

              {/* Content */}
              <div className="p-6">
                {/* Header */}
                {(title || description) && (
                  <div className="mb-6">
                    {title && (
                      <Dialog.Title className={cn(
                        'text-lg font-semibold mb-2',
                        'text-gray-900 dark:text-gray-100'
                      )}>
                        {title}
                      </Dialog.Title>
                    )}
                    {description && (
                      <Dialog.Description className={cn(
                        'text-sm',
                        'text-gray-600 dark:text-gray-300'
                      )}>
                        {description}
                      </Dialog.Description>
                    )}
                  </div>
                )}

                {/* Body */}
                {children}
              </div>
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

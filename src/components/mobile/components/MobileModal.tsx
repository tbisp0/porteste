/**
 * 🎯 MOBILE MODAL
 * 
 * Modal component otimizado para mobile
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { MobileModalProps } from '../types';

export const MobileModal: React.FC<MobileModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  size = 'md',
  position = 'center',
  backdrop = true,
  swipeToClose = true,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    full: 'w-full h-full'
  };

  const positionClasses = {
    center: 'items-center justify-center',
    bottom: 'items-end justify-center',
    top: 'items-start justify-center'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          {backdrop && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={onClose}
            />
          )}

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: position === 'bottom' ? '100%' : position === 'top' ? '-100%' : 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: position === 'bottom' ? '100%' : position === 'top' ? '-100%' : 0 }}
            className={`
              fixed z-50 flex ${positionClasses[position]}
              ${size === 'full' ? 'inset-0' : 'inset-4'}
            `}
          >
            <div
              className={`
                mobile-modal
                bg-white dark:bg-gray-900
                rounded-lg shadow-2xl
                ${sizeClasses[size]}
                ${size !== 'full' ? 'max-h-[90vh]' : ''}
                overflow-hidden
                ${className}
              `}
              style={{
                paddingBottom: 'env(safe-area-inset-bottom)'
              }}
            >
              {/* Header */}
              {title && (
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {title}
                  </h2>
                  <motion.button
                    onClick={onClose}
                    className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
              )}

              {/* Content */}
              <div className={`${size !== 'full' ? 'overflow-y-auto' : ''} flex-1`}>
                {children}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileModal;

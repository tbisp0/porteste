/**
 * 🎯 MOBILE SHEET
 * 
 * Bottom sheet component para mobile
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MobileSheetProps } from '../types';

export const MobileSheet: React.FC<MobileSheetProps> = ({
  isOpen,
  onClose,
  children,
  side = 'bottom',
  size = 'md',
  backdrop = true,
  swipeToClose = true,
  className = ''
}) => {
  const sizeClasses = {
    sm: side === 'bottom' || side === 'top' ? 'h-1/3' : 'w-1/3',
    md: side === 'bottom' || side === 'top' ? 'h-1/2' : 'w-1/2',
    lg: side === 'bottom' || side === 'top' ? 'h-2/3' : 'w-2/3',
    full: side === 'bottom' || side === 'top' ? 'h-full' : 'w-full'
  };

  const slideVariants = {
    bottom: {
      initial: { y: '100%' },
      animate: { y: 0 },
      exit: { y: '100%' }
    },
    top: {
      initial: { y: '-100%' },
      animate: { y: 0 },
      exit: { y: '-100%' }
    },
    left: {
      initial: { x: '-100%' },
      animate: { x: 0 },
      exit: { x: '-100%' }
    },
    right: {
      initial: { x: '100%' },
      animate: { x: 0 },
      exit: { x: '100%' }
    }
  };

  const positionClasses = {
    bottom: 'bottom-0 left-0 right-0',
    top: 'top-0 left-0 right-0',
    left: 'left-0 top-0 bottom-0',
    right: 'right-0 top-0 bottom-0'
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

          {/* Sheet */}
          <motion.div
            initial={slideVariants[side].initial}
            animate={slideVariants[side].animate}
            exit={slideVariants[side].exit}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`
              fixed z-50
              ${positionClasses[side]}
              ${sizeClasses[size]}
              bg-white dark:bg-gray-900
              ${side === 'bottom' || side === 'top' ? 'rounded-t-2xl' : 'rounded-r-2xl'}
              shadow-2xl
              overflow-hidden
              ${className}
            `}
            style={{
              paddingBottom: side === 'bottom' ? 'env(safe-area-inset-bottom)' : undefined
            }}
          >
            {/* Drag Handle */}
            {swipeToClose && (side === 'bottom' || side === 'top') && (
              <div className="flex justify-center p-2">
                <div className="w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileSheet;

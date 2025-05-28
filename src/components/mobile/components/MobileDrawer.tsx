/**
 * 🎯 MOBILE DRAWER
 * 
 * Drawer component para mobile
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MobileDrawerProps } from '../types';

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  children,
  side = 'left',
  width = '280px',
  backdrop = true,
  swipeToClose = true,
  className = ''
}) => {
  const slideVariants = {
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

          {/* Drawer */}
          <motion.div
            initial={slideVariants[side].initial}
            animate={slideVariants[side].animate}
            exit={slideVariants[side].exit}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`
              fixed z-50
              ${positionClasses[side]}
              bg-white dark:bg-gray-900
              shadow-2xl
              overflow-hidden
              ${className}
            `}
            style={{
              width: typeof width === 'number' ? `${width}px` : width,
              paddingTop: 'env(safe-area-inset-top)',
              paddingBottom: 'env(safe-area-inset-bottom)',
              paddingLeft: side === 'left' ? 'env(safe-area-inset-left)' : undefined,
              paddingRight: side === 'right' ? 'env(safe-area-inset-right)' : undefined
            }}
          >
            {/* Content */}
            <div className="flex flex-col h-full overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileDrawer;

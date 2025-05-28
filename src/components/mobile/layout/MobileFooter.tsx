/**
 * 🎯 MOBILE FOOTER
 * 
 * Footer otimizado para dispositivos mobile
 */

import React from 'react';
import { motion } from 'framer-motion';
import { MobileFooterProps } from '../types';

export const MobileFooter: React.FC<MobileFooterProps> = ({
  children,
  sticky = false,
  safeArea = true,
  className = ''
}) => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        mobile-footer
        ${sticky ? 'sticky bottom-0' : ''}
        ${safeArea ? 'pb-[env(safe-area-inset-bottom)]' : ''}
        bg-white dark:bg-gray-900
        border-t border-gray-200 dark:border-gray-700
        ${className}
      `}
      style={{
        paddingBottom: safeArea ? 'env(safe-area-inset-bottom)' : undefined
      }}
    >
      {children}
    </motion.footer>
  );
};

export default MobileFooter;

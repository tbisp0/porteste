/**
 * 🎯 LAYOUT MOBILE UNIFICADO
 * 
 * Layout principal para dispositivos mobile com safe areas e otimizações
 */

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MobileLayoutProps } from '../types';
import { useMobileDetection } from '../hooks/useMobileDetection';

export const MobileLayout: React.FC<MobileLayoutProps> = ({
  children,
  header,
  footer,
  navigation,
  className = '',
  fullHeight = true,
  safeArea = true,
  scrollable = true
}) => {
  const { isMobileDevice, isTabletDevice, deviceInfo } = useMobileDetection();

  // Configurar viewport meta tag para mobile
  useEffect(() => {
    if (isMobileDevice || isTabletDevice) {
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        viewport.setAttribute('content', 
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
        );
      }
    }
  }, [isMobileDevice, isTabletDevice]);

  // Classes base do layout
  const layoutClasses = `
    mobile-layout
    ${fullHeight ? 'min-h-screen' : ''}
    ${safeArea ? 'safe-area-inset' : ''}
    ${scrollable ? 'overflow-auto' : 'overflow-hidden'}
    ${className}
  `;

  // Layout para mobile
  if (isMobileDevice) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`
          ${layoutClasses}
          flex flex-col
          ${safeArea ? 'pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]' : ''}
        `}
        style={{
          // Suporte para notch e safe areas
          paddingTop: safeArea ? 'env(safe-area-inset-top)' : undefined,
          paddingBottom: safeArea ? 'env(safe-area-inset-bottom)' : undefined,
          paddingLeft: safeArea ? 'env(safe-area-inset-left)' : undefined,
          paddingRight: safeArea ? 'env(safe-area-inset-right)' : undefined,
        }}
      >
        {/* Header Mobile */}
        {header && (
          <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mobile-header flex-shrink-0 z-40"
          >
            {header}
          </motion.header>
        )}

        {/* Main Content */}
        <motion.main
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className={`
            mobile-main flex-1
            ${scrollable ? 'overflow-auto' : ''}
            ${header || footer ? 'min-h-0' : 'min-h-full'}
          `}
        >
          {children}
        </motion.main>

        {/* Footer Mobile */}
        {footer && (
          <motion.footer
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mobile-footer flex-shrink-0 z-40"
          >
            {footer}
          </motion.footer>
        )}

        {/* Navigation Mobile */}
        {navigation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mobile-navigation z-50"
          >
            {navigation}
          </motion.div>
        )}
      </motion.div>
    );
  }

  // Layout para tablet
  if (isTabletDevice) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`
          ${layoutClasses}
          flex flex-col
        `}
      >
        {/* Header Tablet */}
        {header && (
          <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="tablet-header flex-shrink-0 z-40"
          >
            {header}
          </motion.header>
        )}

        {/* Main Content */}
        <motion.main
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className={`
            tablet-main flex-1
            ${scrollable ? 'overflow-auto' : ''}
          `}
        >
          {children}
        </motion.main>

        {/* Footer Tablet */}
        {footer && (
          <motion.footer
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="tablet-footer flex-shrink-0 z-40"
          >
            {footer}
          </motion.footer>
        )}

        {/* Navigation Tablet */}
        {navigation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="tablet-navigation z-50"
          >
            {navigation}
          </motion.div>
        )}
      </motion.div>
    );
  }

  // Layout padrão para desktop
  return (
    <div className={layoutClasses}>
      {header && <header className="desktop-header">{header}</header>}
      <main className="desktop-main flex-1">{children}</main>
      {footer && <footer className="desktop-footer">{footer}</footer>}
      {navigation && <div className="desktop-navigation">{navigation}</div>}
    </div>
  );
};

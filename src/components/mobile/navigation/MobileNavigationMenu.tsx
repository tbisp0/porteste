/**
 * 🎯 MENU DE NAVEGAÇÃO MOBILE UNIFICADO
 * 
 * Menu lateral deslizante com animações e gestos
 */

import React, { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigationSounds } from '@/hooks/useSound';
import { useAnalytics } from '@/hooks/useAnalytics';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { MobileNavigationItem, MobileNavigationConfig } from '../types';
import { useMobileGestures } from '../hooks/useMobileGestures';

interface MobileNavigationMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  items: MobileNavigationItem[];
  config?: MobileNavigationConfig;
}

export const MobileNavigationMenu: React.FC<MobileNavigationMenuProps> = ({
  isOpen,
  onClose,
  activeSection,
  onNavigate,
  items,
  config
}) => {
  const { t } = useTranslation();
  const { playButtonHover, playButtonClick, playPageTransition } = useNavigationSounds();
  const { trackNavigation } = useAnalytics();

  // Gestos para fechar menu
  const { gestureRef } = useMobileGestures({
    onSwipeRight: () => {
      if (config?.swipeToClose) {
        onClose();
      }
    }
  });

  const handleNavClick = useCallback((e: React.MouseEvent, item: MobileNavigationItem) => {
    e.preventDefault();

    if (item.disabled) return;

    // Play transition sound
    playPageTransition();

    // Navigate to section
    onNavigate(item.sectionId);

    // Track navigation
    trackNavigation(item.sectionId);

    // Close menu if configured
    if (config?.autoClose) {
      onClose();
    }
  }, [onNavigate, onClose, playPageTransition, trackNavigation, config]);

  const handleItemHover = () => {
    playButtonHover();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        ref={gestureRef}
        side={config?.position === 'top' ? 'top' : config?.position === 'bottom' ? 'bottom' : 'right'}
        className="
          w-[280px] sm:w-[320px] p-0 
          bg-[var(--color-surface)]/95 backdrop-blur-lg
          border-l border-[var(--color-border)]
          data-[state=open]:duration-300 data-[state=closed]:duration-200
        "
        id="mobile-navigation-menu"
      >
        <SheetHeader className="px-6 py-4 border-b border-[var(--color-border)]">
          <SheetTitle className="text-left text-lg font-semibold text-[var(--color-text)]">
            {t('navigation.menu.title')}
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col p-6" aria-label={t('navigation.menu.label')}>
          <AnimatePresence>
            {items.map((item, index) => {
              const isActive = activeSection === item.sectionId;
              const isDisabled = item.disabled;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{
                    duration: 0.2,
                    delay: index * 0.05,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item)}
                    onMouseEnter={handleItemHover}
                    className={`
                      group relative flex items-center gap-4 px-4 py-4 rounded-lg
                      transition-all duration-200 ease-out
                      min-h-[44px] touch-manipulation
                      focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
                      ${isActive
                        ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20'
                        : isDisabled
                          ? 'text-[var(--color-text-disabled)] cursor-not-allowed opacity-50'
                          : 'text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-primary)]'
                      }
                    `}
                    aria-current={isActive ? 'page' : undefined}
                    aria-disabled={isDisabled}
                  >
                    {/* Icon */}
                    <div className={`
                      w-5 h-5 transition-all duration-200 ease-out flex items-center justify-center
                      ${isActive
                        ? 'text-[var(--color-primary)]'
                        : isDisabled
                          ? 'text-[var(--color-text-disabled)]'
                          : 'text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)]'
                      }
                    `}>
                      {item.icon}
                    </div>

                    {/* Label */}
                    <span className={`
                      text-base font-medium transition-colors duration-200 ease-out flex-1
                      ${isActive
                        ? 'text-[var(--color-primary)] font-semibold'
                        : isDisabled
                          ? 'text-[var(--color-text-disabled)]'
                          : 'text-[var(--color-text)] group-hover:text-[var(--color-primary)]'
                      }
                    `}>
                      {t(item.label)}
                    </span>

                    {/* Badge */}
                    {item.badge && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="
                          min-w-[20px] h-5 px-2
                          bg-[var(--color-error)] text-white
                          rounded-full flex items-center justify-center
                          text-xs font-bold
                        "
                      >
                        {typeof item.badge === 'number' && item.badge > 99 ? '99+' : item.badge}
                      </motion.div>
                    )}

                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        className="absolute right-4 w-2 h-2 bg-[var(--color-primary)] rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        layoutId="mobileNavActiveIndicator"
                      />
                    )}

                    {/* Hover effect */}
                    {!isDisabled && (
                      <motion.div
                        className="absolute inset-0 rounded-lg bg-[var(--color-primary)]/5 opacity-0"
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </a>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Swipe indicator */}
          {config?.swipeToClose && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              className="
                mt-6 pt-4 border-t border-[var(--color-border)]
                text-center text-xs text-[var(--color-text-muted)]
              "
            >
              {t('navigation.menu.swipeToClose')}
            </motion.div>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

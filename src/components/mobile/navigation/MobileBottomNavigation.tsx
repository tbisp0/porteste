/**
 * 🎯 NAVEGAÇÃO BOTTOM MOBILE
 * 
 * Navegação inferior estilo app mobile nativo
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MobileNavigationItem } from '../types';
import { useMobileDetection } from '../hooks/useMobileDetection';

interface MobileBottomNavigationProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  items: MobileNavigationItem[];
  className?: string;
}

export const MobileBottomNavigation: React.FC<MobileBottomNavigationProps> = ({
  activeSection,
  onNavigate,
  items,
  className = ''
}) => {
  const { t } = useTranslation();
  const { isMobileDevice, isPortrait } = useMobileDetection();

  // Só mostrar em mobile portrait
  if (!isMobileDevice || !isPortrait) {
    return null;
  }

  // Limitar a 5 itens máximo
  const displayItems = items.slice(0, 5);

  const handleItemClick = (item: MobileNavigationItem) => {
    if (item.disabled) return;
    onNavigate(item.sectionId);
  };

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`
        mobile-bottom-navigation
        bg-[var(--color-surface)]/95 backdrop-blur-lg
        border-t border-[var(--color-border)]
        px-2 py-2
        safe-area-inset-bottom
        ${className}
      `}
      role="navigation"
      aria-label={t('navigation.bottom.label')}
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {displayItems.map((item, index) => {
          const isActive = activeSection === item.sectionId;
          const isDisabled = item.disabled;

          return (
            <motion.button
              key={item.id}
              onClick={() => handleItemClick(item)}
              disabled={isDisabled}
              className={`
                relative flex flex-col items-center justify-center
                min-w-[60px] h-16 px-2 py-1
                rounded-lg transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
                ${isActive 
                  ? 'text-[var(--color-primary)]' 
                  : isDisabled
                    ? 'text-[var(--color-text-disabled)] cursor-not-allowed'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                }
                ${!isDisabled && 'active:scale-95'}
              `}
              whileHover={!isDisabled ? { scale: 1.05 } : undefined}
              whileTap={!isDisabled ? { scale: 0.95 } : undefined}
              aria-label={t(item.label)}
              aria-current={isActive ? 'page' : undefined}
            >
              {/* Background ativo */}
              {isActive && (
                <motion.div
                  layoutId="bottomNavActiveBackground"
                  className="absolute inset-0 bg-[var(--color-primary)]/10 rounded-lg"
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                />
              )}

              {/* Ícone */}
              <div className={`
                relative z-10 mb-1 transition-transform duration-200
                ${isActive ? 'scale-110' : ''}
              `}>
                {item.icon}
              </div>

              {/* Label */}
              <span className={`
                relative z-10 text-xs font-medium leading-tight
                max-w-full truncate
                ${isActive ? 'font-semibold' : ''}
              `}>
                {t(item.label)}
              </span>

              {/* Badge */}
              {item.badge && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="
                    absolute -top-1 -right-1 z-20
                    min-w-[18px] h-[18px] px-1
                    bg-[var(--color-error)] text-white
                    rounded-full flex items-center justify-center
                    text-xs font-bold
                  "
                >
                  {typeof item.badge === 'number' && item.badge > 99 ? '99+' : item.badge}
                </motion.div>
              )}

              {/* Indicador ativo */}
              {isActive && (
                <motion.div
                  layoutId="bottomNavActiveIndicator"
                  className="
                    absolute -top-2 left-1/2 transform -translate-x-1/2
                    w-1 h-1 bg-[var(--color-primary)] rounded-full
                  "
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Safe area para dispositivos com notch */}
      <div className="h-[env(safe-area-inset-bottom)] bg-[var(--color-surface)]" />
    </motion.nav>
  );
};

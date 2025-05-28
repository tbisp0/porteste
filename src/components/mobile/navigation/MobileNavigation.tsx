/**
 * 🎯 NAVEGAÇÃO MOBILE UNIFICADA
 * 
 * Sistema completo de navegação mobile com múltiplas opções
 */

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { User, Folder, Repeat, Mail, Home, Settings } from 'lucide-react';
import { useMobileDetection } from '../hooks/useMobileDetection';
import { useMobileGestures } from '../hooks/useMobileGestures';
import { MobileNavigationItem, MobileNavigationConfig } from '../types';
import { MobileMenuButton } from './MobileMenuButton';
import { MobileNavigationMenu } from './MobileNavigationMenu';
import { MobileBottomNavigation } from './MobileBottomNavigation';

// Itens de navegação padrão
const DEFAULT_NAV_ITEMS: MobileNavigationItem[] = [
  { 
    id: 'home', 
    label: 'navigation.home', 
    icon: <Home className="w-5 h-5" />, 
    href: '#home', 
    sectionId: 'home' 
  },
  { 
    id: 'profile', 
    label: 'navigation.profile', 
    icon: <User className="w-5 h-5" />, 
    href: '#perfil', 
    sectionId: 'perfil' 
  },
  { 
    id: 'projects', 
    label: 'navigation.projects', 
    icon: <Folder className="w-5 h-5" />, 
    href: '#projetos', 
    sectionId: 'projetos' 
  },
  { 
    id: 'backlog', 
    label: 'navigation.backlog', 
    icon: <Repeat className="w-5 h-5" />, 
    href: '#backlog', 
    sectionId: 'backlog' 
  },
  { 
    id: 'contact', 
    label: 'navigation.contact', 
    icon: <Mail className="w-5 h-5" />, 
    href: '#contato', 
    sectionId: 'contato' 
  }
];

interface MobileNavigationProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  items?: MobileNavigationItem[];
  config?: Partial<MobileNavigationConfig>;
  showBottomNav?: boolean;
  showSideMenu?: boolean;
  className?: string;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  activeSection,
  onNavigate,
  items = DEFAULT_NAV_ITEMS,
  config = {},
  showBottomNav = true,
  showSideMenu = true,
  className = ''
}) => {
  const { t } = useTranslation();
  const { isMobileDevice, isTabletDevice, orientation } = useMobileDetection();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  // Configuração padrão
  const navigationConfig: MobileNavigationConfig = {
    position: 'bottom',
    animation: 'slide',
    backdrop: true,
    swipeToClose: true,
    autoClose: true,
    ...config
  };

  // Gestos para fechar menu
  const { gestureRef } = useMobileGestures({
    onSwipeRight: () => {
      if (isMenuOpen && navigationConfig.swipeToClose) {
        setIsMenuOpen(false);
      }
    },
    onSwipeDown: () => {
      if (isMenuOpen && navigationConfig.swipeToClose && navigationConfig.position === 'top') {
        setIsMenuOpen(false);
      }
    },
    onSwipeUp: () => {
      if (isMenuOpen && navigationConfig.swipeToClose && navigationConfig.position === 'bottom') {
        setIsMenuOpen(false);
      }
    }
  });

  // Handlers
  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const handleConfigToggle = useCallback(() => {
    setIsConfigOpen(prev => !prev);
  }, []);

  const handleNavigate = useCallback((sectionId: string) => {
    onNavigate(sectionId);
    if (navigationConfig.autoClose) {
      setIsMenuOpen(false);
    }
  }, [onNavigate, navigationConfig.autoClose]);

  const handleMenuClose = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const handleConfigClose = useCallback(() => {
    setIsConfigOpen(false);
  }, []);

  // Não renderizar em desktop se não for necessário
  if (!isMobileDevice && !isTabletDevice) {
    return null;
  }

  // Determinar qual tipo de navegação mostrar
  const shouldShowBottomNav = showBottomNav && isMobileDevice && orientation === 'portrait';
  const shouldShowSideMenu = showSideMenu;

  return (
    <div className={`mobile-navigation ${className}`} ref={gestureRef}>
      {/* Menu Button (sempre visível em mobile) */}
      {shouldShowSideMenu && (
        <div className="fixed top-4 right-4 z-50 md:hidden">
          <MobileMenuButton
            isOpen={isMenuOpen}
            onClick={handleMenuToggle}
            className="shadow-lg"
          />
        </div>
      )}

      {/* Side Menu */}
      {shouldShowSideMenu && (
        <MobileNavigationMenu
          isOpen={isMenuOpen}
          onClose={handleMenuClose}
          activeSection={activeSection}
          onNavigate={handleNavigate}
          items={items}
          config={navigationConfig}
        />
      )}

      {/* Bottom Navigation */}
      {shouldShowBottomNav && (
        <MobileBottomNavigation
          activeSection={activeSection}
          onNavigate={handleNavigate}
          items={items.slice(0, 5)} // Máximo 5 itens no bottom nav
          className="fixed bottom-0 left-0 right-0 z-40"
        />
      )}

      {/* Config Button (canto superior esquerdo) */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <motion.button
          onClick={handleConfigToggle}
          className="
            flex items-center justify-center
            w-11 h-11 rounded-lg
            border border-[var(--color-border)]
            bg-[var(--color-surface)]
            shadow hover:shadow-lg
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
          "
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={t('navigation.settings.toggle')}
        >
          <Settings className="w-5 h-5 text-[var(--color-text)]" />
        </motion.button>
      </div>

      {/* Backdrop */}
      <AnimatePresence>
        {(isMenuOpen || isConfigOpen) && navigationConfig.backdrop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => {
              setIsMenuOpen(false);
              setIsConfigOpen(false);
            }}
          />
        )}
      </AnimatePresence>

      {/* Debug Info (apenas em desenvolvimento) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-20 left-4 z-50 bg-black/80 text-white p-2 rounded text-xs md:hidden">
          <div>Device: {isMobileDevice ? 'Mobile' : isTabletDevice ? 'Tablet' : 'Desktop'}</div>
          <div>Orientation: {orientation}</div>
          <div>Menu: {isMenuOpen ? 'Open' : 'Closed'}</div>
          <div>Bottom Nav: {shouldShowBottomNav ? 'Visible' : 'Hidden'}</div>
        </div>
      )}
    </div>
  );
};

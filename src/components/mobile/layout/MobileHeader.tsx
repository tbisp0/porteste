/**
 * 🎯 MOBILE HEADER
 *
 * Header otimizado para dispositivos mobile
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { User, Folder, Repeat, Mail, Menu, X, Settings, MessageCircle } from 'lucide-react';
import { useMobile } from '../providers/MobileProvider';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileHeaderProps {
  className?: string;
  showLogo?: boolean;
  showActions?: boolean;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  className = '',
  showLogo = true,
  showActions = true
}) => {
  const { t } = useTranslation();
  const { state, dispatch, isMobileDevice } = useMobile();
  const isMobile = useIsMobile();
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [scrolled, setScrolled] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  // Navigation items
  const navigationItems = [
    { href: '#perfil', icon: User, sectionId: 'perfil', label: t('navigation.profile') },
    { href: '#projetos', icon: Folder, sectionId: 'projetos', label: t('navigation.projects') },
    { href: '#backlog', icon: Repeat, sectionId: 'backlog', label: t('navigation.backlog') },
    { href: '#contato', icon: Mail, sectionId: 'contato', label: t('navigation.contact') }
  ];

  // Orientation detection
  useEffect(() => {
    const updateOrientation = () => {
      setOrientation(window.innerHeight > window.innerWidth ? 'portrait' : 'landscape');
    };

    updateOrientation();
    window.addEventListener('resize', updateOrientation);
    return () => window.removeEventListener('resize', updateOrientation);
  }, []);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Section detection
  useEffect(() => {
    const handleSectionChange = () => {
      const sections = ['perfil', 'projetos', 'backlog', 'contato'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom > 100;
        }
        return false;
      });

      if (currentSection && currentSection !== state.activeSection) {
        dispatch({ type: 'SET_ACTIVE_SECTION', payload: currentSection });
      }
    };

    window.addEventListener('scroll', handleSectionChange, { passive: true });
    return () => window.removeEventListener('scroll', handleSectionChange);
  }, [state.activeSection, dispatch]);

  const handleNavigation = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      dispatch({ type: 'SET_ACTIVE_SECTION', payload: sectionId });
      dispatch({ type: 'CLOSE_MENU' });
    }
  }, [dispatch]);

  const handleMenuToggle = useCallback(() => {
    dispatch({ type: 'TOGGLE_MENU' });
  }, [dispatch]);

  const handleConfigToggle = useCallback(() => {
    dispatch({ type: 'TOGGLE_CONFIG' });
  }, [dispatch]);

  if (!isMobileDevice) {
    return null;
  }

  return (
    <>
      {/* Mobile Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`
          fixed top-0 left-0 right-0 z-40
          ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}
          transition-all duration-300
          ${className}
        `}
        style={{
          paddingTop: 'env(safe-area-inset-top)',
          paddingLeft: 'env(safe-area-inset-left)',
          paddingRight: 'env(safe-area-inset-right)'
        }}
      >
        <div className="flex items-center justify-between px-4 py-3">
          {/* Config Button */}
          <motion.button
            onClick={handleConfigToggle}
            className="
              flex items-center justify-center
              w-10 h-10 rounded-lg
              bg-white/10 backdrop-blur-sm
              border border-white/20
              shadow-lg
              focus:outline-none focus:ring-2 focus:ring-blue-500
            "
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={t('navigation.settings.toggle')}
          >
            <Settings className="w-5 h-5 text-gray-700" />
          </motion.button>

          {/* Logo/Title */}
          {showLogo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 text-center"
            >
              <h1 className="text-lg font-semibold text-gray-900">
                Tarcisio Bispo
              </h1>
              <p className="text-xs text-gray-600">
                UX/Product Designer
              </p>
            </motion.div>
          )}

          {/* Menu Button */}
          <motion.button
            onClick={handleMenuToggle}
            className="
              flex items-center justify-center
              w-10 h-10 rounded-lg
              bg-white/10 backdrop-blur-sm
              border border-white/20
              shadow-lg
              focus:outline-none focus:ring-2 focus:ring-blue-500
            "
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={state.isMenuOpen ? t('common.close') : t('navigation.menu.toggle')}
          >
            <AnimatePresence mode="wait">
              {state.isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5 text-gray-700" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5 text-gray-700" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Quick Navigation (landscape mode) */}
        {orientation === 'landscape' && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 pb-2"
          >
            <div className="flex justify-center space-x-6">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = state.activeSection === item.sectionId;

                return (
                  <motion.button
                    key={item.sectionId}
                    onClick={() => handleNavigation(item.sectionId)}
                    className={`
                      flex flex-col items-center space-y-1 p-2 rounded-lg
                      transition-colors duration-200
                      ${isActive
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                      }
                    `}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-xs font-medium">{item.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.nav>
        )}
      </motion.header>

      {/* Spacer for fixed header */}
      <div
        className="h-16"
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      />
    </>
  );
};

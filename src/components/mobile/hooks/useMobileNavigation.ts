/**
 * 🎯 HOOK DE NAVEGAÇÃO MOBILE
 * 
 * Hook para gerenciar navegação mobile
 */

import { useState, useCallback } from 'react';
import { MobileNavigationState, MobileNavigationItem } from '../types';

const DEFAULT_ITEMS: MobileNavigationItem[] = [
  {
    id: 'perfil',
    label: 'navigation.profile',
    icon: null,
    href: '#perfil',
    sectionId: 'perfil'
  },
  {
    id: 'projetos',
    label: 'navigation.projects',
    icon: null,
    href: '#projetos',
    sectionId: 'projetos'
  },
  {
    id: 'backlog',
    label: 'navigation.backlog',
    icon: null,
    href: '#backlog',
    sectionId: 'backlog'
  },
  {
    id: 'contato',
    label: 'navigation.contact',
    icon: null,
    href: '#contato',
    sectionId: 'contato'
  }
];

export const useMobileNavigation = (initialItems: MobileNavigationItem[] = DEFAULT_ITEMS) => {
  const [state, setState] = useState<MobileNavigationState>({
    isOpen: false,
    activeSection: 'perfil',
    items: initialItems,
    isAnimating: false
  });

  const openMenu = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: true }));
  }, []);

  const closeMenu = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: false }));
  }, []);

  const toggleMenu = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: !prev.isOpen }));
  }, []);

  const setActiveSection = useCallback((sectionId: string) => {
    setState(prev => ({ ...prev, activeSection: sectionId }));
  }, []);

  const navigate = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  }, [setActiveSection]);

  const setAnimating = useCallback((isAnimating: boolean) => {
    setState(prev => ({ ...prev, isAnimating }));
  }, []);

  return {
    state,
    openMenu,
    closeMenu,
    toggleMenu,
    setActiveSection,
    navigate,
    setAnimating
  };
};

export default useMobileNavigation;

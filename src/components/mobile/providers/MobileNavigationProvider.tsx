/**
 * 🎯 MOBILE NAVIGATION PROVIDER
 * 
 * Provider para navegação mobile
 */

import React, { createContext, useContext } from 'react';
import { useMobileNavigation } from '../hooks/useMobileNavigation';
import { MobileNavigationProviderProps, MobileNavigationItem } from '../types';

interface MobileNavigationContextType {
  state: ReturnType<typeof useMobileNavigation>['state'];
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
  setActiveSection: (sectionId: string) => void;
  navigate: (sectionId: string) => void;
  setAnimating: (isAnimating: boolean) => void;
}

const MobileNavigationContext = createContext<MobileNavigationContextType | undefined>(undefined);

export const MobileNavigationProvider: React.FC<MobileNavigationProviderProps> = ({
  children,
  config,
  items
}) => {
  const navigation = useMobileNavigation(items);

  const value: MobileNavigationContextType = {
    ...navigation
  };

  return (
    <MobileNavigationContext.Provider value={value}>
      {children}
    </MobileNavigationContext.Provider>
  );
};

export const useMobileNavigationContext = (): MobileNavigationContextType => {
  const context = useContext(MobileNavigationContext);
  if (context === undefined) {
    throw new Error('useMobileNavigationContext must be used within a MobileNavigationProvider');
  }
  return context;
};

export default MobileNavigationProvider;

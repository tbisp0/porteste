/**
 * 🎯 MOBILE PROVIDER
 *
 * Context provider para gerenciar estado global mobile
 */

import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileState {
  isMenuOpen: boolean;
  isConfigOpen: boolean;
  activeSection: string;
  orientation: 'portrait' | 'landscape';
  isOnline: boolean;
  hasTouch: boolean;
}

interface MobileContextType {
  state: MobileState;
  dispatch: React.Dispatch<MobileAction>;
  isMobileDevice: boolean;
  isTabletDevice: boolean;
  isDesktopDevice: boolean;
}

type MobileAction =
  | { type: 'TOGGLE_MENU' }
  | { type: 'CLOSE_MENU' }
  | { type: 'TOGGLE_CONFIG' }
  | { type: 'CLOSE_CONFIG' }
  | { type: 'SET_ACTIVE_SECTION'; payload: string }
  | { type: 'SET_ORIENTATION'; payload: 'portrait' | 'landscape' }
  | { type: 'SET_ONLINE'; payload: boolean };

const initialState: MobileState = {
  isMenuOpen: false,
  isConfigOpen: false,
  activeSection: 'perfil',
  orientation: 'portrait',
  isOnline: true,
  hasTouch: false
};

function mobileReducer(state: MobileState, action: MobileAction): MobileState {
  switch (action.type) {
    case 'TOGGLE_MENU':
      return { ...state, isMenuOpen: !state.isMenuOpen, isConfigOpen: false };
    case 'CLOSE_MENU':
      return { ...state, isMenuOpen: false };
    case 'TOGGLE_CONFIG':
      return { ...state, isConfigOpen: !state.isConfigOpen, isMenuOpen: false };
    case 'CLOSE_CONFIG':
      return { ...state, isConfigOpen: false };
    case 'SET_ACTIVE_SECTION':
      return { ...state, activeSection: action.payload };
    case 'SET_ORIENTATION':
      return { ...state, orientation: action.payload };
    case 'SET_ONLINE':
      return { ...state, isOnline: action.payload };
    default:
      return state;
  }
}

const MobileContext = createContext<MobileContextType | undefined>(undefined);

interface MobileProviderProps {
  children: React.ReactNode;
}

export const MobileProvider: React.FC<MobileProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(mobileReducer, initialState);
  const isMobile = useIsMobile();
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [isOnline, setIsOnline] = useState(true);
  const [touchSupport, setTouchSupport] = useState(false);

  // Simple device detection based on screen width
  const isMobileDevice = isMobile;
  const isTabletDevice = !isMobile && window.innerWidth <= 1024;
  const isDesktopDevice = !isMobile && window.innerWidth > 1024;

  // Detect orientation
  useEffect(() => {
    const updateOrientation = () => {
      setOrientation(window.innerHeight > window.innerWidth ? 'portrait' : 'landscape');
    };

    updateOrientation();
    window.addEventListener('resize', updateOrientation);
    window.addEventListener('orientationchange', updateOrientation);

    return () => {
      window.removeEventListener('resize', updateOrientation);
      window.removeEventListener('orientationchange', updateOrientation);
    };
  }, []);

  // Detect online status
  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);

    updateOnlineStatus();
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  // Detect touch support
  useEffect(() => {
    setTouchSupport('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Sync orientation with state
  useEffect(() => {
    dispatch({ type: 'SET_ORIENTATION', payload: orientation });
  }, [orientation]);

  // Sync online status with state
  useEffect(() => {
    dispatch({ type: 'SET_ONLINE', payload: isOnline });
  }, [isOnline]);

  // Auto-close menus when switching to desktop
  useEffect(() => {
    if (isDesktopDevice && (state.isMenuOpen || state.isConfigOpen)) {
      dispatch({ type: 'CLOSE_MENU' });
      dispatch({ type: 'CLOSE_CONFIG' });
    }
  }, [isDesktopDevice, state.isMenuOpen, state.isConfigOpen]);

  const value: MobileContextType = {
    state: { ...state, hasTouch: touchSupport },
    dispatch,
    isMobileDevice,
    isTabletDevice,
    isDesktopDevice
  };

  return (
    <MobileContext.Provider value={value}>
      {children}
    </MobileContext.Provider>
  );
};

export const useMobile = (): MobileContextType => {
  const context = useContext(MobileContext);
  if (context === undefined) {
    throw new Error('useMobile must be used within a MobileProvider');
  }
  return context;
};

export default MobileProvider;

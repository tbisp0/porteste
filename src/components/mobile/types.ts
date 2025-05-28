/**
 * 🎯 TIPOS DO SISTEMA MOBILE
 * 
 * Definições TypeScript para o sistema mobile unificado
 */

import { ReactNode } from 'react';

// ===== BREAKPOINTS MOBILE =====
export type MobileBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface MobileBreakpoints {
  xs: number; // 0-479px (mobile pequeno)
  sm: number; // 480-767px (mobile grande)
  md: number; // 768-1023px (tablet)
  lg: number; // 1024-1279px (laptop)
  xl: number; // 1280px+ (desktop)
}

// ===== NAVEGAÇÃO MOBILE =====
export interface MobileNavigationItem {
  id: string;
  label: string;
  icon: ReactNode;
  href: string;
  sectionId: string;
  badge?: number | string;
  disabled?: boolean;
}

export interface MobileNavigationState {
  isOpen: boolean;
  activeSection: string;
  items: MobileNavigationItem[];
  isAnimating: boolean;
}

export interface MobileNavigationConfig {
  position: 'top' | 'bottom' | 'side';
  animation: 'slide' | 'fade' | 'scale';
  backdrop: boolean;
  swipeToClose: boolean;
  autoClose: boolean;
}

// ===== GESTOS E TOUCH =====
export type SwipeDirection = 'up' | 'down' | 'left' | 'right';

export interface TouchEventData {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  deltaX: number;
  deltaY: number;
  distance: number;
  direction: SwipeDirection;
  velocity: number;
  duration: number;
}

export interface SwipeGestureConfig {
  threshold: number; // Distância mínima para ativar
  velocity: number; // Velocidade mínima
  direction: SwipeDirection[];
  preventDefault: boolean;
  passive: boolean;
}

export interface MobileGestureConfig {
  swipe: SwipeGestureConfig;
  tap: {
    maxDistance: number;
    maxDuration: number;
  };
  longPress: {
    duration: number;
    threshold: number;
  };
  pinch: {
    threshold: number;
    enabled: boolean;
  };
}

// ===== ORIENTAÇÃO =====
export type MobileOrientation = 'portrait' | 'landscape';

export interface MobileOrientationState {
  orientation: MobileOrientation;
  angle: number;
  isChanging: boolean;
}

// ===== VIEWPORT =====
export interface MobileViewportState {
  width: number;
  height: number;
  breakpoint: MobileBreakpoint;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  devicePixelRatio: number;
  isRetina: boolean;
}

// ===== LAYOUT MOBILE =====
export interface MobileLayoutProps {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  navigation?: ReactNode;
  className?: string;
  fullHeight?: boolean;
  safeArea?: boolean;
  scrollable?: boolean;
}

export interface MobileHeaderProps {
  title?: string;
  leftAction?: ReactNode;
  rightAction?: ReactNode;
  centerAction?: ReactNode;
  transparent?: boolean;
  sticky?: boolean;
  className?: string;
}

export interface MobileFooterProps {
  children?: ReactNode;
  sticky?: boolean;
  safeArea?: boolean;
  className?: string;
}

// ===== COMPONENTES MOBILE =====
export interface MobileCardProps {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  className?: string;
}

export interface MobileModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'full';
  position?: 'center' | 'bottom' | 'top';
  backdrop?: boolean;
  swipeToClose?: boolean;
  className?: string;
}

export interface MobileSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  size?: 'sm' | 'md' | 'lg' | 'full';
  backdrop?: boolean;
  swipeToClose?: boolean;
  className?: string;
}

export interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  side?: 'left' | 'right';
  width?: string | number;
  backdrop?: boolean;
  swipeToClose?: boolean;
  className?: string;
}

// ===== CONFIGURAÇÃO =====
export interface MobileConfigState {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  soundEnabled: boolean;
  animationsEnabled: boolean;
  reducedMotion: boolean;
  highContrast: boolean;
  fontSize: 'sm' | 'md' | 'lg';
}

export interface MobileConfigMenuProps {
  isOpen: boolean;
  onClose: () => void;
  config: MobileConfigState;
  onConfigChange: (config: Partial<MobileConfigState>) => void;
}

// ===== ACESSIBILIDADE =====
export interface MobileAccessibilityState {
  screenReaderEnabled: boolean;
  highContrastEnabled: boolean;
  reducedMotionEnabled: boolean;
  largeTextEnabled: boolean;
  voiceOverEnabled: boolean;
}

export interface MobileAccessibilityMenuProps {
  isOpen: boolean;
  onClose: () => void;
  state: MobileAccessibilityState;
  onStateChange: (state: Partial<MobileAccessibilityState>) => void;
}

// ===== PROVIDERS =====
export interface MobileProviderProps {
  children: ReactNode;
  config?: Partial<MobileGestureConfig>;
  breakpoints?: Partial<MobileBreakpoints>;
}

export interface MobileNavigationProviderProps {
  children: ReactNode;
  config?: Partial<MobileNavigationConfig>;
  items?: MobileNavigationItem[];
}

// ===== EVENTOS =====
export interface MobileEventHandlers {
  onSwipe?: (data: TouchEventData) => void;
  onTap?: (event: TouchEvent) => void;
  onLongPress?: (event: TouchEvent) => void;
  onPinch?: (scale: number) => void;
  onOrientationChange?: (orientation: MobileOrientation) => void;
  onViewportChange?: (viewport: MobileViewportState) => void;
}

// ===== ANIMAÇÕES =====
export interface MobileAnimationConfig {
  duration: number;
  easing: string;
  stagger: number;
  reducedMotion: boolean;
}

export type MobileAnimationType = 
  | 'slideIn' 
  | 'slideOut' 
  | 'fadeIn' 
  | 'fadeOut' 
  | 'scaleIn' 
  | 'scaleOut' 
  | 'bounceIn' 
  | 'bounceOut';

// ===== PERFORMANCE =====
export interface MobilePerformanceConfig {
  lazyLoading: boolean;
  virtualScrolling: boolean;
  imageOptimization: boolean;
  prefetching: boolean;
  caching: boolean;
}

/**
 * 🎯 SISTEMA MOBILE UNIFICADO
 * 
 * Exportações centralizadas para todos os componentes mobile
 * Sistema modular e organizado
 */

// ===== NAVEGAÇÃO MOBILE =====
export { MobileNavigation } from './navigation/MobileNavigation';
export { MobileNavigationMenu } from './navigation/MobileNavigationMenu';
export { MobileMenuButton } from './navigation/MobileMenuButton';
export { MobileBottomNavigation } from './navigation/MobileBottomNavigation';

// ===== CONFIGURAÇÃO MOBILE =====
export { MobileConfigMenu } from './config/MobileConfigMenu';
export { MobileConfigButton } from './config/MobileConfigButton';
export { MobileSettings } from './config/MobileSettings';

// ===== ACESSIBILIDADE MOBILE =====
export { MobileAccessibilityMenu } from './accessibility/MobileAccessibilityMenu';
export { MobileAccessibilityButton } from './accessibility/MobileAccessibilityButton';

// ===== GESTOS E TOUCH =====
export { SwipeGestures } from './gestures/SwipeGestures';
export { TouchInteractions } from './gestures/TouchInteractions';
export { PullToRefresh } from './gestures/PullToRefresh';

// ===== LAYOUT MOBILE =====
export { MobileLayout } from './layout/MobileLayout';
export { MobileHeader } from './layout/MobileHeader';
export { MobileFooter } from './layout/MobileFooter';
export { MobileContainer } from './layout/MobileContainer';

// ===== COMPONENTES MOBILE =====
export { MobileCard } from './components/MobileCard';
export { MobileModal } from './components/MobileModal';
export { MobileSheet } from './components/MobileSheet';
export { MobileDrawer } from './components/MobileDrawer';

// ===== HOOKS MOBILE =====
export { useMobileDetection } from './hooks/useMobileDetection';
export { useMobileNavigation } from './hooks/useMobileNavigation';
export { useMobileGestures } from './hooks/useMobileGestures';
export { useMobileOrientation } from './hooks/useMobileOrientation';
export { useMobileViewport } from './hooks/useMobileViewport';

// ===== PROVIDERS =====
export { MobileProvider } from './providers/MobileProvider';
export { MobileNavigationProvider } from './providers/MobileNavigationProvider';

// ===== TIPOS =====
export type {
  MobileNavigationState,
  MobileGestureConfig,
  MobileBreakpoint,
  TouchEventData,
  SwipeDirection,
  MobileLayoutProps
} from './types';

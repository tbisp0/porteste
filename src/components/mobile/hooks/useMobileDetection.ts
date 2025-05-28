/**
 * 🎯 HOOK DE DETECÇÃO MOBILE
 * 
 * Hook avançado para detectar dispositivos mobile e suas características
 */

import { useState, useEffect, useCallback } from 'react';
import { MobileBreakpoint, MobileViewportState, MobileOrientation } from '../types';

// Breakpoints padrão
const DEFAULT_BREAKPOINTS = {
  xs: 479,   // Mobile pequeno
  sm: 767,   // Mobile grande
  md: 1023,  // Tablet
  lg: 1279,  // Laptop
  xl: 1920   // Desktop
};

export const useMobileDetection = () => {
  const [viewportState, setViewportState] = useState<MobileViewportState>({
    width: 0,
    height: 0,
    breakpoint: 'xs',
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    devicePixelRatio: 1,
    isRetina: false
  });

  const [orientation, setOrientation] = useState<MobileOrientation>('portrait');
  const [isOnline, setIsOnline] = useState(true);
  const [touchSupport, setTouchSupport] = useState(false);

  // Detectar breakpoint baseado na largura
  const getBreakpoint = useCallback((width: number): MobileBreakpoint => {
    if (width <= DEFAULT_BREAKPOINTS.xs) return 'xs';
    if (width <= DEFAULT_BREAKPOINTS.sm) return 'sm';
    if (width <= DEFAULT_BREAKPOINTS.md) return 'md';
    if (width <= DEFAULT_BREAKPOINTS.lg) return 'lg';
    return 'xl';
  }, []);

  // Detectar orientação
  const getOrientation = useCallback((): MobileOrientation => {
    if (typeof window === 'undefined') return 'portrait';
    
    // Usar screen.orientation se disponível
    if (screen.orientation) {
      return screen.orientation.angle === 0 || screen.orientation.angle === 180 
        ? 'portrait' 
        : 'landscape';
    }
    
    // Fallback para window dimensions
    return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
  }, []);

  // Detectar suporte a touch
  const detectTouchSupport = useCallback((): boolean => {
    if (typeof window === 'undefined') return false;
    
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      // @ts-ignore
      navigator.msMaxTouchPoints > 0
    );
  }, []);

  // Detectar tipo de dispositivo
  const detectDeviceType = useCallback(() => {
    if (typeof window === 'undefined') return { isMobile: false, isTablet: false, isDesktop: true };
    
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    const isTabletUA = /ipad|android(?!.*mobile)|tablet/i.test(userAgent);
    
    const width = window.innerWidth;
    const isMobileWidth = width <= DEFAULT_BREAKPOINTS.sm;
    const isTabletWidth = width > DEFAULT_BREAKPOINTS.sm && width <= DEFAULT_BREAKPOINTS.md;
    
    return {
      isMobile: isMobileUA || isMobileWidth,
      isTablet: isTabletUA || isTabletWidth,
      isDesktop: !isMobileUA && !isTabletUA && width > DEFAULT_BREAKPOINTS.md
    };
  }, []);

  // Atualizar estado do viewport
  const updateViewportState = useCallback(() => {
    if (typeof window === 'undefined') return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const breakpoint = getBreakpoint(width);
    const devicePixelRatio = window.devicePixelRatio || 1;
    const { isMobile, isTablet, isDesktop } = detectDeviceType();

    setViewportState({
      width,
      height,
      breakpoint,
      isMobile,
      isTablet,
      isDesktop,
      devicePixelRatio,
      isRetina: devicePixelRatio > 1
    });

    setOrientation(getOrientation());
  }, [getBreakpoint, getOrientation, detectDeviceType]);

  // Detectar conexão online/offline
  const updateOnlineStatus = useCallback(() => {
    setIsOnline(navigator.onLine);
  }, []);

  // Effect para configuração inicial
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Configuração inicial
    updateViewportState();
    setTouchSupport(detectTouchSupport());
    updateOnlineStatus();

    // Event listeners
    const handleResize = () => updateViewportState();
    const handleOrientationChange = () => {
      // Delay para aguardar a mudança completa
      setTimeout(updateViewportState, 100);
    };
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [updateViewportState, detectTouchSupport, updateOnlineStatus]);

  // Funções utilitárias
  const isBreakpoint = useCallback((breakpoint: MobileBreakpoint): boolean => {
    return viewportState.breakpoint === breakpoint;
  }, [viewportState.breakpoint]);

  const isBreakpointUp = useCallback((breakpoint: MobileBreakpoint): boolean => {
    const breakpoints: MobileBreakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl'];
    const currentIndex = breakpoints.indexOf(viewportState.breakpoint);
    const targetIndex = breakpoints.indexOf(breakpoint);
    return currentIndex >= targetIndex;
  }, [viewportState.breakpoint]);

  const isBreakpointDown = useCallback((breakpoint: MobileBreakpoint): boolean => {
    const breakpoints: MobileBreakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl'];
    const currentIndex = breakpoints.indexOf(viewportState.breakpoint);
    const targetIndex = breakpoints.indexOf(breakpoint);
    return currentIndex <= targetIndex;
  }, [viewportState.breakpoint]);

  // Detectar características específicas do dispositivo
  const deviceInfo = {
    isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent),
    isAndroid: /Android/.test(navigator.userAgent),
    isSafari: /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
    isChrome: /Chrome/.test(navigator.userAgent),
    isFirefox: /Firefox/.test(navigator.userAgent),
    isEdge: /Edge/.test(navigator.userAgent),
    hasNotch: false, // Pode ser detectado via CSS env(safe-area-inset-top)
    supportsWebP: false, // Pode ser detectado via feature detection
    supportsAvif: false, // Pode ser detectado via feature detection
  };

  return {
    // Estado do viewport
    ...viewportState,
    orientation,
    isOnline,
    touchSupport,
    
    // Informações do dispositivo
    deviceInfo,
    
    // Funções utilitárias
    isBreakpoint,
    isBreakpointUp,
    isBreakpointDown,
    
    // Helpers específicos
    isMobileDevice: viewportState.isMobile,
    isTabletDevice: viewportState.isTablet,
    isDesktopDevice: viewportState.isDesktop,
    isPortrait: orientation === 'portrait',
    isLandscape: orientation === 'landscape',
    isRetina: viewportState.isRetina,
    
    // Breakpoints específicos
    isXs: isBreakpoint('xs'),
    isSm: isBreakpoint('sm'),
    isMd: isBreakpoint('md'),
    isLg: isBreakpoint('lg'),
    isXl: isBreakpoint('xl'),
    
    // Breakpoints up/down
    isSmUp: isBreakpointUp('sm'),
    isMdUp: isBreakpointUp('md'),
    isLgUp: isBreakpointUp('lg'),
    isXlUp: isBreakpointUp('xl'),
    
    isXsDown: isBreakpointDown('xs'),
    isSmDown: isBreakpointDown('sm'),
    isMdDown: isBreakpointDown('md'),
    isLgDown: isBreakpointDown('lg'),
    
    // Atualização manual
    refresh: updateViewportState
  };
};

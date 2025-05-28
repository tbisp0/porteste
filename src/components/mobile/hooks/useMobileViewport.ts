/**
 * 🎯 HOOK DE VIEWPORT MOBILE
 * 
 * Hook para gerenciar viewport mobile
 */

import { useState, useEffect } from 'react';
import { MobileViewportState, MobileBreakpoint } from '../types';

const BREAKPOINTS = {
  xs: 479,
  sm: 767,
  md: 1023,
  lg: 1279,
  xl: 1920
};

export const useMobileViewport = () => {
  const [state, setState] = useState<MobileViewportState>({
    width: 0,
    height: 0,
    breakpoint: 'xs',
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    devicePixelRatio: 1,
    isRetina: false
  });

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const devicePixelRatio = window.devicePixelRatio || 1;

      let breakpoint: MobileBreakpoint = 'xs';
      if (width > BREAKPOINTS.xl) breakpoint = 'xl';
      else if (width > BREAKPOINTS.lg) breakpoint = 'lg';
      else if (width > BREAKPOINTS.md) breakpoint = 'md';
      else if (width > BREAKPOINTS.sm) breakpoint = 'sm';

      const isMobile = width <= BREAKPOINTS.sm;
      const isTablet = width > BREAKPOINTS.sm && width <= BREAKPOINTS.md;
      const isDesktop = width > BREAKPOINTS.md;

      setState({
        width,
        height,
        breakpoint,
        isMobile,
        isTablet,
        isDesktop,
        devicePixelRatio,
        isRetina: devicePixelRatio > 1
      });
    };

    // Initial update
    updateViewport();

    // Listen for resize
    window.addEventListener('resize', updateViewport);
    window.addEventListener('orientationchange', updateViewport);

    return () => {
      window.removeEventListener('resize', updateViewport);
      window.removeEventListener('orientationchange', updateViewport);
    };
  }, []);

  return state;
};

export default useMobileViewport;

/**
 * 🎯 HOOK DE ORIENTAÇÃO MOBILE
 * 
 * Hook para detectar mudanças de orientação
 */

import { useState, useEffect } from 'react';
import { MobileOrientation, MobileOrientationState } from '../types';

export const useMobileOrientation = () => {
  const [state, setState] = useState<MobileOrientationState>({
    orientation: 'portrait',
    angle: 0,
    isChanging: false
  });

  useEffect(() => {
    const getOrientation = (): MobileOrientation => {
      if (window.innerHeight > window.innerWidth) {
        return 'portrait';
      }
      return 'landscape';
    };

    const getAngle = (): number => {
      if (screen.orientation) {
        return screen.orientation.angle;
      }
      return 0;
    };

    const updateOrientation = () => {
      setState(prev => ({
        ...prev,
        isChanging: true
      }));

      // Delay to allow for smooth transition
      setTimeout(() => {
        setState({
          orientation: getOrientation(),
          angle: getAngle(),
          isChanging: false
        });
      }, 100);
    };

    // Initial state
    setState({
      orientation: getOrientation(),
      angle: getAngle(),
      isChanging: false
    });

    // Listen for orientation changes
    window.addEventListener('orientationchange', updateOrientation);
    window.addEventListener('resize', updateOrientation);

    return () => {
      window.removeEventListener('orientationchange', updateOrientation);
      window.removeEventListener('resize', updateOrientation);
    };
  }, []);

  return {
    ...state,
    isPortrait: state.orientation === 'portrait',
    isLandscape: state.orientation === 'landscape'
  };
};

export default useMobileOrientation;

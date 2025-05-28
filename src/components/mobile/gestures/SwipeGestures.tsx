/**
 * 🎯 SWIPE GESTURES
 * 
 * Componente para gestos de swipe
 */

import React, { useRef } from 'react';
import { useMobileGestures } from '../hooks/useMobileGestures';
import { SwipeDirection, TouchEventData } from '../types';

interface SwipeGesturesProps {
  children: React.ReactNode;
  onSwipe?: (data: TouchEventData) => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
  className?: string;
}

export const SwipeGestures: React.FC<SwipeGesturesProps> = ({
  children,
  onSwipe,
  onSwipeUp,
  onSwipeDown,
  onSwipeLeft,
  onSwipeRight,
  threshold = 50,
  className = ''
}) => {
  const { gestureRef } = useMobileGestures({
    onSwipe,
    onSwipeUp,
    onSwipeDown,
    onSwipeLeft,
    onSwipeRight
  }, {
    swipe: {
      threshold,
      velocity: 0.3,
      direction: ['up', 'down', 'left', 'right'],
      preventDefault: false,
      passive: true
    }
  });

  return (
    <div
      ref={gestureRef}
      className={`swipe-gestures ${className}`}
      style={{ touchAction: 'pan-y' }}
    >
      {children}
    </div>
  );
};

export default SwipeGestures;

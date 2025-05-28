/**
 * 🎯 TOUCH INTERACTIONS
 * 
 * Componente para interações touch
 */

import React from 'react';
import { useMobileGestures } from '../hooks/useMobileGestures';

interface TouchInteractionsProps {
  children: React.ReactNode;
  onTap?: (event: TouchEvent) => void;
  onLongPress?: (event: TouchEvent) => void;
  onPinch?: (scale: number) => void;
  className?: string;
}

export const TouchInteractions: React.FC<TouchInteractionsProps> = ({
  children,
  onTap,
  onLongPress,
  onPinch,
  className = ''
}) => {
  const { gestureRef } = useMobileGestures({
    onTap,
    onLongPress,
    onPinch
  });

  return (
    <div
      ref={gestureRef}
      className={`touch-interactions ${className}`}
    >
      {children}
    </div>
  );
};

export default TouchInteractions;

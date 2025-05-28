/**
 * 🎯 HOOK DE GESTOS MOBILE
 * 
 * Hook avançado para gestos touch: swipe, tap, long press, pinch
 */

import { useRef, useCallback, useEffect } from 'react';
import { TouchEventData, SwipeDirection, MobileGestureConfig } from '../types';

// Configuração padrão de gestos
const DEFAULT_CONFIG: MobileGestureConfig = {
  swipe: {
    threshold: 50,      // 50px mínimo para swipe
    velocity: 0.3,      // 0.3px/ms mínimo
    direction: ['up', 'down', 'left', 'right'],
    preventDefault: true,
    passive: false
  },
  tap: {
    maxDistance: 10,    // 10px máximo de movimento
    maxDuration: 300    // 300ms máximo
  },
  longPress: {
    duration: 500,      // 500ms para long press
    threshold: 10       // 10px máximo de movimento
  },
  pinch: {
    threshold: 0.1,     // 10% de mudança mínima
    enabled: true
  }
};

interface GestureHandlers {
  onSwipe?: (data: TouchEventData) => void;
  onSwipeUp?: (data: TouchEventData) => void;
  onSwipeDown?: (data: TouchEventData) => void;
  onSwipeLeft?: (data: TouchEventData) => void;
  onSwipeRight?: (data: TouchEventData) => void;
  onTap?: (event: TouchEvent) => void;
  onLongPress?: (event: TouchEvent) => void;
  onPinch?: (scale: number, event: TouchEvent) => void;
  onPinchStart?: (event: TouchEvent) => void;
  onPinchEnd?: (event: TouchEvent) => void;
}

export const useMobileGestures = (
  handlers: GestureHandlers = {},
  config: Partial<MobileGestureConfig> = {}
) => {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };
  const touchStartRef = useRef<Touch | null>(null);
  const touchStartTimeRef = useRef<number>(0);
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const initialPinchDistanceRef = useRef<number>(0);
  const isPinchingRef = useRef<boolean>(false);

  // Calcular distância entre dois pontos
  const getDistance = useCallback((touch1: Touch, touch2: Touch): number => {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }, []);

  // Calcular direção do swipe
  const getSwipeDirection = useCallback((deltaX: number, deltaY: number): SwipeDirection => {
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      return deltaX > 0 ? 'right' : 'left';
    } else {
      return deltaY > 0 ? 'down' : 'up';
    }
  }, []);

  // Criar dados do touch event
  const createTouchEventData = useCallback((
    startTouch: Touch,
    endTouch: Touch,
    duration: number
  ): TouchEventData => {
    const deltaX = endTouch.clientX - startTouch.clientX;
    const deltaY = endTouch.clientY - startTouch.clientY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const direction = getSwipeDirection(deltaX, deltaY);
    const velocity = distance / duration;

    return {
      startX: startTouch.clientX,
      startY: startTouch.clientY,
      endX: endTouch.clientX,
      endY: endTouch.clientY,
      deltaX,
      deltaY,
      distance,
      direction,
      velocity,
      duration
    };
  }, [getSwipeDirection]);

  // Handler para touch start
  const handleTouchStart = useCallback((event: TouchEvent) => {
    const touch = event.touches[0];
    touchStartRef.current = touch;
    touchStartTimeRef.current = Date.now();

    // Configurar long press timer
    if (handlers.onLongPress) {
      longPressTimerRef.current = setTimeout(() => {
        if (touchStartRef.current) {
          const currentTouch = event.touches[0];
          if (currentTouch) {
            const distance = Math.sqrt(
              Math.pow(currentTouch.clientX - touchStartRef.current.clientX, 2) +
              Math.pow(currentTouch.clientY - touchStartRef.current.clientY, 2)
            );
            
            if (distance <= mergedConfig.longPress.threshold) {
              handlers.onLongPress?.(event);
            }
          }
        }
      }, mergedConfig.longPress.duration);
    }

    // Detectar início de pinch
    if (event.touches.length === 2 && mergedConfig.pinch.enabled) {
      const touch1 = event.touches[0];
      const touch2 = event.touches[1];
      initialPinchDistanceRef.current = getDistance(touch1, touch2);
      isPinchingRef.current = true;
      handlers.onPinchStart?.(event);
    }
  }, [handlers, mergedConfig, getDistance]);

  // Handler para touch move
  const handleTouchMove = useCallback((event: TouchEvent) => {
    // Cancelar long press se houver movimento
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }

    // Detectar pinch
    if (event.touches.length === 2 && isPinchingRef.current && mergedConfig.pinch.enabled) {
      const touch1 = event.touches[0];
      const touch2 = event.touches[1];
      const currentDistance = getDistance(touch1, touch2);
      const scale = currentDistance / initialPinchDistanceRef.current;
      
      if (Math.abs(scale - 1) >= mergedConfig.pinch.threshold) {
        handlers.onPinch?.(scale, event);
      }
    }

    // Prevenir scroll se configurado
    if (mergedConfig.swipe.preventDefault) {
      event.preventDefault();
    }
  }, [handlers, mergedConfig, getDistance]);

  // Handler para touch end
  const handleTouchEnd = useCallback((event: TouchEvent) => {
    // Limpar long press timer
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }

    // Finalizar pinch
    if (isPinchingRef.current) {
      isPinchingRef.current = false;
      handlers.onPinchEnd?.(event);
      return;
    }

    const touch = event.changedTouches[0];
    const startTouch = touchStartRef.current;
    
    if (!startTouch) return;

    const endTime = Date.now();
    const duration = endTime - touchStartTimeRef.current;
    const touchData = createTouchEventData(startTouch, touch, duration);

    // Detectar tap
    if (
      touchData.distance <= mergedConfig.tap.maxDistance &&
      duration <= mergedConfig.tap.maxDuration
    ) {
      handlers.onTap?.(event);
      return;
    }

    // Detectar swipe
    if (
      touchData.distance >= mergedConfig.swipe.threshold &&
      touchData.velocity >= mergedConfig.swipe.velocity &&
      mergedConfig.swipe.direction.includes(touchData.direction)
    ) {
      // Chamar handler geral de swipe
      handlers.onSwipe?.(touchData);

      // Chamar handler específico da direção
      switch (touchData.direction) {
        case 'up':
          handlers.onSwipeUp?.(touchData);
          break;
        case 'down':
          handlers.onSwipeDown?.(touchData);
          break;
        case 'left':
          handlers.onSwipeLeft?.(touchData);
          break;
        case 'right':
          handlers.onSwipeRight?.(touchData);
          break;
      }
    }

    // Reset
    touchStartRef.current = null;
  }, [handlers, mergedConfig, createTouchEventData]);

  // Função para adicionar listeners a um elemento
  const addGestureListeners = useCallback((element: HTMLElement) => {
    const options = {
      passive: mergedConfig.swipe.passive,
      capture: false
    };

    element.addEventListener('touchstart', handleTouchStart, options);
    element.addEventListener('touchmove', handleTouchMove, options);
    element.addEventListener('touchend', handleTouchEnd, options);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd, mergedConfig.swipe.passive]);

  // Hook para usar com ref
  const gestureRef = useCallback((element: HTMLElement | null) => {
    if (!element) return;
    return addGestureListeners(element);
  }, [addGestureListeners]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
      }
    };
  }, []);

  return {
    gestureRef,
    addGestureListeners,
    config: mergedConfig,
    
    // Estado atual
    isLongPressing: longPressTimerRef.current !== null,
    isPinching: isPinchingRef.current,
    
    // Utilitários
    getDistance,
    getSwipeDirection,
    createTouchEventData
  };
};

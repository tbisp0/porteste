/**
 * 🎯 HOOK PARA ANIMAÇÕES DE MODAIS
 *
 * Hook para gerenciar animações de modais
 * Suporte a diferentes tipos de animação e responsividade
 */

import { useMemo } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { ModalAnimationConfig, ModalVariant } from '../types';
import { getModalAnimation, getResponsiveAnimation } from '../utils/animations';

interface UseModalAnimationProps {
  variant?: ModalVariant;
  customAnimation?: ModalAnimationConfig;
  respectReducedMotion?: boolean;
}

interface UseModalAnimationReturn {
  animation: ModalAnimationConfig;
  shouldAnimate: boolean;
}

export const useModalAnimation = ({
  variant = 'default',
  customAnimation,
  respectReducedMotion = true
}: UseModalAnimationProps = {}): UseModalAnimationReturn => {

  const isMobile = useIsMobile();

  // Hook para detectar preferência de movimento reduzido
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const animation = useMemo(() => {
    // Se o usuário prefere movimento reduzido e devemos respeitar
    if (respectReducedMotion && prefersReducedMotion) {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.1 }
      };
    }

    // Se há animação customizada, usar ela
    if (customAnimation) {
      return customAnimation;
    }

    // Se é mobile, usar animação responsiva
    if (isMobile) {
      return getResponsiveAnimation(true);
    }

    // Usar animação baseada na variante
    return getModalAnimation(variant);
  }, [variant, customAnimation, isMobile, prefersReducedMotion, respectReducedMotion]);

  const shouldAnimate = useMemo(() => {
    return !(respectReducedMotion && prefersReducedMotion);
  }, [respectReducedMotion, prefersReducedMotion]);

  return {
    animation,
    shouldAnimate
  };
};

/**
 * 🎯 ANIMAÇÕES PARA MODAIS
 * 
 * Configurações de animação padronizadas
 * Otimizadas para performance e acessibilidade
 */

import { ModalAnimationConfig } from '../types';

// Easing personalizado para suavidade
const customEasing = [0.16, 1, 0.3, 1];

export const modalAnimations = {
  // Slide up from bottom (padrão)
  slideUp: {
    initial: { 
      opacity: 0, 
      y: 20, 
      scale: 0.95 
    },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1 
    },
    exit: { 
      opacity: 0, 
      y: 20, 
      scale: 0.95 
    },
    transition: { 
      duration: 0.2, 
      ease: customEasing 
    }
  } as ModalAnimationConfig,

  // Fade in (simples)
  fade: {
    initial: { 
      opacity: 0 
    },
    animate: { 
      opacity: 1 
    },
    exit: { 
      opacity: 0 
    },
    transition: { 
      duration: 0.15 
    }
  } as ModalAnimationConfig,

  // Scale in (dramático)
  scale: {
    initial: { 
      opacity: 0, 
      scale: 0.8 
    },
    animate: { 
      opacity: 1, 
      scale: 1 
    },
    exit: { 
      opacity: 0, 
      scale: 0.8 
    },
    transition: { 
      duration: 0.25, 
      ease: customEasing 
    }
  } as ModalAnimationConfig,

  // Slide from right (mobile)
  slideRight: {
    initial: { 
      opacity: 0, 
      x: '100%' 
    },
    animate: { 
      opacity: 1, 
      x: 0 
    },
    exit: { 
      opacity: 0, 
      x: '100%' 
    },
    transition: { 
      duration: 0.3, 
      ease: customEasing 
    }
  } as ModalAnimationConfig,

  // Bounce (feedback positivo)
  bounce: {
    initial: { 
      opacity: 0, 
      scale: 0.3 
    },
    animate: { 
      opacity: 1, 
      scale: 1 
    },
    exit: { 
      opacity: 0, 
      scale: 0.3 
    },
    transition: { 
      duration: 0.4,
      type: "spring",
      damping: 15,
      stiffness: 300
    }
  } as ModalAnimationConfig
};

// Animações específicas por tipo de modal
export const getModalAnimation = (variant: string): ModalAnimationConfig => {
  switch (variant) {
    case 'success':
      return modalAnimations.bounce;
    case 'error':
    case 'warning':
      return modalAnimations.scale;
    case 'feedback':
      return modalAnimations.slideUp;
    default:
      return modalAnimations.slideUp;
  }
};

// Animações responsivas
export const getResponsiveAnimation = (isMobile: boolean): ModalAnimationConfig => {
  return isMobile ? modalAnimations.slideRight : modalAnimations.slideUp;
};

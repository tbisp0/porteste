/**
 * 🎯 SISTEMA DE MODAIS MODULAR
 * 
 * Exportações centralizadas para todos os modais
 * Baseado no design system unificado
 */

// Base Modal Components
export { BaseModal } from './BaseModal';
export { FeedbackModal } from './FeedbackModal';
export { ConfirmModal } from './ConfirmModal';

// Types
export type { 
  BaseModalProps,
  FeedbackModalProps,
  ConfirmModalProps,
  ModalVariant,
  ModalSize
} from './types';

// Hooks
export { useModal } from './hooks/useModal';
export { useModalAnimation } from './hooks/useModalAnimation';

// Utils
export { modalAnimations } from './utils/animations';
export { modalThemes } from './utils/themes';

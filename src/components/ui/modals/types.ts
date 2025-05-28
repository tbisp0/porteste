/**
 * 🎯 TIPOS PARA SISTEMA DE MODAIS
 */

import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

// Variantes de modal
export type ModalVariant = 
  | 'default'
  | 'feedback'
  | 'confirm'
  | 'alert'
  | 'success'
  | 'error'
  | 'warning';

// Tamanhos de modal
export type ModalSize = 
  | 'sm'    // 400px
  | 'md'    // 500px
  | 'lg'    // 600px
  | 'xl'    // 800px
  | 'full'; // 90vw

// Props base para todos os modais
export interface BaseModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: ReactNode;
  variant?: ModalVariant;
  size?: ModalSize;
  className?: string;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  initialFocus?: React.RefObject<HTMLElement>;
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

// Props específicos do FeedbackModal
export interface FeedbackModalProps extends Omit<BaseModalProps, 'children'> {
  section?: string;
  onSubmitSuccess?: () => void;
  onSubmitError?: (error: Error) => void;
}

// Props específicos do ConfirmModal
export interface ConfirmModalProps extends BaseModalProps {
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmVariant?: 'primary' | 'danger' | 'success';
  icon?: LucideIcon;
  loading?: boolean;
}

// Tipos para animações
export interface ModalAnimationConfig {
  initial: object;
  animate: object;
  exit: object;
  transition: object;
}

// Tipos para temas
export interface ModalTheme {
  background: string;
  border: string;
  text: string;
  overlay: string;
}

/**
 * 🎯 TEMAS PARA MODAIS
 * 
 * Sistema de cores unificado para modais
 * Suporte completo ao modo escuro
 */

import { ModalTheme, ModalVariant } from '../types';

// Tema base para modo claro
const lightTheme: Record<ModalVariant, ModalTheme> = {
  default: {
    background: 'bg-white',
    border: 'border-gray-200',
    text: 'text-gray-900',
    overlay: 'bg-black/30'
  },
  feedback: {
    background: 'bg-white',
    border: 'border-blue-200',
    text: 'text-gray-900',
    overlay: 'bg-black/30'
  },
  confirm: {
    background: 'bg-white',
    border: 'border-yellow-200',
    text: 'text-gray-900',
    overlay: 'bg-black/30'
  },
  alert: {
    background: 'bg-white',
    border: 'border-orange-200',
    text: 'text-gray-900',
    overlay: 'bg-black/30'
  },
  success: {
    background: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-900',
    overlay: 'bg-black/30'
  },
  error: {
    background: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-900',
    overlay: 'bg-black/30'
  },
  warning: {
    background: 'bg-yellow-50',
    border: 'border-yellow-200',
    text: 'text-yellow-900',
    overlay: 'bg-black/30'
  }
};

// Tema para modo escuro
const darkTheme: Record<ModalVariant, ModalTheme> = {
  default: {
    background: 'dark:bg-gray-800',
    border: 'dark:border-gray-700',
    text: 'dark:text-gray-100',
    overlay: 'bg-black/50'
  },
  feedback: {
    background: 'dark:bg-gray-800',
    border: 'dark:border-blue-800',
    text: 'dark:text-gray-100',
    overlay: 'bg-black/50'
  },
  confirm: {
    background: 'dark:bg-gray-800',
    border: 'dark:border-yellow-800',
    text: 'dark:text-gray-100',
    overlay: 'bg-black/50'
  },
  alert: {
    background: 'dark:bg-gray-800',
    border: 'dark:border-orange-800',
    text: 'dark:text-gray-100',
    overlay: 'bg-black/50'
  },
  success: {
    background: 'dark:bg-green-900/20',
    border: 'dark:border-green-800',
    text: 'dark:text-green-100',
    overlay: 'bg-black/50'
  },
  error: {
    background: 'dark:bg-red-900/20',
    border: 'dark:border-red-800',
    text: 'dark:text-red-100',
    overlay: 'bg-black/50'
  },
  warning: {
    background: 'dark:bg-yellow-900/20',
    border: 'dark:border-yellow-800',
    text: 'dark:text-yellow-100',
    overlay: 'bg-black/50'
  }
};

// Função para obter tema combinado (light + dark)
export const getModalTheme = (variant: ModalVariant): string => {
  const light = lightTheme[variant];
  const dark = darkTheme[variant];
  
  return [
    light.background,
    dark.background,
    light.border,
    dark.border,
    light.text,
    dark.text
  ].join(' ');
};

// Função para obter overlay theme
export const getOverlayTheme = (variant: ModalVariant): string => {
  return lightTheme[variant].overlay;
};

// Export dos temas para uso direto
export const modalThemes = {
  light: lightTheme,
  dark: darkTheme,
  getModalTheme,
  getOverlayTheme
};

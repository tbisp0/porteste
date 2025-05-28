/**
 * 🎯 HOOK PARA GERENCIAR MODAIS
 * 
 * Hook personalizado para controlar estado de modais
 * Inclui funcionalidades de abertura, fechamento e reset
 */

import { useState, useCallback } from 'react';

interface UseModalReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  reset: () => void;
}

export const useModal = (initialState: boolean = false): UseModalReturn => {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const reset = useCallback(() => {
    setIsOpen(initialState);
  }, [initialState]);

  return {
    isOpen,
    open,
    close,
    toggle,
    reset
  };
};

// Hook específico para múltiplos modais
interface UseMultipleModalsReturn {
  modals: Record<string, boolean>;
  openModal: (modalName: string) => void;
  closeModal: (modalName: string) => void;
  toggleModal: (modalName: string) => void;
  closeAllModals: () => void;
  isAnyModalOpen: boolean;
}

export const useMultipleModals = (modalNames: string[]): UseMultipleModalsReturn => {
  const initialState = modalNames.reduce((acc, name) => {
    acc[name] = false;
    return acc;
  }, {} as Record<string, boolean>);

  const [modals, setModals] = useState(initialState);

  const openModal = useCallback((modalName: string) => {
    setModals(prev => ({ ...prev, [modalName]: true }));
  }, []);

  const closeModal = useCallback((modalName: string) => {
    setModals(prev => ({ ...prev, [modalName]: false }));
  }, []);

  const toggleModal = useCallback((modalName: string) => {
    setModals(prev => ({ ...prev, [modalName]: !prev[modalName] }));
  }, []);

  const closeAllModals = useCallback(() => {
    setModals(initialState);
  }, [initialState]);

  const isAnyModalOpen = Object.values(modals).some(Boolean);

  return {
    modals,
    openModal,
    closeModal,
    toggleModal,
    closeAllModals,
    isAnyModalOpen
  };
};

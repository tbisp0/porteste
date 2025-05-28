import { useCallback } from 'react';
import Clarity from '@microsoft/clarity';

export const useClarity = () => {
  // Função para registrar eventos personalizados
  const trackEvent = useCallback((eventName: string) => {
    if (import.meta.env.PROD) {
      try {
        Clarity.event(eventName);
        // Clarity event tracked successfully
      } catch (error) {
        console.error('Failed to track Clarity event:', error);
      }
    }
  }, []);

  // Função para adicionar tags personalizadas
  const setTag = useCallback((key: string, value: string | string[]) => {
    if (import.meta.env.PROD) {
      try {
        Clarity.setTag(key, value);
        // Clarity tag set successfully
      } catch (error) {
        console.error('Failed to set Clarity tag:', error);
      }
    }
  }, []);

  // Função para identificar usuário/sessão
  const identify = useCallback((
    customId: string,
    customSessionId?: string,
    customPageId?: string,
    friendlyName?: string
  ) => {
    if (import.meta.env.PROD) {
      try {
        Clarity.identify(customId, customSessionId, customPageId, friendlyName);
        // Clarity user identified successfully
      } catch (error) {
        console.error('Failed to identify Clarity user:', error);
      }
    }
  }, []);

  // Função para upgrade de sessão (priorizar gravação)
  const upgradeSession = useCallback((reason: string) => {
    if (import.meta.env.PROD) {
      try {
        Clarity.upgrade(reason);
        // Clarity session upgraded successfully
      } catch (error) {
        console.error('Failed to upgrade Clarity session:', error);
      }
    }
  }, []);

  return {
    trackEvent,
    setTag,
    identify,
    upgradeSession
  };
};

/**
 * 🎯 HOOK DE TRADUÇÃO COM FALLBACK
 * 
 * Hook personalizado para traduções com fallbacks robustos
 * Garante que sempre há um texto válido exibido
 */

import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

// Fallbacks padrão por categoria
const DEFAULT_FALLBACKS = {
  // Common
  'common.close': 'Fechar',
  'common.open': 'Abrir',
  'common.save': 'Salvar',
  'common.cancel': 'Cancelar',
  'common.confirm': 'Confirmar',
  'common.yes': 'Sim',
  'common.no': 'Não',
  'common.loading': 'Carregando...',
  'common.error': 'Erro',
  'common.success': 'Sucesso',
  'common.warning': 'Aviso',
  'common.info': 'Informação',
  
  // Feedback
  'feedback.title': 'Feedback',
  'feedback.close': 'Fechar',
  'feedback.back': 'Voltar',
  'feedback.send': 'Enviar',
  'feedback.sending': 'Enviando...',
  'feedback.problem': 'Reportar Problema',
  'feedback.idea': 'Compartilhar Ideia',
  'feedback.praise': 'Dar Elogio',
  'feedback.defaultTitle': 'Enviar Feedback',
  'feedback.defaultPlaceholder': 'Compartilhe seu feedback...',
  'feedback.validation.messageRequired': 'Mensagem é obrigatória',
  'feedback.validation.messageMinLength': 'Mínimo 5 caracteres',
  'feedback.status.success': 'Obrigado pelo seu feedback!',
  'feedback.status.error': 'Erro ao enviar feedback. Tente novamente.',
  
  // Profile
  'profile.name': 'Tarcisio Bispo de Araujo',
  'profile.bio': 'UX/Product Designer especializado em estratégia, impacto e experiência do usuário.',
  'profile.letsChat': 'Vamos Conversar',
  'profile.hero.greeting': 'Olá, eu sou',
  'profile.hero.roles.uxDesigner': 'UX Designer',
  'profile.hero.roles.productDesigner': 'Product Designer',
  'profile.hero.roles.designStrategist': 'Design Strategist',
  'profile.hero.roles.interactionDesigner': 'Interaction Designer',
  
  // Navigation
  'navigation.home': 'Início',
  'navigation.about': 'Sobre',
  'navigation.projects': 'Projetos',
  'navigation.contact': 'Contato',
  'navigation.backlog': 'Backlog',
  
  // Theme
  'theme.toggle': 'Alternar Tema',
  'theme.light': 'Modo Claro',
  'theme.dark': 'Modo Escuro',
  'theme.changed': 'Tema alterado',
  
  // Sound
  'sound.enabled': 'Som Ativado',
  'sound.disabled': 'Som Desativado',
  'sound.toggle': 'Alternar Som',
  
  // Language
  'language.changed': 'Idioma alterado',
  
  // Tooltips
  'tooltips.theme.light': 'Mudar para modo claro',
  'tooltips.theme.dark': 'Mudar para modo escuro',
  'tooltips.language.switch': 'Alterar idioma',
  'tooltips.sound.enable': 'Ativar som',
  'tooltips.sound.disable': 'Desativar som'
};

export interface UseTranslationWithFallbackOptions {
  fallbackLanguage?: string;
  enableLogging?: boolean;
  customFallbacks?: Record<string, string>;
}

export const useTranslationWithFallback = (
  options: UseTranslationWithFallbackOptions = {}
) => {
  const { 
    fallbackLanguage = 'pt-BR',
    enableLogging = false,
    customFallbacks = {}
  } = options;
  
  const { t, i18n } = useTranslation();
  
  // Combinar fallbacks padrão com customizados
  const allFallbacks = useMemo(() => ({
    ...DEFAULT_FALLBACKS,
    ...customFallbacks
  }), [customFallbacks]);
  
  /**
   * Função de tradução com fallback robusto
   */
  const tWithFallback = (
    key: string, 
    options?: any,
    customFallback?: string
  ): string => {
    try {
      // Tentar tradução normal
      const result = t(key, options);
      
      // Se a tradução existe e é válida
      if (result && result !== key && typeof result === 'string') {
        return result;
      }
      
      // Se não existe, tentar fallback customizado
      if (customFallback) {
        if (enableLogging) {
          console.warn(`Translation missing for "${key}", using custom fallback: "${customFallback}"`);
        }
        return customFallback;
      }
      
      // Tentar fallback padrão
      if (allFallbacks[key]) {
        if (enableLogging) {
          console.warn(`Translation missing for "${key}", using default fallback: "${allFallbacks[key]}"`);
        }
        return allFallbacks[key];
      }
      
      // Tentar fallback de idioma
      if (i18n.language !== fallbackLanguage) {
        try {
          const fallbackResult = i18n.getFixedT(fallbackLanguage)(key, options);
          if (fallbackResult && fallbackResult !== key) {
            if (enableLogging) {
              console.warn(`Translation missing for "${key}" in ${i18n.language}, using ${fallbackLanguage} fallback`);
            }
            return fallbackResult;
          }
        } catch (error) {
          if (enableLogging) {
            console.warn(`Fallback language ${fallbackLanguage} also failed for "${key}"`);
          }
        }
      }
      
      // Último recurso: retornar a chave formatada
      const formattedKey = key.split('.').pop() || key;
      const humanReadable = formattedKey
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase());
      
      if (enableLogging) {
        console.error(`No translation found for "${key}", using formatted key: "${humanReadable}"`);
      }
      
      return humanReadable;
      
    } catch (error) {
      if (enableLogging) {
        console.error(`Translation error for "${key}":`, error);
      }
      
      // Em caso de erro, retornar fallback de emergência
      return customFallback || allFallbacks[key] || key;
    }
  };
  
  /**
   * Verificar se uma tradução existe
   */
  const hasTranslation = (key: string): boolean => {
    try {
      const result = t(key);
      return result && result !== key && typeof result === 'string';
    } catch {
      return false;
    }
  };
  
  /**
   * Obter tradução com informações de debug
   */
  const getTranslationInfo = (key: string) => {
    const translation = tWithFallback(key);
    const exists = hasTranslation(key);
    const isFallback = !exists;
    const fallbackType = isFallback 
      ? (allFallbacks[key] ? 'default' : 'formatted')
      : 'none';
    
    return {
      key,
      translation,
      exists,
      isFallback,
      fallbackType,
      language: i18n.language
    };
  };
  
  /**
   * Tradução de arrays com fallback
   */
  const tArray = (key: string, fallback: string[] = []): string[] => {
    try {
      const result = t(key, { returnObjects: true });
      if (Array.isArray(result)) {
        return result;
      }
      return fallback;
    } catch {
      return fallback;
    }
  };
  
  /**
   * Tradução de objetos com fallback
   */
  const tObject = (key: string, fallback: Record<string, any> = {}): Record<string, any> => {
    try {
      const result = t(key, { returnObjects: true });
      if (typeof result === 'object' && result !== null && !Array.isArray(result)) {
        return result;
      }
      return fallback;
    } catch {
      return fallback;
    }
  };
  
  return {
    t: tWithFallback,
    tOriginal: t,
    tArray,
    tObject,
    hasTranslation,
    getTranslationInfo,
    i18n,
    currentLanguage: i18n.language,
    isReady: i18n.isInitialized,
    fallbacks: allFallbacks
  };
};

export default useTranslationWithFallback;

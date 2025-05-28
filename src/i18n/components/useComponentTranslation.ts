/**
 * 🎯 HOOK DE TRADUÇÃO POR COMPONENTE
 * 
 * Hook especializado para traduções de componentes específicos
 * Inclui fallbacks e validação automática
 */

import { useTranslationWithFallback } from '../hooks/useTranslationWithFallback';

export interface ComponentTranslationConfig {
  component: string;
  namespace?: string;
  fallbacks?: Record<string, string>;
  enableLogging?: boolean;
}

export const useComponentTranslation = (config: ComponentTranslationConfig) => {
  const { component, namespace, fallbacks = {}, enableLogging = false } = config;
  
  const { t, hasTranslation, getTranslationInfo, ...rest } = useTranslationWithFallback({
    enableLogging,
    customFallbacks: fallbacks
  });
  
  /**
   * Tradução com prefixo do componente
   */
  const tc = (key: string, options?: any, customFallback?: string): string => {
    const fullKey = namespace ? `${namespace}.${key}` : `${component}.${key}`;
    return t(fullKey, options, customFallback);
  };
  
  /**
   * Verificar se tradução do componente existe
   */
  const hasComponentTranslation = (key: string): boolean => {
    const fullKey = namespace ? `${namespace}.${key}` : `${component}.${key}`;
    return hasTranslation(fullKey);
  };
  
  /**
   * Obter informações de tradução do componente
   */
  const getComponentTranslationInfo = (key: string) => {
    const fullKey = namespace ? `${namespace}.${key}` : `${component}.${key}`;
    return getTranslationInfo(fullKey);
  };
  
  /**
   * Validar todas as chaves do componente
   */
  const validateComponentTranslations = (requiredKeys: string[]) => {
    const results = requiredKeys.map(key => ({
      key,
      ...getComponentTranslationInfo(key)
    }));
    
    const missing = results.filter(r => !r.exists);
    const coverage = ((results.length - missing.length) / results.length) * 100;
    
    return {
      isValid: missing.length === 0,
      coverage: Math.round(coverage * 100) / 100,
      missing: missing.map(m => m.key),
      results
    };
  };
  
  return {
    t: tc,
    tGlobal: t,
    hasTranslation: hasComponentTranslation,
    getTranslationInfo: getComponentTranslationInfo,
    validateTranslations: validateComponentTranslations,
    component,
    namespace,
    ...rest
  };
};

import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from '@/lib/i18n';

export const useLanguage = () => {
  const { i18n } = useTranslation();
  
  const changeLanguage = useCallback((language: SupportedLanguage) => {
    return i18n.changeLanguage(language);
  }, [i18n]);
  
  const currentLanguage = i18n.language as SupportedLanguage;
  
  // Retorna a lista de idiomas suportados com seus nomes nativos
  const getLanguageOptions = () => {
    return [
      { code: 'pt-BR', name: 'Português' },
      { code: 'en-US', name: 'English' },
      { code: 'es', name: 'Español' }
    ];
  };
  
  return {
    currentLanguage,
    changeLanguage,
    languageOptions: getLanguageOptions(),
    isLanguageSupported: (lang: string): lang is SupportedLanguage => {
      return SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage);
    }
  };
};

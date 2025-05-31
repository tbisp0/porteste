import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { apiService } from './api';

// Idiomas suportados
export const SUPPORTED_LANGUAGES = ['pt-BR', 'en-US', 'es'] as const;
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

// Configuração padrão do i18n
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'pt-BR',
    supportedLngs: SUPPORTED_LANGUAGES,
    interpolation: {
      escapeValue: false, // React já escapa valores por padrão
    },
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
      // Função customizada para carregar traduções da API quando necessário
      request: async (options, url, payload, callback) => {
        try {
          // Extrair o idioma da URL
          const langMatch = url.match(/\/locales\/([^/]+)\//);
          if (!langMatch) {
            return callback(new Error('Invalid language path'), null);
          }

          const lang = langMatch[1];

          // Carregar traduções da API
          const response = await apiService.getTranslations(lang);
          callback(null, response.data);
  } catch (error) {
          console.error('Error loading translations:', error);
          callback(error, null);
  }
      }
    },
    
    react: {
      useSuspense: false,
    },
  });

// Função para mudar o idioma manualmente
export const changeLanguage = async (language: SupportedLanguage): Promise<typeof i18n> => {
  return i18n.changeLanguage(language) as unknown as typeof i18n;
};

// Função para verificar se um idioma é suportado
export const isSupportedLanguage = (lang: string): lang is SupportedLanguage => {
  return SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage);
};

// Helper to dynamically add missing translations
export const addMissingTranslation = async (
  lng: string,
  ns: string,
  key: string,
  value: string
): Promise<boolean> => {
  try {
    if (!lng || !ns || !key || !value) return false;
    
    // Update translation via API
    await apiService.post(`/api/translations/${lng}/${ns}/key`, {
      key,
      value,
    });
    
    // Reload namespace to get updated translations
    await i18n.reloadResources(lng, ns);
    
    return true;
  } catch (error) {
    console.error('Failed to add missing translation:', error);
    return false;
  }
};

// Helper to update all translations for a namespace
export const updateTranslations = async (
  lng: string,
  ns: string,
  translations: Record<string, string>
): Promise<boolean> => {
  try {
    // Update all translations in namespace via API
    await apiService.put(`/api/translations/${lng}/${ns}`, { translations });

    // Reload namespace to get updated translations
    await i18n.reloadResources(lng, ns);
    
    return true;
  } catch (error) {
    console.error('Failed to update translations:', error);
    return false;
  }
};

// Export initialized i18n
export default i18n;
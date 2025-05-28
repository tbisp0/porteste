import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importar traduções modulares organizadas
import ptBR from './locales/pt-BR';
import enUS from './locales/en-US';
import esES from './locales/es-ES';

// Recursos organizados e modulares
const resources = {
  'pt-BR': {
    translation: ptBR
  },
  'en-US': {
    translation: enUS
  },
  'es-ES': {
    translation: esES
  }
};

// Configuração robusta e simplificada do i18n
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pt-BR',
    fallbackLng: 'pt-BR',

    // DEBUG apenas em desenvolvimento
    debug: import.meta.env.DEV,

    // Configurações React
    react: {
      useSuspense: false
    },

    // Configurações de interpolação
    interpolation: {
      escapeValue: false
    },

    // Configurações básicas
    defaultNS: 'translation',

    // Configurações de detecção de idioma
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  })
  .then(() => {
    // i18n initialized successfully - logs apenas em desenvolvimento
    if (import.meta.env.DEV) {
      console.log('✅ i18n initialized successfully');
      console.log('🌐 Current language:', i18n.language);
      console.log('📊 Available languages:', Object.keys(resources));
    }
  })
  .catch((error) => {
    console.error('❌ i18n initialization failed:', error);
  });

export default i18n;

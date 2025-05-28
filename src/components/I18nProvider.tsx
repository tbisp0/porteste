import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LoadingSpinner from './LoadingSpinner';
import i18n from '../i18n/config';

interface I18nProviderProps {
  children: React.ReactNode;
}

const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const checkI18nReady = () => {
      // Verificar se o i18n está inicializado e se as traduções estão carregadas
      if (i18n.isInitialized && i18n.hasResourceBundle('pt-BR', 'translation')) {
        console.log('🎯 I18n is ready!');
        console.log('🌐 Current language:', i18n.language);
        console.log('📊 Test translation:', t('profile.title'));
        setIsReady(true);
      } else {
        console.log('⏳ Waiting for i18n...');
        // Tentar novamente em 100ms
        setTimeout(checkI18nReady, 100);
      }
    };

    // Verificar imediatamente
    checkI18nReady();

    // Listener para mudanças no i18n
    const handleLanguageChanged = () => {
      console.log('🔄 Language changed to:', i18n.language);
      setIsReady(true);
    };

    i18n.on('languageChanged', handleLanguageChanged);
    i18n.on('initialized', () => {
      console.log('✅ I18n initialized event fired');
      checkI18nReady();
    });

    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
      i18n.off('initialized', checkI18nReady);
    };
  }, [t]);

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Carregando traduções...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default I18nProvider;

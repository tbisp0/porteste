import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Bug, Eye, EyeOff } from 'lucide-react';

const TranslationDebug: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  if (import.meta.env.PROD) return null;

  const testKeys = [
    'settings.title',
    'settings.theme.toggle',
    'settings.theme.lightMode',
    'settings.theme.darkMode',
    'settings.language.select',
    'settings.sound.toggle',
    'settings.sound.enabled',
    'settings.sound.disabled',
    'settings.accessibility.menu',
    'settings.accessibility.description',
    'settings.feedback.open',
    'settings.feedback.description',
    'profile.hero.greeting',
    'profile.hero.roles.uxDesigner',
    'profile.bio',
    'profile.name',
    'profile.letsChat',
    'tooltips.theme.light',
    'tooltips.theme.dark',
    'tooltips.language.switch',
    'tooltips.sound.enable',
    'tooltips.sound.disable',
    'theme.toggle',
    'theme.light',
    'theme.dark',
    'theme.changed',
    'sound.enabled',
    'sound.disabled',
    'sound.toggle',
    'language.changed'
  ];

  const checkTranslation = (key: string) => {
    const translation = t(key);
    const isWorking = translation !== key;
    return { translation, isWorking };
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-[9999]">
        <button
          onClick={() => setIsVisible(true)}
          className="bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600"
          title="Show Translation Debug"
        >
          <Bug className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-[9999] bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-xl max-w-md max-h-96 overflow-auto">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Bug className="w-5 h-5" />
            Translation Debug
          </h3>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <EyeOff className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-4 p-2 bg-gray-100 dark:bg-gray-700 rounded">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            Current Language: {i18n.language}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Ready: {i18n.isInitialized ? '✅' : '❌'}
          </p>
        </div>

        <div className="space-y-2">
          {testKeys.map(key => {
            const { translation, isWorking } = checkTranslation(key);
            return (
              <div
                key={key}
                className={`p-2 rounded text-xs ${
                  isWorking
                    ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                    : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                }`}
              >
                <div className="font-mono text-gray-600 dark:text-gray-400">
                  {key}
                </div>
                <div className={`font-semibold ${
                  isWorking
                    ? 'text-green-800 dark:text-green-200'
                    : 'text-red-800 dark:text-red-200'
                }`}>
                  {isWorking ? '✅' : '❌'} {translation}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
          <button
            onClick={() => {
              console.log('🔍 i18n Debug Info:');
              console.log('Language:', i18n.language);
              console.log('Initialized:', i18n.isInitialized);
              console.log('Resources:', i18n.getResourceBundle(i18n.language, 'translation'));
              console.log('Store:', i18n.store);
            }}
            className="w-full bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600"
          >
            Log Debug Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default TranslationDebug;

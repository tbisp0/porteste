/**
 * 🎯 VALIDADOR DE TRADUÇÕES - COMPONENTE DEBUG
 * 
 * Componente para validar traduções em tempo real
 * Detecta chaves faltantes e problemas
 */

import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Bug, X, Download, CheckCircle, AlertCircle, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { 
  validateLanguageTranslations, 
  generateValidationReport, 
  REQUIRED_TRANSLATION_KEYS 
} from '@/i18n/validation/translationValidator';

const TranslationValidator: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'keys' | 'validation' | 'report'>('keys');
  const { t, i18n } = useTranslation();

  // Só mostrar em desenvolvimento
  if (import.meta.env.PROD) return null;

  // Chaves de teste principais (incluindo novas do feedback)
  const testKeys = [
    // Feedback (novas chaves)
    'feedback.close',
    'feedback.back',
    'feedback.problem',
    'feedback.idea',
    'feedback.praise',
    'feedback.problemTitle',
    'feedback.ideaTitle',
    'feedback.praiseTitle',
    'feedback.defaultTitle',
    'feedback.validation.messageRequired',
    'feedback.validation.messageMinLength',
    'feedback.status.success',
    'feedback.status.error',
    
    // Common
    'common.close',
    'common.cancel',
    'common.confirm',
    
    // Profile
    'profile.hero.greeting',
    'profile.hero.roles.uxDesigner',
    'profile.bio',
    'profile.name',
    'profile.letsChat',
    
    // Theme & Sound
    'theme.toggle',
    'theme.light',
    'theme.dark',
    'sound.enabled',
    'sound.disabled',
    'language.changed'
  ];

  // Validação do idioma atual
  const currentValidation = useMemo(() => {
    return validateLanguageTranslations(i18n.language, t);
  }, [i18n.language, t]);

  // Validação de todos os idiomas
  const allValidations = useMemo(() => {
    const languages = ['pt-BR', 'en-US', 'es-ES'];
    return languages.map(lang => ({
      language: lang,
      result: validateLanguageTranslations(lang, (key: string) => {
        // Simular função t para outros idiomas
        try {
          return i18n.getFixedT(lang)(key);
        } catch {
          return key;
        }
      })
    }));
  }, [i18n]);

  const checkTranslation = (key: string) => {
    const translation = t(key);
    const isWorking = translation !== key;
    return { translation, isWorking };
  };

  const downloadReport = () => {
    const report = generateValidationReport(allValidations);
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `translation-report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-[9999]">
        <button
          onClick={() => setIsVisible(true)}
          className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
          title="Validador de Traduções"
        >
          <Bug className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-600">
          <div className="flex items-center gap-3">
            <Bug className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Validador de Traduções
            </h2>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">Idioma:</span>
              <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                {i18n.language}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={downloadReport}
              className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              title="Download Relatório"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-600">
          {[
            { id: 'keys', label: 'Chaves de Teste', icon: Eye },
            { id: 'validation', label: 'Validação Atual', icon: CheckCircle },
            { id: 'report', label: 'Relatório Completo', icon: AlertTriangle }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[60vh]">
          {activeTab === 'keys' && (
            <div className="space-y-2">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Testando {testKeys.length} chaves principais:
              </div>
              {testKeys.map(key => {
                const { translation, isWorking } = checkTranslation(key);
                return (
                  <div
                    key={key}
                    className={`p-3 rounded-lg border text-sm ${
                      isWorking
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                        : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                    }`}
                  >
                    <div className="font-mono text-xs text-gray-600 dark:text-gray-400 mb-1">
                      {key}
                    </div>
                    <div className={`font-medium flex items-center gap-2 ${
                      isWorking
                        ? 'text-green-800 dark:text-green-200'
                        : 'text-red-800 dark:text-red-200'
                    }`}>
                      {isWorking ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                      {translation}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'validation' && (
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Validação para {i18n.language}
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Cobertura:</span>
                    <span className="ml-2 font-mono font-bold">{currentValidation.coverage}%</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Status:</span>
                    <span className={`ml-2 font-medium ${
                      currentValidation.isValid ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {currentValidation.isValid ? '✅ Válido' : '❌ Inválido'}
                    </span>
                  </div>
                </div>
              </div>

              {currentValidation.missingKeys.length > 0 && (
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                  <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">
                    Chaves Faltantes ({currentValidation.missingKeys.length})
                  </h4>
                  <div className="space-y-1">
                    {currentValidation.missingKeys.map(key => (
                      <div key={key} className="font-mono text-xs text-red-700 dark:text-red-300">
                        {key}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentValidation.warnings.length > 0 && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                  <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                    Avisos ({currentValidation.warnings.length})
                  </h4>
                  <div className="space-y-1">
                    {currentValidation.warnings.map((warning, index) => (
                      <div key={index} className="text-xs text-yellow-700 dark:text-yellow-300">
                        {warning}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'report' && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                {allValidations.map(({ language, result }) => (
                  <div key={language} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      {language}
                    </h4>
                    <div className="text-sm space-y-1">
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Cobertura:</span>
                        <span className="ml-2 font-mono">{result.coverage}%</span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Faltantes:</span>
                        <span className="ml-2 font-mono">{result.missingKeys.length}</span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Status:</span>
                        <span className={`ml-2 ${result.isValid ? 'text-green-600' : 'text-red-600'}`}>
                          {result.isValid ? '✅' : '❌'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Resumo Geral
                </h4>
                <div className="text-sm">
                  <div>
                    Cobertura média: {Math.round(allValidations.reduce((sum, v) => sum + v.result.coverage, 0) / allValidations.length)}%
                  </div>
                  <div>
                    Status: {allValidations.every(v => v.result.isValid) ? '✅ Todas válidas' : '❌ Existem problemas'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
          <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
            <div>
              Total de chaves obrigatórias: {REQUIRED_TRANSLATION_KEYS.length}
            </div>
            <div>
              Última atualização: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranslationValidator;

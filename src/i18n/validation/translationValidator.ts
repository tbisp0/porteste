/**
 * 🎯 VALIDADOR DE TRADUÇÕES
 * 
 * Sistema para validar traduções e detectar chaves faltantes
 * Garante consistência entre idiomas
 */

import { TFunction } from 'i18next';

// Tipos para validação
export interface TranslationValidationResult {
  isValid: boolean;
  missingKeys: string[];
  invalidKeys: string[];
  warnings: string[];
  coverage: number;
}

export interface LanguageValidationResult {
  language: string;
  result: TranslationValidationResult;
}

// Chaves obrigatórias que devem existir em todos os idiomas
export const REQUIRED_TRANSLATION_KEYS = [
  // Common
  'common.close',
  'common.open',
  'common.save',
  'common.cancel',
  'common.confirm',
  'common.yes',
  'common.no',
  'common.loading',
  'common.error',
  'common.success',
  'common.warning',
  'common.info',
  
  // Feedback
  'feedback.title',
  'feedback.typeQuestion',
  'feedback.close',
  'feedback.back',
  'feedback.send',
  'feedback.sending',
  'feedback.includeEmail',
  'feedback.privacyPolicy',
  'feedback.problem',
  'feedback.idea',
  'feedback.praise',
  'feedback.problemTitle',
  'feedback.ideaTitle',
  'feedback.praiseTitle',
  'feedback.defaultTitle',
  'feedback.problemInstruction',
  'feedback.ideaInstruction',
  'feedback.praiseInstruction',
  'feedback.defaultInstruction',
  'feedback.problemPlaceholder',
  'feedback.ideaPlaceholder',
  'feedback.praisePlaceholder',
  'feedback.defaultPlaceholder',
  'feedback.validation.messageRequired',
  'feedback.validation.messageMinLength',
  'feedback.validation.emailInvalid',
  'feedback.form.success',
  'feedback.status.success',
  'feedback.status.error',
  
  // Profile
  'profile.name',
  'profile.bio',
  'profile.hero.greeting',
  'profile.hero.roles.uxDesigner',
  'profile.hero.roles.productDesigner',
  'profile.hero.roles.designStrategist',
  'profile.hero.roles.interactionDesigner',
  'profile.letsChat',
  
  // Navigation
  'navigation.home',
  'navigation.about',
  'navigation.projects',
  'navigation.contact',
  'navigation.backlog',
  
  // Theme
  'theme.toggle',
  'theme.light',
  'theme.dark',
  'theme.changed',
  
  // Sound
  'sound.enabled',
  'sound.disabled',
  'sound.toggle',
  
  // Language
  'language.changed',
  
  // Tooltips
  'tooltips.theme.light',
  'tooltips.theme.dark',
  'tooltips.language.switch',
  'tooltips.sound.enable',
  'tooltips.sound.disable',
  
  // Settings
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
  'settings.feedback.description'
];

/**
 * Valida se uma chave de tradução existe e é válida
 */
export const validateTranslationKey = (key: string, t: TFunction): boolean => {
  try {
    const result = t(key);
    // i18next retorna a própria chave se não encontrar tradução
    return result && result !== key && typeof result === 'string';
  } catch (error) {
    return false;
  }
};

/**
 * Valida todas as chaves obrigatórias para um idioma
 */
export const validateLanguageTranslations = (
  language: string,
  t: TFunction
): TranslationValidationResult => {
  const missingKeys: string[] = [];
  const invalidKeys: string[] = [];
  const warnings: string[] = [];
  
  // Verificar chaves obrigatórias
  for (const key of REQUIRED_TRANSLATION_KEYS) {
    if (!validateTranslationKey(key, t)) {
      missingKeys.push(key);
    }
  }
  
  // Verificar chaves que retornam valores suspeitos
  for (const key of REQUIRED_TRANSLATION_KEYS) {
    try {
      const result = t(key);
      if (result === key) {
        invalidKeys.push(key);
      } else if (result && typeof result === 'string') {
        // Verificar se a tradução parece estar em inglês quando deveria estar em outro idioma
        if (language !== 'en-US' && /^[A-Za-z\s]+$/.test(result) && result.length > 20) {
          warnings.push(`${key}: Possible untranslated text in ${language}`);
        }
      }
    } catch (error) {
      invalidKeys.push(key);
    }
  }
  
  // Calcular cobertura
  const totalKeys = REQUIRED_TRANSLATION_KEYS.length;
  const validKeys = totalKeys - missingKeys.length - invalidKeys.length;
  const coverage = (validKeys / totalKeys) * 100;
  
  return {
    isValid: missingKeys.length === 0 && invalidKeys.length === 0,
    missingKeys,
    invalidKeys,
    warnings,
    coverage: Math.round(coverage * 100) / 100
  };
};

/**
 * Valida traduções para múltiplos idiomas
 */
export const validateAllLanguages = (
  languages: string[],
  getTranslationFunction: (lang: string) => TFunction
): LanguageValidationResult[] => {
  return languages.map(language => ({
    language,
    result: validateLanguageTranslations(language, getTranslationFunction(language))
  }));
};

/**
 * Gera relatório de validação em formato legível
 */
export const generateValidationReport = (
  results: LanguageValidationResult[]
): string => {
  let report = '🎯 RELATÓRIO DE VALIDAÇÃO DE TRADUÇÕES\n\n';
  
  for (const { language, result } of results) {
    report += `📍 ${language.toUpperCase()}\n`;
    report += `   Cobertura: ${result.coverage}%\n`;
    report += `   Status: ${result.isValid ? '✅ Válido' : '❌ Inválido'}\n`;
    
    if (result.missingKeys.length > 0) {
      report += `   Chaves faltantes (${result.missingKeys.length}):\n`;
      result.missingKeys.forEach(key => {
        report += `     - ${key}\n`;
      });
    }
    
    if (result.invalidKeys.length > 0) {
      report += `   Chaves inválidas (${result.invalidKeys.length}):\n`;
      result.invalidKeys.forEach(key => {
        report += `     - ${key}\n`;
      });
    }
    
    if (result.warnings.length > 0) {
      report += `   Avisos (${result.warnings.length}):\n`;
      result.warnings.forEach(warning => {
        report += `     ⚠️ ${warning}\n`;
      });
    }
    
    report += '\n';
  }
  
  // Resumo geral
  const totalCoverage = results.reduce((sum, r) => sum + r.result.coverage, 0) / results.length;
  const allValid = results.every(r => r.result.isValid);
  
  report += '📊 RESUMO GERAL\n';
  report += `   Cobertura média: ${Math.round(totalCoverage * 100) / 100}%\n`;
  report += `   Status geral: ${allValid ? '✅ Todas as traduções válidas' : '❌ Existem problemas'}\n`;
  
  return report;
};

/**
 * Hook para usar validação de traduções em componentes React
 */
export const useTranslationValidation = (
  languages: string[],
  getTranslationFunction: (lang: string) => TFunction
) => {
  const validateTranslations = () => {
    return validateAllLanguages(languages, getTranslationFunction);
  };
  
  const generateReport = () => {
    const results = validateTranslations();
    return generateValidationReport(results);
  };
  
  return {
    validateTranslations,
    generateReport,
    validateKey: validateTranslationKey
  };
};

/**
 * 🎯 TRADUÇÕES DO FEEDBACK MODAL
 * 
 * Traduções específicas e validação para o FeedbackModal
 */

import { useComponentTranslation } from './useComponentTranslation';

// Chaves obrigatórias do FeedbackModal
export const FEEDBACK_MODAL_REQUIRED_KEYS = [
  'title',
  'typeQuestion',
  'close',
  'back',
  'send',
  'sending',
  'includeEmail',
  'privacyPolicy',
  'problem',
  'idea',
  'praise',
  'problemTitle',
  'ideaTitle',
  'praiseTitle',
  'defaultTitle',
  'problemInstruction',
  'ideaInstruction',
  'praiseInstruction',
  'defaultInstruction',
  'problemPlaceholder',
  'ideaPlaceholder',
  'praisePlaceholder',
  'defaultPlaceholder',
  'validation.messageRequired',
  'validation.messageMinLength',
  'validation.emailInvalid',
  'form.success',
  'status.success',
  'status.error'
];

// Fallbacks específicos do FeedbackModal
export const FEEDBACK_MODAL_FALLBACKS = {
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
  'feedback.status.error': 'Erro ao enviar feedback. Tente novamente.'
};

/**
 * Hook específico para traduções do FeedbackModal
 */
export const useFeedbackModalTranslation = (enableLogging = false) => {
  const translation = useComponentTranslation({
    component: 'feedback',
    fallbacks: FEEDBACK_MODAL_FALLBACKS,
    enableLogging
  });
  
  /**
   * Validar traduções do FeedbackModal
   */
  const validateFeedbackTranslations = () => {
    return translation.validateTranslations(FEEDBACK_MODAL_REQUIRED_KEYS);
  };
  
  /**
   * Obter placeholder específico por tipo
   */
  const getPlaceholderByType = (type: string): string => {
    const placeholderKey = `${type}Placeholder`;
    return translation.t(placeholderKey, {}, translation.t('defaultPlaceholder'));
  };
  
  /**
   * Obter título específico por tipo
   */
  const getTitleByType = (type: string): string => {
    const titleKey = `${type}Title`;
    return translation.t(titleKey, {}, translation.t('defaultTitle'));
  };
  
  /**
   * Obter instrução específica por tipo
   */
  const getInstructionByType = (type: string): string => {
    const instructionKey = `${type}Instruction`;
    return translation.t(instructionKey, {}, translation.t('defaultInstruction'));
  };
  
  return {
    ...translation,
    validateFeedbackTranslations,
    getPlaceholderByType,
    getTitleByType,
    getInstructionByType,
    requiredKeys: FEEDBACK_MODAL_REQUIRED_KEYS
  };
};

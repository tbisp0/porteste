/**
 * 🎯 FEEDBACK MODAL MODULAR
 *
 * Modal de feedback com design system unificado
 * Modo escuro funcionando perfeitamente
 * Sistema de traduções completo
 */

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lightbulb, Smile, Send, ArrowLeft, CheckCircle, AlertCircle, X } from 'lucide-react';
import emailjs from 'emailjs-com';
import { useTranslation } from 'react-i18next';
import { useFeedbackModalTranslation } from '@/i18n/components/FeedbackModal';
import { cn } from '@/lib/utils';
import { CTAButton } from '@/components/ui/buttons';
import { useFormSounds, useNavigationSounds } from '@/hooks/useSound';
import { BaseModal } from './BaseModal';
import { FeedbackModalProps } from './types';

// Tipos de feedback
const feedbackTypes = [
  { type: 'problem', icon: Mail },
  { type: 'idea', icon: Lightbulb },
  { type: 'praise', icon: Smile },
];

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  open,
  onClose,
  section = 'default',
  onSubmitSuccess,
  onSubmitError,
  ...props
}) => {
  const [step, setStep] = useState(1);
  const [feedbackType, setFeedbackType] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [showEmail, setShowEmail] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [touched, setTouched] = useState(false);

  const initialFocusRef = useRef<HTMLButtonElement>(null);
  const { t, i18n } = useTranslation();
  const {
    t: tf,
    getPlaceholderByType,
    getTitleByType,
    getInstructionByType
  } = useFeedbackModalTranslation();
  const { playSubmitSuccess, playSubmitError, playFieldFocus } = useFormSounds();
  const { playButtonClick } = useNavigationSounds();

  // Validações
  const isMessageValid = message.trim().length >= 5;
  const isEmailValid = !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canSend = isMessageValid && (!showEmail || isEmailValid) && !sending;

  // Reset modal state
  const resetModal = () => {
    setStep(1);
    setFeedbackType(null);
    setMessage('');
    setEmail('');
    setShowEmail(false);
    setSending(false);
    setSent(false);
    setSubmitStatus('idle');
    setTouched(false);
  };

  // Handle send
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSend || !feedbackType) return;

    setSending(true);
    setSubmitStatus('idle');

    try {
      await emailjs.send(
        'service_4z3a60b',
        'template_nc73bg4',
        {
          from_name: `Feedback Portfolio - ${feedbackType}`,
          from_email: email || 'tbisp0@hotmail.com',
          message: `Tipo: ${feedbackType}\nSeção: ${section}\n\nMensagem:\n${message}`,
          to_email: 'tbisp0@hotmail.com',
          subject: `Feedback do Portfolio - ${feedbackType} (${section})`,
          reply_to: email || 'tbisp0@hotmail.com'
        },
        'eRzZy4gTZ2NXGjFKz'
      );

      setSubmitStatus('success');
      setSent(true);
      playSubmitSuccess();
      onSubmitSuccess?.();
    } catch (error) {
      console.error('Erro ao enviar feedback:', error);
      setSubmitStatus('error');
      playSubmitError();
      onSubmitError?.(error as Error);
    } finally {
      setSending(false);
    }
  };

  // Handle close
  const handleClose = () => {
    if (step === 1 || (message.trim() === '' && email.trim() === '')) {
      resetModal();
    }
    onClose();
  };

  // Render success state
  if (sent) {
    return (
      <BaseModal
        open={open}
        onClose={handleClose}
        variant="success"
        size="sm"
        showCloseButton={false}
        {...props}
      >
        <div className="flex flex-col items-center py-8 text-center">
          <Smile className="w-12 h-12 text-green-600 dark:text-green-400 mb-4" />
          <p className="text-lg font-semibold text-green-700 dark:text-green-300 mb-6">
            {t('feedback.form.success')}
          </p>
          <CTAButton
            onClick={handleClose}
            variant="primary"
            size="md"
          >
            {t('feedback.close')}
          </CTAButton>
        </div>
      </BaseModal>
    );
  }

  // Render step 1: Choose feedback type
  if (step === 1) {
    return (
      <BaseModal
        open={open}
        onClose={handleClose}
        title={t('feedback.typeQuestion')}
        variant="feedback"
        size="sm"
        initialFocus={initialFocusRef}
        {...props}
      >
        <div className="flex flex-col gap-3">
          {feedbackTypes.map((ft, index) => (
            <CTAButton
              key={ft.type}
              ref={index === 0 ? initialFocusRef : undefined}
              variant={feedbackType === ft.type ? 'primary' : 'ghost'}
              size="md"
              icon={ft.icon}
              iconPosition="left"
              onClick={() => {
                setFeedbackType(ft.type);
                setStep(2);
                playButtonClick();
              }}
              className="justify-center py-3"
            >
              {t(`feedback.${ft.type}`)}
            </CTAButton>
          ))}
        </div>
      </BaseModal>
    );
  }

  // Render step 2: Feedback form
  return (
    <BaseModal
      open={open}
      onClose={handleClose}
      title={t(`feedback.${feedbackType}Title`) || t('feedback.defaultTitle')}
      description={t(`feedback.${feedbackType}Instruction`) || t('feedback.defaultInstruction')}
      variant="feedback"
      size="md"
      {...props}
    >
      <form onSubmit={handleSend} className="space-y-4">
        {/* Message textarea */}
        <div className="relative">
          <textarea
            className={cn(
              'w-full rounded-lg border-2 p-3 min-h-[90px] text-base',
              'transition-all focus:outline-none focus:ring-2 focus:ring-blue-500',
              'resize-none pr-10',
              'bg-white dark:bg-gray-700',
              'text-gray-900 dark:text-gray-100',
              'placeholder:text-gray-500 dark:placeholder:text-gray-400',
              touched && !isMessageValid
                ? 'border-red-500 focus:ring-red-500'
                : touched && isMessageValid
                ? 'border-green-500 focus:ring-green-500'
                : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'
            )}
            placeholder={t(`feedback.${feedbackType}Placeholder`, { defaultValue: t('feedback.defaultPlaceholder') })}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onBlur={() => setTouched(true)}
            onFocus={playFieldFocus}
            required
            autoFocus
            maxLength={1000}
            aria-invalid={touched && !isMessageValid}
            aria-describedby="feedback-message-help"
          />

          {/* Validation icons */}
          {touched && !isMessageValid && (
            <X className="absolute right-3 top-3 w-5 h-5 text-red-500" aria-hidden="true" />
          )}
          {touched && isMessageValid && (
            <CheckCircle className="absolute right-3 top-3 w-5 h-5 text-green-500" aria-hidden="true" />
          )}
        </div>

        {/* Validation message */}
        {touched && !isMessageValid ? (
          <div id="feedback-message-help" className="text-xs text-red-500 flex items-center gap-1" role="alert">
            <AlertCircle className="w-3 h-3" aria-hidden="true" />
            {t('feedback.validation.messageRequired')}
          </div>
        ) : (
          <div id="feedback-message-help" className="text-xs text-gray-500 dark:text-gray-400">
            {t('feedback.validation.messageMinLength')}
          </div>
        )}

        {/* Email checkbox */}
        <div className="flex items-center gap-2">
          <input
            id="show-email"
            type="checkbox"
            checked={showEmail}
            onChange={(e) => setShowEmail(e.target.checked)}
            className="accent-blue-700"
          />
          <label htmlFor="show-email" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer select-none">
            {t('feedback.includeEmail')}
          </label>
        </div>

        {/* Email input */}
        {showEmail && (
          <div className="relative">
            <input
              className={cn(
                'rounded-lg border-2 p-2 text-base transition-all',
                'focus:outline-none focus:ring-2 focus:ring-blue-500',
                'bg-white dark:bg-gray-700',
                'text-gray-900 dark:text-gray-100',
                'placeholder:text-gray-500 dark:placeholder:text-gray-400',
                'w-full pr-10',
                email.length > 0
                  ? (isEmailValid ? 'border-green-500' : 'border-red-500')
                  : 'border-gray-300 dark:border-gray-600'
              )}
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={email.length > 0 && !isEmailValid}
            />

            {/* Email validation icons */}
            {email.length > 0 && !isEmailValid && (
              <X className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-500" aria-hidden="true" />
            )}
            {email.length > 0 && isEmailValid && (
              <CheckCircle className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" aria-hidden="true" />
            )}
          </div>
        )}

        {/* Privacy policy link */}
        <a
          href="/portfolio/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-700 dark:text-blue-400 underline"
        >
          {t('feedback.privacyPolicy')}
        </a>

        {/* Action buttons */}
        <div className="flex gap-2 pt-2">
          <CTAButton
            type="submit"
            variant="primary"
            size="md"
            icon={Send}
            iconPosition="left"
            disabled={!canSend}
            loading={sending}
            className="flex-1"
          >
            {sending ? t('feedback.sending') : t('feedback.send')}
          </CTAButton>

          <CTAButton
            type="button"
            onClick={() => {
              setStep(1);
              playButtonClick();
            }}
            variant="ghost"
            size="md"
            icon={ArrowLeft}
            iconPosition="left"
            className="flex-1"
          >
            {t('feedback.back')}
          </CTAButton>
        </div>

        {/* Status messages */}
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-400"
            role="status"
            aria-live="polite"
          >
            <CheckCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            <span className="text-sm font-medium">
              {t('feedback.status.success')}
            </span>
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400"
            role="alert"
            aria-live="assertive"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            <span className="text-sm font-medium">
              {t('feedback.status.error')}
            </span>
          </motion.div>
        )}
      </form>
    </BaseModal>
  );
};

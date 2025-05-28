import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Mail, User, MessageSquare, Send, CheckCircle, AlertCircle, Loader2, Check, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import emailjs from 'emailjs-com';
import { CTAButton } from '@/components/ui/buttons';
import { SecureValidation } from '@/utils/secureValidation';
import { useFormSounds } from '@/hooks/useSound';

// Tipos para o formulário
interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface FormTouched {
  name: boolean;
  email: boolean;
  message: boolean;
}

const Contact: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { playSubmitSuccess, playSubmitError, playFieldFocus, playFieldValid } = useFormSounds();

  // Estados do formulário
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({
    name: false,
    email: false,
    message: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Refs para acessibilidade
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  // Auto-hide da mensagem de sucesso após 4 segundos
  useEffect(() => {
    if (submitStatus === 'success') {
      const timer = setTimeout(() => {
        setSubmitStatus('idle');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  // Validação de email segura usando utilitário seguro
  const isValidEmail = (email: string): boolean => {
    return SecureValidation.validateEmail(email);
  };

  // Validação dos campos - usando useCallback para evitar re-criação
  const validateField = useCallback((name: keyof FormData, value: string): string | undefined => {
    try {
      const lang = i18n?.language || 'pt-BR';
      const safeValue = value || '';

      switch (name) {
        case 'name':
          if (!safeValue.trim()) {
            if (lang === 'en-US') return 'Name is required';
            if (lang === 'es-ES') return 'El nombre es obligatorio';
            return 'Nome é obrigatório';
          }
          if (safeValue.trim().length < 2) {
            if (lang === 'en-US') return 'Name must be at least 2 characters';
            if (lang === 'es-ES') return 'El nombre debe tener al menos 2 caracteres';
            return 'Nome deve ter pelo menos 2 caracteres';
          }
          return undefined;

        case 'email':
          if (!safeValue.trim()) {
            if (lang === 'en-US') return 'Email is required';
            if (lang === 'es-ES') return 'El email es obligatorio';
            return 'E-mail é obrigatório';
          }
          if (!isValidEmail(safeValue)) {
            if (lang === 'en-US') return 'Invalid email';
            if (lang === 'es-ES') return 'Email inválido';
            return 'E-mail inválido';
          }
          return undefined;

        case 'message':
          if (!safeValue.trim()) {
            if (lang === 'en-US') return 'Message is required';
            if (lang === 'es-ES') return 'El mensaje es obligatorio';
            return 'Mensagem é obrigatória';
          }
          if (safeValue.trim().length < 10) {
            if (lang === 'en-US') return 'Message must be at least 10 characters';
            if (lang === 'es-ES') return 'El mensaje debe tener al menos 10 caracteres';
            return 'Mensagem deve ter pelo menos 10 caracteres';
          }
          return undefined;

        default:
          return undefined;
      }
    } catch (error) {
      console.error('Erro na validação do campo:', error);
      return 'Erro na validação';
    }
  }, [i18n?.language]);

  // Validar todos os campos
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    Object.keys(formData).forEach((key) => {
      const fieldName = key as keyof FormData;
      const error = validateField(fieldName, formData[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manipular mudanças nos campos - usando useCallback
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    try {
      const { name, value } = e.target;
      const fieldName = name as keyof FormData;

      // Verificar se o campo é válido antes de processar
      if (!name || !Object.keys(formData).includes(name)) {
        return;
      }

      setFormData(prev => ({
        ...prev,
        [name]: value
      }));

      // Validação em tempo real apenas se o campo já foi tocado
      if (touched[fieldName]) {
        const error = validateField(fieldName, value || '');
        setErrors(prev => ({
          ...prev,
          [name]: error
        }));
      }
    } catch (error) {
      console.error('Erro no handleChange:', error);
    }
  }, [formData, touched, validateField]);

  // Manipular blur (quando sai do campo) - usando useCallback
  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    try {
      const { name, value } = e.target;
      const fieldName = name as keyof FormData;

      // Verificar se o campo é válido antes de processar
      if (!name || !Object.keys(formData).includes(name)) {
        return;
      }

      setTouched(prev => ({
        ...prev,
        [name]: true
      }));

      const error = validateField(fieldName, value || '');
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    } catch (error) {
      console.error('Erro no handleBlur:', error);
    }
  }, [formData, validateField]);

  // Enviar formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Marcar todos os campos como tocados
    setTouched({
      name: true,
      email: true,
      message: true
    });

    if (!validateForm()) {
      // Focar no primeiro campo com erro - validação mais segura
      const newErrors: FormErrors = {};
      Object.keys(formData).forEach((key) => {
        const fieldName = key as keyof FormData;
        const error = validateField(fieldName, formData[fieldName]);
        if (error) {
          newErrors[fieldName] = error;
        }
      });

      const firstErrorField = Object.keys(newErrors)[0] as keyof FormData;
      if (firstErrorField === 'name') nameRef.current?.focus();
      else if (firstErrorField === 'email') emailRef.current?.focus();
      else if (firstErrorField === 'message') messageRef.current?.focus();
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Enviar via EmailJS usando as credenciais existentes
      await emailjs.send(
        'service_4z3a60b',    // Service ID do EmailJS
        'template_nc73bg4',   // Template ID do EmailJS
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'tbisp0@hotmail.com',
          subject: `Nova mensagem de contato de ${formData.name}`,
          reply_to: formData.email
        },
        'eRzZy4gTZ2NXGjFKz'  // User ID do EmailJS
      );

      // Sucesso
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTouched({ name: false, email: false, message: false });
      setErrors({});

      // Play success sound
      playSubmitSuccess();

    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
      setSubmitStatus('error');

      // Play error sound
      playSubmitError();
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUPER SIMPLES: só verifica se tem alguma coisa digitada
  const isFormValid = () => {
    return formData.name.length > 0 &&
           formData.email.length > 0 &&
           formData.message.length > 0;
  };

  // Verificar se campo individual está válido (para mostrar linha verde + ✓) - usando useMemo
  const fieldValidationStates = useMemo(() => {
    const states: Record<keyof FormData, { isValid: boolean; hasError: boolean }> = {
      name: { isValid: false, hasError: false },
      email: { isValid: false, hasError: false },
      message: { isValid: false, hasError: false }
    };

    Object.keys(formData).forEach((key) => {
      const fieldName = key as keyof FormData;
      try {
        const hasError = touched[fieldName] && !!errors[fieldName];
        const isValid = touched[fieldName] && formData[fieldName] && !validateField(fieldName, formData[fieldName]);

        states[fieldName] = { isValid, hasError };
      } catch (error) {
        console.error(`Erro ao verificar estado do campo ${fieldName}:`, error);
        states[fieldName] = { isValid: false, hasError: false };
      }
    });

    return states;
  }, [formData, touched, errors, validateField]);

  const isFieldValid = useCallback((fieldName: keyof FormData): boolean => {
    return fieldValidationStates[fieldName]?.isValid || false;
  }, [fieldValidationStates]);

  const hasFieldError = useCallback((fieldName: keyof FormData): boolean => {
    return fieldValidationStates[fieldName]?.hasError || false;
  }, [fieldValidationStates]);

  return (
    <section id="contact" className="py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-12"
      >
        <div className="max-w-2xl mx-auto text-left px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text)] mb-4">
            {t('contact.title')}
          </h1>
          <p className="text-[var(--color-muted)] text-lg mb-4">
            {t('contact.description')}
          </p>
          {/* Linha Azul Animada - Similar ao Hero */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "120px" }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
          ></motion.div>
        </div>
      </motion.div>

      {/* Formulário */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>

          {/* Campo Nome */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-[var(--color-text)]"
            >
              <User className="inline w-4 h-4 mr-2" aria-hidden="true" />
              {t('contact.form.name')}
              <span className="text-[var(--color-error)] ml-1" aria-label={t('contact.form.required')}>*</span>
            </label>
            <div className="relative">
              <input
                ref={nameRef}
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={() => playFieldFocus()}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent ${
                  hasFieldError('name')
                    ? 'border-red-500 focus:ring-red-500'
                    : isFieldValid('name')
                    ? 'border-green-500 focus:ring-green-500'
                    : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/50'
                }`}
                placeholder={t('contact.form.namePlaceholder')}
                aria-invalid={hasFieldError('name') ? 'true' : 'false'}
                aria-describedby={hasFieldError('name') ? 'name-error' : undefined}
                autoComplete="name"
              />
              {/* Ícone de validação */}
              {hasFieldError('name') && (
                <X className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" aria-hidden="true" />
              )}
              {isFieldValid('name') && (
                <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" aria-hidden="true" />
              )}
            </div>
            {errors.name && touched.name && (
              <p id="name-error" className="text-sm text-[var(--color-error)] flex items-center gap-1" role="alert">
                <AlertCircle className="w-4 h-4" aria-hidden="true" />
                {errors.name}
              </p>
            )}
          </div>

          {/* Campo Email */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-[var(--color-text)]"
            >
              <Mail className="inline w-4 h-4 mr-2" aria-hidden="true" />
              {t('contact.form.email')}
              <span className="text-[var(--color-error)] ml-1" aria-label={t('contact.form.required')}>*</span>
            </label>
            <div className="relative">
              <input
                ref={emailRef}
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={() => playFieldFocus()}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent ${
                  hasFieldError('email')
                    ? 'border-red-500 focus:ring-red-500'
                    : isFieldValid('email')
                    ? 'border-green-500 focus:ring-green-500'
                    : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/50'
                }`}
                placeholder={t('contact.form.emailPlaceholder')}
                aria-invalid={hasFieldError('email') ? 'true' : 'false'}
                aria-describedby={hasFieldError('email') ? 'email-error' : undefined}
                autoComplete="email"
                inputMode="email"
              />
              {/* Ícone de validação */}
              {hasFieldError('email') && (
                <X className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" aria-hidden="true" />
              )}
              {isFieldValid('email') && (
                <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" aria-hidden="true" />
              )}
            </div>
            {errors.email && touched.email && (
              <p id="email-error" className="text-sm text-[var(--color-error)] flex items-center gap-1" role="alert">
                <AlertCircle className="w-4 h-4" aria-hidden="true" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Campo Mensagem */}
          <div className="space-y-2">
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-[var(--color-text)]"
            >
              <MessageSquare className="inline w-4 h-4 mr-2" aria-hidden="true" />
              {t('contact.form.message')}
              <span className="text-[var(--color-error)] ml-1" aria-label={t('contact.form.required')}>*</span>
            </label>
            <div className="relative">
              <textarea
                ref={messageRef}
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={() => playFieldFocus()}
                rows={5}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent resize-vertical ${
                  hasFieldError('message')
                    ? 'border-red-500 focus:ring-red-500'
                    : isFieldValid('message')
                    ? 'border-green-500 focus:ring-green-500'
                    : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/50'
                }`}
                placeholder={t('contact.form.messagePlaceholder')}
                aria-invalid={hasFieldError('message') ? 'true' : 'false'}
                aria-describedby={hasFieldError('message') ? 'message-error' : 'message-hint'}
                minLength={10}
              />
              {/* Ícone de validação */}
              {hasFieldError('message') && (
                <X className="absolute right-3 top-3 w-5 h-5 text-red-500" aria-hidden="true" />
              )}
              {isFieldValid('message') && (
                <Check className="absolute right-3 top-3 w-5 h-5 text-green-500" aria-hidden="true" />
              )}
            </div>
            {errors.message && touched.message ? (
              <p id="message-error" className="text-sm text-[var(--color-error)] flex items-center gap-1" role="alert">
                <AlertCircle className="w-4 h-4" aria-hidden="true" />
                {errors.message}
              </p>
            ) : (
              <p id="message-hint" className="text-xs text-[var(--color-muted)]">
                {t('contact.form.messageHint')}
              </p>
            )}
          </div>

          {/* Botão de Envio */}
          <div>
            <CTAButton
              onClick={handleSubmit}
              variant="primary"
              size="lg"
              icon={Send}
              iconPosition="left"
              disabled={isSubmitting}
              loading={isSubmitting}
              className="w-full"
              ariaLabel={isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
            >
              {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
            </CTAButton>

            {/* Mensagem de Privacidade - Integrada ao formulário */}
            <div className="mt-2 text-center">
              <p className="text-sm text-[var(--color-muted)] max-w-prose mx-auto">
                {t('contact.form.privacy')}
              </p>
            </div>
          </div>

          {/* Mensagens de Status - Embaixo do Botão */}
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-400"
              role="status"
              aria-live="polite"
            >
              <CheckCircle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
              <span className="font-medium text-left">
                {i18n.language === 'en-US' ? 'Message sent successfully!' :
                 i18n.language === 'es-ES' ? '¡Mensaje enviado con éxito!' :
                 'Mensagem enviada com sucesso!'}
              </span>
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400"
              role="alert"
              aria-live="assertive"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
              <span className="font-medium text-left">
                {i18n.language === 'en-US' ? 'Error sending message. Please try again.' :
                 i18n.language === 'es-ES' ? 'Error al enviar mensaje. Inténtalo de nuevo.' :
                 'Erro ao enviar mensagem. Tente novamente.'}
              </span>
            </motion.div>
          )}

        </form>

      </motion.div>



    </section>
  );
};

export default Contact;

import { toast } from 'sonner';

// Configurações personalizadas para diferentes tipos de toast
const toastConfig = {
  duration: 4000,
  position: 'bottom-right' as const,
  style: {
    background: 'var(--color-card-bg)',
    color: 'var(--color-text)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
  },
};

export const showToast = {
  // Toast de sucesso
  success: (message: string, options?: any) => 
    toast.success(message, {
      ...toastConfig,
      ...options,
      style: {
        ...toastConfig.style,
        borderColor: 'var(--color-success)',
      },
    }),

  // Toast de erro
  error: (message: string, options?: any) => 
    toast.error(message, {
      ...toastConfig,
      ...options,
      style: {
        ...toastConfig.style,
        borderColor: 'var(--color-error)',
      },
    }),

  // Toast de loading
  loading: (message: string, options?: any) => 
    toast.loading(message, {
      ...toastConfig,
      ...options,
    }),

  // Toast de informação
  info: (message: string, options?: any) => 
    toast.info(message, {
      ...toastConfig,
      ...options,
      style: {
        ...toastConfig.style,
        borderColor: 'var(--color-primary)',
      },
    }),

  // Toast de aviso
  warning: (message: string, options?: any) => 
    toast.warning(message, {
      ...toastConfig,
      ...options,
      style: {
        ...toastConfig.style,
        borderColor: 'var(--color-warning)',
      },
    }),

  // Toasts específicos para ações do portfolio
  emailCopied: () => 
    toast.success('E-mail copiado para área de transferência!', {
      ...toastConfig,
      icon: '📧',
      duration: 3000,
    }),

  formSent: () => 
    toast.success('Mensagem enviada com sucesso!', {
      ...toastConfig,
      icon: '✅',
      duration: 5000,
      description: 'Entrarei em contato em breve.',
    }),

  formError: () => 
    toast.error('Erro ao enviar mensagem', {
      ...toastConfig,
      icon: '❌',
      duration: 6000,
      description: 'Tente novamente ou entre em contato diretamente.',
    }),

  downloadStarted: (fileName: string) => 
    toast.success(`Download iniciado: ${fileName}`, {
      ...toastConfig,
      icon: '⬇️',
      duration: 3000,
    }),

  linkCopied: (linkType: string) => 
    toast.success(`Link ${linkType} copiado!`, {
      ...toastConfig,
      icon: '🔗',
      duration: 2500,
    }),

  themeChanged: (theme: string) => 
    toast.info(`Tema alterado para ${theme}`, {
      ...toastConfig,
      icon: theme === 'dark' ? '🌙' : '☀️',
      duration: 2000,
    }),

  languageChanged: (language: string) => 
    toast.info(`Idioma alterado para ${language}`, {
      ...toastConfig,
      icon: '🌐',
      duration: 2000,
    }),

  // Toast customizado com ação
  custom: (message: string, action?: { label: string; onClick: () => void }) => 
    toast(message, {
      ...toastConfig,
      action: action ? {
        label: action.label,
        onClick: action.onClick,
      } : undefined,
    }),

  // Toast de promise para operações assíncronas
  promise: <T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    }
  ) => 
    toast.promise(promise, {
      loading: messages.loading,
      success: messages.success,
      error: messages.error,
      ...toastConfig,
    }),
};

// Função para dismissar todos os toasts
export const dismissAllToasts = () => {
  toast.dismiss();
};

// Função para dismissar toast específico
export const dismissToast = (toastId: string | number) => {
  toast.dismiss(toastId);
};

export default showToast;

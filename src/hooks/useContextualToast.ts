import { useCallback } from 'react';

interface ToastOptions {
  message: string;
  description?: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

interface ToastPosition {
  top: number;
  left: number;
}

export const useContextualToast = () => {
  const showToast = useCallback((element: HTMLElement | null, options: ToastOptions) => {
    if (!element) return;

    // Remove toast anterior se existir
    const existingToast = document.querySelector('[data-contextual-toast]');
    if (existingToast) {
      existingToast.remove();
    }

    // Calcula posição do elemento
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    // Posição abaixo do elemento com margem mínima para proximidade
    const position: ToastPosition = {
      top: rect.bottom + scrollTop + 4, // Margem reduzida para maior proximidade
      left: rect.left + scrollLeft + (rect.width / 2)
    };

    // Cria o toast
    const toast = document.createElement('div');
    toast.setAttribute('data-contextual-toast', 'true');
    toast.className = `
      fixed z-[10000] pointer-events-auto
      bg-[var(--color-surface)] border border-[var(--color-border)]
      rounded-lg shadow-xl backdrop-blur-sm
      px-3 py-2 max-w-xs text-sm
      transform -translate-x-1/2
      animate-in slide-in-from-top-2 duration-300
    `;

    // Aplica cores baseadas no tipo
    const typeClasses = {
      success: 'border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-900/20 dark:text-green-100',
      error: 'border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-900/20 dark:text-red-100',
      warning: 'border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-100',
      info: 'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-100'
    };

    if (options.type && typeClasses[options.type]) {
      toast.className += ` ${typeClasses[options.type]}`;
    }

    // Posiciona o toast
    toast.style.top = `${position.top}px`;
    toast.style.left = `${position.left}px`;

    // Conteúdo do toast mais compacto
    toast.innerHTML = `
      <div class="flex items-center gap-2">
        <div class="flex-1 min-w-0">
          <div class="font-medium text-sm leading-tight">
            ${options.message}
          </div>
          ${options.description ? `
            <div class="text-xs opacity-75 mt-0.5 leading-tight">
              ${options.description}
            </div>
          ` : ''}
        </div>
        <button
          class="flex-shrink-0 w-4 h-4 flex items-center justify-center rounded hover:bg-black/10 dark:hover:bg-white/10 transition-colors ml-1"
          onclick="this.parentElement.parentElement.remove()"
          aria-label="Fechar notificação"
        >
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    `;

    // Adiciona ao DOM
    document.body.appendChild(toast);

    // Ajusta posição se sair da tela
    const toastRect = toast.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Ajusta horizontalmente se necessário
    if (toastRect.right > viewportWidth - 16) {
      toast.style.left = `${viewportWidth - toastRect.width - 16}px`;
      toast.style.transform = 'none';
    } else if (toastRect.left < 16) {
      toast.style.left = '16px';
      toast.style.transform = 'none';
    }

    // Ajusta verticalmente se necessário (mostra acima do elemento)
    if (toastRect.bottom > viewportHeight - 16) {
      toast.style.top = `${rect.top + scrollTop - toastRect.height - 4}px`; // Margem reduzida para maior proximidade
    }

    // Remove automaticamente após duração especificada (mais rápido para proximidade)
    const duration = options.duration || 2000;
    setTimeout(() => {
      if (toast.parentElement) {
        toast.style.animation = 'fade-out 200ms ease-out forwards';
        setTimeout(() => {
          if (toast.parentElement) {
            toast.remove();
          }
        }, 200);
      }
    }, duration);

    // Remove ao clicar fora
    const handleClickOutside = (event: MouseEvent) => {
      if (!toast.contains(event.target as Node)) {
        toast.remove();
        document.removeEventListener('click', handleClickOutside);
      }
    };

    // Adiciona listener após um pequeno delay para não remover imediatamente
    setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 100);

    return toast;
  }, []);

  return { showToast };
};

// CSS adicional para animações (será adicionado via JavaScript)
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fade-out {
      from { opacity: 1; transform: translateY(0); }
      to { opacity: 0; transform: translateY(-8px); }
    }

    [data-contextual-toast] {
      animation: slide-in-from-top 300ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes slide-in-from-top {
      from {
        opacity: 0;
        transform: translateX(-50%) translateY(-8px);
      }
      to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
    }
  `;

  if (!document.head.querySelector('[data-contextual-toast-styles]')) {
    style.setAttribute('data-contextual-toast-styles', 'true');
    document.head.appendChild(style);
  }
}

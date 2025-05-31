import React, { createContext, useCallback } from 'react';
import { toast } from 'sonner';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastOptions {
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  id?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  cancel?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType, options?: ToastOptions) => void;
  dismissToast: (id: string) => void;
  dismissAllToasts: () => void;
}

export const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
  dismissToast: () => {},
  dismissAllToasts: () => {},
});

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Show toast function
  const showToast = useCallback((message: string, type: ToastType = 'info', options?: ToastOptions) => {
    const { duration, id, icon, action, cancel } = options || {};
    
    switch (type) {
      case 'success':
        toast.success(message, { duration, id, icon, action, cancel });
        break;
      case 'error':
        toast.error(message, { duration, id, icon, action, cancel });
        break;
      case 'warning':
        toast.warning(message, { duration, id, icon, action, cancel });
        break;
      case 'info':
      default:
        toast.info(message, { duration, id, icon, action, cancel });
        break;
    }
  }, []);
  
  // Dismiss single toast
  const dismissToast = useCallback((id: string) => {
    toast.dismiss(id);
  }, []);
  
  // Dismiss all toasts
  const dismissAllToasts = useCallback(() => {
    toast.dismiss();
  }, []);
  
  return (
    <ToastContext.Provider value={{ showToast, dismissToast, dismissAllToasts }}>
      {children}
    </ToastContext.Provider>
  );
};
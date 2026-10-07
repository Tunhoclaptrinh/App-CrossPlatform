import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ToastOptions, ToastContextType } from './types';
import { AppToast } from './AppToast';

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toastState, setToastState] = useState<ToastOptions | null>(null);
  const [visible, setVisible] = useState(false);

  const show = useCallback((options: ToastOptions | string) => {
    const config: ToastOptions =
      typeof options === 'string' ? { message: options, type: 'info' } : options;
    setToastState(config);
    setVisible(true);
  }, []);

  const hide = useCallback(() => {
    setVisible(false);
  }, []);

  const success = useCallback((message: string, title?: string) => {
    show({ message, title, type: 'success' });
  }, [show]);

  const error = useCallback((message: string, title?: string) => {
    show({ message, title, type: 'error' });
  }, [show]);

  const warning = useCallback((message: string, title?: string) => {
    show({ message, title, type: 'warning' });
  }, [show]);

  const info = useCallback((message: string, title?: string) => {
    show({ message, title, type: 'info' });
  }, [show]);

  return (
    <ToastContext.Provider value={{ show, success, error, warning, info, hide }}>
      {children}
      {toastState && (
        <AppToast
          {...toastState}
          visible={visible}
          onDismiss={() => {
            setVisible(false);
            toastState.onClose?.();
          }}
        />
      )}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { ToastOptions, ToastContextType, ToastType } from './types';
import { AppToast } from './AppToast';

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const insets = useSafeAreaInsets();
  const [toastState, setToastState] = useState<ToastOptions | null>(null);
  const [visible, setVisible] = useState(false);
  const [toastKey, setToastKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hide = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  }, []);

  const show = useCallback(
    (
      typeOrOptions: ToastType | ToastOptions | string,
      message?: string,
      title?: string
    ) => {
      let config: ToastOptions;
      if (typeof typeOrOptions === 'string') {
        if (
          typeOrOptions === 'success' ||
          typeOrOptions === 'error' ||
          typeOrOptions === 'warning' ||
          typeOrOptions === 'info'
        ) {
          config = {
            type: typeOrOptions,
            message: message || '',
            title,
          };
        } else {
          config = {
            message: typeOrOptions,
            type: 'info',
            title,
          };
        }
      } else {
        config = typeOrOptions;
      }

      if (timerRef.current) clearTimeout(timerRef.current);
      setToastKey((prev) => prev + 1);
      setToastState(config);
      setVisible(true);
    },
    []
  );

  const success = useCallback(
    (message: string, title?: string) => {
      show({ message, title, type: 'success' });
    },
    [show]
  );

  const error = useCallback(
    (message: string, title?: string) => {
      show({ message, title, type: 'error' });
    },
    [show]
  );

  const warning = useCallback(
    (message: string, title?: string) => {
      show({ message, title, type: 'warning' });
    },
    [show]
  );

  const info = useCallback(
    (message: string, title?: string) => {
      show({ message, title, type: 'info' });
    },
    [show]
  );

  const isBottom = toastState?.position === 'bottom';
  const customPositionStyle = isBottom
    ? { bottom: Math.max(insets.bottom + 12, Platform.OS === 'ios' ? 44 : 28) }
    : { top: Math.max(insets.top + 8, Platform.OS === 'ios' ? 56 : 24) };

  return (
    <ToastContext.Provider value={{ show, success, error, warning, info, hide }}>
      {children}
      {toastState && (
        <AppToast
          key={toastState.id || `toast_${toastKey}`}
          {...toastState}
          visible={visible}
          style={customPositionStyle}
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


import React, { createContext, useContext, useState, useRef, useCallback } from 'react';
import {
  Animated,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react-native';
import { AppText } from '@/components/common/AppText';
import { useThemeMode } from '@/hooks/useThemeMode';
import { ToastType, ToastOptions, ToastContextType } from './types';
import { styles } from './styles';

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme: themeColors, isDark } = useThemeMode();
  const insets = useSafeAreaInsets();

  const [toast, setToast] = useState<ToastOptions | null>(null);
  const translateY = useRef(new Animated.Value(-120)).current;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hide = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    Animated.timing(translateY, {
      toValue: -120,
      duration: 250,
      useNativeDriver: true,
    }).start(() => setToast(null));
  }, [translateY]);

  const show = useCallback(
    (typeOrOptions: ToastType | ToastOptions, message?: string, title?: string) => {
      let opts: ToastOptions;
      if (typeof typeOrOptions === 'string') {
        opts = {
          type: typeOrOptions,
          message: message || '',
          title,
        };
      } else {
        opts = typeOrOptions;
      }

      if (timerRef.current) clearTimeout(timerRef.current);
      setToast(opts);

      Animated.spring(translateY, {
        toValue: insets.top + 58,
        friction: 8,
        tension: 45,
        useNativeDriver: true,
      }).start();

      const duration = opts.duration || 3500;
      timerRef.current = setTimeout(hide, duration);
    },
    [hide, insets.top, translateY]
  );

  const getTypeConfig = (type: ToastType = 'info') => {
    switch (type) {
      case 'success':
        return {
          icon: <CheckCircle2 size={20} color={isDark ? '#34D399' : '#059669'} />,
          border: isDark ? '#10B981' : '#10B981',
          bg: isDark ? '#132A20' : '#FFFFFF',
        };
      case 'error':
        return {
          icon: <AlertCircle size={20} color={isDark ? '#F87171' : '#DC2626'} />,
          border: isDark ? '#EF4444' : '#EF4444',
          bg: isDark ? '#2C151B' : '#FFFFFF',
        };
      case 'warning':
        return {
          icon: <AlertTriangle size={20} color={isDark ? '#FBBF24' : '#D97706'} />,
          border: isDark ? '#F59E0B' : '#F59E0B',
          bg: isDark ? '#2B1E11' : '#FFFFFF',
        };
      case 'info':
      default:
        return {
          icon: <Info size={20} color={isDark ? '#60A5FA' : '#007AFF'} />,
          border: isDark ? '#3B82F6' : '#007AFF',
          bg: isDark ? '#152238' : '#FFFFFF',
        };
    }
  };

  const currentConfig = toast ? getTypeConfig(toast.type) : null;

  return (
    <ToastContext.Provider value={{ show, hide }}>
      {children}
      {toast && currentConfig ? (
        <Animated.View
          style={[
            styles.toastContainer,
            {
              transform: [{ translateY }],
              backgroundColor: currentConfig.bg,
              borderColor: currentConfig.border,
            },
          ]}
        >
          <View style={styles.contentRow}>
            <View style={styles.iconContainer}>{currentConfig.icon}</View>
            <View style={styles.textContainer}>
              {toast.title ? (
                <AppText variant="subtitle2" color={themeColors.text} style={styles.title}>
                  {toast.title}
                </AppText>
              ) : null}
              <AppText variant="caption" color={themeColors.textSecondary}>
                {toast.message}
              </AppText>
            </View>
            <TouchableOpacity onPress={hide} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <X size={16} color={themeColors.textSecondary} />
            </TouchableOpacity>
          </View>
        </Animated.View>
      ) : null}
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
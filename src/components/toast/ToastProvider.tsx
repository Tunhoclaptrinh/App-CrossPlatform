import React, { createContext, useContext, useState, useRef, useCallback } from 'react';
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react-native';
import { AppText } from '@/components/common/AppText';
import { Colors } from '@/constants/colors';
import { BorderRadius, Spacing, Shadows } from '@/constants/theme';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastOptions {
  type?: ToastType;
  title?: string;
  message: string;
  duration?: number;
}

interface ToastContextType {
  show: (typeOrOptions: ToastType | ToastOptions, message?: string, title?: string) => void;
  hide: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const themeColors = isDarkMode ? Colors.dark : Colors.light;
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
        toValue: insets.top + 10,
        friction: 7,
        tension: 50,
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
          icon: <CheckCircle2 size={20} color={themeColors.success} />,
          border: themeColors.success,
          bg: themeColors.card,
        };
      case 'error':
        return {
          icon: <AlertCircle size={20} color={themeColors.error} />,
          border: themeColors.error,
          bg: themeColors.card,
        };
      case 'warning':
        return {
          icon: <AlertTriangle size={20} color={themeColors.warning} />,
          border: themeColors.warning,
          bg: themeColors.card,
        };
      case 'info':
      default:
        return {
          icon: <Info size={20} color={themeColors.info} />,
          border: themeColors.info,
          bg: themeColors.card,
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

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    left: Spacing.base,
    right: Spacing.base,
    top: 0,
    zIndex: 99999,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.base,
    ...Shadows.lg,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: Spacing.md,
  },
  textContainer: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  title: {
    fontWeight: '700',
    marginBottom: 2,
  },
});
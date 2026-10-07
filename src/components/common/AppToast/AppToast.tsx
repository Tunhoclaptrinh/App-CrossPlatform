import React, { useEffect, useRef } from 'react';
import {
  Animated,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
} from 'lucide-react-native';
import { AppText } from '../AppText';
import { useThemeMode } from '@/hooks/useThemeMode';
import { haptics } from '@/utils/haptics';
import type { AppToastProps } from './types';
import { createToastStyles, TOAST_COLORS, TOAST_SIZES } from './styles';

export const AppToast: React.FC<AppToastProps> = ({
  visible,
  onDismiss,
  message,
  title,
  type = 'info',
  duration = 2800,
  position = 'top',
  size = 'md',
  contrast,
  borderRadius,
  icon,
  onPress,
  style,
  messageStyle,
}) => {
  const { isDark, globalContrast } = useThemeMode();
  const resolvedContrast = contrast ?? globalContrast;
  const styles = createToastStyles(isDark, type, position, size, resolvedContrast, borderRadius);

  const translateY = useRef(new Animated.Value(position === 'top' ? -80 : 80)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const handleDismiss = React.useCallback(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: position === 'top' ? -80 : 80,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss();
    });
  }, [onDismiss, opacity, position, translateY]);

  useEffect(() => {
    if (visible) {
      if (type === 'success') haptics.success();
      else if (type === 'error') haptics.error();
      else if (type === 'warning') haptics.warning();
      else haptics.light();

      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          tension: 65,
          friction: 9,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => {
        handleDismiss();
      }, duration);

      return () => clearTimeout(timer);
    } else {
      handleDismiss();
    }
  }, [visible, duration, handleDismiss, opacity, translateY, type]);

  if (!visible) return null;

  const defaultIcon = () => {
    const color = TOAST_COLORS[type].icon;
    const iconSize = (TOAST_SIZES[size] || TOAST_SIZES.md).iconSize;
    switch (type) {
      case 'success':
        return <CheckCircle2 size={iconSize} color={color} strokeWidth={2.4} />;
      case 'error':
        return <AlertCircle size={iconSize} color={color} strokeWidth={2.4} />;
      case 'warning':
        return <AlertTriangle size={iconSize} color={color} strokeWidth={2.4} />;
      default:
        return <Info size={iconSize} color={color} strokeWidth={2.4} />;
    }
  };

  return (
    <Animated.View
      pointerEvents="box-none"
      style={[
        styles.wrapper,
        {
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress || handleDismiss}
        style={[styles.pillContainer, style]}
      >
        <View style={styles.iconWrapper}>{icon || defaultIcon()}</View>

        <View style={styles.textCol}>
          {title && <AppText style={styles.title}>{title}</AppText>}
          <AppText style={[styles.message, messageStyle]}>
            {message}
          </AppText>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

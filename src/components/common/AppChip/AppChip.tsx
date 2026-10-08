import React, { useRef } from 'react';
import { TouchableOpacity, View, Animated } from 'react-native';
import { X } from 'lucide-react-native';
import { AppText } from '../AppText';
import { useThemeMode } from '@/hooks/useThemeMode';
import { haptics } from '@/utils/haptics';
import type { AppChipProps } from './types';
import { createChipStyles } from './styles';

const AppChipComponent: React.FC<AppChipProps> = ({
  label,
  selected = false,
  onPress,
  onRemove,
  icon,
  size = 'md',
  variant = 'filled',
  disabled = false,
  contrast,
  shadow,
  borderRadius,
  style,
  labelStyle,
  accessibilityLabel,
}) => {
  const { theme, isDark, globalContrast, globalShadow, reduceMotion } = useThemeMode();
  const resolvedContrast = contrast ?? globalContrast;
  const resolvedShadow = shadow ?? globalShadow;

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const styles = createChipStyles(
    theme,
    isDark,
    size,
    variant,
    selected,
    resolvedContrast
  );

  const handlePressIn = () => {
    if (reduceMotion || !onPress) return;
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      speed: 50,
      bounciness: 0,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    if (reduceMotion || !onPress) return;
    Animated.spring(scaleAnim, {
      toValue: 1.0,
      speed: 35,
      bounciness: 4,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    if (!disabled && onPress) {
      haptics.light();
      onPress();
    }
  };

  const handleRemove = () => {
    if (!disabled && onRemove) {
      haptics.light();
      onRemove();
    }
  };

  const shadowStyle = resolvedShadow && resolvedShadow !== 'none'
    ? {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: isDark ? 0.25 : 0.08,
        shadowRadius: 4,
        elevation: 2,
      }
    : undefined;

  const content = (
    <View
      style={[
        styles.container,
        borderRadius !== undefined ? { borderRadius } : null,
        shadowStyle,
        disabled && styles.disabled,
        style,
      ]}
    >
      {icon && <View>{icon}</View>}
      <AppText style={[styles.label, labelStyle]}>{label}</AppText>
      {onRemove && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleRemove}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={styles.removeBtn}
          accessibilityLabel={`Xóa ${label}`}
        >
          <X
            size={size === 'sm' ? 12 : 14}
            color={selected ? theme.primary : theme.textSecondary}
            strokeWidth={2.4}
          />
        </TouchableOpacity>
      )}
    </View>
  );

  if (onPress) {
    return (
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity
          activeOpacity={0.80}
          disabled={disabled}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={handlePress}
          accessibilityRole="button"
          accessibilityState={{ selected, disabled }}
          accessibilityLabel={accessibilityLabel || label}
        >
          {content}
        </TouchableOpacity>
      </Animated.View>
    );
  }

  return content;
};

export const AppChip = React.memo(AppChipComponent);


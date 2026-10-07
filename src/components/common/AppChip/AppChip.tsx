import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { X } from 'lucide-react-native';
import { AppText } from '../AppText';
import { useThemeMode } from '@/hooks/useThemeMode';
import { haptics } from '@/utils/haptics';
import type { AppChipProps } from './types';
import { createChipStyles } from './styles';

export const AppChip: React.FC<AppChipProps> = ({
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
  const { theme, isDark, globalContrast, globalShadow } = useThemeMode();
  const resolvedContrast = contrast ?? globalContrast;
  const resolvedShadow = shadow ?? globalShadow;

  const styles = createChipStyles(
    theme,
    isDark,
    size,
    variant,
    selected,
    resolvedContrast
  );

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
      <TouchableOpacity
        activeOpacity={0.75}
        disabled={disabled}
        onPress={handlePress}
        accessibilityRole="button"
        accessibilityState={{ selected, disabled }}
        accessibilityLabel={accessibilityLabel || label}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Check } from 'lucide-react-native';
import { AppText } from '../AppText';
import { useThemeMode } from '@/hooks/useThemeMode';
import type { AppCheckboxProps } from './types';
import { styles, CHECKBOX_SIZES } from './styles';

export const AppCheckbox: React.FC<AppCheckboxProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  size = 'md',
  contrast,
  borderRadius,
  style,
}) => {
  const { theme: themeColors, isDark, globalContrast } = useThemeMode();
  const resolvedContrast = contrast ?? globalContrast;
  const isHigh = resolvedContrast === 'high';
  const sizeConfig = CHECKBOX_SIZES[size];

  const handlePress = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  const boxStyle = React.useMemo(
    () => ({
      width: sizeConfig.box,
      height: sizeConfig.box,
      borderRadius: borderRadius !== undefined ? borderRadius : sizeConfig.radius,
      backgroundColor: checked
        ? themeColors.primary
        : isDark
        ? 'rgba(255, 255, 255, 0.06)'
        : '#FFFFFF',
      borderColor: checked
        ? themeColors.primary
        : isHigh
        ? isDark
          ? 'rgba(255, 255, 255, 0.70)'
          : 'rgba(0, 0, 0, 0.65)'
        : isDark
        ? 'rgba(255, 255, 255, 0.40)'
        : 'rgba(0, 0, 0, 0.32)',
      borderWidth: isHigh ? 2 : 1.5,
    }),
    [checked, isDark, isHigh, sizeConfig, borderRadius, themeColors.primary]
  );

  const labelStyle = React.useMemo(
    () => [styles.label, { fontSize: sizeConfig.fontSize }],
    [sizeConfig.fontSize]
  );

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      disabled={disabled}
      style={[styles.container, disabled && styles.disabled, style]}
    >
      <View style={[styles.box, boxStyle]}>
        {checked && <Check size={sizeConfig.icon} color="#FFFFFF" strokeWidth={3} />}
      </View>

      {label ? (
        <AppText
          variant="body"
          color={disabled ? themeColors.textSecondary : themeColors.text}
          style={labelStyle}
        >
          {label}
        </AppText>
      ) : null}
    </TouchableOpacity>
  );
};

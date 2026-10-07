import React from 'react';
import { View, Switch, Platform } from 'react-native';
import { AppText } from '../AppText';
import { useThemeMode } from '@/hooks/useThemeMode';
import type { AppSwitchProps } from './types';
import { styles } from './styles';

export const AppSwitch: React.FC<AppSwitchProps> = ({
  value,
  onValueChange,
  label,
  sublabel,
  disabled = false,
  size = 'md',
  contrast,
  style,
  ...props
}) => {
  const { theme: themeColors, isDark, globalContrast } = useThemeMode();
  const resolvedContrast = contrast ?? globalContrast;
  const isHigh = resolvedContrast === 'high';

  const offTrackColor = isHigh
    ? isDark ? '#4B5563' : '#9CA3AF'
    : isDark ? '#374151' : '#D1D5DB';

  const switchScale = size === 'sm' ? 0.82 : size === 'lg' ? 1.15 : 1.0;
  const switchTransform = React.useMemo(
    () => (switchScale !== 1.0 ? { transform: [{ scale: switchScale }] } : undefined),
    [switchScale]
  );

  return (
    <View style={[styles.container, style]}>
      {(label || sublabel) && (
        <View style={styles.textContainer}>
          {label && (
            <AppText
              variant="body"
              color={disabled ? themeColors.textSecondary : themeColors.text}
              style={[styles.label, size === 'sm' && styles.labelSm, size === 'lg' && styles.labelLg]}
            >
              {label}
            </AppText>
          )}
          {sublabel && (
            <AppText
              variant="caption"
              color={themeColors.textSecondary}
              style={styles.sublabel}
            >
              {sublabel}
            </AppText>
          )}
        </View>
      )}

      <Switch
        style={switchTransform}
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        trackColor={{
          false: offTrackColor,
          true: themeColors.primary,
        }}
        thumbColor={
          Platform.OS === 'android'
            ? value
              ? '#FFFFFF'
              : isDark ? '#E5E7EB' : '#FFFFFF'
            : undefined
        }
        ios_backgroundColor={offTrackColor}
        {...props}
      />
    </View>
  );
};

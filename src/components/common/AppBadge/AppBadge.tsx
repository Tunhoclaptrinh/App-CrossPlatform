import React, { useMemo } from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { AppText } from '../AppText';
import { useThemeMode } from '@/hooks/useThemeMode';
import type { AppBadgeProps } from './types';
import { styles, getBadgeColors, getBadgeContainerStyle } from './styles';

export const AppBadge: React.FC<AppBadgeProps> = React.memo(({
  label,
  variant = 'primary',
  shape = 'pill',
  size = 'md',
  icon,
  contrast,
  borderRadius,
  style,
}) => {
  const { theme: themeColors, radiusTokens, globalContrast } = useThemeMode();
  const effectiveContrast = contrast ?? globalContrast ?? 'normal';
  const colors = getBadgeColors(variant, themeColors);
  const isSm = size === 'sm';
  const isLg = size === 'lg';

  const contrastStyle: ViewStyle = useMemo(() => {
    if (effectiveContrast === 'high') {
      return {
        borderWidth: 1.5,
        borderColor: `${colors.text}80`,
      };
    }
    if (variant === 'neutral') {
      return {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: `${colors.text}25`,
      };
    }
    return {};
  }, [effectiveContrast, variant, colors.text]);

  return (
    <View
      style={[
        getBadgeContainerStyle(shape, size, colors.bg, radiusTokens),
        borderRadius !== undefined ? { borderRadius } : null,
        contrastStyle,
        style,
      ]}
    >
      {icon ? <View style={styles.iconWrapper}>{icon}</View> : null}
      <AppText
        variant={isSm ? 'caption' : isLg ? 'body' : 'subtitle'}
        style={styles.label}
        color={colors.text}
      >
        {label}
      </AppText>
    </View>
  );
});
